"use client";

import React from "react";
import { ArrowLeft } from "lucide-react";

const Chat = () => {
  const goHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 p-4">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Chat com IA</h1>
      <button
        onClick={goHome}
        className="flex items-center gap-2 bg-gray-800 text-white px-6 py-3 rounded-full hover:bg-gray-700 transition-colors"
      >
        <ArrowLeft size={20} />
        Voltar ao início
      </button>
    </div>
  );
};

export default Chat;