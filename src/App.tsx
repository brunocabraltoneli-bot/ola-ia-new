import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Chat from './pages/Chat';
import Tasks from './pages/Tasks';
import { useAuthContext } from './contexts/AuthContext';

function PrivateRoute({ children }: { children: JSX.Element }) {
  const { user } = useAuthContext();
  return user ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public route */}
        <Route path="/login" element={<Login />} />

        {/* Protected routes (wrapped by PrivateRoute) */}
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/chat" element={<PrivateRoute><Chat /></PrivateRoute>} />
        <Route path="/tarefas" element={<PrivateRoute><Tasks /></PrivateRoute>} />

        {/* Security redirect */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}