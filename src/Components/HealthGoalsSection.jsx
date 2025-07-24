import React from 'react';
import { FaWeight, FaRunning, FaChartLine, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const HealthGoalsSection = () => {
  const goals = [
    {
      icon: <FaWeight className="text-3xl" />,
      title: "Weight Loss",
      description: "Sustainable fat loss through balanced nutrition and lifestyle changes",
      route: "/weight-loss",
      features: [
        "Custom calorie plans",
        "Metabolism boost",
        "Fat-burning foods"
      ],
      bgColor: "from-blue-50 to-blue-100"
    },
    {
      icon: <FaRunning className="text-3xl" />,
      title: "Stay Fit",
      description: "Maintain your ideal weight with healthy habits",
      route: "/stay-fit",
      features: [
        "Maintenance nutrition",
        "Energy optimization",
        "Active lifestyle support"
      ],
      bgColor: "from-green-50 to-green-100"
    },
    {
      icon: <FaChartLine className="text-3xl" />,
      title: "Weight Gain",
      description: "Healthy muscle building with proper nutrition",
      route: "/weight-gain",
      features: [
        "Calorie-dense meals",
        "Muscle growth focus",
        "Strength nutrition"
      ],
      bgColor: "from-purple-50 to-purple-100"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 mb-4 text-sm font-semibold text-green-600 bg-green-100 rounded-full">
            ELEVATE YOUR HEALTH
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Achieve Your <span className="text-green-600">Health Goals</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Customized nutrition plans designed for your specific objectives and lifestyle
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {goals.map((goal, index) => (
            <GoalCard 
              key={index}
              icon={goal.icon}
              title={goal.title}
              description={goal.description}
              route={goal.route}
              features={goal.features}
              bgColor={goal.bgColor}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const GoalCard = ({ icon, title, description, route, features, bgColor, delay }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className={`bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300`}
    >
      <div className={`h-2 bg-gradient-to-r ${bgColor}`}></div>
      
      <div className="p-6 text-center">
        <div className="text-green-600 mb-4 mx-auto w-16 h-16 flex items-center justify-center bg-green-50 rounded-full">
          {icon}
        </div>
        
        <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
        <p className="text-gray-600 mb-6">{description}</p>
        
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-500 mb-3">PROGRAM INCLUDES:</h4>
          <ul className="space-y-2">
            {features.map((feature, i) => (
              <li key={i} className="flex items-center justify-center text-gray-700">
                <FaArrowRight className="text-green-500 mr-2 text-xs" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
        
        <button
          onClick={() => navigate(route)}
          className="group relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-medium text-green-600 border-2 border-green-600 rounded-full hover:text-white"
        >
          <span className="absolute left-0 block w-full h-0 transition-all bg-green-600 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
          <span className="relative transition-all duration-300 group-hover:text-white">
            Learn More
          </span>
        </button>
      </div>
    </motion.div>
  );
};

export default HealthGoalsSection;