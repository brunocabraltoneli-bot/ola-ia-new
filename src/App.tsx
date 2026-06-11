"use client";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chat from "./pages/Chat";
import Home from "./pages/Home";
import Index from "./pages/Index";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Tasks from "./pages/Tasks";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import { useAuthContext } from "./contexts/AuthContext";

export default function App() {
  const { user, loading } = useAuthContext();

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Root route: show Login if not authenticated, else Index */}
        <Route
          path="/"
          element={
            loading ? (
              <div className="p-4">Loading...</div>
            ) : user ? (
              <Index />
            ) : (
              <Login />
            )
          }
        />

        {/* Protected routes */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
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
          path="/tasks"
          element={
            <PrivateRoute>
              <Tasks />
            </PrivateRoute>
          }
        />

        <Route path="/login" element={<Login />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}