"use client";

import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          {/* Home link now points to the protected /home route */}
          <Link
            to="/home"
            className="text-lg font-semibold hover:text-gray-300 transition-colors"
          >
            Início
          </Link>

          {/* Chat link (already correct) */}
          <Link
            to="/chat"
            className="text-lg font-semibold hover:text-gray-300 transition-colors"
          >
            Chat
          </Link>

          {/* Tasks link now points to the protected /tarefas route */}
          <Link
            to="/tarefas"
            className="text-lg font-semibold hover:text-gray-300 transition-colors"
          >
            Tarefas
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;