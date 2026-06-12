import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Index from "./pages/Index";
import Chat from "./pages/Chat";
import Tasks from "./pages/Tasks";
import Layout from "./components/Layout";
import AuthRedirector from "./components/AuthRedirector";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public login route */}
        <Route path="/entrar" element={<Login />} />

        {/* Protected routes wrapped in AuthRedirector */}
        <Route path="/" element={<AuthRedirector><Layout /></AuthRedirector>}>
          <Route path="/home" element={<Index />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/tarefas" element={<Tasks />} />
        </Route>

        {/* Fallback for any unmatched URL */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}