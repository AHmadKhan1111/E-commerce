import React from 'react';
import { useNavigate } from 'react-router-dom';

const Categories = () => {
  const navigate = useNavigate();

  const categories = [
    {
      id: 1,
      name: 'Rings',
      description: 'Elegant rings for every occasion',
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=300&fit=crop',
      color: 'from-amber-400 to-amber-600',
      productCount: 25
    },
    {
      id: 2,
      name: 'Necklaces',
      description: 'Beautiful necklaces and chains',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=300&fit=crop',
      color: 'from-rose-400 to-rose-600',
      productCount: 18
    },
    {
      id: 3,
      name: 'Bracelets',
      description: 'Stylish bracelets and bangles',
      image: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400&h=300&fit=crop',
      color: 'from-purple-400 to-purple-600',
      productCount: 15
    },
    {
      id: 4,
      name: 'Earrings',
      description: 'Stunning earrings for any style',
      image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=400&h=300&fit=crop',
      color: 'from-blue-400 to-blue-600',
      productCount: 22
    },
    {
      id: 5,
      name: 'Pendants',
      description: 'Exquisite pendants and charms',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=300&fit=crop',
      color: 'from-green-400 to-green-600',
      productCount: 12
    },
    {
      id: 6,
      name: 'Anklets',
      description: 'Delicate anklets and foot jewelry',
      image: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400&h=300&fit=crop',
      color: 'from-pink-400 to-pink-600',
      productCount: 8
    }
  ];

  const handleCategoryClick = (categoryName) => {
    navigate(`/products?category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">All Categories</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our diverse collection of fine jewelry, carefully curated across different categories to help you find the perfect piece for any occasion.
            </p>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category.name)}
              className="group cursor-pointer bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-amber-200"
            >
              {/* Image Section */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
                
                {/* Product Count Badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-sm font-medium text-gray-700">
                    {category.productCount} items
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors duration-300">
                  {category.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {category.description}
                </p>
                
                {/* Call to Action */}
                <div className="flex items-center justify-between">
                  <span className="text-amber-600 font-medium text-sm group-hover:text-amber-700 transition-colors duration-300">
                    Shop Now
                  </span>
                  <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center group-hover:bg-amber-200 transition-colors duration-300">
                    <svg className="w-4 h-4 text-amber-600 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-2xl p-8 border border-amber-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Can't Find What You're Looking For?
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Browse our complete collection or use our search feature to find the perfect piece of jewelry.
            </p>
            <button
              onClick={() => navigate('/products')}
              className="bg-amber-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-amber-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              View All Products
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
