import React from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="contact" className="bg-gray-900 text-white">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-amber-400">M.B Collections</h3>
            <p className="text-gray-300 leading-relaxed">
              Pakistan's premier online jewelry destination, offering exquisite designs 
              that celebrate life's precious moments with elegance and style.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-amber-600 transition-colors duration-300">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-amber-600 transition-colors duration-300">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-amber-600 transition-colors duration-300">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-amber-600 transition-colors duration-300">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-amber-400">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Products</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Categories</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">New Arrivals</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Best Sellers</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Contact</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-amber-400">Customer Service</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Shipping Info</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Return Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Size Guide</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Care Instructions</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">FAQs</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-amber-400">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-amber-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">Phone</p>
                  <p className="text-gray-300">+92 314 4012703</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-amber-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">Email</p>
                  <p className="text-gray-300">info@mbcollections.com.pk</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-amber-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">Address</p>
                  <p className="text-gray-300">Lahore, Pakistan</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 M.B Collections. All rights reserved. | Designed with ❤️ for jewelry lovers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;