"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { FaPlus, FaMinus, FaTrash, FaShoppingCart, FaClock, FaMapMarkerAlt } from "react-icons/fa"
import { useCart } from "../hooks/useCart"
import { useAuth } from "../hooks/useAuth"
import { useNavigate } from "react-router-dom"

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, clearCart, getCartTotal } = useCart()
  // const { user } = useAuth()
  const navigate= useNavigate();

  const [orderType, setOrderType] = useState("one-time")
  const [deliverySchedule, setDeliverySchedule] = useState("daily")
  const [deliveryTime, setDeliveryTime] = useState("12:00-14:00")
  const [deliveryAddress, setDeliveryAddress] = useState("")

  const deliveryFee = 50
  const tax = Math.round(getCartTotal() * 0.05)
  const total = getCartTotal() + deliveryFee + tax

  const handleCheckout = () => {
    // if (!localStorage.getItem("token")) {
    //   navigate("/auth/login")
    //   return
    // }

    const now = new Date()
    const cutoffTime = new Date()
    cutoffTime.setHours(18, 0, 0, 0)

    // if (now > cutoffTime) {
    //   alert("Orders after 6 PM will be delivered from the next available slot")
    // }

    navigate("/checkout")
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center">
        <div className="text-center">
          <FaShoppingCart className="w-24 h-24 text-gray-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Add some delicious meals to get started</p>
          <button
            onClick={() => navigate("/menu")}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Browse Menu
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white rounded-xl shadow-lg p-6"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-green-600 font-medium">₹{item.price}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 p-2 rounded-lg transition duration-200"
                      >
                        <FaMinus />
                      </button>
                      <span className="font-semibold text-lg w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg transition duration-200"
                      >
                        <FaPlus />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 p-2 transition duration-200"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </motion.div>
              ))}

              <button
                onClick={clearCart}
                className="text-red-600 hover:text-red-700 font-medium transition duration-200"
              >
                Clear Cart
              </button>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Type</h3>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="orderType"
                      value="one-time"
                      checked={orderType === "one-time"}
                      onChange={(e) => setOrderType(e.target.value)}
                      className="mr-3 text-green-600"
                    />
                    <span>One-time Order</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="orderType"
                      value="subscription"
                      checked={orderType === "subscription"}
                      onChange={(e) => setOrderType(e.target.value)}
                      className="mr-3 text-green-600"
                    />
                    <span>Subscription Plan</span>
                  </label>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery Options</h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FaClock className="inline mr-2" />
                      Delivery Time
                    </label>
                    <select
                      value={deliveryTime}
                      onChange={(e) => setDeliveryTime(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="08:00-10:00">8:00 AM - 10:00 AM</option>
                      <option value="12:00-14:00">12:00 PM - 2:00 PM</option>
                      <option value="18:00-20:00">6:00 PM - 8:00 PM</option>
                    </select>
                  </div>

                  {orderType === "subscription" && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Schedule</label>
                      <select
                        value={deliverySchedule}
                        onChange={(e) => setDeliverySchedule(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      >
                        <option value="daily">Daily</option>
                        <option value="weekdays">Weekdays Only</option>
                        <option value="mwf">Mon, Wed, Fri</option>
                        <option value="tts">Tue, Thu, Sat</option>
                      </select>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FaMapMarkerAlt className="inline mr-2" />
                      Delivery Address
                    </label>
                    <textarea
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      placeholder="Enter your delivery address"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      rows={3}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{getCartTotal()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>₹{deliveryFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (5%)</span>
                    <span>₹{tax}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>₹{total}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-lg transition duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Proceed to Checkout
                </button>

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
