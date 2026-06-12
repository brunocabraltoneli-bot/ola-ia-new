"use client";

import React, { createContext, useContext, useMemo, type ReactNode } from "react";

interface AuthContextType {
  user: null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }

  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const value = useMemo<AuthContextType>(
    () => ({
      user: null,
      login: async () => undefined,
      logout: async () => undefined,
    }),
    [],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};