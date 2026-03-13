import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from '@/components/AppHeader';
import Hero from '@/components/AppHero';
import About from '@/components/AppAbout';
import Services from '@/components/AppServices';
import News from '@/components/AppNews';
import Guestbook from '@/components/AppGuestbook';
import Footer from '@/components/AppFooter';
import BookingOverlay from '@/components/AppBookingOverlay';
import AdminPanel from '@/components/AppAdminPanel';
import LeistungenPage from '@/components/AppLeistungenPage';
import LegalImpressum from '@/components/LegalImpressum';
import LegalDatenschutz from '@/components/LegalDatenschutz';
import PromoPopup from '@/components/AppPromoPopup';

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [pathname, hash]);
  return null;
}

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isImpressumOpen, setIsImpressumOpen] = useState(false);
  const [isDatenschutzOpen, setIsDatenschutzOpen] = useState(false);
  const [isPromoOpen, setIsPromoOpen] = useState(false);
  const [preselectedType, setPreselectedType] = useState<string | null>(null);

  const openBooking = (type?: string) => {
    setPreselectedType(type || null);
    setIsBookingOpen(true);
  };

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={
          <div className="min-h-screen">
            <Header onOpenBooking={() => openBooking()} />
            <Hero onOpenBooking={() => openBooking()} />
            <About />
            <Services />
            <News />
            <Guestbook />
            <Footer 
              onOpenImpressum={() => setIsImpressumOpen(true)} 
              onOpenDatenschutz={() => setIsDatenschutzOpen(true)} 
            />
          </div>
        } />
        <Route path="/leistungen" element={
          <LeistungenPage 
            onOpenBooking={(type) => openBooking(type)} 
            onOpenImpressum={() => setIsImpressumOpen(true)} 
            onOpenDatenschutz={() => setIsDatenschutzOpen(true)} 
          />
        } />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>

      <BookingOverlay 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
        preselectedType={preselectedType}
      />
      
      <LegalImpressum 
        isOpen={isImpressumOpen} 
        onClose={() => setIsImpressumOpen(false)} 
      />
      
      <LegalDatenschutz 
        isOpen={isDatenschutzOpen} 
        onClose={() => setIsDatenschutzOpen(false)} 
      />
      
      <PromoPopup 
        isOpen={isPromoOpen} 
        onClose={() => setIsPromoOpen(false)} 
      />
    </Router>
  );
}
