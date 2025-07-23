import React from "react";

const NutriBowlBanner = () => {
  return (
    <div 
      className="relative w-full bg-cover bg-center text-white"
      style={{ 
        backgroundImage: "url('plate-with.avif')",
        minHeight: "400px" // Added minimum height for better display
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 flex flex-col md:flex-row items-center justify-between">
        {/* Left Text Section */}
        <div className="w-full md:w-1/2 space-y-4 md:space-y-6 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-start space-y-4 md:space-y-0 md:space-x-4">
            <img
              src="/logo.png"
              alt="NutriBowl Logo"
              className="w-16 h-16 md:w-20 md:h-20" // Responsive logo sizing
            />
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
                Nutri<span className="text-green-500">Bowl</span>
              </h1>
              <p className="text-xs sm:text-sm md:text-base text-gray-200 mt-1 tracking-wide">
                HEALTHY EATS, TASTY TREATS!
              </p>
            </div>
          </div>

          <div className="mt-6 md:mt-8">
            <p className="text-lg sm:text-xl md:text-2xl font-semibold leading-tight">
              Want to achieve your <br className="hidden sm:block" />
              <span className="text-green-500 font-bold">WEIGHT LOSS</span>{" "}
              <br className="hidden sm:block" />
              goals without giving up tasty food?
            </p>
          </div>

          {/* Optional CTA Button */}
          <button className="mt-6 px-6 py-3 bg-green-600 hover:bg-green-700 rounded-full font-medium text-white transition duration-300 transform hover:scale-105">
            Discover Our Menu
          </button>
        </div>

        {/* Right Section - Could add an image or form here */}
        <div className="w-full md:w-1/2 mt-8 md:mt-0">
          {/* Placeholder for additional content */}
        </div>
      </div>
    </div>
  );
};

export default NutriBowlBanner;