import React, { Suspense } from 'react';
import { Navbar } from './Navbar';
import { Hero } from './Hero';
import { SectionErrorBoundary } from './SectionErrorBoundary';

// Lazy load sections
const StatsBar = React.lazy(() => import('./StatsBar').then(module => ({ default: module.StatsBar })));
const ServicesSection = React.lazy(() => import('./ServicesSection').then(module => ({ default: module.ServicesSection })));
const FeaturedProperties = React.lazy(() => import('./FeaturedProperties').then(module => ({ default: module.FeaturedProperties })));
const TrustSection = React.lazy(() => import('./TrustSection').then(module => ({ default: module.TrustSection })));
const LocationsSection = React.lazy(() => import('./LocationsSection').then(module => ({ default: module.LocationsSection })));
const TestimonialsSection = React.lazy(() => import('./TestimonialsSection').then(module => ({ default: module.TestimonialsSection })));
const ContactFormSection = React.lazy(() => import('./ContactFormSection').then(module => ({ default: module.ContactFormSection })));
const Footer = React.lazy(() => import('./Footer').then(module => ({ default: module.Footer })));

// Simple loading skeleton for sections
const SectionLoader = () => (
  <div className="w-full py-24 px-5 md:px-10 flex flex-col items-center space-y-4">
    <div className="w-1/4 h-8 bg-gray-100 rounded animate-pulse" />
    <div className="w-1/2 h-4 bg-gray-50 rounded animate-pulse" />
    <div className="w-full h-64 bg-gray-50 rounded-xl animate-pulse mt-8" />
  </div>
);

// No longer needs props for navigation as Navbar uses Router
const LoftonRealtyHome = () => {
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