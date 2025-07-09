import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import hero from '../asset/hero.jpg';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Initiatives', path: '/initiatives' },
  { name: 'Capabilities', path: '/capabilities' },
  { name: 'News', path: '/news' },
  { name: 'Career', path: '/career' },
];

const NavBar = ({ ThemeToggleButton }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef(null);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav ref={navRef} className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-dashboard-primary-bg shadow-soft transition-colors duration-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3 md:py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center cursor-pointer select-none flex-shrink-0">
          <img src={hero} alt="ETNERD Logo" className="h-10 sm:h-12 md:h-14 w-14 object-cover rounded shadow-soft" />
          <span className="ml-3 text-xl md:text-2xl font-display font-bold">
            <span className="text-dashboard-primary dark:text-white">E</span>
            <span className="text-dashboard-primary dark:text-white">T</span>
            <span className="text-dashboard-accent dark:text-dashboard-accent-dark">N</span>
            <span className="text-dashboard-primary dark:text-white">E</span>
            <span className="text-dashboard-primary dark:text-white">R</span>
            <span className="text-dashboard-primary dark:text-white">D</span>
          </span>
        </Link>

        {/* Mobile Toggle */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-dashboard-primary dark:text-white hover:text-dashboard-accent dark:hover:text-dashboard-accent-dark focus:outline-none focus:ring-2 focus:ring-dashboard-accent transition duration-300 ease-in-out p-2"
            aria-expanded={isMobileMenuOpen ? "true" : "false"}
            aria-label="Toggle mobile menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isMobileMenuOpen
                    ? 'M6 18L18 6M6 6l12 12'
                    : 'M4 6h16M4 12h16M4 18h16'
                }
              />
            </svg>
          </button>
        </div>

        {/* Desktop Menu Items */}
        <ul className="hidden lg:flex lg:items-center lg:gap-1 xl:gap-2 font-semibold text-sm xl:text-base">
          {navItems.map((item) => (
            <li key={item.name} className="relative group flex-shrink-0">
              <Link
                to={item.path}
                className={`px-2 xl:px-3 py-2 rounded-md transition text-dashboard-primary dark:text-white hover:text-dashboard-accent dark:hover:text-dashboard-accent-dark whitespace-nowrap ${location.pathname === item.path ? 'underline underline-offset-4' : ''}`}
              >
                <span className="hidden xl:inline">{item.name}</span>
                <span className="xl:hidden">{item.name.length > 8 ? item.name.substring(0, 8) + '...' : item.name}</span>
              </Link>
            </li>
          ))}
          <li className="ml-2 xl:ml-4 flex-shrink-0">
            <Link
              to="/contact"
              className="px-3 xl:px-6 py-2 xl:py-2.5 text-white bg-dashboard-accent dark:text-dashboard-accent-dark dark:bg-white rounded-full shadow-lg hover:shadow-xl hover:bg-dashboard-accent-dark dark:hover:bg-dashboard-accent transform hover:scale-105 transition-all duration-300 font-semibold text-sm xl:text-base whitespace-nowrap"
            >
              <span className="hidden xl:inline">Contact Us</span>
              <span className="xl:hidden">Contact</span>
            </Link>
          </li>
          {ThemeToggleButton && <li className="ml-2 xl:ml-4 flex-shrink-0">{<ThemeToggleButton />}</li>}
        </ul>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-dashboard-primary border-t border-gray-200 dark:border-gray-800 shadow-lg">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <div key={item.name} className="border-b border-gray-100 dark:border-gray-800 last:border-b-0">
                <Link
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-3 py-3 text-dashboard-primary dark:text-white hover:bg-dashboard-accent/10 dark:hover:bg-dashboard-accent-dark/10 rounded-md transition-colors duration-200 font-medium ${location.pathname === item.path ? 'underline underline-offset-4' : ''}`}
                >
                  {item.name}
                </Link>
              </div>
            ))}
            <div className="pt-4">
              <Link
                to="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-center px-6 py-3 text-white bg-dashboard-accent dark:text-dashboard-accent-dark dark:bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
              >
                Contact
              </Link>
            </div>
            {ThemeToggleButton && <div className="pt-2 flex justify-center">{<ThemeToggleButton />}</div>}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar; 