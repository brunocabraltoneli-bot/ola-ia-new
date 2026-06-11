"use client";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Chat from "./pages/Chat";
import Tasks from "./pages/Tasks";
import Navbar from "./components/Navbar";
import { PrivateRoute } from "./components/PrivateRoute";
import Login from "./pages/Login";
import Home from "./pages/Home";

const App = () => (
  <BrowserRouter>
    <Navbar />
    <Routes>
      {/* Root route (/) - PROTECTED: Redirects to /login if not authenticated */}
      <Route path="/" element={<PrivateRoute><Index /></PrivateRoute>} />
      
      {/* Public login route - ONLY accessible without authentication */}
      <Route path="/login" element={<Login />} />
      
      {/* Protected routes - All require authentication */}
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
      {/* 404 for any other routes */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;