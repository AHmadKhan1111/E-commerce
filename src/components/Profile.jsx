import React, { useState } from 'react';
import { X, User, Edit3, Save, MapPin, Phone, Mail, Package, Heart, ShoppingBag, Settings, LogOut, Camera } from 'lucide-react';

const Profile = ({ isOpen, onClose, user, onUpdateProfile, onLogout }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user || {});

  const handleSave = () => {
    if (onUpdateProfile) {
      onUpdateProfile(editedUser);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedUser(user || {});
    setIsEditing(false);
  };

  const mockOrders = [
    {
      id: 'ORD001',
      date: '2024-01-15',
      status: 'Delivered',
      total: 45000,
      items: [
        { name: 'Bridal Necklace Set', quantity: 1, price: 45000 }
      ]
    },
    {
      id: 'ORD002',
      date: '2024-01-10',
      status: 'Processing',
      total: 22000,
      items: [
        { name: 'Emerald Drop Earrings', quantity: 1, price: 22000 }
      ]
    },
    {
      id: 'ORD003',
      date: '2024-01-05',
      status: 'Shipped',
      total: 53500,
      items: [
        { name: 'Pearl Bracelet', quantity: 1, price: 18500 },
        { name: 'Ruby Ring', quantity: 1, price: 35000 }
      ]
    }
  ];

  if (!isOpen) return null;

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Processing': return 'bg-yellow-100 text-yellow-800';
      case 'Shipped': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      
      {/* Profile Panel */}
      <div className="absolute right-0 top-0 h-full w-full max-w-2xl bg-white shadow-xl">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <User className="w-5 h-5 mr-2" />
              My Account
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                      activeTab === tab.id
                        ? 'border-amber-500 text-amber-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                {/* Profile Picture */}
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                      {user?.avatar ? (
                        <img src={user.avatar} alt="Profile" className="w-24 h-24 rounded-full object-cover" />
                      ) : (
                        <User className="w-12 h-12 text-gray-400" />
                      )}
                    </div>
                    <button className="absolute bottom-0 right-0 p-2 bg-amber-600 text-white rounded-full hover:bg-amber-700 transition-colors">
                      <Camera className="w-4 h-4" />
                    </button>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {user?.name || 'Guest User'}
                    </h3>
                    <p className="text-gray-500">{user?.email || 'guest@example.com'}</p>
                    <p className="text-sm text-amber-600">Premium Member</p>
                  </div>
                </div>

                {/* Personal Information */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-medium text-gray-900">Personal Information</h4>
                    {!isEditing ? (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center space-x-2 text-amber-600 hover:text-amber-700"
                      >
                        <Edit3 className="w-4 h-4" />
                        <span>Edit</span>
                      </button>
                    ) : (
                      <div className="flex space-x-2">
                        <button
                          onClick={handleSave}
                          className="flex items-center space-x-2 bg-amber-600 text-white px-3 py-1 rounded-md hover:bg-amber-700"
                        >
                          <Save className="w-4 h-4" />
                          <span>Save</span>
                        </button>
                        <button
                          onClick={handleCancel}
                          className="flex items-center space-x-2 bg-gray-300 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-400"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editedUser.name || ''}
                          onChange={(e) => setEditedUser({...editedUser, name: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                      ) : (
                        <p className="text-gray-900">{user?.name || 'Not provided'}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      {isEditing ? (
                        <input
                          type="email"
                          value={editedUser.email || ''}
                          onChange={(e) => setEditedUser({...editedUser, email: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                      ) : (
                        <p className="text-gray-900 flex items-center">
                          <Mail className="w-4 h-4 mr-2 text-gray-400" />
                          {user?.email || 'Not provided'}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={editedUser.phone || ''}
                          onChange={(e) => setEditedUser({...editedUser, phone: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                      ) : (
                        <p className="text-gray-900 flex items-center">
                          <Phone className="w-4 h-4 mr-2 text-gray-400" />
                          {user?.phone || 'Not provided'}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                      {isEditing ? (
                        <textarea
                          value={editedUser.address || ''}
                          onChange={(e) => setEditedUser({...editedUser, address: e.target.value})}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                      ) : (
                        <p className="text-gray-900 flex items-start">
                          <MapPin className="w-4 h-4 mr-2 text-gray-400 mt-0.5" />
                          {user?.address || 'Not provided'}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="space-y-4">
                <h4 className="text-lg font-medium text-gray-900">Order History</h4>
                {mockOrders.map((order) => (
                  <div key={order.id} className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h5 className="font-medium text-gray-900">Order #{order.id}</h5>
                        <p className="text-sm text-gray-500">Placed on {new Date(order.date).toLocaleDateString()}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span>{item.name} × {item.quantity}</span>
                          <span>Rs. {item.price.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="border-t border-gray-200 pt-2">
                      <div className="flex justify-between font-medium">
                        <span>Total</span>
                        <span className="text-amber-600">Rs. {order.total.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Wishlist Tab */}
            {activeTab === 'wishlist' && (
              <div className="space-y-4">
                <h4 className="text-lg font-medium text-gray-900">My Wishlist</h4>
                <div className="text-center py-12 text-gray-500">
                  <Heart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg font-medium mb-2">Your wishlist is empty</p>
                  <p className="text-sm">Save your favorite jewelry pieces here!</p>
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h4 className="text-lg font-medium text-gray-900">Account Settings</h4>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <div>
                      <h5 className="font-medium text-gray-900">Email Notifications</h5>
                      <p className="text-sm text-gray-500">Receive updates about your orders</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <div>
                      <h5 className="font-medium text-gray-900">SMS Notifications</h5>
                      <p className="text-sm text-gray-500">Get text updates for deliveries</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <div>
                      <h5 className="font-medium text-gray-900">Marketing Emails</h5>
                      <p className="text-sm text-gray-500">Receive promotional offers and news</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
                    </label>
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    onClick={onLogout}
                    className="flex items-center space-x-2 text-red-600 hover:text-red-700 font-medium"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
