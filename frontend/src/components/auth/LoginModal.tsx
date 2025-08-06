import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Phone, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });

  const { login, signup, googleSignIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        await signup(formData.email, formData.password, formData.name, formData.phone);
      }
      onClose();
    } catch (error) {
      console.error('Auth error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await googleSignIn();
      onClose();
    } catch (error) {
      console.error('Google sign in error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Reset form when switching between login/signup
  useEffect(() => {
    setFormData({
      name: '',
      email: '',
      password: '',
      phone: '',
    });
  }, [isLogin]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-bakery-gradient p-6 text-center relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white hover:text-bakery-100 transition-colors"
              >
                <X size={24} />
              </button>
              
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-16 h-16 bg-white rounded-full mx-auto mb-4 flex items-center justify-center"
              >
                <span className="text-2xl font-pacifico text-bakery-600">🥖</span>
              </motion.div>
              
              <h2 className="text-2xl font-lobster text-white mb-2">
                Welcome to Bangalore Bakery
              </h2>
              <p className="text-bakery-100 text-sm">
                {isLogin ? 'Sign in to start ordering!' : 'Create account to get started!'}
              </p>
            </div>

            {/* Form */}
            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="relative"
                  >
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-bakery-400" size={20} />
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required={!isLogin}
                      className="w-full pl-10 pr-4 py-3 border border-bakery-200 rounded-lg focus:ring-2 focus:ring-bakery-400 focus:border-transparent transition-all"
                    />
                  </motion.div>
                )}

                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-bakery-400" size={20} />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-bakery-200 rounded-lg focus:ring-2 focus:ring-bakery-400 focus:border-transparent transition-all"
                  />
                </div>

                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="relative"
                  >
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-bakery-400" size={20} />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number (Optional)"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-bakery-200 rounded-lg focus:ring-2 focus:ring-bakery-400 focus:border-transparent transition-all"
                    />
                  </motion.div>
                )}

                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-bakery-400" size={20} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-12 py-3 border border-bakery-200 rounded-lg focus:ring-2 focus:ring-bakery-400 focus:border-transparent transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-bakery-400 hover:text-bakery-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full btn-bakery disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="loading-spinner mr-2"></div>
                      {isLogin ? 'Signing In...' : 'Creating Account...'}
                    </div>
                  ) : (
                    isLogin ? 'Sign In' : 'Create Account'
                  )}
                </motion.button>
              </form>

              {/* Divider */}
              <div className="flex items-center my-6">
                <div className="flex-1 border-t border-bakery-200"></div>
                <span className="px-4 text-bakery-500 text-sm">or</span>
                <div className="flex-1 border-t border-bakery-200"></div>
              </div>

              {/* Google Sign In */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full flex items-center justify-center py-3 px-4 border border-bakery-300 rounded-lg hover:bg-bakery-50 transition-colors disabled:opacity-50"
              >
                <img
                  src="https://developers.google.com/identity/images/g-logo.png"
                  alt="Google"
                  className="w-5 h-5 mr-3"
                />
                Continue with Google
              </motion.button>

              {/* Toggle Login/Signup */}
              <div className="text-center mt-6">
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-bakery-600 hover:text-bakery-700 text-sm font-medium"
                >
                  {isLogin
                    ? "Don't have an account? Sign up"
                    : 'Already have an account? Sign in'
                  }
                </button>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-2 -left-2 w-8 h-8 bg-bakery-300 rounded-full opacity-20 animate-float-slow"></div>
            <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-cream-400 rounded-full opacity-30 animate-float-medium"></div>
            <div className="absolute top-1/2 -right-1 w-4 h-4 bg-bakery-200 rounded-full opacity-25 animate-float-fast"></div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;