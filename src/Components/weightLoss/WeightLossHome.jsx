
import { Benefits } from "../Benifits";
import Challenge from "../Challenge";
import NutriBowl from "../MealPlanSelector";
import { MissionAndVision } from "../mission&vision";
import { Specialization } from "../Specialization";
import Problems from "../weightGain/problem";
import ImportanceOfHealthyWeightLoss from "./ImportanceOfHealthyWeightLoss";
import WeightLossProblems from "./ProblemCard";

import WeightLossBanner from "./WeightLossBanner";
import WeightLossMealPlan from "./WeightLossTable";



const WeightLossHome = () => (
  <div>
    
     
<WeightLossBanner/>
<div className="bg-gradient-to-b from-green-50 to-white py-12 px-4 sm:px-6 lg:px-8">
              {/* Hero Section */}
              <div className="max-w-7xl mx-auto text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  <span className="text-green-600">HEALTHY EATS</span>, TASTY TREATS!
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                NutriBowl helps you gain healthy weight with delicious, nutritionist-designed meals tailored to your body goals.
                </p>
              </div>
<MissionAndVision/>
<Benefits/>
<Specialization/>
<Challenge/>
     <WeightLossProblems/>
    

     <ImportanceOfHealthyWeightLoss/>
     
    
     </div>
  </div>
);

export default WeightLossHome;