<script setup lang="ts">
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - AI Assisted E-Commerce` : 'AI Assisted E-Commerce'
  },
})
</script>

<template>
  <UApp>
    <Body class="bg-[#020420]" />
    <main id="main">
      <LayoutNavbarTop class="mb-5" />

      <NuxtPage />

      <LayoutCookieConsent />
      <LazyLayoutTheFooter class="mt-5" />
      <ChatFloatingAssistant />
      <CartSidebar />
    </main>
  </UApp>
</template>
