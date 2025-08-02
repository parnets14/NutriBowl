
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

  useEffect(() => {
    const mockMenuItems = [
      {
        id: "1",
        name: "Grilled Chicken Quinoa Bowl",
        description: "High-protein bowl with grilled chicken, quinoa, and fresh vegetables",
        price: 299,
        calories: 450,
        protein: 35,
        carbs: 40,
        fat: 12,
        ingredients: ["Chicken breast", "Quinoa", "Broccoli", "Bell peppers", "Olive oil"],
        category: "main",
        dietType: ["non-veg"],
        image: "/placeholder.svg?height=300&width=400",
        allergens: [],
        planType: ["weight-gain", "stay-fit"],
      },
      {
        id: "2",
        name: "Paneer Tikka Masala",
        description: "Creamy paneer curry with aromatic spices and herbs",
        price: 249,
        calories: 380,
        protein: 18,
        carbs: 25,
        fat: 22,
        ingredients: ["Paneer", "Tomatoes", "Onions", "Cream", "Spices"],
        category: "main",
        dietType: ["veg"],
        image: "/placeholder.svg?height=300&width=400",
        allergens: ["dairy"],
        planType: ["weight-gain", "stay-fit"],
      },
      {
        id: "3",
        name: "Avocado Toast with Eggs",
        description: "Whole grain toast topped with avocado and poached eggs",
        price: 199,
        calories: 320,
        protein: 16,
        carbs: 28,
        fat: 18,
        ingredients: ["Whole grain bread", "Avocado", "Eggs", "Cherry tomatoes"],
        category: "breakfast",
        dietType: ["veg"],
        image: "/placeholder.svg?height=300&width=400",
        allergens: ["gluten", "eggs"],
        planType: ["stay-fit", "weight-loss"],
      },
      {
        id: "4",
        name: "Salmon Teriyaki Bowl",
        description: "Grilled salmon with teriyaki glaze, brown rice, and steamed vegetables",
        price: 399,
        calories: 520,
        protein: 42,
        carbs: 45,
        fat: 18,
        ingredients: ["Salmon", "Brown rice", "Broccoli", "Carrots", "Teriyaki sauce"],
        category: "main",
        dietType: ["non-veg"],
        image: "/placeholder.svg?height=300&width=400",
        allergens: ["fish"],
        planType: ["weight-gain", "stay-fit"],
      },
      {
        id: "5",
        name: "Greek Yogurt Parfait",
        description: "Layered Greek yogurt with berries, granola, and honey",
        price: 149,
        calories: 280,
        protein: 20,
        carbs: 35,
        fat: 8,
        ingredients: ["Greek yogurt", "Mixed berries", "Granola", "Honey"],
        category: "breakfast",
        dietType: ["veg"],
        image: "/placeholder.svg?height=300&width=400",
        allergens: ["dairy", "nuts"],
        planType: ["stay-fit", "weight-loss"],
      },
      {
        id: "6",
        name: "Vegan Buddha Bowl",
        description: "Colorful bowl with quinoa, roasted vegetables, and tahini dressing",
        price: 269,
        calories: 420,
        protein: 15,
        carbs: 55,
        fat: 16,
        ingredients: ["Quinoa", "Sweet potato", "Chickpeas", "Kale", "Tahini"],
        category: "main",
        dietType: ["vegan"],
        image: "/placeholder.svg?height=300&width=400",
        allergens: ["sesame"],
        planType: ["stay-fit", "weight-loss"],
      },
    ];

    setMenuItems(mockMenuItems);
    setFilteredItems(mockMenuItems);
  }, []);

  useEffect(() => {
    let filtered = [...menuItems];

    if (user) {
      if (user.foodPreference && user.foodPreference !== "all") {
        filtered = filtered.filter((item) => item.dietType.includes(user.foodPreference));
      }

      if (user?.bmiCategory) {
        const planType =
          user?.bmiCategory === "Underweight"
            ? "weight-gain"
            : user?.bmiCategory === "Overweight" || user?.bmiCategory === "Obese"
            ? "weight-loss"
            : "stay-fit";

        filtered = filtered.filter((item) => item.planType.includes(planType));
      }
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }

    if (selectedDietType !== "all") {
      filtered = filtered.filter((item) => item.dietType.includes(selectedDietType));
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredItems(filtered);
  }, [menuItems, user, selectedCategory, selectedDietType, searchTerm]);

  const getItemQuantity = (itemId) => {
    const cartItem = cartItems.find((item) => item.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  const handleAddToCart = (item) => {
    if (!user) {
      if (confirm("Please sign in to add items to cart. Would you like to sign in now?")) {
        router.push("/auth/login");
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Personalized Menu for {user?.fullName}</h1>
          {user?.bmiCategory && (
            <p className="text-lg text-gray-600 mb-4">Curated for your {user?.bmiCategory} BMI category</p>
          )}
        </div>

        {/* Search and Filters */}
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

        {/* Menu Items Grid */}
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
                <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-48 object-cover" />
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
                    <span key={type} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full capitalize">
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

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <FaSearch className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};
