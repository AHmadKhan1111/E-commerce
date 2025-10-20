import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Award, Shield, Truck, Users, Package, Clock } from 'lucide-react';

const About = () => {
  const navigate = useNavigate();
  
  const handleLearnMoreClick = () => {
    navigate('/categories');
  };
  const features = [
    {
      icon: <Award className="w-8 h-8" />,
      title: "Premium Quality",
      description: "Crafted with the finest materials and attention to detail"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Expert Craftsmen",
      description: "15+ years of experience in traditional and modern jewelry making"
    },
    {
      icon: <Package className="w-8 h-8" />,
      title: "Secure Delivery",
      description: "Safe and insured shipping across Pakistan"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "24/7 Support",
      description: "Round-the-clock customer service for all your queries"
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                About M.B Collections
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                For over 15 years, M.B Collections has been Pakistan's trusted name in exquisite jewelry. 
                We blend traditional craftsmanship with contemporary designs to create pieces that celebrate life's precious moments.
              </p>
            </div>

            <p className="text-gray-600 leading-relaxed">
              Our commitment to quality, authenticity, and customer satisfaction has made us the preferred choice 
              for thousands of customers across Pakistan. Every piece in our collection is carefully curated and crafted 
              to meet the highest standards of excellence.
            </p>

            <div className="grid grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="space-y-3">
                  <div className="text-amber-600">{feature.icon}</div>
                  <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>

            <button 
              onClick={handleLearnMoreClick}
              className="btn-primary"
            >
              Learn More About Us
            </button>
          </div>

          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=700&fit=crop"
                alt="Jewelry craftsmanship"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
            
            <div className="absolute -bottom-6 -left-6 bg-amber-600 text-white rounded-2xl p-8 shadow-2xl">
              <div className="text-center">
                <div className="text-3xl font-bold">15+</div>
                <div className="text-sm opacity-90">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;