import { ref, watch } from 'vue'

export interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image?: string
}

// Global state using useState
const useCartState = () => {
  const cart = useState<CartItem[]>('shopping-cart', () => [])
  const isCartOpen = useState('cart-open', () => false)
  
  return { cart, isCartOpen }
}

export function useLocalCart() {
  const { cart, isCartOpen } = useCartState()

  // Load cart from localStorage on initialization
  const loadCart = () => {
    if (import.meta.client) {
      const savedCart = localStorage.getItem('shopping-cart')
      if (savedCart) {
        try {
          cart.value = JSON.parse(savedCart)
        } catch (e) {
          console.error('Failed to load cart:', e)
          cart.value = []
        }
      }
    }
  }

  // Save cart to localStorage whenever it changes
  const saveCart = () => {
    if (import.meta.client) {
      localStorage.setItem('shopping-cart', JSON.stringify(cart.value))
    }
  }

  // Watch for cart changes and save
  watch(cart, saveCart, { deep: true })

  // Add item to cart
  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    const existingItem = cart.value.find(i => i.id === item.id)
    
    if (existingItem) {
      existingItem.quantity++
    } else {
      cart.value.push({ ...item, quantity: 1 })
    }
    
    saveCart()
    return true
  }

  // Remove item from cart
  const removeFromCart = (id: number) => {
    const index = cart.value.findIndex(i => i.id === id)
    if (index > -1) {
      cart.value.splice(index, 1)
      saveCart()
    }
  }

  // Update item quantity
  const updateQuantity = (id: number, quantity: number) => {
    const item = cart.value.find(i => i.id === id)
    if (item) {
      if (quantity <= 0) {
        removeFromCart(id)
      } else {
        item.quantity = quantity
        saveCart()
      }
    }
  }

  // Clear cart
  const clearCart = () => {
    cart.value = []
    saveCart()
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

  // Initialize cart on mount
  if (import.meta.client) {
    loadCart()
  }

  return {
    cart,
    isCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartItemCount,
  }
}
