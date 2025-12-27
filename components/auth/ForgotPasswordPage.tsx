import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { resetPassword } from '../../lib/firebase/auth';
import { Mail, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Navbar } from '../Navbar';
import { Footer } from '../Footer';

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    const result = await resetPassword(email);
    
    if (result.success) {
      setSuccess(true);
      setEmail('');
    } else {
      setError(result.error || 'Failed to send reset email');
    }
    
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-20 px-5">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
            <h1 className="text-3xl font-bold text-charcoal mb-2 text-center">Reset Password</h1>
            <p className="text-gray-500 text-center mb-8">
              Enter your email and we'll send you a reset link
            </p>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6 flex items-start gap-2">
                <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            {success && (
              <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg mb-6 flex items-start gap-2">
                <CheckCircle2 size={20} className="flex-shrink-0 mt-0.5" />
                <span className="text-sm">Password reset email sent! Check your inbox.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-charcoal text-white py-3 rounded-lg font-semibold hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading && <Loader2 className="animate-spin" size={20} />}
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link to="/login" className="text-sm text-brand hover:underline font-medium">
                Back to Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ForgotPasswordPage;