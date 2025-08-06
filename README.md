# 🥖 Bangalore Bakery - E-commerce Website

A fully functional, dynamic e-commerce website for Bangalore Bakery in Ballari, built with modern web technologies.

## 🌟 Features

### 🛒 Customer Frontend
- **Immediate Login Modal** - Users must authenticate before accessing the site
- **Beautiful UI** - Bakery-themed gradient backgrounds with floating animations
- **Product Catalog** - Browse breads, cakes, biscuits, and snacks
- **Shopping Cart** - Add/remove items with real-time cart updates
- **Mobile Responsive** - Optimized for all device sizes
- **Firebase Authentication** - Secure login with Google Sign-in support

### 🎨 Design Features
- **Custom Animations** - Floating elements, hover effects, and smooth transitions
- **Bakery Theme** - Warm colors, custom fonts (Pacifico, Lobster, Dancing Script)
- **Gradient Backgrounds** - Beautiful bakery-themed color schemes
- **Toast Notifications** - User-friendly feedback for all actions

### 🔧 Technical Stack
- **Frontend**: React 18 + TypeScript + TailwindCSS
- **Animations**: Framer Motion + GSAP
- **Authentication**: Firebase Auth
- **State Management**: React Context API
- **Backend**: Node.js + Express + TypeScript
- **Icons**: Lucide React

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git

### 1. Clone and Setup
```bash
# Clone the repository
git clone <your-repo-url>
cd bangalore-bakery

# Install root dependencies
npm install

# Install all dependencies (frontend + backend)
npm run install:all
```

### 2. Frontend Setup
```bash
# Navigate to frontend
cd frontend

# Copy environment file
cp .env.example .env

# Edit .env with your Firebase credentials (optional for demo)
# The app will work with demo credentials for testing
```

### 3. Backend Setup
```bash
# Navigate to backend
cd backend

# Create environment file
echo "PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000" > .env
```

### 4. Run the Application

#### Option 1: Run Both Frontend and Backend Together
```bash
# From root directory
npm run dev
```

#### Option 2: Run Separately
```bash
# Terminal 1 - Frontend (from root directory)
npm run frontend:dev

# Terminal 2 - Backend (from root directory)  
npm run backend:dev
```

### 5. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/health

## 📱 How to Use

1. **Open the website** - Navigate to http://localhost:3000
2. **Login Modal appears immediately** - You cannot access the site without logging in
3. **Create Account or Sign In**:
   - Use email/password to create a new account
   - Or sign in with Google (requires Firebase setup)
   - Or use existing credentials if you have an account
4. **Browse Products** - Filter by categories (Breads, Cakes, Biscuits, Snacks)
5. **Add to Cart** - Click "Add to Cart" or use +/- buttons to adjust quantities
6. **View Cart** - Click the cart icon in the header to see items (cart modal coming soon)

## 🔥 Firebase Setup (Optional)

The app works with demo Firebase credentials, but for production use:

1. **Create Firebase Project**:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable Authentication and Firestore

2. **Get Configuration**:
   - Go to Project Settings > General
   - Scroll to "Your apps" section
   - Click "Web app" and copy the config

3. **Update Environment**:
   ```bash
   # In frontend/.env
   REACT_APP_FIREBASE_API_KEY=your_actual_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   # ... other Firebase config values
   ```

## 🛠️ Development

### Project Structure
```
bangalore-bakery/
├── frontend/                 # React TypeScript frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── contexts/        # React Context providers
│   │   ├── firebase/        # Firebase configuration
│   │   └── App.tsx         # Main application component
│   ├── public/             # Static assets
│   └── package.json        # Frontend dependencies
├── backend/                 # Node.js TypeScript backend
│   ├── src/
│   │   └── server.ts       # Express server
│   └── package.json        # Backend dependencies
└── package.json            # Root package.json with scripts
```

### Available Scripts
```bash
# Root level
npm run dev                 # Run both frontend and backend
npm run frontend:dev        # Run only frontend
npm run backend:dev         # Run only backend
npm run install:all         # Install all dependencies

# Frontend specific
cd frontend
npm start                   # Start development server
npm run build              # Build for production

# Backend specific  
cd backend
npm run dev                # Start with nodemon
npm run build              # Compile TypeScript
npm start                  # Run compiled JavaScript
```

## 🎯 Current Features Implemented

✅ **Project Setup** - Full-stack structure with React + Node.js  
✅ **Authentication System** - Firebase Auth with immediate login modal  
✅ **Beautiful UI** - TailwindCSS with bakery theme and animations  
✅ **Product Display** - Sample bakery products with categories  
✅ **Shopping Cart** - Add/remove items with local storage persistence  
✅ **Responsive Design** - Mobile-friendly interface  
✅ **Toast Notifications** - User feedback for all actions  

## 🔮 Coming Soon

🚧 **Cart Modal/Sidebar** - Full cart management interface  
🚧 **Checkout Flow** - Order placement and payment integration  
🚧 **Admin Panel** - Product and order management  
🚧 **Delivery Panel** - For delivery agents  
🚧 **MongoDB Integration** - Database for products and orders  
🚧 **Payment Gateway** - Razorpay integration  
🚧 **Order Tracking** - Real-time order status updates  

## 🐛 Troubleshooting

### Common Issues

1. **Port Already in Use**:
   ```bash
   # Kill process on port 3000 or 5000
   npx kill-port 3000
   npx kill-port 5000
   ```

2. **Module Not Found Errors**:
   ```bash
   # Clear node_modules and reinstall
   rm -rf node_modules package-lock.json
   rm -rf frontend/node_modules frontend/package-lock.json  
   rm -rf backend/node_modules backend/package-lock.json
   npm run install:all
   ```

3. **Firebase Auth Issues**:
   - Check if you're using correct Firebase config
   - Ensure Firebase project has Authentication enabled
   - For development, the demo config should work fine

4. **TailwindCSS Not Working**:
   ```bash
   cd frontend
   npm run build
   # Restart the development server
   ```

## 📞 Support

For issues or questions:
- Check the troubleshooting section above
- Review the console for error messages
- Ensure all dependencies are installed correctly

## 🎉 Demo Data

The application comes with sample bakery products:
- **Breads**: Fresh White Bread, Garlic Bread
- **Cakes**: Chocolate Cake, Vanilla Cupcakes  
- **Biscuits**: Butter Cookies
- **Snacks**: Samosas

All products have realistic pricing in Indian Rupees (₹) and stock quantities.

---

**Happy Baking! 🥖🎂🍪**