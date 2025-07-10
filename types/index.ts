export interface Port {
  id: string;
  name: string;
  portType: "marina" | "private_port";
  location: {
    lat: number;
    lng: number;
    city: string;
    country: string;
    address: string;
  };
  description: string;
  images: string[];
  amenities: string[];
  capacity: number;
  availableSpaces: number;
  pricePerNight: number;
  rating: number;
  reviews: Review[];
  contact: {
    phone: string;
    email: string;
    website?: string;
  };
  specifications: {
    maxBoatLength: number;
    depth: number;
    electricity: boolean;
    water: boolean;
    wifi: boolean;
    fuel: boolean;
    security: boolean;
  };
  // Additional fields for private ports
  owner?: {
    name: string;
    email: string;
    phone: string;
  };
  isInstantBook?: boolean;
}

export interface DockingSpace {
  id: string;
  portId: string;
  spaceNumber: string;
  maxLength: number;
  width: number;
  depth: number;
  pricePerNight: number;
  isAvailable: boolean;
  amenities: string[];
}

export interface Reservation {
  id: string;
  userId: string;
  portId: string;
  spaceId: string;
  checkIn: string;
  checkOut: string;
  totalPrice: number;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  guestCount: number;
  boatDetails: {
    name: string;
    length: number;
    width: number;
    type: string;
  };
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  phone?: string;
  preferences: {
    language: "en" | "fr" | "es";
    currency: string;
  };
  boats: Boat[];
  reservations: Reservation[];
}

export interface Boat {
  id: string;
  name: string;
  type: string;
  length: number;
  width: number;
  draft: number;
  registrationNumber: string;
  insurance: {
    provider: string;
    policyNumber: string;
    expiryDate: string;
  };
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  portId: string;
  rating: number;
  comment: string;
  createdAt: string;
  helpful: number;
}

export interface SearchFilters {
  location?: string;
  checkIn?: string;
  checkOut?: string;
  boatLength?: number;
  minPrice?: number;
  maxPrice?: number;
  amenities?: string[];
  rating?: number;
  portType?: "all" | "marina" | "private_port";
}

export interface MapBounds {
  north: number;
  south: number;
  east: number;
  west: number;
}

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: string;
  clientSecret: string;
}
