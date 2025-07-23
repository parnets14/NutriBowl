import React from "react";
import { FaBrain, FaShieldAlt, FaMeh, FaBolt } from "react-icons/fa";
import { motion } from "framer-motion";

const BenefitCard = ({ icon, title, description, index }) => {
  return (
    <motion.div
      className="h-full bg-white border border-green-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
    >
      <div className="text-3xl mb-4 text-green-500">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

const ImportanceOfHealthyWeightLoss = () => {
  const benefits = [
    {
      icon: <FaBrain />,
      title: "A Stronger Body Begins with a Healthier Mind",
      description: "Losing excess weight releases 'happy hormones' like dopamine and serotonin — reducing anxiety, depression, and mood swings.",
    },
    {
      icon: <FaShieldAlt />,
      title: "Your Health is Your Freedom",
      description: "Every kilo lost is a step away from lifestyle diseases like diabetes, blood pressure, joint pain, and fatigue.",
    },
    {
      icon: <FaMeh />,
      title: "Psychological Impact of Being Overweight",
      description: "Many suffer silently from body image issues that damage confidence and relationships. NutriBowl helps break that emotional cycle — healing starts with food, routine, and support.",
    },
    {
      icon: <FaBolt />,
      title: "Motivation to Choose Change Today",
      description: "NutriBowl is not a diet — it's a lifestyle transformation that supports you physically and mentally every day.",
    },
  ];

  return (
    <section className="relative py-16 md:py-20 bg-gradient-to-b from-green-50 to-white">
      <div className="relative z-10 container mx-auto px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 mb-4 text-sm font-semibold text-green-600 bg-green-100 rounded-full">
            HEALTH BENEFITS
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Importance of <span className="text-green-600">Healthy Weight Loss</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
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
              index={index}
            />
          ))}

          {/* Stats Card */}
          <div className="h-full bg-white border border-green-50 rounded-xl p-6 shadow-sm">
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Why Healthy Matters</h3>
            <p className="text-gray-600 mb-4">
              Crash diets may show quick results but often lead to:
            </p>
            <ul className="space-y-2 text-gray-600 mb-6">
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-green-500 mt-2 mr-2"></span>
                <span>Muscle loss instead of fat</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-green-500 mt-2 mr-2"></span>
                <span>Nutrient deficiencies</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-green-500 mt-2 mr-2"></span>
                <span>Weight regain (yo-yo effect)</span>
              </li>
            </ul>
            <p className="text-green-600 text-sm font-medium">
              Our programs focus on 1-2 lbs/week loss for sustainable results
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-white border border-green-50 rounded-xl p-8 max-w-4xl mx-auto shadow-sm">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-3">The NutriBowl Difference</h3>
              <p className="text-gray-600 mb-4">
                Our weight loss plans combine scientifically-balanced nutrition with delicious meals that:
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center text-gray-600">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span>Preserve muscle mass</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span>Boost metabolism</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span>Control cravings</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span>Provide micronutrients</span>
                </div>
              </div>
            </div>
            <div className="md:w-1/3">
              <button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-6 rounded-full transition-all shadow-md hover:shadow-lg">
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
