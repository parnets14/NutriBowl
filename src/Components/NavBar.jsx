import React, { useState, useEffect } from 'react';
import { 
  FaBars, 
  FaTimes, 
  FaUser, 
  FaUtensils, 
  FaQuestionCircle, 
  FaComments, 
  FaInfoCircle, 
  FaHome,
  FaChevronDown
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Set active item based on current route
  const getActiveItem = () => {
    const path = location.pathname;
    if (path === '/') return 'Home';
    if (path === '/meal-plans') return 'Meal Plans';
    if (path === '/how-it-works') return 'How It Works';
    if (path === '/testimonials') return 'Testimonials';
    if (path === '/about-us') return 'About Us';
    return 'Home';
  };

  const [activeItem, setActiveItem] = useState(getActiveItem());

  // Update active item when route changes
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

  const navItems = [
    { name: 'Home', icon: <FaHome className="mr-2" />, path: '/' },
    { name: 'Meal Plans', icon: <FaUtensils className="mr-2" />, path: '/meal-plans' },
    { name: 'How It Works', icon: <FaQuestionCircle className="mr-2" />, path: '/how-it-works' },
    { name: 'Testimonials', icon: <FaComments className="mr-2" />, path: '/testimonials' },
    { name: 'About Us', icon: <FaInfoCircle className="mr-2" />, path: '/about-us' },
  ];

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
        ease: "easeOut"
      }
    }),
    exit: { opacity: 0, x: -20 }
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <motion.nav 
      className={`sticky top-0 w-full   z-50 ${scrolled ? 'bg-white shadow-md' : 'bg-gradient-to-b from-green-50 to-white'}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo with animation */}
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              to="/" 
              className="flex-shrink-0 flex items-center group cursor-pointer"
              onClick={() => setActiveItem('Home')}
            >
              <motion.img 
                src="logo.png" 
                className='h-12'
                alt="Company Logo"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              />
              <motion.span 
                className="ml-3 text-xl font-bold text-gray-800 hidden md:block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Nutri<span className="text-green-500">Bowl</span>
              </motion.span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:space-x-2">
            {navItems.map((item) => (
              <motion.div
                key={item.name}
                onClick={() => handleNavigation(item.path)}
                className={`${
                  activeItem === item.name
                    ? 'text-green-600 bg-green-50'
                    : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                } relative inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer`}
                whileHover={{ 
                  scale: 1.05,
                }}
                whileTap={{ scale: 0.98 }}
              >
                {item.icon}
                {item.name}
                {activeItem === item.name && (
                  <motion.div 
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 w-4 h-1 bg-green-500 rounded-full"
                    layoutId="activeIndicator"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.div>
            ))}
          </div>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex md:items-center space-x-3">
            <motion.button 
              className="flex items-center text-gray-600 hover:text-green-600 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-green-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNavigation('/login')}
            >
              <FaUser className="mr-2" />
              Login
            </motion.button>
            <motion.button 
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 shadow hover:shadow-lg flex items-center"
              whileHover={{ 
                scale: 1.05,
                y: -2,
                boxShadow: '0 4px 12px rgba(5, 150, 105, 0.3)'
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleNavigation('/signup')}
            >
              Get Started
              <motion.span 
                className="ml-2"
                animate={{ x: [0, 4, 0] }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 2,
                  ease: "easeInOut"
                }}
              >
                <FaChevronDown className="transform rotate-90" />
              </motion.span>
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex items-center md:hidden">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-600 hover:text-green-600 hover:bg-green-50 focus:outline-none"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Main menu"
            >
              {isOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu with AnimatePresence */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="md:hidden bg-white shadow-lg"
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: 'auto',
              opacity: 1,
              transition: {
                height: { duration: 0.3 },
                opacity: { duration: 0.2 }
              }
            }}
            exit={{ 
              height: 0,
              opacity: 0,
              transition: {
                height: { duration: 0.3 },
                opacity: { duration: 0.2 }
              }
            }}
          >
            <div className="pt-2 pb-4 px-4 space-y-1">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  onClick={() => handleNavigation(item.path)}
                  className={`${
                    activeItem === item.name
                      ? 'bg-green-50 text-green-600'
                      : 'text-gray-600 hover:bg-green-50'
                  } block w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 flex items-center`}
                  variants={itemVariants}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                  {activeItem === item.name && (
                    <motion.span 
                      className="ml-auto h-2 w-2 rounded-full bg-green-500"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 }}
                    />
                  )}
                </motion.button>
              ))}
              
              <div className="pt-4 pb-2 border-t border-gray-200 space-y-2">
                <motion.button 
                  className="w-full flex items-center justify-center text-gray-600 hover:text-green-600 hover:bg-green-50 px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200"
                  variants={itemVariants}
                  custom={navItems.length}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  onClick={() => handleNavigation('/login')}
                >
                  <FaUser className="mr-2" />
                  Login
                </motion.button>
                <motion.button 
                  className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 shadow hover:shadow-md flex items-center justify-center"
                  variants={itemVariants}
                  custom={navItems.length + 0.5}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  whileHover={{ 
                    y: -2,
                    boxShadow: '0 4px 12px rgba(5, 150, 105, 0.3)'
                  }}
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