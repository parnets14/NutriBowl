import React from 'react';

const AboutUs = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 via-gray-900 to-black overflow-hidden">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80')] bg-cover bg-center opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-900/30 to-gray-900/80"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center p-6 md:p-12 max-w-6xl mx-auto">
        {/* Text Section */}
        <div className="md:w-3/5 p-6 md:p-8 transform transition duration-700 hover:scale-[1.02]">
          <h2 className="text-4xl md:text-5xl font-bold uppercase text-green-900  mb-6 animate-fade-in-down bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">
            Your Nutrition Journey Starts Here
          </h2>
          <p className="text-gray-200 text-base md:text-lg leading-relaxed mb-4 animate-fade-in-up delay-100">
            At NutriBowl, we believe healthy eating should be simple, satisfying, and sustainable. 
            Founded in 2018 by nutritionist Sarah Chen and chef Michael Rodriguez, we've helped 
            over 50,000 customers achieve their health goals through personalized meal plans.
          </p>
          <p className="text-gray-200 text-base md:text-lg leading-relaxed mb-4 animate-fade-in-up delay-200">
            Our science-backed approach combines:
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Macro-balanced meals designed by certified dietitians</li>
              <li>Chef-crafted recipes that actually taste delicious</li>
              <li>Flexible plans for weight loss, muscle gain, or maintenance</li>
              <li>100% organic ingredients sourced from local farmers</li>
            </ul>
          </p>
          <p className="text-gray-200 text-base md:text-lg leading-relaxed animate-fade-in-up delay-300">
            Whether you're a busy professional, fitness enthusiast, or someone just starting their 
            wellness journey, we make it easy to eat right without the hassle of meal prep or guesswork.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8 animate-fade-in-up delay-400">
            <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white font-medium rounded-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              Explore Meal Plans
            </button>
            <button className="px-6 py-3 bg-transparent border-2 border-green-400 text-green-400 font-medium rounded-full hover:bg-green-400/10 transition-all duration-300">
              Meet Our Team
            </button>
          </div>
        </div>

        {/* Image Section */}
        <div className="md:w-2/5 p-4 transform transition duration-700 hover:scale-[1.02] flex justify-center">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80"
              alt="Nutritionist consulting a client"
              className="w-full h-auto rounded-xl shadow-2xl border-4 border-white/10 animate-fade-in-right"
            />
            <div className="absolute -bottom-5 -right-5 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg">
              <p className="text-sm font-semibold text-gray-800">Sarah Chen</p>
              <p className="text-xs text-gray-600">Co-Founder & Head Nutritionist</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;