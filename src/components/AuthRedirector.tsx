"use client";

import { useAuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface AuthRedirectorProps {
  children: React.ReactNode;
}

export default function AuthRedirector({ children }: AuthRedirectorProps) {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  if (!user) {
    navigate("/login", { replace: true });
    return null;
  }

  return <>{children}</>;
}