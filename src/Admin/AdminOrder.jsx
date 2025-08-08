import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminOrder() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/checkout");
        setOrders(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await fetch("http://localhost:5001/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await response.json();
        console.log(data.data.address);
        console.log(localStorage.getItem("token"));

        setUser(data.data);
      } catch (error) {
        console.error("Profile fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);
  console.log(user.fullName);
  

  const toggleOrderDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  if (loading)
    return (
      <p className="text-center text-lg text-gray-600">Loading orders...</p>
    );
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-extrabold mb-6 text-gray-800 border-b pb-2">
        📦 Customer Orders
      </h2>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="border border-gray-200 rounded-xl shadow-md transition hover:shadow-lg bg-white"
          >
            {/* Order Summary */}
            <div
              className="grid grid-cols-12 gap-4 p-5 cursor-pointer hover:bg-gray-50 transition"
              onClick={() => toggleOrderDetails(order._id)}
            >
              <div className="col-span-2">
                <p className="text-sm font-semibold text-gray-500">Order ID</p>
                <p className="text-sm break-words text-gray-800">{order._id}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm font-semibold text-gray-500">Customer</p>
                <p className="text-gray-800">{user.fullName}</p>
                <p className="text-xs text-gray-500">{order.customer?.phone}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-500">Type</p>
                <p className="text-gray-800">{order.orderType}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-500">Status</p>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                    order.status === "Confirmed"
                      ? "bg-green-100 text-green-700"
                      : order.status === "Cancelled"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {order.status}
                </span>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-500">Total</p>
                <p className="text-gray-800 font-medium">₹{order.total}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-500">Date</p>
                <p className="text-gray-800">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="col-span-2 flex items-center justify-end">
                <button className="text-sm text-blue-600 font-medium hover:underline transition">
                  {expandedOrder === order._id
                    ? "⬆ Hide Details"
                    : "⬇ View Details"}
                </button>
              </div>
            </div>

            {/* Expanded Order Details */}
            {expandedOrder === order._id && (
              <div className="px-6 py-4 bg-gray-50 border-t space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-800">
                  {/* Customer Information */}
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-700">
                      👤 Customer Details
                    </h3>
                    <div className="space-y-2">
                      <p>
                        <strong>Full Name:</strong>{" "}
                        {user.fullName}
                      </p>
                      <p>
                        <strong>Email:</strong>{" "}
                        {user.email || "Not provided"}
                      </p>
                      <p>
                        <strong>Phone:</strong>{" "}
                        {user.phone || "Not provided"}
                      </p>
                 
                      {user?.role === "admin" && (
                        <p>
                          <strong>Customer ID:</strong>{" "}
                          {order.customer?._id || "N/A"}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Delivery Information */}
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-700">
                      🚚 Delivery Info
                    </h3>
                    <div className="space-y-2">
                      <p>
                        <strong>Address:</strong> {order.deliveryAddress}
                      </p>
                      <p>
                        <strong>Days:</strong>{" "}
                        {order.deliverySchedule?.days?.join(", ")}
                      </p>
                      <p>
                        <strong>Pattern:</strong>{" "}
                        {order.deliverySchedule?.pattern}
                      </p>
                      <p>
                        <strong>Time Slot:</strong> {order.deliveryTimeSlot}
                      </p>
                      <p>
                        <strong>Instructions:</strong>{" "}
                        {order.specialInstructions || "None"}
                      </p>
                    </div>
                  </div>

                  {/* Payment Information */}
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-700">
                      💳 Payment
                    </h3>
                    <div className="space-y-2">
                      <p>
                        <strong>Method:</strong> {order.payment?.paymentMethod}
                      </p>
                      {order.payment?.paymentMethod === "Credit/Debit Card" && (
                        <>
                          <p>
                            <strong>Card:</strong> **** **** ****{" "}
                            {order.payment?.cardNumber?.slice(-4)}
                          </p>
                          <p>
                            <strong>Expiry:</strong> {order.payment?.expiryDate}
                          </p>
                          <p>
                            <strong>Name:</strong>{" "}
                            {order.payment?.cardholderName}
                          </p>
                        </>
                      )}
                      <p>
                        <strong>Subtotal:</strong> ₹{order.subtotal}
                      </p>
                      <p>
                        <strong>Discount:</strong> ₹{order.discount}
                      </p>
                      <p>
                        <strong>Total:</strong> ₹{order.total}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-700">
                    🧾 Order Items
                  </h3>
                  <div className="overflow-x-auto rounded-lg border border-gray-200">
                    <table className="min-w-full text-sm">
                      <thead className="bg-gray-100 text-left">
                        <tr>
                          <th className="px-4 py-2 border-b">Item</th>
                          <th className="px-4 py-2 border-b text-center">
                            Quantity
                          </th>
                          <th className="px-4 py-2 border-b text-center">
                            Unit Price
                          </th>
                          <th className="px-4 py-2 border-b text-center">
                            Total
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.items?.map((item, idx) => (
                          <tr key={idx} className="hover:bg-white border-t">
                            <td className="px-4 py-2">{item.name}</td>
                            <td className="px-4 py-2 text-center">
                              {item.quantity}
                            </td>
                            <td className="px-4 py-2 text-center">
                              ₹{item.price}
                            </td>
                            <td className="px-4 py-2 text-center">
                              ₹{item.price * item.quantity}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
