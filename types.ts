
import { LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface Testimonial {
  name: string;
  role: string;
  text: string;
}

export interface Vehicle {
  name: string;
  category: string;
  features: string[];
  imageUrl: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  date?: string;
  pickup?: string;
  destination?: string;
}

export type PaymentMethod = 'Bar' | 'EC-Karte' | 'PayPal' | 'Rechnung';

export interface BookingDetails {
  pickup: string;
  destination: string;
  date: string;
  time: string;
  vehicleType: string;
  passengers: number;
  name: string;
  phone: string;
  email: string;
  notes: string;
  paymentMethod: PaymentMethod;
  price: number;
  hasTrailer?: boolean;
}

export interface BookingServiceOption {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  pricePerKm: number;
  icon: LucideIcon;
  capacity: number;
  eta: number;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  message: string;
  date: string;
  source?: 'google' | 'local';
}

export interface NewsPost {
  id: string;
  title: string;
  content: string;
  date: string;
}
