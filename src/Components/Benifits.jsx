"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const Benefits = () => {
  const [benefits, setBenefits] = useState([]);

  useEffect(() => {
    const fetchBenefits = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/benefits"); // Use env var for production
        const data = await res.json();
        setBenefits(data);
      } catch (error) {
        console.error("Failed to fetch benefits:", error);
      }
    };

    fetchBenefits();
  }, []);

  return (
    <section className="py-10 bg-gradient-to-b from-green-50 to-white">
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
              key={benefit._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-xl border border-green-50 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 bg-green-50 rounded-lg mr-4">
                  <img
                    src={`http://localhost:5001${benefit.icon}`}
                    alt={benefit.title}
                    className="w-8 h-8 object-cover rounded-md"
                  />
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
