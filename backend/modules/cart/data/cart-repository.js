import CONFIG from '#config';
import { getRedisClient } from '../../db/redis-client.js';

export default class CartRepository {

    /**
     * Check if item exists in cart and return its details
     * @param {string} sessionId - User session ID
     * @param {string} productId - Product ID to check
     */
    async checkItemExistsInCart(sessionId, productId) {
        try {
            const client = await getRedisClient();
            const userKey = `users:${sessionId}`;
            const existingItem = await client.json.get(userKey, {
                path: `$.cart.items[?(@.productId=='${productId}')]`
            });

            if (existingItem && existingItem.length > 0) {
                return existingItem[0];
            }
            return null;
        } catch (error) {
            console.error('❌ Error checking cart item in Redis:', error.message);
            return null;
        }
    }

    /**
     * Update quantity of existing item in cart
     * @param {string} sessionId - User session ID
     * @param {string} productId - Product ID
     * @param {number} newQuantity - New quantity
     */
    async updateItemQuantity(sessionId, productId, newQuantity) {
        try {
            const client = await getRedisClient();
            const userKey = `users:${sessionId}`;
            await client.json.set(userKey, `$.cart.items[?(@.productId=='${productId}')].quantity`, newQuantity);
            await client.json.set(userKey, '$.cart.updatedAt', new Date().toISOString());
            await client.expire(userKey, 24 * 60 * 60);

            return { success: true };
        } catch (error) {
            console.error('❌ Error updating cart quantity in Redis:', error.message);
            return { success: false, error: error.message };
        }
    }

    /**
     * Add new item to cart
     * @param {string} sessionId - User session ID
     * @param {Object} cartItem - Cart item object
     */
    async addNewItemToCart(sessionId, cartItem) {
        try {
            const client = await getRedisClient();
            const userKey = `users:${sessionId}`;

            // Check if cart exists in user data, initialize if needed
            const cartData = await client.json.get(userKey, { path: '$.cart' });

            if (!cartData || cartData.length === 0 || !cartData[0].items) {
                // Initialize cart within existing user document
                await client.json.set(userKey, '$.cart', {
                    items: [cartItem],
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                });
            } else {
                await client.json.arrAppend(userKey, '$.cart.items', cartItem);
                await client.json.set(userKey, '$.cart.updatedAt', new Date().toISOString());
            }

            // Set expiration (24 hours)
            await client.expire(userKey, 24 * 60 * 60);

            return { success: true };
        } catch (error) {
            console.error('❌ Error adding item to cart in Redis:', error.message);
            return { success: false, error: error.message };
        }
    }

    /**
     * Get raw cart data from storage
     * @param {string} sessionId - User session ID
     */
    async getCartData(sessionId) {
        try {
            const client = await getRedisClient();
            const userKey = `users:${sessionId}`;
            const cartData = await client.json.get(userKey, { path: '$.cart' });

            if (!cartData || cartData.length === 0 || !cartData[0]) {
                return null;
            }

            return cartData[0];
        } catch (error) {
            console.error('❌ Error getting cart data from Redis:', error.message);
            return null;
        }
    }

    /**
     * Remove product from cart
     * @param {string} sessionId - User session ID
     * @param {string} productId - Product ID to remove
     */
    async removeFromCart(sessionId, productId) {
        try {
            const client = await getRedisClient();
            const userKey = `users:${sessionId}`;

            // Get current cart
            const cartData = await client.json.get(userKey, { path: '$.cart' });
            if (!cartData || cartData.length === 0 || !cartData[0] || !cartData[0].items) {
                return {
                    success: false,
                    error: 'Cart is empty or does not exist'
                };
            }
            
            const cart = cartData[0];

            // Find and remove the item
            const filteredItems = cart.items.filter(item => item.productId !== productId);
            
            if (filteredItems.length === cart.items.length) {
                return {
                    success: false,
                    error: 'Product not found in cart'
                };
            }

            // Update cart
            await client.json.set(userKey, '$.cart.items', filteredItems);
            await client.json.set(userKey, '$.cart.updatedAt', new Date().toISOString());

            const removedItem = cart.items.find(item => item.productId === productId);
            
            return {
                success: true,
                message: `${removedItem.name} removed from cart`,
                removedItem: removedItem
            };
        } catch (error) {
            console.error('❌ Error removing item from cart in Redis:', error.message);
            return {
                success: false,
                error: error.message
            };
        }
    }

    /**
     * Clear entire cart
     * @param {string} sessionId - User session ID
     */
    async clearCart(sessionId) {
        try {
            const client = await getRedisClient();
            const userKey = `users:${sessionId}`;

            const cartData = await client.json.get(userKey, { path: '$.cart' });

            if (!cartData || cartData.length === 0 || !cartData[0] || !cartData[0].items || cartData[0].items.length === 0) {
                return {
                    success: true,
                    message: 'Cart is already empty',
                    itemsCleared: 0
                };
            }
            
            const cart = cartData[0];

            const itemCount = cart.items.length;
            
            // Clear the cart items only (keep user data)
            await client.json.set(userKey, '$.cart.items', []);
            await client.json.set(userKey, '$.cart.updatedAt', new Date().toISOString());
            
            return {
                success: true,
                message: `Cart cleared! ${itemCount} items removed.`,
                itemsCleared: itemCount
            };
        } catch (error) {
            console.error('❌ Error clearing cart in Redis:', error.message);
            return {
                success: false,
                error: error.message,
                itemsCleared: 0
            };
        }
    }
}
