import { LucideIcon } from 'lucide-react';

export interface Property {
  id: string;
  price: string;
  address: string;
  location: string;
  city: string; // Added for SEO/Breadcrumbs
  state: string; // Added for SEO/Breadcrumbs
  zip: string; // Added for SEO
  beds: number;
  baths: number;
  sqft: string;
  lotSize?: string; // New
  yearBuilt?: number; // New
  mlsId?: string; // New
  images: string[]; 
  status?: 'New Listing' | 'Pending' | 'Price Drop';
  type: 'buy' | 'rent';
  description?: string; // New SEO friendly description
  features?: string[]; // New list of amenities
}

export interface Service {
  title: string;
  description: string;
  icon: LucideIcon;
  linkText: string;
  linkUrl: string;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
  icon: LucideIcon;
}

export interface LocationStats {
  label: string;
  value: string;
  trend: 'up' | 'down' | 'neutral';
}

export interface LocationArea {
  id: string;
  name: string;
  description: string; 
  longDescription: string; 
  image: string; 
  propertyCount: number; 
  pattern: 'grid' | 'waves' | 'topo';
  stats: LocationStats;
}

export interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
}

export interface NavLink {
  label: string;
  href: string;
}