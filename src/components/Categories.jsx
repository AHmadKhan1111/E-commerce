import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const Categories = () => {
  const navigate = useNavigate();
  
  const handleShopNowClick = (categoryName) => {
    navigate(`/products?category=${encodeURIComponent(categoryName)}`);
  };
  const categories = [
    {
      id: 1,
      name: "Bridal Collection",
      image: "https://images.unsplash.com/photo-1596944924591-4b6b1df4c0c5?w=400&h=300&fit=crop",
      count: "150+ Items"
    },
    {
      id: 2,
      name: "Necklaces",
      image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400&h=300&fit=crop",
      count: "200+ Items"
    },
    {
      id: 3,
      name: "Earrings",
      image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400&h=300&fit=crop",
      count: "300+ Items"
    },
    {
      id: 4,
      name: "Rings",
      image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400&h=300&fit=crop",
      count: "180+ Items"
    },
    {
      id: 5,
      name: "Bracelets",
      image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400&h=300&fit=crop",
      count: "120+ Items"
    },
    {
      id: 6,
      name: "Pendants",
      image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400&h=300&fit=crop",
      count: "90+ Items"
    }
  ];

  return (
    <section id="categories" className="py-20 bg-gray-50">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our diverse collection of jewelry organized by category
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group relative overflow-hidden rounded-2xl shadow-lg card-hover bg-white"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                <p className="text-sm opacity-90 mb-4">{category.count}</p>
                <button 
                  onClick={() => handleShopNowClick(category.name)}
                  className="flex items-center text-white hover:text-amber-300 transition-colors duration-300"
                >
                  <span className="font-medium">Shop Now</span>
                  <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;