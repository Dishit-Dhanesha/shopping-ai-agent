import { ref } from 'vue'
import { addToCart, loadCartCount, removeFromCart, updateCartQuantity, clearCart } from '~/services/cartService'

export function useServerCart() {
  const cartCount = ref(0)
  const isLoading = ref(false)
  // Use the same sessionId as the chat and unified cart systems
  const sessionId = useState('sessionId', () => crypto.randomUUID())

  // Load cart count
  const loadCart = async () => {
    await loadCartCount(sessionId.value, {
      onLoad: () => {
        isLoading.value = true
      },
      onSuccess: (cart) => {
        cartCount.value = cart.summary?.totalItems || 0
        isLoading.value = false
      },
      onError: () => {
        isLoading.value = false
      },
    })
  }

  // Add item to cart
  const addItem = async (productId: number, quantity: number = 1) => {
    return await addToCart(sessionId.value, productId, quantity, {
      onLoad: () => {
        isLoading.value = true
      },
      onSuccess: (result) => {
        cartCount.value = result.summary?.totalItems || cartCount.value + quantity
        isLoading.value = false
      },
      onError: () => {
        isLoading.value = false
      },
    })
  }

  // Remove item from cart
  const removeItem = async (productId: number) => {
    return await removeFromCart(sessionId.value, productId, {
      onLoad: () => {
        isLoading.value = true
      },
      onSuccess: (result) => {
        cartCount.value = result.summary?.totalItems || 0
        isLoading.value = false
      },
      onError: () => {
        isLoading.value = false
      },
    })
  }

  // Update item quantity
  const updateItem = async (productId: number, quantity: number) => {
    return await updateCartQuantity(sessionId.value, productId, quantity, {
      onLoad: () => {
        isLoading.value = true
      },
      onSuccess: (result) => {
        cartCount.value = result.summary?.totalItems || 0
        isLoading.value = false
      },
      onError: () => {
        isLoading.value = false
      },
    })
  }

  // Clear cart
  const clear = async () => {
    return await clearCart(sessionId.value, {
      onLoad: () => {
        isLoading.value = true
      },
      onSuccess: () => {
        cartCount.value = 0
        isLoading.value = false
      },
      onError: () => {
        isLoading.value = false
      },
    })
  }

  // Load cart on mount
  if (process.client) {
    loadCart()
  }

  return {
    sessionId,
    cartCount,
    isLoading,
    loadCart,
    addItem,
    removeItem,
    updateItem,
    clear,
  }
}
