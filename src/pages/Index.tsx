"use client";

import React from 'react';
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Sparkles } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-indigo-50 p-6">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl p-12 text-center space-y-8 transform transition-all hover:scale-[1.02]">
        <div className="flex justify-center">
          <div className="bg-indigo-100 p-4 rounded-full text-indigo-600">
            <Sparkles size={48} />
          </div>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-extrabold text-indigo-900 tracking-tight">
          Olá IA
        </h1>
        
        <p className="text-xl text-indigo-700/80 leading-relaxed">
          Seja muito bem-vindo! Esta é uma página criada para demonstrar a interação entre humanos e inteligência artificial. 
          Estamos prontos para construir coisas incríveis juntos.
        </p>
        
        <div className="pt-4">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full font-semibold text-lg transition-colors shadow-lg shadow-indigo-200">
            Começar Exploração
          </button>
        </div>
      </div>
      
      <div className="mt-8">
        <MadeWithDyad />
      </div>
    </div>
  );
};

export default Index;