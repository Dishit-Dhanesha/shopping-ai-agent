<script setup lang="ts">
import { ref } from "vue"
import { useToast } from "#imports"

const toast = useToast()

const isChatOpen = useState('chatAssistantOpen', () => false)
const chatInput = ref("")
const chatInitialMessage = useState('chatInitialMessage', () => '')

// ✅ Use composable
const { messages, sendMessage, resetChat, isTyping } = useChat()

// Watch for initial message from category page
watch(chatInitialMessage, (newMessage) => {
  if (newMessage && isChatOpen.value) {
    chatInput.value = newMessage
    // Auto-submit after a short delay
    nextTick(() => {
      handleSubmit()
      chatInitialMessage.value = '' // Clear after use
    })
  }
})

// ✅ Suggestions
const suggestions = [
  { emoji: "🍝", label: "PASTA INGREDIENTS", text: "What ingredients do I need for pasta?" },
  { emoji: "🥬", label: "FRESH VEGETABLES", text: "Show me fresh vegetables" },
  { emoji: "🛒", label: "VIEW MY CART", text: "What's in my cart?" },
]

// ✅ Toggle Chat
const toggleChat = () => {
  isChatOpen.value = !isChatOpen.value
}

// ✅ End Session
const endSession = () => {
  resetChat()
  isChatOpen.value = false
}

// ✅ Minimize
const minimizeChat = () => {
  isChatOpen.value = false
}

// ✅ Submit Message
const handleSubmit = async () => {
  if (!chatInput.value.trim()) return

  const messageText = chatInput.value
  chatInput.value = "" // Clear input immediately

  await sendMessage(messageText)
}

// ✅ Suggestion Click
const useSuggestion = (text: string) => {
  chatInput.value = text
  handleSubmit()
}

/* ---------------------------------------
   ✅ INLINE BUTTON CLICK HANDLER
---------------------------------------- */
const { addToCart: addToLocalCart } = useLocalCart()

const handleChatClick = (event: MouseEvent) => {
  const target = event.target as HTMLElement

  // ✅ Add - check for button or its parent
  const addBtn = target.closest('.add-to-cart-btn')
  if (addBtn) {
    const id = Number(addBtn.getAttribute('data-product-id'))
    const name = addBtn.getAttribute('data-product-name') || `Product #${id}`
    const price = Number(addBtn.getAttribute('data-product-price')) || 50
    
    if (id) {
      // Add to local cart
      addToLocalCart({
        id,
        name,
        price,
      })
      
      toast.add({
        title: 'Added to cart',
        description: `${name} added to your cart`,
        color: 'primary',
        icon: 'i-heroicons-check-circle',
      })
    }
  }

  // ✅ Details - check for button or its parent
  const detailsBtn = target.closest('.details-btn')
  if (detailsBtn) {
    const id = Number(detailsBtn.getAttribute('data-product-id'))
    if (id) navigateTo(`/products/${id}`)
  }
}

</script>

