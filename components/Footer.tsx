import React from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  const socialLinks = [
    { icon: Facebook, url: 'https://facebook.com/loftonrealty' },
    { icon: Instagram, url: 'https://instagram.com/loftonrealty' },
    { icon: Linkedin, url: 'https://linkedin.com/company/lofton-realty' }
  ];

  return (
    <footer className="bg-charcoal-dark text-white pt-10 pb-8 md:pt-16 border-t border-gray-800">
      <div className="max-w-[1280px] mx-auto px-5 md:px-10 lg:px-[40px]">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 text-center md:text-left">
          
          {/* Left: Company Name/Logo */}
          <div className="flex flex-col items-center md:items-start">
            <Link to="/" className="font-extrabold text-2xl text-white tracking-tight mb-4 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-dark">
              Lofton Realty
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Think Lofton Often. <br/>
              Your trusted partner for real estate in Houston and the Gulf Coast region.
            </p>
          </div>

          {/* New: Account Section */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-lg font-bold mb-6 text-brand">Account</h4>
            <div className="space-y-4 flex flex-col items-center md:items-start">
              <Link to="/login" className="text-gray-400 hover:text-white transition-colors text-sm rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-dark">
                Sign In
              </Link>
              <Link to="/signup" className="text-gray-400 hover:text-white transition-colors text-sm rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-dark">
                Sign Up
              </Link>
              <Link to="/properties" className="text-gray-400 hover:text-white transition-colors text-sm rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-dark">
                View Properties
              </Link>
            </div>
          </div>

          {/* Middle: Contact Info */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-lg font-bold mb-6 text-brand">Contact Us</h4>
            <div className="space-y-4 flex flex-col items-center md:items-start">
              <div className="flex items-center gap-3 text-gray-400">
                <Phone size={18} className="text-brand" />
                <span>(713) 203-7661</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Mail size={18} className="text-brand" />
                <span>Info@LoftonRealty.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <MapPin size={18} className="text-brand flex-shrink-0" />
                <span>Houston, TX</span>
              </div>
            </div>
          </div>

          {/* Right: Social Media */}
          <div className="flex flex-col items-center md:items-start">
             <h4 className="text-lg font-bold mb-6 text-brand">Follow Us</h4>
             <div className="flex gap-4">
               {socialLinks.map(({ icon: Icon, url }, i) => (
                 <a 
                   key={i} 
                   href={url} 
                   target="_blank"
                   rel="noopener noreferrer"
                   className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-brand hover:text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-dark"
                 >
                   <Icon size={20} />
                 </a>
               ))}
             </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
           <p>© 2024 Lofton Realty. All rights reserved.</p>
           <div className="flex gap-6">
             <Link to="/privacy" className="hover:text-white transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-dark">Privacy Policy</Link>
             <Link to="/terms" className="hover:text-white transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-dark">Terms of Service</Link>
           </div>
        </div>

      </div>
    </footer>
  );
};