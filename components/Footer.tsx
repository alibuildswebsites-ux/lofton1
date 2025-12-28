import React from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const Footer = () => {
  const { user } = useAuth();

  const socialLinks = [
    { icon: Facebook, url: 'https://facebook.com/loftonrealty' },
    { icon: Instagram, url: 'https://instagram.com/loftonrealty' },
    { icon: Linkedin, url: 'https://linkedin.com/company/lofton-realty' }
  ];

  return (
    <footer className="bg-charcoal-dark text-white pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 lg:px-[40px]">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Brand */}
          <div className="space-y-6">
            <Link to="/" className="inline-block font-extrabold text-2xl text-white tracking-tight rounded-md focus:outline-none focus:ring-2 focus:ring-brand">
              Lofton Realty
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Think Lofton Often. <br/>
              Your trusted partner for buying, selling, and investing in real estate across the Gulf Coast region since 2006.
            </p>
            <div className="flex gap-4">
               {socialLinks.map(({ icon: Icon, url }, i) => (
                 <a 
                   key={i} 
                   href={url} 
                   target="_blank"
                   rel="noopener noreferrer"
                   className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-brand hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-brand"
                 >
                   <Icon size={18} />
                 </a>
               ))}
             </div>
          </div>

          {/* Column 2: Explore */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Explore</h4>
            <ul className="space-y-4">
              <li><Link to="/property-listings" className="text-gray-400 hover:text-brand transition-colors text-sm block">Property Listings</Link></li>
              <li><Link to="/agents" className="text-gray-400 hover:text-brand transition-colors text-sm block">Meet Our Agents</Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-brand transition-colors text-sm block">Real Estate Blog</Link></li>
              <li><Link to="/about-us" className="text-gray-400 hover:text-brand transition-colors text-sm block">About Us</Link></li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Resources</h4>
            <ul className="space-y-4">
              <li><Link to="/buyers-guide" className="text-gray-400 hover:text-brand transition-colors text-sm block">Buyer's Guide</Link></li>
              <li><Link to="/sellers-guide" className="text-gray-400 hover:text-brand transition-colors text-sm block">Seller's Guide</Link></li>
              <li><Link to="/contact-us" className="text-gray-400 hover:text-brand transition-colors text-sm block">Contact Support</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-brand transition-colors text-sm block">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Column 4: Account / Contact */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Account & Contact</h4>
            
            {/* Account Links */}
            <div className="mb-8 p-4 rounded-xl bg-white/5 border border-white/10">
              {user ? (
                <>
                  <p className="text-sm font-bold text-white mb-2">Welcome, {user.displayName || 'User'}</p>
                  <Link to="/dashboard" className="flex items-center gap-2 text-brand hover:text-white transition-colors text-sm font-bold">
                    Go to Dashboard <ArrowRight size={14} />
                  </Link>
                </>
              ) : (
                <div className="flex gap-4">
                  <Link to="/login" className="text-sm font-bold text-white hover:text-brand transition-colors">Log In</Link>
                  <span className="text-gray-600">|</span>
                  <Link to="/signup" className="text-sm font-bold text-white hover:text-brand transition-colors">Sign Up</Link>
                </div>
              )}
            </div>

            {/* Contact Details */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-400">
                <Phone size={16} className="text-brand" />
                <span className="text-sm">(713) 203-7661</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Mail size={16} className="text-brand" />
                <span className="text-sm">Info@LoftonRealty.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <MapPin size={16} className="text-brand flex-shrink-0" />
                <span className="text-sm">Houston, TX</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-xs">
           <p>© {new Date().getFullYear()} Lofton Realty. All rights reserved.</p>
           <div className="flex gap-6">
             <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
             <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
           </div>
        </div>

      </div>
    </footer>
  );
};