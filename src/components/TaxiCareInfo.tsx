
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageCircle, ArrowLeft, ShieldCheck, Zap, Heart, Clock, CheckCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import { CONTACT_INFO } from '@/constants';

interface TaxiCareInfoProps {
  onOpenBooking: (type?: string) => void;
  onOpenImpressum: () => void;
  onOpenDatenschutz: () => void;
}

const TaxiCareInfo: React.FC<TaxiCareInfoProps> = ({ onOpenBooking, onOpenImpressum, onOpenDatenschutz }) => {
  const dialNumber = CONTACT_INFO.mobile.replace(/\(0\)/g, '').replace(/[^\d+]/g, '');

  return (
    <div className="min-h-screen bg-white font-sans">
      <Header onOpenBooking={onOpenBooking} />
      
      <main className="pt-32 pb-24">
        {/* Hero Section */}
        <div className="bg-black py-20 mb-16 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <img 
              src="https://i.ibb.co/TxnqKbxB/Untitled-design.png" 
              alt="TaxiCare Background" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="container mx-auto px-6 text-center relative z-10">
            <Link to="/" className="inline-flex items-center gap-2 text-secondary font-black uppercase tracking-widest text-[10px] mb-8 hover:translate-x-[-4px] transition-transform">
              <ArrowLeft size={14} /> Zurück zur Startseite
            </Link>
            <h2 className="text-secondary font-bold text-xs tracking-[0.3em] uppercase mb-4">Exklusiver Service</h2>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 uppercase tracking-tighter">TaxiCare Service</h1>
            <div className="w-20 h-1 bg-secondary mx-auto"></div>
          </div>
        </div>

        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
              <div>
                <h3 className="text-3xl font-black text-black uppercase tracking-tighter mb-6">Wir helfen Ihnen, wenn nichts mehr geht.</h3>
                <p className="text-gray-600 leading-relaxed mb-8 font-medium">
                  Ob eine leere Batterie am Morgen oder ein technisches Problem unterwegs – unser TaxiCare-Service ist speziell darauf ausgerichtet, Ihnen in Notsituationen schnell und unkompliziert zur Seite zu stehen.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <div className="w-12 h-12 bg-secondary text-white rounded-xl flex items-center justify-center shadow-lg">
                      <Zap size={24} />
                    </div>
                    <div>
                      <h4 className="font-black text-black uppercase text-xs tracking-widest">Starthilfe</h4>
                      <p className="text-[10px] text-gray-400 font-bold">Schnelle Hilfe bei leerer Batterie</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <div className="w-12 h-12 bg-black text-white rounded-xl flex items-center justify-center shadow-lg">
                      <Clock size={24} />
                    </div>
                    <div>
                      <h4 className="font-black text-black uppercase text-xs tracking-widest">24/7 Verfügbar</h4>
                      <p className="text-[10px] text-gray-400 font-bold">Rund um die Uhr für Sie da</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <div className="w-12 h-12 bg-secondary text-white rounded-xl flex items-center justify-center shadow-lg">
                      <ShieldCheck size={24} />
                    </div>
                    <div>
                      <h4 className="font-black text-black uppercase text-xs tracking-widest">Zuverlässig</h4>
                      <p className="text-[10px] text-gray-400 font-bold">Erfahrene Mitarbeiter</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl border-8 border-white relative">
                  <img 
                    src="https://i.ibb.co/TxnqKbxB/Untitled-design.png" 
                    alt="TaxiCare Service" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-8 left-8 right-8">
                    <div className="bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-xl">
                      <p className="text-black font-black uppercase tracking-tighter text-lg mb-1">Sofort-Hilfe</p>
                      <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Rufen Sie uns direkt an</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action Buttons */}
            <div className="bg-gray-50 rounded-[50px] p-10 md:p-16 border border-gray-100 text-center mb-20 shadow-sm">
              <h3 className="text-2xl md:text-4xl font-black text-black uppercase tracking-tighter mb-4">Jetzt Hilfe anfordern</h3>
              <p className="text-gray-500 max-w-xl mx-auto mb-12 font-medium">
                Warten Sie nicht länger in der Kälte. Unsere Zentrale koordiniert sofort ein Fahrzeug in Ihrer Nähe.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <a 
                  href={`tel:${dialNumber}`}
                  className="flex-1 bg-black text-white py-6 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 shadow-2xl hover:bg-secondary transition-all transform hover:scale-105 active:scale-95"
                >
                  <Phone size={20} fill="currentColor" />
                  Jetzt anrufen
                </a>
                <a 
                  href={`https://wa.me/${CONTACT_INFO.mobile.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-[#25D366] text-white py-6 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 shadow-2xl hover:bg-[#1eb954] transition-all transform hover:scale-105 active:scale-95"
                >
                  <MessageCircle size={20} fill="currentColor" />
                  WhatsApp Chat
                </a>
              </div>
            </div>

            {/* Details Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                <CheckCircle className="text-secondary mb-4" size={32} />
                <h4 className="font-black text-black uppercase tracking-tight mb-2">Starthilfe</h4>
                <p className="text-gray-500 text-sm leading-relaxed">Wir überbrücken Ihr Fahrzeug fachgerecht und sicher, damit Sie Ihre Fahrt fortsetzen können.</p>
              </div>
              <div className="p-8 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                <CheckCircle className="text-secondary mb-4" size={32} />
                <h4 className="font-black text-black uppercase tracking-tight mb-2">Kleinreparaturen</h4>
                <p className="text-gray-500 text-sm leading-relaxed">Unterstützung bei kleineren technischen Problemen, die vor Ort gelöst werden können.</p>
              </div>
              <div className="p-8 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                <CheckCircle className="text-secondary mb-4" size={32} />
                <h4 className="font-black text-black uppercase tracking-tight mb-2">Abschleppdienst</h4>
                <p className="text-gray-500 text-sm leading-relaxed">Sollte eine Weiterfahrt nicht möglich sein, organisieren wir den Weitertransport Ihres Fahrzeugs.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer onOpenImpressum={onOpenImpressum} onOpenDatenschutz={onOpenDatenschutz} />
    </div>
  );
};

export default TaxiCareInfo;
