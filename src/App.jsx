import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Cart from './components/Cart';
import Wishlist from './components/Wishlist';
import Profile from './components/Profile';
import ProductDetail from './components/ProductDetail';
import SearchAndFilter from './components/SearchAndFilter';
import Checkout from './components/Checkout';
import Auth from './components/Auth';
import Home from './pages/Home';
import Products from './pages/Products';
import Categories from './pages/Categories';

function App() {
  // Cart and Wishlist state
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Profile and User state
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState({
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main Street, New York, NY 10001',
    avatar: null,
    isLoggedIn: true
  });

  // New component states
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  // Cart functions
  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Wishlist functions
  const addToWishlist = (product) => {
    setWishlistItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (!existingItem) {
        return [...prevItems, { ...product, inStock: true }];
      }
      return prevItems;
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  // Recently viewed functions
  const addToRecentlyViewed = (product) => {
    setRecentlyViewed(prevItems => {
      const filtered = prevItems.filter(item => item.id !== product.id);
      return [product, ...filtered].slice(0, 10);
    });
  };

  // Product detail functions
  const openProductDetail = (product) => {
    setSelectedProduct(product);
    setIsProductDetailOpen(true);
    addToRecentlyViewed(product);
  };

  const closeProductDetail = () => {
    setIsProductDetailOpen(false);
    setSelectedProduct(null);
  };

  // Search functions
  const handleSearchResults = (results) => {
    setFilteredProducts(results);
  };

  const openSearch = () => {
    setIsSearchOpen(true);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
  };

  // Checkout functions
  const openCheckout = () => {
    if (cartItems.length > 0) {
      setIsCheckoutOpen(true);
      setIsCartOpen(false);
    }
  };

  const closeCheckout = () => {
    setIsCheckoutOpen(false);
  };

  const handleOrderComplete = (orderData) => {
    setOrders(prevOrders => [orderData, ...prevOrders]);
    clearCart();
    setIsCheckoutOpen(false);
    alert('Order placed successfully! Order ID: ' + orderData.id);
  };

  // Profile functions
  const updateProfile = (updatedUser) => {
    setUser(prevUser => ({ ...prevUser, ...updatedUser }));
  };

  const handleLogout = () => {
    setUser(prevUser => ({ ...prevUser, isLoggedIn: false }));
    setIsProfileOpen(false);
    // Clear cart and wishlist on logout
    setCartItems([]);
    setWishlistItems([]);
  };

  // Toggle functions
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
    setIsWishlistOpen(false);
    setIsProfileOpen(false);
  };

  const toggleWishlist = () => {
    setIsWishlistOpen(!isWishlistOpen);
    setIsCartOpen(false);
    setIsProfileOpen(false);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
    setIsCartOpen(false);
    setIsWishlistOpen(false);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header 
          cartItemsCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
          wishlistItemsCount={wishlistItems.length}
          user={user}
          onCartClick={toggleCart}
          onWishlistClick={toggleWishlist}
          onProfileClick={toggleProfile}
          onSearchClick={openSearch}
        />
        
        {/* Search and Filter Component */}
        {isSearchOpen && (
          <SearchAndFilter
            isOpen={isSearchOpen}
            onClose={closeSearch}
            onFilteredResults={handleSearchResults}
          />
        )}
        
        {/* Routes */}
        <Routes>
          <Route 
            path="/" 
            element={
              <Home 
                onAddToCart={addToCart}
                onAddToWishlist={addToWishlist}
                onProductClick={openProductDetail}
              />
            } 
          />
          <Route 
            path="/products" 
            element={
              <Products 
                onAddToCart={addToCart}
                onAddToWishlist={addToWishlist}
                onProductClick={openProductDetail}
                wishlistItems={wishlistItems}
              />
            } 
          />
          <Route 
            path="/categories" 
            element={<Categories />} 
          />
        </Routes>
        
        <Footer />
      
        {/* Cart Component */}
        <Cart
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
          clearCart={clearCart}
          onCheckout={openCheckout}
        />
        
        {/* Wishlist Component */}
        <Wishlist
          isOpen={isWishlistOpen}
          onClose={() => setIsWishlistOpen(false)}
          wishlistItems={wishlistItems}
          removeFromWishlist={removeFromWishlist}
          addToCart={addToCart}
          clearWishlist={clearWishlist}
        />

        {/* Profile Component */}
        <Profile
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
          user={user}
          onUpdateProfile={updateProfile}
          onLogout={handleLogout}
        />

        {/* Product Detail Modal */}
        <ProductDetail
          isOpen={isProductDetailOpen}
          onClose={closeProductDetail}
          product={selectedProduct}
          onAddToCart={addToCart}
          onAddToWishlist={addToWishlist}
          isInWishlist={selectedProduct ? wishlistItems.some(item => item.id === selectedProduct.id) : false}
        />

        {/* Checkout Modal */}
        <Checkout
          isOpen={isCheckoutOpen}
          onClose={closeCheckout}
          cartItems={cartItems}
          onOrderComplete={handleOrderComplete}
        />

        {/* Auth Modal */}
        <Auth
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
          onLogin={(userData) => {
            setUser(prev => ({ ...prev, ...userData, isLoggedIn: true }));
            setIsAuthOpen(false);
          }}
          onRegister={(userData) => {
            setUser(prev => ({ ...prev, ...userData, isLoggedIn: true }));
            setIsAuthOpen(false);
          }}
        />
      </div>
    </Router>
  );
}

export default App;