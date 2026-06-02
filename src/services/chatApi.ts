export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

/**
 * Sends the conversation history to the backend API and returns the AI reply.
 */
export async function fetchAIReply(messages: ChatMessage[]): Promise<string> {
  const response = await fetch("http://localhost:3000/api/chat", {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ messages }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error || "Failed to get response from backend");
  }

  const data = await response.json();
  return data.reply as string;
}