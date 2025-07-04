import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      console.log('Signing out from navbar...');
      await signOut();
      console.log('Sign out successful, navigating to login');
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
      // Still try to navigate to login even if there's an error
      navigate('/login');
    }
  };

  return (
    <nav className="bg-white dark:bg-black shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-sai-teal-500 dark:text-sai-teal-200">
              AI Initiative Admin
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            {user && (
              <button
                onClick={handleSignOut}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-sai-teal-200 hover:text-gray-900 dark:hover:text-sai-teal-300"
              >
                Sign Out
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 