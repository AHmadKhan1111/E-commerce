import React from 'react';
import Hero from '../components/Hero';
import FeaturedProducts from '../components/FeaturedProducts';
import CategoriesSection from '../components/Categories';
import About from '../components/About';
import Testimonials from '../components/Testimonials';

const Home = ({ onAddToCart, onAddToWishlist, onProductClick }) => {
  return (
    <div>
      <Hero />
      <FeaturedProducts 
        onAddToCart={onAddToCart}
        onAddToWishlist={onAddToWishlist}
        onProductClick={onProductClick}
      />
      <CategoriesSection />
      <About />
      <Testimonials />
    </div>
  );
};

export default Home;
