import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Login from './pages/auth/Login';
import Dashboard from './pages/Dashboard';
import OurWork from './pages/crud/OurWork';
import Services from './pages/crud/Services';
import Events from './pages/crud/Events';
import News from './pages/crud/News';
import ContactMessages from './pages/crud/ContactMessages';
import PrivateRoute from './components/PrivateRoute';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="our-work" element={<OurWork />} />
              <Route path="services" element={<Services />} />
              <Route path="events" element={<Events />} />
              <Route path="news" element={<News />} />
              <Route path="contact-messages" element={<ContactMessages />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
