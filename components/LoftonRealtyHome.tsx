import React, { Suspense, useEffect } from 'react';
import { Navbar } from './Navbar';
import { Hero } from './Hero';
import { SectionErrorBoundary } from './SectionErrorBoundary';
import { updateSEO, injectJSONLD } from '../utils';

// Lazy load sections
const StatsBar = React.lazy(() => import('./StatsBar').then(module => ({ default: module.StatsBar })));
const ServicesSection = React.lazy(() => import('./ServicesSection').then(module => ({ default: module.ServicesSection })));
const FeaturedProperties = React.lazy(() => import('./FeaturedProperties').then(module => ({ default: module.FeaturedProperties })));
const TrustSection = React.lazy(() => import('./TrustSection').then(module => ({ default: module.TrustSection })));
const LocationsSection = React.lazy(() => import('./LocationsSection').then(module => ({ default: module.LocationsSection })));
const TestimonialsSection = React.lazy(() => import('./TestimonialsSection').then(module => ({ default: module.TestimonialsSection })));
const ContactFormSection = React.lazy(() => import('./ContactFormSection').then(module => ({ default: module.ContactFormSection })));
const Footer = React.lazy(() => import('./Footer').then(module => ({ default: module.Footer })));

// Enhanced Loading Skeleton that looks like content
const SectionLoader = () => (
  <div className="w-full py-24 px-5 md:px-10 max-w-[1280px] mx-auto">
    <div className="flex flex-col items-center space-y-6 mb-16">
      <div className="w-32 h-4 bg-gray-100 rounded-full animate-pulse" />
      <div className="w-3/4 md:w-1/2 h-10 bg-gray-200 rounded-lg animate-pulse" />
      <div className="w-full md:w-2/3 h-4 bg-gray-50 rounded animate-pulse" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-gray-50 rounded-2xl h-80 animate-pulse border border-gray-100" />
      ))}
    </div>
  </div>
);

const LoftonRealtyHome = () => {
  useEffect(() => {
    updateSEO({
      title: "Lofton Realty | Houston Real Estate Broker & Investment Experts",
      description: "Trusted Houston real estate broker since 2006. Buy, sell, or invest in homes across Houston, Galveston, Austin, and the Gulf Coast. 24/7 service.",
      url: "https://loftonrealty.com/",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80"
    });

    injectJSONLD({
      "@context": "https://schema.org",
      "@type": "RealEstateAgent",
      "name": "Lofton Realty",
      "image": "https://images.unsplash.com/photo-1560518883-ce09059eeffa",
      "description": "Houston's trusted real estate partner for buying, selling, and investing.",
      "url": "https://loftonrealty.com/",
      "telephone": "713-203-7661",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Houston",
        "addressRegion": "TX",
        "addressCountry": "US"
      },
      "priceRange": "$$$",
      "areaServed": ["Houston", "Galveston", "Austin", "Louisiana", "Mississippi", "Florida"]
    });
  }, []);

  return (
    <div className="font-sans text-gray-900 bg-white selection:bg-brand selection:text-white">
      <Navbar />
      <main>
        <Hero />
        
        <SectionErrorBoundary>
          <Suspense fallback={<SectionLoader />}>
            <StatsBar />
          </Suspense>
        </SectionErrorBoundary>

        <SectionErrorBoundary>
          <Suspense fallback={<SectionLoader />}>
            <ServicesSection />
          </Suspense>
        </SectionErrorBoundary>

        <SectionErrorBoundary>
          <Suspense fallback={<SectionLoader />}>
            <FeaturedProperties />
          </Suspense>
        </SectionErrorBoundary>

        <SectionErrorBoundary>
          <Suspense fallback={<SectionLoader />}>
            <TrustSection />
          </Suspense>
        </SectionErrorBoundary>

        <SectionErrorBoundary>
          <Suspense fallback={<SectionLoader />}>
            <LocationsSection />
          </Suspense>
        </SectionErrorBoundary>

        <SectionErrorBoundary>
          <Suspense fallback={<SectionLoader />}>
            <TestimonialsSection />
          </Suspense>
        </SectionErrorBoundary>

        <SectionErrorBoundary>
          <Suspense fallback={<SectionLoader />}>
            <ContactFormSection />
          </Suspense>
        </SectionErrorBoundary>

        <SectionErrorBoundary>
          <Suspense fallback={<div className="h-[300px] w-full bg-charcoal-dark animate-pulse" />}>
            <Footer />
          </Suspense>
        </SectionErrorBoundary>
      </main>
    </div>
  );
};

export default LoftonRealtyHome;