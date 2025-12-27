import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Heart, User, Calendar, ArrowRight } from 'lucide-react';

export const DashboardHome = () => {
  const { user } = useAuth();

  const stats = [
    {
      icon: Heart,
      label: 'Saved Properties',
      value: '0',
      color: 'from-pink-500 to-rose-500',
      link: '/dashboard/saved'
    },
    {
      icon: Calendar,
      label: 'Account Age',
      value: 'New',
      color: 'from-blue-500 to-indigo-500',
      link: '/dashboard/profile'
    },
    {
      icon: User,
      label: 'Profile Status',
      value: 'Active',
      color: 'from-green-500 to-emerald-500',
      link: '/dashboard/profile'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-brand to-brand-gradient rounded-2xl p-8 text-white mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {user?.displayName?.split(' ')[0] || 'User'}! 👋
        </h1>
        <p className="text-white/90">
          Manage your profile, view saved properties, and explore new listings.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Link
            key={index}
            to={stat.link}
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
              <stat.icon className="text-white" size={24} />
            </div>
            <p className="text-gray-500 text-sm mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            to="/properties"
            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-brand hover:bg-gray-50 transition-colors"
          >
            <div>
              <p className="font-semibold text-gray-900">Browse Properties</p>
              <p className="text-sm text-gray-500">Explore available listings</p>
            </div>
            <ArrowRight className="text-brand" size={20} />
          </Link>

          <Link
            to="/dashboard/profile"
            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-brand hover:bg-gray-50 transition-colors"
          >
            <div>
              <p className="font-semibold text-gray-900">Edit Profile</p>
              <p className="text-sm text-gray-500">Update your information</p>
            </div>
            <ArrowRight className="text-brand" size={20} />
          </Link>

          <Link
            to="/contact"
            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-brand hover:bg-gray-50 transition-colors"
          >
            <div>
              <p className="font-semibold text-gray-900">Contact Agent</p>
              <p className="text-sm text-gray-500">Get expert assistance</p>
            </div>
            <ArrowRight className="text-brand" size={20} />
          </Link>

          <Link
            to="/dashboard/saved"
            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-brand hover:bg-gray-50 transition-colors"
          >
            <div>
              <p className="font-semibold text-gray-900">Saved Properties</p>
              <p className="text-sm text-gray-500">View your favorites</p>
            </div>
            <ArrowRight className="text-brand" size={20} />
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl p-6 shadow-sm mt-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Account Information</h2>
        <div className="space-y-3">
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">Email</span>
            <span className="font-medium text-gray-900">{user?.email}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">Account Type</span>
            <span className="font-medium text-gray-900">Client</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-gray-600">Member Since</span>
            <span className="font-medium text-gray-900">
              {user?.metadata?.creationTime 
                ? new Date(user.metadata.creationTime).toLocaleDateString()
                : 'Recently'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;