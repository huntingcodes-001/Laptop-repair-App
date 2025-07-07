import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { createOrder } from '../../lib/supabase';

interface PlaceOrderModalProps {
  onClose: () => void;
  onOrderPlaced: () => void;
}

const PlaceOrderModal: React.FC<PlaceOrderModalProps> = ({ onClose, onOrderPlaced }) => {
  const { userProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    device_type: '',
    device_model: '',
    model_number: '',
    problem: '',
    expected_timeline: '',
    quotation: '',
  });

  const deviceTypes = [
    'Mobile', 'Laptop', 'Gaming Console', 'PlayStation', 'Xbox',
    'Smart TV', 'Tablet', 'Headphones', 'Smartwatches', 'Desktop'
  ];

  const problems = [
    'Broken Screen', 'Battery Issue', 'Charging Issue', 'Software Issue',
    'Overheating', 'No Display', 'Other', 'Not Sure'
  ];

  const timelines = [
    '2-3 days', '3-4 days', '1 week', 'Flexible'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userProfile) return;

    setLoading(true);
    setError('');

    try {
      const orderData = {
        customer_id: userProfile.id,
        customer_name: userProfile.name,
        device_type: formData.device_type,
        device_model: formData.device_model,
        model_number: formData.model_number,
        problem: formData.problem,
        expected_timeline: formData.expected_timeline,
        status: 'pending',
        ...(formData.quotation && { quotation: parseFloat(formData.quotation) }),
      };

      await createOrder(orderData);
      onOrderPlaced();
    } catch (err: any) {
      setError(err.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Place New Order</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="device_type" className="block text-sm font-medium text-gray-700">
              Device Type *
            </label>
            <select
              id="device_type"
              name="device_type"
              required
              value={formData.device_type}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select device type</option>
              {deviceTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="device_model" className="block text-sm font-medium text-gray-700">
              Device Model *
            </label>
            <input
              id="device_model"
              name="device_model"
              type="text"
              required
              value={formData.device_model}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., iPhone 12, MacBook Pro"
            />
          </div>

          <div>
            <label htmlFor="model_number" className="block text-sm font-medium text-gray-700">
              Model Number *
            </label>
            <input
              id="model_number"
              name="model_number"
              type="text"
              required
              value={formData.model_number}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., A2172, MXK32LL/A"
            />
          </div>

          <div>
            <label htmlFor="problem" className="block text-sm font-medium text-gray-700">
              Problem *
            </label>
            <select
              id="problem"
              name="problem"
              required
              value={formData.problem}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select problem</option>
              {problems.map(problem => (
                <option key={problem} value={problem}>{problem}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="expected_timeline" className="block text-sm font-medium text-gray-700">
              Expected Timeline *
            </label>
            <select
              id="expected_timeline"
              name="expected_timeline"
              required
              value={formData.expected_timeline}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select timeline</option>
              {timelines.map(timeline => (
                <option key={timeline} value={timeline}>{timeline}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="quotation" className="block text-sm font-medium text-gray-700">
              Expected Quotation (Optional)
            </label>
            <input
              id="quotation"
              name="quotation"
              type="number"
              min="0"
              step="0.01"
              value={formData.quotation}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="$0.00"
            />
          </div>

          <div className="flex space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Placing...' : 'Place Order'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlaceOrderModal;