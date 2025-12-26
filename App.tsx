import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import LoftonRealtyHome from './components/LoftonRealtyHome';
import { PropertyListings } from './components/PropertyListings';
import { PropertyDetailPage } from './components/PropertyDetailPage';
import { BuyerGuide } from './components/BuyerGuide';
import { SellerGuide } from './components/SellerGuide';
import { ContactPage } from './components/ContactPage';
import { AboutPage } from './components/AboutPage';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsOfService } from './components/TermsOfService';
import { ScrollToTop } from './components/ScrollToTop';
import { NotFound } from './components/NotFound';

function App() {
  const navigate = useNavigate();

  // Helper to maintain compatibility with existing component props
  const navigateTo = (path: string) => () => navigate(path);

  return (
    <>
      <ScrollToTop />
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
    </>
  );
}

export default App;