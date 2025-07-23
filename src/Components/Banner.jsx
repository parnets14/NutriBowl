import React from "react";

const NutriBowlBanner = () => {
  return (
    <div
     className="relative w-full bg-cover  bg-center text-white"
      style={{ backgroundImage: "url('plate-with.avif')" }}>
    <div className="w-full b text-white py-10 p-5 flex flex-col md:flex-row items-center justify-between">
      {/* Left Text Section */}
      <div className="md:w-1/2 space-y-6 text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start space-x-3">
          <img
            src="/logo.png" // Replace with your actual logo path
            alt="NutriBowl Logo"
            className="w-50 h-50"
          />
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white">
              Nutri<span className="text-green-500">Bowl</span>
            </h1>
            <p className="text-sm md:text-base text-gray-300 mt-1 tracking-wide">
              HEALTHY EATS, TASTY TREATS !
            </p>
          </div>
        </div>

        <div className="mt-8">
          <p className="text-lg md:text-2xl font-semibold">
            Want to achieve your <br />
            <span className="text-green-500 font-bold">WEIGHT LOSS</span>{" "}
            <br />
            goals without giving up tasty food?
          </p>
        </div>
      </div>

      

    </div></div>
  );
};

export default NutriBowlBanner;
