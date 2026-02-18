export function useCart() {
  const cartCount = useState("cartCount", () => 0)

  // Track loading state per product
  const loadingProductId = ref<number | null>(null)
  const successProductId = ref<number | null>(null)
  const errorProductId = ref<number | null>(null)

  const addToCart = async (sessionId: string, productId: number) => {
    loadingProductId.value = productId
    successProductId.value = null
    errorProductId.value = null

    try {
      const res: any = await $fetch("http://localhost:3000/api/cart/add", {
        method: "POST",
        body: {
          sessionId,
          productId,
          quantity: 1,
        },
      })

      // Update cart count
      cartCount.value = res.cartSummary.summary.totalItems

      // Show success icon
      successProductId.value = productId

      setTimeout(() => {
        successProductId.value = null
      }, 2000)
    } catch (err) {
      errorProductId.value = productId

      setTimeout(() => {
        errorProductId.value = null
      }, 2000)
    }

    loadingProductId.value = null
  }

  return {
    cartCount,
    addToCart,
    loadingProductId,
    successProductId,
    errorProductId,
  }
}
