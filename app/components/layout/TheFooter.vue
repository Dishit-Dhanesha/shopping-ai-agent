<script lang="ts" setup>
const isChatOpen = useState('chatAssistantOpen', () => false)

function openChat() {
  isChatOpen.value = true
}

const categories = [
  {
    label: 'Portfolio',
    subcategories: [
      {
        subcategoryLabel: 'About This Project',
        link: '/about',
      },
      {
        subcategoryLabel: 'My Portfolio',
        link: 'https://dishit.royalegroup.io/',
        external: true,
      },
      {
        subcategoryLabel: 'GitHub',
        link: 'https://github.com/dishit-dhanesha',
        external: true,
      },
      {
        subcategoryLabel: 'LinkedIn',
        link: 'https://www.linkedin.com/in/dishit-dhanesha/',
        external: true,
      },
    ],
  },
  {
    label: 'Project',
    subcategories: [
      {
        subcategoryLabel: 'Shop Fresh',
        link: '/shop/fresh',
      },
      {
        subcategoryLabel: 'Categories',
        link: '/shop/category',
      },
      {
        subcategoryLabel: 'AI Assistant',
        action: 'openChat',
      },
      {
        subcategoryLabel: 'Source Code',
        link: 'https://github.com/dishit-dhanesha',
        external: true,
      },
    ],
  },
  {
    label: 'Technologies',
    subcategories: [
      {
        subcategoryLabel: 'Nuxt 3',
        link: 'https://nuxt.com/',
        external: true,
      },
      {
        subcategoryLabel: 'LangChain',
        link: 'https://www.langchain.com/',
        external: true,
      },
      {
        subcategoryLabel: 'Mistral AI',
        link: 'https://mistral.ai/',
        external: true,
      },
      {
        subcategoryLabel: 'Redis',
        link: 'https://redis.io/',
        external: true,
      },
    ],
  },
]

const socialIcons = [
  {
    id: 0,
    name: 'LinkedIn',
    icon: 'i-simple-icons-linkedin',
    link: 'https://www.linkedin.com/in/dishit-dhanesha/',
  },
  {
    id: 1,
    name: 'Telegram',
    icon: 'i-simple-icons-telegram',
    link: 'https://t.me/Dishit_Dhanesha/',
  },
  {
    id: 2,
    name: 'GitHub',
    icon: 'i-simple-icons-github',
    link: 'https://github.com/dishit-dhanesha',
  },
]
</script>

<template>
  <footer class="pt-12 border-t border-slate-800 text-center">
    <div class="block sm:flex justify-between mb-10 max-w-7xl px-6 mx-auto">
      <div
        v-for="{ label, subcategories } in categories"
        :key="label"
        class="sm:pb-4 text-center sm:text-left"
      >
        <div class="text-lg font-medium leading-7 text-white font-body mb-2">
          {{ label }}
        </div>
        <ul>
          <li
            v-for="{ subcategoryLabel, link, external, action } in subcategories"
            :key="subcategoryLabel"
            class="text-sm text-gray-400 mb-2 hover:underline hover:text-green-400"
          >
            <button 
              v-if="action === 'openChat'"
              @click="openChat"
              class="cursor-pointer"
            >
              {{ subcategoryLabel }}
            </button>
            <NuxtLink 
              v-else
              :to="link"
              :target="external ? '_blank' : undefined"
              :external="external"
            >
              {{ subcategoryLabel }}
            </NuxtLink>
          </li>
        </ul>
      </div>

      <!-- Social Icons -->
      <div class="mb-4 mt-5 sm:mt-0 flex flex-col items-center sm:items-start">
        <p class="text-white text-base mb-4">
          Connect with me
        </p>
        <ul class="flex gap-4">
          <li
            v-for="icon in socialIcons"
            :key="icon.id"
          >
            <a
              :href="icon.link"
              target="_blank"
              :aria-label="icon.name"
              class="text-gray-400 hover:text-white transition-colors"
            >
              <UIcon
                :name="icon.icon"
                class="w-8 h-8"
              />
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="border-t border-slate-800 py-8">
      <div
        class="max-w-7xl px-6 mx-auto flex justify-center sm:justify-between flex-wrap sm:flex-nowrap gap-5 sm:gap-0"
      >
        

        <div>
          <p
            class="flex items-center justify-center leading-5 text-center text-white/50 font-body text-sm"
          >
            Created by 
            <a 
              target="_blank" 
              href="https://dishit.royalegroup.io/"
              class="ml-1 text-green-400 hover:text-green-300 font-semibold hover:underline transition-colors"
            >
              Dishit Dhanesha
            </a>
          </p>
        </div>

        
      </div>
    </div>
  </footer>
</template>
