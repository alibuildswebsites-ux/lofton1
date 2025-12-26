import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { PROPERTIES } from '../data';
import { PropertyCard } from './PropertyCard';
import { 
  MapPin, Bed, Bath, Maximize, Calendar, Ruler, Phone, Mail, 
  ChevronLeft, ChevronRight, CheckCircle2, ArrowRight, Home, Building, ImageOff
} from 'lucide-react';
import { motion } from 'framer-motion';
import { getOptimizedImageUrl, updateSEO, injectJSONLD } from '../utils';

export const PropertyDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [mainImageLoaded, setMainImageLoaded] = useState(false);

  // Find Property
  const property = PROPERTIES.find(p => p.id === id);

  // SEO & Scroll handling
  useEffect(() => {
    window.scrollTo(0, 0);

    if (property) {
      // Dynamic Meta Tags
      updateSEO({
        title: `${property.address} | Homes for Sale in ${property.city}, ${property.state}`,
        description: `View details for ${property.address}. ${property.beds} Bed, ${property.baths} Bath, ${property.price}. ${property.description?.substring(0, 120)}...`,
        image: property.images[0],
        url: `https://loftonrealty.com/property-listings/${property.id}`,
        type: 'article'
      });

      // Structured Data (Schema.org)
      injectJSONLD({
        "@context": "https://schema.org",
        "@type": "SingleFamilyResidence",
        "name": property.address,
        "description": property.description,
        "numberOfRooms": property.beds + property.baths, // Approximate
        "occupancy": {
          "@type": "QuantitativeValue",
          "value": property.beds
        },
        "floorSize": {
          "@type": "QuantitativeValue",
          "value": property.sqft.replace(/,/g, ''),
          "unitCode": "FTK"
        },
        "address": {
          "@type": "PostalAddress",
          "streetAddress": property.address,
          "addressLocality": property.city,
          "addressRegion": property.state,
          "postalCode": property.zip,
          "addressCountry": "US"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "29.7604", // Placeholder for demo
          "longitude": "-95.3698"
        },
        "image": property.images,
        "offers": {
          "@type": "Offer",
          "price": property.price.replace(/[^0-9.]/g, ''),
          "priceCurrency": "USD",
          "availability": property.status === 'Pending' ? "https://schema.org/Sold" : "https://schema.org/InStock"
        }
      });
    }
  }, [property, id]);

  // Reset active image when property changes
  useEffect(() => {
      setActiveImage(0);
      setImageError(false);
      setMainImageLoaded(false);
  }, [id]);

  // Reset loading state when active image changes
  useEffect(() => {
    setMainImageLoaded(false);
  }, [activeImage]);

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <Navbar />
        <div className="text-center p-8">
          <h2 className="text-3xl font-bold text-charcoal mb-4">Property Not Found</h2>
          <p className="text-gray-500 mb-8">The listing you are looking for may have been removed or does not exist.</p>
          <Link to="/property-listings" className="bg-brand text-white px-6 py-3 rounded-full font-bold hover:bg-brand-dark transition-colors">
            Return to Properties
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Similar Properties Logic
  const similarProperties = PROPERTIES
    .filter(p => p.location === property.location && p.id !== property.id)
    .slice(0, 3);
  
  // Fill with others if not enough similar found in same location
  if (similarProperties.length < 3) {
    const others = PROPERTIES.filter(p => p.id !== property.id && !similarProperties.includes(p)).slice(0, 3 - similarProperties.length);
    similarProperties.push(...others);
  }

  const handleNextImage = () => {
    setActiveImage((prev) => (prev + 1) % property.images.length);
    setImageError(false);
  };

  const handlePrevImage = () => {
    setActiveImage((prev) => (prev - 1 + property.images.length) % property.images.length);
    setImageError(false);
  };

  return (
    <div className="font-sans bg-gray-50 min-h-screen">
      <Navbar />

      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-gray-200 pt-24 pb-4">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10 flex items-center gap-2 text-sm text-gray-500 overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-brand transition-colors">Home</Link>
          <span className="text-gray-300">/</span>
          <Link to="/property-listings" className="hover:text-brand transition-colors">Property Listings</Link>
          <span className="text-gray-300">/</span>
          <Link to={`/property-listings?location=${encodeURIComponent(property.location)}`} className="hover:text-brand transition-colors">{property.city}</Link>
          <span className="text-gray-300">/</span>
          <span className="font-semibold text-charcoal truncate">{property.address}</span>
        </div>
      </div>

      <main className="max-w-[1280px] mx-auto px-5 md:px-10 py-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-charcoal mb-2 tracking-tight">
              {property.address}
            </h1>
            <div className="flex items-center gap-2 text-lg text-gray-500 font-medium">
              <MapPin size={20} className="text-brand" />
              {property.city}, {property.state} {property.zip}
            </div>
          </div>
          <div className="flex flex-col items-start md:items-end">
             <div className="text-3xl md:text-4xl font-extrabold text-brand mb-2">{property.price}</div>
             <span className={`px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wide text-white ${
                property.status === 'New Listing' ? 'bg-blue-600' :
                property.status === 'Pending' ? 'bg-orange-500' :
                property.status === 'Price Drop' ? 'bg-red-500' : 'bg-brand'
             }`}>
               {property.status || 'For Sale'}
             </span>
          </div>
        </div>

        {/* Hero Image Gallery */}
        <div className="grid lg:grid-cols-[2fr_1fr] gap-4 mb-12 h-[400px] md:h-[500px] lg:h-[600px]">
          {/* Main Image */}
          <div className="relative rounded-2xl overflow-hidden bg-gray-100 h-full group">
             
             {/* Skeleton Placeholder */}
             {!mainImageLoaded && !imageError && (
               <div className="absolute inset-0 bg-gray-200 animate-pulse z-10" />
             )}

             {!imageError ? (
               <img 
                 src={getOptimizedImageUrl(property.images[activeImage], 1200)} 
                 alt={`Property at ${property.address} - Main View`}
                 className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${mainImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                 onError={() => setImageError(true)}
                 onLoad={() => setMainImageLoaded(true)}
                 loading="eager"
               />
             ) : (
               <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 text-gray-400">
                  <ImageOff size={64} className="mb-4" />
                  <p className="font-medium">Image not available</p>
               </div>
             )}
             
             {/* Controls */}
             {property.images.length > 1 && !imageError && (
               <>
                 <button 
                   onClick={handlePrevImage}
                   className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 z-20"
                   aria-label="Previous image"
                 >
                   <ChevronLeft size={24} />
                 </button>
                 <button 
                   onClick={handleNextImage}
                   className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 z-20"
                   aria-label="Next image"
                 >
                   <ChevronRight size={24} />
                 </button>
                 
                 <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm z-20">
                   {activeImage + 1} / {property.images.length}
                 </div>
               </>
             )}
          </div>

          {/* Thumbnails Grid (Desktop) */}
          <div className="hidden lg:grid grid-rows-3 gap-4 h-full">
            {property.images.slice(0, 3).map((img, idx) => (
              <button 
                key={idx} 
                onClick={() => { setActiveImage(idx); setImageError(false); }}
                className={`relative rounded-xl overflow-hidden w-full h-full cursor-pointer transition-all bg-gray-100 ${activeImage === idx ? 'ring-4 ring-brand' : 'opacity-80 hover:opacity-100'}`}
              >
                <img 
                  src={getOptimizedImageUrl(img, 400)} 
                  alt={`Property at ${property.address} - View ${idx + 1}`} 
                  className="w-full h-full object-cover" 
                  loading="lazy"
                  onError={(e) => { e.currentTarget.style.display='none'; e.currentTarget.parentElement?.classList.add('flex', 'items-center', 'justify-center'); e.currentTarget.parentElement!.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>'; }}
                />
                {idx === 2 && property.images.length > 3 && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white font-bold text-xl">
                    +{property.images.length - 3}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid lg:grid-cols-[2fr_1fr] gap-12">
          
          {/* Left Column: Details */}
          <div>
            {/* Quick Facts Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
               <div className="flex flex-col gap-1">
                 <span className="flex items-center gap-2 text-gray-400 text-sm font-bold uppercase tracking-wide"><Bed size={16} /> Bedrooms</span>
                 <span className="text-2xl font-bold text-charcoal">{property.beds}</span>
               </div>
               <div className="flex flex-col gap-1">
                 <span className="flex items-center gap-2 text-gray-400 text-sm font-bold uppercase tracking-wide"><Bath size={16} /> Bathrooms</span>
                 <span className="text-2xl font-bold text-charcoal">{property.baths}</span>
               </div>
               <div className="flex flex-col gap-1">
                 <span className="flex items-center gap-2 text-gray-400 text-sm font-bold uppercase tracking-wide"><Maximize size={16} /> Sq Ft</span>
                 <span className="text-2xl font-bold text-charcoal">{property.sqft}</span>
               </div>
               <div className="flex flex-col gap-1">
                 <span className="flex items-center gap-2 text-gray-400 text-sm font-bold uppercase tracking-wide"><Calendar size={16} /> Year Built</span>
                 <span className="text-2xl font-bold text-charcoal">{property.yearBuilt || 'N/A'}</span>
               </div>
               <div className="flex flex-col gap-1 md:hidden">
                 <span className="flex items-center gap-2 text-gray-400 text-sm font-bold uppercase tracking-wide"><Ruler size={16} /> Lot Size</span>
                 <span className="text-xl font-bold text-charcoal">{property.lotSize || 'N/A'}</span>
               </div>
               <div className="flex flex-col gap-1 md:hidden">
                 <span className="flex items-center gap-2 text-gray-400 text-sm font-bold uppercase tracking-wide"><Home size={16} /> Type</span>
                 <span className="text-xl font-bold text-charcoal capitalize">{property.type}</span>
               </div>
            </div>

            {/* Description */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-charcoal mb-6">About This Home</h2>
              <div className="prose prose-lg text-gray-600 leading-relaxed whitespace-pre-line max-w-none">
                {property.description}
              </div>
            </div>

            {/* Key Features */}
            <div className="mb-12">
               <h2 className="text-2xl font-bold text-charcoal mb-6">Key Features & Amenities</h2>
               <div className="grid md:grid-cols-2 gap-4">
                 {property.features?.map((feature, idx) => (
                   <div key={idx} className="flex items-center gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                     <CheckCircle2 size={20} className="text-brand flex-shrink-0" />
                     <span className="text-gray-700 font-medium">{feature}</span>
                   </div>
                 ))}
               </div>
            </div>

            {/* Additional Facts (Desktop Only for some) */}
            <div className="mb-12 bg-gray-100 rounded-2xl p-8 hidden md:block">
               <h3 className="font-bold text-charcoal mb-6">Additional Details</h3>
               <div className="grid grid-cols-2 gap-y-4 text-sm">
                 <div className="flex justify-between border-b border-gray-200 pb-2 mr-8">
                   <span className="text-gray-500">Property Type</span>
                   <span className="font-semibold capitalize">{property.type}</span>
                 </div>
                 <div className="flex justify-between border-b border-gray-200 pb-2 mr-8">
                   <span className="text-gray-500">MLS Number</span>
                   <span className="font-semibold">{property.mlsId || 'N/A'}</span>
                 </div>
                 <div className="flex justify-between border-b border-gray-200 pb-2 mr-8">
                   <span className="text-gray-500">Lot Size</span>
                   <span className="font-semibold">{property.lotSize || 'N/A'}</span>
                 </div>
                 <div className="flex justify-between border-b border-gray-200 pb-2 mr-8">
                   <span className="text-gray-500">Parking</span>
                   <span className="font-semibold">Garage (2)</span>
                 </div>
               </div>
            </div>

          </div>

          {/* Right Column: Agent Contact */}
          <div className="relative">
             <div className="sticky top-28 space-y-8">
                
                {/* Agent Card */}
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                   <div className="flex items-center gap-4 mb-6">
                     <div className="w-16 h-16 rounded-full bg-gray-100 overflow-hidden border-2 border-brand">
                        <img 
                          src={getOptimizedImageUrl('https://images.unsplash.com/photo-1560250097-0b93528c311a', 200)} 
                          alt="Agent" 
                          className="w-full h-full object-cover"
                          onError={(e) => { e.currentTarget.src = "https://ui-avatars.com/api/?name=Jared+Lofton&background=4ADE80&color=fff"; }}
                        />
                     </div>
                     <div>
                       <h3 className="font-bold text-lg text-charcoal">Jared Lofton, MBA</h3>
                       <p className="text-xs font-bold text-brand uppercase tracking-wide">Listing Agent</p>
                       <p className="text-xs text-gray-400">Lofton Realty</p>
                     </div>
                   </div>
                   
                   <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                     Interested in this property? I'm available 24/7 to answer your questions or schedule a private showing.
                   </p>

                   <div className="space-y-3">
                     <a href="tel:7132037661" className="flex items-center justify-center gap-2 w-full bg-brand text-white py-3 rounded-lg font-bold hover:bg-brand-dark transition-colors shadow-lg shadow-brand/20">
                       <Phone size={18} /> Call Agent
                     </a>
                     <a href="mailto:Info@LoftonRealty.com" className="flex items-center justify-center gap-2 w-full bg-white border-2 border-charcoal text-charcoal py-3 rounded-lg font-bold hover:bg-gray-50 transition-colors">
                       <Mail size={18} /> Email Agent
                     </a>
                     <Link to="/contact-us" className="flex items-center justify-center gap-2 w-full bg-gray-100 text-charcoal py-3 rounded-lg font-bold hover:bg-gray-200 transition-colors">
                       <Calendar size={18} /> Schedule Tour
                     </Link>
                   </div>
                </div>

                {/* Safety/Trust Badge */}
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 flex items-start gap-3">
                   <Building size={20} className="text-gray-400 mt-1" />
                   <div>
                     <h4 className="font-bold text-sm text-charcoal">Brokerage Verified</h4>
                     <p className="text-xs text-gray-500 mt-1">Lofton Realty verifies all listing data. Information deemed reliable but not guaranteed.</p>
                   </div>
                </div>

             </div>
          </div>

        </div>
      </main>

      {/* Similar Properties */}
      <section className="bg-white py-20 border-t border-gray-100">
         <div className="max-w-[1280px] mx-auto px-5 md:px-10">
            <h2 className="text-3xl font-extrabold text-charcoal mb-8">Similar Properties You Might Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {similarProperties.map(prop => (
                 <PropertyCard key={prop.id} property={prop} />
               ))}
            </div>
         </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-charcoal-dark text-center">
         <div className="max-w-3xl mx-auto px-5">
           <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">See It For Yourself</h2>
           <p className="text-xl text-gray-400 mb-8">
             Pictures can only say so much. Schedule a private tour of {property.address} today.
           </p>
           <Link 
             to="/contact-us" 
             className="inline-flex items-center gap-2 bg-brand text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-brand-dark transition-colors shadow-lg shadow-brand/20"
           >
             Schedule a Tour Today <ArrowRight size={20} />
           </Link>
         </div>
      </section>

      <Footer />
    </div>
  );
};