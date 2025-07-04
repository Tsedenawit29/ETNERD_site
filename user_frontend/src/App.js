import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Initiatives from './pages/Initiatives';
import Capabilities from './pages/Capabilities';
import News from './pages/News';
import Career from './pages/Career';
import Partner from './pages/Partner';
import Contact from './pages/Contact';
import ServiceDetail from './pages/ServiceDetail';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <NavBar />
        <div className="flex flex-col min-h-screen">
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:id" element={<ServiceDetail />} />
              <Route path="/initiatives" element={<Initiatives />} />
              <Route path="/capabilities" element={<Capabilities />} />
              <Route path="/news" element={<News />} />
              <Route path="/career" element={<Career />} />
              <Route path="/partner" element={<Partner />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
