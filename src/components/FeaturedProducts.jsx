import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart, Eye, Star } from 'lucide-react';

const FeaturedProducts = ({ onAddToCart, onAddToWishlist, onProductClick }) => {
  const navigate = useNavigate();
  
  const handleViewAllProducts = () => {
    navigate('/products');
  };
  
  const products = [
    {
      id: 1,
      price: 45000,
      originalPrice: 55000,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop",
      badge: "Best Seller",
      category: "Necklaces",
      description: "Elegant bridal necklace set with intricate gold work and precious stones."
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
      description: "Beautiful emerald drop earrings with gold plating."
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
      description: "Classic pearl bracelet with sterling silver clasp."
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
      description: "Stunning ruby ring with diamond accents in white gold setting."
    }
  ];

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

  return (
    <section id="products" className="py-20 bg-white">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Featured Products
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Handpicked selection of our most loves and trending jewelry pieces
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group card-hover bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-2">
                  <button 
                    onClick={() => onProductClick?.(product)}
                    className="p-3 bg-white rounded-full shadow-lg hover:bg-amber-600 hover:text-white transition-all duration-300"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => handleAddToWishlist(product)}
                    className="p-3 bg-white rounded-full shadow-lg hover:bg-red-500 hover:text-white transition-all duration-300"
                  >
                    <Heart className="w-5 h-5" />
                  </button>
                </div>
                {product.badge && (
                  <span className="absolute top-4 right-4 bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {product.badge}
                  </span>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                
                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-amber-500 fill-current' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">({product.rating})</span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-xl font-bold text-gray-900">Rs. {product.price.toLocaleString()}</span>
                    <span className="text-sm text-gray-500 line-through ml-2">Rs. {product.originalPrice.toLocaleString()}</span>
                  </div>
                </div>

                <button 
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-amber-600 transition-colors duration-300 flex items-center justify-center space-x-2"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button 
            onClick={handleViewAllProducts}
            className="btn-primary"
          >
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;