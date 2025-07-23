import NutriBowl from "../MealPlanSelector";
import ImportanceOfHealthyWeightLoss from "./ImportanceOfHealthyWeightLoss";
import WeightLossProblems from "./ProblemCard";
import OurSpecialization from "./SpecializationCard";
import WeightLossBanner from "./WeightLossBanner";
import WeightLossMealPlan from "./WeightLossTable";



const WeightLossHome = () => (
  <div>
    
     
<WeightLossBanner/>
     <WeightLossProblems/>
     <NutriBowl/>
     <ImportanceOfHealthyWeightLoss/>
     <OurSpecialization/>
     <WeightLossMealPlan/>
     
  </div>
);

export default WeightLossHome;