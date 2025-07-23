import React, { useEffect, useState } from 'react';

const StayFitMealPlan = () => {
  const [selectedDay, setSelectedDay] = useState("DAY - 1");
  const [selectedMealType, setSelectedMealType] = useState("VEG MEAL");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const mealData = {
    "DAY - 1": {
      "VEG MEAL": {
        "Lunch": [
          {
            "Course": "Starter",
            "Item": "Steamed Veg Momos (Wheat Wrapper)",
            "Calories": "180 kcal",
            "Protein": "6g",
            "Carbs": "24g",
            "Fat": "4g",
            "Ingredients": "Cabbage – 40g, carrot – 30g, wheat flour – 40g, ginger – 2g, garlic – 2g, lemon – 1 tsp",
            "Benefits": "Low-fat starter; good fiber and digestive support."
          },
          {
            "Course": "Main",
            "Item": "Brown Rice Vegetable Pulao",
            "Calories": "390 kcal",
            "Protein": "8g",
            "Carbs": "50g",
            "Fat": "12g",
            "Ingredients": "Brown rice – 60g, peas – 30g, carrot – 30g, onion – 20g, oil – 1 tsp, cumin – ½ tsp",
            "Benefits": "Balanced energy meal with fiber, vitamins, and steady carbs."
          },
          {
            "Course": "Salad",
            "Item": "Sprouted Moong & Pomegranate Salad",
            "Calories": "150 kcal",
            "Protein": "7g",
            "Carbs": "18g",
            "Fat": "4g",
            "Ingredients": "Sprouted moong – 50g, pomegranate – 30g, mint – 5g, lemon – 1 tsp",
            "Benefits": "Rich in iron, antioxidants, and protein; improves immunity and digestion."
          }
        ],
        "Dinner": [
          {
            "Course": "Starter",
            "Item": "Paneer Tikka (Grilled, Low Oil)",
            "Calories": "200 kcal",
            "Protein": "14g",
            "Carbs": "6g",
            "Fat": "10g",
            "Ingredients": "Paneer – 60g, capsicum – 30g, curd – 1 tbsp, lemon – 1 tsp, spices – ½ tsp",
            "Benefits": "High-quality vegetarian protein; helps recovery and satiety."
          },
          {
            "Course": "Main",
            "Item": "Ragi Roti + Palak Dal",
            "Calories": "390 kcal",
            "Protein": "13g",
            "Carbs": "38g",
            "Fat": "11g",
            "Ingredients": "Ragi flour – 60g, moong dal – 40g, spinach – 30g, garlic – 2g, ghee – 1 tsp",
            "Benefits": "High in calcium, fiber, and plant protein; supports bone and muscle health."
          },
          {
            "Course": "Salad",
            "Item": "Cucumber Mint Yogurt Salad",
            "Calories": "160 kcal",
            "Protein": "5g",
            "Carbs": "12g",
            "Fat": "7g",
            "Ingredients": "Cucumber – 40g, curd – 100g, mint – 5g, black salt – pinch",
            "Benefits": "Hydrating and gut-friendly; promotes digestion and skin health."
          }
        ]
      },
      "NON-VEG MEAL": {
        "Lunch": [
          {
            "Course": "Starter",
            "Item": "Chicken Veg Lettuce Wraps",
            "Calories": "190 kcal",
            "Protein": "16g",
            "Carbs": "4g",
            "Fat": "8g",
            "Ingredients": "Minced chicken – 60g, onion – 20g, bell peppers – 30g, lettuce – 3 leaves, lemon – 1 tsp",
            "Benefits": "Lean protein & fiber-rich starter; promotes satiety and lean mass."
          },
          {
            "Course": "Main",
            "Item": "Brown Rice + Chicken Curry (Low Oil)",
            "Calories": "400 kcal",
            "Protein": "24g",
            "Carbs": "42g",
            "Fat": "10g",
            "Ingredients": "Chicken – 100g, brown rice – 60g, onion – 30g, tomato – 30g, spices – 1 tsp, oil – 1 tsp",
            "Benefits": "Balanced macros; high satiety and muscle recovery meal."
          },
          {
            "Course": "Salad",
            "Item": "Egg White Mint Salad",
            "Calories": "150 kcal",
            "Protein": "12g",
            "Carbs": "5g",
            "Fat": "6g",
            "Ingredients": "Egg whites – 3, mint – 5g, cucumber – 30g, lemon – 1 tsp, olive oil – 1 tsp",
            "Benefits": "Low-fat protein salad; supports metabolism, recovery, and gut health."
          }
        ],
        "Dinner": [
          {
            "Course": "Starter",
            "Item": "Tandoori Grilled Fish Cubes",
            "Calories": "210 kcal",
            "Protein": "18g",
            "Carbs": "3g",
            "Fat": "10g",
            "Ingredients": "Fish – 80g, curd – 1 tbsp, tandoori spice – ½ tsp, lemon – 1 tsp",
            "Benefits": "High-protein & omega-3; improves endurance and heart health."
          },
          {
            "Course": "Main",
            "Item": "Egg Bhurji + Jowar Roti",
            "Calories": "390 kcal",
            "Protein": "20g",
            "Carbs": "30g",
            "Fat": "14g",
            "Ingredients": "Eggs – 2, onion – 30g, tomato – 30g, green chilli – 1, jowar flour – 60g",
            "Benefits": "Supports muscle growth + complex carbs keep energy stable."
          },
          {
            "Course": "Salad",
            "Item": "Chicken & Tomato Yogurt Mix",
            "Calories": "170 kcal",
            "Protein": "13g",
            "Carbs": "6g",
            "Fat": "7g",
            "Ingredients": "Boiled chicken – 50g, tomato – 30g, curd – 100g, mint – 5g",
            "Benefits": "Probiotics + lean protein = gut and muscle recovery."
          }
        ]
      }
    },
    "DAY - 2": {
      "VEG MEAL": {
        "Lunch": [
          {
            "Course": "Starter",
            "Item": "Oats Veg Cutlets (Air-Fried)",
            "Calories": "190 kcal",
            "Protein": "6g",
            "Carbs": "20g",
            "Fat": "6g",
            "Ingredients": "Oats – 30g, carrot – 30g, peas – 30g, green chilli – 1, coriander – 5g, oil – 1 tsp",
            "Benefits": "High fiber and slow-release carbs; helps in digestion and satiety."
          },
          {
            "Course": "Main",
            "Item": "Vegetable Masala Khichdi (Brown Rice)",
            "Calories": "390 kcal",
            "Protein": "10g",
            "Carbs": "45g",
            "Fat": "11g",
            "Ingredients": "Brown rice – 60g, moong dal – 30g, mixed vegetables – 60g, cumin – ½ tsp, ghee – 1 tsp",
            "Benefits": "Protein + complex carbs = sustained energy and satiety."
          },
          {
            "Course": "Salad",
            "Item": "Beetroot & Curd Salad",
            "Calories": "140 kcal",
            "Protein": "5g",
            "Carbs": "12g",
            "Fat": "6g",
            "Ingredients": "Boiled beetroot – 40g, curd – 100g, lemon – 1 tsp",
            "Benefits": "Rich in iron and probiotics; supports gut health and blood flow."
          }
        ],
        "Dinner": [
          {
            "Course": "Starter",
            "Item": "Grilled Veg Tikka Skewers (Low Oil)",
            "Calories": "200 kcal",
            "Protein": "7g",
            "Carbs": "10g",
            "Fat": "9g",
            "Ingredients": "Bell peppers – 30g, paneer – 30g, mushroom – 30g, curd – 1 tbsp, spices – ½ tsp, oil – 1 tsp",
            "Benefits": "Antioxidants + protein combo; supports recovery and satiety."
          },
          {
            "Course": "Main",
            "Item": "Palak Tofu Curry + Ragi Roti",
            "Calories": "400 kcal",
            "Protein": "15g",
            "Carbs": "34g",
            "Fat": "13g",
            "Ingredients": "Tofu – 60g, spinach – 50g, onion – 30g, spices – 1 tsp, ragi flour – 60g",
            "Benefits": "Plant protein + iron + fiber; ideal for muscle tone and bone health."
          },
          {
            "Course": "Salad",
            "Item": "Apple & Peanut Lemon Salad",
            "Calories": "160 kcal",
            "Protein": "4g",
            "Carbs": "16g",
            "Fat": "8g",
            "Ingredients": "Apple – 40g, roasted peanuts – 10g, lemon – 1 tsp, mint – 5g",
            "Benefits": "Natural sugar + healthy fat; great for post-meal satisfaction and immunity."
          }
        ]
      },
      "NON-VEG MEAL": {
        "Lunch": [
          {
            "Course": "Starter",
            "Item": "Boiled Egg Pepper Toss",
            "Calories": "200 kcal",
            "Protein": "13g",
            "Carbs": "4g",
            "Fat": "10g",
            "Ingredients": "Boiled egg – 1, onion – 30g, green chilli – 1, pepper – ¼ tsp, oil – 1 tsp",
            "Benefits": "High-quality protein with metabolism-boosting spices; supports satiety."
          },
          {
            "Course": "Main",
            "Item": "Chicken Spinach Millet Bowl",
            "Calories": "420 kcal",
            "Protein": "25g",
            "Carbs": "35g",
            "Fat": "13g",
            "Ingredients": "Chicken – 100g, spinach – 40g, foxtail millet – 60g, spices – 1 tsp, ghee – 1 tsp",
            "Benefits": "Clean lean protein + iron + complex carbs; promotes muscle recovery and energy."
          },
          {
            "Course": "Salad",
            "Item": "Yogurt Apple Chicken Salad",
            "Calories": "160 kcal",
            "Protein": "13g",
            "Carbs": "8g",
            "Fat": "6g",
            "Ingredients": "Boiled chicken – 50g, apple – 30g, curd – 100g, lemon – 1 tsp",
            "Benefits": "Combines protein, probiotics, and fiber; supports gut and immune health."
          }
        ],
        "Dinner": [
          {
            "Course": "Starter",
            "Item": "Grilled Fish Skewers (Tandoori Spice)",
            "Calories": "210 kcal",
            "Protein": "18g",
            "Carbs": "2g",
            "Fat": "9g",
            "Ingredients": "Fish – 80g, curd – 1 tbsp, lemon – 1 tsp, spices – ½ tsp, oil – 1 tsp",
            "Benefits": "High-protein & omega-3 rich; supports endurance and brain health."
          },
          {
            "Course": "Main",
            "Item": "Egg Masala Curry + Jowar Roti",
            "Calories": "400 kcal",
            "Protein": "20g",
            "Carbs": "32g",
            "Fat": "13g",
            "Ingredients": "Eggs – 2, onion – 30g, tomato – 30g, spices – 1 tsp, jowar flour – 60g",
            "Benefits": "Balanced complex carbs + clean protein; supports sustained energy and muscle health."
          },
          {
            "Course": "Salad",
            "Item": "Chicken Lettuce Olive Oil Salad",
            "Calories": "160 kcal",
            "Protein": "12g",
            "Carbs": "5g",
            "Fat": "7g",
            "Ingredients": "Boiled chicken – 50g, lettuce – 40g, olive oil – 1 tsp, lemon – 1 tsp",
            "Benefits": "Light evening protein + good fats; ideal for post-dinner satiety without heaviness."
          }
        ]
      }
    }
  };

  const pricingData = [
    { duration: "1 Month", veg1Meal: "₹7,000", veg2Meal: "₹14,000", nonVeg1Meal: "₹8,000", nonVeg2Meal: "₹16,000" },
    { duration: "3 Months", veg1Meal: "₹18,000", veg2Meal: "₹35,000", nonVeg1Meal: "₹21,000", nonVeg2Meal: "₹40,000" },
    { duration: "6 Months", veg1Meal: "₹35,000", veg2Meal: "₹75,000", nonVeg1Meal: "₹40,000", nonVeg2Meal: "₹85,000" },
    { duration: "12 Months", veg1Meal: "₹60,000", veg2Meal: "₹1,35,000", nonVeg1Meal: "₹70,000", nonVeg2Meal: "₹1,50,000" }
  ];

  const calculateMealTotals = (meals) => {
    return meals.reduce((total, item) => ({
      calories: total.calories + parseInt(item.Calories),
      protein: total.protein + parseInt(item.Protein),
      carbs: total.carbs + parseInt(item.Carbs),
      fat: total.fat + parseInt(item.Fat)
    }), { calories: 0, protein: 0, carbs: 0, fat: 0 });
  };

  const selectedMealData = mealData[selectedDay]?.[selectedMealType];
  const lunchMeals = selectedMealData?.["Lunch"] || [];
  const dinnerMeals = selectedMealData?.["Dinner"] || [];
  
  const lunchTotals = calculateMealTotals(lunchMeals);
  const dinnerTotals = calculateMealTotals(dinnerMeals);

  const renderMealTable = (meals, mealTime, totals) => (
    <div className="rounded-xl shadow-lg overflow-hidden mb-6 bg-white">
      <div className={`p-4 ${mealTime === 'Lunch' ? 'bg-green-600' : 'bg-green-700'}`}>
        <h3 className="text-xl font-semibold text-white">{mealTime}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-green-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">Course</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">Item</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">Calories</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">Protein</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">Carbs</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">Fat</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">Ingredients</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">Benefits</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {meals.map((item, index) => (
              <tr key={index}>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full 
                    ${item.Course === 'Starter' ? 'bg-green-100 text-green-800' : 
                      item.Course === 'Main' ? 'bg-green-200 text-green-900' : 
                      'bg-green-300 text-green-900'}`}>
                    {item.Course}
                  </span>
                </td>
                <td className="px-4 py-4 font-medium text-gray-900 max-w-xs">{item.Item}</td>
                <td className="px-4 py-4 text-sm text-gray-600">{item.Calories}</td>
                <td className="px-4 py-4 text-sm text-gray-600">{item.Protein}</td>
                <td className="px-4 py-4 text-sm text-gray-600">{item.Carbs}</td>
                <td className="px-4 py-4 text-sm text-gray-600">{item.Fat}</td>
                <td className="px-4 py-4 text-sm text-gray-600 max-w-xs break-words">{item.Ingredients}</td>
                <td className="px-4 py-4 text-sm text-gray-600 max-w-xs break-words">{item.Benefits}</td>
              </tr>
            ))}
            <tr className="bg-green-50 font-semibold">
              <td className="px-4 py-3 text-gray-900" colSpan="2">Total</td>
              <td className="px-4 py-3 text-gray-900">{totals.calories} kcal</td>
              <td className="px-4 py-3 text-gray-900">{totals.protein}g</td>
              <td className="px-4 py-3 text-gray-900">{totals.carbs}g</td>
              <td className="px-4 py-3 text-gray-900">{totals.fat}g</td>
              <td className="px-4 py-3 text-gray-400" colSpan="2"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-green-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-4xl font-bold text-green-800 mb-4">Stay Fit Meal Plans</h1>
            <p className="text-lg text-green-600 mb-8">Balanced nutrition for maintaining fitness and energy</p>
            
            {/* Day and Meal Type Selectors */}
            <div className="flex flex-col items-center gap-6 mb-8">
              <div className="w-full max-w-md">
                <h3 className="text-sm font-medium text-green-700 mb-2 text-left">Select Day</h3>
                <div className="grid grid-cols-2 gap-3">
                  {["DAY - 1", "DAY - 2"].map((day) => (
                    <button
                      key={day}
                      onClick={() => setSelectedDay(day)}
                      className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                        selectedDay === day
                          ? 'bg-green-600 text-white shadow-md transform scale-[0.98]'
                          : 'bg-green-100 text-green-800 hover:bg-green-200'
                      }`}
                    >
                      {day.replace("DAY - ", "Day ")}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="w-full max-w-md">
                <h3 className="text-sm font-medium text-green-700 mb-2 text-left">Meal Type</h3>
                <div className="grid grid-cols-2 gap-3">
                  {["VEG MEAL", "NON-VEG MEAL"].map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedMealType(type)}
                      className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                        selectedMealType === type
                          ? 'bg-green-600 text-white shadow-md transform scale-[0.98]'
                          : 'bg-green-100 text-green-800 hover:bg-green-200'
                      }`}
                    >
                      {type.replace("MEAL", "").replace("-", " ").trim()}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Current Selection Display */}
            <div className="flex flex-wrap justify-center gap-3 mt-4">
              <span className="px-4 py-2 bg-green-600 text-white rounded-full font-medium shadow-sm flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {selectedDay}
              </span>
              <span className="px-4 py-2 bg-green-600 text-white rounded-full font-medium shadow-sm flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                {selectedMealType.replace("MEAL", "").replace("-", " ").trim()}
              </span>
            </div>
          </div>
        </div>

        {/* Meal Tables */}
        <div className="space-y-8">
          {renderMealTable(lunchMeals, 'Lunch', lunchTotals)}
          {renderMealTable(dinnerMeals, 'Dinner', dinnerTotals)}
        </div>

        {/* Daily Summary */}
        <div className="rounded-xl shadow-lg p-6 mb-10 bg-white">
          <h3 className="text-2xl font-semibold text-green-800 mb-6 text-center">Daily Nutrition Summary</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Total Calories", value: lunchTotals.calories + dinnerTotals.calories, unit: "kcal", icon: "🔥" },
              { label: "Total Protein", value: lunchTotals.protein + dinnerTotals.protein, unit: "g", icon: "💪" },
              { label: "Total Carbs", value: lunchTotals.carbs + dinnerTotals.carbs, unit: "g", icon: "🌾" },
              { label: "Total Fat", value: lunchTotals.fat + dinnerTotals.fat, unit: "g", icon: "🥑" }
            ].map((item, index) => (
              <div key={index} className="bg-green-50 p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-medium text-green-700">{item.label}</h4>
                  <span className="text-xl">{item.icon}</span>
                </div>
                <p className="text-3xl font-bold text-green-800 mt-2">
                  {item.value} <span className="text-lg font-normal">{item.unit}</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Section */}
        <div className="rounded-xl shadow-lg overflow-hidden mb-10 bg-white">
          <div className="p-6 bg-gradient-to-r from-green-600 to-green-700">
            <h2 className="text-3xl font-semibold text-white text-center">Meal Plan Pricing</h2>
            <p className="text-green-100 text-center mt-2">Choose the plan that fits your lifestyle</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-green-200">
              <thead className="bg-green-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-green-700 uppercase tracking-wider">Duration</th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-green-700 uppercase tracking-wider">Vegetarian (1 Meal)</th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-green-700 uppercase tracking-wider">Vegetarian (2 Meals)</th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-green-700 uppercase tracking-wider">Non-Veg (1 Meal)</th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-green-700 uppercase tracking-wider">Non-Veg (2 Meals)</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-green-200">
                {pricingData.map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-green-50'}>
                    <td className="px-6 py-4 whitespace-nowrap font-semibold text-gray-900">{row.duration}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-green-600 font-semibold">{row.veg1Meal}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-green-600 font-semibold">{row.veg2Meal}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-green-600 font-semibold">{row.nonVeg1Meal}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-green-600 font-semibold">{row.nonVeg2Meal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-6 bg-green-50 border-t border-green-200">
            <button className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition-all duration-200 transform hover:scale-[1.01]">
              Get Started with Your Meal Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StayFitMealPlan;