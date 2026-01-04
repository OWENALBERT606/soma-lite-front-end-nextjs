"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  MapPin,
  Share,
  Heart,
  Calendar,
  Users,
  ArrowLeft,
  Wifi,
  Utensils,
  Dumbbell,
  Waves,
  Car,
  SpadeIcon as Spa,
  BedDouble,
  Coffee,
  Diamond,
  TreePalmIcon as PalmTree,
  MountainSnow,
  Building2,
  TreesIcon as Tree,
  Landmark,
  Gem,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { properties } from "@/data/properties";

// Helper to get property by ID
const getPropertyById = (id: string) => {
  return properties.find(p => p.id === id);
};

// Helper to get images (mocking multiple images for now based on the single one)
const getPropertyImages = (id: string) => {
  const property = properties.find(p => p.id === id);
  if (!property) return [];
  
  return [
    { image: property.image, alt: property.name },
    { image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2080&auto=format&fit=crop", alt: "Interior View" },
    { image: "https://images.unsplash.com/photo-1600596542815-275088db6929?q=80&w=2088&auto=format&fit=crop", alt: "Living Room" },
    { image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop", alt: "Bedroom" },
  ];
};

// Map of amenity names to Lucide icon components
const amenityIconMap: Record<string, React.ReactNode> = {
  wifi: <Wifi className="w-4 h-4" />,
  restaurant: <Utensils className="w-4 h-4" />,
  gym: <Dumbbell className="w-4 h-4" />,
  pool: <Waves className="w-4 h-4" />,
  parking: <Car className="w-4 h-4" />,
  spa: <Spa className="w-4 h-4" />,
  "room service": <Coffee className="w-4 h-4" />,
  fireplace: <Spa className="w-4 h-4" />,
  "ski-in/ski-out": <MountainSnow className="w-4 h-4" />,
  onsen: <Waves className="w-4 h-4" />,
  "traditional dining": <Utensils className="w-4 h-4" />,
  garden: <Tree className="w-4 h-4" />,
  "tea ceremony": <Coffee className="w-4 h-4" />,
  "private pool": <Waves className="w-4 h-4" />,
  terrace: <Tree className="w-4 h-4" />,
  kitchen: <Utensils className="w-4 h-4" />,
  "wine tasting": <Coffee className="w-4 h-4" />,
  sauna: <Spa className="w-4 h-4" />,
  "guided tours": <Landmark className="w-4 h-4" />,
  bar: <Coffee className="w-4 h-4" />,
  "business center": <Building2 className="w-4 h-4" />,
};

// Map of category names to Lucide icon components
const categoryIconMap: Record<string, React.ReactNode> = {
  luxury: <Diamond className="w-4 h-4" />,
  beach: <PalmTree className="w-4 h-4" />,
  mountain: <MountainSnow className="w-4 h-4" />,
  city: <Building2 className="w-4 h-4" />,
  countryside: <Tree className="w-4 h-4" />,
  historic: <Landmark className="w-4 h-4" />,
  boutique: <Gem className="w-4 h-4" />,
};

export default function HotelDetailPage({ hotelId }: { hotelId: string }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const property = getPropertyById(hotelId);
  const propertyImages = getPropertyImages(hotelId);
  const thumbnailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Prevent timer if no images are available
    if (propertyImages.length === 0) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % propertyImages.length);
    }, 5000);

    // Cleanup function
    return () => clearInterval(timer);
  }, [propertyImages.length]);

  if (!property) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Property not found</h2>
        <p className="text-muted-foreground mb-6">
          The property you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild>
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Properties
          </Link>
        </Button>
      </div>
    );
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % propertyImages.length);
    scrollToThumbnail(currentSlide + 1);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + propertyImages.length) % propertyImages.length
    );
    scrollToThumbnail(currentSlide - 1);
  };

  const scrollToThumbnail = (index: number) => {
    if (!thumbnailsRef.current) return;

    const normalizedIndex = (index + propertyImages.length) % propertyImages.length;
    const thumbnails = thumbnailsRef.current.children;
    if (thumbnails[normalizedIndex]) {
      thumbnails[normalizedIndex].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  };

  // Calculate total price for 3 nights
  const nightsStay = 3;
  const subtotal = property.price * nightsStay;
  const taxesAndFees = Math.round(subtotal * 0.15); // 15% for taxes and fees
  const total = subtotal + taxesAndFees;

  return (
    <div className="bg-background">
      {/* Breadcrumb and back button */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center text-sm text-muted-foreground mb-4">
          <Button variant="ghost" size="sm" asChild className="p-0 mr-2 h-auto">
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Properties
            </Link>
          </Button>
          <span className="mx-2">/</span>
          <span>{property.location}</span>
          <span className="mx-2">/</span>
          <span className="font-medium text-foreground">{property.name}</span>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 pb-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left column - Hotel details */}
          <div className="w-full lg:w-2/3">
            <div className="space-y-8">
              {/* Hotel header */}
              <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                <div>
                  <h1 className="text-3xl font-bold">{property.name}</h1>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <div className="flex items-center bg-primary/10 px-2 py-1 rounded-full">
                      <Star className="w-4 h-4 fill-primary text-primary mr-1" />
                      <span className="font-semibold">{property.rating}</span>
                      <span className="text-sm ml-1">
                        ({property.reviews} reviews)
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      <MapPin className="w-4 h-4 mr-1 text-primary" />
                      <span>{property.location}</span>
                    </div>
                  </div>

                  {/* Category tags */}
                  <div className="flex flex-wrap gap-2 mt-3">
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                       <Building2 className="w-4 h-4" />
                        <span className="capitalize">{property.category}</span>
                      </Badge>
                  </div>
                </div>
                <div className="flex gap-2 self-start">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full"
                  >
                    <Share className="h-4 w-4" />
                    <span className="sr-only">Share</span>
                  </Button>
                  <Button
                    variant={isLiked ? "default" : "outline"}
                    size="icon"
                    className="rounded-full"
                    onClick={() => setIsLiked(!isLiked)}
                  >
                    <Heart
                      className={`h-4 w-4 ${
                        isLiked ? "fill-primary-foreground" : ""
                      }`}
                    />
                    <span className="sr-only">Favorite</span>
                  </Button>
                </div>
              </div>

              {/* Main Carousel */}
              <div className="relative rounded-xl overflow-hidden aspect-[16/9] bg-muted">
                {propertyImages.map((item, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      index === currentSlide
                        ? "opacity-100"
                        : "opacity-0 pointer-events-none"
                    }`}
                  >
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.alt}
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />
                  </div>
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-colors"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-colors"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {property.featured && (
                  <div className="absolute top-4 left-4 z-10">
                    <Badge className="bg-primary hover:bg-primary text-white">
                      FEATURED
                    </Badge>
                  </div>
                )}

                <div className="absolute bottom-4 left-4 text-white">
                  <h2 className="text-xl font-bold drop-shadow-md">
                    {property.name}
                  </h2>
                  <p className="text-sm drop-shadow-md">{property.location}</p>
                </div>
              </div>

              {/* Thumbnails */}
              <div
                ref={thumbnailsRef}
                className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide"
              >
                {propertyImages.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`relative flex-shrink-0 w-24 h-16 rounded-md overflow-hidden transition-all ${
                      index === currentSlide
                        ? "ring-2 ring-primary ring-offset-2"
                        : "opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.alt}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Tabs for hotel information */}
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="w-full grid grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="amenities">Amenities</TabsTrigger>
                  <TabsTrigger value="policies">Policies</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="pt-4 space-y-4">
                  <div>
                    <h2 className="text-2xl font-semibold mb-3">
                      About {property.name}
                    </h2>
                    <p className="text-muted-foreground">{property.description}</p>
                    <p className="text-muted-foreground mt-3">
                      Experience comfort and style at our premier destination.
                      Our property offers great views, essential amenities, and 
                      a cozy atmosphere. Perfect for your stay in Uganda.
                    </p>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-3">
                      Popular Amenities
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {property.amenities.slice(0, 6).map((amenity, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary">
                            {amenityIconMap[amenity] || (
                              <Check className="w-4 h-4" />
                            )}
                          </div>
                          <span className="capitalize">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="amenities" className="pt-4">
                  <h2 className="text-2xl font-semibold mb-4">All Amenities</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3">
                        Property Features
                      </h3>
                      <div className="space-y-2">
                        {property.amenities.map((amenity, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2"
                            >
                              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary">
                                {amenityIconMap[amenity] || (
                                  <Check className="w-4 h-4" />
                                )}
                              </div>
                              <span className="capitalize">{amenity}</span>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="policies" className="pt-4">
                  <h2 className="text-2xl font-semibold mb-4">
                    Property Policies
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">
                        Check-in & Check-out
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-secondary p-4 rounded-lg">
                          <p className="text-sm text-muted-foreground">
                            Check-in Time
                          </p>
                          <p className="font-medium">12:00 PM - 6:00 PM</p>
                        </div>
                        <div className="bg-secondary p-4 rounded-lg">
                          <p className="text-sm text-muted-foreground">
                            Check-out Time
                          </p>
                          <p className="font-medium">Until 10:00 AM</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-2">
                        Important Information
                      </h3>
                      <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                        <li>Valid ID required at check-in</li>
                        <li>Security deposit may be required</li>
                        <li>Respect quiet hours</li>
                        <li>No smoking indoors</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-2">
                        Cancellation Policy
                      </h3>
                      <p className="text-muted-foreground">
                        Free cancellation up to 24 hours before check-in.
                        Cancellations made less than 24 hours before check-in
                        are subject to a one-night room charge.
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Right column - Booking card */}
          <div className="w-full lg:w-1/3">
            <div className="sticky top-20">
              <Card className="border shadow-lg">
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between items-baseline">
                        <span className="text-3xl font-bold">
                          UGX {property.price.toLocaleString()}
                        </span>
                        <span className="text-muted-foreground">per night</span>
                      </div>
                       {property.featured && (
                         <Badge
                           variant="outline"
                           className="mt-1 text-primary border-primary"
                         >
                           Featured Property
                         </Badge>
                       )}
                    </div>

                    <Separator />

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-sm font-medium">Check-in</label>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          Select Date
                        </Button>
                      </div>
                      <div className="space-y-1">
                        <label className="text-sm font-medium">Check-out</label>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          Select Date
                        </Button>
                      </div>
                      <div className="col-span-2 space-y-1">
                        <label className="text-sm font-medium">Guests</label>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <Users className="mr-2 h-4 w-4" />1 Guest
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2 bg-secondary/50 p-4 rounded-lg">
                      <div className="flex justify-between">
                        <span>
                          {property.price.toLocaleString()} x {nightsStay} nights
                        </span>
                        <span>{subtotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Service fees</span>
                        <span>{taxesAndFees.toLocaleString()}</span>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex justify-between font-bold">
                        <span>Total (UGX)</span>
                        <span>{total.toLocaleString()}</span>
                      </div>
                    </div>

                    <Button className="w-full" size="lg">
                      Reserve Now
                    </Button>

                    <div className="text-center text-sm text-muted-foreground">
                      You won't be charged yet
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-secondary/30 px-6 py-4">
                  <div className="w-full space-y-2">
                    <h3 className="font-medium">Best Price Guarantee</h3>
                    <p className="text-sm text-muted-foreground">
                      Book with confidence. Verified properties and secure payments.
                    </p>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
