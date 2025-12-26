import { Home, Star, Award, Clock, Key, TrendingUp, PiggyBank, Target, Users, MapPin } from 'lucide-react';
import { Property, LocationArea, Stat, Testimonial } from './types';

export const PROPERTIES: Property[] = [
  {
    id: '1',
    price: '$450,000',
    address: '123 Oak Street',
    location: 'Houston, TX',
    city: 'Houston',
    state: 'TX',
    zip: '77002',
    beds: 3,
    baths: 2,
    sqft: '2,100',
    lotSize: '0.25 acres',
    yearBuilt: 2019,
    mlsId: 'LR-249102',
    images: [
      'https://images.unsplash.com/photo-1600596542815-2a4d9f6facb8?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfe1?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=1200&q=80'
    ],
    status: 'New Listing',
    type: 'buy',
    description: "Welcome to this stunning contemporary home located in the heart of Houston's vibrant Oak Forest neighborhood. This meticulously maintained property offers the perfect blend of modern luxury and comfortable living, featuring high ceilings, abundant natural light, and premium finishes throughout.\n\nThe open-concept living area flows seamlessly into a chef's kitchen, equipped with quartz countertops, a large island, and top-of-the-line stainless steel appliances. The primary suite is a true retreat, boasting a spa-like bathroom with a soaking tub and a spacious walk-in closet. Outside, enjoy a beautifully landscaped backyard with a covered patio, perfect for entertaining guests or relaxing after a long day.\n\nConveniently situated near major highways, top-rated schools, and Houston's best dining and shopping destinations, this home provides an unparalleled lifestyle opportunity. Don't miss your chance to own a piece of modern elegance in one of the city's most sought-after communities.",
    features: [
      'Open-concept living and dining',
      'Chef\'s kitchen with quartz counters',
      'Stainless steel appliances',
      'Primary suite with walk-in closet',
      'Covered outdoor patio',
      'Energy-efficient windows',
      'Two-car attached garage',
      'Smart home technology ready'
    ]
  },
  {
    id: '2',
    price: '$625,000',
    address: '456 Beach Boulevard',
    location: 'Galveston, TX',
    city: 'Galveston',
    state: 'TX',
    zip: '77550',
    beds: 2,
    baths: 2,
    sqft: '1,800',
    lotSize: '0.18 acres',
    yearBuilt: 2015,
    mlsId: 'LR-882109',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1613553507747-5f8d62ad5904?auto=format&fit=crop&w=1200&q=80'
    ],
    status: 'Pending',
    type: 'buy',
    description: "Experience the ultimate coastal lifestyle in this charming beachfront bungalow in Galveston, Texas. Just steps away from the sand and surf, this property offers breathtaking Gulf views and a relaxed atmosphere that feels like a permanent vacation.\n\nThe interior features durable wood-look tile flooring, a bright and airy color palette, and large windows that frame the ocean scenery. The kitchen is designed for efficiency and style, while the spacious deck provides ample room for sunbathing or alfresco dining. Whether you're looking for a full-time residence or a lucrative short-term rental investment, this home delivers on all fronts.\n\nLocated near the historic Strand district and popular local attractions, 456 Beach Boulevard combines privacy with accessibility. Wake up to the sound of waves and enjoy the best of island living in a home built to withstand the elements while providing maximum comfort.",
    features: [
      'Direct beach access',
      'Expansive ocean view deck',
      'Storm-rated windows',
      'Low-maintenance landscaping',
      'Outdoor shower',
      'Updated HVAC system',
      'Short-term rental potential',
      'Close to The Strand'
    ]
  },
  {
    id: '3',
    price: '$550,000',
    address: '789 Sunset Drive',
    location: 'Austin, TX',
    city: 'Austin',
    state: 'TX',
    zip: '78704',
    beds: 4,
    baths: 3,
    sqft: '2,500',
    lotSize: '0.30 acres',
    yearBuilt: 2021,
    mlsId: 'LR-334910',
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80'
    ],
    status: 'Price Drop',
    type: 'buy',
    description: "Nestled in the rolling hills of Austin, this modern farmhouse offers a serene escape without sacrificing city convenience. 789 Sunset Drive is a masterpiece of design, featuring board-and-batten siding, metal roof accents, and a sprawling front porch that welcomes you home.\n\nInside, you'll find an expansive floor plan with vaulted ceilings and exposed beams. The gourmet kitchen boasts a farmhouse sink, custom cabinetry, and a walk-in pantry. The master suite is located on the main floor for privacy, offering a luxurious bath and direct access to the back patio. The backyard is an oasis with mature oak trees and plenty of room for a pool.\n\nJust minutes from downtown Austin's tech corridor and famous live music venues, this property offers the best of both worlds. Enjoy the tranquility of hill country living with easy access to the vibrant culture that makes Austin unique.",
    features: [
      'Modern farmhouse design',
      'Vaulted ceilings with beams',
      'Gourmet kitchen w/ pantry',
      'Main floor primary suite',
      'Large covered porch',
      'Smart thermostat & doorbell',
      'Mature oak trees',
      'Room for a pool'
    ]
  },
  {
    id: '4',
    price: '$3,200/mo',
    address: '101 Downtown Lofts',
    location: 'Houston, TX',
    city: 'Houston',
    state: 'TX',
    zip: '77002',
    beds: 1,
    baths: 1,
    sqft: '900',
    lotSize: 'N/A',
    yearBuilt: 2018,
    mlsId: 'LR-RENT-001',
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80'
    ],
    status: 'New Listing',
    type: 'rent',
    description: "Discover urban living at its finest in this chic loft apartment located in the heart of Downtown Houston. With floor-to-ceiling windows, polished concrete floors, and exposed ductwork, this unit exudes industrial elegance and modern sophistication.\n\nThe open layout maximizes space, providing a versatile living area that can easily accommodate a home office. The kitchen features sleek European-style cabinetry and integrated appliances. Residents enjoy access to premium building amenities, including a rooftop infinity pool, 24-hour fitness center, and concierge services.\n\nWalk to work or explore the nearby theater district, sports arenas, and award-winning restaurants. This is perfect for professionals seeking a high-energy lifestyle with luxury conveniences right at their doorstep.",
    features: [
      'Floor-to-ceiling windows',
      'Polished concrete floors',
      'In-unit washer/dryer',
      'Rooftop infinity pool access',
      '24-hour fitness center',
      'Concierge service',
      'Secure garage parking',
      'Pet-friendly building'
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    quote: "The Lofton team turned our vague idea of a 'dream home' into reality. Their patience, market insight, and ability to listen were unmatched throughout the process.",
    author: "Elena Rodriguez",
    role: "First-time Buyer"
  },
  {
    id: 2,
    quote: "We needed to sell quickly due to a job relocation. They handled everything efficiently, from staging to closing, and we got an offer above asking in just 4 days.",
    author: "Marcus Chen",
    role: "Seller, Downtown Loft"
  },
  {
    id: 3,
    quote: "Their investment advice is gold. We've built a robust rental portfolio in Austin thanks to their strategic guidance and deep understanding of emerging markets.",
    author: "The Thompson Family",
    role: "Property Investors"
  },
  {
    id: 4,
    quote: "Professionalism at its finest. They navigated a complex closing with ease and kept us informed every single step of the way.",
    author: "Sarah Jenkins",
    role: "Luxury Home Buyer"
  },
  {
    id: 5,
    quote: "Lofton Realty's marketing strategy is next level. Our home went viral and sold for significantly over asking price.",
    author: "Michael Ross",
    role: "Seller, The Heights"
  },
  {
    id: 6,
    quote: "Moving from out of state was stressful, but their team handled the logistics perfectly. We found our dream home in one weekend.",
    author: "The Davis Family",
    role: "Relocation Clients"
  }
];

