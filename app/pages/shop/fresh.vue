<script setup lang="ts">
const { addToCart } = useUnifiedCart()

const products = [
  {
    id: 1,
    name: 'FRESH LETTUCE',
    emoji: '🥬',
    price: 45,
    oldPrice: 60,
  },
  {
    id: 2,
    name: 'ORGANIC TOMATOES',
    emoji: '🍅',
    price: 35,
  },
  {
    id: 3,
    name: 'FRESH MILK',
    emoji: '🥛',
    price: 65,
  },
  {
    id: 4,
    name: 'FRESH CARROTS',
    emoji: '🥕',
    price: 40,
    oldPrice: 55,
  },
  {
    id: 5,
    name: 'ORGANIC EGGS',
    emoji: '🥚',
    price: 80,
  },
  {
    id: 6,
    name: 'FRESH BREAD',
    emoji: '🍞',
    price: 50,
  },
  {
    id: 7,
    name: 'GREEN APPLES',
    emoji: '🍏',
    price: 120,
    oldPrice: 150,
  },
  {
    id: 8,
    name: 'FRESH CHEESE',
    emoji: '🧀',
    price: 95,
  },
  {
    id: 9,
    name: 'ORGANIC SPINACH',
    emoji: '🥬',
    price: 38,
  },
]

const addProductToCart = (product: typeof products[0]) => {
  addToCart({
    id: product.id,
    name: product.name,
    price: product.price,
  })
  
  const toast = useToast()
  toast.add({
    title: 'Item added to cart',
    description: `${product.name} has been added to your cart`,
    color: 'primary',
    icon: 'i-lucide-check',
    ui: {
      background: 'bg-green-500',
      ring: 'ring-green-400',
      icon: {
        color: 'text-white'
      }
    }
  })
}

useSeoMeta({
  title: 'Today\'s Fresh Picks - AI Assisted Commerce',
  description: 'Browse our fresh daily products',
  ogTitle: 'Today\'s Fresh Picks - AI Assisted Commerce',
  ogDescription: 'Browse our fresh daily products',
  twitterCard: 'summary_large_image',
})

defineOgImageComponent('Nuxt', {
  title: 'Today\'s Fresh Picks - AI Assisted Commerce',
  description: 'Browse our fresh daily products',
  theme: '#4ADE80',
  headline: '',
  colorMode: 'dark',
})
</script>

<template>
  <div>
    <div class="max-w-7xl px-6 mx-auto py-12">
      <div class="text-center">
        <SharedHeaderSection
          title="TODAY'S FRESH PICKS"
          description="Browse our fresh daily products"
        />
      </div>

      <div class="mt-12">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="product in products"
            :key="product.id"
            class="p-6 rounded-lg border-2 bg-gray-900/50 border-gray-700 transition-all duration-300 hover:border-green-500"
          >
            <!-- Product Image -->
            <div class="mb-4 text-6xl text-center">
              {{ product.emoji }}
            </div>

            <!-- Product Name -->
            <h4 class="text-lg font-bold mb-2 text-white text-center">
              {{ product.name }}
            </h4>

            <!-- Product Price -->
            <p class="text-center mb-4">
              <span class="text-xl font-bold text-green-400">₹{{ product.price }}</span>
              <span v-if="product.oldPrice" class="ml-2 text-sm text-gray-500 line-through">₹{{ product.oldPrice }}</span>
            </p>

            <!-- Add to Cart Button -->
            <div class="flex justify-center">
              <UButton
                color="white"
                variant="outline"
                size="md"
                class="transition-all duration-300 hover:!bg-green-600 hover:!text-white hover:!border-green-600"
                @click="addProductToCart(product)"
              >
                ADD TO CART
              </UButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
