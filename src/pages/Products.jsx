import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ShoppingBag, Heart, Eye } from 'lucide-react';

const Products = ({ onAddToCart, onAddToWishlist, onProductClick, wishlistItems = [] }) => {
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    'Bridal Collection',
    'Rings',
    'Necklaces',
    'Bracelets',
    'Earrings',
    'Pendants',
    'Anklets'
  ];

  const products = [
    {
      id: 1,
      name: "Diamond Solitaire Ring",
      price: 75000,
      category: "Rings",
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300&h=300&fit=crop"
    },
    {
      id: 2,
      name: "Gold Chain Necklace",
      price: 45000,
      category: "Necklaces",
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=300&h=300&fit=crop"
    },
    {
      id: 3,
      name: "Pearl Tennis Bracelet",
      price: 32000,
      category: "Bracelets",
      image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=300&h=300&fit=crop"
    },
    {
      id: 4,
      name: "Emerald Drop Earrings",
      price: 28000,
      category: "Earrings",
      image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=300&h=300&fit=crop"
    },
    {
      id: 5,
      name: "Ruby Engagement Ring",
      price: 95000,
      category: "Rings",
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300&h=300&fit=crop"
    },
    {
      id: 6,
      name: "Sapphire Pendant",
      price: 38000,
      category: "Pendants",
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=300&h=300&fit=crop"
    },
    {
      id: 15,
      name: "Bridal Necklace Set",
      price: 125000,
      category: "Bridal Collection",
      image: "https://images.unsplash.com/photo-1596944924591-4b6b1df4c0c5?w=300&h=300&fit=crop"
    },
    {
      id: 16,
      name: "Wedding Ring Set",
      price: 150000,
      category: "Bridal Collection",
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300&h=300&fit=crop"
    },
    {
      id: 17,
      name: "Bridal Earring Set",
      price: 85000,
      category: "Bridal Collection",
      image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=300&h=300&fit=crop"
    },
    {
      id: 7,
      name: "Diamond Stud Earrings",
      price: 55000,
      category: "Earrings",
      image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=300&h=300&fit=crop"
    },
    {
      id: 8,
      name: "Gold Charm Bracelet",
      price: 42000,
      category: "Bracelets",
      image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=300&h=300&fit=crop"
    },
    {
      id: 9,
      name: "Vintage Pearl Necklace",
      price: 68000,
      category: "Necklaces",
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=300&h=300&fit=crop"
    },
    {
      id: 10,
      name: "Silver Anklet",
      price: 15000,
      category: "Anklets",
      image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=300&h=300&fit=crop"
    },
    {
      id: 11,
      name: "Platinum Wedding Band",
      price: 85000,
      category: "Rings",
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300&h=300&fit=crop"
    },
    {
      id: 12,
      name: "Heart Pendant Necklace",
      price: 25000,
      category: "Pendants",
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=300&h=300&fit=crop"
    }
  ];

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const handleAddToCart = (product) => {
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  const handleAddToWishlist = (product) => {
    if (onAddToWishlist) {
      onAddToWishlist(product);
    }
  };

  const handleProductClick = (product) => {
    if (onProductClick) {
      onProductClick(product);
    }
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.id === productId);
  };

  // Handle category query parameter
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category');
    if (categoryFromUrl && categories.includes(categoryFromUrl)) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [searchParams, categories]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900">Our Products</h1>
          <p className="mt-2 text-gray-600">Discover our exquisite collection of fine jewelry</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar - Categories */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Categories</h2>
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category}>
                    <button
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                        selectedCategory === category
                          ? 'bg-amber-50 text-amber-700 border border-amber-200 font-medium'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      {category}
                      {category !== 'All' && (
                        <span className="float-right text-sm text-gray-500">
                          ({products.filter(p => p.category === category).length})
                        </span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Section - Product Grid */}
          <div className="lg:w-3/4">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                Showing {filteredProducts.length} products
                {selectedCategory !== 'All' && ` in ${selectedCategory}`}
              </p>
              <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500">
                <option>Sort by: Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest First</option>
              </select>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-all duration-300 overflow-hidden group"
                >
                  {/* Product Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                    
                    {/* Action Buttons */}
                    <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button 
                        onClick={() => handleProductClick(product)}
                        className="p-2 bg-white rounded-full shadow-lg hover:bg-amber-600 hover:text-white transition-all duration-300"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleAddToWishlist(product)}
                        className={`p-2 rounded-full shadow-lg transition-all duration-300 ${
                          isInWishlist(product.id)
                            ? 'bg-red-500 text-white'
                            : 'bg-white hover:bg-red-500 hover:text-white'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {product.name}
                    </h3>
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-amber-600">
                        ₹{product.price.toLocaleString()}
                      </span>
                      <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {product.category}
                      </span>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg font-medium hover:bg-amber-600 transition-all duration-300 flex items-center justify-center space-x-2 group"
                    >
                      <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <ShoppingBag className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600">Try selecting a different category</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
