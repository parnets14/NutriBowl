import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";

export const MissionAndVision = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // loader state
  const [error, setError] = useState(null); // optional: for error handling

  useEffect(() => {
    const fetchMissionVision = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/missionvision");
        setData(res.data);
      } catch (err) {
        console.error("Failed to fetch mission and vision", err);
        setError("Unable to load mission and vision.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMissionVision();
  }, []);

  const mission = data.find((item) => item.title?.toLowerCase().includes("mission"));
  const vision = data.find((item) => item.title?.toLowerCase().includes("vision"));

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Our Mission & Vision
        </h2>

        {/* Loading Spinner */}
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <FaSpinner className="animate-spin text-green-500 text-4xl" />
          </div>
        ) : error ? (
          <div className="text-center text-red-500 font-semibold">{error}</div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {mission && (
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <svg
                      className="w-6 h-6 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{mission.title}</h3>
                </div>
                <p className="text-gray-600">{mission.description}</p>
              </div>
            )}

            {vision && (
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <svg
                      className="w-6 h-6 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{vision.title}</h3>
                </div>
                <p className="text-gray-600">{vision.description}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
