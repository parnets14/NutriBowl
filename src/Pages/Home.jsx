
import NutriBowlBanner from "../Components/Banner";
import BMICalculator from "../Components/bmiCalculator";
import HealthGoalsSection from "../Components/HealthGoalsSection";
import MealPlanSelector from "../Components/MealPlanSelector";
import MeetOurExperts from "../Components/MeetOurExperts";
import Testimonials from "../Components/testimonials";


const Home = () => (
  <div>
     <NutriBowlBanner/>
     
<HealthGoalsSection/>
<MealPlanSelector />
<Testimonials />
<MeetOurExperts />
     
  </div>
);

export default Home;