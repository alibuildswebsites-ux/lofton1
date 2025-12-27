import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Heart, User, Calendar, ArrowRight, Search, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export const DashboardHome = () => {
  const { user } = useAuth();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const stats = [
    {
      icon: Heart,
      label: 'Saved Homes',
      value: 'View List',
      bg: 'bg-rose-50',
      text: 'text-rose-600',
      link: '/dashboard/saved'
    },
    {
      icon: User,
      label: 'Profile Status',
      value: 'Active',
      bg: 'bg-blue-50',
      text: 'text-blue-600',
      link: '/dashboard/profile'
    },
    {
      icon: Calendar,
      label: 'Member Since',
      value: user?.metadata?.creationTime ? new Date(user.metadata.creationTime).getFullYear() : new Date().getFullYear(),
      bg: 'bg-brand-light',
      text: 'text-brand-dark',
      link: '/dashboard/profile'
    }
  ];

  const quickActions = [
    {
      title: 'Browse Properties',
      desc: 'Explore the latest listings',
      icon: Search,
      link: '/property-listings',
      color: 'bg-indigo-50 text-indigo-600'
    },
    {
      title: 'Saved Properties',
      desc: 'Review your favorites',
      icon: Heart,
      link: '/dashboard/saved',
      color: 'bg-rose-50 text-rose-600'
    },
    {
      title: 'Update Profile',
      desc: 'Change password or name',
      icon: User,
      link: '/dashboard/profile',
      color: 'bg-emerald-50 text-emerald-600'
    },
    {
      title: 'Contact Support',
      desc: 'Get help from our team',
      icon: Mail,
      link: '/contact-us',
      color: 'bg-orange-50 text-orange-600'
    }
  ];

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      {/* Welcome Header */}
      <motion.div variants={item} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-charcoal tracking-tight">
            Dashboard
          </h1>
          <p className="text-gray-500 mt-1">
            Welcome back, <span className="text-charcoal font-bold">{user?.displayName || 'Friend'}</span>.
          </p>
        </div>
        <Link 
          to="/property-listings"
          className="inline-flex items-center justify-center gap-2 bg-charcoal text-white px-5 py-2.5 rounded-lg font-bold hover:bg-black transition-colors shadow-lg shadow-charcoal/20"
        >
          Find a Home <ArrowRight size={18} />
        </Link>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Link
            key={index}
            to={stat.link}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-brand/30 transition-all duration-300 group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.text} transition-transform group-hover:scale-110`}>
                <stat.icon size={24} />
              </div>
              <div className="bg-gray-50 rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                 <ArrowRight size={14} className="text-gray-400" />
              </div>
            </div>
            <div>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-wide mb-1">{stat.label}</p>
              <p className="text-2xl font-extrabold text-charcoal">{stat.value}</p>
            </div>
          </Link>
        ))}
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={item}>
        <h2 className="text-xl font-bold text-charcoal mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              to={action.link}
              className="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-2xl hover:shadow-lg hover:border-gray-200 transition-all duration-300 group"
            >
              <div className={`w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center ${action.color}`}>
                <action.icon size={22} />
              </div>
              <div className="flex-grow">
                <h3 className="font-bold text-charcoal group-hover:text-brand transition-colors">{action.title}</h3>
                <p className="text-sm text-gray-500">{action.desc}</p>
              </div>
              <ArrowRight size={18} className="text-gray-300 group-hover:text-brand transform group-hover:translate-x-1 transition-all" />
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Account Info Card */}
      <motion.div variants={item} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50/50">
           <h2 className="text-lg font-bold text-charcoal">Account Details</h2>
        </div>
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
             <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">Email Address</label>
                <p className="font-medium text-charcoal">{user?.email}</p>
             </div>
             <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">User ID</label>
                <p className="font-medium text-gray-400 font-mono text-xs">{user?.uid}</p>
             </div>
             <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">Last Sign In</label>
                <p className="font-medium text-charcoal">
                    {user?.metadata?.lastSignInTime 
                        ? new Date(user.metadata.lastSignInTime).toLocaleDateString(undefined, { dateStyle: 'full' }) 
                        : 'Just now'}
                </p>
             </div>
             <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">Account Status</label>
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                   <span className="font-bold text-green-600 text-sm">Verified Active</span>
                </div>
             </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DashboardHome;