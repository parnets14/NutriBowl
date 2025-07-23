import React, { useState, useEffect } from "react";

const experts = [
  {
    name: "Dr. Neha Sharma",
    title: "Certified Nutritionist",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    bio: "10+ years helping clients achieve healthy lifestyles through balanced nutrition.",
  },
  {
    name: "Raj Mehta",
    title: "Fitness Coach",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    bio: "Expert in strength training and weight management for all body types.",
  },
  {
    name: "Anjali Verma",
    title: "Dietitian & Wellness Coach",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    bio: "Focused on holistic health through food, mindset, and routine.",
  },
  {
    name: "Dr. Arjun Patel",
    title: "Sports Nutritionist",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1528&q=80",
    bio: "Specializing in performance nutrition for athletes and active individuals.",
  },
  {
    name: "Priya Khanna",
    title: "Yoga & Wellness Expert",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80",
    bio: "Combining ancient yoga practices with modern nutritional science.",
  },
];

const MeetOurExperts = () => {
  const [visibleCards, setVisibleCards] = useState(3);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoSlide, setAutoSlide] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setVisibleCards(3); // xl screens - 3 cards
      } else if (window.innerWidth >= 768) {
        setVisibleCards(2); // md screens - 2 cards
      } else {
        setVisibleCards(1); // mobile - 1 card
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!autoSlide) return;
    
    const slideInterval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(slideInterval);
  }, [autoSlide, currentIndex, visibleCards]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex + visibleCards >= experts.length ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? experts.length - visibleCards : prevIndex - 1
    );
  };

  const visibleExperts = experts.slice(
    currentIndex,
    currentIndex + visibleCards
  );

  // If we're at the end and don't have enough cards to fill the view
  const remainingCards = visibleCards - visibleExperts.length;
  if (remainingCards > 0) {
    visibleExperts.push(...experts.slice(0, remainingCards));
  }

  return (
    <div className="py-16 bg-[#f8fff2] px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
      <h2 className="text-3xl md:text-4xl font-bold mb-10 text-[#2a5b45]">Meet Our Experts</h2>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={() => {
            setAutoSlide(false);
            prevSlide();
          }}
          onMouseEnter={() => setAutoSlide(false)}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 text-white bg-[#4CAF50] rounded-full hover:bg-[#3e8e41] focus:outline-none shadow-md"
          aria-label="Previous experts"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto max-w-6xl"
          onMouseEnter={() => setAutoSlide(false)}
          onMouseLeave={() => setAutoSlide(true)}
        >
          {visibleExperts.map((expert, idx) => (
            <div 
              key={`${expert.name}-${idx}`} 
              className="bg-white p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
            >
              <img
                src={expert.image}
                alt={expert.name}
                className="w-32 h-32 rounded-full mx-auto object-cover mb-4 border-4 border-[#4CAF50]"
              />
              <h3 className="text-xl font-semibold text-[#2a5b45]">{expert.name}</h3>
              <p className="text-sm text-[#4CAF50] italic font-medium">{expert.title}</p>
              <p className="mt-4 text-gray-700">{expert.bio}</p>
              <div className="mt-4 flex justify-center space-x-2">
                <a href="#" className="text-[#4CAF50] hover:text-[#3e8e41]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                  </svg>
                </a>
                <a href="#" className="text-[#4CAF50] hover:text-[#3e8e41]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z"/>
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

        <button 
          onClick={() => {
            setAutoSlide(false);
            nextSlide();
          }}
          onMouseEnter={() => setAutoSlide(false)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 text-white bg-[#4CAF50] rounded-full hover:bg-[#3e8e41] focus:outline-none shadow-md"
          aria-label="Next experts"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Mobile indicators */}
        <div className="flex justify-center mt-6 space-x-2 md:hidden">
          {Array.from({ length: Math.ceil(experts.length / visibleCards) }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setAutoSlide(false);
                setCurrentIndex(idx * visibleCards);
              }}
              className={`w-3 h-3 rounded-full ${Math.floor(currentIndex / visibleCards) === idx ? 'bg-[#4CAF50]' : 'bg-gray-300'}`}
              aria-label={`Go to expert group ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MeetOurExperts;