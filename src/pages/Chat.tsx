"use client";

import React, { useState } from "react";
import { ArrowLeft, Send } from "lucide-react";
import { fetchAIReply, type ChatMessage } from "../services/chatApi";

const Chat = () => {
  const goHome = () => {
    window.location.href = "/";
  };

  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState<Array<{ id: number; text: string; sender: "user" | "ai" }>>([
    { id: 1, text: "Olá! Sou uma IA assistente. Como posso ajudar você hoje?", sender: "ai" },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userText = inputMessage.trim();
    setInputMessage("");

    // Add user message locally
    const userMsg = { id: messages.length + 1, text: userText, sender: "user" as const };
    setMessages((prev) => [...prev, userMsg]);

    setIsLoading(true);

    try {
      // Build conversation history for the backend
      const conversation: ChatMessage[] = [
        { role: "system", content: "Você é um assistente virtual amigável e inteligente. Responda de forma clara e útil." },
        ...messages.map((msg) => ({
          role: msg.sender === "user" ? "user" : "assistant",
          content: msg.text,
        })),
        { role: "user", content: userText },
      ];

      const aiReply = await fetchAIReply(conversation);

      const aiMsg = { id: messages.length + 2, text: aiReply, sender: "ai" as const };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (error: any) {
      console.error("Chat error:", error);
      const errMsg = {
        id: messages.length + 2,
        text: "Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente.",
        sender: "ai" as const,
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 pt-16">
      {/* Header */}
      <div className="max-w-2xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <button onClick={goHome} className="flex items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors">
            <ArrowLeft size={20} /> <span className="font-medium">Voltar</span>
          </button>
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Chat com IA
          </h1>
        </div>
      </div>

      {/* Main content card with margin */}
      <div className="max-w-2xl mx-auto px-4 pb-32 mt-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
          {/* Message display area */}
          <div className="flex-1 overflow-y-auto space-y-4 max-h-[calc(100vh-200px)]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`max-w-[80%] p-4 rounded-2xl shadow-sm ${
                  msg.sender === "user"
                    ? "ml-auto bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-br-md"
                    : "mr-auto bg-white text-gray-800 rounded-bl-md border border-purple-200"
                }`}
              >
                {msg.text}
              </div>
            ))}

            {/* Loading indicator */}
            {isLoading && (
              <div className="mr-auto bg-white text-gray-800 rounded-bl-md rounded-2xl shadow-sm p-4 max-w-[80%] border border-purple-200">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                  <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  <span className="ml-2 text-gray-600">Pensando...</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Fixed bottom input bar */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-[90%] max-w-2xl bg-white rounded-2xl shadow-xl p-3 flex items-center gap-3 z-10">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Digite sua mensagem..."
          className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-400 p-2"
          disabled={isLoading}
        />
        <button
          onClick={handleSendMessage}
          disabled={isLoading || !inputMessage.trim()}
          className={`bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-5 py-2 rounded-full hover:scale-105 transition-all duration-300 flex items-center gap-2 font-medium ${
            isLoading || !inputMessage.trim() ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <Send size={18} />
          {isLoading ? "Enviando..." : "Enviar"}
        </button>
      </div>
    </div>
  );
};

export default Chat;