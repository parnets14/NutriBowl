import React from 'react';
import { motion } from 'framer-motion';
import { FaCheck } from 'react-icons/fa';

const WeightLossBanner = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 shadow-xl  border border-gray-700"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute inset-0 bg-[url('https://assets.website-files.com/5f9a190d9f0d3c5b15a6959e/5f9a2d7d7a3b1f0f8e9e9e9e_pattern.svg')] bg-repeat"></div>
      </div>

      <div className="container mx-auto px-6 py-12 md:py-16 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          {/* Text Content */}
          <div className="md:w-2/3 z-10 text-white px-4">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Lose Weight <span className="text-green-400">Naturally</span> and Sustainably
            </motion.h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-2xl">
              Science-backed nutrition plans tailored to your unique metabolism and lifestyle
            </p>
            
            <ul className="space-y-3 mb-8">
              {[
                "Personalized meal plans",
                "No extreme dieting",
                "Nutritionist guidance",
                "Balanced macros",
                "Sustainable results"
              ].map((item, index) => (
                <motion.li 
                  key={index}
                  className="flex items-center text-gray-300"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <FaCheck className="w-5 h-5 mr-3 text-green-400" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Image */}
          <motion.div 
            className="md:w-1/3 mt-12 md:mt-0 relative"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" 
              alt="Nutrition"
              className="w-full h-auto w-110 mx-auto rounded-xl border border-gray-700"
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default WeightLossBanner;