import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus, ShoppingCart } from 'lucide-react';
import { Product } from '../../contexts/CartContext';
import { useCart } from '../../contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem, getItemQuantity, updateQuantity } = useCart();
  const quantity = getItemQuantity(product.id);

  const handleAddToCart = () => {
    addItem(product);
  };

  const handleIncrement = () => {
    updateQuantity(product.id, quantity + 1);
  };

  const handleDecrement = () => {
    updateQuantity(product.id, quantity - 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden card-hover"
    >
      {/* Product Image */}
      <div className="relative h-48 bg-gradient-to-br from-bakery-100 to-bakery-200">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback to emoji if image fails to load
            e.currentTarget.style.display = 'none';
            e.currentTarget.nextElementSibling!.style.display = 'flex';
          }}
        />
        <div 
          className="absolute inset-0 flex items-center justify-center text-6xl hidden"
          style={{ display: 'none' }}
        >
          {product.category === 'breads' && '🍞'}
          {product.category === 'cakes' && '🎂'}
          {product.category === 'biscuits' && '🍪'}
          {product.category === 'snacks' && '🥨'}
        </div>
        
        {/* Stock Status Badge */}
        <div className="absolute top-2 right-2">
          {product.inStock ? (
            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              In Stock
            </span>
          ) : (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              Out of Stock
            </span>
          )}
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-bakery-600">₹{product.price}</span>
          <span className="text-sm text-gray-500 capitalize">{product.category}</span>
        </div>

        {/* Add to Cart Controls */}
        {quantity === 0 ? (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="w-full btn-bakery disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            <ShoppingCart size={18} />
            <span>Add to Cart</span>
          </motion.button>
        ) : (
          <div className="flex items-center justify-between">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleDecrement}
              className="w-8 h-8 bg-bakery-100 text-bakery-600 rounded-full flex items-center justify-center hover:bg-bakery-200 transition-colors"
            >
              <Minus size={16} />
            </motion.button>
            
            <span className="mx-4 text-lg font-semibold text-gray-800">{quantity}</span>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleIncrement}
              disabled={quantity >= product.stockQuantity}
              className="w-8 h-8 bg-bakery-500 text-white rounded-full flex items-center justify-center hover:bg-bakery-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus size={16} />
            </motion.button>
          </div>
        )}

        {/* Stock Quantity Info */}
        {product.inStock && (
          <p className="text-xs text-gray-500 mt-2 text-center">
            {product.stockQuantity} available
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;