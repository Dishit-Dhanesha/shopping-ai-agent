<script lang="ts" setup>
const { cartItemCount, isCartOpen } = useLocalCart()

const isCategoryMenuOpen = ref(false)

function closeCategoryMenu() {
  isCategoryMenuOpen.value = false
}

const links = [
  
  {
    label: 'Today\'s Fresh Stuff',
    to: '/shop/fresh',
    onSelect: closeCategoryMenu,
  },
  {
    label: 'Shop By Category',
    to: '/shop/category',
    onSelect: closeCategoryMenu,
  },
   {
    label: 'About Project',
    to: '/about',
    onSelect: closeCategoryMenu,
  },
]
</script>

<template>
  <header
    class="flex justify-center w-full py-2 lg:py-5 border-b border-slate-800"
  >
    <div
      class="flex flex-wrap lg:flex-nowrap items-center justify-between flex-row h-full w-full py-2 lg:py-0 max-w-7xl px-6"
    >
      <div class="flex items-center flex-1 gap-1.5">
        <UButton
          color="neutral"
          variant="ghost"
          aria-label="Category Menu Open Button"
          class="lg:hidden mr-2"
          icon="i-heroicons-bars-3-20-solid"
          @click="isCategoryMenuOpen = true"
        />
        <NuxtLink
          to="/"
          aria-label="AI Commerce Homepage"
          class="inline-block focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm shrink-0"
        >
          <span class="text-2xl md:text-3xl font-bold">
            <span class="text-green-400">AI</span>
            <span class="text-white"> Commerce</span>
          </span>
        </NuxtLink>
      </div>

      <USlideover
        v-model:open="isCategoryMenuOpen"
        side="left"
        title="Navigation"
        description="Explore our categories"
        close-icon="i-heroicons-x-mark-20-solid"
      >
        <template #body>
          <div class="text-left h-full flex flex-col">
            <div class="block justify-between items-end">
              <!-- <LazyLayoutSearchBar
                class="my-4 w-full"
                @item-selected="isCategoryMenuOpen = false"
              /> -->
              <UNavigationMenu
                orientation="vertical"
                :items="links"
              />
            </div>
          </div>
        </template>
      </USlideover>

      <UNavigationMenu
        :items="links"
        class="hidden lg:flex w-fit text-white"
      />

      <div class="flex items-center relative flex-1 gap-1.5 justify-end">
        <div class="hidden sm:flex items-center gap-2">
          <UAvatar
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=User"
            alt="User Avatar"
            size="sm"
          />
          <span class="text-white text-sm font-medium">Hello, User</span>
        </div>
        <!-- Cart Button -->
        <UChip
          :text="cartItemCount"
          :show="cartItemCount > 0"
          size="3xl"
        >
          <UButton
            class="ml-4"
            aria-label="Cart"
            :padded="false"
            color="neutral"
            variant="link"
            icon="i-heroicons-shopping-cart"
            @click="() => { console.log('Cart clicked', isCartOpen); isCartOpen = true; console.log('After', isCartOpen) }"
          />
        </UChip>
      </div>
    </div>
  </header>
</template>
