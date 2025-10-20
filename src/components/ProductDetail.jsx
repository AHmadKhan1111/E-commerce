import React, { useState, useEffect } from 'react';
import { X, Star, Heart, ShoppingBag, Minus, Plus, Share2, Truck, Shield, RotateCcw, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';

const ProductDetail = ({ 
  isOpen, 
  onClose, 
  product, 
  onAddToCart, 
  onAddToWishlist,
  isInWishlist = false 
}) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '', name: '' });

  // Enhanced product data with multiple images and variants
  const enhancedProduct = product ? {
    ...product,
    images: product.images || [
      product.image,
      "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1596944924591-4b6b1df4c0c5?w=600&h=600&fit=crop"
    ],
    variants: product.variants || {
      size: ['Small', 'Medium', 'Large'],
      material: ['Gold', 'Silver', 'Rose Gold'],
      stone: ['Diamond', 'Ruby', 'Emerald', 'Sapphire']
    },
    specifications: product.specifications || {
      'Material': 'Sterling Silver with Gold Plating',
      'Stone Type': 'Cubic Zirconia',
      'Chain Length': '18 inches',
      'Pendant Size': '1.2 x 0.8 inches',
      'Weight': '12 grams',
      'Care Instructions': 'Clean with soft cloth, avoid water'
    },
    reviews: product.reviews || [
      {
        id: 1,
        name: 'Sarah Johnson',
        rating: 5,
        comment: 'Absolutely beautiful piece! The quality exceeded my expectations.',
        date: '2024-01-15',
        verified: true
      },
      {
        id: 2,
        name: 'Emily Davis',
        rating: 4,
        comment: 'Lovely design, fast shipping. Very happy with my purchase.',
        date: '2024-01-10',
        verified: true
      }
    ],
    inStock: product.inStock !== undefined ? product.inStock : true,
    stockCount: product.stockCount || 15,
    shippingInfo: {
      freeShipping: true,
      estimatedDays: '3-5 business days',
      returnPolicy: '30-day return policy'
    }
  } : null;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setSelectedImage(0);
      setQuantity(1);
      setSelectedVariant({});
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !enhancedProduct) return null;

  const handleAddToCart = () => {
    const productWithVariants = {
      ...enhancedProduct,
      selectedVariants: selectedVariant,
      quantity: quantity
    };
    onAddToCart(productWithVariants);
  };

  const handleAddToWishlist = () => {
    onAddToWishlist(enhancedProduct);
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= enhancedProduct.stockCount) {
      setQuantity(newQuantity);
    }
  };

  const handleVariantChange = (type, value) => {
    setSelectedVariant(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    // Add review logic here
    console.log('New review:', newReview);
    setShowReviewForm(false);
    setNewReview({ rating: 5, comment: '', name: '' });
  };

  const nextImage = () => {
    setSelectedImage((prev) => 
      prev === enhancedProduct.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setSelectedImage((prev) => 
      prev === 0 ? enhancedProduct.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-black bg-opacity-75" onClick={onClose}></div>
        
        <div className="inline-block w-full max-w-6xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-900">{enhancedProduct.name}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex flex-col lg:flex-row">
            {/* Image Gallery */}
            <div className="lg:w-1/2 p-6">
              <div className="relative mb-4">
                <img
                  src={enhancedProduct.images[selectedImage]}
                  alt={enhancedProduct.name}
                  className="w-full h-96 object-cover rounded-lg"
                />
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                {enhancedProduct.badge && (
                  <span className="absolute top-4 left-4 bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {enhancedProduct.badge}
                  </span>
                )}
              </div>
              
              {/* Thumbnail Images */}
              <div className="flex space-x-2 overflow-x-auto">
                {enhancedProduct.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? 'border-amber-600' : 'border-gray-200'
                    }`}
                  >
                    <img src={image} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Information */}
            <div className="lg:w-1/2 p-6">
              {/* Rating */}
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(enhancedProduct.rating) ? 'text-amber-500 fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">
                  ({enhancedProduct.rating}) • {enhancedProduct.reviews.length} reviews
                </span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-center space-x-2">
                  <span className="text-3xl font-bold text-gray-900">
                    Rs. {enhancedProduct.price.toLocaleString()}
                  </span>
                  {enhancedProduct.originalPrice && (
                    <span className="text-lg text-gray-500 line-through">
                      Rs. {enhancedProduct.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
                {enhancedProduct.originalPrice && (
                  <span className="text-green-600 font-medium">
                    Save Rs. {(enhancedProduct.originalPrice - enhancedProduct.price).toLocaleString()}
                  </span>
                )}
              </div>

              {/* Stock Status */}
              <div className="mb-6">
                {enhancedProduct.inStock ? (
                  <span className="text-green-600 font-medium">
                    ✓ In Stock ({enhancedProduct.stockCount} available)
                  </span>
                ) : (
                  <span className="text-red-600 font-medium">✗ Out of Stock</span>
                )}
              </div>

              {/* Variants */}
              {Object.entries(enhancedProduct.variants).map(([type, options]) => (
                <div key={type} className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                    {type}:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {options.map((option) => (
                      <button
                        key={option}
                        onClick={() => handleVariantChange(type, option)}
                        className={`px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
                          selectedVariant[type] === option
                            ? 'border-amber-600 bg-amber-50 text-amber-600'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              {/* Quantity */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity:</label>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 border border-gray-300 rounded-lg min-w-[60px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    disabled={quantity >= enhancedProduct.stockCount}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 mb-6">
                <button
                  onClick={handleAddToCart}
                  disabled={!enhancedProduct.inStock}
                  className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-amber-600 transition-colors duration-300 flex items-center justify-center space-x-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>Add to Cart</span>
                </button>
                
                <div className="flex space-x-3">
                  <button
                    onClick={handleAddToWishlist}
                    className={`flex-1 py-3 rounded-lg border transition-colors duration-300 flex items-center justify-center space-x-2 ${
                      isInWishlist
                        ? 'border-red-500 bg-red-50 text-red-600'
                        : 'border-gray-300 hover:border-red-500 hover:text-red-600'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-current' : ''}`} />
                    <span>{isInWishlist ? 'In Wishlist' : 'Add to Wishlist'}</span>
                  </button>
                  
                  <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Shipping Info */}
              <div className="border-t pt-6">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Truck className="w-5 h-5 text-green-600" />
                    <span className="text-sm">
                      {enhancedProduct.shippingInfo.freeShipping ? 'Free Shipping' : 'Shipping Available'} • 
                      {enhancedProduct.shippingInfo.estimatedDays}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RotateCcw className="w-5 h-5 text-blue-600" />
                    <span className="text-sm">{enhancedProduct.shippingInfo.returnPolicy}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 text-purple-600" />
                    <span className="text-sm">Secure Payment & Authenticity Guaranteed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="border-t">
            <div className="flex border-b">
              {['description', 'specifications', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 font-medium capitalize ${
                    activeTab === tab
                      ? 'border-b-2 border-amber-600 text-amber-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="p-6">
              {activeTab === 'description' && (
                <div>
                  <p className="text-gray-700 leading-relaxed">
                    {enhancedProduct.description || 'This exquisite piece combines traditional craftsmanship with contemporary design. Made from the finest materials and attention to detail, this jewelry piece is perfect for special occasions or everyday elegance.'}
                  </p>
                </div>
              )}

              {activeTab === 'specifications' && (
                <div>
                  <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(enhancedProduct.specifications).map(([key, value]) => (
                      <div key={key}>
                        <dt className="font-medium text-gray-900">{key}:</dt>
                        <dd className="text-gray-700">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold">Customer Reviews</h3>
                    <button
                      onClick={() => setShowReviewForm(!showReviewForm)}
                      className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors"
                    >
                      Write Review
                    </button>
                  </div>

                  {showReviewForm && (
                    <form onSubmit={handleReviewSubmit} className="mb-6 p-4 border rounded-lg bg-gray-50">
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Rating:</label>
                        <div className="flex space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setNewReview(prev => ({ ...prev, rating: star }))}
                              className="p-1"
                            >
                              <Star
                                className={`w-6 h-6 ${
                                  star <= newReview.rating ? 'text-amber-500 fill-current' : 'text-gray-300'
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Name:</label>
                        <input
                          type="text"
                          value={newReview.name}
                          onChange={(e) => setNewReview(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Review:</label>
                        <textarea
                          value={newReview.comment}
                          onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                          rows={4}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                          required
                        />
                      </div>
                      <div className="flex space-x-3">
                        <button
                          type="submit"
                          className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors"
                        >
                          Submit Review
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowReviewForm(false)}
                          className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}

                  <div className="space-y-4">
                    {enhancedProduct.reviews.map((review) => (
                      <div key={review.id} className="border-b pb-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{review.name}</span>
                            {review.verified && (
                              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                                Verified Purchase
                              </span>
                            )}
                          </div>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                        <div className="flex items-center mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < review.rating ? 'text-amber-500 fill-current' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
