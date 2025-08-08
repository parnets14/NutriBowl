import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaCreditCard,
  FaPaypal,
  FaGooglePay,
  FaApplePay,
  FaMapMarkerAlt,
  FaClock,
  FaCalendarAlt,
  FaCheck,
  FaCheckCircle,
  FaBox,
  FaTruck,
  FaEye,
  FaUser,
  FaPhone,
} from "react-icons/fa";
import { useCart } from "../hooks/useCart";
// import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {
  const { cartItems, getCartTotal, clearCart } = useCart();
  // const { user } = useAuth();
  const navigate = useNavigate();

  const [orderDetails, setOrderDetails] = useState({
    orderType: "One-time Order",
    selectedMeals: ["lunch", "dinner"],
    deliverySchedule: {
      days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      pattern: "Weekdays",
    },
    deliveryTimeSlot: "12:00-14:00",
    deliveryAddress: "",
    specialInstructions: "",
  });

  const [paymentMethod, setPaymentMethod] = useState({
    paymentMethod: "Credit/Debit Card",
    cardholderName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [error, setError] = useState(null);
  // const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    // if (!user) {
    //   navigate("/auth/login");
    //   return;
    // }
    if (cartItems.length === 0) {
      // navigate("/menu");
      return;
    }
  }, [cartItems, navigate]);

  const calculateTotal = () => {
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const discount =
      orderDetails.orderType === "Subscription Plan" ? subtotal * 0.1 : 0;
    const deliveryFee = orderDetails.orderType === "Subscription Plan" ? 0 : 50;
    const tax = Math.round(subtotal * 0.05);
    const total = subtotal + deliveryFee + tax - discount;

    return { subtotal, discount, deliveryFee, tax, total };
  };

  const { subtotal, discount, deliveryFee, tax, total } = calculateTotal();

  // Add this validation check before submitting
  const validateForm = () => {
    if (!orderDetails.deliveryAddress) {
      setError("Delivery address is required");
      return false;
    }

    if (orderDetails.selectedMeals.length === 0) {
      setError("Please select at least one meal");
      return false;
    }

    if (paymentMethod.paymentMethod === "Credit/Debit Card") {
      if (
        !paymentMethod.cardholderName ||
        !paymentMethod.cardNumber ||
        !paymentMethod.expiryDate ||
        !paymentMethod.cvv
      ) {
        setError("All card details are required");
        return false;
      }

      // Simple card validation
      if (paymentMethod.cardNumber.replace(/\s/g, "").length < 16) {
        setError("Please enter a valid card number");
        return false;
      }
    }

    return true;
  };

 const handlePlaceOrder = async () => {
  if (!validateForm()) return;
  
  setIsProcessing(true);
  setError(null);

  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Please login to complete your order");
    }

    let userData = { };
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") {
      try {
        userData = JSON.parse(storedUser);
        
      } catch (e) {
        console.warn("Could not parse user data, using defaults", e);
      }
    }

    const payload = {
      orderType: orderDetails.orderType,
      selectedMeals: orderDetails.selectedMeals,
      deliverySchedule: orderDetails.deliverySchedule,
      deliveryTimeSlot: orderDetails.deliveryTimeSlot,
      deliveryAddress: orderDetails.deliveryAddress,
      specialInstructions: orderDetails.specialInstructions || undefined,
      items: cartItems.map(item => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      payment: {
        paymentMethod: paymentMethod.paymentMethod, // Fixed field name
        ...(paymentMethod.paymentMethod === "Credit/Debit Card" && {
          cardholderName: paymentMethod.cardholderName,
          cardNumber: paymentMethod.cardNumber.replace(/\s/g, ""),
          expiryDate: paymentMethod.expiryDate,
          cvv: paymentMethod.cvv,
        }),
      },
      customer: {
        name: userData.name,
        email: userData.email,
        phone: userData.phone || undefined,
      },
      subtotal: subtotal,
      discount: discount,
      total: total,
    };

    console.log("Submitting payload:", payload); // For debugging

    const response = await fetch("http://localhost:5001/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || "Failed to place order");
    }

    setOrderId(data.orderId);
    clearCart();
    setOrderPlaced(true);
    setShowSuccessModal(true);
    // navigate("/ordersuccess");

  } catch (err) {
    console.error("Checkout error:", err);
    setError(err.message || "Failed to place order. Please try again.");
  } finally {
    setIsProcessing(false);
  }
};

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    return parts.length ? parts.join(" ") : value;
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/[^0-9]/g, "");
    if (v.length >= 3) {
      return `${v.slice(0, 2)}/${v.slice(2)}`;
    }
    return value;
  };

  const weekDays = [
    { id: "Mon", label: "Mon" },
    { id: "Tue", label: "Tue" },
    { id: "Wed", label: "Wed" },
    { id: "Thu", label: "Thu" },
    { id: "Fri", label: "Fri" },
    { id: "Sat", label: "Sat" },
    { id: "Sun", label: "Sun" },
  ];

  const paymentMethods = [
    {
      id: "Credit/Debit Card",
      label: "Credit/Debit Card",
      icon: <FaCreditCard />,
    },
    { id: "PayPal", label: "PayPal", icon: <FaPaypal /> },
    { id: "Google Pay", label: "Google Pay", icon: <FaGooglePay /> },
    { id: "Apple Pay", label: "Apple Pay", icon: <FaApplePay /> },
  ];

  const deliveryPatterns = [
    { id: "Weekdays", label: "Weekdays (Mon-Fri)" },
    { id: "All Days", label: "All Days" },
    { id: "M-W-F", label: "Mon-Wed-Fri" },
    { id: "Custom", label: "Custom Days" },
  ];

  const timeSlots = [
    { id: "08:00-10:00", label: "8:00 AM - 10:00 AM" },
    { id: "12:00-14:00", label: "12:00 PM - 2:00 PM" },
    { id: "18:00-20:00", label: "6:00 PM - 8:00 PM" },
  ];
  // console.log(localStorage.getItem("token",token));

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl overflow-hidden"
          >
            {/* Success Header */}
            <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-8 text-center">
              <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCheck className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold mb-2">
                Order Placed Successfully!
              </h1>
              <p className="text-green-100 text-lg">
                Your{" "}
                {orderDetails.orderType === "Subscription Plan"
                  ? "subscription"
                  : "order"}{" "}
                has been confirmed
              </p>
            </div>

            <div className="p-8">
              {/* Order Summary */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Order Information */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Order Information
                  </h2>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Order ID:</span>
                      <span className="font-medium text-gray-900">
                        {/* #{orderId || data.order._id} */}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        <FaCheckCircle className="mr-1" />
                        {"Confirmed"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Order Type:</span>
                      <span className="font-medium text-gray-900">
                        {orderDetails.orderType}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Order Date:</span>
                      <span className="font-medium text-gray-900">
                        {new Date().toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        <FaCheckCircle className="mr-1" />
                        Confirmed
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Payment Method:</span>
                      <span className="font-medium text-gray-900">
                        {paymentMethod.paymentMethod}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Delivery Information */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Delivery Information
                  </h2>
                  <div className="space-y-3">
                    <div>
                      <span className="text-gray-600 block">
                        Selected Meals:
                      </span>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {orderDetails.selectedMeals.map((meal) => (
                          <span
                            key={meal}
                            className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded-full capitalize"
                          >
                            {meal}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-600 block">
                        Delivery Days:
                      </span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {orderDetails.deliverySchedule.days.map((day) => (
                          <span
                            key={day}
                            className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded capitalize"
                          >
                            {day}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Time Slot:</span>
                      <span className="font-medium text-gray-900">
                        {orderDetails.deliveryTimeSlot}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Next Delivery:</span>
                      <span className="font-medium text-gray-900">
                        {new Date(
                          Date.now() + 24 * 60 * 60 * 1000
                        ).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Items Ordered */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Items Ordered
                </h2>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="space-y-3">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-3">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                          <div>
                            <h4 className="font-medium text-gray-900">
                              {item.name}
                            </h4>
                            <p className="text-sm text-gray-600">
                              Qty: {item.quantity}
                            </p>
                          </div>
                        </div>
                        <span className="font-medium text-gray-900">
                          ₹{item.price * item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  <FaMapMarkerAlt className="inline mr-2" />
                  Delivery Address
                </h2>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-900">
                    {orderDetails.deliveryAddress}
                  </p>
                  {orderDetails.specialInstructions && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <span className="text-sm font-medium text-gray-600">
                        Special Instructions:
                      </span>
                      <p className="text-sm text-gray-900 mt-1">
                        {orderDetails.specialInstructions}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Cost Breakdown */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Payment Summary
                </h2>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="text-gray-900">₹{subtotal}</span>
                    </div>
                    {deliveryFee > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Delivery Fee:</span>
                        <span className="text-gray-900">₹{deliveryFee}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax (5%):</span>
                      <span className="text-gray-900">₹{tax}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Subscription Discount (10%):</span>
                        <span>-₹{discount}</span>
                      </div>
                    )}
                    <div className="border-t border-gray-300 pt-2 mt-2">
                      <div className="flex justify-between font-semibold text-lg">
                        <span className="text-gray-900">Total Paid:</span>
                        <span className="text-green-600">₹{total}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Next Steps */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  What's Next?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4 text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <FaCheckCircle className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-blue-900 mb-2">
                      Order Confirmed
                    </h3>
                    <p className="text-sm text-blue-700">
                      Your order has been received and confirmed
                    </p>
                  </div>
                  <div className="bg-yellow-50 rounded-lg p-4 text-center">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <FaBox className="w-6 h-6 text-yellow-600" />
                    </div>
                    <h3 className="font-semibold text-yellow-900 mb-2">
                      Preparing
                    </h3>
                    <p className="text-sm text-yellow-700">
                      Our kitchen will start preparing your meals
                    </p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <FaTruck className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-green-900 mb-2">
                      Delivery
                    </h3>
                    <p className="text-sm text-green-700">
                      Fresh meals delivered to your door
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                {/* <button
                  onClick={() => navigate("/orders")}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center space-x-2"
                >
                  <FaEye />
                  <span>Track Your Order</span>
                </button> */}
                <button
                  // onClick={() => navigate("/menu")}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center space-x-2"
                >
                  <span>Continue Shopping</span>
                </button>
                <button
                  onClick={() => navigate("/profile")}
                  className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-800 font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center space-x-2"
                >
                  <FaUser />
                  <span>View Profile</span>
                </button>
              </div>

              {/* Support Contact */}
              <div className="mt-8 text-center">
                <p className="text-gray-600 text-sm mb-2">
                  Need help with your order?
                </p>
                <button className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center justify-center space-x-2 mx-auto">
                  <FaPhone />
                  <span>Contact Support: +91-XXXX-XXXX-XX</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (!localStorage.getItem("token") || cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-700">
                    Order Error
                  </h3>
                  <div className="mt-2 text-sm text-red-700">
                    {error.split("\n").map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Configuration */}
            <div className="lg:col-span-2 space-y-6">
              {/* Order Type */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Order Type
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      orderDetails.orderType === "One-time Order"
                        ? "border-green-500 bg-green-50"
                        : "border-gray-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="orderType"
                      value="One-time Order"
                      checked={orderDetails.orderType === "One-time Order"}
                      onChange={(e) =>
                        setOrderDetails((prev) => ({
                          ...prev,
                          orderType: e.target.value,
                        }))
                      }
                      className="sr-only"
                    />
                    <div className="text-center">
                      <h4 className="font-semibold text-gray-900">
                        One-time Order
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Order once, delivered as scheduled
                      </p>
                    </div>
                  </label>

                  <label
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      orderDetails.orderType === "Subscription Plan"
                        ? "border-green-500 bg-green-50"
                        : "border-gray-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="orderType"
                      value="Subscription Plan"
                      checked={orderDetails.orderType === "Subscription Plan"}
                      onChange={(e) =>
                        setOrderDetails((prev) => ({
                          ...prev,
                          orderType: e.target.value,
                        }))
                      }
                      className="sr-only"
                    />
                    <div className="text-center">
                      <h4 className="font-semibold text-gray-900">
                        Subscription Plan
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Recurring delivery with 10% discount
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Meal Selection */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Select Meals
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {["breakfast", "lunch", "dinner"].map((meal) => (
                    <label
                      key={meal}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        orderDetails.selectedMeals.includes(meal)
                          ? "border-green-500 bg-green-50"
                          : "border-gray-200"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={orderDetails.selectedMeals.includes(meal)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setOrderDetails((prev) => ({
                              ...prev,
                              selectedMeals: [...prev.selectedMeals, meal],
                            }));
                          } else {
                            setOrderDetails((prev) => ({
                              ...prev,
                              selectedMeals: prev.selectedMeals.filter(
                                (m) => m !== meal
                              ),
                            }));
                          }
                        }}
                        className="sr-only"
                      />
                      <div className="text-center">
                        <h4 className="font-semibold text-gray-900 capitalize">
                          {meal}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {meal === "breakfast" && "7:00 AM - 10:00 AM"}
                          {meal === "lunch" && "12:00 PM - 2:00 PM"}
                          {meal === "dinner" && "7:00 PM - 9:00 PM"}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Delivery Schedule */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  <FaCalendarAlt className="inline mr-2" />
                  Delivery Schedule
                </h3>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Delivery Pattern
                  </label>
                  <select
                    value={orderDetails.deliverySchedule.pattern}
                    onChange={(e) => {
                      let days = [];
                      if (e.target.value === "Weekdays") {
                        days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
                      } else if (e.target.value === "All Days") {
                        days = [
                          "Mon",
                          "Tue",
                          "Wed",
                          "Thu",
                          "Fri",
                          "Sat",
                          "Sun",
                        ];
                      } else if (e.target.value === "M-W-F") {
                        days = ["Mon", "Wed", "Fri"];
                      }

                      setOrderDetails((prev) => ({
                        ...prev,
                        deliverySchedule: {
                          pattern: e.target.value,
                          days:
                            e.target.value === "Custom"
                              ? prev.deliverySchedule.days
                              : days,
                        },
                      }));
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    {deliveryPatterns.map((pattern) => (
                      <option key={pattern.id} value={pattern.id}>
                        {pattern.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
                  {weekDays.map((day) => (
                    <label
                      key={day.id}
                      className={`border-2 rounded-lg p-3 cursor-pointer transition-all text-center ${
                        orderDetails.deliverySchedule.days.includes(day.id)
                          ? "border-green-500 bg-green-50"
                          : "border-gray-200"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={orderDetails.deliverySchedule.days.includes(
                          day.id
                        )}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setOrderDetails((prev) => ({
                              ...prev,
                              deliverySchedule: {
                                ...prev.deliverySchedule,
                                pattern: "Custom",
                                days: [...prev.deliverySchedule.days, day.id],
                              },
                            }));
                          } else {
                            setOrderDetails((prev) => ({
                              ...prev,
                              deliverySchedule: {
                                ...prev.deliverySchedule,
                                pattern: "Custom",
                                days: prev.deliverySchedule.days.filter(
                                  (d) => d !== day.id
                                ),
                              },
                            }));
                          }
                        }}
                        className="sr-only"
                      />
                      <div className="text-sm font-medium">{day.label}</div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Delivery Details */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  <FaMapMarkerAlt className="inline mr-2" />
                  Delivery Details
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FaClock className="inline mr-2" />
                      Delivery Time Slot
                    </label>
                    <select
                      value={orderDetails.deliveryTimeSlot}
                      onChange={(e) =>
                        setOrderDetails((prev) => ({
                          ...prev,
                          deliveryTimeSlot: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
                      {timeSlots.map((slot) => (
                        <option key={slot.id} value={slot.id}>
                          {slot.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Delivery Address
                    </label>
                    <textarea
                      value={orderDetails.deliveryAddress}
                      onChange={(e) =>
                        setOrderDetails((prev) => ({
                          ...prev,
                          deliveryAddress: e.target.value,
                        }))
                      }
                      placeholder="Enter your complete delivery address"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      rows={3}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Special Instructions (Optional)
                    </label>
                    <textarea
                      value={orderDetails.specialInstructions}
                      onChange={(e) =>
                        setOrderDetails((prev) => ({
                          ...prev,
                          specialInstructions: e.target.value,
                        }))
                      }
                      placeholder="Any special delivery instructions or dietary notes"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      rows={2}
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Payment Method
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {paymentMethods.map((method) => (
                    <label
                      key={method.id}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        paymentMethod.paymentMethod === method.id
                          ? "border-green-500 bg-green-50"
                          : "border-gray-200"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.id}
                        checked={paymentMethod.paymentMethod === method.id}
                        onChange={(e) =>
                          setPaymentMethod((prev) => ({
                            ...prev,
                            paymentMethod: e.target.value,
                          }))
                        }
                        className="sr-only"
                      />
                      <div className="text-center">
                        <div className="text-2xl mb-2">{method.icon}</div>
                        <div className="text-sm font-medium">
                          {method.label}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>

                {paymentMethod.paymentMethod === "Credit/Debit Card" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        value={paymentMethod.cardholderName}
                        onChange={(e) =>
                          setPaymentMethod((prev) => ({
                            ...prev,
                            cardholderName: e.target.value,
                          }))
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Card Number
                      </label>
                      <input
                        type="text"
                        value={formatCardNumber(paymentMethod.cardNumber)}
                        onChange={(e) =>
                          setPaymentMethod((prev) => ({
                            ...prev,
                            cardNumber: e.target.value,
                          }))
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        value={formatExpiryDate(paymentMethod.expiryDate)}
                        onChange={(e) =>
                          setPaymentMethod((prev) => ({
                            ...prev,
                            expiryDate: e.target.value,
                          }))
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="MM/YY"
                        maxLength={5}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        value={paymentMethod.cvv}
                        onChange={(e) =>
                          setPaymentMethod((prev) => ({
                            ...prev,
                            cvv: e.target.value,
                          }))
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="123"
                        required
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Order Summary
                </h3>

                {/* Cart Items */}
                <div className="space-y-3 mb-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center"
                    >
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {item.name}
                        </h4>
                        <p className="text-sm text-gray-600">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <span className="font-medium">
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Order Configuration Summary */}
                <div className="border-t pt-4 mb-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Order Type:</span>
                      <span>{orderDetails.orderType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Meals:</span>
                      <span className="capitalize">
                        {orderDetails.selectedMeals.join(", ")}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Days:</span>
                      <span>
                        {orderDetails.deliverySchedule.days.length} days/week
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Pattern:</span>
                      <span>{orderDetails.deliverySchedule.pattern}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Time Slot:</span>
                      <span>{orderDetails.deliveryTimeSlot}</span>
                    </div>
                  </div>
                </div>

                {/* Cost Breakdown */}
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  {deliveryFee > 0 && (
                    <div className="flex justify-between">
                      <span>Delivery Fee</span>
                      <span>₹{deliveryFee}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Tax (5%)</span>
                    <span>₹{tax}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Subscription Discount (10%)</span>
                      <span>-₹{discount}</span>
                    </div>
                  )}
                  <div className="border-t pt-2">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>₹{total}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  disabled={
                    isProcessing ||
                    !orderDetails.deliveryAddress ||
                    orderDetails.selectedMeals.length === 0 || // Changed from Object.values(orderDetails.meals)
                    (paymentMethod.paymentMethod === "Credit/Debit Card" &&
                      (!paymentMethod.cardholderName ||
                        !paymentMethod.cardNumber ||
                        !paymentMethod.expiryDate ||
                        !paymentMethod.cvv))
                  }
                  className="w-full mt-6 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-4 px-6 rounded-lg transition duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:transform-none disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    `Place ${
                      orderDetails.orderType === "Subscription Plan"
                        ? "Subscription"
                        : "Order"
                    } (₹${total})`
                  )}
                </button>

                {/* Security Info */}
                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-500">
                    <svg
                      className="inline-block w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      ></path>
                    </svg>
                    Secure payment processing
                  </p>
                </div>
              </div>

              {/* Need Help Section */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Need Help?
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Our customer support team is available 24/7 to assist you with
                  your order.
                </p>
                <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center justify-center space-x-2">
                  <FaPhone />
                  <span>Contact Support</span>
                </button>
              </div>

              {/* Satisfaction Guarantee */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <FaCheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-semibold text-green-800 mb-1">
                      Satisfaction Guaranteed
                    </h3>
                    <p className="text-sm text-green-700">
                      If you're not completely satisfied with your meal, we'll
                      make it right or refund your money.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      {/* {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl overflow-hidden w-full max-w-md"
          >
            <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6 text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCheck className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold mb-2">Order Confirmed!</h1>
              <p className="text-green-100">
                Your{" "}
                {orderDetails.orderType === "Subscription Plan"
                  ? "subscription"
                  : "order"}{" "}
                has been placed
              </p>
            </div>

            <div className="p-6">
              <div className="text-center mb-6">
                <p className="text-gray-700 mb-4">
                  Order ID: <span className="font-semibold">#{orderId}</span>
                </p>
                <p className="text-gray-600">
                  We've sent confirmation details to your email
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    setShowSuccessModal(false);
                    navigate("/orders");
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition"
                >
                  Track Order
                </button>
                <button
                  onClick={() => {
                    setShowSuccessModal(false);
                    navigate("/menu");
                  }}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg transition"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )} */}
    </div>
  );
}
