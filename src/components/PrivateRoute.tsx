"use client";
import { useEffect, useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface PrivateRouteProps {
  children: React.ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [isMounted, setIsMounted] = useState(false);

  // Wait for the component to mount before checking authentication
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="p-4">Loading...</div>;
  }

  // Redirect to login only if not authenticated
  if (!user) {
    navigate("/login", { replace: true });
    return null;
  }

  return <>{children}</>;
}