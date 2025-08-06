import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, User, Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';

interface HeaderProps {
  onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCartClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, userData, logout } = useAuth();
  const { state: cartState } = useCart();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2"
          >
            <span className="text-3xl">🥖</span>
            <div>
              <h1 className="text-xl font-lobster text-bakery-600">
                Bangalore Bakery
              </h1>
              <p className="text-xs text-bakery-400 font-dancing">Ballari's Finest</p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-700 hover:text-bakery-600 font-medium transition-colors">
              Home
            </a>
            <a href="#products" className="text-gray-700 hover:text-bakery-600 font-medium transition-colors">
              Products
            </a>
            <a href="#about" className="text-gray-700 hover:text-bakery-600 font-medium transition-colors">
              About
            </a>
            <a href="#contact" className="text-gray-700 hover:text-bakery-600 font-medium transition-colors">
              Contact
            </a>
          </nav>

          {/* Right Side - Cart & User */}
          <div className="flex items-center space-x-4">
            {/* Cart Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onCartClick}
              className="relative p-2 text-bakery-600 hover:text-bakery-700 transition-colors"
            >
              <ShoppingCart size={24} />
              {cartState.itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold"
                >
                  {cartState.itemCount}
                </motion.span>
              )}
            </motion.button>

            {/* User Menu */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-bakery-50 transition-colors"
              >
                <User size={20} className="text-bakery-600" />
                <span className="hidden sm:block text-sm font-medium text-gray-700">
                  {userData?.name || 'User'}
                </span>
              </motion.button>

              {/* Dropdown Menu */}
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2"
                >
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">{userData?.name}</p>
                    <p className="text-xs text-gray-500">{userData?.email}</p>
                  </div>
                  
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-bakery-50 transition-colors">
                    My Orders
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-bakery-50 transition-colors">
                    Profile Settings
                  </button>
                  
                  <div className="border-t border-gray-100 mt-2 pt-2">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center space-x-2"
                    >
                      <LogOut size={16} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-bakery-600"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-200 py-4"
          >
            <nav className="flex flex-col space-y-4">
              <a href="#home" className="text-gray-700 hover:text-bakery-600 font-medium transition-colors">
                Home
              </a>
              <a href="#products" className="text-gray-700 hover:text-bakery-600 font-medium transition-colors">
                Products
              </a>
              <a href="#about" className="text-gray-700 hover:text-bakery-600 font-medium transition-colors">
                About
              </a>
              <a href="#contact" className="text-gray-700 hover:text-bakery-600 font-medium transition-colors">
                Contact
              </a>
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;