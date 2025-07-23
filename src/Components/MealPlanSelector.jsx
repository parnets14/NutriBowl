import React, { useState } from "react";
import { FaHeart, FaBrain, FaSmile, FaSeedling, FaBalanceScale, FaLeaf } from "react-icons/fa";
import { motion } from "framer-motion";

const NutriBowl = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const features = [
    {
      icon: <FaHeart className="text-2xl" />,
      title: "Food that Heals, Not Just Fills",
      description: "Nourishing meals designed to support your body's natural healing processes",
      color: "text-red-400"
    },
    {
      icon: <FaBrain className="text-2xl" />,
      title: "Mental Clarity & Focus",
      description: "Brain-boosting nutrients to enhance cognitive function and productivity",
      color: "text-blue-400"
    },
    {
      icon: <FaSmile className="text-2xl" />,
      title: "Break the Cycle of Emotional Eating",
      description: "Learn mindful eating practices that address the root causes of cravings",
      color: "text-yellow-400"
    },
    {
      icon: <FaSeedling className="text-2xl" />,
      title: "Confidence through Consistency",
      description: "Build sustainable habits that create lasting transformation",
      color: "text-green-400"
    },
    {
      icon: <FaBalanceScale className="text-2xl" />,
      title: "Holistic Support for Your Mental Health",
      description: "Nutrition plans that support both physical and emotional wellbeing",
      color: "text-purple-400"
    },
    {
      icon: <FaLeaf className="text-2xl" />,
      title: "Reinvent Your Lifestyle, Not Just Your Diet",
      description: "Comprehensive approach that transforms your relationship with food",
      color: "text-emerald-400"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="relative py-16 md:py-20 overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute inset-0 bg-[url('https://assets.website-files.com/5f9a190d9f0d3c5b15a6959e/5f9a2d7d7a3b1f0f8e9e9e9e_pattern.svg')] bg-repeat"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 mb-4 text-sm font-semibold text-green-400 bg-green-900 bg-opacity-30 rounded-full">
            OUR PHILOSOPHY
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            Nutri<span className="text-green-400">Bowl</span> Approach
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Wholesome nutrition made simple and effortlessly accessible for everyone.
          </p>
        </motion.div>

        {/* Features Grid - Changed to 3 columns and adjusted card sizes */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`relative group overflow-hidden rounded-xl p-1 ${feature.color.replace('text', 'bg')} bg-opacity-20`}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="h-full bg-gray-900 bg-opacity-70 backdrop-blur-sm rounded-lg p-6 border border-gray-700 transition-all duration-500 group-hover:border-opacity-40">
                <div className="flex flex-col items-center text-center">
                  <div className={`mb-4 p-3 ${feature.color} bg-opacity-20 rounded-full transition-all duration-500 group-hover:bg-opacity-40`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-sm text-gray-300 mb-4">{feature.description}</p>
                  <div className={`absolute bottom-0 left-0 right-0 h-1 ${feature.color.replace('text', 'bg')} transition-all duration-500 ${hoveredCard === index ? 'w-full' : 'w-0'}`}></div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <button className="relative overflow-hidden group bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-10 rounded-full text-md transition-all duration-500 transform hover:scale-105 shadow-xl hover:shadow-2xl">
            <span className="relative z-10">Start Your Transformation Today</span>
            <span className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
          </button>
          <p className="mt-4 text-gray-400 text-sm">
            Join 10,000+ people who transformed their health with NutriBowl
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default NutriBowl;