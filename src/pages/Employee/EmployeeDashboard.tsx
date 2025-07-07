import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { CheckCircle, Clock, User } from 'lucide-react';
import { getOrdersByEmployee, updateOrder } from '../../lib/supabase';
import { Order } from '../../types';

const EmployeeDashboard: React.FC = () => {
  const { userProfile } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userProfile) {
      loadOrders();
    }
  }, [userProfile]);

  const loadOrders = async () => {
    if (!userProfile) return;
    
    try {
      const data = await getOrdersByEmployee(userProfile.id);
      setOrders(data);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteOrder = async (orderId: string) => {
    try {
      await updateOrder(orderId, { status: 'completed' });
      loadOrders();
    } catch (error) {
      console.error('Error completing order:', error);
    }
  };

  const handleStartOrder = async (orderId: string) => {
    try {
      await updateOrder(orderId, { status: 'in_progress' });
      loadOrders();
    } catch (error) {
      console.error('Error starting order:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-purple-100 text-purple-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const inProgressOrders = orders.filter(order => order.status === 'accepted' || order.status === 'in_progress');
  const completedOrders = orders.filter(order => order.status === 'completed');

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="bg-green-100 p-3 rounded-full">
              <User className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Employee Dashboard
              </h1>
              <p className="text-gray-600">Welcome back, {userProfile?.name}</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">In Progress</h3>
                <p className="text-2xl font-bold text-blue-600">{inProgressOrders.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Completed</h3>
                <p className="text-2xl font-bold text-green-600">{completedOrders.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-full">
                <User className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Total Orders</h3>
                <p className="text-2xl font-bold text-purple-600">{orders.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Orders In Progress */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Orders In Progress ({inProgressOrders.length})
          </h2>
          {inProgressOrders.length === 0 ? (
            <p className="text-gray-500">No orders in progress</p>
          ) : (
            <div className="space-y-4">
              {inProgressOrders.map((order) => (
                <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">
                        {order.device_type} - {order.device_model}
                      </h3>
                      <p className="text-sm text-gray-600">Customer: {order.customer_name}</p>
                      <p className="text-sm text-gray-600">Model: {order.model_number}</p>
                      <p className="text-sm text-gray-600">Problem: {order.problem}</p>
                      <p className="text-sm text-gray-600">Timeline: {order.expected_timeline}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    {order.status === 'accepted' && (
                      <button
                        onClick={() => handleStartOrder(order.id)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                      >
                        Start Work
                      </button>
                    )}
                    {order.status === 'in_progress' && (
                      <button
                        onClick={() => handleCompleteOrder(order.id)}
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                      >
                        Mark Complete
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Completed Orders */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Completed Orders ({completedOrders.length})
          </h2>
          {completedOrders.length === 0 ? (
            <p className="text-gray-500">No completed orders</p>
          ) : (
            <div className="space-y-4">
              {completedOrders.map((order) => (
                <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">
                        {order.device_type} - {order.device_model}
                      </h3>
                      <p className="text-sm text-gray-600">Customer: {order.customer_name}</p>
                      <p className="text-sm text-gray-600">Problem: {order.problem}</p>
                      <p className="text-sm text-gray-500">
                        Completed on {new Date(order.updated_at).toLocaleDateString()}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;