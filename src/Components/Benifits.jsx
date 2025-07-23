import { FaLeaf, FaBrain, FaHeart, FaSmile, FaBalanceScale, FaSeedling } from 'react-icons/fa';
import { motion } from 'framer-motion';

export const Benefits = () => {
  const benefits = [
    {
      title: "Food that Heals, Not Just Fills",
      description: "Nutrient-dense meals designed to nourish your body at a cellular level.",
      icon: <FaLeaf className="text-green-500" />
    },
    {
      title: "Mental Clarity & Focus",
      description: "Proper nutrition supports cognitive function and sustained mental energy.",
      icon: <FaBrain className="text-green-500" />
    },
    {
      title: "Break the Cycle of Emotional Eating",
      description: "Learn to fuel your body based on need rather than emotion.",
      icon: <FaHeart className="text-green-500" />
    },
    {
      title: "Confidence through Consistency",
      description: "Regular healthy eating builds self-esteem and body positivity.",
      icon: <FaSmile className="text-green-500" />
    },
    {
      title: "Holistic Support for Your Mental Health",
      description: "Nutrition that supports both physical and mental wellbeing.",
      icon: <FaBalanceScale className="text-green-500" />
    },
    {
      title: "Reinvent Your Lifestyle, Not Just Your Diet",
      description: "Sustainable changes that become second nature.",
      icon: <FaSeedling className="text-green-500" />
    }
  ];

  return (
    <section className="py-10  bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 mb-4 text-sm font-semibold text-green-600 bg-green-100 rounded-full">
            OUR BENEFITS
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Why Choose <span className="text-green-600">NutriBowl</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover the transformative power of personalized nutrition
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-xl border border-green-50 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 bg-green-50 rounded-lg mr-4">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800">{benefit.title}</h3>
              </div>
              <p className="text-gray-600">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};