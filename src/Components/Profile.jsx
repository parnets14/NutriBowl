
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { FaUser, FaEdit, FaShoppingCart, FaHistory, FaCog } from "react-icons/fa"
import { useAuth } from "../hooks/useAuth"
import { useNavigate } from "react-router-dom"

export default function ProfilePage() {
  const { user, updateProfile, logout } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("profile")
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    height: "",
    weight: "",
    heightUnit: "cm",
    weightUnit: "kg",
    foodPreference: "",
    gender: "",
  })

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || "",
        email: user.email || "",
        phone: user.phone || "",
        height: user.height?.toString() || "",
        weight: user.weight?.toString() || "",
        heightUnit: user.heightUnit || "cm",
        weightUnit: user.weightUnit || "kg",
        foodPreference: user.foodPreference || "",
        gender: user.gender || "",
      })
    }
  }, [user])

  const calculateBMI = () => {
    if (!formData.height || !formData.weight) return null

    const heightInM =
      formData.heightUnit === "cm"
        ? parseFloat(formData.height) / 100
        : parseFloat(formData.height) * 0.0254
    const weightInKg =
      formData.weightUnit === "kg"
        ? parseFloat(formData.weight)
        : parseFloat(formData.weight) * 0.453592

    return (weightInKg / (heightInM * heightInM)).toFixed(1)
  }

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return "Underweight"
    if (bmi < 25) return "Normal weight"
    if (bmi < 30) return "Overweight"
    return "Obese"
  }

  const handleSave = async () => {
    try {
      const bmi = calculateBMI()
      const updatedData = {
        ...formData,
        height: parseFloat(formData.height),
        weight: parseFloat(formData.weight),
        bmi: bmi ? parseFloat(bmi) : null,
        bmiCategory: bmi ? getBMICategory(parseFloat(bmi)) : null,
      }

      await updateProfile(updatedData)
      setIsEditing(false)
    } catch (error) {
      console.error("Failed to update profile:", error)
    }
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    )
  }

  const tabs = [
    { id: "profile", label: "Profile", icon: <FaUser /> },
    { id: "orders", label: "Orders", icon: <FaShoppingCart /> },
    { id: "history", label: "History", icon: <FaHistory /> },
    { id: "settings", label: "Settings", icon: <FaCog /> },
  ]
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
                {user.bmi && (
                  <p className="text-green-100">
                    BMI: {user.bmi} - {user.bmiCategory}
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
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center space-x-2 text-green-600 hover:text-green-700"
                  >
                    <FaEdit />
                    <span>{isEditing ? "Cancel" : "Edit"}</span>
                  </button>
                </div>

                {isEditing ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                      <select
                        value={formData.gender}
                        onChange={(e) => setFormData((prev) => ({ ...prev, gender: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      >
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Height</label>
                      <div className="flex">
                        <input
                          type="number"
                          value={formData.height}
                          onChange={(e) => setFormData((prev) => ({ ...prev, height: e.target.value }))}
                          className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                        <select
                          value={formData.heightUnit}
                          onChange={(e) => setFormData((prev) => ({ ...prev, heightUnit: e.target.value }))}
                          className="px-3 py-3 border border-l-0 border-gray-300 rounded-r-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        >
                          <option value="cm">cm</option>
                          <option value="in">in</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Weight</label>
                      <div className="flex">
                        <input
                          type="number"
                          value={formData.weight}
                          onChange={(e) => setFormData((prev) => ({ ...prev, weight: e.target.value }))}
                          className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                        <select
                          value={formData.weightUnit}
                          onChange={(e) => setFormData((prev) => ({ ...prev, weightUnit: e.target.value }))}
                          className="px-3 py-3 border border-l-0 border-gray-300 rounded-r-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        >
                          <option value="kg">kg</option>
                          <option value="lbs">lbs</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Food Preference</label>
                      <select
                        value={formData.foodPreference}
                        onChange={(e) => setFormData((prev) => ({ ...prev, foodPreference: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      >
                        <option value="">Select</option>
                        <option value="veg">Vegetarian</option>
                        <option value="non-veg">Non-Vegetarian</option>
                        <option value="vegan">Vegan</option>
                        <option value="jain">Jain</option>
                        <option value="keto">Keto</option>
                      </select>
                    </div>

                    {formData.height && formData.weight && (
                      <div className="md:col-span-2">
                        <div className="p-4 bg-green-50 rounded-lg">
                          <h4 className="font-medium text-green-800 mb-2">Updated BMI</h4>
                          <p className="text-green-700">
                            BMI: {calculateBMI()} - {getBMICategory(Number.parseFloat(calculateBMI() || "0"))}
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="md:col-span-2">
                      <button
                        onClick={handleSave}
                        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                ) : (
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
                          {user.height ? `${user.height} ${user.heightUnit}` : "Not provided"}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-500">Weight</label>
                        <p className="text-lg text-gray-900">
                          {user.weight ? `${user.weight} ${user.weightUnit}` : "Not provided"}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-500">Food Preference</label>
                        <p className="text-lg text-gray-900 capitalize">{user.foodPreference || "Not specified"}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "orders" && (
              <div className="text-center py-12">
                <FaShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
                <p className="text-gray-600 mb-6">Start ordering healthy meals tailored to your needs</p>
                <button
                  onClick={() => navigate("/menu")}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
                >
                  Browse Menu
                </button>
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

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">Email Notifications</h3>
                      <p className="text-sm text-gray-600">Receive updates about your orders</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">SMS Notifications</h3>
                      <p className="text-sm text-gray-600">Get text updates about deliveries</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                    </label>
                  </div>
                </div>

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
  )
}
