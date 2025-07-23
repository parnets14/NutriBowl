import React from 'react';
import { MissionAndVision } from '../Components/mission&vision';

import { Specialization } from '../Components/Specialization';
import { Solution } from '../Components/Solution';
import { Benefits } from '../Components/Benifits';
import ProblemsFaced from '../Components/stayFit/problemFaced';
import { useNavigate } from 'react-router-dom';

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
      <div className="max-w-7xl mx-auto mb-16 bg-green-700 rounded-xl p-8 text-white">
        <h2 className="text-3xl font-bold text-center mb-8">The Importance of Staying Fit</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-start mb-6">
              <div className="bg-green-600 p-2 rounded-full mr-4 mt-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Builds Self-Worth</h3>
                <p className="text-green-100">
                  Every workout, every healthy meal shapes not just your body but your self-worth. Discipline in fitness creates pride and self-respect that reflects in all areas of life.
                </p>
              </div>
            </div>
            <div className="flex items-start mb-6">
              <div className="bg-green-600 p-2 rounded-full mr-4 mt-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Enhances Mental Health</h3>
                <p className="text-green-100">
                  Exercise and clean eating reduce anxiety, improve sleep, and sharpen focus. A fit body supports a calm, clear, and resilient mind.
                </p>
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-start mb-6">
              <div className="bg-green-600 p-2 rounded-full mr-4 mt-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Prevents Lifestyle Diseases</h3>
                <p className="text-green-100">
                  Staying fit helps you avoid diseases like diabetes, hypertension, and obesity. Investing in your fitness today protects your freedom tomorrow.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-green-600 p-2 rounded-full mr-4 mt-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Enables Active Living</h3>
                <p className="text-green-100">
                  A fit body isn't just about muscles — it's about stamina, mobility, and enjoying life without limits. It empowers you to live actively and independently.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Common Problems */}
      <div className="max-w-7xl mx-auto mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Common Fitness Challenges We Solve</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            "Burnout from Overtraining",
            "Mental Blocks & Low Confidence",
            "Lack of Support or Guidance",
            "Inconsistency in Routine",
            "Lack of Clear Goals",
            "Poor Nutrition Choices"
          ].map((problem, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{problem}</h3>
              <p className="text-gray-600 text-sm">
                {problem === "Burnout from Overtraining" && "We design balanced meal plans that support recovery and sustainable training."}
                {problem === "Mental Blocks & Low Confidence" && "Proper nutrition builds both physical and mental strength."}
                {problem === "Lack of Support or Guidance" && "Our nutritionists and chefs provide expert guidance every step."}
                {problem === "Inconsistency in Routine" && "Daily meal delivery removes guesswork and keeps you on track."}
                {problem === "Lack of Clear Goals" && "We help define and support your specific fitness objectives."}
                {problem === "Poor Nutrition Choices" && "Delicious, healthy meals make good choices effortless."}
              </p>
            </div>
          ))}
        </div>
      </div>
     <ProblemsFaced/>
      {/* Solution */}
     <Solution />


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