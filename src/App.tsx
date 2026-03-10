import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Mail, MapPin, Car, Plane, Clock, Shield, Menu, X, ChevronRight, Facebook, Instagram, Linkedin } from 'lucide-react';

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Leistungen', href: '#services' },
    { name: 'Fuhrpark', href: '#fleet' },
    { name: 'Über uns', href: '#about' },
    { name: 'Kontakt', href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/90 backdrop-blur-md py-3 shadow-lg' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <a href="#" className="text-2xl font-bold tracking-tighter text-white flex items-center gap-2">
              <Car className="text-emerald-500" />
              <span>AS <span className="text-emerald-500">MIETWAGEN</span></span>
            </a>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-white/80 hover:text-emerald-500 transition-colors uppercase tracking-widest"
              >
                {link.name}
              </a>
            ))}
            <a
              href="tel:+49123456789"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-full text-sm font-bold transition-all flex items-center gap-2"
            >
              <Phone size={16} />
              JETZT ANRUFEN
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white p-2"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-black/95 backdrop-blur-xl absolute top-full left-0 w-full border-t border-white/10"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-4 text-base font-medium text-white hover:bg-emerald-600/20 rounded-lg transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4">
                <a
                  href="tel:+49123456789"
                  className="w-full bg-emerald-600 text-white px-6 py-4 rounded-xl text-center font-bold flex items-center justify-center gap-2"
                >
                  <Phone size={20} />
                  JETZT ANRUFEN
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop"
          alt="Luxury Car"
          className="w-full h-full object-cover scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-bold tracking-widest uppercase mb-6">
            Premium Chauffeur & Airport Service
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.1] mb-6 tracking-tight">
            Exklusiver Fahrservice <br />
            <span className="text-emerald-500">für höchste Ansprüche</span>
          </h1>
          <p className="text-xl text-white/70 mb-10 leading-relaxed max-w-lg">
            Zuverlässig, diskret und komfortabel. Wir bringen Sie sicher an Ihr Ziel – ob zum Flughafen, zum Business-Meeting oder zu Ihrem Event.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#contact"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 group"
            >
              Jetzt Anfragen
              <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#services"
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-xl font-bold text-lg transition-all text-center"
            >
              Unsere Leistungen
            </a>
          </div>
        </motion.div>
      </div>

      {/* Stats Overlay */}
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Jahre Erfahrung', value: '10+' },
              { label: 'Zufriedene Kunden', value: '5k+' },
              { label: 'Fahrzeuge', value: '15+' },
              { label: 'Verfügbarkeit', value: '24/7' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="text-center md:text-left"
              >
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-white/50 uppercase tracking-widest font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    {
      title: 'Flughafentransfer',
      description: 'Pünktliche und stressfreie Fahrten zu allen großen Flughäfen in der Region. Wir tracken Ihren Flug für eine reibungslose Abholung.',
      icon: Plane,
    },
    {
      title: 'Chauffeur-Service',
      description: 'Professionelle Chauffeure für Ihre geschäftlichen Termine oder privaten Anlässe. Diskretion und Komfort stehen an erster Stelle.',
      icon: Car,
    },
    {
      title: 'Kurierfahrten',
      description: 'Schnelle und sichere Zustellung Ihrer wichtigen Dokumente oder Pakete. Direkt und ohne Umwege zum Ziel.',
      icon: Clock,
    },
    {
      title: 'Business-Service',
      description: 'Maßgeschneiderte Mobilitätslösungen für Unternehmen. Monatliche Abrechnung und priorisierte Buchungen.',
      icon: Shield,
    },
  ];

  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-emerald-600 uppercase tracking-[0.2em] mb-4">Was wir bieten</h2>
          <p className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">Unsere Leistungen</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="p-8 rounded-3xl bg-slate-50 border border-slate-100 transition-all hover:shadow-xl hover:shadow-emerald-500/5 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-emerald-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <service.icon className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">{service.title}</h3>
              <p className="text-slate-600 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Fleet = () => {
  const cars = [
    {
      name: 'Mercedes S-Klasse',
      type: 'First Class',
      passengers: 3,
      bags: 2,
      image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2070&auto=format&fit=crop',
    },
    {
      name: 'Mercedes E-Klasse',
      type: 'Business Class',
      passengers: 3,
      bags: 2,
      image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop',
    },
    {
      name: 'Mercedes V-Klasse',
      type: 'Business Van',
      passengers: 7,
      bags: 6,
      image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2070&auto=format&fit=crop',
    },
  ];

  return (
    <section id="fleet" className="py-24 bg-slate-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h2 className="text-sm font-bold text-emerald-500 uppercase tracking-[0.2em] mb-4 text-center md:text-left">Unser Fuhrpark</h2>
            <p className="text-4xl md:text-5xl font-bold tracking-tight text-center md:text-left">Moderne Fahrzeuge für <br /> jeden Anlass</p>
          </div>
          <p className="text-white/60 max-w-md text-center md:text-left">
            Unsere Flotte besteht ausschließlich aus gepflegten, modernen Fahrzeugen der Premium-Klasse, um Ihnen maximale Sicherheit und Komfort zu bieten.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cars.map((car, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="group relative rounded-3xl overflow-hidden bg-white/5 border border-white/10"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-1">{car.name}</h3>
                    <span className="text-emerald-500 text-sm font-bold uppercase tracking-widest">{car.type}</span>
                  </div>
                </div>
                <div className="flex gap-6 text-white/60 text-sm">
                  <div className="flex items-center gap-2">
                    <Menu size={16} className="text-emerald-500" />
                    <span>{car.passengers} Personen</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield size={16} className="text-emerald-500" />
                    <span>{car.bags} Koffer</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-sm font-bold text-emerald-600 uppercase tracking-[0.2em] mb-4">Kontakt</h2>
            <p className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-8">Bereit für Ihre Fahrt?</p>
            <p className="text-lg text-slate-600 mb-12 leading-relaxed">
              Haben Sie Fragen oder möchten Sie direkt eine Fahrt buchen? Kontaktieren Sie uns telefonisch oder nutzen Sie unser Kontaktformular. Wir antworten Ihnen so schnell wie möglich.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center shrink-0">
                  <Phone className="text-emerald-600" size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 mb-1">Telefon</h4>
                  <p className="text-slate-600">+49 (0) 123 456 789</p>
                  <p className="text-emerald-600 font-medium">24/7 Erreichbar</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center shrink-0">
                  <Mail className="text-emerald-600" size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 mb-1">E-Mail</h4>
                  <p className="text-slate-600">info@as-mietwagen-service.de</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center shrink-0">
                  <MapPin className="text-emerald-600" size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 mb-1">Standort</h4>
                  <p className="text-slate-600">Musterstraße 123, 12345 Musterstadt</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-8 md:p-12 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1 uppercase tracking-wider">Name</label>
                  <input
                    type="text"
                    placeholder="Ihr Name"
                    className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1 uppercase tracking-wider">E-Mail</label>
                  <input
                    type="email"
                    placeholder="Ihre E-Mail"
                    className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1 uppercase tracking-wider">Betreff</label>
                <select className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all appearance-none">
                  <option>Flughafentransfer</option>
                  <option>Chauffeur-Service</option>
                  <option>Kurierfahrt</option>
                  <option>Allgemeine Anfrage</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1 uppercase tracking-wider">Nachricht</label>
                <textarea
                  rows={4}
                  placeholder="Wie können wir Ihnen helfen?"
                  className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all resize-none"
                ></textarea>
              </div>
              <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-5 rounded-2xl font-bold text-lg shadow-lg shadow-emerald-600/20 transition-all active:scale-[0.98]">
                Anfrage senden
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-1">
            <a href="#" className="text-2xl font-bold tracking-tighter text-white flex items-center gap-2 mb-6">
              <Car className="text-emerald-500" />
              <span>AS <span className="text-emerald-500">MIETWAGEN</span></span>
            </a>
            <p className="text-white/50 leading-relaxed mb-8">
              Ihr zuverlässiger Partner für exklusive Personenbeförderung und Flughafentransfers. Qualität und Diskretion seit über 10 Jahren.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-emerald-600 transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-emerald-600 transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-emerald-600 transition-colors">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-white/50">
              <li><a href="#" className="hover:text-emerald-500 transition-colors">Home</a></li>
              <li><a href="#services" className="hover:text-emerald-500 transition-colors">Leistungen</a></li>
              <li><a href="#fleet" className="hover:text-emerald-500 transition-colors">Fuhrpark</a></li>
              <li><a href="#about" className="hover:text-emerald-500 transition-colors">Über uns</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Leistungen</h4>
            <ul className="space-y-4 text-white/50">
              <li><a href="#" className="hover:text-emerald-500 transition-colors">Flughafentransfer</a></li>
              <li><a href="#" className="hover:text-emerald-500 transition-colors">Chauffeur-Service</a></li>
              <li><a href="#" className="hover:text-emerald-500 transition-colors">Kurierfahrten</a></li>
              <li><a href="#" className="hover:text-emerald-500 transition-colors">Business-Service</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Newsletter</h4>
            <p className="text-white/50 mb-6">Erhalten Sie exklusive Angebote und Neuigkeiten.</p>
            <div className="relative">
              <input
                type="email"
                placeholder="E-Mail Adresse"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 outline-none focus:border-emerald-500 transition-all"
              />
              <button className="absolute right-2 top-2 bottom-2 bg-emerald-600 hover:bg-emerald-700 px-4 rounded-lg transition-all">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-white/40 text-sm">
          <p>© {new Date().getFullYear()} AS Mietwagen Service. Alle Rechte vorbehalten.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Impressum</a>
            <a href="#" className="hover:text-white transition-colors">Datenschutz</a>
            <a href="#" className="hover:text-white transition-colors">AGB</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-white selection:bg-emerald-500/30 selection:text-emerald-900">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Fleet />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
