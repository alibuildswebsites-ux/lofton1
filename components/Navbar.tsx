import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Menu, X, Grid, BookOpen, TrendingUp, Mail, Info, User as UserIcon, LogOut, LayoutDashboard, Heart } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { logOut } from '../lib/firebase/auth';

interface NavbarProps {
  variant?: 'public' | 'dashboard';
}

export const Navbar = ({ variant = 'public' }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const currentPath = location.pathname;

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Scroll Handler
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await logOut();
    setIsUserMenuOpen(false);
    setIsMobileMenuOpen(false);
    navigate('/');
  };

  // Nav Items Definitions
  const publicLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'About Us', path: '/about-us', icon: Info },
    { name: 'Property Listings', path: '/property-listings', icon: Grid },
    { name: 'Buyer\'s Guide', path: '/buyers-guide', icon: BookOpen },
    { name: 'Seller\'s Guide', path: '/sellers-guide', icon: TrendingUp },
    { name: 'Contact Us', path: '/contact-us', icon: Mail },
  ];

  const dashboardSpecificLinks = [
    { name: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Saved Properties', path: '/dashboard/saved', icon: Heart },
    { name: 'Profile Settings', path: '/dashboard/profile', icon: UserIcon },
  ];

  // Combine links for dashboard variant
  // We place Dashboard links first for quick access, then the public site links
  // Excluding Buyer's and Seller's guides for dashboard as requested
  const navLinks = variant === 'dashboard' 
    ? [...dashboardSpecificLinks, ...publicLinks.filter(link => link.path !== '/buyers-guide' && link.path !== '/sellers-guide')] 
    : publicLinks;

  // Mobile Drawer Variants
  const drawerVariants = {
    open: { 
      x: 0, 
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30,
        staggerChildren: 0.1,
        delayChildren: 0.2
      } 
    },
    closed: { 
      x: "100%", 
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30 
      } 
    },
  };

  const itemVariants = {
    closed: { opacity: 0, x: 20 },
    open: { opacity: 1, x: 0 }
  };

  const backdropVariants = {
    open: { opacity: 1 },
    closed: { opacity: 0 },
  };

  const isActive = (path: string) => {
    if (path === '/' && currentPath === '/') return true;
    if (path !== '/' && currentPath.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 border-b ${
          isScrolled 
            ? 'bg-white shadow-md py-3 border-gray-200' 
            : 'bg-white shadow-md py-5 border-gray-100'
        }`}
      >
        {/* Adjusted padding and max-width for cleaner fit on large screens with many links */}
        <div className="max-w-[1600px] mx-auto px-5 md:px-6 lg:px-8 flex justify-between items-center h-full">
          {/* Logo (Left) */}
          <Link 
            to={variant === 'dashboard' ? '/dashboard' : '/'} 
            className="font-extrabold text-2xl text-charcoal-dark tracking-tight z-[101] relative rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 flex-shrink-0 mr-4"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Lofton Realty
          </Link>

          {/* Desktop Menu (Center) */}
          {/* Using gap-3 on LG and gap-5 on XL to accommodate the large number of links */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-5 flex-wrap justify-center flex-1 px-4">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className={`text-[13px] xl:text-sm font-medium transition-colors relative group py-1 px-1 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 whitespace-nowrap ${
                  isActive(link.path) ? 'text-brand' : 'text-gray-600 hover:text-brand'
                }`}
              >
                {link.name}
                <span 
                  className={`absolute bottom-0 left-0 h-0.5 bg-brand transition-all duration-300 ${
                    isActive(link.path) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} 
                />
              </Link>
            ))}
          </div>

          {/* Desktop CTA & User (Right) */}
          <div className="hidden lg:flex items-center gap-3 pl-4 flex-shrink-0">
            {user ? (
              // Logged In User Dropdown
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-brand to-brand-gradient rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {user.displayName?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <span className="font-semibold text-gray-900 max-w-[100px] truncate">{user.displayName || 'User'}</span>
                </button>

                {/* Dropdown Menu */}
                {isUserMenuOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setIsUserMenuOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="font-semibold text-gray-900">{user.displayName || 'User'}</p>
                        <p className="text-sm text-gray-500 truncate">{user.email}</p>
                      </div>
                      
                      {variant !== 'dashboard' && (
                        <>
                          <Link
                            to="/dashboard"
                            onClick={() => setIsUserMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                          >
                            <LayoutDashboard size={18} className="text-gray-600" />
                            <span className="text-gray-700 font-medium">Dashboard Overview</span>
                          </Link>
                        </>
                      )}
                      
                      <div className={variant !== 'dashboard' ? "border-t border-gray-100 mt-2 pt-2" : ""}>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition-colors text-red-600"
                        >
                          <LogOut size={18} />
                          <span className="font-medium">Logout</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              // Not Logged In - Show Sign In/Sign Up
              <>
                <Link 
                  to="/login"
                  className="text-sm font-semibold text-gray-700 hover:text-brand transition-colors px-3 py-2 rounded-md whitespace-nowrap"
                >
                  Sign In
                </Link>
                <Link 
                  to="/signup"
                  className="bg-gradient-to-r from-brand to-brand-gradient text-white px-5 py-2.5 rounded-full font-semibold hover:scale-105 transition-all shadow-md hover:shadow-lg active:scale-95 whitespace-nowrap text-sm"
                >
                  Sign Up
                </Link>
              </>
            )}
            
            <Link 
              to="/contact-us"
              className="bg-gradient-to-r from-charcoal to-black text-white px-5 py-2.5 rounded-full font-semibold hover:scale-105 transition-all shadow-md hover:shadow-lg active:scale-95 inline-block whitespace-nowrap text-sm"
            >
              Book Consultation
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="lg:hidden text-gray-800 p-2 z-[103] relative rounded-md active:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu-drawer"
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                   <X size={28} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={28} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={backdropVariants}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[101] lg:hidden"
              aria-hidden="true"
            />
            
            {/* Slide-in Drawer */}
            <motion.div
              id="mobile-menu-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile Navigation"
              initial="closed"
              animate="open"
              exit="closed"
              variants={drawerVariants}
              className="fixed top-0 right-0 h-full w-[85%] max-w-[340px] bg-white z-[102] shadow-2xl lg:hidden flex flex-col pt-24 px-6 pb-8 overflow-y-auto"
            >
              <div className="flex flex-col gap-2 flex-grow">
                {navLinks.map((link) => (
                  <Link 
                    key={link.name} 
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-lg font-medium h-[56px] flex items-center gap-4 px-4 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 ${
                       isActive(link.path) ? 'bg-brand-light text-brand' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <motion.div variants={itemVariants} className="flex items-center gap-4 w-full">
                       <link.icon size={20} className={isActive(link.path) ? 'text-brand' : 'text-gray-400'} />
                       {link.name}
                    </motion.div>
                  </Link>
                ))}

                {/* Mobile Menu - User Section */}
                <div className="border-t border-gray-200 pt-4 mt-4 space-y-2">
                  {user ? (
                    <>
                      <div className="px-4 py-3 bg-gray-50 rounded-lg mb-2">
                        <p className="font-semibold text-gray-900">{user.displayName || 'User'}</p>
                        <p className="text-sm text-gray-500 truncate">{user.email}</p>
                      </div>
                      
                      {variant !== 'dashboard' && (
                        <>
                          <Link 
                            to="/dashboard"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-lg font-medium h-[56px] flex items-center gap-4 px-4 rounded-lg text-gray-700 hover:bg-gray-50"
                          >
                            <LayoutDashboard size={24} />
                            Dashboard
                          </Link>
                        </>
                      )}
                      
                      <button
                        onClick={handleLogout}
                        className="w-full text-lg font-medium h-[56px] flex items-center gap-4 px-4 rounded-lg text-red-600 hover:bg-red-50"
                      >
                        <LogOut size={24} />
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link 
                        to="/login"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-lg font-medium h-[56px] flex items-center gap-4 px-4 rounded-lg text-gray-700 hover:bg-gray-50"
                      >
                        Sign In
                      </Link>
                      <Link 
                        to="/signup"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-lg font-medium h-[56px] flex items-center gap-4 px-4 rounded-lg text-gray-700 hover:bg-gray-50"
                      >
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>

                <Link 
                  to="/contact-us"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="bg-gradient-to-r from-charcoal to-black text-white px-6 py-4 rounded-xl font-bold text-lg shadow-lg active:scale-95 transition-transform w-full mt-auto text-center"
                >
                  Book Consultation
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};