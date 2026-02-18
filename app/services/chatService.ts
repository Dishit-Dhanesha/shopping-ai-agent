export async function sendChatMessage(
  sessionId: string,
  chatId: string,
  message: string
) {
  return await $fetch("https://shopping-ai-agent.onrender.com/api/ai/chat", {
    method: "POST",
    body: {
      sessionId,
      chatId,
      message,
    },
  })
}
