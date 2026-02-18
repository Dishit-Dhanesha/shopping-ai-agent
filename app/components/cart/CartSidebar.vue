<script setup lang="ts">
const { cart, isCartOpen, removeFromCart, updateQuantity, clearCart, cartTotal } = useLocalCart()

// Debug
console.log('CartSidebar mounted, isCartOpen:', isCartOpen.value)

watch(isCartOpen, (val) => {
  console.log('CartSidebar isCartOpen changed:', val)
})

onMounted(() => {
  console.log('CartSidebar onMounted')
})

const incrementQuantity = (id: number, currentQty: number) => {
  updateQuantity(id, currentQty + 1)
}

const decrementQuantity = (id: number, currentQty: number) => {
  updateQuantity(id, currentQty - 1)
}
</script>

<template>
  <USlideover
    v-model:open="isCartOpen"
    title="Shopping Cart"
    description="Review your items"
    close-icon="i-heroicons-x-mark-20-solid"
  >
    <template #body>
      <div class="flex flex-col h-full">
        <!-- Cart Items -->
        <div v-if="cart.length > 0" class="flex-1 overflow-y-auto space-y-4">
          <div
            v-for="item in cart"
            :key="item.id"
            class="bg-gray-900 rounded-lg p-4 border border-gray-800"
          >
            <div class="flex justify-between items-start mb-3">
              <div class="flex-1">
                <h3 class="text-white font-semibold text-sm">{{ item.name }}</h3>
                <p class="text-green-400 font-bold mt-1">₹{{ item.price }}</p>
              </div>
              <UButton
                color="neutral"
                variant="ghost"
                size="xs"
                icon="i-heroicons-trash"
                @click="removeFromCart(item.id)"
                class="text-red-400 hover:text-red-300"
              />
            </div>

            <!-- Quantity Controls -->
            <div class="flex items-center gap-3">
              <UButton
                color="neutral"
                variant="outline"
                size="xs"
                icon="i-heroicons-minus"
                @click="decrementQuantity(item.id, item.quantity)"
                :disabled="item.quantity <= 1"
              />
              <span class="text-white font-semibold min-w-[30px] text-center">
                {{ item.quantity }}
              </span>
              <UButton
                color="neutral"
                variant="outline"
                size="xs"
                icon="i-heroicons-plus"
                @click="incrementQuantity(item.id, item.quantity)"
              />
              <span class="text-gray-400 text-sm ml-auto">
                Subtotal: ₹{{ item.price * item.quantity }}
              </span>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="flex-1 flex items-center justify-center">
          <div class="text-center">
            <div class="text-6xl mb-4">🛒</div>
            <p class="text-gray-400 text-lg">Your cart is empty</p>
            <p class="text-gray-500 text-sm mt-2">Add some items to get started!</p>
          </div>
        </div>

        <!-- Cart Footer -->
        <div v-if="cart.length > 0" class="border-t border-gray-800 pt-4 mt-4 space-y-4">
          <!-- Total -->
          <div class="flex justify-between items-center">
            <span class="text-white font-bold text-lg">Total:</span>
            <span class="text-green-400 font-bold text-xl">₹{{ cartTotal }}</span>
          </div>

          <!-- Actions -->
          <div class="space-y-2">
            <UButton
              color="primary"
              size="lg"
              block
              class="!bg-green-600 hover:!bg-green-700"
            >
              Checkout
            </UButton>
            <UButton
              color="neutral"
              variant="outline"
              size="md"
              block
              @click="clearCart"
            >
              Clear Cart
            </UButton>
          </div>
        </div>
      </div>
    </template>
  </USlideover>
</template>
