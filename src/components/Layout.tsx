"use client";

import { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

interface LayoutProps {
  children?: ReactNode; // not used when Layout is used as a route wrapper
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Fixed top navigation */}
      <Navbar />
      {/* Page content – render nested routes */}
      <main className="flex-1 pt-16">
        {/* When Layout is used as a route element, children are rendered via Outlet */}
        <Outlet />
        {/* Fallback for direct usage with children prop (optional) */}
        {children}
      </main>
    </div>
  );
}