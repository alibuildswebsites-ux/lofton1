import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PROPERTIES } from '../data';
import { PropertyCard } from './PropertyCard';

export const FeaturedProperties = () => {
  return (
    <section className="py-[60px] md:py-[80px] lg:py-[100px] bg-gray-50" id="properties">
      <div className="max-w-[1280px] mx-auto px-5 md:px-10 lg:px-[40px]">
        <div className="flex justify-between items-end mb-[40px] md:mb-[60px]">
          <div>
            <span className="text-[13px] font-bold tracking-[2px] text-brand uppercase mb-3 block">Exclusive Listings</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-charcoal tracking-tight">Featured Properties</h2>
          </div>
          <Link 
            to="/properties"
            className="hidden md:flex items-center gap-2 text-charcoal font-bold hover:text-brand transition-colors rounded-lg px-2 py-1 -ml-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
          >
            View All Listings <ArrowRight size={20} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[30px]">
          {PROPERTIES.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
        
        <div className="mt-10 text-center md:hidden">
            <Link 
              to="/properties"
              className="inline-flex items-center gap-2 text-charcoal font-bold hover:text-brand transition-colors rounded-lg px-4 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
              View All Listings <ArrowRight size={20} />
            </Link>
        </div>
      </div>
    </section>
  );
};