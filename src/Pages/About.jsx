import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AboutUs = () => {
  const navigate = useNavigate();
  const [aboutData, setAboutData] = useState({
    title: "Your Nutrition Journey Starts Here",
    paragraphs: [
      "At NutriBowl, we believe healthy eating should be simple, satisfying, and sustainable. Founded in 2018 by nutritionist Sarah Chen and chef Michael Rodriguez, we've helped over 50,000 customers achieve their health goals through personalized meal plans.",
      "Our science-backed approach combines:",
      "Whether you're a busy professional, fitness enthusiast, or someone just starting their wellness journey, we make it easy to eat right without the hassle of meal prep or guesswork."
    ],
    bulletPoints: [
      "Macro-balanced meals designed by certified dietitians",
      "Chef-crafted recipes that actually taste delicious",
      "Flexible plans for weight loss, muscle gain, or maintenance",
      "100% organic ingredients sourced from local farmers"
    ],
    teamMembers: [
      {
        name: "Sarah Chen",
        role: "Co-Founder & Head Nutritionist",
        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
      },
      {
        name: "Michael Rodriguez",
        role: "Co-Founder & Executive Chef", 
        image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
      }
    ],
    buttonText: "Explore Meal Plans"
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = "http://localhost:5001/api/about";

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(API_URL);
      
      if (response.data && response.data.success) {
        const data = response.data.data;
        setAboutData({
          title: data.title || aboutData.title,
          paragraphs: data.paragraphs || aboutData.paragraphs,
          bulletPoints: data.bulletPoints || aboutData.bulletPoints,
          teamMembers: data.teamMembers || aboutData.teamMembers,
          buttonText: data.buttonText || aboutData.buttonText
        });
      }
    } catch (error) {
      console.error('Error fetching about data:', error);
      setError('Failed to load content');
      // Keep default data on error
    } finally {
      setIsLoading(false);
    }
  };

  const handleButtonClick = () => {
    navigate("/allmealPlan");
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 via-gray-900 to-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-500 mx-auto"></div>
          <p className="text-white mt-4 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 via-gray-900 to-black overflow-hidden">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80')] bg-cover bg-center opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-900/30 to-gray-900/80"></div>
      </div>

      {/* Error notification */}
      {error && (
        <div className="absolute top-4 right-4 z-50 bg-red-500/90 backdrop-blur-sm text-white px-4 py-2 rounded-lg shadow-lg">
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center p-6 md:p-12 max-w-6xl mx-auto">
        {/* Text Section */}
        <div className="md:w-3/5 p-6 md:p-8 transform transition duration-700 hover:scale-[1.02]">
          <h2 className="text-4xl md:text-5xl font-bold uppercase text-green-900 mb-6 animate-fade-in-down bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">
            {aboutData.title}
          </h2>
          
          {/* Dynamic Paragraphs */}
          {aboutData.paragraphs && aboutData.paragraphs.map((paragraph, index) => {
            // Check if this is the paragraph that introduces bullet points
            const isBulletIntro = paragraph.toLowerCase().includes('approach combines') || 
                                 paragraph.toLowerCase().includes('our science-backed');
            
            return (
              <div key={index}>
                <p className={`text-gray-200 text-base md:text-lg leading-relaxed mb-4 animate-fade-in-up delay-${(index + 1) * 100}`}>
                  {paragraph}
                </p>
                
                {/* Add bullet points after the introductory paragraph */}
                {isBulletIntro && aboutData.bulletPoints && aboutData.bulletPoints.length > 0 && (
                  <ul className={`list-disc pl-5 mt-2 mb-4 space-y-1 text-gray-200 animate-fade-in-up delay-${(index + 2) * 100}`}>
                    {aboutData.bulletPoints.map((point, bulletIndex) => (
                      <li key={bulletIndex} className="text-base md:text-lg leading-relaxed">
                        {point}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}

          {/* Dynamic Button */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 animate-fade-in-up delay-400">
            <button
              onClick={handleButtonClick}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white font-medium rounded-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              {aboutData.buttonText}
            </button>
          </div>
        </div>

        {/* Dynamic Team Members Section */}
        <div className="md:w-2/5 p-4 transform transition duration-700 hover:scale-[1.02] flex flex-col gap-8">
          {aboutData.teamMembers && aboutData.teamMembers.length > 0 ? (
            aboutData.teamMembers.map((member, index) => (
              <div key={index} className="relative">
                <img
                  src={member.image || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"}
                  alt={member.name}
                  className={`w-full h-auto rounded-xl shadow-2xl border-4 border-white/10 animate-fade-in-right ${index > 0 ? 'delay-100' : ''}`}
                  onError={(e) => {
                    // Fallback image if the main image fails to load
                    e.target.src = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80";
                  }}
                />
                <div className="absolute -bottom-5 -right-5 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg">
                  <p className="text-sm font-semibold text-gray-800">{member.name}</p>
                  <p className="text-xs text-gray-600">{member.role}</p>
                </div>
              </div>
            ))
          ) : (
            // Fallback if no team members
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                alt="Team"
                className="w-full h-auto rounded-xl shadow-2xl border-4 border-white/10 animate-fade-in-right"
              />
              <div className="absolute -bottom-5 -right-5 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg">
                <p className="text-sm font-semibold text-gray-800">Our Team</p>
                <p className="text-xs text-gray-600">Nutrition Experts</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-fade-in-down {
          animation: fade-in-down 0.8s ease-out;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
        
        .animate-fade-in-right {
          animation: fade-in-right 0.8s ease-out;
        }
        
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
        .delay-400 { animation-delay: 400ms; }
      `}</style>
    </div>
  );
};

export default AboutUs;