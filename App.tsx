import React, { Suspense, lazy } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { ScrollToTop } from './components/ScrollToTop';
import { Loader2 } from 'lucide-react';

// Lazy load pages to split code into smaller chunks
// This ensures users only download the code for the page they are viewing
const LoftonRealtyHome = lazy(() => import('./components/LoftonRealtyHome'));
const PropertyListings = lazy(() => import('./components/PropertyListings').then(module => ({ default: module.PropertyListings })));
const PropertyDetailPage = lazy(() => import('./components/PropertyDetailPage').then(module => ({ default: module.PropertyDetailPage })));
const BuyerGuide = lazy(() => import('./components/BuyerGuide').then(module => ({ default: module.BuyerGuide })));
const SellerGuide = lazy(() => import('./components/SellerGuide').then(module => ({ default: module.SellerGuide })));
const ContactPage = lazy(() => import('./components/ContactPage').then(module => ({ default: module.ContactPage })));
const AboutPage = lazy(() => import('./components/AboutPage').then(module => ({ default: module.AboutPage })));
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy').then(module => ({ default: module.PrivacyPolicy })));
const TermsOfService = lazy(() => import('./components/TermsOfService').then(module => ({ default: module.TermsOfService })));
const NotFound = lazy(() => import('./components/NotFound').then(module => ({ default: module.NotFound })));

// Global Loading Spinner for Route Transitions
const PageLoader = () => (
  <div className="fixed inset-0 bg-white z-[9999] flex flex-col items-center justify-center">
    <Loader2 className="w-10 h-10 text-brand animate-spin mb-4" />
    <p className="text-gray-400 text-sm font-medium tracking-widest uppercase animate-pulse">Loading Lofton Realty...</p>
  </div>
);

function App() {
  const navigate = useNavigate();

  // Helper to maintain compatibility with existing component props
  const navigateTo = (path: string) => () => navigate(path);

  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route 
            path="/" 
            element={<LoftonRealtyHome />} 
          />
          
          <Route 
            path="/properties" 
            element={
              <PropertyListings 
                onNavigateHome={navigateTo('/')} 
              />
            } 
          />

          <Route 
            path="/properties/:id" 
            element={<PropertyDetailPage />} 
          />

          <Route 
            path="/buy" 
            element={
              <BuyerGuide 
                onNavigateHome={navigateTo('/')} 
                onNavigateListings={navigateTo('/properties')}
              />
            } 
          />

          <Route 
            path="/sell" 
            element={
              <SellerGuide 
                onNavigateHome={navigateTo('/')}
                onNavigateListings={navigateTo('/properties')}
              />
            } 
          />

          <Route 
            path="/contact" 
            element={
              <ContactPage 
                onNavigateHome={navigateTo('/')}
                onNavigateListings={navigateTo('/properties')}
                onNavigateGuide={navigateTo('/buy')}
                onNavigateSeller={navigateTo('/sell')}
              />
            } 
          />

          <Route 
            path="/about" 
            element={
              <AboutPage 
                onNavigateHome={navigateTo('/')}
                onNavigateListings={navigateTo('/properties')}
                onNavigateGuide={navigateTo('/buy')}
                onNavigateSeller={navigateTo('/sell')}
                onNavigateContact={navigateTo('/contact')}
              />
            } 
          />

          <Route 
            path="/privacy" 
            element={
              <PrivacyPolicy 
                onNavigateHome={navigateTo('/')}
                onNavigateListings={navigateTo('/properties')}
                onNavigateGuide={navigateTo('/buy')}
                onNavigateSeller={navigateTo('/sell')}
                onNavigateContact={navigateTo('/contact')}
              />
            } 
          />

          <Route 
            path="/terms" 
            element={
              <TermsOfService 
                onNavigateHome={navigateTo('/')}
                onNavigateListings={navigateTo('/properties')}
                onNavigateGuide={navigateTo('/buy')}
                onNavigateSeller={navigateTo('/sell')}
                onNavigateContact={navigateTo('/contact')}
              />
            } 
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;