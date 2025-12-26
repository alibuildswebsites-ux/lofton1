import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Menu, X, Grid, BookOpen, TrendingUp, Mail, Info } from 'lucide-react';

// Props are preserved for compatibility but not actively used for routing logic 
// since we use react-router-dom directly.
interface NavbarProps {
  onNavigate?: (section: string) => void; 
  currentView?: string;
}

export const Navbar = ({ }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const location = useLocation();
  const currentPath = location.pathname;

  // Refs for Accessibility
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

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

  // Nav Items
  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'About', path: '/about', icon: Info },
    { name: 'Properties', path: '/properties', icon: Grid },
    { name: "Buyer's Guide", path: '/buy', icon: BookOpen },
    { name: "Seller's Guide", path: '/sell', icon: TrendingUp },
    { name: "Contact", path: '/contact', icon: Mail },
  ];

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
        <div className="max-w-7xl mx-auto px-5 md:px-6 lg:px-8 flex justify-between items-center h-full">
          {/* Logo (Left) */}
          <Link 
            to="/" 
            className="font-extrabold text-2xl text-charcoal-dark tracking-tight z-[101] relative rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Lofton Realty
          </Link>

          {/* Desktop Menu (Center/Right) */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className={`text-sm font-medium transition-colors relative group py-1 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 ${
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

          {/* Desktop CTA (Right) */}
          <div className="hidden lg:block pl-4">
            <Link 
              to="/contact"
              className="bg-gradient-to-r from-brand to-brand-gradient text-white px-6 py-2.5 rounded-full font-semibold hover:scale-105 transition-all shadow-md hover:shadow-lg active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 inline-block"
            >
              Book Consultation
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button 
            ref={menuBtnRef}
            className="lg:hidden text-gray-800 p-2 z-[101] relative rounded-md active:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
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
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] lg:hidden"
              aria-hidden="true"
            />
            
            {/* Slide-in Drawer */}
            <motion.div
              id="mobile-menu-drawer"
              ref={drawerRef}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile Navigation"
              initial="closed"
              animate="open"
              exit="closed"
              variants={drawerVariants}
              className="fixed top-0 right-0 h-full w-[80%] max-w-[320px] bg-white z-[100] shadow-2xl lg:hidden flex flex-col pt-24 px-6 pb-8 overflow-y-auto"
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
              </div>
              
              <Link 
                to="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-gradient-to-r from-brand to-brand-gradient text-white px-6 py-4 rounded-xl font-bold text-lg shadow-lg active:scale-95 transition-transform w-full mt-auto text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand"
              >
                Book Consultation
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};