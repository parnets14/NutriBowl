import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaPlus, FaMinus, FaShoppingCart, FaFilter, FaSearch } from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart";
import { useNavigate } from 'react-router-dom';

export default function MenuPage() {
  const { user } = useAuth();
  const { addToCart, cartItems, updateQuantity } = useCart();
  const navigate = useNavigate();

  const [menuItems, setMenuItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDietType, setSelectedDietType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch menu items from API
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/menu");
        if (!response.ok) {
          throw new Error("Failed to fetch menu items");
        }
        const data = await response.json();
        // Normalize data to use 'id' instead of '_id' for consistency with cart logic
        const normalizedData = data.map(item => ({
          id: item._id,
          ...item,
        }));
        setMenuItems(normalizedData);
        setFilteredItems(normalizedData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        // Fallback to provided menu item
        const fallbackItem = [
          {
            id: "68931b5d9ac9e22a4b575f3e",
            name: "Grilled Chicken Salad",
            description: "Healthy salad with grilled chicken and veggies",
            price: 444,
            calories: 32,
            protein: 34,
            carbs: 3,
            fat: 23,
            ingredients: ["Chicken", "Lettuce", "Tomatoes", "Cucumber"],
            category: "main",
            dietType: ["keto"],
            image: "/Uploads/image-1754471365143.jpeg",
            allergens: [],
            planType: ["weight-loss"],
          },
        ];
        setMenuItems(fallbackItem);
        setFilteredItems(fallbackItem);
      }
    };

    fetchMenuItems();
  }, []);

  // Apply filters whenever they change
  useEffect(() => {
    let filtered = [...menuItems];

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }

    // Filter by diet type
    if (selectedDietType !== "all") {
      filtered = filtered.filter((item) => item.dietType.includes(selectedDietType));
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredItems(filtered);
  }, [menuItems, selectedCategory, selectedDietType, searchTerm]);

  const getItemQuantity = (itemId) => {
    const cartItem = cartItems.find((item) => item.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  const handleAddToCart = (item) => {
    if (!localStorage.getItem("token")) {
      if (confirm("Please sign in to add items to cart. Would you like to sign in now?")) {
        navigate("/auth/login");
      }
      return;
    }

    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1,
    });
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    updateQuantity(itemId, newQuantity);
  };

  const categories = [
    { id: "all", name: "All Items" },
    { id: "breakfast", name: "Breakfast" },
    { id: "main", name: "Main Course" },
    { id: "snacks", name: "Snacks" },
    { id: "desserts", name: "Desserts" },
  ];

  const dietTypes = [
    { id: "all", name: "All Types" },
    { id: "veg", name: "Vegetarian" },
    { id: "non-veg", name: "Non-Vegetarian" },
    { id: "vegan", name: "Vegan" },
    { id: "keto", name: "Keto" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Menu</h1>
          <p className="text-lg text-gray-600 mb-4">Discover our delicious offerings</p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600 mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading menu...</p>
          </div>
        )}

        {/* Error Message */}
        {error && !loading && (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-8 text-center">
            {error}
            <p>Showing fallback menu items.</p>
          </div>
        )}

        {/* Search and Filters */}
        {!loading && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search menu items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg transition duration-200"
              >
                <FaFilter />
                <span>Filters</span>
              </button>

              {/* Cart Button */}
              <button
                onClick={() => navigate('/cart')}
                className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-900 text-white px-4 py-3 rounded-lg transition duration-200 relative"
              >
                <FaShoppingCart />
                <span>Cart</span>
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
                    {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </button>
            </div>

            {/* Filters */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 pt-6 border-t border-gray-200"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Diet Type</label>
                    <select
                      value={selectedDietType}
                      onChange={(e) => setSelectedDietType(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
                      {dietTypes.map((type) => (
                        <option key={type.id} value={type.id}>
                          {type.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        )}

        {/* Menu Items Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="relative">
                  <img
                    src={ `http://localhost:5001${item.image}`}
                    alt={item.name}
                    className="w-full h-48 object-cover"
                    onError={(e) => (e.target.src = "/placeholder.svg")}
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      ₹{item.price}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-white text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                      {item.calories} cal
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.name}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{item.description}</p>

                  {/* Nutrition Info */}
                  <div className="grid grid-cols-3 gap-2 mb-4 text-sm">
                    <div className="text-center p-2 bg-gray-50 rounded">
                      <div className="font-semibold text-gray-900">{item.protein}g</div>
                      <div className="text-gray-600">Protein</div>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded">
                      <div className="font-semibold text-gray-900">{item.carbs}g</div>
                      <div className="text-gray-600">Carbs</div>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded">
                      <div className="font-semibold text-gray-900">{item.fat}g</div>
                      <div className="text-gray-600">Fat</div>
                    </div>
                  </div>

                  {/* Diet Type Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.dietType.map((type) => (
                      <span
                        key={type}
                        className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full capitalize"
                      >
                        {type}
                      </span>
                    ))}
                  </div>

                  {/* Add to Cart */}
                  <div className="flex items-center justify-between">
                    {getItemQuantity(item.id) === 0 ? (
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition duration-200 flex-1"
                      >
                        <FaPlus />
                        <span>Add to Cart</span>
                      </button>
                    ) : (
                      <div className="flex items-center space-x-3 flex-1">
                        <button
                          onClick={() => handleUpdateQuantity(item.id, getItemQuantity(item.id) - 1)}
                          className="bg-gray-200 hover:bg-gray-300 text-gray-800 p-2 rounded-lg transition duration-200"
                        >
                          <FaMinus />
                        </button>
                        <span className="font-semibold text-lg">{getItemQuantity(item.id)}</span>
                        <button
                          onClick={() => handleUpdateQuantity(item.id, getItemQuantity(item.id) + 1)}
                          className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg transition duration-200"
                        >
                          <FaPlus />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {!loading && filteredItems.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <FaSearch className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-600">
              Try adjusting your search or filters
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSelectedDietType("all");
                  setSearchTerm("");
                }}
                className="ml-2 text-green-600 hover:text-green-700 underline"
              >
                Reset Filters
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}