import "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Environment variable (server-side, not prefixed with VITE_)
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

// Debug: Check if API key is loaded
console.log("🔑 OPENAI_API_KEY loaded:", OPENAI_API_KEY ? "YES" : "NO");

if (!OPENAI_API_KEY) {
  console.error("❌ OpenAI API key not set. Add OPENAI_API_KEY to your .env file.");
}

// Helper to call OpenAI
async function callOpenAI(messages: { role: string; content: string }[]) {
  console.log("[server] Calling OpenAI with messages:", messages.length);
  
  const response = await fetch(OPENAI_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages,
      temperature: 0.7,
      max_tokens: 500,
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    console.error("[server] OpenAI error response:", err);
    throw new Error(err.error?.message || "Failed to fetch from OpenAI");
  }

  const data = await response.json();
  return data.choices[0].message.content as string;
}

// API route
app.post("/api/chat", async (req: Request, res: Response) => {
  console.log("[server] /api/chat endpoint called");
  
  try {
    const { messages } = req.body;
    console.log("[server] Received messages:", messages);
    
    if (!Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid payload: messages array required" });
    }

    const reply = await callOpenAI(messages);
    console.log("[server] OpenAI reply:", reply);
    res.json({ reply });
  } catch (error: any) {
    console.error("[server] Error in /api/chat:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend listening on http://localhost:${PORT}`);
});
</arg_value>
<dyad-write path="src/services/chatApi.ts" description="Frontend helper that calls the local /api/chat endpoint">
export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

/**
 * Sends the conversation history to the backend API and returns the AI reply.
 */
export async function fetchAIReply(messages: ChatMessage[]): Promise<string> {
  console.log("[chatApi] Sending messages to /api/chat:", messages);
  
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ messages }),
  });

  console.log("[chatApi] Response status:", response.status);

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    console.error("[chatApi] Error response:", err);
    throw new Error(err.error || "Failed to get response from backend");
  }

  const data = await response.json();
  console.log("[chatApi] Response data:", data);
  return data.reply as string;
}