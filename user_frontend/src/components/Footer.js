import React from 'react';
import { Link } from 'react-router-dom';
import hero from '../asset/hero.jpg';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Initiatives', path: '/initiatives' },
  { name: 'Capabilities', path: '/capabilities' },
  { name: 'News', path: '/news' },
  { name: 'Career', path: '/career' },
  { name: 'Partner', path: '/partner' },
  { name: 'Contact', path: '/contact' },
];

const Footer = () => (
  <footer className="w-full bg-dashboard-primary text-white shadow-soft pt-8 pb-4 mt-16">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between px-4 gap-8">
      <div className="flex-1 flex flex-col items-center md:items-start mb-6 md:mb-0">
        <span className="font-display text-2xl font-bold mb-1">ETNERD Security Solutions</span>
        <span className="text-sm text-dashboard-accent italic mb-3">Local Brains. Global Standards</span>
        <nav className="flex flex-wrap gap-4 mt-2 justify-center md:justify-start">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="text-white hover:text-dashboard-accent font-medium transition-colors text-sm"
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex-shrink-0 w-full md:w-56 h-32 relative rounded-lg overflow-hidden">
        <img src={hero} alt="Footer visual" className="object-cover w-full h-full opacity-80" />
        <div className="absolute inset-0 bg-dashboard-primary opacity-40" />
      </div>
    </div>
    <div className="text-center text-xs text-white pt-4">&copy; {new Date().getFullYear()} ETNERD. All rights reserved.</div>
  </footer>
);

export default Footer; 