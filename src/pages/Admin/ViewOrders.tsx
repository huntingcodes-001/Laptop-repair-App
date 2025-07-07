import React, { useState, useEffect } from 'react';
import { Check, X, User } from 'lucide-react';
import { getAllOrders, updateOrder, getEmployees } from '../../lib/supabase';
import { Order, Employee } from '../../types';

const ViewOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEmployee, setSelectedEmployee] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [ordersData, employeesData] = await Promise.all([
        getAllOrders(),
        getEmployees()
      ]);
      setOrders(ordersData);
      setEmployees(employeesData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptOrder = async (orderId: string) => {
    const employeeId = selectedEmployee[orderId];
    if (!employeeId) {
      alert('Please select an employee first');
      return;
    }

    try {
      const employee = employees.find(e => e.id === employeeId);
      await updateOrder(orderId, {
        status: 'accepted',
        assigned_employee_id: employeeId,
        assigned_employee_name: employee?.name
      });
      loadData();
    } catch (error) {
      console.error('Error accepting order:', error);
    }
  };

  const handleRejectOrder = async (orderId: string) => {
    try {
      await updateOrder(orderId, { status: 'rejected' });
      loadData();
    } catch (error) {
      console.error('Error rejecting order:', error);
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

  const pendingOrders = orders.filter(order => order.status === 'pending');
  const inProgressOrders = orders.filter(order => order.status === 'accepted' || order.status === 'in_progress');
  const completedOrders = orders.filter(order => order.status === 'completed');

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      {/* Pending Orders */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Pending Orders ({pendingOrders.length})
        </h3>
        {pendingOrders.length === 0 ? (
          <p className="text-gray-500">No pending orders</p>
        ) : (
          <div className="space-y-4">
            {pendingOrders.map((order) => (
              <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">
                      {order.device_type} - {order.device_model}
                    </h4>
                    <p className="text-sm text-gray-600">Customer: {order.customer_name}</p>
                    <p className="text-sm text-gray-600">Problem: {order.problem}</p>
                    <p className="text-sm text-gray-600">Timeline: {order.expected_timeline}</p>
                    {order.quotation && (
                      <p className="text-sm text-gray-600">Expected: ${order.quotation}</p>
                    )}
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status.toUpperCase()}
                  </span>
                </div>
                
                <div className="flex items-center space-x-4">
                  <select
                    value={selectedEmployee[order.id] || ''}
                    onChange={(e) => setSelectedEmployee(prev => ({ ...prev, [order.id]: e.target.value }))}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Employee</option>
                    {employees.map(employee => (
                      <option key={employee.id} value={employee.id}>
                        {employee.name} ({employee.in_progress_orders} active)
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => handleAcceptOrder(order.id)}
                    className="flex items-center space-x-1 px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    <Check className="h-4 w-4" />
                    <span>Accept</span>
                  </button>
                  <button
                    onClick={() => handleRejectOrder(order.id)}
                    className="flex items-center space-x-1 px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    <X className="h-4 w-4" />
                    <span>Reject</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* In Progress Orders */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          In Progress Orders ({inProgressOrders.length})
        </h3>
        {inProgressOrders.length === 0 ? (
          <p className="text-gray-500">No orders in progress</p>
        ) : (
          <div className="space-y-4">
            {inProgressOrders.map((order) => (
              <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">
                      {order.device_type} - {order.device_model}
                    </h4>
                    <p className="text-sm text-gray-600">Customer: {order.customer_name}</p>
                    <p className="text-sm text-gray-600">Problem: {order.problem}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        Assigned to: {order.assigned_employee_name}
                      </span>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Completed Orders */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Completed Orders ({completedOrders.length})
        </h3>
        {completedOrders.length === 0 ? (
          <p className="text-gray-500">No completed orders</p>
        ) : (
          <div className="space-y-4">
            {completedOrders.map((order) => (
              <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">
                      {order.device_type} - {order.device_model}
                    </h4>
                    <p className="text-sm text-gray-600">Customer: {order.customer_name}</p>
                    <p className="text-sm text-gray-600">Problem: {order.problem}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        Completed by: {order.assigned_employee_name}
                      </span>
                    </div>
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
  );
};

export default ViewOrders;