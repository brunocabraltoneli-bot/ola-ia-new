import 'dotenv/config';
import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000; // Alterado para 3000

// Middleware
app.use(cors({
  origin: "*", // Permite que qualquer porta fale com o servidor
  methods: ["POST", "GET"],
  credentials: true
}));
app.use(express.json());

// Environment variable (server-side, not prefixed with VITE_)
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

// Debug: Check if API key is loaded
console.log("🔑 OPENROUTER_API_KEY loaded:", OPENROUTER_API_KEY ? "YES" : "NO");

if (!OPENROUTER_API_KEY) {
  console.error("❌ OpenRouter API key not set. Add OPENROUTER_API_KEY to your .env file.");
}

// Helper to call OpenRouter
async function callOpenRouter(messages: { role: string; content: string }[]) {
  console.log("[server] Calling OpenRouter with messages:", messages.length);

  const response = await fetch(OPENROUTER_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer sk-or-v1-e18d2be9d73289afa0ae5a743cc1f629aa9be44fbbfc5580bfbc",
      "HTTP-Referer": "http://localhost:3000",
      "X-Title": "My AI Chat App"
    },
    body: JSON.stringify({
      model: "meta-llama/llama-3-8b-instruct",
      messages: messages,
      temperature: 0.7,
      max_tokens: 500,
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    console.error("[server] OpenRouter error response:", err);
    throw new Error(err.error?.message || "Failed to fetch from OpenRouter");
  }

  const data = await response.json();
  return data.choices[0].message.content as string;
}