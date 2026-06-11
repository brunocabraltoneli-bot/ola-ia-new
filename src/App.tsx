"use client";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Chat from "./pages/Chat";
import Tasks from "./pages/Tasks";
import Navbar from "./components/Navbar";
import { PrivateRoute } from "./components/PrivateRoute";
import Login from "./pages/Login";
import Home from "./pages/Home"; // New Home page

const App = () => (
  <BrowserRouter>
    <Navbar />
    <Routes>
      {/* Root route protected: redirect to /login if not authenticated */}
      <Route path="/" element={<PrivateRoute><Index /></PrivateRoute>} />
      
      {/* Public login route */}
      <Route path="/login" element={<Login />} />
      
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
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;