import React from "react";

const NutriBowlBanner = () => {
  return (
    <div
      className="relative w-full bg-cover bg-center text-white min-h-[400px] md:min-h-[500px]"
      style={{ backgroundImage: "url('plate-with.avif')" }}
    >
      {/* Overlay for better text readability */}
      {/* <div className="absolute inset-0 bg-black bg-opacity-40"></div> */}
      
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-20 flex flex-col md:flex-row items-center justify-between">
        {/* Left Text Section */}
        <div className="w-full md:w-1/2 space-y-4 md:space-y-6 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-start space-y-4 md:space-y-0 md:space-x-4">
            <img
              src="/logo.png"
              alt="NutriBowl Logo"
              className="w-24 h-24 md:w-32 md:h-32"
            />
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
                Nutri<span className="text-green-500">Bowl</span>
              </h1>
              <p className="text-sm sm:text-base text-gray-200 mt-1 tracking-wide">
                HEALTHY EATS, TASTY TREATS!
              </p>
            </div>
          </div>

   <div className="mt-6 md:mt-8 space-y-4">
  <p className="text-lg sm:text-xl md:text-2xl font-semibold">
    Achieve your health goals with tasty food:
  </p>
  <ul className="space-y-2 text-left pl-5">
    <li className="flex items-center gap-2">
      <span className="text-green-500 font-bold mr-2">•</span>
      <span className="font-medium">Weight Loss</span> without starvation
    </li>
    <li className="flex items-center gap-2">
      <span className="text-green-500 font-bold mr-2">•</span>
      <span className="font-medium">Weight Gain</span> the healthy way
    </li>
    <li className="flex items-center gap-2">
      <span className="text-green-500 font-bold mr-2">•</span>
      <span className="font-medium">Stay Fit </span>  <span> while enjoying every bite</span>
    </li>
  </ul>
</div>

          {/* Optional CTA Button */}
          <button className="mt-6 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full text-sm sm:text-base transition duration-300 transform hover:scale-105">
            Discover Our Menu
          </button>
        </div>

        {/* Right Section - Could add an image or form here */}
        <div className="w-full md:w-1/2 mt-10 md:mt-0">
          {/* Placeholder for additional content */}
        </div>
      </div>
    </div>
  );
};

export default NutriBowlBanner;