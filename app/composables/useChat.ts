import { ref } from "vue"
import { sendChatMessage } from "~/services/chatService"
import { formatAssistantMessage } from "~/utils/formatAssistantMessage"

interface ChatMessage {
  type: "user" | "assistant"
  content: string
  html?: string
}

export function useChat() {
  // Chat State
  const messages = ref<ChatMessage[]>([])

  const isTyping = ref(false)

  // Session State (Persistent across Nuxt)
  const sessionId = useState("sessionId", () => crypto.randomUUID())
  const chatId = useState("chatId", () => crypto.randomUUID())

  // Send Message Logic with Streaming Effect
  const sendMessage = async (text: string) => {
    const message = String(text || "")
    console.log(message, "Message")
    if (!message.trim()) return
   
    if (isTyping.value) return

    // Push user message
    messages.value.push({
      type: "user",
      content: text,
    })

    isTyping.value = true

    try {
      // Backend Call
      const res: any = await sendChatMessage(
        sessionId.value,
        chatId.value,
        text
      )

      const fullContent = res.content || "No response received."
      
      // Add empty assistant message
      const messageIndex = messages.value.length
      messages.value.push({
        type: "assistant",
        content: "",
        html: "",
      })

      isTyping.value = false

      // Simulate streaming effect
      let currentText = ""
      const words = fullContent.split(" ")
      
      for (let i = 0; i < words.length; i++) {
        currentText += (i > 0 ? " " : "") + words[i]
        messages.value[messageIndex].content = currentText
        messages.value[messageIndex].html = formatAssistantMessage(currentText)
        
        // Wait a bit between words for streaming effect
        await new Promise(resolve => setTimeout(resolve, 30))
      }

    } catch (err) {
      messages.value.push({
        type: "assistant",
        content: "❌ Something went wrong. Try again.",
      })
      isTyping.value = false
    }
  }

  // Reset Chat Session
  const resetChat = () => {
    messages.value = []
    sessionId.value = crypto.randomUUID()
    chatId.value = crypto.randomUUID()
  }

  return {
    messages,
    isTyping,
    sendMessage,
    resetChat,
    sessionId,
    chatId,
  }
}
