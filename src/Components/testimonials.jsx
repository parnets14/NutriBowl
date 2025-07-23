import React, { useState, useEffect } from "react";

const testimonials = [
  {
    name: "Priya Singh",
    feedback: "Nutri Bowl completely transformed my life! I lost 8 kg in 3 months and feel more energetic than ever.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80",
  },
  {
    name: "Karan Patel",
    feedback: "The personalized meal plan and daily tracking helped me stay consistent and motivated.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
  },
  {
    name: "Simran Kaur",
    feedback: "Great support from the coaches! I now understand what healthy eating really means.",
    image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
  },
  {
    name: "Rahul Sharma",
    feedback: "The recipes are delicious and easy to make. Never thought healthy food could taste this good!",
    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  },
  {
    name: "Ananya Gupta",
    feedback: "My energy levels have doubled since I started following Nutri Bowl's recommendations.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80",
  },
  {
    name: "Vikram Joshi",
    feedback: "As a busy professional, the meal prep guides have saved me so much time while keeping me healthy.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
  },
];

const Testimonials = () => {
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
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + visibleCards;
      return nextIndex >= testimonials.length ? 0 : nextIndex;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      const prevIndexNew = prevIndex - visibleCards;
      return prevIndexNew < 0 ? testimonials.length - visibleCards : prevIndexNew;
    });
  };

  const getVisibleTestimonials = () => {
    let endIndex = currentIndex + visibleCards;
    if (endIndex > testimonials.length) {
      const remaining = endIndex - testimonials.length;
      return [...testimonials.slice(currentIndex), ...testimonials.slice(0, remaining)];
    }
    return testimonials.slice(currentIndex, endIndex);
  };

  const visibleTestimonials = getVisibleTestimonials();

  return (
    <div className="py-16 bg-green-50 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
      <h2 className="text-3xl md:text-4xl font-bold text-[#2a5b45] mb-12">
        What Our Clients Say
      </h2>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Left Navigation Button */}
        {testimonials.length > visibleCards && (
          <button 
            onClick={() => {
              setAutoSlide(false);
              prevSlide();
            }}
            onMouseEnter={() => setAutoSlide(false)}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 text-white bg-[#4CAF50] rounded-full hover:bg-[#3e8e41] focus:outline-none shadow-md hidden sm:block"
            aria-label="Previous testimonials"
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
        )}

        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto max-w-6xl"
          onMouseEnter={() => setAutoSlide(false)}
          onMouseLeave={() => setAutoSlide(true)}
        >
          {visibleTestimonials.map((item, idx) => (
            <div 
              key={`${item.name}-${idx}`} 
              className="bg-white p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg hover:scale-[1.02] flex flex-col items-center"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-4 border-[#4CAF50]"
              />
              <p className="text-gray-700 italic mb-4">"{item.feedback}"</p>
              <h4 className="mt-auto font-semibold text-[#2a5b45]">{item.name}</h4>
              <div className="flex justify-center mt-2">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-[#4CAF50]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Right Navigation Button */}
        {testimonials.length > visibleCards && (
          <button 
            onClick={() => {
              setAutoSlide(false);
              nextSlide();
            }}
            onMouseEnter={() => setAutoSlide(false)}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 text-white bg-[#4CAF50] rounded-full hover:bg-[#3e8e41] focus:outline-none shadow-md hidden sm:block"
            aria-label="Next testimonials"
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
        )}

        {/* Mobile indicators */}
        <div className="flex justify-center mt-8 space-x-2 sm:hidden">
          {Array.from({ length: Math.ceil(testimonials.length / visibleCards) }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setAutoSlide(false);
                setCurrentIndex(idx * visibleCards);
              }}
              className={`w-3 h-3 rounded-full ${Math.floor(currentIndex / visibleCards) === idx ? 'bg-[#4CAF50]' : 'bg-gray-300'}`}
              aria-label={`Go to testimonial set ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;