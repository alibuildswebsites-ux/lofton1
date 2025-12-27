import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Link } from 'react-router-dom';
import { Home, Heart, User, Search, Settings, LogOut } from 'lucide-react';
import { logOut } from '../lib/firebase/auth';

export const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20 px-5 md:px-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
            <div>
              <h1 className="text-3xl font-extrabold text-charcoal tracking-tight">
                Welcome back, <span className="text-brand">{user?.displayName?.split(' ')[0] || 'Client'}</span>
              </h1>
              <p className="text-gray-500 mt-1">Manage your account and viewing preferences.</p>
            </div>
            <Link 
              to="/property-listings"
              className="bg-charcoal text-white px-6 py-3 rounded-full font-bold shadow-md hover:bg-black transition-all flex items-center gap-2"
            >
              <Search size={18} /> Browse Homes
            </Link>
          </div>

          {/* Quick Stats / Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
               <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-red-500 mb-4">
                 <Heart size={24} />
               </div>
               <h3 className="text-xl font-bold text-charcoal mb-2">Saved Homes</h3>
               <p className="text-gray-500 mb-4 text-sm">View the properties you've bookmarked.</p>
               <span className="text-brand font-bold text-sm cursor-pointer hover:underline">View 0 items</span>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
               <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500 mb-4">
                 <User size={24} />
               </div>
               <h3 className="text-xl font-bold text-charcoal mb-2">My Profile</h3>
               <p className="text-gray-500 mb-4 text-sm">Update your contact information.</p>
               <span className="text-brand font-bold text-sm cursor-pointer hover:underline">Edit Profile</span>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
               <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-600 mb-4">
                 <Settings size={24} />
               </div>
               <h3 className="text-xl font-bold text-charcoal mb-2">Settings</h3>
               <p className="text-gray-500 mb-4 text-sm">Manage notifications and preferences.</p>
               <span className="text-brand font-bold text-sm cursor-pointer hover:underline">Manage</span>
            </div>
          </div>

          {/* Empty State / Content */}
          <div className="bg-white rounded-3xl border border-gray-100 p-8 md:p-12 text-center">
             <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
               <Home size={32} className="text-gray-300" />
             </div>
             <h2 className="text-2xl font-bold text-charcoal mb-3">No Activity Yet</h2>
             <p className="text-gray-500 max-w-md mx-auto mb-8">
               Start exploring properties to see your saved items and search history appear here.
             </p>
             <Link 
               to="/property-listings" 
               className="inline-block text-brand font-bold border-b-2 border-brand/20 hover:border-brand pb-0.5 transition-colors"
             >
               Start your search now
             </Link>
          </div>

        </div>
      </main>
      
      <Footer />
    </div>
  );
};
