
import { ShoppingBag, Plane, FileText, Heart, GraduationCap, Users, Stethoscope, Phone, Mail, MapPin } from 'lucide-react';
import { NavItem, ServiceItem } from '@/types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'HOME', href: '/' },
  { label: 'LEISTUNGEN', href: '/leistungen' },
  { label: 'ÜBER UNS', href: '#about' },
  { label: 'NEWS', href: '#news' },
  { label: 'GÄSTEBUCH', href: '#guestbook' },
  { label: 'KONTAKT', href: '#contact' },
  { label: 'JETZT BUCHEN', href: '#' },
];

export const CONTACT_INFO = {
  phone: '+49 6721 12345',
  mobile: '+49 176 12345678',
  location: 'Zentrale am Stadtbahnhof',
  address: 'Espenschiedstraße 1',
  city: '55411 Bingen am Rhein',
  email: 'info@as-taxi.de',
  whatsapp: '+49 176 12345678',
};

export const LOGO_URL = "https://image2url.com/r2/default/images/1772004831119-52dfe8cc-8b8b-47d2-b5c2-77a5e5587538.png";

export const SERVICES: ServiceItem[] = [
  {
    id: 'shopping',
    title: 'Einkaufsfahrten',
    description: 'Hilfe bei Besorgungen',
    icon: ShoppingBag
  },
  {
    id: 'airport',
    title: 'Flughafentransfer',
    description: 'Bingen ↔ Region',
    icon: Plane
  },
  {
    id: 'medicare',
    title: 'Krankenfahrten',
    description: 'Sitzend zum Arzt',
    icon: Stethoscope
  },
  {
    id: 'school',
    title: 'Schülerfahrten',
    description: 'Sicher zur Schule',
    icon: GraduationCap
  }
];
