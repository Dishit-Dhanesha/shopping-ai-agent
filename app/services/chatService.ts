export async function sendChatMessage(
  sessionId: string,
  chatId: string,
  message: string
) {
  return await $fetch("http://localhost:3000/api/ai/chat", {
    method: "POST",
    body: {
      sessionId,
      chatId,
      message,
    },
  })
}
