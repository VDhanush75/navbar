import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Compression and logging
app.use(compression());
app.use(morgan('combined'));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Bangalore Bakery API is running',
    timestamp: new Date().toISOString()
  });
});

// API routes
app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to Bangalore Bakery API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      products: '/api/products',
      orders: '/api/orders',
      users: '/api/users'
    }
  });
});

// Sample products endpoint (will be replaced with database later)
app.get('/api/products', (req, res) => {
  const sampleProducts = [
    {
      id: '1',
      name: 'Fresh White Bread',
      description: 'Soft and fluffy white bread, baked fresh daily',
      price: 25,
      category: 'breads',
      inStock: true,
      stockQuantity: 50,
    },
    {
      id: '2',
      name: 'Chocolate Cake',
      description: 'Rich and moist chocolate cake with creamy frosting',
      price: 450,
      category: 'cakes',
      inStock: true,
      stockQuantity: 15,
    }
  ];
  
  res.json({
    success: true,
    data: sampleProducts,
    total: sampleProducts.length
  });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Bangalore Bakery API server running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
  console.log(`🌐 API docs: http://localhost:${PORT}/api`);
});