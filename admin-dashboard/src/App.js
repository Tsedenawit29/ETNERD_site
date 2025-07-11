import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Login from './pages/auth/Login';
import Dashboard from './pages/Dashboard';
import Services from './pages/crud/Services';
import News from './pages/crud/News';
import ContactMessages from './pages/crud/ContactMessages';
import BookedServices from './pages/crud/BookedServices';
import Jobs from './pages/crud/Jobs';
import CareerView from './pages/crud/CareerView';
import PrivateRoute from './components/PrivateRoute';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <Routes>
            <Route path="login" element={<Login />} />
            <Route path="/admin" element={<PrivateRoute><Layout /></PrivateRoute>}>
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/services" element={<Services />} />
              <Route path="/admin/news" element={<News />} />
              <Route path="/admin/contact-messages" element={<ContactMessages />} />
              <Route path="/admin/booked-services" element={<BookedServices />} />
              <Route path="/admin/jobs" element={<Jobs />} />
              <Route path="/admin/career-view" element={<CareerView />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
