"use client";

import type React from "react";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Home,
  Diamond,
  TreePalmIcon as PalmTree,
  MountainSnow,
  Building2,
  TreesIcon as Tree,
  Landmark,
  Gem,
  Wifi,
  Utensils,
  Dumbbell,
  Waves,
  Car,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { properties, Property } from "@/data/properties";

const categories = [
  { id: "all", name: "All Stays", icon: "home" },
  { id: "apartments", name: "Apartments", icon: "building-2" },
  { id: "rentals", name: "Rentals", icon: "home" },
  { id: "hostels", name: "Hostels", icon: "building-2" },
  { id: "short-stay", name: "Short Stay", icon: "gem" },
];

// Map of icon names to Lucide icon components
const iconMap: Record<string, React.ReactNode> = {
  home: <Home className="w-4 h-4" />,
  diamond: <Diamond className="w-4 h-4" />,
  "palm-tree": <PalmTree className="w-4 h-4" />,
  "mountain-snow": <MountainSnow className="w-4 h-4" />,
  "building-2": <Building2 className="w-4 h-4" />,
  tree: <Tree className="w-4 h-4" />,
  landmark: <Landmark className="w-4 h-4" />,
  gem: <Gem className="w-4 h-4" />,
};

// Map of amenity names to Lucide icon components
const amenityIconMap: Record<string, React.ReactNode> = {
  wifi: <Wifi className="w-3 h-3" />,
  restaurant: <Utensils className="w-3 h-3" />,
  gym: <Dumbbell className="w-3 h-3" />,
  pool: <Waves className="w-3 h-3" />,
  parking: <Car className="w-3 h-3" />,
};

export default function HotelList() {
  const [activeCategory, setActiveCategory] = useState("all");
  const categoryRef = useRef<HTMLDivElement>(null);

  const filteredProperties = activeCategory === "all" 
    ? properties 
    : properties.filter(p => p.category === activeCategory);

  const scroll = (direction: "left" | "right") => {
    if (categoryRef.current) {
      const { current } = categoryRef;
      const scrollAmount = 200;
      if (direction === "left") {
        current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Discover Your Perfect Stay</h1>
          <p className="text-muted-foreground mt-2">
            Explore our curated collection of exceptional properties
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            View All
          </Button>
          <Button size="sm">Book Now</Button>
        </div>
      </div>

      {/* Category Bar */}
      <div className="relative mb-8">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full bg-background shadow-md"
            onClick={() => scroll("left")}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>

        <div
          ref={categoryRef}
          className="flex overflow-x-auto scrollbar-hide gap-2 py-2 px-8"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              className="rounded-full whitespace-nowrap"
              size="sm"
              onClick={() => setActiveCategory(category.id)}
            >
              {iconMap[category.icon]}
              <span className="ml-2">{category.name}</span>
            </Button>
          ))}
        </div>

        <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full bg-background shadow-md"
            onClick={() => scroll("right")}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Hotel Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProperties.map((property) => (
          <Link
            href={`/hotel/${property.id}`}
            key={property.id}
            className="block group"
          >
            <Card className="overflow-hidden h-full border-none shadow-sm hover:shadow-md transition-all duration-300">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={property.image || "/placeholder.svg"}
                  alt={property.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {property.featured && (
                  <div className="absolute top-3 left-3 z-10">
                    <Badge className="bg-primary hover:bg-primary text-white">
                      FEATURED
                    </Badge>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                    <span className="text-sm font-medium truncate">
                      {property.location}
                    </span>
                  </div>
                </div>
              </div>

              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="font-bold text-lg line-clamp-1 group-hover:text-primary transition-colors">
                    {property.name}
                  </h2>
                  <div className="flex items-center bg-primary/10 px-2 py-1 rounded-full">
                    <Star className="w-3 h-3 fill-primary text-primary mr-1" />
                    <span className="text-xs font-semibold">
                      {property.rating}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2 mb-3 h-10">
                  {property.description}
                </p>

                <div className="flex flex-wrap gap-1 mb-3">
                  {property.amenities.slice(0, 4).map((amenity, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-full"
                    >
                      {amenityIconMap[amenity] || null}
                      <span className="ml-1 capitalize">{amenity}</span>
                    </div>
                  ))}
                  {property.amenities.length > 4 && (
                    <div className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-full">
                      +{property.amenities.length - 4} more
                    </div>
                  )}
                </div>
              </CardContent>

              <CardFooter className="p-4 pt-0 flex justify-between items-center border-t">
                <div>
                  <div className="font-bold text-lg">UGX {property.price.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">{property.priceLabel}</div>
                </div>
                <Button size="sm" className="rounded-full">
                  View Details
                </Button>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>

      {filteredProperties.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium">
            No properties found in this category
          </h3>
          <p className="text-muted-foreground mt-2">
            Try selecting a different category
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => setActiveCategory("all")}
          >
            View All Properties
          </Button>
        </div>
      )}
    </div>
  );
}
