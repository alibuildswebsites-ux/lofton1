import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Mail } from 'lucide-react';

export const Hero = () => {
  return (
    <section 
      className="relative pt-[110px] pb-[60px] md:pt-[140px] md:pb-[80px] lg:pt-[160px] lg:pb-[100px] flex items-center overflow-hidden bg-white min-h-[100dvh]" 
      id="home"
    >
      {/* 
        GRID CONTAINER 
      */}
      <div className="max-w-[1280px] mx-auto px-5 md:px-10 lg:px-[40px] grid lg:grid-cols-[55%_45%] gap-12 items-center w-full h-full relative z-10">
        
        {/* 
           LEFT COLUMN (Content)
        */}
        <div className="z-10 flex flex-col justify-center">
          {/* Social Proof Badge */}
          <div className="inline-flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-4 py-1.5 w-fit mb-6">
            <div className="flex -space-x-2">
              {[1,2,3].map(i => (
                <div key={i} className="w-6 h-6 rounded-full bg-gray-300 border-2 border-white"></div>
              ))}
            </div>
            <span className="text-sm font-semibold text-gray-600">Trusted by 500+ families</span>
          </div>

          {/* Main Headline: Scaled Typography */}
          <h1 
            className="font-extrabold text-charcoal leading-[1.1] mb-0 tracking-tight"
            style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)' }}
          >
            Your Dream Home <br className="hidden lg:block" /> Awaits
          </h1>
          
          {/* Subheadline */}
          <p className="text-[20px] lg:text-[24px] text-gray-500 font-medium mt-[16px] leading-snug">
            Houston's trusted real estate partner
          </p>
          
          {/* Description */}
          <p className="text-[16px] lg:text-[18px] text-gray-400 max-w-[500px] mt-[24px] leading-relaxed font-normal">
            Serving Houston, Galveston, Austin, Louisiana, Mississippi, and Florida with expert guidance, 24/7 availability, and personalized service.
          </p>

          {/* Buttons */}
          <div className="mt-[32px] flex flex-col sm:flex-row gap-[16px] w-full sm:w-auto">
            {/* Button 1 */}
            <Link 
              to="/properties"
              className="flex items-center justify-center gap-2 bg-charcoal-dark text-white px-[32px] py-[14px] rounded-[8px] font-semibold text-[16px] hover:bg-black hover:scale-[1.02] transition-all duration-300 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
              <Home size={20} />
              View Listings
            </Link>
            
            {/* Button 2 */}
            <Link 
              to="/contact"
              className="flex items-center justify-center gap-2 bg-white text-charcoal-dark border-2 border-gray-200 px-[32px] py-[14px] rounded-[8px] font-semibold text-[16px] hover:border-brand hover:text-brand transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
              <Mail size={20} />
              Contact Us
            </Link>
          </div>
        </div>

        {/* 
           RIGHT COLUMN (Image)
        */}
        <div className="flex w-full h-full items-center justify-center relative mt-12 lg:mt-0 lg:pl-8">
          <div className="w-full aspect-[4/3] rounded-[24px] overflow-hidden shadow-2xl relative">
             <div className="absolute inset-0 bg-gray-200 animate-pulse" /> {/* Placeholder while loading */}
             <img 
               src="https://images.unsplash.com/photo-1600596542815-2a4d9f6facb8?auto=format&fit=crop&w=1200&q=80"
               alt="Modern luxury home exterior"
               className="w-full h-full object-cover relative z-10 hover:scale-105 transition-transform duration-700"
               loading="eager"
             />
          </div>
        </div>
      </div>
    </section>
  );
};