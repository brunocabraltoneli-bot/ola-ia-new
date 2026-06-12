"use client";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Index from "./pages/Index";
import Chat from "./pages/Chat";
import Tasks from "./pages/Tasks";
import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";
import { useAuthContext } from "./contexts/AuthContext";
import AuthRedirector from "./components/AuthRedirector";

const ProtectedHome = () => {
  const { user } = useAuthContext();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return (
    <Layout>
      <Index />
    </Layout>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedHome />} />
        <Route path="/home" element={<Layout><PrivateRoute><Index /></PrivateRoute></Layout>} />
        <Route path="/chat" element={<Layout><Chat /></Layout>} />
        <Route path="/tarefas" element={<Layout><Tasks /></Layout>} />
        <Route path="/login" element={<AuthRedirector><Login /></AuthRedirector>} />
        <Route path="/entrar" element={<AuthRedirector><Login /></AuthRedirector>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}