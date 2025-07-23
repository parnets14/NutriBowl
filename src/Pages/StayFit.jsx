import React from 'react';

const StayFit = () => {
  return (
    <div className="bg-gradient-to-b from-green-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          <span className="text-green-600">HEALTHY EATS</span>, TASTY TREATS!
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          NutriBowl helps you stay fit with delicious, nutritionist-designed meals tailored to your goals.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 mb-16">
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <div className="flex items-center mb-4">
            <div className="bg-green-100 p-3 rounded-full mr-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900">Our Mission</h3>
          </div>
          <p className="text-gray-600">
            To craft and deliver delicious, nourishing meals that inspire healthier, more balanced lifestyles — seamlessly
            blending taste, nutrition, and convenience without compromise.
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg">
          <div className="flex items-center mb-4">
            <div className="bg-green-100 p-3 rounded-full mr-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900">Our Vision</h3>
          </div>
          <p className="text-gray-600">
            To redefine healthy eating by becoming a trusted pioneer in the space — transforming how people experience
            nutritious food and making clean, conscious choices both flavorful and effortlessly accessible for everyone.
          </p>
        </div>
      </div>

      {/* Benefits */}
      <div className="max-w-7xl mx-auto mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose NutriBowl</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            "Food that Heals, Not Just Fills",
            "Mental Clarity & Focus",
            "Break the Cycle of Emotional Eating",
            "Confidence through Consistency",
            "Holistic Support for Your Mental Health",
            "Reinvent Your Lifestyle, Not Just Your Diet"
          ].map((benefit, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-3">
                <div className="bg-green-100 p-2 rounded-full mr-3">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800">{benefit}</h3>
              </div>
              <p className="text-gray-600 text-sm">
                {benefit === "Food that Heals, Not Just Fills" && "Nutrient-dense meals designed to nourish your body at a cellular level."}
                {benefit === "Mental Clarity & Focus" && "Proper nutrition supports cognitive function and sustained mental energy."}
                {benefit === "Break the Cycle of Emotional Eating" && "Learn to fuel your body based on need rather than emotion."}
                {benefit === "Confidence through Consistency" && "Regular healthy eating builds self-esteem and body positivity."}
                {benefit === "Holistic Support for Your Mental Health" && "Nutrition that supports both physical and mental wellbeing."}
                {benefit === "Reinvent Your Lifestyle, Not Just Your Diet" && "Sustainable changes that become second nature."}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Specialization */}
      <div className="max-w-7xl mx-auto mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Specialization</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Customized Nutrition Plans",
              items: ["Weight Loss", "Weight Gain", "Muscle Building", "General Wellness and Fitness"]
            },
            {
              title: "Monthly Subscription Meals",
              items: [
                "Fresh, calorie-counted meals delivered daily",
                "Flexible 1-month to annual plans",
                "Affordable pricing with meal slot options"
              ]
            },
            {
              title: "Chef-Curated Healthy Menus",
              items: [
                "No refined sugar or preservatives",
                "Balanced macro & micro nutrients",
                "Tasty, homestyle cooking with a healthy twist"
              ]
            },
            {
              title: "Fitness-Centric Collaborations",
              items: [
                "Partnered with trainers & fitness centers",
                "Meal programs aligned with workouts",
                "Easy ordering & customer support"
              ]
            }
          ].map((special, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold text-green-700 mb-4">{special.title}</h3>
              <ul className="space-y-2">
                {special.items.map((item, i) => (
                  <li key={i} className="flex items-start">
                    <svg className="flex-shrink-0 w-5 h-5 text-green-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Importance of Staying Fit */}
      <div className="max-w-7xl mx-auto mb-16 bg-green-700 rounded-xl p-8 text-white">
        <h2 className="text-3xl font-bold text-center mb-8">The Importance of Staying Fit</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-start mb-6">
              <div className="bg-green-600 p-2 rounded-full mr-4 mt-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Builds Self-Worth</h3>
                <p className="text-green-100">
                  Every workout, every healthy meal shapes not just your body but your self-worth. Discipline in fitness creates pride and self-respect that reflects in all areas of life.
                </p>
              </div>
            </div>
            <div className="flex items-start mb-6">
              <div className="bg-green-600 p-2 rounded-full mr-4 mt-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Enhances Mental Health</h3>
                <p className="text-green-100">
                  Exercise and clean eating reduce anxiety, improve sleep, and sharpen focus. A fit body supports a calm, clear, and resilient mind.
                </p>
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-start mb-6">
              <div className="bg-green-600 p-2 rounded-full mr-4 mt-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Prevents Lifestyle Diseases</h3>
                <p className="text-green-100">
                  Staying fit helps you avoid diseases like diabetes, hypertension, and obesity. Investing in your fitness today protects your freedom tomorrow.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-green-600 p-2 rounded-full mr-4 mt-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Enables Active Living</h3>
                <p className="text-green-100">
                  A fit body isn't just about muscles — it's about stamina, mobility, and enjoying life without limits. It empowers you to live actively and independently.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Common Problems */}
      <div className="max-w-7xl mx-auto mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Common Fitness Challenges We Solve</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            "Burnout from Overtraining",
            "Mental Blocks & Low Confidence",
            "Lack of Support or Guidance",
            "Inconsistency in Routine",
            "Lack of Clear Goals",
            "Poor Nutrition Choices"
          ].map((problem, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{problem}</h3>
              <p className="text-gray-600 text-sm">
                {problem === "Burnout from Overtraining" && "We design balanced meal plans that support recovery and sustainable training."}
                {problem === "Mental Blocks & Low Confidence" && "Proper nutrition builds both physical and mental strength."}
                {problem === "Lack of Support or Guidance" && "Our nutritionists and chefs provide expert guidance every step."}
                {problem === "Inconsistency in Routine" && "Daily meal delivery removes guesswork and keeps you on track."}
                {problem === "Lack of Clear Goals" && "We help define and support your specific fitness objectives."}
                {problem === "Poor Nutrition Choices" && "Delicious, healthy meals make good choices effortless."}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Solution */}
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-xl p-8 mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">The NutriBowl Solution</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Personalized Nutrition</h3>
                <p className="text-gray-600">
                  We don't believe in "one-size-fits-all." Every bowl is tailored to your goals — whether it's weight loss, muscle gain, or balanced wellness.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Subscription-Based Meal Plans</h3>
                <p className="text-gray-600">
                  1-month to 1-year plans with calorie-counted, portion-controlled meals delivered to your doorstep daily.
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Tasty. Healthy. Consistent.</h3>
                <p className="text-gray-600">
                  We replace guilt-based eating with mindful meals that taste great and keep you on track — effortlessly.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">We Take Care of Everything</h3>
                <p className="text-gray-600">
                  No cooking, no planning, no guesswork. Just eat, feel good, and let your body and mind align.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 text-center">
          <p className="text-xl text-gray-700 font-medium">
            NutriBowl is more than food — it's your partner in sustainable health and transformation.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Transform Your Health?</h2>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Join thousands of satisfied customers who've made NutriBowl part of their healthy lifestyle.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition-colors">
            Get Started
          </button>
          <button className="border-2 border-green-600 text-green-600 hover:bg-green-50 font-bold py-3 px-8 rounded-lg transition-colors">
            View Meal Plans
          </button>
        </div>
      </div>
    </div>
  );
};

export default StayFit;