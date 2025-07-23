import React, { useEffect, useState } from 'react';

const WeightLossMealPlan = () => {
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
            "Item": "Methi Tomato Clear Soup",
            "Calories": "90 kcal",
            "Protein": "3g",
            "Carbs": "10g",
            "Fat": "2g",
            "Ingredients": "Tomato – 60g, methi – 20g, garlic – 2g, pepper – pinch, oil – 1 tsp",
            "Benefits": "Antioxidant-rich and cooling; supports digestion and appetite control."
          },
          {
            "Course": "Main",
            "Item": "Oats Vegetable Pulao",
            "Calories": "260 kcal",
            "Protein": "6g",
            "Carbs": "42g",
            "Fat": "7g",
            "Ingredients": "Rolled oats – 60g, carrot – 30g, peas – 30g, onion – 20g, oil – 1 tsp",
            "Benefits": "Soluble fiber-rich; reduces cholesterol and supports satiety."
          },
          {
            "Course": "Salad",
            "Item": "Cabbage Peanut Lemon Slaw",
            "Calories": "100 kcal",
            "Protein": "4g",
            "Carbs": "10g",
            "Fat": "5g",
            "Ingredients": "Cabbage – 50g, roasted peanuts – 10g, lemon – 1 tsp, salt – pinch",
            "Benefits": "Adds crunch, protein, and healthy fat; improves gut health."
          }
        ],
        "Dinner": [
          {
            "Course": "Starter",
            "Item": "Palak Ginger Soup",
            "Calories": "85 kcal",
            "Protein": "3g",
            "Carbs": "9g",
            "Fat": "3g",
            "Ingredients": "Spinach – 50g, ginger – 2g, garlic – 1 clove, oil – 1 tsp",
            "Benefits": "Detoxifying and iron-rich; boosts immunity and gut health."
          },
          {
            "Course": "Main",
            "Item": "Broken Wheat Veg Upma",
            "Calories": "240 kcal",
            "Protein": "7g",
            "Carbs": "35g",
            "Fat": "6g",
            "Ingredients": "Broken wheat – 60g, beans – 30g, carrot – 30g, mustard – ½ tsp, oil – 1 tsp",
            "Benefits": "Fiber-rich; controls blood sugar and aids digestion."
          },
          {
            "Course": "Salad",
            "Item": "Grated Carrot with Curd",
            "Calories": "90 kcal",
            "Protein": "3g",
            "Carbs": "8g",
            "Fat": "3g",
            "Ingredients": "Carrot – 50g, curd – 80g, roasted cumin – pinch",
            "Benefits": "Cooling, probiotic-rich; supports digestion and metabolism."
          }
        ]
      },
      "NON-VEG MEAL": {
        "Lunch": [
          {
            "Course": "Starter",
            "Item": "Lemon Chicken Clear Soup",
            "Calories": "100 kcal",
            "Protein": "12g",
            "Carbs": "4g",
            "Fat": "2g",
            "Ingredients": "Chicken breast – 60g, garlic – 2g, lemon – 1 tsp, coriander – 5g",
            "Benefits": "Lean protein and vitamin C; boosts immunity and metabolic rate."
          },
          {
            "Course": "Main",
            "Item": "Chicken Brown Rice Pulao",
            "Calories": "270 kcal",
            "Protein": "20g",
            "Carbs": "28g",
            "Fat": "6g",
            "Ingredients": "Chicken – 80g, brown rice – 60g, onion – 20g, peas – 20g, oil – 1 tsp",
            "Benefits": "Balanced protein + complex carbs; supports steady energy and satiety."
          },
          {
            "Course": "Salad",
            "Item": "Boiled Egg Lettuce Mix",
            "Calories": "90 kcal",
            "Protein": "8g",
            "Carbs": "3g",
            "Fat": "4g",
            "Ingredients": "Boiled egg – 1, lettuce – 30g, lemon – 1 tsp, black pepper – pinch",
            "Benefits": "Light and protein-rich; improves digestion and reduces cravings."
          }
        ],
        "Dinner": [
          {
            "Course": "Starter",
            "Item": "Spinach Chicken Soup",
            "Calories": "90 kcal",
            "Protein": "10g",
            "Carbs": "3g",
            "Fat": "2g",
            "Ingredients": "Chicken – 60g, spinach – 40g, garlic – 1 clove, pepper – pinch",
            "Benefits": "High in iron and protein; supports recovery and blood health."
          },
          {
            "Course": "Main",
            "Item": "Stir-Fried Chicken + Ragi Roti",
            "Calories": "250 kcal",
            "Protein": "22g",
            "Carbs": "20g",
            "Fat": "6g",
            "Ingredients": "Chicken – 80g, capsicum – 30g, onion – 30g, spices – ½ tsp, ragi flour – 40g",
            "Benefits": "High-protein and fiber-rich; helps muscle retention and satiety."
          },
          {
            "Course": "Salad",
            "Item": "Cucumber Egg Yogurt Bowl",
            "Calories": "90 kcal",
            "Protein": "8g",
            "Carbs": "4g",
            "Fat": "3g",
            "Ingredients": "Boiled egg white – 2, cucumber – 30g, curd – 50g, cumin – pinch",
            "Benefits": "Probiotic and protein boost; improves gut health and controls hunger."
          }
        ]
      }
    },
    "DAY - 2": {
      "VEG MEAL": {
        "Lunch": [
          {
            "Course": "Starter",
            "Item": "Carrot Coconut Soup",
            "Calories": "90 kcal",
            "Protein": "2g",
            "Carbs": "10g",
            "Fat": "4g",
            "Ingredients": "Carrot – 60g, coconut – 10g, garlic – 1 clove, pepper – pinch, oil – 1 tsp",
            "Benefits": "Vitamin A + healthy fats; aids eye health and fullness."
          },
          {
            "Course": "Main",
            "Item": "Moong Dal Pulao (Brown Rice)",
            "Calories": "260 kcal",
            "Protein": "8g",
            "Carbs": "40g",
            "Fat": "6g",
            "Ingredients": "Brown rice – 60g, moong dal – 30g, spices – ½ tsp, oil – 1 tsp",
            "Benefits": "High fiber and protein combo; supports digestion and energy."
          },
          {
            "Course": "Salad",
            "Item": "Cucumber Mint Peanut Salad",
            "Calories": "100 kcal",
            "Protein": "4g",
            "Carbs": "9g",
            "Fat": "4g",
            "Ingredients": "Cucumber – 50g, mint – 5g, roasted peanuts – 10g, lemon – 1 tsp",
            "Benefits": "Cooling + crunchy; helps digestion and adds plant-based protein."
          }
        ],
        "Dinner": [
          {
            "Course": "Starter",
            "Item": "Bottle Gourd Soup",
            "Calories": "85 kcal",
            "Protein": "3g",
            "Carbs": "9g",
            "Fat": "3g",
            "Ingredients": "Bottle gourd – 70g, garlic – 2g, black pepper – pinch, oil – 1 tsp",
            "Benefits": "Cooling and high water content; supports liver health and hydration."
          },
          {
            "Course": "Main",
            "Item": "Ragi Roti + Aloo Methi Sabzi",
            "Calories": "240 kcal",
            "Protein": "6g",
            "Carbs": "34g",
            "Fat": "5g",
            "Ingredients": "Ragi flour – 40g, potato – 60g, methi – 20g, oil – 1 tsp, spices",
            "Benefits": "Complex carbs + iron-rich greens; supports fullness and bone health."
          },
          {
            "Course": "Salad",
            "Item": "Tomato Curd Salad",
            "Calories": "90 kcal",
            "Protein": "3g",
            "Carbs": "8g",
            "Fat": "3g",
            "Ingredients": "Tomato – 40g, curd – 80g, roasted cumin – pinch",
            "Benefits": "Probiotic and low-cal; improves digestion and balances acidity."
          }
        ]
      },
      "NON-VEG MEAL": {
        "Lunch": [
          {
            "Course": "Starter",
            "Item": "Chicken Tomato Shorba",
            "Calories": "100 kcal",
            "Protein": "12g",
            "Carbs": "4g",
            "Fat": "2g",
            "Ingredients": "Chicken – 60g, tomato – 50g, garlic – 1 clove, coriander – 5g, pepper – pinch",
            "Benefits": "Rich in lean protein and lycopene; supports immunity and digestion."
          },
          {
            "Course": "Main",
            "Item": "Foxtail Millet Chicken Bowl",
            "Calories": "270 kcal",
            "Protein": "22g",
            "Carbs": "26g",
            "Fat": "5g",
            "Ingredients": "Chicken – 80g, foxtail millet – 60g, capsicum – 30g, onion – 20g, oil – 1 tsp",
            "Benefits": "Balanced protein + fiber combo; aids in fat burn and sustained energy."
          },
          {
            "Course": "Salad",
            "Item": "Boiled Egg Tomato Mix",
            "Calories": "90 kcal",
            "Protein": "8g",
            "Carbs": "4g",
            "Fat": "3g",
            "Ingredients": "Boiled egg – 1, tomato – 40g, curd – 40g, salt – pinch",
            "Benefits": "High in protein and vitamins; promotes satiety and gut health."
          }
        ],
        "Dinner": [
          {
            "Course": "Starter",
            "Item": "Ginger Fish Broth",
            "Calories": "95 kcal",
            "Protein": "12g",
            "Carbs": "3g",
            "Fat": "2g",
            "Ingredients": "White fish – 60g, ginger – 2g, garlic – 1 clove, lemon – 1 tsp",
            "Benefits": "Rich in omega-3 and anti-inflammatory; promotes heart health and metabolism."
          },
          {
            "Course": "Main",
            "Item": "Chicken Curry + Multigrain Roti",
            "Calories": "250 kcal",
            "Protein": "20g",
            "Carbs": "20g",
            "Fat": "7g",
            "Ingredients": "Chicken – 80g, onion – 30g, tomato – 30g, spices – ½ tsp, multigrain flour – 40g",
            "Benefits": "Lean protein + whole grains; builds muscle and supports digestion."
          },
          {
            "Course": "Salad",
            "Item": "Lettuce Yogurt Chicken Salad",
            "Calories": "90 kcal",
            "Protein": "8g",
            "Carbs": "3g",
            "Fat": "3g",
            "Ingredients": "Boiled chicken – 50g, lettuce – 30g, curd – 50g, pepper – pinch",
            "Benefits": "Low-carb + probiotic; keeps you full and improves gut health."
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
            <p className="text-lg text-green-600 mb-8">Complete nutrition guide with detailed meal breakdowns</p>
            
            {/* Day and Meal Type Selectors */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
              <div className="flex gap-2">
                <button 
                  onClick={() => setSelectedDay("DAY - 1")}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                    selectedDay === "DAY - 1" 
                    ? 'bg-green-600 text-white shadow-md' 
                    : 'bg-green-100 text-green-800 hover:bg-green-200 hover:text-green-900'
                  }`}
                >
                  Day 1
                </button>
                <button 
                  onClick={() => setSelectedDay("DAY - 2")}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                    selectedDay === "DAY - 2" 
                    ? 'bg-green-600 text-white shadow-md' 
                    : 'bg-green-100 text-green-800 hover:bg-green-200 hover:text-green-900'
                  }`}
                >
                  Day 2
                </button>
              </div>
              
              <div className="flex gap-2">
                <button 
                  onClick={() => setSelectedMealType("VEG MEAL")}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                    selectedMealType === "VEG MEAL" 
                    ? 'bg-green-600 text-white shadow-md' 
                    : 'bg-green-100 text-green-800 hover:bg-green-200 hover:text-green-900'
                  }`}
                >
                  Vegetarian
                </button>
                <button 
                  onClick={() => setSelectedMealType("NON-VEG MEAL")}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                    selectedMealType === "NON-VEG MEAL" 
                    ? 'bg-green-600 text-white shadow-md' 
                    : 'bg-green-100 text-green-800 hover:bg-green-200 hover:text-green-900'
                  }`}
                >
                  Non-Vegetarian
                </button>
              </div>
            </div>

            {/* Current Selection Display */}
            <div className="flex justify-center gap-4">
              <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full font-medium">
                {selectedDay}
              </span>
              <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full font-medium">
                {selectedMealType}
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-green-50 p-4 rounded-lg text-center shadow-sm">
              <h4 className="text-lg font-medium text-green-700">Total Calories</h4>
              <p className="text-2xl font-bold text-green-800">{lunchTotals.calories + dinnerTotals.calories} kcal</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center shadow-sm">
              <h4 className="text-lg font-medium text-green-700">Total Protein</h4>
              <p className="text-2xl font-bold text-green-800">{lunchTotals.protein + dinnerTotals.protein}g</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center shadow-sm">
              <h4 className="text-lg font-medium text-green-700">Total Carbs</h4>
              <p className="text-2xl font-bold text-green-800">{lunchTotals.carbs + dinnerTotals.carbs}g</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center shadow-sm">
              <h4 className="text-lg font-medium text-green-700">Total Fat</h4>
              <p className="text-2xl font-bold text-green-800">{lunchTotals.fat + dinnerTotals.fat}g</p>
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="rounded-xl shadow-lg overflow-hidden mb-10 bg-white">
          <div className="p-6">
            <h2 className="text-3xl font-semibold text-green-800 text-center">Meal Plan Pricing</h2>
            <p className="text-green-600 text-center mt-2">Choose the plan that fits your lifestyle</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-green-200">
              <thead className="bg-green-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-green-700 uppercase tracking-wider">Duration</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-green-700 uppercase tracking-wider">Vegetarian<br/>(1 Meal/Day)</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-green-700 uppercase tracking-wider">Vegetarian<br/>(2 Meals/Day)</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-green-700 uppercase tracking-wider">Non-Vegetarian<br/>(1 Meal/Day)</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-green-700 uppercase tracking-wider">Non-Vegetarian<br/>(2 Meals/Day)</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-green-200">
                {pricingData.map((row, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap font-semibold text-gray-900">{row.duration}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-green-600 font-semibold">{row.veg1Meal}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-green-600 font-semibold">{row.veg2Meal}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-green-600 font-semibold">{row.nonVeg1Meal}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-green-600 font-semibold">{row.nonVeg2Meal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeightLossMealPlan;