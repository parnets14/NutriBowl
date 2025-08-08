import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaUser, FaShoppingCart, FaHistory, FaCog } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const[orders,setOrders] = useState([])

  // Fetch user profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await fetch('http://localhost:5001/api/auth/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }

        const data = await response.json();
        // console.log(data);
        
        setUser(data.data);
        // console.log(localStorage.getItem("token",token));
        
      } catch (error) {
        console.error('Profile fetch error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  // Calculate BMI
  const calculateBMI = () => {
    if (!user?.height?.value || !user?.weight?.value) return null;
    
    const heightInM = user.height.unit === "cm" 
      ? user.height.value / 100 
      : user.height.value * 0.0254;
    
    const weightInKg = user.weight.unit === "kg"
      ? user.weight.value
      : user.weight.value * 0.453592;

    return (weightInKg / (heightInM * heightInM)).toFixed(1);
  };

 useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await fetch('http://localhost:5001/api/auth/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }

        const data = await response.json();
        setUser(data.data);
      } catch (error) {
        console.error('Profile fetch error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  // Fetch orders when orders tab is active
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await fetch('http://localhost:5001/api/checkout/my-orders', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }

        const data = await response.json();
        setOrders(data.data);
        console.log(data,"gfds");
        
      } catch (error) {
        console.error('Orders fetch error:', error);
      }
    };

  
      fetchOrders();
    
  }, []);


  // Get BMI category
  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return "Underweight";
    if (bmi < 25) return "Normal weight";
    if (bmi < 30) return "Overweight";
    return "Obese";
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    );
  }

  // Error state
  if (!localStorage.getItem("token")) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Failed to load profile data</p>
      </div>
    );
  }

  const tabs = [
    { id: "profile", label: "Profile", icon: <FaUser /> },
    { id: "orders", label: "Orders", icon: <FaShoppingCart /> },
    // { id: "history", label: "History", icon: <FaHistory /> },
    { id: "settings", label: "Settings", icon: <FaCog /> },
  ];

  const bmi = calculateBMI();
  const bmiCategory = bmi ? getBMICategory(bmi) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl shadow-xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-8">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                <FaUser className="w-8 h-8 text-green-600" />
              </div>
              <div className="text-white">
                <h1 className="text-2xl font-bold">{user.fullName}</h1>
                <p className="text-green-100">{user.email}</p>
                {bmi && (
                  <p className="text-green-100">
                    BMI: {bmi} - {bmiCategory}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? "border-green-500 text-green-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="p-6">
            {activeTab === "profile" && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Full Name</label>
                      <p className="text-lg text-gray-900">{user.fullName}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Email</label>
                      <p className="text-lg text-gray-900">{user.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Phone</label>
                      <p className="text-lg text-gray-900">{user.phone || "Not provided"}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Gender</label>
                      <p className="text-lg text-gray-900 capitalize">{user.gender || "Not specified"}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Height</label>
                      <p className="text-lg text-gray-900">
                        {user.height ? `${user.height.value} ${user.height.unit}` : "Not provided"}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Weight</label>
                      <p className="text-lg text-gray-900">
                        {user.weight ? `${user.weight.value} ${user.weight.unit}` : "Not provided"}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Food Preference</label>
                      <p className="text-lg text-gray-900 capitalize">{user.foodPreference || "Not specified"}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

           {activeTab === "orders" && (
  <div className="space-y-6">
    <h2 className="text-xl font-semibold text-gray-900">My Orders</h2>
    {orders.length === 0 ? (
      <div className="text-center py-12">
        <FaShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
        <p className="text-gray-600 mb-6">Start ordering healthy meals tailored to your needs</p>
        <button
          onClick={() => navigate("/menu")}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg"
        >
          Browse Menu
        </button>
      </div>
    ) : (
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order._id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-900">Order #{order._id.slice(-6).toUpperCase()}</h3>
                <p className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                order.status === 'Confirmed' 
                  ? 'bg-green-100 text-green-800' 
                  : order.status === 'Delivered'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {order.status}
              </span>
            </div>
            
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-900">Order Type:</h4>
              <p className="mt-1">{order.orderType}</p>
            </div>

            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-900">Items:</h4>
              <ul className="mt-2 space-y-2">
                {order.items.map((item, index) => (
                  <li key={index} className="flex justify-between">
                    <span>{item.name} × {item.quantity}</span>
                    <span>₹{item.price * item.quantity}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 pt-4 border-t grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Delivery Address:</h4>
                <p className="mt-1 text-sm">{order.deliveryAddress}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">Total: ₹{order.total}</p>
                {order.discount > 0 && (
                  <p className="text-sm text-green-600">
                    (Includes ₹{order.discount} discount)
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
)}

            {activeTab === "history" && (
              <div className="text-center py-12">
                <FaHistory className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No history available</h3>
                <p className="text-gray-600">Your order history will appear here</p>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Account Settings</h2>
                <div className="pt-6 border-t border-gray-200">
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}