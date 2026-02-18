<script setup lang="ts">
const hoveredId = ref<number | null>(null)
const isChatOpen = useState('chatAssistantOpen', () => false)
const chatInitialMessage = useState('chatInitialMessage', () => '')

const categories = [
  {
    id: 1,
    label: 'FRUITS & VEGETABLES',
    icon: 'i-lucide-leaf',
    color: 'green',
    description: 'Fresh produce and organic vegetables',
  },
  {
    id: 2,
    label: 'BAKERY & DAIRY',
    icon: 'i-lucide-cake',
    color: 'amber',
    description: 'Freshly baked goods and dairy products',
  },
  {
    id: 3,
    label: 'MEAT & SEAFOOD',
    icon: 'i-lucide-utensils',
    color: 'red',
    description: 'Premium quality meat and seafood',
  },
  {
    id: 4,
    label: 'GRAINS & PULSES',
    icon: 'i-lucide-package',
    color: 'yellow',
    description: 'Organic grains, cereals, and pulses',
  },
  {
    id: 5,
    label: 'SNACKS & BEVERAGES',
    icon: 'i-lucide-wine',
    color: 'purple',
    description: 'Tasty snacks and refreshing beverages',
  },
  {
    id: 6,
    label: 'HOUSEHOLD ITEMS',
    icon: 'i-lucide-home',
    color: 'blue',
    description: 'Essential household and cleaning supplies',
  },
]

const openChatWithCategory = (categoryLabel: string) => {
  chatInitialMessage.value = `Show me ${categoryLabel} products`
  isChatOpen.value = true
}

useSeoMeta({
  title: 'Shop Categories - AI Assisted Commerce',
  description: 'Browse our categories and find everything you need',
  ogTitle: 'Shop Categories - AI Assisted Commerce',
  ogDescription: 'Browse our categories and find everything you need',
  twitterCard: 'summary_large_image',
})

defineOgImageComponent('Nuxt', {
  title: 'Shop Categories - AI Assisted Commerce',
  description: 'Browse our categories and find everything you need',
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
          title="Shop by Category"
          description="Browse our wide selection of fresh and quality products"
        />
      </div>

      <div class="mt-12">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="category in categories"
            :key="category.id"
            class="p-6 rounded-lg border-2 cursor-pointer transition-all duration-300"
            @mouseenter="hoveredId = category.id"
            @mouseleave="hoveredId = null"
            :class="hoveredId === category.id ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-green-500 scale-105 shadow-xl shadow-green-500/30' : 'bg-gray-900/50 border-gray-700'"
          >
            <!-- Icon -->
            <div class="mb-4 inline-block p-3 rounded-lg bg-gray-800/50 transition-all duration-300" :class="hoveredId === category.id ? 'bg-green-500/20' : ''">
              <UIcon
                :name="category.icon"
                class="w-8 h-8 transition-all duration-300"
                :class="hoveredId === category.id ? 'text-green-400 scale-110' : 'text-white'"
              />
            </div>

            <!-- Title -->
            <h3 class="text-lg font-bold mb-2 transition-colors duration-300" :class="hoveredId === category.id ? 'text-green-400' : 'text-white'">
              {{ category.label }}
            </h3>

            <!-- Description -->
            <p class="text-sm mb-4 transition-colors duration-300" :class="hoveredId === category.id ? 'text-green-300' : 'text-gray-400'">
              {{ category.description }}
            </p>

            <!-- Button -->
            <UButton
              color="blue"
              variant="soft"
              size="sm"
              icon="i-lucide-arrow-right"
              trailing
              class="w-full transition-all duration-300"
              :class="hoveredId === category.id ? 'bg-green-600 text-white' : ''"
              @click="openChatWithCategory(category.label)"
            >
              Explore
            </UButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
