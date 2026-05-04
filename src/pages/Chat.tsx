"use client";

import React, { useState } from "react";
import { ArrowLeft, Send } from "lucide-react";

const Chat = () => {
  const goHome = () => {
    window.location.href = "/";
  };

  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, text: "Olá! Sou uma IA assistente. Como posso ajudar você hoje?", sender: "ai" },
    { id: 2, text: "Oi! Quero testar esse chat.", sender: "user" },
  ]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    const newUserMessage = { id: messages.length + 1, text: inputMessage, sender: "user" };
    setMessages((prev) => [...prev, newUserMessage]);
    setInputMessage("");

    // Simulated AI response
    setTimeout(() => {
      const aiResponse = { 
        id: messages.length + 2, 
        text: "Entendi! Estou aqui para ajudar. O que você gostaria de saber?", 
        sender: "ai" 
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300">
      {/* Back button top left */}
      <button
        onClick={goHome}
        className="absolute top-6 left-6 group flex items-center gap-2 bg-white text-gray-800 px-4 py-2 rounded-full hover:bg-gray-50 transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg z-20"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
        Voltar ao início
      </button>

      {/* Main content */}
      <div className="flex flex-col h-screen max-w-2xl mx-auto pt-20 pb-32 px-4">
        {/* Title with gradient and hover animation */}
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent tracking-tight text-center mb-8 hover:scale-[1.02] transition-transform duration-300 cursor-default">
          Chat com IA
        </h1>

        {/* Message display area */}
        <div className="flex-1 overflow-y-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`max-w-[80%] p-4 rounded-2xl shadow-sm ${
                message.sender === "user"
                  ? "ml-auto bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-br-md"
                  : "mr-auto bg-white text-gray-800 rounded-bl-md"
              }`}
            >
              {message.text}
            </div>
          ))}
        </div>
      </div>

      {/* Fixed bottom input bar */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-[90%] max-w-2xl bg-white rounded-2xl shadow-xl p-3 flex items-center gap-3 z-10">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          placeholder="Digite sua mensagem..."
          className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-400 p-2"
        />
        <button
          onClick={handleSendMessage}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-5 py-2 rounded-full hover:scale-105 transition-all duration-300 flex items-center gap-2 font-medium"
        >
          <Send size={18} />
          Enviar
        </button>
      </div>
    </div>
  );
};

export default Chat;