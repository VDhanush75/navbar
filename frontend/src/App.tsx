import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import LoginModal from './components/auth/LoginModal';
import Header from './components/layout/Header';
import ProductCard from './components/products/ProductCard';
import { Product } from './contexts/CartContext';
import { motion } from 'framer-motion';

// Sample products data
const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Fresh White Bread',
    description: 'Soft and fluffy white bread, baked fresh daily with premium ingredients',
    price: 25,
    image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400&h=300&fit=crop',
    category: 'breads',
    inStock: true,
    stockQuantity: 50,
  },
  {
    id: '2',
    name: 'Chocolate Cake',
    description: 'Rich and moist chocolate cake with creamy chocolate frosting',
    price: 450,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop',
    category: 'cakes',
    inStock: true,
    stockQuantity: 15,
  },
  {
    id: '3',
    name: 'Butter Cookies',
    description: 'Crispy and buttery cookies, perfect with tea or coffee',
    price: 120,
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&h=300&fit=crop',
    category: 'biscuits',
    inStock: true,
    stockQuantity: 30,
  },
  {
    id: '4',
    name: 'Samosas',
    description: 'Crispy fried pastries filled with spiced potatoes and peas',
    price: 15,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop',
    category: 'snacks',
    inStock: true,
    stockQuantity: 40,
  },
  {
    id: '5',
    name: 'Vanilla Cupcakes',
    description: 'Light and fluffy vanilla cupcakes with buttercream frosting',
    price: 35,
    image: 'https://images.unsplash.com/photo-1587668178277-295251f900ce?w=400&h=300&fit=crop',
    category: 'cakes',
    inStock: true,
    stockQuantity: 25,
  },
  {
    id: '6',
    name: 'Garlic Bread',
    description: 'Toasted bread with garlic butter and herbs',
    price: 65,
    image: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=400&h=300&fit=crop',
    category: 'breads',
    inStock: false,
    stockQuantity: 0,
  },
];

const MainContent: React.FC = () => {
  const { currentUser } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Show login modal immediately if user is not authenticated
  useEffect(() => {
    if (!currentUser) {
      setShowLoginModal(true);
    } else {
      setShowLoginModal(false);
    }
  }, [currentUser]);

  const categories = [
    { id: 'all', name: 'All Products', emoji: '🍽️' },
    { id: 'breads', name: 'Breads', emoji: '🍞' },
    { id: 'cakes', name: 'Cakes', emoji: '🎂' },
    { id: 'biscuits', name: 'Biscuits', emoji: '🍪' },
    { id: 'snacks', name: 'Snacks', emoji: '🥨' },
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? sampleProducts 
    : sampleProducts.filter(product => product.category === selectedCategory);

  const handleCartClick = () => {
    // TODO: Implement cart sidebar/modal
    console.log('Cart clicked');
  };

  return (
    <div className="min-h-screen bg-bakery-gradient">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-cream-200 rounded-full opacity-20 animate-float-slow"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-bakery-200 rounded-full opacity-25 animate-float-medium"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-cream-300 rounded-full opacity-30 animate-float-fast"></div>
        <div className="absolute bottom-40 right-1/3 w-14 h-14 bg-bakery-300 rounded-full opacity-20 animate-float-slow"></div>
      </div>

      {/* Header */}
      <Header onCartClick={handleCartClick} />

      {/* Main Content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="py-16 px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-pacifico gradient-text mb-6">
              Welcome to Bangalore Bakery
            </h1>
            <p className="text-xl md:text-2xl text-bakery-700 mb-8 font-dancing">
              Fresh baked goods delivered to your doorstep in Ballari
            </p>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="text-6xl mb-8"
            >
              🚴‍♂️🥖
            </motion.div>
          </motion.div>
        </section>

        {/* Category Filter */}
        <section className="py-8 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all ${
                    selectedCategory === category.id
                      ? 'bg-bakery-500 text-white shadow-lg'
                      : 'bg-white text-bakery-600 hover:bg-bakery-50 shadow-md'
                  }`}
                >
                  <span className="text-xl">{category.emoji}</span>
                  <span>{category.name}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-8 px-4 pb-16">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-xl text-bakery-600 font-dancing">
                  No products found in this category
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />

      {/* Toast Notifications */}
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#fef7ed',
            color: '#7a3616',
            border: '1px solid #fbd6a3',
          },
          success: {
            iconTheme: {
              primary: '#f59e42',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <MainContent />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
