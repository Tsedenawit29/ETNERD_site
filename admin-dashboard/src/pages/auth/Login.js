import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Modal from '../../components/Modal';
import supabase from '../../config/supabase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [changeError, setChangeError] = useState('');
  const [changeSuccess, setChangeSuccess] = useState('');
  const [changing, setChanging] = useState(false);
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await signIn(email, password);
      navigate('/dashboard');
    } catch (error) {
      setError('Failed to sign in. Please check your credentials.');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setChangeSuccess('');
    setChangeError('');
    if (newPassword !== confirmPassword) {
      setChangeError('New passwords do not match.');
      return;
    }
    setChanging(true);
    try {
      // Authenticate with email and old password
      await signIn(email, oldPassword);
      // If successful, update password
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) {
        setChangeError(error.message || 'Failed to change password.');
      } else {
        setChangeSuccess('Password changed successfully! You can now log in.');
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }
    } catch (err) {
      setChangeError('Old password is incorrect or session expired.');
    } finally {
      setChanging(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-dashboard-primary dark:text-white">Sign in to your account</h2>
        {/* Login Form */}
        {!showChangePassword ? (
          <>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded dark:bg-red-900/20 dark:border-red-800 dark:text-red-400">
                  {error}
                </div>
              )}
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 dark:text-white rounded-t-md focus:outline-none focus:ring-dashboard-accent focus:border-dashboard-accent focus:z-10 sm:text-sm bg-white dark:bg-gray-900"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 dark:text-white rounded-b-md focus:outline-none focus:ring-dashboard-accent focus:border-dashboard-accent focus:z-10 sm:text-sm bg-white dark:bg-gray-900"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <button type="submit" className="w-full py-2 px-4 bg-orange-500 text-white rounded hover:bg-dashboard-primary-dark transition">Sign in</button>
            </form>
            <div className="mt-4 text-center">
              <button
                className="text-dashboard-primary dark:text-white underline hover:text-dashboard-accent text-sm dark:hover:text-dashboard-accent"
                onClick={() => {
                  setShowChangePassword(true);
                  setChangeError('');
                  setChangeSuccess('');
                }}
              >
                Change Password
              </button>
            </div>
          </>
        ) : (
          <form onSubmit={handleChangePassword} className="space-y-6">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded bg-white text-gray-900 dark:bg-gray-900 dark:text-white"
              required
            />
            <input
              type="password"
              placeholder="Old Password"
              value={oldPassword}
              onChange={e => setOldPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded bg-white text-gray-900 dark:bg-gray-900 dark:text-white"
              required
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded bg-white text-gray-900 dark:bg-gray-900 dark:text-white"
              required
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded bg-white text-gray-900 dark:bg-gray-900 dark:text-white"
              required
            />
            {changeSuccess && <div className="text-green-600 text-sm text-center">{changeSuccess}</div>}
            {changeError && <div className="text-red-500 text-sm text-center">{changeError}</div>}
            <div className="flex items-center justify-between">
              <button
                type="button"
                className="text-dashboard-primary  dark:text-white dark:hover:text-dashboard-accent underline hover:text-dashboard-accent text-sm"
                onClick={() => {
                  setShowChangePassword(false);
                  setChangeError('');
                  setChangeSuccess('');
                }}
              >
                Back to Login
              </button>
              <button type="submit" className="py-2 px-6 bg-dashboard-accent text-white rounded hover:bg-dashboard-accent-dark transition" disabled={changing}>
                {changing ? 'Saving...' : 'Save'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login; 