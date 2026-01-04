
export type PropertyCategory = "all" | "rentals" | "hostels" | "short-stay" | "apartments";

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
