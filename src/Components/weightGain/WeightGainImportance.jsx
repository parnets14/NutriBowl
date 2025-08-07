

import React, { useState, useEffect } from "react";
import { FaBrain, FaShieldAlt, FaMeh, FaBolt, FaFilter, FaSpinner } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BenefitCard = ({ icon, title, description, index }) => {
  return (
    <motion.div
      className="h-full bg-white border border-green-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
    >
      <div className="text-3xl mb-4 text-green-500">{icon}</div>
      <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

const ImportanceOfHealthyWeightGain = () => {
  const navigate = useNavigate();
  const [benefits, setBenefits] = useState([]);
  const [filteredBenefits, setFilteredBenefits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("weight-loss");
  const [isFiltering, setIsFiltering] = useState(false);

  // Categories for filter
  const categories = [
    { value: "weight-loss", label: "Weight Loss" },
    { value: "weight-gain", label: "Weight Gain" },
    { value: "stay-fit", label: "Stay Fit" },
    { value: "all", label: "All Categories" }
  ];

  useEffect(() => {
    const fetchBenefits = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("http://localhost:5001/api/importance");
        
        if (!response.data || !Array.isArray(response.data)) {
          throw new Error("Invalid data format received");
        }

        setBenefits(response.data);
        setFilteredBenefits(
          response.data.filter((item) => item.category === "weight-gain")
        );
      } catch (err) {
        console.error("Error fetching benefits:", err);
        setError(err.response?.data?.message || err.message || "Failed to load benefits");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBenefits();
  }, []);

  const handleCategoryChange = async (category) => {
    try {
      setIsFiltering(true);
      setSelectedCategory(category);

      if (category === "all") {
        setFilteredBenefits(benefits);
      } else {
        setFilteredBenefits(benefits.filter((item) => item.category === category));
      }
    } catch (err) {
      console.error("Filtering error:", err);
      setError("Failed to apply filter");
    } finally {
      setIsFiltering(false);
    }
  };

  const getIconComponent = (iconName) => {
    const iconMap = {
      brain: <FaBrain />,
      shield: <FaShieldAlt />,
      meh: <FaMeh />,
      bolt: <FaBolt />
    };
    return iconMap[iconName] || <FaBolt />;
  };

  // Default benefits for fallback
  const defaultBenefits = categories
    .filter(cat => cat.value !== "all")
    .map(category => ({
      icon: "bolt",
      title: `${category.label} Benefit`,
      description: `This is a default ${category.label.toLowerCase()} benefit description.`,
      category: category.value
    }));

  const displayBenefits = error ? defaultBenefits : 
                        filteredBenefits.length > 0 ? filteredBenefits : 
                        benefits.length > 0 ? benefits : 
                        defaultBenefits;

  return (
    <section className="relative py-16 md:py-20 bg-gradient-to-b from-green-50 to-white">
      <div className="relative z-10 container mx-auto px-5 sm:px-6 lg:px-8">
        {/* Header with Filter */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 mb-4 text-sm font-semibold text-green-600 bg-green-100 rounded-full">
            HEALTH BENEFITS
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Importance of <span className="text-green-600">Healthy Weight Management</span>
          </h2>
          
          {/* Category Filter */}
          {/* <div className="mt-8 flex flex-col items-center">
            <div className="relative w-full max-w-xs">
              <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 mb-1">
                Filter by category
              </label>
              <div className="relative">
                <select
                  id="category-filter"
                  value={selectedCategory}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  disabled={isLoading}
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 rounded-md"
                >
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
                {(isLoading || isFiltering) && (
                  <div className="absolute right-3 top-2.5">
                    <FaSpinner className="animate-spin text-gray-400" />
                  </div>
                )}
              </div>
            </div>
          </div> */}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-8 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
            <p>{error}</p>
            <p className="text-sm mt-1">Showing default benefits instead.</p>
          </div>
        )}

        {/* Benefits Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <FaSpinner className="animate-spin text-green-500 text-4xl" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {displayBenefits.map((benefit, index) => (
              <BenefitCard
                key={`${benefit.category}-${index}`}
                icon={getIconComponent(benefit.icon)}
                title={benefit.title}
                description={benefit.description}
                index={index}
              />
            ))}
          </div>
        )}

       <div className="bg-white border border-green-50 rounded-xl p-8 max-w-4xl mx-auto shadow-sm">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-3">The NutriBowl Difference</h3>
              <p className="text-gray-600 mb-4">
                Our weight loss plans combine scientifically-balanced nutrition with delicious meals that:
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center text-gray-600">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span>Preserve muscle mass</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span>Boost metabolism</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span>Control cravings</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span>Provide micronutrients</span>
                </div>
              </div>
            </div>
            <div className="md:w-1/3">
              <button
                onClick={() => navigate("/meal-plans/weight-loss")}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-6 rounded-full transition-all shadow-md hover:shadow-lg"
              >
                View Weight loss Meal plan
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImportanceOfHealthyWeightGain;