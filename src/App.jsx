import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './Components/NavBar';
import Footer from './Components/Footer';
import Home from './Pages/Home';
import AboutUs from './Pages/About';
import WeightLossMealPlan from './Components/weightLoss/WeightLossTable'
import WeightLossHome from './Components/weightLoss/WeightLossHome';
import { StayFitHome } from './Components/stayFit/stayFitHome';
import StayFitMealPlan from './Components/stayFit/StayFitMealPlan';
import WeightGainMealPlan from './Components/weightGain/WeightGainMealPlan';
import { WeightGainHome } from './Components/weightGain/WeightGainHome';
import BMICalculator from './Components/bmiCalculator';
import MealPlanNavigator from './Components/MealPlanSelector';


function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/weight-loss" element={<WeightLoss />} />
            <Route path="/weight-gain" element={<WeightGain />} /> */}
            <Route path="/stay-fit" element={<StayFitHome />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/weight-loss" element={<WeightLossHome />} />
             <Route path="/weight-gain" element={<WeightGainHome />} />
            <Route path="/bmi-calculator" element={<BMICalculator />} />
            <Route path="/meal-plans/weight-loss" element={<WeightLossMealPlan />} />
            <Route path="/meal-plans/stay-fit" element={<StayFitMealPlan />} />
             <Route path="/meal-plans/weight-gain" element={<WeightGainMealPlan />} />
            <Route path="/allmealPlan" element={<MealPlanNavigator />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;