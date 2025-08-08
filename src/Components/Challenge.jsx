import React, { useEffect, useState } from "react";
import axios from "axios";

const Challenge = () => {
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/challenges");
        setChallenges(response.data); // Make sure your API returns an array of objects
      } catch (error) {
        console.error("Error fetching challenges:", error);
      }
    };

    fetchChallenges();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
        Common Fitness Challenges We Solve
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {challenges.map((challenge, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {challenge.title}
            </h3>
            <p className="text-gray-600 text-sm">{challenge.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Challenge;
