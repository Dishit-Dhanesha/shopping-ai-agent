<script setup lang="ts">
const contactOptions = [
  {
    label: 'Get recipe suggestions',
    details: 'Tell our AI what you have and get inspired recipe ideas.',
    icon: 'i-heroicons-light-bulb',
  },
  {
    label: 'Find ingredients',
    details: 'Quickly locate ingredients and check availability in our E-commerce platform.',
    icon: 'i-heroicons-magnifying-glass',
  },
  {
    label: 'Shop with our AI assistant',
    details: 'Personalized recommendations and one-click shopping assistance.',
    icon: 'i-heroicons-chat-bubble-oval-left',
  },
]
</script>

<template>
  <div class="py-16 md:flex md:mx-auto max-w-7xl px-6 mx-auto text-center">
    <div
      v-for="{ label, details, icon } in contactOptions"
      :key="label"
      class="mx-auto my-4 text-center text-slate-300"
    >
      <div
        class="border border-gray-700 rounded-md w-8 h-8 p-1 text-center my-0 m-auto flex items-center justify-center bg-gray-900"
      >
        <UIcon
          :name="icon"
          class="text-gray-400"
        />
      </div>

      <p class="py-1 my-2 font-medium font-body text-white">
        {{ label }}
      </p>
      <p class="leading-5 text-slate-400 font-body">
        {{ details }}
      </p>
    </div>
  </div>
</template>
