"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Calendar, Utensils, ClipboardList } from "lucide-react";

const API_URL = "http://localhost:5001/api/solutions"; // Adjust for production

const iconMap = {
  "check-circle": <CheckCircle className="w-6 h-6 text-green-600" />,
  "calendar": <Calendar className="w-6 h-6 text-green-600" />,
  "utensils": <Utensils className="w-6 h-6 text-green-600" />,
  "clipboard-list": <ClipboardList className="w-6 h-6 text-green-600" />,
};

export const Solution = () => {
  const [solutions, setSolutions] = useState([]);

  useEffect(() => {
    const fetchSolutions = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setSolutions(data);
      } catch (err) {
        console.error("Error fetching solutions:", err);
      }
    };

    fetchSolutions();
  }, []);

  // Split the solutions into two columns
  const midIndex = Math.ceil(solutions.length / 2);
  const firstCol = solutions.slice(0, midIndex);
  const secondCol = solutions.slice(midIndex);

  return (
    <section>
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-xl p-8 mb-16">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-2 mb-4 text-sm font-semibold text-green-600 bg-green-100 rounded-full">
              WE ARE NUTRIBOWL
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6 leading-tight">
              The <span className="text-green-600">Solution</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed">
              At NutriBowl, we solve the real struggles people face with food, weight management, and consistency.
              More than food — it's your partner in sustainable health and transformation.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {[firstCol, secondCol].map((col, colIndex) => (
            <div key={colIndex} className="space-y-6">
              {col.map((solution) => (
                <div key={solution._id} className="flex items-start">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    {iconMap[solution.icon] || <CheckCircle className="w-6 h-6 text-green-600" />}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{solution.title}</h3>
                    <p className="text-gray-600">{solution.description}</p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-xl text-gray-700 font-medium">
            NutriBowl is more than food — it's your partner in sustainable health and transformation.
          </p>
        </div>
      </div>
    </section>
  );
};
