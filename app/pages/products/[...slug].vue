<script setup lang="ts">
const route = useRoute()

useSeoMeta({
  title: 'Product Details - AI Assisted Commerce',
  description: 'View product details',
})
</script>

<template>
  <div class="max-w-7xl mx-auto px-6 py-12">
    <div class="flex flex-col items-center justify-center min-h-[60vh]">
      <!-- Under Development Icon -->
      <div class="text-8xl mb-6">🚧</div>
      
      <!-- Message -->
      <h1 class="text-4xl font-bold text-white mb-4">Under Development</h1>
      <p class="text-gray-400 text-lg mb-8 text-center max-w-md">
        This product page is currently under development. Check back soon!
      </p>
      
      <!-- Back Button -->
      <UButton
        to="/shop/fresh"
        color="primary"
        size="lg"
        icon="i-heroicons-arrow-left"
        class="!bg-orange-600 hover:!bg-orange-700"
      >
        Back to Shop
      </UButton>
    </div>
  </div>
</template>
