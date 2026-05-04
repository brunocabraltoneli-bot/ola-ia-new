"use client";

import React from 'react';
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Sparkles, Bot, ArrowRight } from 'lucide-react';

const Index = () => {
  const handleStartExploration = () => {
    window.location.href = '/chat';
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 p-4">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-4xl w-full mx-auto">
        {/* Main card */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12 text-center space-y-8 transform transition-all duration-300 hover:scale-[1.02]">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full blur-lg opacity-75"></div>
              <div className="relative bg-white p-6 rounded-full shadow-lg">
                <Sparkles className="text-purple-600" size={48} />
              </div>
            </div>
          </div>
          
          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent tracking-tight">
            Olá IA
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto">
            Bem-vindo ao futuro da interação humana e artificial. 
            Juntos, vamos criar experiências incríveis e inovadoras.
          </p>
          
          {/* Features grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-2xl border border-purple-100">
              <Bot className="text-purple-600 mx-auto mb-3" size={24} />
              <h3 className="font-semibold text-gray-800 mb-2">Inteligência Avançada</h3>
              <p className="text-sm text-gray-600">Soluções inteligentes para seus desafios</p>
            </div>
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-2xl border border-indigo-100">
              <Sparkles className="text-indigo-600 mx-auto mb-3" size={24} />
              <h3 className="font-semibold text-gray-800 mb-2">Criatividade Ilimitada</h3>
              <p className="text-sm text-gray-600">Explore novas possibilidades e ideias</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-2xl border border-blue-100">
              <ArrowRight className="text-blue-600 mx-auto mb-3" size={24} />
              <h3 className="font-semibold text-gray-800 mb-2">Inovação Contínua</h3>
              <p className="text-sm text-gray-600">Evolução constante e adaptabilidade</p>
            </div>
          </div>
          
          {/* CTA Button */}
          <div className="pt-6">
            <button 
              onClick={handleStartExploration}
              className="group relative bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <span className="relative z-10">Começar Exploração</span>
              <ArrowRight className="absolute right-4 top-1/2 transform -translate-y-1/2 group-hover:translate-x-1 transition-transform duration-300" size={20} />
            </button>
          </div>
        </div>
        
        {/* Footer */}
        <div className="mt-8">
          <MadeWithDyad />
        </div>
      </div>

      {/* Animation styles */}
      <style jsx global>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Index;