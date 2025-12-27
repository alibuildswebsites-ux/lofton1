import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Home, User, Heart, LogOut, Menu, X, LayoutDashboard, ChevronRight } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { logOut } from '../../lib/firebase/auth';
import { motion, AnimatePresence } from 'framer-motion';

export const DashboardLayout = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logOut();
    navigate('/');
  };

  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Overview' },
    { path: '/dashboard/saved', icon: Heart, label: 'Saved Properties' },
    { path: '/dashboard/profile', icon: User, label: 'Profile Settings' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo Area */}
      <div className="p-6 md:p-8">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-charcoal text-white rounded-xl flex items-center justify-center shadow-lg group-hover:bg-brand transition-colors duration-300">
             <Home size={20} className="fill-current" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xl text-charcoal tracking-tight group-hover:text-brand transition-colors">Lofton</span>
            <span className="text-xs font-bold text-gray-400 tracking-widest uppercase">Realty</span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2 overflow-y-auto no-scrollbar">
        <p className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 mt-4">Menu</p>
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => setIsMobileMenuOpen(false)}
            className={`flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200 group relative overflow-hidden ${
              isActive(item.path)
                ? 'bg-charcoal text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-50 hover:text-charcoal'
            }`}
          >
            <div className="flex items-center gap-3 relative z-10">
              <item.icon size={20} className={isActive(item.path) ? 'text-brand' : 'text-gray-400 group-hover:text-charcoal'} />
              <span className="font-semibold text-sm">{item.label}</span>
            </div>
            {isActive(item.path) && <ChevronRight size={16} className="text-gray-400" />}
          </Link>
        ))}
      </nav>

      {/* User & Logout */}
      <div className="p-4 border-t border-gray-100 bg-white">
        <div className="bg-gray-50 rounded-2xl p-4 mb-2">
            <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-charcoal font-bold shadow-sm">
                    {user?.displayName?.[0]?.toUpperCase() || 'U'}
                </div>
                <div className="overflow-hidden">
                    <p className="text-sm font-bold text-charcoal truncate">{user?.displayName || 'User'}</p>
                    <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                </div>
            </div>
            <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
            >
            <LogOut size={14} />
            Sign Out
            </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-72 bg-white border-r border-gray-200 h-screen sticky top-0 z-30">
        <SidebarContent />
      </aside>

      {/* Mobile Top Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-gray-200 z-40 flex items-center justify-between px-4">
        <Link to="/" className="font-extrabold text-xl text-charcoal">Lofton Realty</Link>
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2 text-charcoal hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Sidebar Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-50 lg:hidden backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed inset-y-0 left-0 w-80 bg-white z-50 shadow-2xl lg:hidden"
            >
               <div className="absolute top-4 right-4 z-10">
                   <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                       <X size={24} />
                   </button>
               </div>
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0">
        <div className="max-w-5xl mx-auto px-4 py-8 lg:px-12 lg:py-12 mt-16 lg:mt-0">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;