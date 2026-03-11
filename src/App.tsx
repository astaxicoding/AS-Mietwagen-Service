
import React, { useState, useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import News from './components/News';
import Guestbook from './components/Guestbook';
import Footer from './components/Footer';
import BookingOverlay from './components/BookingOverlay';
import Impressum from './components/Impressum';
import Datenschutz from './components/Datenschutz';
import Preloader from './components/Preloader';
import PromoPopup from './components/PromoPopup';

import AdminPanel from './components/AdminPanel';
const LeistungenPage = React.lazy(() => import('./components/LeistungenPage'));
const TaxiCareInfo = React.lazy(() => import('./components/TaxiCareInfo'));

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

function HomePage({ onOpenBooking, onOpenImpressum, onOpenDatenschutz }: any) {
  return (
    <div className="animate-fadeIn">
      <Header onOpenBooking={onOpenBooking} />
      <main>
        <Hero onOpenBooking={onOpenBooking} />
        <About />
        <Services />
        <News />
        <Guestbook />
      </main>
      <Footer onOpenImpressum={onOpenImpressum} onOpenDatenschutz={onOpenDatenschutz} />
    </div>
  );
}

// Global variables to track state across navigation but reset on F5
let hasShownPreloader = false;
let hasShownPromo = false;

export default function App() {
  const [isPreloading, setIsPreloading] = useState(!hasShownPreloader);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preselectedType, setPreselectedType] = useState<string | null>(null);
  const [isImpressumOpen, setIsImpressumOpen] = useState(false);
  const [isDatenschutzOpen, setIsDatenschutzOpen] = useState(false);
  const [isPromoOpen, setIsPromoOpen] = useState(false);

  useEffect(() => {
    // Show promo popup after 5 seconds on first load
    // Only show if it hasn't been shown in this session and preloading is done
    if (hasShownPromo || isPreloading) return;

    const timer = setTimeout(() => {
      setIsPromoOpen(true);
      hasShownPromo = true;
    }, 5000);
    return () => clearTimeout(timer);
  }, [isPreloading]);

  const openBooking = (type?: string) => {
    setPreselectedType(type || null);
    setIsBookingOpen(true);
  };

  const handlePreloaderComplete = () => {
    hasShownPreloader = true;
    setIsPreloading(false);
  };

  return (
    <Router>
      <ScrollToTop />
      
      {isPreloading && <Preloader onComplete={handlePreloaderComplete} />}
      
      {!isPreloading && (
        <>
          <Suspense fallback={<div className="h-screen w-full bg-black flex items-center justify-center text-white font-black uppercase tracking-widest text-xs">Lade...</div>}>
            <Routes>
              <Route 
                path="/" 
                element={
                  <HomePage 
                    onOpenBooking={openBooking} 
                    onOpenImpressum={() => setIsImpressumOpen(true)} 
                    onOpenDatenschutz={() => setIsDatenschutzOpen(true)} 
                  />
                } 
              />
              <Route 
                path="/leistungen" 
                element={
                  <LeistungenPage 
                    onOpenBooking={openBooking} 
                    onOpenImpressum={() => setIsImpressumOpen(true)} 
                    onOpenDatenschutz={() => setIsDatenschutzOpen(true)} 
                  />
                } 
              />
              <Route 
                path="/taxicare" 
                element={
                  <TaxiCareInfo 
                    onOpenBooking={openBooking} 
                    onOpenImpressum={() => setIsImpressumOpen(true)} 
                    onOpenDatenschutz={() => setIsDatenschutzOpen(true)} 
                  />
                } 
              />
              <Route path="/admin" element={<AdminPanel />} />
            </Routes>
          </Suspense>

          <BookingOverlay 
            isOpen={isBookingOpen} 
            onClose={() => setIsBookingOpen(false)} 
            preselectedType={preselectedType}
          />
          
          <Impressum 
            isOpen={isImpressumOpen} 
            onClose={() => setIsImpressumOpen(false)} 
          />
          
          <Datenschutz 
            isOpen={isDatenschutzOpen} 
            onClose={() => setIsDatenschutzOpen(false)} 
          />

          <PromoPopup 
            isOpen={isPromoOpen} 
            onClose={() => setIsPromoOpen(false)} 
          />
        </>
      )}
    </Router>
  );
}
