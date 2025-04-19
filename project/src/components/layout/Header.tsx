import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Search, Home, User, LogOut, Menu, X, Moon, Sun, ChevronDown, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true); // Default to dark mode
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close menu when route changes
    setIsMenuOpen(false);
    setIsProfileOpen(false);
  }, [location]);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.classList.toggle('dark', newMode);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white dark:bg-dark-200 shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container-custom flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-primary-600 dark:text-primary-500">
            <Home size={28} strokeWidth={2.5} />
          </span>
          <span className="text-xl font-bold tracking-tight">LILL KOST</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="font-medium hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
            Home
          </Link>
          <Link to="/search" className="font-medium hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
            Find Kost
          </Link>
          {profile?.role === 'owner' && (
            <Link to="/owner" className="font-medium hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              My Properties
            </Link>
          )}
          {profile?.role === 'admin' && (
            <Link to="/admin" className="font-medium hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              Admin
            </Link>
          )}
        </nav>

        {/* User Actions */}
        <div className="hidden md:flex items-center gap-4">
          {/* Theme Toggle */}
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-light-200 dark:hover:bg-dark-300 transition-colors"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {user ? (
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 py-1 px-3 rounded-full hover:bg-light-200 dark:hover:bg-dark-300 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white">
                  {profile?.full_name?.[0] || user.email?.[0] || <User size={16} />}
                </div>
                <span className="font-medium">{profile?.full_name || 'Account'}</span>
                <ChevronDown size={16} />
              </button>

              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-dark-200 rounded-lg shadow-lg py-2 z-50"
                  >
                    <Link 
                      to="/profile" 
                      className="block px-4 py-2 hover:bg-light-200 dark:hover:bg-dark-300 transition-colors"
                    >
                      My Profile
                    </Link>
                    {profile?.role === 'owner' && (
                      <Link 
                        to="/owner/add-property" 
                        className="block px-4 py-2 hover:bg-light-200 dark:hover:bg-dark-300 transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <Plus size={16} />
                          Add Property
                        </span>
                      </Link>
                    )}
                    <button 
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2 text-error-600 hover:bg-light-200 dark:hover:bg-dark-300 transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <LogOut size={16} />
                        Sign Out
                      </span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link to="/login" className="btn-outline">
                Login
              </Link>
              <Link to="/register" className="btn-primary">
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 md:hidden"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-white dark:bg-dark-200 shadow-md"
          >
            <div className="container-custom py-4 flex flex-col gap-4">
              <Link to="/" className="py-2 font-medium">
                Home
              </Link>
              <Link to="/search" className="py-2 font-medium">
                Find Kost
              </Link>
              {profile?.role === 'owner' && (
                <Link to="/owner" className="py-2 font-medium">
                  My Properties
                </Link>
              )}
              {profile?.role === 'admin' && (
                <Link to="/admin" className="py-2 font-medium">
                  Admin
                </Link>
              )}
              
              <div className="border-t border-light-300 dark:border-dark-300 pt-4 mt-2">
                {user ? (
                  <>
                    <Link to="/profile" className="py-2 font-medium flex items-center gap-2">
                      <User size={18} />
                      My Profile
                    </Link>
                    {profile?.role === 'owner' && (
                      <Link to="/owner/add-property" className="py-2 font-medium flex items-center gap-2">
                        <Plus size={18} />
                        Add Property
                      </Link>
                    )}
                    <button 
                      onClick={handleSignOut}
                      className="py-2 font-medium text-error-600 w-full text-left flex items-center gap-2"
                    >
                      <LogOut size={18} />
                      Sign Out
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Link to="/login" className="btn-outline w-full">
                      Login
                    </Link>
                    <Link to="/register" className="btn-primary w-full">
                      Register
                    </Link>
                  </div>
                )}
                
                <button 
                  onClick={toggleDarkMode}
                  className="flex items-center gap-2 py-2 mt-4 font-medium"
                >
                  {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                  {darkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;