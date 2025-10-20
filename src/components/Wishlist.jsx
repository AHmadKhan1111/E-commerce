import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';

const Wishlist = ({ isOpen, onClose, wishlistItems, removeFromWishlist, addToCart, clearWishlist }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      
      {/* Wishlist Panel */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <Heart className="w-5 h-5 mr-2 text-red-500" />
              Wishlist ({wishlistItems.length})
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Wishlist Items */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {wishlistItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <Heart className="w-16 h-16 mb-4 text-gray-300" />
                <p className="text-lg font-medium mb-2">Your wishlist is empty</p>
                <p className="text-sm text-center">Save your favorite jewelry pieces here!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {wishlistItems.map((item) => (
                  <div key={item.id} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-start space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 mb-1">{item.name}</h3>
                        <p className="text-sm text-gray-500 mb-2">{item.category}</p>
                        <p className="font-semibold text-amber-600 mb-3">${item.price}</p>
                        
                        {/* Action Buttons */}
                        <div className="flex space-x-2">
                          <button
                            onClick={() => addToCart(item)}
                            className="flex items-center px-3 py-2 bg-amber-600 text-white text-sm rounded-md hover:bg-amber-700 transition-colors"
                          >
                            <ShoppingBag className="w-4 h-4 mr-1" />
                            Add to Cart
                          </button>
                          <button
                            onClick={() => removeFromWishlist(item.id)}
                            className="flex items-center px-3 py-2 bg-red-100 text-red-600 text-sm rounded-md hover:bg-red-200 transition-colors"
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Item Details */}
                    {item.description && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                    )}
                    
                    {/* Stock Status */}
                    <div className="mt-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        item.inStock 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {item.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>
                  </div>
                ))}
                
                {wishlistItems.length > 0 && (
                  <div className="pt-4 border-t border-gray-200">
                    <button
                      onClick={() => {
                        const inStockItems = wishlistItems.filter(item => item.inStock);
                        inStockItems.forEach(item => addToCart(item));
                      }}
                      className="w-full mb-2 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors font-medium"
                      disabled={wishlistItems.filter(item => item.inStock).length === 0}
                    >
                      Add All to Cart ({wishlistItems.filter(item => item.inStock).length})
                    </button>
                    <button
                      onClick={clearWishlist}
                      className="w-full py-2 text-sm text-red-600 hover:text-red-800 transition-colors"
                    >
                      Clear Wishlist
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Wishlist Footer */}
          {wishlistItems.length > 0 && (
            <div className="border-t border-gray-200 px-6 py-4">
              <div className="text-center text-sm text-gray-500">
                <p>{wishlistItems.length} item{wishlistItems.length !== 1 ? 's' : ''} saved</p>
                <p className="mt-1">
                  {wishlistItems.filter(item => item.inStock).length} available to add to cart
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
