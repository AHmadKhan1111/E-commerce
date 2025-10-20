import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Ayesha Khan",
      location: "Lahore",
      rating: 5,
      comment: "The bridal set I purchased exceeded all expectations! The craftsmanship is exceptional and the design is absolutely stunning. Highly recommended!",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Fatima Sheikh",
      location: "Karachi",
      rating: 5,
      comment: "Excellent quality jewelry with beautiful designs. The customer service was outstanding and delivery was prompt. Will definitely shop again!",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Sara Ahmed",
      location: "Islamabad",
      rating: 5,
      comment: "M.B Collections has the most elegant jewelry pieces. I receive compliments every time I wear their designs. Worth every penny!",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust M.B Collections for their special moments
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-2xl p-8 shadow-lg card-hover relative">
              <div className="absolute -top-4 left-8">
                <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center">
                  <Quote className="w-4 h-4 text-white" />
                </div>
              </div>

              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-amber-500 fill-current" />
                ))}
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed italic">
                "{testimonial.comment}"
              </p>

              <div className="flex items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center bg-white rounded-full px-8 py-4 shadow-lg">
            <div className="flex items-center space-x-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">5000+</div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div>
              <div className="w-px h-12 bg-gray-200"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">4.9/5</div>
                <div className="text-sm text-gray-600">Average Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;