export const LOCATIONS: LocationArea[] = [
  { 
    id: '1', 
    name: 'Houston, TX', 
    description: 'Urban luxury & high-rises', 
    longDescription: 'Houston, Texas offers a diverse mix of established neighborhoods, new construction homes, and thriving job centers, making it a great choice for buyers looking for long-term value in the Greater Houston area. From downtown lofts to suburban estates, explore real estate in America’s fourth-largest city.',
    image: 'https://images.unsplash.com/photo-1582457601550-9f5068422739?auto=format&fit=crop&w=800&q=80',
    propertyCount: 142,
    pattern: 'grid',
    stats: { label: 'Avg. DOM', value: '14 Days', trend: 'up' }
  },
  { 
    id: '2', 
    name: 'Galveston, TX', 
    description: 'Coastal living specialists', 
    longDescription: 'Galveston, Texas combines coastal living, historic architecture, and strong short-term rental potential, ideal for both full-time residents and investors seeking beach properties. Discover charming Victorian homes and modern waterfront condos along the Gulf Coast.',
    image: 'https://images.unsplash.com/photo-1621532936750-4824b077a284?auto=format&fit=crop&w=800&q=80',
    propertyCount: 38,
    pattern: 'waves',
    stats: { label: 'Active Listings', value: '245', trend: 'neutral' }
  },
  { 
    id: '3', 
    name: 'Austin, TX', 
    description: 'Tech hub & hill country', 
    longDescription: 'Austin, Texas is a vibrant hub of technology and culture, offering stunning hill country views and a dynamic real estate market. Whether you are seeking a modern downtown condo or a spacious family home near top-rated schools, Austin delivers exceptional lifestyle and growth.',
    image: 'https://images.unsplash.com/photo-1531218536973-5f8bbb3760b6?auto=format&fit=crop&w=800&q=80',
    propertyCount: 56,
    pattern: 'topo',
    stats: { label: 'YoY Growth', value: '+12.4%', trend: 'up' }
  },
  { 
    id: '4', 
    name: 'Louisiana', 
    description: 'Southern charm estates', 
    longDescription: 'Experience the unique charm of Louisiana real estate, from historic French Quarter style condos to sprawling southern estates with rich history. Our team connects buyers with distinctive properties that capture the soul and culture of the Pelican State.',
    image: 'https://images.unsplash.com/photo-1571508216395-46f9063c63aa?auto=format&fit=crop&w=800&q=80',
    propertyCount: 24,
    pattern: 'grid',
    stats: { label: 'Med. Price', value: '$385k', trend: 'up' }
  },
  { 
    id: '5', 
    name: 'Mississippi', 
    description: 'Gulf coast opportunities', 
    longDescription: 'The Mississippi Gulf Coast offers affordable coastal living and lucrative investment opportunities in emerging markets. Discover hidden gems, beachfront value, and welcoming communities perfect for retirement or vacation rental portfolios.',
    image: 'https://images.unsplash.com/photo-1627393430636-6e5472aa5e1c?auto=format&fit=crop&w=800&q=80',
    propertyCount: 19,
    pattern: 'waves',
    stats: { label: 'Rental Yield', value: '8.2%', trend: 'up' }
  },
  { 
    id: '6', 
    name: 'Florida', 
    description: 'Sunshine state expansion', 
    longDescription: 'Florida real estate remains a top choice for sunshine, tax benefits, and luxury coastal living. Our select portfolio includes exclusive vacation homes and high-yield investment properties across the Sunshine State’s most desirable destinations.',
    image: 'https://images.unsplash.com/photo-1535916041692-2df27f66299d?auto=format&fit=crop&w=800&q=80',
    propertyCount: 45,
    pattern: 'waves',
    stats: { label: 'New Devs', value: '50+', trend: 'up' }
  },
];

