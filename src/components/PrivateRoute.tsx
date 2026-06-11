"use client";

import { useAuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

interface PrivateRouteProps {
  children: React.ReactNode;
}

// Define the component and export it as default
export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { user, loading } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate("/login", { replace: true });
    }
  }, [loading, user, navigate]);

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}

// Explicit default export (redundant but guarantees presence)
export { PrivateRoute as default };