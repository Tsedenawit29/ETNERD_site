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
  const [showPostLoginModal, setShowPostLoginModal] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotStatus, setForgotStatus] = useState('');
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
      setShowPostLoginModal(true); // Show modal after login
    } catch (error) {
      setError('Failed to sign in. Please check your credentials.');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
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
        setTimeout(() => {
          setShowChangePassword(false);
          setShowPostLoginModal(false);
          navigate('/dashboard');
        }, 1500);
      }
    } catch (err) {
      setChangeError('An unexpected error occurred.');
    } finally {
      setChanging(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setForgotStatus('');
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(forgotEmail);
      if (error) {
        setForgotStatus('Error: ' + (error.message || 'Could not send reset email.'));
      } else {
        setForgotStatus('Password reset email sent! Check your inbox.');
      }
    } catch (err) {
      setForgotStatus('An unexpected error occurred.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black">
      <div className="max-w-md w-full space-y-8 p-8 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-dashboard-primary-bright">
            Admin Dashboard
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-dashboard-primary-bright">
            Sign in to your account
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
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

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-dashboard-accent hover:bg-dashboard-accent-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dashboard-accent"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>
        <div className="mt-4 flex flex-col items-center space-y-2">
          <button
            type="button"
            className="text-dashboard-accent hover:text-dashboard-accent-dark font-semibold underline"
            onClick={() => setShowChangePassword(true)}
          >
            Change Password
          </button>
          <button
            type="button"
            className="text-xs text-dashboard-accent hover:text-dashboard-accent-dark underline"
            onClick={() => setShowForgotPassword(true)}
          >
            Forgot Password?
          </button>
        </div>
      </div>
      {/* Post-login modal: ask to change password or continue */}
      {showPostLoginModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
          <div className="bg-white dark:bg-dashboard-primary rounded-xl p-6 w-full max-w-sm shadow-xl border-4 border-dashboard-accent dark:border-dashboard-accent-dark ring-2 ring-dashboard-accent dark:ring-dashboard-accent-dark">
            <h2 className="text-lg font-bold mb-4 text-dashboard-accent dark:text-dashboard-accent-dark text-center">Welcome!</h2>
            <p className="mb-6 text-center text-dashboard-primary dark:text-dashboard-primary-bright">Would you like to change your password now?</p>
            <div className="flex gap-2 mt-2 justify-center">
              <button
                type="button"
                className="flex-1 py-2 rounded-md bg-dashboard-accent text-white font-semibold hover:bg-dashboard-accent-dark dark:bg-dashboard-accent-dark dark:text-dashboard-primary hover:bg-dashboard-accent-dark dark:hover:bg-dashboard-accent transition-colors duration-200"
                onClick={() => {
                  setShowChangePassword(true);
                  setShowPostLoginModal(false);
                }}
              >
                Change Password
              </button>
              <button
                type="button"
                className="flex-1 py-2 rounded-md bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700"
                onClick={() => {
                  setShowPostLoginModal(false);
                  navigate('/dashboard');
                }}
              >
                Continue to Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Change Password Modal */}
      {showChangePassword && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
          <div className="bg-white dark:bg-dashboard-primary rounded-xl p-6 w-full max-w-sm shadow-xl border-4 border-dashboard-accent dark:border-dashboard-accent-dark ring-2 ring-dashboard-accent dark:ring-dashboard-accent-dark">
            <h2 className="text-xl font-bold mb-4 text-dashboard-accent dark:text-dashboard-accent-dark text-center">Change Password</h2>
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
                  className="flex-1 py-2 rounded-md bg-dashboard-accent text-white font-semibold hover:bg-dashboard-accent-dark dark:bg-dashboard-accent-dark dark:text-dashboard-primary hover:bg-dashboard-accent-dark dark:hover:bg-dashboard-accent transition-colors duration-200"
                  disabled={changing}
                >
                  {changing ? 'Changing...' : 'Change Password'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
          <div className="bg-white dark:bg-dashboard-primary rounded-xl p-6 w-full max-w-sm shadow-xl border-4 border-dashboard-accent dark:border-dashboard-accent-dark ring-2 ring-dashboard-accent dark:ring-dashboard-accent-dark">
            <h2 className="text-xl font-bold mb-4 text-dashboard-accent dark:text-dashboard-accent-dark text-center">Forgot Password</h2>
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Email Address</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  value={forgotEmail}
                  onChange={e => setForgotEmail(e.target.value)}
                  required
                />
              </div>
              {forgotStatus && <div className="text-sm text-center mt-2 {forgotStatus.startsWith('Error') ? 'text-red-500' : 'text-green-600'}">{forgotStatus}</div>}
              <div className="flex gap-2 mt-2">
                <button
                  type="button"
                  className="flex-1 py-2 rounded-md bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700"
                  onClick={() => setShowForgotPassword(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-md bg-dashboard-accent text-white font-semibold hover:bg-dashboard-accent-dark dark:bg-dashboard-accent-dark dark:text-dashboard-primary hover:bg-dashboard-accent-dark dark:hover:bg-dashboard-accent transition-colors duration-200"
                >
                  Send Reset Email
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login; 