import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

const Hero = () => {
  const navigate = useNavigate();

  const handleShopNowClick = () => {
    navigate('/products');
  };

  const handleViewCollectionClick = () => {
    navigate('/categories');
  };
  return (
    <section id="home" className="relative bg-gradient-to-br from-amber-50 to-orange-50 py-20 lg:py-32">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center bg-white rounded-full px-4 py-2 shadow-md">
              <Sparkles className="w-5 h-5 text-amber-600 mr-2" />
              <span className="text-sm font-medium text-gray-700">Free Shipping on Orders Above Rs. 10,000</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
              Exquisite Jewelry for
              <span className="text-amber-600"> Every Moment</span>
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed">
              Discover Pakistan's finest collection of handcrafted jewelry. 
              From traditional to contemporary designs, find the perfect piece that tells your story.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleShopNowClick}
                className="btn-primary flex items-center justify-center"
              >
                Shop Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              <button 
                onClick={handleViewCollectionClick}
                className="btn-secondary"
              >
                View Collection
              </button>
            </div>
            
            <div className="flex items-center space-x-8 pt-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">5000+</div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">15+</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">1000+</div>
                <div className="text-sm text-gray-600">Unique Designs</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl card-hover">
              <img
                src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=600&fit=crop"
                alt="Exquisite Jewelry Collection"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-xl">
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-600">25% OFF</div>
                <div className="text-sm text-gray-600">Fall Sale</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;