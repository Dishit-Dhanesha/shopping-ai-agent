import { addToCart as addToServerCart, loadCartCount, removeFromCart as removeFromServerCart, updateCartQuantity, clearCart as clearServerCart } from '~/services/cartService'

export interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image?: string
}

// Global state using useState
const useCartState = () => {
  const cart = useState<CartItem[]>('unified-cart', () => [])
  const isCartOpen = useState('cart-open', () => false)
  const isLoading = useState('cart-loading', () => false)
  // Use the same sessionId as the chat system
  const sessionId = useState('sessionId', () => crypto.randomUUID())
  
  return { cart, isCartOpen, isLoading, sessionId }
}

export function useUnifiedCart() {
  const { cart, isCartOpen, isLoading, sessionId } = useCartState()

  // Sync with server
  const syncWithServer = async (action: 'add' | 'remove' | 'update' | 'clear', productId?: number, quantity?: number) => {
    try {
      isLoading.value = true

      switch (action) {
        case 'add':
          if (productId) {
            await addToServerCart(sessionId.value, productId, quantity || 1)
          }
          break
        case 'remove':
          if (productId) {
            await removeFromServerCart(sessionId.value, productId)
          }
          break
        case 'update':
          if (productId && quantity !== undefined) {
            await updateCartQuantity(sessionId.value, productId, quantity)
          }
          break
        case 'clear':
          await clearServerCart(sessionId.value)
          break
      }
    } catch (error) {
      console.error('Failed to sync with server:', error)
    } finally {
      isLoading.value = false
    }
  }

  // Add item to cart
  const addToCart = async (item: Omit<CartItem, 'quantity'>) => {
    // Clean up product name: remove ** and trim - from start/end
    const cleanName = item.name
      .replace(/\*\*/g, '') // Remove all **
      .replace(/^-\s*/, '') // Remove leading - and spaces
      .replace(/\s*-$/, '') // Remove trailing - and spaces
      .trim()
    
    const existingItem = cart.value.find(i => i.id === item.id)
    
    if (existingItem) {
      existingItem.quantity++
    } else {
      cart.value.push({ ...item, name: cleanName, quantity: 1 })
    }
    
    // Sync with server in background
    await syncWithServer('add', item.id, 1)
    
    return true
  }

  // Remove item from cart
  const removeFromCart = async (id: number) => {
    const index = cart.value.findIndex(i => i.id === id)
    if (index > -1) {
      cart.value.splice(index, 1)
      
      // Sync with server
      await syncWithServer('remove', id)
    }
  }

  // Update item quantity
  const updateQuantity = async (id: number, quantity: number) => {
    const item = cart.value.find(i => i.id === id)
    if (item) {
      if (quantity <= 0) {
        await removeFromCart(id)
      } else {
        item.quantity = quantity
        
        // Sync with server
        await syncWithServer('update', id, quantity)
      }
    }
  }

  // Clear cart
  const clearCart = async () => {
    cart.value = []
    
    // Sync with server
    await syncWithServer('clear')
  }

  // Get cart total
  const cartTotal = computed(() => {
    return cart.value.reduce((total, item) => {
      return total + (item.price * item.quantity)
    }, 0)
  })

  // Get cart item count
  const cartItemCount = computed(() => {
    return cart.value.reduce((count, item) => count + item.quantity, 0)
  })

  // Load cart from server and merge with local
  const loadFromServer = async () => {
    try {
      isLoading.value = true
      const serverCart = await loadCartCount(sessionId.value)
      
      // If server has cart data, you can merge it here
      // For now, we prioritize local cart
      console.log('Server cart loaded:', serverCart)
    } catch (error) {
      console.error('Failed to load from server:', error)
    } finally {
      isLoading.value = false
    }
  }

  return {
    cart,
    isCartOpen,
    isLoading,
    sessionId,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartItemCount,
    loadFromServer,
  }
}
