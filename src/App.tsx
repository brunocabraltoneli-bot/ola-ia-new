import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Index from "./pages/Index";
import Chat from "./pages/Chat";
import Tasks from "./pages/Tasks";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/entrar" element={<Login />} />
        <Route path="/home" element={<Index />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/tarefas" element={<Tasks />} />
        <Route path="*" element={<Navigate to="/entrar" replace />} />
      </Routes>
    </BrowserRouter>
  );
}