import React from 'react';
import { motion } from 'framer-motion';
import { FaCheck, FaUtensils } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const WeightLossBanner = () => {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="relative py-12 bg-cover bg-center"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')" }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/30"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          {/* Text Content */}
          <div className="md:w-2/3 px-4 text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Lose Weight <span className="text-green-300">Naturally</span>
            </h1>
            
            <p className="text-lg mb-6 max-w-2xl">
              Science-backed nutrition plans tailored to your metabolism
            </p>
            
            <ul className="space-y-2 mb-6">
              {[
                "Personalized meal plans",
                "No extreme dieting",
                "Nutritionist guidance",
                "Sustainable results"
              ].map((item, index) => (
                <li key={index} className="flex items-center">
                  <FaCheck className="w-4 h-4 mr-2 text-green-300" />
                  {item}
                </li>
              ))}
            </ul>

            <button
              onClick={() => navigate('/meal-plans/weight-loss')}
              className="flex items-center bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-full transition-colors"
            >
              <FaUtensils className="mr-2" />
              View Meal Plans
            </button>
          </div>

          {/* Image */}
          <div className="md:w-1/3 mt-8 md:mt-0">
            <img 
              src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
              alt="Healthy eating"
              className="w-full h-auto rounded-lg shadow-lg border-2 border-white"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WeightLossBanner;