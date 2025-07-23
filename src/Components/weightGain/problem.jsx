import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const WeightGainProblems = () => {
    const navigate=useNavigate()
  const problems = [
    {
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      title: "Poor Appetite & Skipped Meals",
      description: "Struggling to eat enough calories throughout the day"
    },
    {
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      title: "Fear of Unhealthy Fat Gain",
      description: "Worried about gaining fat instead of lean muscle"
    },
    {
      image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      title: "Fast Metabolism & Active Lifestyle",
      description: "Burning calories faster than you can consume them"
    },
    {
      image: "https://images.unsplash.com/photo-1556909114-4b5b6c8e6ca4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      title: "Lack of Consistent Support",
      description: "No guidance or accountability for your journey"
    },
    {
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      title: "Mental Block & Low Confidence",
      description: "Self-doubt and frustration with slow progress"
    },
    {
      image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      title: "Lack of Structured Plan",
      description: "No clear roadmap for effective weight gain"
    }
  ];

  return (
    <div className="py-16 bg-gradient-to-br from-green-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Common <span className="text-green-600">Weight Gain</span> Challenges
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            These are the most frequent obstacles people face when trying to gain healthy weight
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100 hover:border-green-200 group"
            >
              <div className="h-32 overflow-hidden relative">
                <img 
                  src={problem.image} 
                  alt={problem.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-4 relative">
                <div className="absolute -top-3 left-4 w-6 h-6 bg-green-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xs">{index + 1}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-1">{problem.title}</h3>
                <p className="text-gray-600 mb-3 text-sm leading-relaxed">{problem.description}</p>
                <button className="text-green-600 font-medium flex items-center gap-2 hover:text-green-700 transition-colors group-hover:translate-x-1 transform duration-200 text-sm">
                  Learn more <FaArrowRight className="text-xs" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button 
          onClick={()=>navigate("/meal-plans/weight-gain")}
           className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-4 px-10 rounded-full transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center gap-3 mx-auto">
            View Weight gain meal plan
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WeightGainProblems;