import { FaCalendarAlt, FaCheck, FaDumbbell, FaLeaf, FaUtensils } from "react-icons/fa";
import { motion } from "framer-motion";

export const Specialization = () => {
  const specializations = [
    {
      title: "Customized Nutrition Plans",
      items: ["Weight Loss", "Weight Gain", "Muscle Building", "General Wellness and Fitness"],
      icon: <FaUtensils className="text-green-500" />
    },
    {
      title: "Monthly Subscription Meals",
      items: [
        "Fresh, calorie-counted meals delivered daily",
        "Flexible 1-month to annual plans",
        "Affordable pricing with meal slot options"
      ],
      icon: <FaCalendarAlt className="text-green-500" />
    },
    {
      title: "Chef-Curated Healthy Menus",
      items: [
        "No refined sugar or preservatives",
        "Balanced macro & micro nutrients",
        "Tasty, homestyle cooking with a healthy twist"
      ],
      icon: <FaLeaf className="text-green-500" />
    },
    {
      title: "Fitness-Centric Collaborations",
      items: [
        "Partnered with trainers & fitness centers",
        "Meal programs aligned with workouts",
        "Easy ordering & customer support"
      ],
      icon: <FaDumbbell className="text-green-500" />
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 mb-4 text-sm font-semibold text-green-600 bg-green-100 rounded-full">
            OUR EXPERTISE
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Our <span className="text-green-600">Specialization</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Tailored solutions for your health and wellness journey
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {specializations.map((special, index) => (
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
                  {special.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800">{special.title}</h3>
              </div>
              <ul className="space-y-3">
                {special.items.map((item, i) => (
                  <li key={i} className="flex items-start">
                    <FaCheck className="flex-shrink-0 w-4 h-4 text-green-500 mt-1 mr-3" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};