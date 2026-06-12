import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Index from "./pages/Index";
import Chat from "./pages/Chat";
import Tasks from "./pages/Tasks";
import { useAuthContext } from "./contexts/AuthContext";
import Layout from "./components/Layout";

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuthContext();
  console.log("PrivateRoute - user:", user, "loading:", loading);
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-600 border-t-transparent"></div>
      </div>
    );
  }
  if (user === null) {
    console.log("PrivateRoute - No user, redirecting to /entrar");
    return <Navigate to="/entrar" replace />;
  }
  // Render children inside the shared layout
  return <Layout>{children}</Layout>;
}

export default function App() {
  const { user, loading } = useAuthContext();
  console.log("App - user:", user, "loading:", loading);
  return (
    <BrowserRouter>
      <Routes>
        {/* Public route */}
        <Route path="/entrar" element={<Login />} />
        {/* Protected routes (wrapped by PrivateRoute with Layout) */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Index />
            </PrivateRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          }
        />
        <Route
          path="/tarefas"
          element={
            <PrivateRoute>
              <Tasks />
            </PrivateRoute>
          }
        />
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/entrar" replace />} />
      </Routes>
    </BrowserRouter>
  );
}