import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/hero.jpg';
import supabase from '../config/supabase';

// Icon components
const HomeIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const WorkIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
  </svg>
);

const ResourcesIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const EventsIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const NewsIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
  </svg>
);

const MessagesIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const MenuIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const XIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const Avatar = ({ email, size = 32 }) => {
  // Get initials from email (first letter of username)
  const initials = email ? email.charAt(0).toUpperCase() : '?';
  
  return (
    <div 
      className="flex items-center justify-center rounded-full bg-sai-teal-500 text-white font-medium shadow-sm"
      style={{ width: size, height: size }}
    >
      {initials}
    </div>
  );
};

const Layout = ({ children, onChangePasswordClick }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [changeError, setChangeError] = useState('');
  const [changeSuccess, setChangeSuccess] = useState('');
  const [changing, setChanging] = useState(false);

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: HomeIcon },
    { path: '/our-work', label: 'Our Work', icon: WorkIcon },
    { path: '/services', label: 'Services', icon: ResourcesIcon },
    { path: '/events', label: 'Events', icon: EventsIcon },
    { path: '/news', label: 'News', icon: NewsIcon },
    { path: '/contact-messages', label: 'Contact Messages', icon: MessagesIcon },
  ];

  const handleSignOut = async () => {
    try {
      console.log('Signing out...');
      await signOut();
      console.log('Sign out successful, navigating to login');
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
      // Still try to navigate to login even if there's an error
      navigate('/login');
    }
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setChangeError('');
    setChangeSuccess('');
    if (newPassword !== confirmPassword) {
      setChangeError('New passwords do not match.');
      return;
    }
    setChanging(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) {
        setChangeError(error.message || 'Failed to change password.');
      } else {
        setChangeSuccess('Password changed successfully!');
        setNewPassword('');
        setConfirmPassword('');
        setTimeout(() => setShowChangePassword(false), 1500);
      }
    } catch (err) {
      setChangeError('An unexpected error occurred.');
    } finally {
      setChanging(false);
    }
  };

  return (
    <div className="flex h-screen bg-white dark:bg-black">
      {/* Mobile menu overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-black border-r border-gray-200 dark:border-gray-800 
        transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        flex flex-col h-full
      `}>
        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img src={logo} alt="SAI² Logo" className="h-8 w-auto mr-3 rounded-md" />
              <h1 className="text-xl font-bold text-sai-teal-500 dark:text-sai-teal-200">AI Initiative</h1>
            </div>
            {/* Close button for mobile */}
            <button
              onClick={closeSidebar}
              className="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <XIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
        
        <nav className="mt-4 px-3 space-y-1 flex-grow overflow-y-auto">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={closeSidebar}
                className={`flex items-center px-4 py-3 text-sm transition-colors duration-200 rounded-xl ${
                  location.pathname === item.path
                    ? 'bg-sai-teal-500 text-white'
                    : 'text-gray-600 dark:text-sai-teal-200 hover:bg-sai-teal-100 dark:hover:bg-gray-900 hover:text-sai-teal-500 dark:hover:text-sai-teal-200'
                }`}
              >
                <IconComponent className="mr-3 h-5 w-5 flex-shrink-0" />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
          <button
            className="w-full text-left px-4 py-2 mt-6 text-sai-teal-600 dark:text-sai-teal-200 hover:bg-sai-teal-50 dark:hover:bg-sai-teal-800 rounded-md font-semibold transition-colors duration-200"
            onClick={() => setShowChangePassword(true)}
          >
            Change Password
          </button>
        </nav>

        {/* Footer with user info and sign out */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800 mt-auto bg-gray-50 dark:bg-gray-900">
          <div className="flex flex-col space-y-3">
            <div className="flex items-center space-x-3">
              <Avatar email={user?.email} />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-900 dark:text-sai-teal-200 truncate">
                  {user?.email}
                </div>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center justify-center w-full p-2 text-gray-600 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar for mobile */}
        <div className="lg:hidden bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <MenuIcon className="h-6 w-6" />
            </button>
            <div className="flex items-center">
              <img src={logo} alt="SAI² Logo" className="h-6 w-auto mr-2 rounded-md" />
              <h1 className="text-lg font-bold text-sai-teal-500 dark:text-sai-teal-200">AI Initiative</h1>
            </div>
            <div className="w-10"></div> {/* Spacer for centering */}
          </div>
        </div>

        {/* Content area */}
        <div className="flex-1 overflow-auto bg-gray-50 dark:bg-black">
          <div className="p-4 lg:p-6">
            <Outlet />
          </div>
        </div>
      </div>

      {/* Floating Theme Toggle */}
      <div className="fixed bottom-4 right-4 z-30">
        <ThemeToggle />
      </div>

      {/* Change Password Modal */}
      {showChangePassword && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 w-full max-w-sm shadow-xl border-4 border-sai-teal-500 dark:border-sai-teal-400 ring-2 ring-sai-teal-200 dark:ring-sai-teal-700">
            <h2 className="text-xl font-bold mb-4 text-sai-teal-600 dark:text-sai-teal-200 text-center">Change Password</h2>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">New Password</label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Confirm New Password</label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              {changeError && <div className="text-red-500 text-sm text-center">{changeError}</div>}
              {changeSuccess && <div className="text-green-600 text-sm text-center">{changeSuccess}</div>}
              <div className="flex gap-2 mt-2">
                <button
                  type="button"
                  className="flex-1 py-2 rounded-md bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700"
                  onClick={() => setShowChangePassword(false)}
                  disabled={changing}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-md bg-sai-teal-500 text-white font-semibold hover:bg-sai-teal-600"
                  disabled={changing}
                >
                  {changing ? 'Changing...' : 'Change Password'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout; 