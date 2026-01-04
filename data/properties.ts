
import { PropertyCategory } from "@/types/property";

export interface Property {
  id: string;
  name: string;
  location: string;
  description: string;
  price: number;
  priceLabel: string;
  category: PropertyCategory;
  image: string;
  rating: number;
  reviews: number;
  amenities: string[];
  featured?: boolean;
}

export const properties: Property[] = [
  {
    id: "p1",
    name: "Kololo Heights Apartment",
    location: "Kololo, Kampala",
    description: "Luxurious 3-bedroom apartment with a city view. Features modern finishing and 24/7 security.",
    price: 3500000,
    priceLabel: "per month",
    category: "apartments",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
    rating: 4.9,
    reviews: 124,
    amenities: ["wifi", "parking", "pool", "gym"],
    featured: true,
  },
  {
    id: "p2",
    name: "Makerere University Hostel",
    location: "Kikoni, Kampala",
    description: "Safe and affordable student accommodation walking distance to the main gate.",
    price: 1200000,
    priceLabel: "per semester",
    category: "hostels",
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80",
    rating: 4.5,
    reviews: 89,
    amenities: ["wifi", "security", "laundry"],
  },
  {
    id: "p3",
    name: "Bugolobi Executive Studio",
    location: "Bugolobi, Kampala",
    description: "Perfect for short stays. Fully furnished with high-speed internet and kitchen utilities.",
    price: 180000,
    priceLabel: "per night",
    category: "short-stay",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
    rating: 4.8,
    reviews: 56,
    amenities: ["wifi", "netflix", "parking"],
    featured: true,
  },
  {
    id: "p4",
    name: "Entebbe Lake View Rental",
    location: "Entebbe",
    description: "Quiet 2-bedroom house near the airport with a stunning view of Lake Victoria.",
    price: 2000000,
    priceLabel: "per month",
    category: "rentals",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
    rating: 4.7,
    reviews: 42,
    amenities: ["garden", "parking", "wifi"],
  },
  {
    id: "p5",
    name: "Nakasero Serviced Apartment",
    location: "Nakasero, Kampala",
    description: "High-end serviced apartment for diplomats and business travelers.",
    price: 5000000,
    priceLabel: "per month",
    category: "apartments",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    rating: 5.0,
    reviews: 28,
    amenities: ["wifi", "pool", "gym", "concierge"],
  }
];
