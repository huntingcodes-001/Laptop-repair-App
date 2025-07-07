import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Plus, History, User, Phone, MapPin, Mail } from 'lucide-react';
import { getOrdersByCustomer } from '../../lib/supabase';
import { Order } from '../../types';
import PlaceOrderModal from './PlaceOrderModal';
import OrderHistoryModal from './OrderHistoryModal';

const CustomerDashboard: React.FC = () => {
  const { userProfile } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPlaceOrder, setShowPlaceOrder] = useState(false);
  const [showOrderHistory, setShowOrderHistory] = useState(false);

  useEffect(() => {
    loadOrders();
  }, [userProfile]);

  const loadOrders = async () => {
    if (!userProfile) return;
    
    try {
      const data = await getOrdersByCustomer(userProfile.id);
      setOrders(data);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-purple-100 text-purple-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const recentOrders = orders.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <User className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Welcome, {userProfile?.name}!
                </h1>
                <p className="text-gray-600">Manage your repair orders and track progress</p>
              </div>
            </div>
            
            <div className="mt-4 md:mt-0 flex space-x-4">
              <button
                onClick={() => setShowPlaceOrder(true)}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Place Order</span>
              </button>
              <button
                onClick={() => setShowOrderHistory(true)}
                className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <History className="h-4 w-4" />
                <span>Order History</span>
              </button>
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Profile Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-gray-400" />
              <span className="text-gray-700">{userProfile?.email}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-gray-400" />
              <span className="text-gray-700">{userProfile?.phone}</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-gray-400" />
              <span className="text-gray-700">
                {userProfile?.address}, {userProfile?.city} - {userProfile?.pincode}
              </span>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Orders</h2>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : recentOrders.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No orders yet. Place your first order!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {order.device_type} - {order.device_model}
                      </h3>
                      <p className="text-sm text-gray-600">{order.problem}</p>
                      <p className="text-sm text-gray-500">
                        Expected: {order.expected_timeline}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                  <div className="mt-2 text-sm text-gray-500">
                    Ordered on {new Date(order.created_at).toLocaleDateString()}
                  </div>
                </div>
              ))}
              {orders.length > 3 && (
                <button
                  onClick={() => setShowOrderHistory(true)}
                  className="w-full text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  View all {orders.length} orders
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {showPlaceOrder && (
        <PlaceOrderModal
          onClose={() => setShowPlaceOrder(false)}
          onOrderPlaced={() => {
            loadOrders();
            setShowPlaceOrder(false);
          }}
        />
      )}

      {showOrderHistory && (
        <OrderHistoryModal
          orders={orders}
          onClose={() => setShowOrderHistory(false)}
        />
      )}
    </div>
  );
};

export default CustomerDashboard;