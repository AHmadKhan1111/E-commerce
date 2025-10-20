import React, { useState, useEffect, useRef } from 'react';
import { Search, Filter, X, ChevronDown, SlidersHorizontal, Star } from 'lucide-react';

const SearchAndFilter = ({ 
  products = [], 
  onFilteredResults, 
  categories = [],
  isOpen,
  onClose 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    priceRange: { min: 0, max: 100000 },
    rating: 0,
    inStock: false,
    sortBy: 'relevance'
  });
  const [showFilters, setShowFilters] = useState(false);
  const searchRef = useRef(null);

  // Sample expanded product data for better filtering
  const expandedProducts = [
    {
      id: 1,
      name: "Bridal Necklace Set",
      price: 45000,
      originalPrice: 55000,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop",
      badge: "Best Seller",
      category: "Necklaces",
      description: "Elegant bridal necklace set with intricate gold work and precious stones.",
      inStock: true,
      stockCount: 15,
      tags: ["bridal", "wedding", "gold", "necklace", "set"]
    },
    {
      id: 2,
      name: "Emerald Drop Earrings",
      price: 22000,
      originalPrice: 28000,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400&h=400&fit=crop",
      badge: "New Arrival",
      category: "Earrings",
      description: "Beautiful emerald drop earrings with gold plating.",
      inStock: true,
      stockCount: 8,
      tags: ["emerald", "earrings", "drop", "gold", "green"]
    },
    {
      id: 3,
      name: "Pearl Bracelet",
      price: 18500,
      originalPrice: 23000,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400&h=400&fit=crop",
      badge: "Limited",
      category: "Bracelets",
      description: "Classic pearl bracelet with sterling silver clasp.",
      inStock: true,
      stockCount: 12,
      tags: ["pearl", "bracelet", "silver", "classic", "white"]
    },
    {
      id: 4,
      name: "Ruby Ring",
      price: 35000,
      originalPrice: 42000,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400&h=400&fit=crop",
      badge: null,
      category: "Rings",
      description: "Stunning ruby ring with diamond accents in white gold setting.",
      inStock: false,
      stockCount: 0,
      tags: ["ruby", "ring", "diamond", "white gold", "red"]
    },
    {
      id: 5,
      name: "Diamond Tennis Bracelet",
      price: 85000,
      originalPrice: 95000,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400&h=400&fit=crop",
      badge: "Premium",
      category: "Bracelets",
      description: "Luxurious diamond tennis bracelet with brilliant cut diamonds.",
      inStock: true,
      stockCount: 3,
      tags: ["diamond", "tennis", "bracelet", "luxury", "brilliant"]
    },
    {
      id: 6,
      name: "Sapphire Pendant",
      price: 28000,
      originalPrice: 32000,
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400&h=400&fit=crop",
      badge: null,
      category: "Pendants",
      description: "Beautiful sapphire pendant with delicate chain.",
      inStock: true,
      stockCount: 7,
      tags: ["sapphire", "pendant", "blue", "chain", "delicate"]
    },
    {
      id: 7,
      name: "Gold Hoop Earrings",
      price: 15000,
      originalPrice: 18000,
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400&h=400&fit=crop",
      badge: null,
      category: "Earrings",
      description: "Classic gold hoop earrings for everyday wear.",
      inStock: true,
      stockCount: 20,
      tags: ["gold", "hoop", "earrings", "classic", "everyday"]
    },
    {
      id: 8,
      name: "Vintage Rose Ring",
      price: 42000,
      originalPrice: 48000,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400&h=400&fit=crop",
      badge: "Vintage",
      category: "Rings",
      description: "Vintage-inspired rose gold ring with intricate detailing.",
      inStock: true,
      stockCount: 5,
      tags: ["vintage", "rose", "ring", "rose gold", "intricate"]
    }
  ];

  const allProducts = products.length > 0 ? products : expandedProducts;

  // Generate search suggestions
  const generateSuggestions = (query) => {
    if (!query.trim()) return [];
    
    const suggestions = new Set();
    
    allProducts.forEach(product => {
      // Add product names
      if (product.name.toLowerCase().includes(query.toLowerCase())) {
        suggestions.add(product.name);
      }
      
      // Add categories
      if (product.category.toLowerCase().includes(query.toLowerCase())) {
        suggestions.add(product.category);
      }
      
      // Add tags
      product.tags?.forEach(tag => {
        if (tag.toLowerCase().includes(query.toLowerCase())) {
          suggestions.add(tag);
        }
      });
    });
    
    return Array.from(suggestions).slice(0, 8);
  };

  // Filter and sort products
  const getFilteredProducts = () => {
    let filtered = [...allProducts];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.tags?.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter(product => product.category === filters.category);
    }

    // Price range filter
    filtered = filtered.filter(product => 
      product.price >= filters.priceRange.min && 
      product.price <= filters.priceRange.max
    );

    // Rating filter
    if (filters.rating > 0) {
      filtered = filtered.filter(product => product.rating >= filters.rating);
    }

    // Stock filter
    if (filters.inStock) {
      filtered = filtered.filter(product => product.inStock);
    }

    // Sorting
    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => b.id - a.id);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default: // relevance
        break;
    }

    return filtered;
  };

  // Update filtered results whenever search or filters change
  useEffect(() => {
    const filteredProducts = getFilteredProducts();
    onFilteredResults?.(filteredProducts);
  }, [searchQuery, filters]);

  // Handle search input
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setShowSuggestions(true);
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
  };

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  // Handle price range change
  const handlePriceRangeChange = (type, value) => {
    setFilters(prev => ({
      ...prev,
      priceRange: {
        ...prev.priceRange,
        [type]: parseInt(value) || 0
      }
    }));
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      category: '',
      priceRange: { min: 0, max: 100000 },
      rating: 0,
      inStock: false,
      sortBy: 'relevance'
    });
    setSearchQuery('');
  };

  // Get unique categories from products
  const availableCategories = [...new Set(allProducts.map(p => p.category))];

  const suggestions = generateSuggestions(searchQuery);
  const activeFiltersCount = Object.values(filters).filter(value => {
    if (typeof value === 'boolean') return value;
    if (typeof value === 'string') return value !== '' && value !== 'relevance';
    if (typeof value === 'number') return value > 0;
    if (typeof value === 'object' && value.min !== undefined) {
      return value.min > 0 || value.max < 100000;
    }
    return false;
  }).length;

  return (
    <div className="bg-white border-b shadow-sm">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-4">
        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              ref={searchRef}
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              placeholder="Search jewelry, categories, or styles..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-lg"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setShowSuggestions(false);
                }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            )}
          </div>

          {/* Search Suggestions */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-50 max-h-60 overflow-y-auto">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 capitalize"
                >
                  <Search className="inline w-4 h-4 text-gray-400 mr-2" />
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Filter Controls */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <SlidersHorizontal className="w-5 h-5" />
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <span className="bg-amber-600 text-white text-xs px-2 py-1 rounded-full">
                {activeFiltersCount}
              </span>
            )}
          </button>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            >
              <option value="relevance">Sort by Relevance</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest First</option>
              <option value="name">Name A-Z</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                >
                  <option value="">All Categories</option>
                  {availableCategories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Price Range Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                <div className="space-y-2">
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.priceRange.min}
                      onChange={(e) => handlePriceRangeChange('min', e.target.value)}
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.priceRange.max}
                      onChange={(e) => handlePriceRangeChange('max', e.target.value)}
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>
                  <div className="text-xs text-gray-500">
                    Rs. {filters.priceRange.min.toLocaleString()} - Rs. {filters.priceRange.max.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Rating Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Rating</label>
                <div className="space-y-2">
                  {[4, 3, 2, 1].map(rating => (
                    <label key={rating} className="flex items-center">
                      <input
                        type="radio"
                        name="rating"
                        value={rating}
                        checked={filters.rating === rating}
                        onChange={(e) => handleFilterChange('rating', parseInt(e.target.value))}
                        className="mr-2 text-amber-600 focus:ring-amber-500"
                      />
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < rating ? 'text-amber-500 fill-current' : 'text-gray-300'}`}
                          />
                        ))}
                        <span className="ml-1 text-sm text-gray-600">& up</span>
                      </div>
                    </label>
                  ))}
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="rating"
                      value={0}
                      checked={filters.rating === 0}
                      onChange={(e) => handleFilterChange('rating', parseInt(e.target.value))}
                      className="mr-2 text-amber-600 focus:ring-amber-500"
                    />
                    <span className="text-sm text-gray-600">All Ratings</span>
                  </label>
                </div>
              </div>

              {/* Stock Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.inStock}
                    onChange={(e) => handleFilterChange('inStock', e.target.checked)}
                    className="mr-2 text-amber-600 focus:ring-amber-500"
                  />
                  <span className="text-sm text-gray-600">In Stock Only</span>
                </label>
              </div>
            </div>

            {/* Clear Filters */}
            <div className="mt-4 flex justify-end">
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        )}

        {/* Results Summary */}
        <div className="mt-4 text-sm text-gray-600">
          {getFilteredProducts().length} products found
          {searchQuery && ` for "${searchQuery}"`}
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilter;
