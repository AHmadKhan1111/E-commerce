import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Menu, X, Search, User, Heart } from 'lucide-react';

const Header = ({ cartItemsCount = 0, wishlistItemsCount = 0, onCartClick, onWishlistClick, onProfileClick, onSearchClick, user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoriesDropdownOpen, setIsCategoriesDropdownOpen] = useState(false);

  const categories = [
    { name: 'Rings', path: '/products?category=Rings' },
    { name: 'Necklaces', path: '/products?category=Necklaces' },
    { name: 'Bracelets', path: '/products?category=Bracelets' },
    { name: 'Earrings', path: '/products?category=Earrings' }
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 ml-9">
            <Link to="/">
              <h1 className="text-3xl font-bold text-amber-600 cursor-pointer hover:text-amber-700 transition-colors">Jewelery Store</h1>
            </Link>
          </div>
         
          {/* Desktop Navigation */}
          <nav className="hidden gap-2 ml-20 md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-amber-600 transition-colors duration-300 font-medium">Home</Link>
            <Link to="/products" className="text-gray-700 hover:text-amber-600 transition-colors duration-300 font-medium">Products</Link>
            
            {/* Categories Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsCategoriesDropdownOpen(true)}
              onMouseLeave={() => setIsCategoriesDropdownOpen(false)}
            >
              <Link 
                to="/categories" 
                className="text-gray-700 hover:text-amber-600 transition-colors duration-300 font-medium flex items-center"
              >
                Categories
                <svg 
                  className={`ml-1 w-4 h-4 transition-transform duration-200 ${
                    isCategoriesDropdownOpen ? 'rotate-180' : ''
                  }`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
              
              {/* Dropdown Menu */}
              {isCategoriesDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  {categories.map((category) => (
                    <Link
                      key={category.name}
                      to={category.path}
                      className="block px-4 py-2 text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-colors duration-200 font-medium"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            <a href="#about" className="text-gray-700 hover:text-amber-600 transition-colors duration-300 font-medium">About</a>
            <a href="#contact" className="text-gray-700 hover:text-amber-600 transition-colors duration-300 font-medium">Contact</a>
          </nav>

          {/* Search Bar */}
          <div 
            onClick={onSearchClick}
            className="hidden ml-20 lg:flex items-center bg-gray-100 rounded-full px-4 py-2 w-76 cursor-pointer hover:bg-gray-200 transition-colors"
          >
            <Search className="w-5 h-5 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search jewelry..."
              className="bg-transparent outline-none flex-1 text-sm cursor-pointer"
              readOnly
            />
          </div>

          {/* Icons */}
          <div className="hidden md:flex items-center space-x-4 mr-20">
            <button 
              onClick={onProfileClick}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-300 relative"
            >
              <User className="w-6 h-6 text-gray-700" />
              {user?.isLoggedIn && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></span>
              )}
            </button>
            <button 
              onClick={onWishlistClick}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-300 relative"
            >
              <Heart className="w-6 h-6 text-gray-700" />
              {wishlistItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlistItemsCount}
                </span>
              )}
            </button>
            <button 
              onClick={onCartClick}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-300 relative"
            >
              <ShoppingBag className="w-6 h-6 text-gray-700" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors duration-300"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-700 hover:text-amber-600 transition-colors duration-300 font-medium">Home</Link>
              <Link to="/products" className="text-gray-700 hover:text-amber-600 transition-colors duration-300 font-medium">Products</Link>
              <Link to="/categories" className="text-gray-700 hover:text-amber-600 transition-colors duration-300 font-medium">Categories</Link>
              
              {/* Mobile Categories Submenu */}
              <div className="ml-4 space-y-2">
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    to={category.path}
                    className="block text-sm text-gray-600 hover:text-amber-600 transition-colors duration-300"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
              
              <a href="#about" className="text-gray-700 hover:text-amber-600 transition-colors duration-300 font-medium">About</a>
              <a href="#contact" className="text-gray-700 hover:text-amber-600 transition-colors duration-300 font-medium">Contact</a>
              
              {/* Mobile Cart and Wishlist */}
              <div className="flex items-center space-x-4 pt-4 border-t border-gray-200">
                <button 
                  onClick={onWishlistClick}
                  className="flex items-center space-x-2 text-gray-700 hover:text-amber-600 transition-colors duration-300"
                >
                  <Heart className="w-5 h-5" />
                  <span>Wishlist ({wishlistItemsCount})</span>
                </button>
                <button 
                  onClick={onCartClick}
                  className="flex items-center space-x-2 text-gray-700 hover:text-amber-600 transition-colors duration-300"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>Cart ({cartItemsCount})</span>
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;