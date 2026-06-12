"use client";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Index from "./pages/Index";
import Chat from "./pages/Chat";
import Tasks from "./pages/Tasks";
import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";
import { useAuthContext } from "./contexts/AuthContext";

export default function App() {
  const { user } = useAuthContext();

  if (!user) {
    return <Login />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout><Index /></Layout>} />
        <Route path="/home" element={<Layout><PrivateRoute><Index /></PrivateRoute></Layout>} />
        <Route path="/chat" element={<Layout><Chat /></Layout>} />
        <Route path="/tarefas" element={<Layout><Tasks /></Layout>} />
        <Route path="/login" element={<Login />} />
        <Route path="/entrar" element={<Login />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}