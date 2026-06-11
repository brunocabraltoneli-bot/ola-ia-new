... code ... ＜/dyad-write>

＜dyad-chat-summary>App.tsx updated to protect all routes with PrivateRoute and force login＜/dyad-chat-summary>

Also maybe include ＜dyad-command type="restart"> to reload.

But the user didn't request restart; but it's okay to include. However we must not add extra commands beyond needed? The guidelines say we can suggest restart if needed. It's fine.

Let's produce final answer.
</think><dyad-write path="src/App.tsx" description="Replace App.tsx with code that blocks all routes until the user logs in">
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