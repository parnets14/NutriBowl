import { motion } from "framer-motion";
export const Solution=()=>{
    return(
        <section>
           < div className="max-w-7xl mx-auto bg-white rounded-xl shadow-xl p-8 mb-16">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-2 mb-4 text-sm font-semibold text-green-600 bg-green-100 rounded-full">
              WE ARE NUTRIBOWL
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6 leading-tight">
              The <span className="text-green-600">Solution</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed">
              At NutriBowl, we solve the real struggles people face with food, weight management, and consistency.
              More than food — it's your partner in sustainable health and transformation.
            </p>
          </motion.div>

          {/* Solution Cards */}
     
        </div>
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
        </section>
    )
}