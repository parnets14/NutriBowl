import React, { useState, useEffect } from 'react';
import {
  FaBars, FaTimes, FaUtensils, FaInfoCircle, FaHome,
  FaChevronDown, FaArrowRight, FaShoppingCart, FaUser
} from 'react-icons/fa';
import { GiWeightScale, GiMuscleUp, GiRunningShoe } from 'react-icons/gi';
import { CgCalculator } from 'react-icons/cg';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showMealPlans, setShowMealPlans] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const getActiveItem = () => {
    const path = location.pathname;
    if (path === '/') return 'Home';
    if (path.startsWith('/meal-plans')) return 'Meal Plans';
    if (path === '/about-us') return 'About Us';
    if (path === '/bmi-calculator') return 'BMI calculator';
    if (path === '/menu') return 'Menu';
    if (path === '/cart') return 'Cart';
    return '';
  };

  const [activeItem, setActiveItem] = useState(getActiveItem());

  useEffect(() => {
    setActiveItem(getActiveItem());
  }, [location]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false);
    setShowMealPlans(false);
  };
const handleLogout = () => {
    logout()
    navigate("/") // ✅ No error here
  }
  const mealPlanOptions = [
    {
      name: 'Weight Loss',
      icon: <GiWeightScale className="text-blue-500 text-xl" />,
      path: '/meal-plans/weight-loss',
      desc: 'Shed pounds healthily',
      color: 'from-blue-50 to-white'
    },
    {
      name: 'Weight Gain',
      icon: <GiMuscleUp className="text-orange-500 text-xl" />,
      path: '/meal-plans/weight-gain',
      desc: 'Build muscle mass',
      color: 'from-orange-50 to-white'
    },
    {
      name: 'Stay Fit',
      icon: <GiRunningShoe className="text-green-500 text-xl" />,
      path: '/meal-plans/stay-fit',
      desc: 'Maintain your physique',
      color: 'from-green-50 to-white'
    }
  ];

  const navItems = [
    { name: 'Home', icon: <FaHome className="mr-2" />, path: '/' },
    {
      name: 'Meal Plans',
      icon: <FaUtensils className="mr-2" />,
      path: '/meal-plans',
      subItems: mealPlanOptions
    },
    { name: 'Menu', icon: <FaUtensils className="mr-2" />, path: '/menu' },
    { name: 'BMI calculator', icon: <CgCalculator className="mr-2" />, path: '/bmi-calculator' },
    { name: 'About Us', icon: <FaInfoCircle className="mr-2" />, path: '/about-us' },
    { name: 'Cart', icon: <FaShoppingCart className="mr-2" />, path: '/cart' }
  ];

  return (
    <motion.nav className={`sticky top-0 w-full z-50 ${scrolled ? 'bg-white shadow-md' : 'bg-gradient-to-b from-green-50 to-white'}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <motion.img src="/logo.png" className='h-12' alt="Company Logo" />
            <h1 className="text-2xl ml-2 font-bold text-green-600 tracking-wide">Nutri BOWL</h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:space-x-2 items-center">
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                {item.subItems ? (
                  <div className="relative">
                    <motion.div
                      onClick={() => setShowMealPlans(!showMealPlans)}
                      className={`${
                        activeItem === item.name ? 'text-green-600 bg-green-50' : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                      } inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium cursor-pointer`}
                    >
                      {item.icon}
                      {item.name}
                      <FaChevronDown className={`ml-2 transition-transform ${showMealPlans ? 'rotate-180' : ''}`} />
                    </motion.div>

                    <AnimatePresence>
                      {showMealPlans && (
                        <motion.div className="absolute left-0 mt-2 w-64 z-50"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="bg-white rounded-xl shadow-xl border border-gray-100">
                            <div className="p-2 bg-green-50">
                              <h4 className="font-semibold text-green-800 text-sm">MEAL PLAN OPTIONS</h4>
                            </div>
                            <div className="divide-y divide-gray-100">
                              {item.subItems.map((subItem) => (
                                <motion.button key={subItem.name}
                                  onClick={() => handleNavigation(subItem.path)}
                                  className={`w-full text-left p-3 hover:bg-gradient-to-r ${subItem.color} flex items-start`}
                                >
                                  <div className="mr-3 mt-1">{subItem.icon}</div>
                                  <div className="flex-1">
                                    <div className="font-medium text-gray-800">{subItem.name}</div>
                                    <div className="text-xs text-gray-500">{subItem.desc}</div>
                                  </div>
                                  <FaArrowRight className="text-gray-400 mt-1" />
                                </motion.button>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <motion.div
                    onClick={() => handleNavigation(item.path)}
                    className={`${
                      activeItem === item.name ? 'text-green-600 bg-green-50' : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                    } inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium cursor-pointer`}
                  >
                    {item.icon}
                    {item.name}
                    {item.name === 'Cart' && cartItemCount > 0 && (
                      <span className="ml-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {cartItemCount}
                      </span>
                    )}
                  </motion.div>
                )}
              </div>
            ))}

            {/* Auth Section */}
            {/* Auth Section */}
{localStorage.getItem('token') ? (
  <div className="relative group ml-4">
    <button 
      onClick={() => navigate('/profile')} // Add click handler
      className="flex items-center space-x-2 text-gray-700 hover:text-green-600 cursor-pointer"
    >
      <FaUser />
      <span>{user?.fullName?.split(' ')[0] || 'Profile'}</span>
    </button>
    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
      <button 
        onClick={() => navigate('/profile')}
        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        Profile
      </button>
      <button 
        onClick={() => {
          localStorage.removeItem('token');
          navigate('/');
          window.location.reload(); // Force refresh
        }} 
        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        Logout
      </button>
    </div>
  </div>
) : (
  <div className="flex items-center space-x-4 ml-4">
    <Link to="/auth/login" className="text-gray-700 hover:text-green-600">Sign In</Link>
    <Link to="/auth/register" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">Sign Up</Link>
  </div>
)}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-green-600"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden bg-white shadow-lg"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 py-2 space-y-1">
              {navItems.map((item) => (
                <div key={item.name}>
                  <button
                    onClick={item.subItems ? () => setShowMealPlans(!showMealPlans) : () => handleNavigation(item.path)}
                    className={`w-full text-left px-4 py-2 rounded-lg flex items-center justify-between ${
                      activeItem === item.name ? 'bg-green-50 text-green-600' : 'hover:bg-green-50 text-gray-600'
                    }`}
                  >
                    <div className="flex items-center">
                      {item.icon}
                      <span className="ml-2">{item.name}</span>
                    </div>
                    {item.subItems && <FaChevronDown className={`${showMealPlans ? 'rotate-180' : ''}`} />}
                  </button>

                  {item.subItems && showMealPlans && (
                    <div className="pl-8 mt-1">
                      {item.subItems.map((subItem) => (
                        <button
                          key={subItem.name}
                          onClick={() => handleNavigation(subItem.path)}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-600 hover:text-green-600"
                        >
                          {subItem.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Auth Section (Mobile) */}
              <div className="pt-4 border-t border-gray-200">
                {user ? (
                  <>
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</Link>
                    <button onClick={() => { handleLogout(); navigate('/'); }} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</button>
                  </>
                ) : (
                  <>
                    <Link to="/auth/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign In</Link>
                    <Link to="/auth/register" className="block px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 mt-1">Sign Up</Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
