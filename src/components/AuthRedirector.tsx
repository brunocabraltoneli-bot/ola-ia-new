"use client";
import { useEffect, useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface AuthRedirectorProps {
  children: React.ReactNode;
}

export default function AuthRedirector({ children }: AuthRedirectorProps) {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  // Wait for component to mount before checking auth
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="p-4">Loading...</div>;
  }

  // If not authenticated, redirect to login page
  if (!user) {
    navigate("/login", { replace: true });
    return null;
  }

  // User is authenticated – render the protected children
  return <>{children}</>;
}