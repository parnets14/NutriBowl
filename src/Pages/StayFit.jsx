import React from 'react';
import { MissionAndVision } from '../Components/mission&vision';

import { Specialization } from '../Components/Specialization';
import { Solution } from '../Components/Solution';
import { Benefits } from '../Components/Benifits';
import ProblemsFaced from '../Components/stayFit/problemFaced';
import { useNavigate } from 'react-router-dom';
import Challenge from '../Components/Challenge';
const StayFit = () => {
    const navigate=useNavigate()
  return (
    <div className="bg-gradient-to-b from-green-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          <span className="text-green-600">HEALTHY EATS</span>, TASTY TREATS!
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          NutriBowl helps you stay fit with delicious, nutritionist-designed meals tailored to your goals.
        </p>
      </div>

      {/* Mission & Vision */}
      <MissionAndVision />
      {/* Benefits */}
      <Benefits />

      {/* Specialization */}
     <Specialization />

      {/* Importance of Staying Fit */}
      {/*  */}

      <Challenge/>
     <ProblemsFaced/>



      {/* CTA */}
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Transform Your Health?</h2>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Join thousands of satisfied customers who've made NutriBowl part of their healthy lifestyle.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          
          <button onClick={()=>navigate("/meal-plans/stay-fit")}
          className="border-2 border-green-600 text-green-600 hover:bg-green-50 font-bold py-3 px-8 rounded-lg transition-colors">
            View Meal Plans
          </button>
        </div>
      </div>
    </div>
  );
};

export default StayFit;