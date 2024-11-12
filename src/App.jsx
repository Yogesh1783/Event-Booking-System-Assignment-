import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { EventProvider } from './context/EventContext';
import EventList from './components/EventList';
import EventDetail from './screens/EventDetail';
import LoginPage from './screens/LoginPage';
import Register from './screens/Register';
import { AuthProvider, useAuth } from './context/AuthContext';

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={user ? <EventList /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/event/:id"
        element={user ? <EventDetail /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/login"
        element={user ? <Navigate to="/" replace /> : <LoginPage />}
      />
      <Route
        path="/register"
        element={user ? <Navigate to="/" replace /> : <Register />}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <EventProvider>
        <Router>
          <AppRoutes />
        </Router>
      </EventProvider>
    </AuthProvider>
  );
}

export default App;
