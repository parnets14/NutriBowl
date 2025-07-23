import React, { useEffect, useState } from 'react';

const BMICalculator = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [bmiCategory, setBmiCategory] = useState('');
  const [showInfo, setShowInfo] = useState(false);
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [unit, setUnit] = useState('metric');

  useEffect(()=>{
    window.scrollTo(0,0)
  })

  const calculateBMI = () => {
    if (height && weight) {
      let heightInMeters;
      let weightInKg;
      
      if (unit === 'metric') {
        heightInMeters = height / 100;
        weightInKg = weight;
      } else {
        // Imperial units (inches and pounds)
        heightInMeters = height * 0.0254;
        weightInKg = weight * 0.453592;
      }
      
      const bmiValue = (weightInKg / (heightInMeters * heightInMeters)).toFixed(1);
      setBmi(bmiValue);

      if (bmiValue < 18.5) {
        setBmiCategory('Underweight');
      } else if (bmiValue >= 18.5 && bmiValue < 25) {
        setBmiCategory('Normal weight');
      } else if (bmiValue >= 25 && bmiValue < 30) {
        setBmiCategory('Overweight');
      } else {
        setBmiCategory('Obese');
      }
    }
  };

  const resetCalculator = () => {
    setHeight('');
    setWeight('');
    setAge('');
    setGender('');
    setBmi(null);
    setBmiCategory('');
  };

  const getBmiColor = () => {
    if (!bmi) return 'from-gray-200 to-gray-300';
    if (bmi < 18.5) return 'from-blue-400 to-blue-500';
    if (bmi >= 18.5 && bmi < 25) return 'from-green-500 to-green-600';
    if (bmi >= 25 && bmi < 30) return 'from-yellow-400 to-yellow-500';
    return 'from-red-500 to-red-600';
  };

  const getBmiRange = () => {
    if (!bmi) return '';
    if (bmi < 18.5) return '18.5';
    if (bmi >= 18.5 && bmi < 25) return '18.5 - 24.9';
    if (bmi >= 25 && bmi < 30) return '25 - 29.9';
    return '30+';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-600 to-emerald-700 p-6">
          <div className="flex items-center justify-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <h1 className="text-2xl font-bold text-white text-center">BMI Calculator</h1>
          </div>
          <p className="text-emerald-100 text-center mt-1">Understand your body mass index</p>
        </div>

        {/* Calculator Form */}
        <div className="p-6">
          <div className="space-y-4">
            {/* Unit Toggle */}
            <div className="flex justify-center">
              <div className="inline-flex rounded-md shadow-sm" role="group">
                <button
                  type="button"
                  onClick={() => setUnit('metric')}
                  className={`px-4 py-2 text-sm font-medium rounded-l-lg border ${unit === 'metric' ? 'bg-teal-600 text-white border-teal-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                >
                  Metric (cm/kg)
                </button>
                <button
                  type="button"
                  onClick={() => setUnit('imperial')}
                  className={`px-4 py-2 text-sm font-medium rounded-r-lg border ${unit === 'imperial' ? 'bg-teal-600 text-white border-teal-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                >
                  Imperial (in/lbs)
                </button>
              </div>
            </div>

            {/* Height Input */}
            <div>
              <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-1">
                Height ({unit === 'metric' ? 'cm' : 'inches'})
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="height"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-200"
                  placeholder={`Enter your height in ${unit === 'metric' ? 'centimeters' : 'inches'}`}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                  {unit === 'metric' ? 'cm' : 'in'}
                </div>
              </div>
            </div>

            {/* Weight Input */}
            <div>
              <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
                Weight ({unit === 'metric' ? 'kg' : 'lbs'})
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="weight"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-200"
                  placeholder={`Enter your weight in ${unit === 'metric' ? 'kilograms' : 'pounds'}`}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                  {unit === 'metric' ? 'kg' : 'lbs'}
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                  Age (optional)
                </label>
                <input
                  type="number"
                  id="age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-200"
                  placeholder="Enter your age"
                />
              </div>
              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                  Gender (optional)
                </label>
                <select
                  id="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-200"
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-2">
              <button
                onClick={calculateBMI}
                className="flex-1 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Calculate BMI
              </button>
              <button
                onClick={resetCalculator}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-4 rounded-lg transition duration-200 shadow-sm"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Results */}
          {bmi && (
            <div className="mt-6 space-y-4">
              <div className={`bg-gradient-to-r ${getBmiColor()} text-white rounded-xl p-6 text-center shadow-lg transform transition-all duration-300 hover:scale-[1.01]`}>
                <h3 className="text-lg font-semibold">Your BMI Score</h3>
                <p className="text-5xl font-bold my-3">{bmi}</p>
                <p className="text-xl font-medium mb-1">{bmiCategory}</p>
                <p className="text-sm opacity-90">Healthy range: {getBmiRange()}</p>
              </div>

              {/* BMI Scale Visualization */}
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <h4 className="font-medium text-gray-800 mb-3 text-center">BMI Scale</h4>
                <div className="h-6 rounded-full overflow-hidden bg-gray-200">
                  <div className="h-full flex">
                    <div className="bg-blue-500 w-1/5"></div>
                    <div className="bg-green-600 w-1/5"></div>
                    <div className="bg-yellow-500 w-1/5"></div>
                    <div className="bg-red-600 w-2/5"></div>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-gray-600 mt-1">
                  <span>Underweight</span>
                  <span>Normal</span>
                  <span>Overweight</span>
                  <span>Obese</span>
                </div>
              </div>

              {/* BMI Categories */}
              <div className="mt-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
                <h4 className="font-medium text-gray-800 mb-2">BMI Categories:</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-center p-2 hover:bg-gray-100 rounded-lg transition duration-150">
                    <span className="w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
                    <div>
                      <span className="font-medium">Underweight</span>: BMI less than 18.5
                      <p className="text-xs text-gray-500 mt-1">May indicate nutritional deficiency or other health issues</p>
                    </div>
                  </li>
                  <li className="flex items-center p-2 hover:bg-gray-100 rounded-lg transition duration-150">
                    <span className="w-3 h-3 bg-green-600 rounded-full mr-3"></span>
                    <div>
                      <span className="font-medium">Normal weight</span>: BMI 18.5–24.9
                      <p className="text-xs text-gray-500 mt-1">Associated with lowest health risk for most people</p>
                    </div>
                  </li>
                  <li className="flex items-center p-2 hover:bg-gray-100 rounded-lg transition duration-150">
                    <span className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></span>
                    <div>
                      <span className="font-medium">Overweight</span>: BMI 25–29.9
                      <p className="text-xs text-gray-500 mt-1">May indicate increased risk for certain conditions</p>
                    </div>
                  </li>
                  <li className="flex items-center p-2 hover:bg-gray-100 rounded-lg transition duration-150">
                    <span className="w-3 h-3 bg-red-600 rounded-full mr-3"></span>
                    <div>
                      <span className="font-medium">Obese</span>: BMI 30 or greater
                      <p className="text-xs text-gray-500 mt-1">Associated with higher risk of serious health conditions</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Info Button */}
          <div className="mt-6 text-center">
            <button
              onClick={() => setShowInfo(!showInfo)}
              className="text-teal-600 hover:text-teal-800 text-sm font-medium flex items-center justify-center mx-auto transition duration-200"
            >
              {showInfo ? 'Hide BMI Information' : 'Learn More About BMI'}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 ml-1 transition-transform duration-200 ${showInfo ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* BMI Information */}
          {showInfo && (
            <div className="mt-4 bg-teal-50 border border-teal-100 rounded-xl p-4 animate-fadeIn">
              <h4 className="font-medium text-teal-800 mb-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Understanding BMI
              </h4>
              <p className="text-sm text-gray-700 mb-2">
                Body Mass Index (BMI) is a simple calculation using a person's height and weight. The formula is BMI = kg/m² where kg is a person's weight in kilograms and m² is their height in meters squared.
              </p>
              <p className="text-sm text-gray-700 mb-2">
                BMI is a screening tool that may indicate whether a person is underweight, at a healthy weight, overweight, or obese. However, BMI is not a diagnostic tool and doesn't directly measure body fat or health.
              </p>
              <p className="text-sm text-gray-700">
                Factors like muscle mass, bone density, and ethnic differences can affect how BMI relates to health. Athletes may have a high BMI due to increased muscle mass rather than fat. Older adults may have more body fat than younger adults with the same BMI.
              </p>
              
              <div className="mt-3 p-3 bg-white rounded-lg border border-gray-200">
                <h5 className="font-medium text-gray-800 text-sm mb-1">BMI Limitations</h5>
                <ul className="text-xs text-gray-700 space-y-1 list-disc list-inside">
                  <li>Doesn't distinguish between muscle and fat</li>
                  <li>Doesn't account for body fat distribution</li>
                  <li>May not be accurate for certain ethnic groups</li>
                  <li>Less accurate for very tall or short individuals</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-800 px-6 py-4">
          <p className="text-xs text-gray-300 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Note: This calculator is for informational purposes only. Consult a healthcare provider for health advice.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BMICalculator;