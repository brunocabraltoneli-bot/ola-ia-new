"use client";

import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { supabase } from "../integrations/supabase/client";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { login } = useAuthContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      navigate("/home", { replace: true });
    } catch (err: any) {
      setErrorMessage(err.message ?? "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSignupClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    console.log("Botão clicado");
    setErrorMessage("");
    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) {
        setErrorMessage(error.message);
      } else {
        navigate("/home", { replace: true });
      }
    } catch (err) {
      setErrorMessage("Erro ao se cadastrar: " + (err instanceof Error ? err.message : "Erro desconhecido"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 p-4">
      <div className="w-full max-w-md space-y-6 bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8">
        <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
          Login
        </h2>
        {errorMessage && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
            {errorMessage}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Senha
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-md hover:from-purple-700 hover:to-indigo-700 transition-colors disabled:opacity-50"
          >
            {loading ? "Processando..." : "Entrar"}
          </button>
          <p className="text-center text-sm text-gray-500">
            Não tem conta?{" "}
            <a
              href="#"
              className="text-purple-600 hover:underline"
              onClick={handleSignupClick}
            >
              Cadastre-se
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;