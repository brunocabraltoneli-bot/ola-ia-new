"use client";
import { useAuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface AuthRedirectorProps {
  children: React.ReactNode;
}

export default function AuthRedirector({ children }: AuthRedirectorProps) {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  // Verifica imediatamente se o usuário está autenticado
  if (!user) {
    navigate("/login", { replace: true });
    return null; // Evita renderizar qualquer conteúdo
  }

  // Usuário está autenticado – renderiza os filhos protegidos
  return <>{children}</>;
}