"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
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
} from "react-icons/fa"
import { useCart } from "../hooks/useCart"
import { useAuth } from "../hooks/useAuth"
import { useNavigate } from "react-router-dom"

export default function CheckoutPage() {
  const { cartItems, getCartTotal, clearCart } = useCart()
  const { user } = useAuth()
  const navigate= useNavigate()

  const [orderDetails, setOrderDetails] = useState({
    orderType: "one-time",
    subscriptionType: "weekly",
    meals: { breakfast: false, lunch: true, dinner: true },
    deliverySchedule: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    deliveryTime: "12:00-14:00",
    deliveryAddress: "",
    specialInstructions: "",
  })

  const [paymentMethod, setPaymentMethod] = useState("card")
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)

  useEffect(() => {
    if (!user) {
      navigate("/auth/login")
      return
    }
    if (cartItems.length === 0) {
      navigate("/menu")
      return
    }
  }, [user, cartItems, navigate])

  const calculateSubscriptionCost = () => {
    const baseTotal = getCartTotal()
    const mealCount = Object.values(orderDetails.meals).filter((v) => v).length
    const daysCount = orderDetails.deliverySchedule.length
    let multiplier = 1
    if (orderDetails.orderType === "subscription") {
      multiplier = orderDetails.subscriptionType === "weekly"
        ? daysCount * 4
        : daysCount * 4 * 3
    }
    return baseTotal * mealCount * multiplier
  }

  const deliveryFee = orderDetails.orderType === "subscription" ? 0 : 50
  const subtotal = calculateSubscriptionCost()
  const tax = Math.round(subtotal * 0.05)
  const discount = orderDetails.orderType === "subscription" ? Math.round(subtotal * 0.1) : 0
  const total = subtotal + deliveryFee + tax - discount

  const handlePlaceOrder = async () => {
    setIsProcessing(true)
    await new Promise((r) => setTimeout(r, 3000))

    const order = {
      id: `ORD-${Date.now()}`,
      userId: user?.id,
      items: cartItems,
      orderDetails,
      paymentMethod,
      subtotal,
      deliveryFee,
      tax,
      discount,
      total,
      status: "confirmed",
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    }

    const existing = JSON.parse(localStorage.getItem("nutribowl_orders") || "[]")
    existing.push(order)
    localStorage.setItem("nutribowl_orders", JSON.stringify(existing))

    clearCart()
    setOrderPlaced(true)
    setIsProcessing(false)
  }

  const weekDays = [
    { id: "monday", label: "Monday" },
    { id: "tuesday", label: "Tuesday" },
    { id: "wednesday", label: "Wednesday" },
    { id: "thursday", label: "Thursday" },
    { id: "friday", label: "Friday" },
    { id: "saturday", label: "Saturday" },
    { id: "sunday", label: "Sunday" },
  ]

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
              <h1 className="text-3xl font-bold mb-2">Order Placed Successfully!</h1>
              <p className="text-green-100 text-lg">
                Your {orderDetails.orderType === "subscription" ? "subscription" : "order"} has been confirmed
              </p>
            </div>

            <div className="p-8">
              {/* Order Summary */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Order Information */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Information</h2>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Order ID:</span>
                      <span className="font-medium text-gray-900">#{Date.now().toString().slice(-8)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Order Type:</span>
                      <span className="font-medium text-gray-900 capitalize">
                        {orderDetails.orderType}
                        {orderDetails.orderType === "subscription" && ` (${orderDetails.subscriptionType})`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Order Date:</span>
                      <span className="font-medium text-gray-900">{new Date().toLocaleDateString()}</span>
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
                      <span className="font-medium text-gray-900 capitalize">{paymentMethod}</span>
                    </div>
                  </div>
                </div>

                {/* Delivery Information */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Delivery Information</h2>
                  <div className="space-y-3">
                    <div>
                      <span className="text-gray-600 block">Selected Meals:</span>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {Object.entries(orderDetails.meals)
                          .filter(([_, selected]) => selected)
                          .map(([meal]) => (
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
                      <span className="text-gray-600 block">Delivery Days:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {orderDetails.deliverySchedule.map((day) => (
                          <span key={day} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded capitalize">
                            {day.slice(0, 3)}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Time Slot:</span>
                      <span className="font-medium text-gray-900">{orderDetails.deliveryTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Next Delivery:</span>
                      <span className="font-medium text-gray-900">
                        {new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Items Ordered */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Items Ordered</h2>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="space-y-3">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                          <div>
                            <h4 className="font-medium text-gray-900">{item.name}</h4>
                            <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <span className="font-medium text-gray-900">₹{item.price * item.quantity}</span>
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
                  <p className="text-gray-900">{orderDetails.deliveryAddress}</p>
                  {orderDetails.specialInstructions && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <span className="text-sm font-medium text-gray-600">Special Instructions:</span>
                      <p className="text-sm text-gray-900 mt-1">{orderDetails.specialInstructions}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Cost Breakdown */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Summary</h2>
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
                <h2 className="text-xl font-semibold text-gray-900 mb-4">What's Next?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4 text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <FaCheckCircle className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-blue-900 mb-2">Order Confirmed</h3>
                    <p className="text-sm text-blue-700">Your order has been received and confirmed</p>
                  </div>
                  <div className="bg-yellow-50 rounded-lg p-4 text-center">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <FaBox className="w-6 h-6 text-yellow-600" />
                    </div>
                    <h3 className="font-semibold text-yellow-900 mb-2">Preparing</h3>
                    <p className="text-sm text-yellow-700">Our kitchen will start preparing your meals</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <FaTruck className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-green-900 mb-2">Delivery</h3>
                    <p className="text-sm text-green-700">Fresh meals delivered to your door</p>
                  </div>
                </div>
              </div>

              {/* Notifications Info */}
              <div className="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">📱 Stay Updated</h3>
                <p className="text-blue-800 text-sm mb-3">You'll receive notifications about your order status via:</p>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Email updates at {user?.email}</li>
                  <li>• SMS notifications {user?.phone && `at ${user.phone}`}</li>
                  <li>• In-app notifications when you're logged in</li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate("/orders")}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center space-x-2"
                >
                  <FaEye />
                  <span>Track Your Order</span>
                </button>
                <button
                  onClick={() => navigate("/menu")}
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
                <p className="text-gray-600 text-sm mb-2">Need help with your order?</p>
                <button className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center justify-center space-x-2 mx-auto">
                  <FaPhone />
                  <span>Contact Support: +91-XXXX-XXXX-XX</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  if (!user || cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Configuration */}
            <div className="lg:col-span-2 space-y-6">
              {/* Order Type */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Type</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      orderDetails.orderType === "one-time" ? "border-green-500 bg-green-50" : "border-gray-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="orderType"
                      value="one-time"
                      checked={orderDetails.orderType === "one-time"}
                      onChange={(e) =>
                        setOrderDetails((prev) => ({
                          ...prev,
                          orderType: e.target.value

                        }))
                      }
                      className="sr-only"
                    />
                    <div className="text-center">
                      <h4 className="font-semibold text-gray-900">One-time Order</h4>
                      <p className="text-sm text-gray-600 mt-1">Order once, delivered as scheduled</p>
                    </div>
                  </label>

                  <label
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      orderDetails.orderType === "subscription" ? "border-green-500 bg-green-50" : "border-gray-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="orderType"
                      value="subscription"
                      checked={orderDetails.orderType === "subscription"}
                      onChange={(e) =>
                        setOrderDetails((prev) => ({
                          ...prev,
                          orderType: e.target.value

                        }))
                      }
                      className="sr-only"
                    />
                    <div className="text-center">
                      <h4 className="font-semibold text-gray-900">Subscription Plan</h4>
                      <p className="text-sm text-gray-600 mt-1">Recurring delivery with 10% discount</p>
                    </div>
                  </label>
                </div>

                {orderDetails.orderType === "subscription" && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subscription Duration</label>
                    <select
                      value={orderDetails.subscriptionType}
                      onChange={(e) =>
                        setOrderDetails((prev) => ({
                          ...prev,
                          subscriptionType: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="weekly">Weekly (4 weeks)</option>
                      <option value="monthly">Monthly (3 months)</option>
                    </select>
                  </div>
                )}
              </div>

              {/* Meal Selection */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Meals</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.entries(orderDetails.meals).map(([meal, selected]) => (
                    <label
                      key={meal}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        selected ? "border-green-500 bg-green-50" : "border-gray-200"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selected}
                        onChange={(e) =>
                          setOrderDetails((prev) => ({
                            ...prev,
                            meals: { ...prev.meals, [meal]: e.target.checked },
                          }))
                        }
                        className="sr-only"
                      />
                      <div className="text-center">
                        <h4 className="font-semibold text-gray-900 capitalize">{meal}</h4>
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
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
                  {weekDays.map((day) => (
                    <label
                      key={day.id}
                      className={`border-2 rounded-lg p-3 cursor-pointer transition-all text-center ${
                        orderDetails.deliverySchedule.includes(day.id)
                          ? "border-green-500 bg-green-50"
                          : "border-gray-200"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={orderDetails.deliverySchedule.includes(day.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setOrderDetails((prev) => ({
                              ...prev,
                              deliverySchedule: [...prev.deliverySchedule, day.id],
                            }))
                          } else {
                            setOrderDetails((prev) => ({
                              ...prev,
                              deliverySchedule: prev.deliverySchedule.filter((d) => d !== day.id),
                            }))
                          }
                        }}
                        className="sr-only"
                      />
                      <div className="text-sm font-medium">{day.label.slice(0, 3)}</div>
                    </label>
                  ))}
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    onClick={() =>
                      setOrderDetails((prev) => ({ ...prev, deliverySchedule: weekDays.slice(0, 5).map((d) => d.id) }))
                    }
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm transition duration-200"
                  >
                    Weekdays
                  </button>
                  <button
                    onClick={() =>
                      setOrderDetails((prev) => ({ ...prev, deliverySchedule: weekDays.map((d) => d.id) }))
                    }
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm transition duration-200"
                  >
                    All Days
                  </button>
                  <button
                    onClick={() =>
                      setOrderDetails((prev) => ({ ...prev, deliverySchedule: ["monday", "wednesday", "friday"] }))
                    }
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm transition duration-200"
                  >
                    M-W-F
                  </button>
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
                      value={orderDetails.deliveryTime}
                      onChange={(e) => setOrderDetails((prev) => ({ ...prev, deliveryTime: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="08:00-10:00">8:00 AM - 10:00 AM</option>
                      <option value="12:00-14:00">12:00 PM - 2:00 PM</option>
                      <option value="18:00-20:00">6:00 PM - 8:00 PM</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Address</label>
                    <textarea
                      value={orderDetails.deliveryAddress}
                      onChange={(e) => setOrderDetails((prev) => ({ ...prev, deliveryAddress: e.target.value }))}
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
                      onChange={(e) => setOrderDetails((prev) => ({ ...prev, specialInstructions: e.target.value }))}
                      placeholder="Any special delivery instructions or dietary notes"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      rows={2}
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {[
                    { id: "card", label: "Credit/Debit Card", icon: <FaCreditCard /> },
                    { id: "paypal", label: "PayPal", icon: <FaPaypal /> },
                    { id: "googlepay", label: "Google Pay", icon: <FaGooglePay /> },
                    { id: "applepay", label: "Apple Pay", icon: <FaApplePay /> },
                  ].map((method) => (
                    <label
                      key={method.id}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        paymentMethod === method.id ? "border-green-500 bg-green-50" : "border-gray-200"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.id}
                        checked={paymentMethod === method.id}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="sr-only"
                      />
                      <div className="text-center">
                        <div className="text-2xl mb-2">{method.icon}</div>
                        <div className="text-sm font-medium">{method.label}</div>
                      </div>
                    </label>
                  ))}
                </div>

                {paymentMethod === "card" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
                      <input
                        type="text"
                        value={cardDetails.cardholderName}
                        onChange={(e) => setCardDetails((prev) => ({ ...prev, cardholderName: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                      <input
                        type="text"
                        value={cardDetails.cardNumber}
                        onChange={(e) => setCardDetails((prev) => ({ ...prev, cardNumber: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                      <input
                        type="text"
                        value={cardDetails.expiryDate}
                        onChange={(e) => setCardDetails((prev) => ({ ...prev, expiryDate: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                      <input
                        type="text"
                        value={cardDetails.cvv}
                        onChange={(e) => setCardDetails((prev) => ({ ...prev, cvv: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="123"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>

                {/* Cart Items */}
                <div className="space-y-3 mb-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium text-gray-900">{item.name}</h4>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <span className="font-medium">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                {/* Order Configuration Summary */}
                <div className="border-t pt-4 mb-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Order Type:</span>
                      <span className="capitalize">{orderDetails.orderType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Meals:</span>
                      <span>
                        {Object.entries(orderDetails.meals)
                          .filter(([_, selected]) => selected)
                          .map(([meal]) => meal)
                          .join(", ")}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Days:</span>
                      <span>{orderDetails.deliverySchedule.length} days/week</span>
                    </div>
                    {orderDetails.orderType === "subscription" && (
                      <div className="flex justify-between">
                        <span>Duration:</span>
                        <span className="capitalize">{orderDetails.subscriptionType}</span>
                      </div>
                    )}
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
                    Object.values(orderDetails.meals).every((meal) => !meal)
                  }
                  className="w-full mt-6 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-4 px-6 rounded-lg transition duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:transform-none disabled:cursor-not-allowed"
                >
                  {isProcessing
                    ? "Processing..."
                    : `Place ${orderDetails.orderType === "subscription" ? "Subscription" : "Order"} - ₹${total}`}
                </button>

                {/* Cut-off Time Warning */}
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <FaClock className="inline mr-2" />
                    Order by 6:00 PM for next-day delivery
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
