"use client";

import { ReactNode } from "react";
import Navbar from "./Navbar";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Fixed top navigation */}
      <Navbar />
      {/* Page content */}
      <main className="flex-1 pt-16">{children}</main>
    </div>
  );
}