import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MealPlanNavigator = () => {
  const navigate = useNavigate();
  useEffect(()=>{
    window.scrollTo(0,0)
  })

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Choose Your <span className='text-green-600 '> Meal Plan</span></h2>
      
      <div className="flex flex-col md:flex-row gap-4">
        {/* Stay Fit Plan */}
        <div className="bg-green-50 p-6 rounded-lg border border-green-100">
          <h3 className="text-xl font-bold text-green-700 mb-2">Stay Fit Meal Plan</h3>
          <p className="text-gray-600 mb-4">Balanced meals to maintain your ideal weight</p>
          <button 
            onClick={() => navigate('/meal-plans/stay-fit')}
            className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded-lg transition-colors flex items-center"
          >
            View Stay Fit Plan
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Weight Loss Plan */}
        <div className="bg-green-50 p-6 rounded-lg border border-blue-100">
          <h3 className="text-xl font-bold text-green-700  mb-2">Weight Loss Plan</h3>
          <p className="text-gray-600 mb-4">Healthy meals for sustainable weight loss</p>
          <button 
            onClick={() => navigate('/meal-plans/weight-loss')}
            className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded-lg transition-colors flex items-center"
          >
            View Weight Loss Plan
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Weight Gain Plan */}
        <div className="bg-green-50 p-6 rounded-lg border border-orange-100">
          <h3 className="text-xl font-bold text-green-700  mb-2">Weight Gain Plan</h3>
          <p className="text-gray-600 mb-4">Nutrient-dense meals for healthy weight gain</p>
          <button 
            onClick={() => navigate('/meal-plans/weight-gain')}
            className="bg-green-500 hover:bg-green-600 text-white text-white font-medium py-2 px-6 rounded-lg transition-colors flex items-center"
          >
            View Weight Gain Plan
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MealPlanNavigator;