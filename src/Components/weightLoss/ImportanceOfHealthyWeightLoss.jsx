import React, { useState } from "react";
import { FaHeartbeat, FaLeaf, FaBrain, FaRunning, FaSmile } from "react-icons/fa";
import { motion } from "framer-motion";

const BenefitCard = ({ icon, title, description, color, index }) => {
  return (
    <motion.div
      className="h-full bg-gray-800 rounded-xl p-6 transition-all hover:bg-gray-750"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
    >
      <div className={`text-3xl mb-4 ${color.replace('border-t', 'text')}`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </motion.div>
  );
};

const ImportanceOfHealthyWeightLoss = () => {
  const benefits = [
    {
      icon: <FaHeartbeat />,
      title: "Reduces Health Risks",
      description: "Lowers risk of heart disease, diabetes, and high blood pressure by improving cardiovascular health.",
      color: "text-red-400"
    },
    {
      icon: <FaLeaf />,
      title: "Sustainable Energy",
      description: "Balanced nutrition provides steady energy throughout the day without crashes from processed foods.",
      color: "text-green-400"
    },
    {
      icon: <FaBrain />,
      title: "Mental Clarity",
      description: "Proper nutrition supports brain function, improving focus and reducing brain fog.",
      color: "text-blue-400"
    },
    {
      icon: <FaRunning />,
      title: "Enhanced Mobility",
      description: "Reduced joint stress and increased stamina make physical activity more enjoyable.",
      color: "text-purple-400"
    },
    {
      icon: <FaSmile />,
      title: "Improved Confidence",
      description: "Achieving goals through healthy methods boosts self-esteem and positive body image.",
      color: "text-yellow-400"
    }
  ];

  return (
    <section className="relative py-16 md:py-20 bg-gray-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute inset-0 bg-[url('https://assets.website-files.com/5f9a190d9f0d3c5b15a6959e/5f9a2d7d7a3b1f0f8e9e9e9e_pattern.svg')] bg-repeat"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 mb-4 text-sm font-semibold text-green-400 bg-gray-800 rounded-full">
            HEALTH BENEFITS
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Importance of <span className="text-green-400">Healthy Weight Loss</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Losing weight the right way provides lasting benefits beyond just numbers on a scale
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {benefits.map((benefit, index) => (
            <BenefitCard 
              key={index}
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
              color={benefit.color}
              index={index}
            />
          ))}
          
          {/* Stats Card */}
          <div className="h-full bg-gray-800 rounded-xl p-6">
            <h3 className="text-2xl font-bold text-white mb-3">Why Healthy Matters</h3>
            <p className="text-gray-300 mb-4">
              Crash diets may show quick results but often lead to:
            </p>
            <ul className="space-y-2 text-gray-300 mb-6">
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-green-400 mt-2 mr-2"></span>
                <span>Muscle loss instead of fat</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-green-400 mt-2 mr-2"></span>
                <span>Nutrient deficiencies</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-green-400 mt-2 mr-2"></span>
                <span>Weight regain (yo-yo effect)</span>
              </li>
            </ul>
            <p className="text-green-400 text-sm">
              Our programs focus on 1-2 lbs/week loss for sustainable results
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gray-800 rounded-xl p-8 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
              <h3 className="text-2xl font-bold text-white mb-3">The NutriBowl Difference</h3>
              <p className="text-gray-300 mb-4">
                Our weight loss plans combine scientifically-balanced nutrition with delicious meals that:
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center text-gray-300">
                  <div className="w-3 h-3 rounded-full bg-green-400 mr-2"></div>
                  <span>Preserve muscle mass</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <div className="w-3 h-3 rounded-full bg-green-400 mr-2"></div>
                  <span>Boost metabolism</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <div className="w-3 h-3 rounded-full bg-green-400 mr-2"></div>
                  <span>Control cravings</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <div className="w-3 h-3 rounded-full bg-green-400 mr-2"></div>
                  <span>Provide micronutrients</span>
                </div>
              </div>
            </div>
            <div className="md:w-1/3">
              <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full transition">
                Start Your Journey
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImportanceOfHealthyWeightLoss;