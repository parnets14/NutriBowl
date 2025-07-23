
import { Benefits } from "../Benifits";
import NutriBowl from "../MealPlanSelector";
import { Specialization } from "../Specialization";
import ImportanceOfHealthyWeightLoss from "./ImportanceOfHealthyWeightLoss";
import WeightLossProblems from "./ProblemCard";

import WeightLossBanner from "./WeightLossBanner";
import WeightLossMealPlan from "./WeightLossTable";



const WeightLossHome = () => (
  <div>
    
     
<WeightLossBanner/>
     <WeightLossProblems/>
    <Benefits/>
     <ImportanceOfHealthyWeightLoss/>
     <Specialization/>
     <WeightLossMealPlan/>
     
  </div>
);

export default WeightLossHome;