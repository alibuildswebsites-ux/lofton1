import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, Menu, X, ChevronDown, User as UserIcon, LogOut, 
  LayoutDashboard, Settings, FileText, Users, BookOpen, 
  TrendingUp, Info, Mail, Grid, ShieldCheck 
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { logOut, checkIsAdmin } from '../lib/firebase/auth';

interface NavbarProps {
  variant?: 'public' | 'dashboard';
}

export const Navbar = ({ variant = 'public' }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Desktop hover state for Resources
  const [hoverResource, setHoverResource] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const currentPath = location.pathname;
  const timeoutRef = useRef<any>(null);

  // Check admin status
  useEffect(() => {
    const verifyAdmin = async () => {
      if (user) {
        const adminStatus = await checkIsAdmin(user.email);
        setIsAdmin(adminStatus);
      }
    };
    verifyAdmin();
  }, [user]);

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

  const isActive = (path: string) => {
    if (path === '/' && currentPath !== '/') return false;
    return currentPath.startsWith(path);
  };

  // Navigation Structure
  const mainLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'About', path: '/about-us', icon: Info },
    { name: 'Properties', path: '/property-listings', icon: Grid },
  ];

  const resourceLinks = [
    { name: "Buyer's Guide", path: '/buyers-guide', icon: BookOpen },
    { name: "Seller's Guide", path: '/sellers-guide', icon: TrendingUp },
    { name: 'Meet Our Agents', path: '/agents', icon: Users },
  ];

  const secondaryLinks = [
    { name: 'Blog', path: '/blog', icon: FileText },
    { name: 'Contact', path: '/contact-us', icon: Mail },
  ];

  // Mobile Drawer Variants
  const drawerVariants = {
    open: { x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
    closed: { x: "100%", transition: { type: "spring", stiffness: 300, damping: 30 } },
  };

  // Dropdown Handling
  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setHoverResource(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setHoverResource(false);
    }, 200);
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
        <div className="max-w-[1600px] mx-auto px-5 md:px-6 lg:px-8 flex justify-between items-center h-full">
          {/* Logo (Left) */}
          <Link 
            to="/" 
            className="font-extrabold text-2xl text-charcoal-dark tracking-tight z-[101] relative rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 flex-shrink-0 mr-8"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Lofton Realty
          </Link>

          {/* Desktop Menu (Center) */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2 flex-1">
            {/* Main Links */}
            {mainLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className={`text-[14px] font-bold px-4 py-2 rounded-full transition-all ${
                  isActive(link.path) ? 'text-brand bg-brand-light' : 'text-gray-600 hover:text-brand hover:bg-gray-50'
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Resources Dropdown */}
            <div 
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button 
                className={`flex items-center gap-1 text-[14px] font-bold px-4 py-2 rounded-full transition-all ${
                  hoverResource || resourceLinks.some(r => isActive(r.path)) 
                    ? 'text-brand bg-brand-light' 
                    : 'text-gray-600 hover:text-brand hover:bg-gray-50'
                }`}
              >
                Resources <ChevronDown size={14} className={`transition-transform duration-200 ${hoverResource ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {hoverResource && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden py-2"
                  >
                    {resourceLinks.map((link) => (
                      <Link
                        key={link.name}
                        to={link.path}
                        className={`flex items-center gap-3 px-4 py-3 text-sm font-medium hover:bg-gray-50 transition-colors ${
                          isActive(link.path) ? 'text-brand bg-brand-light/50' : 'text-gray-700'
                        }`}
                      >
                        <link.icon size={16} />
                        {link.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Secondary Links */}
            {secondaryLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className={`text-[14px] font-bold px-4 py-2 rounded-full transition-all ${
                  isActive(link.path) ? 'text-brand bg-brand-light' : 'text-gray-600 hover:text-brand hover:bg-gray-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Side: Auth / User */}
          <div className="hidden lg:flex items-center gap-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-3 px-2 py-1 rounded-full hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200"
                >
                  <div className="w-9 h-9 bg-brand text-white rounded-full flex items-center justify-center font-bold text-sm shadow-sm">
                    {user.displayName ? user.displayName[0].toUpperCase() : 'U'}
                  </div>
                  <span className="font-bold text-sm text-gray-700 max-w-[100px] truncate mr-1">
                    {user.displayName || 'User'}
                  </span>
                  <ChevronDown size={14} className="text-gray-400" />
                </button>

                <AnimatePresence>
                  {isUserMenuOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setIsUserMenuOpen(false)} />
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 overflow-hidden"
                      >
                        <div className="px-4 py-3 border-b border-gray-50 bg-gray-50/50">
                          <p className="font-bold text-charcoal truncate">{user.displayName || 'User'}</p>
                          <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        </div>
                        
                        <div className="py-1">
                          <Link 
                            to="/dashboard" 
                            onClick={() => setIsUserMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-brand transition-colors"
                          >
                            <LayoutDashboard size={16} /> Dashboard
                          </Link>
                          {isAdmin && (
                            <Link 
                              to="/dashboard/admin" 
                              onClick={() => setIsUserMenuOpen(false)}
                              className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-purple-700 hover:bg-purple-50 transition-colors"
                            >
                              <ShieldCheck size={16} /> Admin Panel
                            </Link>
                          )}
                          <Link 
                            to="/dashboard/profile" 
                            onClick={() => setIsUserMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-brand transition-colors"
                          >
                            <Settings size={16} /> Profile Settings
                          </Link>
                        </div>

                        <div className="border-t border-gray-50 pt-1 mt-1">
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors text-left"
                          >
                            <LogOut size={16} /> Sign Out
                          </button>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link 
                  to="/login"
                  className="text-sm font-bold text-gray-600 hover:text-brand transition-colors px-4 py-2"
                >
                  Log In
                </Link>
                <Link 
                  to="/signup"
                  className="bg-charcoal text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-black transition-all shadow-md hover:shadow-lg active:scale-95"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <button 
            className="lg:hidden text-charcoal p-2 z-[103] relative rounded-md active:bg-gray-100"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[101] lg:hidden"
            />
            
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={drawerVariants}
              className="fixed top-0 right-0 h-full w-[85%] max-w-[340px] bg-white z-[102] shadow-2xl lg:hidden flex flex-col overflow-y-auto"
            >
              <div className="pt-24 px-6 pb-8 flex flex-col gap-2 flex-grow">
                
                {/* Main Links */}
                {mainLinks.map((link) => (
                  <Link 
                    key={link.name} 
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-4 px-4 py-3 rounded-xl text-lg font-bold transition-colors ${
                      isActive(link.path) ? 'bg-brand-light text-brand' : 'text-charcoal hover:bg-gray-50'
                    }`}
                  >
                    <link.icon size={20} className={isActive(link.path) ? 'text-brand' : 'text-gray-400'} />
                    {link.name}
                  </Link>
                ))}

                {/* Resources Accordion */}
                <div className="rounded-xl overflow-hidden">
                  <button 
                    onClick={() => setIsResourcesOpen(!isResourcesOpen)}
                    className={`w-full flex items-center justify-between px-4 py-3 text-lg font-bold transition-colors ${
                      isResourcesOpen || resourceLinks.some(r => isActive(r.path)) ? 'text-brand' : 'text-charcoal hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <BookOpen size={20} className={isResourcesOpen || resourceLinks.some(r => isActive(r.path)) ? 'text-brand' : 'text-gray-400'} />
                      Resources
                    </div>
                    <ChevronDown size={20} className={`transition-transform duration-300 ${isResourcesOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  <AnimatePresence>
                    {isResourcesOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-gray-50"
                      >
                        {resourceLinks.map((link) => (
                          <Link 
                            key={link.name} 
                            to={link.path}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`block pl-14 pr-4 py-3 text-base font-medium transition-colors ${
                              isActive(link.path) ? 'text-brand' : 'text-gray-600'
                            }`}
                          >
                            {link.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Secondary Links */}
                {secondaryLinks.map((link) => (
                  <Link 
                    key={link.name} 
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-4 px-4 py-3 rounded-xl text-lg font-bold transition-colors ${
                      isActive(link.path) ? 'bg-brand-light text-brand' : 'text-charcoal hover:bg-gray-50'
                    }`}
                  >
                    <link.icon size={20} className={isActive(link.path) ? 'text-brand' : 'text-gray-400'} />
                    {link.name}
                  </Link>
                ))}

                <div className="mt-auto pt-8 border-t border-gray-100">
                  {user ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 px-4 mb-4">
                        <div className="w-10 h-10 bg-brand text-white rounded-full flex items-center justify-center font-bold">
                          {user.displayName ? user.displayName[0].toUpperCase() : 'U'}
                        </div>
                        <div>
                          <p className="font-bold text-charcoal">{user.displayName || 'User'}</p>
                          <p className="text-xs text-gray-500 truncate max-w-[180px]">{user.email}</p>
                        </div>
                      </div>
                      
                      <Link 
                        to="/dashboard"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50 text-charcoal font-bold hover:bg-gray-100 transition-colors"
                      >
                        <LayoutDashboard size={20} /> Dashboard
                      </Link>

                      {isAdmin && (
                        <Link 
                          to="/dashboard/admin"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 rounded-xl bg-purple-50 text-purple-700 font-bold hover:bg-purple-100 transition-colors"
                        >
                          <ShieldCheck size={20} /> Admin Panel
                        </Link>
                      )}
                      
                      <Link 
                        to="/dashboard/profile"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 font-bold hover:bg-gray-50 transition-colors"
                      >
                        <Settings size={20} /> Settings
                      </Link>
                      
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 font-bold hover:bg-red-50 transition-colors"
                      >
                        <LogOut size={20} /> Log Out
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      <Link 
                        to="/login"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="w-full text-center py-3 rounded-xl font-bold text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors"
                      >
                        Log In
                      </Link>
                      <Link 
                        to="/signup"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="w-full text-center py-3 rounded-xl font-bold text-white bg-charcoal hover:bg-black transition-colors shadow-lg"
                      >
                        Sign Up
                      </Link>
                    </div>
                  )}
                </div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};