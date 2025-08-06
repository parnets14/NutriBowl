
import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from './Components/NavBar';
import Footer from './Components/Footer';
import Home from './Pages/Home';
import AboutUs from './Pages/About';
import WeightLossMealPlan from './Components/weightLoss/WeightLossTable';
import WeightLossHome from './Components/weightLoss/WeightLossHome';
import { StayFitHome } from './Components/stayFit/stayFitHome';
import StayFitMealPlan from './Components/stayFit/StayFitMealPlan';
import WeightGainMealPlan from './Components/weightGain/WeightGainMealPlan';
import { WeightGainHome } from './Components/weightGain/WeightGainHome';
import BMICalculator from './Components/bmiCalculator';
import MealPlanNavigator from './Components/MealPlanSelector';
import Menu from './Pages/Menu';
import LoginPage from './Pages/Login';
import RegisterPage from './Pages/Register';
import ProfilePage from './Components/Profile';
import CartPage from './Components/Cart';
import CheckoutPage from './Components/Checkout';
import { useAdminAuth } from './hooks/AdminAuthProvider'; // Added useAdminAuth
import Login from '../src/Admin/Login'; // Admin login component
import AdminDashboard from './Admin/Dashboard'; // Admin dashboard component


function AdminProtectedRoute() {
  const { isAuthenticated, isLoading } = useAdminAuth();
  const [showDashboard, setShowDashboard] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!isAuthenticated || !showDashboard) {
    return <Login onLoginSuccess={() => setShowDashboard(true)} />;
  }

  return <AdminDashboard />;
}

function App() {
  const location = useLocation();
  const [isAdminRoute, setIsAdminRoute] = useState(false);

  useEffect(() => {
    // Check if the current path starts with '/admin'
    setIsAdminRoute(location.pathname.startsWith('/admin'));
  }, [location]);

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdminRoute && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stay-fit" element={<StayFitHome />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/weight-loss" element={<WeightLossHome />} />
          <Route path="/weight-gain" element={<WeightGainHome />} />
          <Route path="/bmi-calculator" element={<BMICalculator />} />
          <Route path="/menu" element={<Menu />} />
          <Route path='/cart' element={<CartPage/>}/>
          <Route path='/checkout' element={<CheckoutPage/>}/>
          <Route path="/meal-plans/weight-loss" element={<WeightLossMealPlan />} />
          <Route path="/meal-plans/stay-fit" element={<StayFitMealPlan />} />
          <Route path="/meal-plans/weight-gain" element={<WeightGainMealPlan />} />
          <Route path="/allmealPlan" element={<MealPlanNavigator />} />
          <Route path='/auth/login' element={<LoginPage/>}/>
          <Route path='/auth/register' element={<RegisterPage/>}/>
          <Route path='/profile' element={<ProfilePage/>}/>
          <Route path='/admin/*' element={<AdminProtectedRoute/>}/>
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default App;