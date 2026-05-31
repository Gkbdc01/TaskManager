import React from 'react';
import { Link } from 'react-router-dom';
import { useLoginForm } from '../hooks/useLoginForm';
import AuthSidebar from '../components/AuthSidebar';

const Login = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    error,
    isLoading,
    handleLoginSubmit
  } = useLoginForm();

  return (
    <div className="min-h-screen w-full bg-gray-50 text-gray-800 font-sans flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-5xl min-h-[500px] bg-white border border-gray-200 rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-sm">
        
        <AuthSidebar />

        <div className="lg:col-span-6 p-8 md:p-12 flex flex-col justify-center">
          <div className="w-full max-w-sm mx-auto">
            
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900">Sign in to account</h2>
              <p className="text-xs text-gray-500 mt-1">
                Enter your details to open your workspace session
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg font-medium">
                {error}
              </div>
            )}

            <form className="space-y-4" onSubmit={handleLoginSubmit}>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600/20 transition-all"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600/20 transition-all"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 disabled:bg-indigo-400 text-white text-sm font-semibold py-2 px-4 rounded-lg transition-colors mt-2 flex justify-center items-center min-h-[38px]"
              >
                {isLoading ? (
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            <div className="mt-6 border-t border-gray-100 pt-4 text-center">
              <Link to="/register" className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
                Don't have an account? Sign up free →
              </Link>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;