export interface AddToCartOptions {
  onLoad?: () => void
  onSuccess?: (result: any) => void
  onError?: (error: any) => void
}

export interface LoadCartOptions {
  onLoad?: () => void
  onSuccess?: (cart: any) => void
  onError?: (error: any) => void
}

export async function addToCart(
  sessionId: string,
  productId: number,
  quantity: number = 1,
  options: AddToCartOptions = {}
) {
  const { onLoad, onSuccess, onError } = options

  try {
    onLoad?.()

    const result = await $fetch('https://shopping-ai-agent.onrender.com/api/cart/add', {
      method: 'POST',
      body: {
        sessionId,
        productId,
        quantity,
      },
    })

    if (!result.success) {
      throw new Error(result.error || 'Failed to add to cart')
    }

    onSuccess?.(result)
    return result
  } catch (err) {
    console.error('Failed to add to cart:', err)
    onError?.(err)
    throw err
  }
}

export async function loadCartCount(
  sessionId: string,
  options: LoadCartOptions = {}
) {
  const { onLoad, onSuccess, onError } = options

  try {
    onLoad?.()

    const cart = await $fetch(`/api/cart/${sessionId}`, {
      method: 'GET',
    })

    onSuccess?.(cart)
    return cart
  } catch (err) {
    console.error('Failed to load cart count:', err)
    
    // Return empty cart on error
    const emptyCart = { success: true, summary: { totalItems: 0 } }
    onSuccess?.(emptyCart)
    
    return emptyCart
  }
}

export async function removeFromCart(
  sessionId: string,
  productId: number,
  options: AddToCartOptions = {}
) {
  const { onLoad, onSuccess, onError } = options

  try {
    onLoad?.()

    const result = await $fetch('https://shopping-ai-agent.onrender.com/api/cart/remove', {
      method: 'POST',
      body: {
        sessionId,
        productId,
      },
    })

    onSuccess?.(result)
    return result
  } catch (err) {
    console.error('Failed to remove from cart:', err)
    onError?.(err)
    throw err
  }
}

export async function updateCartQuantity(
  sessionId: string,
  productId: number,
  quantity: number,
  options: AddToCartOptions = {}
) {
  const { onLoad, onSuccess, onError } = options

  try {
    onLoad?.()

    const result = await $fetch('/api/cart/update', {
      method: 'POST',
      body: {
        sessionId,
        productId,
        quantity,
      },
    })

    onSuccess?.(result)
    return result
  } catch (err) {
    console.error('Failed to update cart:', err)
    onError?.(err)
    throw err
  }
}

export async function clearCart(
  sessionId: string,
  options: AddToCartOptions = {}
) {
  const { onLoad, onSuccess, onError } = options

  try {
    onLoad?.()

    const result = await $fetch('/api/cart/clear', {
      method: 'POST',
      body: {
        sessionId,
      },
    })

    onSuccess?.(result)
    return result
  } catch (err) {
    console.error('Failed to clear cart:', err)
    onError?.(err)
    throw err
  }
}
