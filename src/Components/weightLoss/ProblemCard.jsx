import React, { useState } from "react";
import { FaFire, FaHeartbeat, FaBalanceScale, FaUserMd, FaUsers, FaChartLine, FaLeaf, FaCalendarAlt, FaUtensils } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Solution } from "../Solution";

const ProblemCard = ({ icon, title, description, image, index, hoveredCard, setHoveredCard }) => {
  return (
    <motion.div
      className={`relative group overflow-hidden rounded-2xl h-full shadow-lg`}
      onMouseEnter={() => setHoveredCard(index)}
      onMouseLeave={() => setHoveredCard(null)}
      whileHover={{ y: -5 }}
    >
      <div className="h-full bg-white border border-gray-200 rounded-xl transition-all duration-300 group-hover:border-green-300 flex flex-col">
        {/* Image Section */}
        <div className="relative h-40 overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
            <div className={`text-2xl ${hoveredCard === index ? 'text-green-500' : 'text-white'} transition-colors duration-300`}>
              {React.cloneElement(icon, { className: "text-2xl" })}
            </div>
            <h3 className="ml-2 text-lg font-bold text-white">{title}</h3>
          </div>
        </div>
        
        {/* Text Section */}
        <div className="p-6 flex-grow">
          <p className="text-gray-600">{description}</p>
        </div>
        
        {/* Animated Bottom Border */}
        <div className={`absolute bottom-0 left-0 right-0 h-1 bg-green-500 transition-all duration-500 ${hoveredCard === index ? 'w-full' : 'w-0'}`}></div>
      </div>
    </motion.div>
  );
};



const WeightLossProblems = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();

  const problems = [
    {
      icon: <FaFire />,
      title: "Lack of Consistency",
      description: "Difficulty maintaining routines due to busy schedules or lack of immediate results",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    {
      icon: <FaHeartbeat />,
      title: "Emotional Eating",
      description: "Using food as comfort leading to unhealthy patterns and weight fluctuations",
      image: "https://images.unsplash.com/photo-1518459031867-a89b944bffe4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    {
      icon: <FaBalanceScale />,
      title: "Unrealistic Expectations",
      description: "Expecting rapid results leading to frustration and abandonment of plans",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    {
      icon: <FaUserMd />,
      title: "Generic Diets",
      description: "One-size-fits-all approaches that don't account for individual needs",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    }
  ];

  const solutions = [
    {
      icon: <FaUserMd />,
      title: "Personalized Nutrition",
      description: "Every bowl is tailored to your goals — whether it's weight loss, muscle gain, or balanced wellness.",
      color: "text-green-500"
    },
    {
      icon: <FaCalendarAlt />,
      title: "Subscription Meal Plans",
      description: "1-month to 1-year plans with calorie-counted, portion-controlled meals delivered daily.",
      color: "text-blue-500"
    },
    {
      icon: <FaUtensils />,
      title: "Tasty & Healthy",
      description: "Mindful meals that taste great and keep you on track — effortlessly.",
      color: "text-yellow-500"
    },
    {
      icon: <FaLeaf />,
      title: "We Handle Everything",
      description: "No cooking, no planning, no guesswork. Just eat, feel good, and let your body and mind align.",
      color: "text-purple-500"
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
    <section className="relative pt-10  bg-gradient-to-b from-green-50 to-white">
      <div className="relative z-10 container mx-auto px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 mb-4 text-sm font-semibold text-green-600 bg-green-100 rounded-full">
            WEIGHT LOSS CHALLENGES
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 leading-tight">
            Common <span className="text-green-600">Problems</span> Faced
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Understanding these challenges is the first step toward overcoming them
          </p>
        </motion.div>

        {/* Problem Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
            >
              <ProblemCard 
                icon={problem.icon}
                title={problem.title}
                description={problem.description}
                image={problem.image}
                index={index}
                hoveredCard={hoveredCard}
                setHoveredCard={setHoveredCard}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* NutriBowl Solution Section */}
  
     <Solution/>
        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >

        </motion.div>
      </div>
    </section>
  );
};

export default WeightLossProblems;