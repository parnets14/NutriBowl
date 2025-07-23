import React from 'react';
import { motion } from 'framer-motion';

const problems = [
  {
    title: "Burnout from Overtraining",
    media: {
      type: "image",
      src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      alt: "Person exhausted from overtraining"
    },
    description: "Pushing too hard without proper recovery leads to fatigue and decreased performance."
  },
  {
    title: "Mental Blocks & Low Confidence",
    media: {
      type: "image",
      src: "https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      alt: "Person struggling with confidence during workout"
    },
    description: "Psychological barriers that prevent you from reaching your full potential."
  },
  {
    title: "Lack of Support or Guidance",
    media: {
      type: "image",
      src: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      alt: "Person training alone looking frustrated"
    },
    description: "Trying to navigate fitness without expert advice often leads to plateaus."
  },
  {
    title: "Inconsistency in Routine",
    media: {
      type: "image",
      src: "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      alt: "Person skipping workout"
    },
    description: "Sporadic workouts that prevent meaningful progress over time."
  },
  {
    title: "Lack of Clear Goals",
    media: {
      type: "image",
      src: "https://images.unsplash.com/photo-1495555687398-3f50d6e79e1e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      alt: "Person looking confused at gym"
    },
    description: "Without specific targets, motivation and direction quickly fade."
  },
  {
    title: "Poor Nutrition Choices",
    media: {
      type: "image",
      src: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      alt: "Unhealthy food choices"
    },
    description: "Undermining workouts with improper fueling and recovery nutrition."
  },
];

const MediaComponent = ({ media }) => {
  return (
    <div className="w-full h-48 bg-gray-100 overflow-hidden">
      <img
        src={media.src}
        alt={media.alt}
        className="w-full h-full object-cover"
        loading="lazy"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://via.placeholder.com/800x450?text=Image+Not+Found";
        }}
      />
    </div>
  );
};

const ProblemsFaced = () => {
  return (
    <section className="relative bg-gradient-to-b from-green-50 to-white py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 mb-4 text-sm font-semibold text-green-600 bg-green-100 rounded-full">
            FITNESS CHALLENGES
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            Common Problems in <span className="text-green-600">Staying Fit</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Understanding these challenges is the first step toward overcoming them
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl border border-green-100 shadow-sm hover:shadow-md transition-all overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <MediaComponent media={problem.media} />
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {problem.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3">{problem.description}</p>
                
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemsFaced;