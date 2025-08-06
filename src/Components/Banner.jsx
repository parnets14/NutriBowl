import React, { useEffect, useState } from "react";

const NutriBowlBanner = () => {
  const [banner, setBanner] = useState(null);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/banner");
        const data = await res.json();
        if (data.length > 0) {
          setBanner(data[0]); // Use first banner, or modify logic as needed
        }
      } catch (err) {
        console.error("Failed to fetch banner:", err);
      }
    };

    fetchBanner();
  }, []);

  if (!banner) {
    return null; // Or a loading spinner
  }

  return (
    <div
      className="relative w-full bg-cover bg-center text-white min-h-[300px] md:min-h-[200px]"
      style={{
        backgroundImage: `url(http://localhost:5001${banner.image})`,
      }}
    >
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-20 flex flex-col md:flex-row items-center justify-between">
        <div className="w-full md:w-1/2 space-y-4 md:space-y-6 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-start space-y-4 md:space-y-0 md:space-x-4">
            <img
              src="/logo.png"
              alt="NutriBowl Logo"
              className="w-24 h-24 md:w-32 md:h-32"
            />
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
                <span className="ml-2 font-bold text-green-600 tracking-wide [font-family:'Baloo_Bhai_2',cursive]">
                  {banner.title}
                </span>
              </h1>
              <p className="text-sm sm:text-base text-gray-200 mt-1 tracking-wide">
                {banner.subtitle}
              </p>
            </div>
          </div>

          <div className="mt-6 md:mt-8 space-y-4">
            <p className="text-lg sm:text-xl md:text-2xl font-semibold">
              {banner.description}
            </p>
            <ul className="space-y-2 text-left pl-5">
              {banner.points.map((point, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="text-green-500 font-bold mr-2">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="w-full md:w-1/2 mt-10 md:mt-0">
          {/* Optional right content */}
        </div>
      </div>
    </div>
  );
};

export default NutriBowlBanner;
