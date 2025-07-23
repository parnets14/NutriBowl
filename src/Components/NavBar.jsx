import React, { useState, useEffect } from 'react';
import { 
  FaBars, 
  FaTimes, 
  FaUtensils, 
  FaInfoCircle, 
  FaHome,
  FaChevronDown,
  FaArrowRight
} from 'react-icons/fa';
import { 
  GiWeightScale,
  GiMuscleUp,
  GiRunningShoe
} from 'react-icons/gi';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CgCalculator } from 'react-icons/cg';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showMealPlans, setShowMealPlans] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const getActiveItem = () => {
    const path = location.pathname;
    if (path === '/') return 'Home';
    if (path.includes('/meal-plans')) return 'Meal Plans';
    if (path === '/about-us') return 'About Us';
    return 'Home';
  };

  const [activeItem, setActiveItem] = useState(getActiveItem());

  useEffect(() => {
    setActiveItem(getActiveItem());
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    },{ name: 'BMI calculator', icon: <CgCalculator className="mr-2" />, path: '/bmi-calculator' },
    { name: 'About Us', icon: <FaInfoCircle className="mr-2" />, path: '/about-us' },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false);
    setShowMealPlans(false);
  };

  const toggleMealPlans = () => {
    setShowMealPlans(!showMealPlans);
  };

  return (
    <motion.nav 
      className={`sticky top-0 w-full z-50 ${scrolled ? 'bg-white shadow-md' : 'bg-gradient-to-b from-green-50 to-white'}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/" className="flex-shrink-0 flex items-center group cursor-pointer">
              <motion.img 
                src="/logo.png" 
                className='h-12'
                alt="Company Logo"
              />
              <span className="ml-3 text-xl font-bold text-gray-800 hidden md:block">
                Nutri<span className="text-green-500">Bowl</span>
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:space-x-2 items-center">
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                {item.subItems ? (
                  <div className="relative">
                    <motion.div
                      onClick={toggleMealPlans}
                      className={`${
                        activeItem === item.name
                          ? 'text-green-600 bg-green-50'
                          : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                      } relative inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {item.icon}
                      {item.name}
                      <FaChevronDown className={`ml-2 transition-transform ${showMealPlans ? 'transform rotate-180' : ''}`} />
                    </motion.div>

                    <AnimatePresence>
                      {showMealPlans && (
                        <motion.div 
                          className="absolute left-0 mt-2 w-64 origin-top-left z-50"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
                            <div className="p-2 bg-gradient-to-r from-green-100 to-green-50">
                              <h4 className="font-semibold text-green-800 text-sm">MEAL PLAN OPTIONS</h4>
                            </div>
                            <div className="divide-y divide-gray-100">
                              {item.subItems.map((subItem) => (
                                <motion.div
                                  key={subItem.name}
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  <button
                                    onClick={() => handleNavigation(subItem.path)}
                                    className={`w-full text-left p-3 hover:bg-gradient-to-r ${subItem.color} transition-all flex items-start`}
                                  >
                                    <div className="mr-3 mt-1">
                                      {subItem.icon}
                                    </div>
                                    <div className="flex-1">
                                      <div className="font-medium text-gray-800">{subItem.name}</div>
                                      <div className="text-xs text-gray-500">{subItem.desc}</div>
                                    </div>
                                    <FaArrowRight className="text-gray-400 mt-1" />
                                  </button>
                                </motion.div>
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
                      activeItem === item.name
                        ? 'text-green-600 bg-green-50'
                        : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                    } relative inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {item.icon}
                    {item.name}
                  </motion.div>
                )}
              </div>
            ))}

            <motion.button 
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 shadow hover:shadow-lg flex items-center ml-2"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleNavigation('/signup')}
            >
              Get Started
              <FaChevronDown className="ml-2 transform rotate-90" />
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex items-center md:hidden">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-600 hover:text-green-600 hover:bg-green-50 focus:outline-none"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="md:hidden bg-white shadow-lg"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="pt-2 pb-4 px-4 space-y-1">
              {navItems.map((item) => (
                <div key={item.name}>
                  <motion.button
                    onClick={item.subItems ? toggleMealPlans : () => handleNavigation(item.path)}
                    className={`${
                      activeItem === item.name
                        ? 'bg-green-50 text-green-600'
                        : 'text-gray-600 hover:bg-green-50'
                    } block w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 flex items-center justify-between`}
                  >
                    <div className="flex items-center">
                      <span className="mr-3">{item.icon}</span>
                      {item.name}
                    </div>
                    {item.subItems && (
                      <FaChevronDown className={`transition-transform ${showMealPlans ? 'transform rotate-180' : ''}`} />
                    )}
                  </motion.button>

                  {item.subItems && showMealPlans && (
                    <motion.div 
                      className="pl-8 space-y-1 mt-1"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.subItems.map((subItem) => (
                        <motion.button
                          key={subItem.name}
                          onClick={() => handleNavigation(subItem.path)}
                          className={`block w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center`}
                          whileHover={{ x: 5 }}
                        >
                          <span className="mr-3">{subItem.icon}</span>
                          <div>
                            <div className="font-medium">{subItem.name}</div>
                            <div className="text-xs text-gray-500">{subItem.desc}</div>
                          </div>
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}
              
              <div className="pt-4 pb-2 border-t border-gray-200">
                <motion.button 
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-3 rounded-lg text-base font-medium shadow-md flex items-center justify-center"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleNavigation('/signup')}
                >
                  Get Started
                  <FaChevronDown className="ml-2 transform rotate-90" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;