import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StayFit from './Pages/StayFit';
import Navbar from './Components/NavBar';
import Footer from './Components/Footer';
import Home from './Pages/Home';
import AboutUs from './Pages/About';
import WeightLossMealPlan from './Components/weightLoss/WeightLossTable'
import WeightLossHome from './Components/weightLoss/WeightLossHome';


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
            <Route path="/stay-fit" element={<StayFit />} />
            <Route path="/about-us" element={<AboutUs />} />
             <Route path="/weight-loss" element={<WeightLossHome />} />
             <Route path="/mealPlan" element={<WeightLossMealPlan />} />
            {/* <Route path="/contact" element={<Contact />} /> */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;