
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import News from './components/News';
import Guestbook from './components/Guestbook';
import Footer from './components/Footer';
import BookingOverlay from './components/BookingOverlay';
import AdminPanel from './components/AdminPanel';
import LeistungenPage from './components/LeistungenPage';
import Impressum from './components/Impressum';
import Datenschutz from './components/Datenschutz';
import PromoPopup from './components/PromoPopup';

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
    </Router>
  );
}