<template>
  <div class="fixed bottom-6 right-6 z-50">
    <!-- Chat Toggle Button -->
    <button
      v-if="!isChatOpen"
      @click="toggleChat"
      class="flex items-center gap-3 bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-black text-white px-6 py-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 animate-bounce"
    >
      <span class="text-2xl animate-pulse">🤖</span>
      <span class="font-bold text-sm hidden sm:inline">
        NEED HELP FINDING SOMETHING WITH AI? 🤔
      </span>
      <span class="font-bold text-sm sm:hidden">HELP?</span>
    </button>

    <!-- Chat Window -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 translate-y-4 scale-95"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 translate-y-4 scale-95"
    >
      <div
        v-if="isChatOpen"
        class="bg-white rounded-2xl shadow-2xl w-[380px] sm:w-[420px] h-[600px] flex flex-col overflow-hidden border border-gray-200"
      >
        <!-- Header -->
        <div class="bg-blue-600 p-4 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="text-3xl animate-pulse">🤖</div>
            <div>
              <h4 class="font-bold text-white text-sm">SHOPPING ASSISTANT</h4>
              <span class="text-xs text-blue-100 flex items-center gap-1">
                <span class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                ONLINE • READY TO HELP!
              </span>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <UButton
              color="neutral"
              variant="ghost"
              size="xs"
              icon="i-heroicons-arrow-right-start-on-rectangle"
              @click="endSession"
              class="text-white hover:bg-blue-700"
            />
            <UButton
              color="neutral"
              variant="ghost"
              size="xs"
              icon="i-heroicons-minus"
              @click="minimizeChat"
              class="text-white hover:bg-blue-700"
            />
          </div>
        </div>

        <!-- Messages -->
        <div
          class="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50"
          @click="handleChatClick"
        >
          <!-- Welcome -->
          <div v-if="messages.length === 0" class="flex gap-3">
            <div class="text-2xl flex-shrink-0">🤖</div>
            <div class="bg-white rounded-lg p-4 text-sm text-gray-800 shadow-lg border border-gray-200">
              <p class="mb-2">Hi there! 👋 I'm your shopping assistant!</p>
              <p class="mb-2">I can help you with:</p>
              <ul class="space-y-1 mb-2">
                <li>🥘 Recipe Ingredients</li>
                <li>🔍 Finding Products</li>
                <li>🛒 Managing Your Cart</li>
                <li>💡 Cooking Suggestions</li>
              </ul>
              <p>What would you like to cook today?</p>
            </div>
          </div>

          <!-- Chat Messages -->
          <div
            v-for="(message, i) in messages"
            :key="i"
            class="flex gap-3"
            :class="message.type === 'user' ? 'justify-end' : 'justify-start'"
          >
            <!-- Assistant Avatar -->
            <div v-if="message.type === 'assistant'" class="text-2xl">🤖</div>

            <!-- Bubble -->
            <div class="max-w-[80%] space-y-3">
              <div
                class="rounded-lg p-4 text-sm shadow-md whitespace-pre-line"
                :class="
                  message.type === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-800 border border-gray-200'
                "
              >
                <!-- ✅ User Message -->
                <span v-if="message.type === 'user'">
                  {{ message.content }}
                </span>

                <!-- ✅ Assistant Message With Inline Buttons -->
                <span v-else class="prose text-gray-800">
                  <span v-html="message.html || message.content"></span>
                  <span v-if="i === messages.length - 1 && !isTyping && message.content" class="inline-block w-1 h-4 bg-blue-600 ml-1 animate-pulse"></span>
                </span>
              </div>
            </div>

            <!-- User Avatar -->
            <div v-if="message.type === 'user'" class="text-2xl">👤</div>
          </div>

          <!-- Typing -->
          <div v-if="isTyping" class="flex gap-3">
            <div class="text-2xl">🤖</div>
            <div class="bg-white p-4 rounded-lg border border-gray-200 space-y-2 w-64">
              <USkeleton class="h-3 w-full" />
              <USkeleton class="h-3 w-3/4" />
              <USkeleton class="h-3 w-1/2" />
            </div>
          </div>
        </div>

        <!-- Input -->
        <div class="p-4 bg-white border-t border-gray-200">
          <!-- Suggestions -->
          <div v-if="!isTyping" class="flex gap-2 mb-3 overflow-x-auto">
            <button
              v-for="suggestion in suggestions"
              :key="suggestion.label"
              @click="useSuggestion(suggestion.text)"
              class="flex-shrink-0 bg-white hover:bg-blue-600 hover:text-white text-gray-800 px-3 py-2 rounded-lg text-xs font-bold transition-all border border-gray-300"
            >
              {{ suggestion.emoji }} {{ suggestion.label }}
            </button>
          </div>

          <!-- Input Form -->
          <form @submit.prevent="handleSubmit" class="flex gap-2">
            <input
              v-model="chatInput"
              type="text"
              placeholder="Ask about recipes, ingredients, or products..."
              class="flex-1 bg-gray-100 text-gray-800 px-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-300"
            />
            <UButton
              type="submit"
              icon="i-heroicons-paper-airplane"
              size="lg"
              :disabled="!chatInput.trim()"
              :class="chatInput.trim() ? '!bg-blue-600 hover:!bg-blue-700 !text-white' : '!bg-gray-400 !text-gray-600 cursor-not-allowed'"
            />
          </form>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
/* ✅ Markdown spacing cleanup */
.prose p {
  margin: 4px 0 !important;
  color: inherit;
}

.prose ul {
  margin: 6px 0 !important;
  padding-left: 18px;
  color: inherit;
}

.prose li {
  margin: 2px 0 !important;
  color: inherit;
}

/* ✅ Nuxt UI Button Overrides for Inline Chat Buttons */
:deep(.add-to-cart-btn),
:deep(.details-btn) {
  display: inline-flex !important;
  align-items: center;
  justify-content: center;
  
  width: 32px;
  height: 32px;
  padding: 0;
  margin: 0 4px;
  
  border-radius: 6px;
  font-size: 16px;
  
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  vertical-align: middle;
  
  /* Fix emoji alignment */
  line-height: 1;
  font-family: "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
}

:deep(.add-to-cart-btn) {
  background-color: #ea580c;
}

:deep(.add-to-cart-btn:hover) {
  background-color: #c2410c;
  transform: scale(1.1);
}

:deep(.details-btn) {
  background-color: #374151;
}

:deep(.details-btn:hover) {
  background-color: #1f2937;
  transform: scale(1.1);
}
</style>
