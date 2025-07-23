

export const MissionAndVision=()=>{
    return(
        <section>
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

        </section>
    )

}