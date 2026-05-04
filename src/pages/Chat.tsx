"use client";

import React from "react";
import { ArrowLeft } from "lucide-react";

const Chat = () => {
  const goHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 p-4 relative">
      {/* Botão de voltar no canto superior esquerdo */}
      <button
        onClick={goHome}
        className="absolute top-6 left-6 flex items-center gap-2 bg-white text-gray-800 px-4 py-2 rounded-full hover:bg-gray-100 transition-colors shadow-lg"
      >
        <ArrowLeft size={20} />
        Voltar ao início
      </button>

      {/* Título com gradiente */}
      <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent tracking-tight mb-8">
        Chat com IA
      </h1>
    </div>
  );
};

export default Chat;