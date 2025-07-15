import React from 'react';
import { Link } from 'react-router-dom';
import { FaLinkedin, FaEnvelope, FaPhoneAlt, FaHandPointRight } from 'react-icons/fa';
import hero from '../asset/hero.jpg'; // This image now functions as your primary logo visual

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Our Services', path: '/services' },
  { name: 'Our Initiatives', path: '/initiatives' },
  { name: 'Capabilities', path: '/capabilities' },
  { name: 'News & Insights', path: '/news' },
  { name: 'Careers', path: '/career' },
  { name: 'Contact Us', path: '/contact' },
];

const policyItems = [
  { name: 'Privacy Policy', path: '/privacy' },
  { name: 'Terms of Service', path: '/terms' },
  { name: 'FAQs', path: '/faqs' },
];

const Footer = () => (
  <footer className="w-full bg-dashboard-primary text-white pt-16 pb-8 dark:bg-dashboard-primary-bg">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
      {/* Company Logo (Image) & Name Text Section */}
      <div className="col-span-1 md:col-span-2 lg:col-span-1">
        <div className="flex items-center gap-4 mb-6"> {/* Uses flexbox to place image and text horizontally */}
          {/* Logo Image */}
          {hero && (
            <Link to="/" className="block flex-shrink-0"> {/* flex-shrink-0 prevents the image from resizing */}
              <img
                src={hero}
                alt="ETNERD Security Solutions Logo"
                className="w-20 h-20 object-cover rounded-lg shadow-lg border border-dashboard-accent/30" // Adjusted image size for better fit
              />
            </Link>
          )}
          {/* ETNERD Text */}
          <div>
            <h2 className="font-display text-3xl font-extrabold leading-tight">
              <span className="text-white/80 dark:text-white">E</span>
              <span className="text-white/80 dark:text-white">T</span>
              <span className="text-dashboard-accent dark:text-dashboard-accent-dark">N</span>
              <span className="text-white/80 dark:text-white">E</span>
              <span className="text-white/80 dark:text-white">R</span>
              <span className="text-white/80 dark:text-white">D</span>
            </h2>
            <p className="text-white text-md font-medium tracking-wide">Security Solutions</p>
          </div>
        </div>

        {/* Tagline and General Description */}
        <p className="text-white/80 italic text-base mb-4">
          Local Brains. Global Standards.
        </p>
        <p className="text-sm text-white/70 leading-relaxed">
        Future-proof cybersecurity solutions, built with global standards and local insight. Securing your digital future wherever you are.
        </p>
      </div>

      {/* Quick Links Navigation Section */}
      {/* Note: This section remains in its original column position relative to the grid */}
      <div className="col-span-1">
        <h3 className="font-semibold text-xl mb-4 text-white relative">
          Quick Links
          <span className="block w-10 h-0.5 bg-dashboard-accent mt-2"></span>
        </h3>
        <ul className="space-y-3">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className="text-base text-white/80 hover:text-dashboard-accent transition-colors duration-300 transform hover:translate-x-1 inline-block"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Support & Legal Section */}
      <div className="col-span-1">
        <h3 className="font-semibold text-xl mb-4 text-white relative">
          Support & Legal
          <span className="block w-10 h-0.5 bg-dashboard-accent mt-2"></span>
        </h3>
        <ul className="space-y-3 mb-6">
          {policyItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className="text-base text-white/80 hover:text-dashboard-accent transition-colors duration-300 transform hover:translate-x-1 inline-block"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Contact Information & Social Media Section */}
      <div className="col-span-1">
        <h3 className="font-semibold text-xl mb-4 text-white relative">
          Get in Touch
          <span className="block w-10 h-0.5 bg-dashboard-accent mt-2"></span>
        </h3>
        <address className="not-italic text-sm text-white/70 space-y-3 mb-8">
          
          <p>Addis Ababa, Ethiopia</p>
          <p className="flex items-center gap-2">
            <FaEnvelope className="text-dashboard-accent text-lg" />
            Email: <a href="mailto:contact@etnerd.com" className="hover:text-dashboard-accent transition-colors">contact@etnerd.com</a>
          </p>
          <p className="flex items-center gap-2">
            <FaPhoneAlt className="text-dashboard-accent text-lg" />
            Phone: <a href="tel:+251-911-677-096" className="hover:text-dashboard-accent transition-colors">+251-911-677-096</a>
          </p>
        </address>

        {/* Social Media Icons are now in this section */}
        <h3 className="font-semibold text-lg mb-4 text-white">Follow Us</h3>
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2 -ml-48">
            <FaHandPointRight className="text-dashboard-accent text-lg animate-pulse hover:animate-bounce transition-all duration-300 hover:translate-x-3" 
              style={{
                animation: 'clickAnimation 2s ease-in-out infinite'
              }}
            />
            <a 
              href="https://www.linkedin.com/in/etnerd-security-solutions-86088b373/" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="LinkedIn Profile"
              className="text-white/80 hover:text-dashboard-accent text-2xl transition-colors duration-300 hover:scale-110"
              style={{
                animation: 'iconGlow 2s ease-in-out infinite'
              }}
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
        <style jsx>{`
          @keyframes clickAnimation {
            0%, 100% { transform: translateX(0); }
            50% { transform: translateX(16px); }
          }
          @keyframes iconGlow {
            0%, 100% { color: rgba(255, 255, 255, 0.8); }
            50% { color: var(--dashboard-accent); }
          }
        `}</style>
      </div>
    </div>

    {/* Copyright Section */}
    <div className="border-t border-white/20 mt-12 pt-6 text-center text-sm text-white/60">
      &copy; {new Date().getFullYear()} ETNERD Security Solutions. All rights reserved.
    </div>
  </footer>
);

export default Footer;