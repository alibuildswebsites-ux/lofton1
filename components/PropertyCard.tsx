import React, { useState, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Bed, Bath, Maximize, ChevronLeft, ChevronRight } from 'lucide-react';
import { Property } from '../types';

// Helper to generate Unsplash URLs with specific widths
const getUnsplashUrl = (url: string, width: number) => {
  if (url.includes('unsplash.com')) {
    return url.replace(/&w=\d+/, `&w=${width}`);
  }
  return url;
};

interface PropertyCardProps {
  property: Property;
  viewMode?: 'grid' | 'list';
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, viewMode = 'grid' }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handlePrevImage = (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentImageIndex((prev) => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const toggleFavorite = (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsFavorite(!isFavorite);
  };

  const isList = viewMode === 'list';

  return (
    <div
      className={`group bg-white rounded-[20px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 flex ${isList ? 'flex-col md:flex-row' : 'flex-col hover:-translate-y-2'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Carousel Area */}
      <div className={`relative overflow-hidden bg-gray-200 ${isList ? 'w-full md:w-[320px] h-[240px] md:h-auto shrink-0' : 'h-[240px] lg:h-[260px] w-full'}`}>
         
         {/* Images */}
         {property.images.map((img, idx) => (
           <div 
             key={idx}
             className={`absolute inset-0 transition-opacity duration-300 ${idx === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
           >
             <img
               src={getUnsplashUrl(img, 800)}
               alt={`Property at ${property.address}`}
               className="w-full h-full object-cover"
               loading="lazy"
             />
           </div>
         ))}
         
         {/* Status Badge */}
         <div className="absolute top-4 left-4 z-10">
           <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide text-white shadow-sm ${
             property.status === 'New Listing' ? 'bg-blue-600' :
             property.status === 'Pending' ? 'bg-orange-500' :
             property.status === 'Price Drop' ? 'bg-red-500' :
             'bg-brand'
           }`}>
             {property.status || 'For Sale'}
           </span>
         </div>

         {/* Carousel Controls */}
         {property.images.length > 1 && (
           <>
             <button 
               onClick={handlePrevImage}
               className={`absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 p-1.5 rounded-full text-gray-800 shadow-md hover:bg-white hover:text-brand transition-all duration-200 z-20 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
             >
               <ChevronLeft size={18} />
             </button>
             <button 
               onClick={handleNextImage}
               className={`absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 p-1.5 rounded-full text-gray-800 shadow-md hover:bg-white hover:text-brand transition-all duration-200 z-20 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}
             >
               <ChevronRight size={18} />
             </button>
             
             {/* Dots */}
             <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
               {property.images.map((_, idx) => (
                 <div 
                   key={idx} 
                   className={`w-1.5 h-1.5 rounded-full shadow-sm transition-colors ${idx === currentImageIndex ? 'bg-white' : 'bg-white/50'}`} 
                 />
               ))}
             </div>
           </>
         )}
         
         {/* Gradient Overlay */}
         <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

         {/* Favorite Button (Visible on Hover/Active) */}
         <button 
            onClick={toggleFavorite}
            className={`absolute top-4 right-4 z-20 bg-white/90 backdrop-blur p-2 rounded-full shadow-md hover:bg-white transition-all duration-200 ${isFavorite ? 'text-red-500' : 'text-gray-600 hover:text-red-500'} ${isHovered || isFavorite ? 'opacity-100' : 'opacity-0'}`}
            title="Save to favorites"
         >
            <Heart size={18} className={isFavorite ? 'fill-current' : ''} />
         </button>
      </div>

      {/* Content */}
      <div className={`p-6 flex flex-col justify-between flex-grow ${isList ? 'py-6 px-8' : ''}`}>
        <div>
          <div className="flex justify-between items-start mb-2">
             <h3 className="text-2xl font-bold text-charcoal">{property.price}</h3>
          </div>
          <p className="text-gray-700 font-semibold text-lg mb-1 truncate">{property.address}</p>
          <p className="text-gray-400 text-sm mb-6 flex items-center gap-1">
            <MapPin size={14} className="text-brand" /> {property.location}
          </p>

          <div className="flex items-center gap-6 text-gray-500 text-sm border-t border-gray-100 pt-4 mb-4">
            <div className="flex items-center gap-2">
              <Bed size={18} className="text-gray-400" /> 
              <span><strong className="text-gray-800">{property.beds}</strong> Beds</span>
            </div>
            <div className="flex items-center gap-2">
              <Bath size={18} className="text-gray-400" />
              <span><strong className="text-gray-800">{property.baths}</strong> Baths</span>
            </div>
            <div className="flex items-center gap-2">
              <Maximize size={18} className="text-gray-400" />
              <span><strong className="text-gray-800">{property.sqft}</strong> Sqft</span>
            </div>
          </div>
        </div>
        
        <Link 
          to={`/properties/${property.id}`} // Note: Detail page not implemented in this scope, but Link is correct
          className="w-full mt-auto border border-gray-200 rounded-lg py-2.5 text-sm font-bold text-charcoal hover:bg-charcoal hover:text-white hover:border-charcoal transition-colors text-center inline-block"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};