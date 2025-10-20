import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, CreditCard, Truck, MapPin, Check, Lock } from 'lucide-react';

const Checkout = ({ isOpen, onClose, cartItems = [], onOrderComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    shipping: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'India'
    },
    payment: {
      method: 'card',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardName: '',
      upiId: ''
    },
    billing: {
      sameAsShipping: true,
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      state: '',
      zipCode: ''
    }
  });

  const steps = [
    { id: 1, title: 'Shipping', icon: Truck },
    { id: 2, title: 'Payment', icon: CreditCard },
    { id: 3, title: 'Review', icon: Check }
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 50000 ? 0 : 500;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + shipping + tax;

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        const { shipping } = formData;
        return shipping.firstName && shipping.lastName && shipping.email && 
               shipping.phone && shipping.address && shipping.city && 
               shipping.state && shipping.zipCode;
      case 2:
        const { payment } = formData;
        if (payment.method === 'card') {
          return payment.cardNumber && payment.expiryDate && payment.cvv && payment.cardName;
        } else if (payment.method === 'upi') {
          return payment.upiId;
        }
        return true;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    const orderData = {
      id: Date.now(),
      items: cartItems,
      shipping: formData.shipping,
      payment: { method: formData.payment.method },
      totals: { subtotal, shipping, tax, total },
      status: 'confirmed',
      date: new Date().toISOString()
    };
    
    onOrderComplete?.(orderData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-black bg-opacity-75" onClick={onClose}></div>
        
        <div className="inline-block w-full max-w-4xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-900">Checkout</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Progress Steps */}
          <div className="px-6 py-4 border-b bg-gray-50">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    currentStep >= step.id ? 'bg-amber-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    <step.icon className="w-5 h-5" />
                  </div>
                  <span className={`ml-2 font-medium ${
                    currentStep >= step.id ? 'text-amber-600' : 'text-gray-600'
                  }`}>
                    {step.title}
                  </span>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-1 mx-4 ${
                      currentStep > step.id ? 'bg-amber-600' : 'bg-gray-200'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex">
            {/* Form Section */}
            <div className="flex-1 p-6">
              {/* Step 1: Shipping Information */}
              {currentStep === 1 && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Shipping Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                      <input
                        type="text"
                        value={formData.shipping.firstName}
                        onChange={(e) => handleInputChange('shipping', 'firstName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                      <input
                        type="text"
                        value={formData.shipping.lastName}
                        onChange={(e) => handleInputChange('shipping', 'lastName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                      <input
                        type="email"
                        value={formData.shipping.email}
                        onChange={(e) => handleInputChange('shipping', 'email', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                      <input
                        type="tel"
                        value={formData.shipping.phone}
                        onChange={(e) => handleInputChange('shipping', 'phone', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                      <input
                        type="text"
                        value={formData.shipping.address}
                        onChange={(e) => handleInputChange('shipping', 'address', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                      <input
                        type="text"
                        value={formData.shipping.city}
                        onChange={(e) => handleInputChange('shipping', 'city', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
                      <input
                        type="text"
                        value={formData.shipping.state}
                        onChange={(e) => handleInputChange('shipping', 'state', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code *</label>
                      <input
                        type="text"
                        value={formData.shipping.zipCode}
                        onChange={(e) => handleInputChange('shipping', 'zipCode', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Payment Information */}
              {currentStep === 2 && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Payment Information</h3>
                  
                  {/* Payment Method Selection */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">Payment Method</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="card"
                          checked={formData.payment.method === 'card'}
                          onChange={(e) => handleInputChange('payment', 'method', e.target.value)}
                          className="mr-3"
                        />
                        <CreditCard className="w-5 h-5 mr-2" />
                        <span>Credit/Debit Card</span>
                      </label>
                      <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="upi"
                          checked={formData.payment.method === 'upi'}
                          onChange={(e) => handleInputChange('payment', 'method', e.target.value)}
                          className="mr-3"
                        />
                        <span className="w-5 h-5 mr-2 bg-orange-500 rounded text-white text-xs flex items-center justify-center font-bold">₹</span>
                        <span>UPI</span>
                      </label>
                      <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="cod"
                          checked={formData.payment.method === 'cod'}
                          onChange={(e) => handleInputChange('payment', 'method', e.target.value)}
                          className="mr-3"
                        />
                        <Truck className="w-5 h-5 mr-2" />
                        <span>Cash on Delivery</span>
                      </label>
                    </div>
                  </div>

                  {/* Card Payment Form */}
                  {formData.payment.method === 'card' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Card Number *</label>
                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          value={formData.payment.cardNumber}
                          onChange={(e) => handleInputChange('payment', 'cardNumber', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date *</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          value={formData.payment.expiryDate}
                          onChange={(e) => handleInputChange('payment', 'expiryDate', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">CVV *</label>
                        <input
                          type="text"
                          placeholder="123"
                          value={formData.payment.cvv}
                          onChange={(e) => handleInputChange('payment', 'cvv', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                          required
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name *</label>
                        <input
                          type="text"
                          value={formData.payment.cardName}
                          onChange={(e) => handleInputChange('payment', 'cardName', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                          required
                        />
                      </div>
                    </div>
                  )}

                  {/* UPI Payment Form */}
                  {formData.payment.method === 'upi' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">UPI ID *</label>
                      <input
                        type="text"
                        placeholder="yourname@upi"
                        value={formData.payment.upiId}
                        onChange={(e) => handleInputChange('payment', 'upiId', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                        required
                      />
                    </div>
                  )}

                  {/* COD Message */}
                  {formData.payment.method === 'cod' && (
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-blue-800">
                        <strong>Cash on Delivery:</strong> Pay when your order is delivered to your doorstep.
                        Additional COD charges may apply.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Step 3: Order Review */}
              {currentStep === 3 && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Order Review</h3>
                  
                  {/* Shipping Details */}
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium mb-2 flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      Shipping Address
                    </h4>
                    <p className="text-sm text-gray-600">
                      {formData.shipping.firstName} {formData.shipping.lastName}<br />
                      {formData.shipping.address}<br />
                      {formData.shipping.city}, {formData.shipping.state} {formData.shipping.zipCode}<br />
                      {formData.shipping.phone}
                    </p>
                  </div>

                  {/* Payment Method */}
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium mb-2 flex items-center">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Payment Method
                    </h4>
                    <p className="text-sm text-gray-600 capitalize">
                      {formData.payment.method === 'card' && 'Credit/Debit Card'}
                      {formData.payment.method === 'upi' && 'UPI Payment'}
                      {formData.payment.method === 'cod' && 'Cash on Delivery'}
                    </p>
                  </div>

                  {/* Order Items */}
                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Order Items</h4>
                    <div className="space-y-3">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                          <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                          <div className="flex-1">
                            <h5 className="font-medium">{item.name}</h5>
                            <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">Rs. {(item.price * item.quantity).toLocaleString()}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary Sidebar */}
            <div className="w-80 bg-gray-50 p-6 border-l">
              <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span>Rs. {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `Rs. ${shipping}`}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (GST 18%)</span>
                  <span>Rs. {tax.toLocaleString()}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>Rs. {total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {shipping === 0 && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800 text-sm">
                    🎉 You qualify for free shipping!
                  </p>
                </div>
              )}

              <div className="flex items-center text-sm text-gray-600 mb-4">
                <Lock className="w-4 h-4 mr-2" />
                <span>Secure checkout powered by SSL encryption</span>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between p-6 border-t bg-gray-50">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back
            </button>
            
            {currentStep < 3 ? (
              <button
                onClick={nextStep}
                disabled={!validateStep(currentStep)}
                className="flex items-center px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
                <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Place Order
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