export const STATS: Stat[] = [
  { label: 'Properties Sold', value: 500, suffix: '+', icon: Home },
  { label: 'Client Satisfaction', value: 98, suffix: '%', icon: Star },
  { label: 'Years Experience', value: 15, suffix: '+', icon: Award },
  { label: 'Availability', value: 24, suffix: '/7', icon: Clock },
];

export const SERVICES = [
  { 
    title: 'Find Your Perfect Home', 
    desc: 'Expert guidance for first-time buyers and seasoned homeowners. Access to exclusive MLS listings, personalized property matching, and support throughout the entire buying process.',
    icon: Key 
  },
  { 
    title: 'Maximize Your Sale', 
    desc: 'Strategic marketing, professional staging consultation, and expert pricing strategies to get top dollar for your property. We handle everything from listing to closing.',
    icon: TrendingUp 
  },
  { 
    title: 'Build Your Portfolio', 
    desc: 'Investment property guidance, comprehensive market analysis, and rental strategy development for long-term wealth building and passive income generation.',
    icon: PiggyBank 
  },
];

export const FEATURES = [
  { title: "24/7 Client Availability", desc: "Always here when you need us, day or night", icon: Clock },
  { title: "Expert Market Knowledge", desc: "Deep understanding of local markets and trends", icon: Target },
  { title: "Personalized Service", desc: "Tailored strategies for your unique goals", icon: Users },
  { title: "Proven Track Record", desc: "500+ successful transactions and counting", icon: Award },
  { title: "Multi-Market Expertise", desc: "Serving Texas, Louisiana, Mississippi, and Florida", icon: MapPin },
];