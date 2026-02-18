<template>
  <button
    @click="handleAdd"
    :disabled="loading"
    class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm"
  >
    <span v-if="loading">⏳</span>
    <span v-else>🛒 Add</span>
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{ productId: number }>()

const loading = ref(false)

const handleAdd = async () => {
  loading.value = true

  await $fetch("http://localhost:3000/api/cart/add", {
    method: "POST",
    body: {
      productId: props.productId,
      quantity: 1,
    },
  })

  loading.value = false
}
</script>
