

import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminOrder() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/checkout');
        setOrders(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p className="text-center">Loading orders...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Customer Orders</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-200 rounded-lg shadow-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">#</th>
              <th className="px-4 py-2 border">Customer Name</th>
              <th className="px-4 py-2 border">Order Type</th>
              <th className="px-4 py-2 border">Meals</th>
              <th className="px-4 py-2 border">Delivery Days</th>
              <th className="px-4 py-2 border">Time Slot</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Total</th>
              <th className="px-4 py-2 border">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order.id} className="text-center">
                <td className="px-4 py-2 border">{index + 1}</td>
                <td className="px-4 py-2 border">{order.customerName}</td>
                <td className="px-4 py-2 border">{order.orderType}</td>
                <td className="px-4 py-2 border">{order.selectedMeals.join(', ')}</td>
                <td className="px-4 py-2 border">{order.deliveryDays.join(', ')}</td>
                <td className="px-4 py-2 border">{order.deliveryTimeSlot}</td>
                <td className="px-4 py-2 border">{order.status}</td>
                <td className="px-4 py-2 border">₹{order.total}</td>
                <td className="px-4 py-2 border">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
