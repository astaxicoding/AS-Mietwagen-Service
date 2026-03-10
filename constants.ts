import { ShoppingBag, Plane, FileText, Heart, GraduationCap, Users, Stethoscope, Phone, Mail, MapPin } from 'lucide-react';
import { NavItem, ServiceItem, Vehicle, Testimonial } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'HOME', href: '/' },
  { label: 'LEISTUNGEN', href: '/leistungen' },
  { label: 'NEWS', href: '/#news' },
  { label: 'GÄSTEBUCH', href: '/#guestbook' },
  { label: 'KONTAKT', href: '/#contact' },
  { label: 'JETZT BUCHEN', href: '#booking' },
];

export const CONTACT_INFO = {
  phone: '+49 (0) 6721 984 84 82',
  mobile: '+49 (0) 172 280 4437',
  email: 'info@as-mietwagen-service.de',
  address: 'Espenschiedstraße 1',
  city: '55411 Bingen am Rhein',
  location: 'Zentrale am Stadtbahnhof'
};

export const LOGO_URL = "https://image2url.com/r2/default/images/1772004831119-52dfe8cc-8b8b-47d2-b5c2-77a5e5587538.png";

export const SERVICES: ServiceItem[] = [
  {
    id: 'shopping',
    title: 'Einkaufsfahrten',
    description: 'Wir helfen Ihnen gerne bei Ihren Erledigungen und bringen Sie und Ihre Einkäufe sicher nach Hause.',
    icon: ShoppingBag
  },
  {
    id: 'airport',
    title: 'Flughafenfahrten',
    description: 'Starten Sie entspannt in den Urlaub. Wir bringen Sie pünktlich zum Flughafen Ihrer Wahl.',
    icon: Plane
  },
  {
    id: 'courier',
    title: 'Kurierfahrten',
    description: 'Schnelle und zuverlässige Zustellung Ihrer Dokumente und Pakete.',
    icon: FileText
  },
  {
    id: 'medical',
    title: 'Krankenfahrten',
    description: 'Sitzendbeförderung zu Arztterminen, Dialyse oder Therapie. Zulassung bei allen Krankenkassen.',
    icon: Heart
  },
  {
    id: 'school',
    title: 'Schülerfahrten und Kindertransporte',
    description: 'Sicherer Schulweg für Ihre Kinder. Wir sorgen für eine verantwortungsvolle Beförderung.',
    icon: GraduationCap
  },
  {
    id: 'bus',
    title: 'Großraumbus bis zu 8 Personen',
    description: 'Viel Platz für Gruppen und Gepäck. Ideal für Ausflüge oder Feiern.',
    icon: Users
  },
  {
    id: 'taxicare',
    title: 'TaxiCare Service',
    description: 'Professionelle Unterstützung und Starthilfe-Service für Ihr Fahrzeug.',
    icon: Stethoscope
  }
];

// Not explicitly shown in screenshots but kept for structure if needed
export const FLEET: Vehicle[] = []; 
export const TESTIMONIALS: Testimonial[] = [];