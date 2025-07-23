import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCheck, FaRunning, FaFireAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const StayFitBanner = () => {
  const navigate = useNavigate();
  useEffect(()=>{
    window.scrollTo(0,0)
  },[])

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="relative py-8 bg-cover bg-center overflow-hidden min-h-[300px]"
      style={{ 
        backgroundImage: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80')",
        backgroundPosition: "center 30%"
      }}
    >
      <div className="container mx-auto px-4 relative z-10 h-full flex items-center">
        <div className="flex flex-col md:flex-row items-center justify-between w-full">
          {/* Text Content */}
          <div className="md:w-2/3 text-white">
            <div className="flex items-center mb-2">
              <FaFireAlt className="text-orange-400 mr-2 text-xl" />
              <h1 className="text-3xl md:text-4xl font-bold">
                Fuel Your <span className="text-green-400">Fitness</span> Journey
              </h1>
            </div>
            
            <p className="text-lg mb-4 max-w-xl font-medium text-gray-100">
              Optimized nutrition plans tailored for your workout goals
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {[
                { text: "Muscle-building meals", icon: "💪" },
                { text: "Post-workout recovery", icon: "🔄" },
                { text: "Energy-packed recipes", icon: "⚡" },
                { text: "Athlete-approved nutrition", icon: "🏆" }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg p-2"
                >
                  <span className="mr-2">{item.icon}</span>
                  <span className="text-sm font-medium">{item.text}</span>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => navigate('/meal-plans/stay-fit')}
                className="flex items-center justify-center bg-green-600 hover:bg-green-500 text-white font-medium py-3 px-6 rounded-full text-sm transition-all hover:scale-105 shadow-lg w-full sm:w-auto"
              >
                <FaRunning className="mr-2" />
                View Meal Plans
              </button>
              
            </div>
          </div>

          {/* Image - Only visible on larger screens */}
          <div className="hidden lg:block w-1/3">
            <motion.img 
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
              alt="Fitness nutrition"
              className="w-full h-auto max-w-md rounded-xl border-4 border-white/20 shadow-2xl"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StayFitBanner;