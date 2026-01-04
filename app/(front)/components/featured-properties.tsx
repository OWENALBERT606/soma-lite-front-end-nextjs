

"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Star,
  MapPin,
  BedDouble,
  Bath,
  Home,
  Building2,
  Calendar,
  Heart,
  Maximize,
} from "lucide-react";

// ==================== TYPES ====================
type PropertyCategory = "rentals" | "hostels" | "short-stay" | "apartments";

interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  priceLabel: string;
  image: string;
  category: PropertyCategory;
  bedrooms: number;
  bathrooms: number;
  size: string;
  rating: number;
  featured?: boolean;
  isNew?: boolean;
}

interface CategorySection {
  id: PropertyCategory;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  properties: Property[];
}

// ==================== MOCK DATA ====================
const allProperties: Property[] = [
  // Rentals
  {
    id: "r1",
    title: "Spacious 3-Bedroom Family Home",
    location: "Ntinda, Kampala",
    price: 2500000,
    priceLabel: "/month",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
    category: "rentals",
    bedrooms: 3,
    bathrooms: 2,
    size: "1,800 sqft",
    rating: 4.8,
    featured: true,
  },
  {
    id: "r2",
    title: "Modern Townhouse with Garden",
    location: "Bukoto, Kampala",
    price: 3200000,
    priceLabel: "/month",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    category: "rentals",
    bedrooms: 4,
    bathrooms: 3,
    size: "2,200 sqft",
    rating: 4.9,
  },
  {
    id: "r3",
    title: "Cozy 2-Bedroom Bungalow",
    location: "Kira, Wakiso",
    price: 1500000,
    priceLabel: "/month",
    image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800&q=80",
    category: "rentals",
    bedrooms: 2,
    bathrooms: 1,
    size: "1,200 sqft",
    rating: 4.6,
    isNew: true,
  },
  {
    id: "r4",
    title: "Executive Villa with Pool",
    location: "Muyenga, Kampala",
    price: 5500000,
    priceLabel: "/month",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
    category: "rentals",
    bedrooms: 5,
    bathrooms: 4,
    size: "3,500 sqft",
    rating: 5.0,
    featured: true,
  },
  {
    id: "r5",
    title: "Charming Colonial Home",
    location: "Kololo, Kampala",
    price: 4200000,
    priceLabel: "/month",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    category: "rentals",
    bedrooms: 4,
    bathrooms: 3,
    size: "2,800 sqft",
    rating: 4.7,
  },
  // Hostels
  {
    id: "h1",
    title: "Makerere Premium Hostel",
    location: "Wandegeya, Kampala",
    price: 800000,
    priceLabel: "/semester",
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80",
    category: "hostels",
    bedrooms: 1,
    bathrooms: 1,
    size: "Single Room",
    rating: 4.5,
    featured: true,
  },
  {
    id: "h2",
    title: "Kyambogo Student Lodge",
    location: "Kyambogo, Kampala",
    price: 650000,
    priceLabel: "/semester",
    image: "https://images.unsplash.com/photo-1626178793926-22b28830aa30?w=800&q=80",
    category: "hostels",
    bedrooms: 1,
    bathrooms: 1,
    size: "Double Room",
    rating: 4.3,
    isNew: true,
  },
  {
    id: "h3",
    title: "UCU Mukono Residences",
    location: "Mukono",
    price: 900000,
    priceLabel: "/semester",
    image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80",
    category: "hostels",
    bedrooms: 1,
    bathrooms: 1,
    size: "En-suite",
    rating: 4.7,
  },
  {
    id: "h4",
    title: "MUBS Executive Hostel",
    location: "Nakawa, Kampala",
    price: 750000,
    priceLabel: "/semester",
    image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&q=80",
    category: "hostels",
    bedrooms: 2,
    bathrooms: 1,
    size: "Shared Room",
    rating: 4.4,
  },
  {
    id: "h5",
    title: "Nkumba Lakeside Hostel",
    location: "Entebbe Road",
    price: 700000,
    priceLabel: "/semester",
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80",
    category: "hostels",
    bedrooms: 1,
    bathrooms: 1,
    size: "Single Room",
    rating: 4.6,
  },
  // Short Stay
  {
    id: "s1",
    title: "Luxury Penthouse Suite",
    location: "Nakasero, Kampala",
    price: 350000,
    priceLabel: "/night",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
    category: "short-stay",
    bedrooms: 2,
    bathrooms: 2,
    size: "1,500 sqft",
    rating: 4.9,
    featured: true,
  },
  {
    id: "s2",
    title: "Cozy Studio Near Airport",
    location: "Entebbe",
    price: 150000,
    priceLabel: "/night",
    image: "https://images.unsplash.com/photo-1630699144867-37acec97df5a?w=800&q=80",
    category: "short-stay",
    bedrooms: 1,
    bathrooms: 1,
    size: "Studio",
    rating: 4.6,
    isNew: true,
  },
  {
    id: "s3",
    title: "Modern Serviced Apartment",
    location: "Kololo, Kampala",
    price: 280000,
    priceLabel: "/night",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    category: "short-stay",
    bedrooms: 1,
    bathrooms: 1,
    size: "800 sqft",
    rating: 4.8,
  },
  {
    id: "s4",
    title: "Lake Victoria View Villa",
    location: "Munyonyo, Kampala",
    price: 500000,
    priceLabel: "/night",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    category: "short-stay",
    bedrooms: 3,
    bathrooms: 2,
    size: "2,000 sqft",
    rating: 5.0,
    featured: true,
  },
  {
    id: "s5",
    title: "Downtown Business Suite",
    location: "Kampala Road",
    price: 200000,
    priceLabel: "/night",
    image: "https://images.unsplash.com/photo-1598928506311-c55ez3eb4bbe?w=800&q=80",
    category: "short-stay",
    bedrooms: 1,
    bathrooms: 1,
    size: "600 sqft",
    rating: 4.5,
  },
  // Apartments
  {
    id: "a1",
    title: "Modern High-Rise Apartment",
    location: "Naguru, Kampala",
    price: 1800000,
    priceLabel: "/month",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
    category: "apartments",
    bedrooms: 2,
    bathrooms: 2,
    size: "1,200 sqft",
    rating: 4.7,
    featured: true,
  },
  {
    id: "a2",
    title: "Luxury Condo with Gym Access",
    location: "Bugolobi, Kampala",
    price: 2200000,
    priceLabel: "/month",
    image: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80",
    category: "apartments",
    bedrooms: 3,
    bathrooms: 2,
    size: "1,600 sqft",
    rating: 4.9,
    isNew: true,
  },
  {
    id: "a3",
    title: "Studio Apartment Central",
    location: "Kamwokya, Kampala",
    price: 900000,
    priceLabel: "/month",
    image: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&q=80",
    category: "apartments",
    bedrooms: 1,
    bathrooms: 1,
    size: "500 sqft",
    rating: 4.4,
  },
  {
    id: "a4",
    title: "Penthouse with City Views",
    location: "Nakasero, Kampala",
    price: 4500000,
    priceLabel: "/month",
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
    category: "apartments",
    bedrooms: 4,
    bathrooms: 3,
    size: "2,500 sqft",
    rating: 5.0,
    featured: true,
  },
  {
    id: "a5",
    title: "Affordable Bachelor Pad",
    location: "Kisaasi, Kampala",
    price: 700000,
    priceLabel: "/month",
    image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=80",
    category: "apartments",
    bedrooms: 1,
    bathrooms: 1,
    size: "450 sqft",
    rating: 4.3,
  },
];

// Category configurations
const categorySections: CategorySection[] = [
  {
    id: "rentals",
    title: "Rental Homes",
    subtitle: "Long-term houses & rooms for families and professionals",
    icon: Home,
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-900/30",
    properties: allProperties.filter((p) => p.category === "rentals"),
  },
  {
    id: "hostels",
    title: "Student Hostels",
    subtitle: "Affordable accommodation near universities",
    icon: BedDouble,
    color: "text-emerald-600 dark:text-emerald-400",
    bgColor: "bg-emerald-100 dark:bg-emerald-900/30",
    properties: allProperties.filter((p) => p.category === "hostels"),
  },
  {
    id: "short-stay",
    title: "Short Stays",
    subtitle: "Daily & weekly rentals for travelers",
    icon: Calendar,
    color: "text-amber-600 dark:text-amber-400",
    bgColor: "bg-amber-100 dark:bg-amber-900/30",
    properties: allProperties.filter((p) => p.category === "short-stay"),
  },
  {
    id: "apartments",
    title: "Apartments",
    subtitle: "Modern apartments in prime locations",
    icon: Building2,
    color: "text-teal-600 dark:text-teal-400",
    bgColor: "bg-teal-100 dark:bg-teal-900/30",
    properties: allProperties.filter((p) => p.category === "apartments"),
  },
];

// ==================== ANIMATION VARIANTS ====================
const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4 },
  },
};

// ==================== PROPERTY CARD ====================
function PropertyCard({ property }: { property: Property }) {
  const [isLiked, setIsLiked] = useState(false);

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `${(price / 1000000).toFixed(1)}M`;
    }
    return `${(price / 1000).toFixed(0)}K`;
  };

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -8 }}
      className="group flex-shrink-0 w-[300px] sm:w-[340px] bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl dark:shadow-slate-900/30 transition-all duration-300"
    >
      <Link href={`/properties/${property.id}`}>
        {/* Image Container */}
        <div className="relative h-48 overflow-hidden">
          <motion.img
            src={property.image}
            alt={property.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6 }}
          />

          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            {property.featured && (
              <span className="px-2.5 py-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-semibold rounded-full shadow-lg">
                Featured
              </span>
            )}
            {property.isNew && (
              <span className="px-2.5 py-1 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs font-semibold rounded-full shadow-lg">
                New
              </span>
            )}
          </div>

          {/* Rating Badge */}
          <div className="absolute top-3 right-3 px-2.5 py-1 bg-white/95 dark:bg-slate-800/95 backdrop-blur text-slate-700 dark:text-slate-200 text-xs font-medium rounded-full flex items-center gap-1 shadow-lg">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            {property.rating}
          </div>

          {/* Like Button */}
          <motion.button
            onClick={(e) => {
              e.preventDefault();
              setIsLiked(!isLiked);
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute bottom-3 right-3 w-9 h-9 bg-white/95 dark:bg-slate-800/95 backdrop-blur rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                isLiked ? "text-red-500 fill-red-500" : "text-slate-600 dark:text-slate-300"
              }`}
            />
          </motion.button>

          {/* Size Badge */}
          <div className="absolute bottom-3 left-3 px-2.5 py-1 bg-slate-900/80 backdrop-blur text-white text-xs font-medium rounded-full flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Maximize className="w-3.5 h-3.5" />
            {property.size}
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1.5 line-clamp-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
            {property.title}
          </h3>

          <p className="text-slate-500 dark:text-slate-400 text-sm flex items-center gap-1.5 mb-4">
            <MapPin className="w-4 h-4 text-emerald-500" />
            {property.location}
          </p>

          {/* Property Details */}
          <div className="flex items-center gap-4 mb-4 pb-4 border-b border-slate-100 dark:border-slate-700">
            <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 text-sm">
              <BedDouble className="w-4 h-4" />
              {property.bedrooms} {property.bedrooms > 1 ? "Beds" : "Bed"}
            </span>
            <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 text-sm">
              <Bath className="w-4 h-4" />
              {property.bathrooms} {property.bathrooms > 1 ? "Baths" : "Bath"}
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold text-xl">
                UGX {formatPrice(property.price)}
              </span>
              <span className="text-slate-400 dark:text-slate-500 text-sm">
                {property.priceLabel}
              </span>
            </div>
            <motion.div
              className="w-10 h-10 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center group-hover:bg-emerald-500 transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              <ArrowRight className="w-5 h-5 text-emerald-600 dark:text-emerald-400 group-hover:text-white transition-colors" />
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ==================== HORIZONTAL SLIDER ====================
function PropertySlider({ properties }: { properties: Property[] }) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      // Scroll by the width of approximately 2 cards
      const scrollAmount = sliderRef.current.clientWidth / 2;
      sliderRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
      setTimeout(checkScroll, 300);
    }
  };

  React.useEffect(() => {
    checkScroll();
    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener("scroll", checkScroll);
      window.addEventListener("resize", checkScroll);
      return () => {
        slider.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
      };
    }
  }, []);

  return (
    <div className="relative group/slider">
      {/* Left Arrow */}
      <motion.button
        onClick={() => scroll("left")}
        initial={{ opacity: 0 }}
        animate={{ opacity: canScrollLeft ? 1 : 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="absolute -left-2 sm:-left-4 lg:-left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 lg:w-12 lg:h-12 bg-white dark:bg-slate-800 rounded-full shadow-lg flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all disabled:opacity-0 disabled:pointer-events-none"
        disabled={!canScrollLeft}
      >
        <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6" />
      </motion.button>

      {/* Slider Container */}
      <div
        ref={sliderRef}
        onScroll={checkScroll}
        className="flex gap-4 lg:gap-6 overflow-x-auto scrollbar-hide pb-4 scroll-smooth px-1"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {properties.map((property, index) => (
          <motion.div
            key={property.id}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="flex-shrink-0 w-[calc(50%-8px)] md:w-[calc(33.333%-12px)] xl:w-[calc(20%-14px)]"
          >
            <PropertyCardGrid property={property} />
          </motion.div>
        ))}
      </div>

      {/* Right Arrow */}
      <motion.button
        onClick={() => scroll("right")}
        initial={{ opacity: 0 }}
        animate={{ opacity: canScrollRight ? 1 : 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="absolute -right-2 sm:-right-4 lg:-right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 lg:w-12 lg:h-12 bg-white dark:bg-slate-800 rounded-full shadow-lg flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all disabled:opacity-0 disabled:pointer-events-none"
        disabled={!canScrollRight}
      >
        <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6" />
      </motion.button>

      {/* Blur Gradient - Left */}
      <div 
        className={`absolute left-0 top-0 bottom-4 w-12 sm:w-16 lg:w-24 bg-gradient-to-r from-slate-50 dark:from-slate-900 via-slate-50/80 dark:via-slate-900/80 to-transparent pointer-events-none z-10 transition-opacity duration-300 ${
          canScrollLeft ? "opacity-100" : "opacity-0"
        }`} 
      />
      
      {/* Blur Gradient - Right */}
      <div 
        className={`absolute right-0 top-0 bottom-4 w-12 sm:w-16 lg:w-24 bg-gradient-to-l from-slate-50 dark:from-slate-900 via-slate-50/80 dark:via-slate-900/80 to-transparent pointer-events-none z-10 transition-opacity duration-300 ${
          canScrollRight ? "opacity-100" : "opacity-0"
        }`} 
      />
    </div>
  );
}

// ==================== GRID PROPERTY CARD (Responsive) ====================
function PropertyCardGrid({ property }: { property: Property }) {
  const [isLiked, setIsLiked] = useState(false);

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `${(price / 1000000).toFixed(1)}M`;
    }
    return `${(price / 1000).toFixed(0)}K`;
  };

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -8 }}
      className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl dark:shadow-slate-900/30 transition-all duration-300 h-full flex flex-col"
    >
      <Link href={`/properties/${property.id}`} className="flex flex-col h-full">
        {/* Image Container */}
        <div className="relative h-36 sm:h-40 lg:h-44 overflow-hidden">
          <motion.img
            src={property.image}
            alt={property.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6 }}
          />

          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Badges */}
          <div className="absolute top-2 left-2 flex gap-1.5">
            {property.featured && (
              <span className="px-2 py-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-[10px] sm:text-xs font-semibold rounded-full shadow-lg">
                Featured
              </span>
            )}
            {property.isNew && (
              <span className="px-2 py-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-[10px] sm:text-xs font-semibold rounded-full shadow-lg">
                New
              </span>
            )}
          </div>

          {/* Rating Badge */}
          <div className="absolute top-2 right-2 px-1.5 sm:px-2 py-0.5 sm:py-1 bg-white/95 dark:bg-slate-800/95 backdrop-blur text-slate-700 dark:text-slate-200 text-[10px] sm:text-xs font-medium rounded-full flex items-center gap-0.5 shadow-lg">
            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
            {property.rating}
          </div>

          {/* Like Button */}
          <motion.button
            onClick={(e) => {
              e.preventDefault();
              setIsLiked(!isLiked);
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute bottom-2 right-2 w-7 h-7 sm:w-8 sm:h-8 bg-white/95 dark:bg-slate-800/95 backdrop-blur rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <Heart
              className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors ${
                isLiked ? "text-red-500 fill-red-500" : "text-slate-600 dark:text-slate-300"
              }`}
            />
          </motion.button>
        </div>

        {/* Content */}
        <div className="p-3 sm:p-4 flex flex-col flex-grow">
          <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mb-1 line-clamp-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
            {property.title}
          </h3>

          <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm flex items-center gap-1 mb-2 sm:mb-3">
            <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-500 flex-shrink-0" />
            <span className="truncate">{property.location}</span>
          </p>

          {/* Property Details */}
          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 pb-2 sm:pb-3 border-b border-slate-100 dark:border-slate-700">
            <span className="flex items-center gap-1 text-slate-600 dark:text-slate-400 text-xs">
              <BedDouble className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              {property.bedrooms}
            </span>
            <span className="flex items-center gap-1 text-slate-600 dark:text-slate-400 text-xs">
              <Bath className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              {property.bathrooms}
            </span>
            <span className="items-center gap-1 text-slate-600 dark:text-slate-400 text-xs hidden sm:flex">
              <Maximize className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span className="truncate">{property.size}</span>
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between mt-auto">
            <div>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold text-sm sm:text-lg">
                UGX {formatPrice(property.price)}
              </span>
              <span className="text-slate-400 dark:text-slate-500 text-[10px] sm:text-xs">
                {property.priceLabel}
              </span>
            </div>
            <motion.div
              className="w-7 h-7 sm:w-8 sm:h-8 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center group-hover:bg-emerald-500 transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 dark:text-emerald-400 group-hover:text-white transition-colors" />
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ==================== CATEGORY SECTION ====================
function CategorySubSection({ section }: { section: CategorySection }) {
  return (
    <motion.div
    //   variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="mb-16 last:mb-0"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <motion.div
            className={`w-14 h-14 ${section.bgColor} rounded-2xl flex items-center justify-center shrink-0`}
            whileHover={{ rotate: [0, -10, 10, 0], scale: 1.05 }}
            transition={{ duration: 0.5 }}
          >
            <section.icon className={`w-7 h-7 ${section.color}`} />
          </motion.div>

          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-1">
              {section.title}
            </h3>
            <p className="text-slate-500 dark:text-slate-400">
              {section.subtitle}
            </p>
          </div>
        </div>

        {/* View All Button */}
        <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
          <Link
            href={`/properties?category=${section.id}`}
            className={`inline-flex items-center gap-2 px-5 py-2.5 ${section.bgColor} ${section.color} font-semibold rounded-xl hover:shadow-lg transition-all`}
          >
            View All {section.title}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>

      {/* Properties Slider */}
      <PropertySlider properties={section.properties} />
    </motion.div>
  );
}

// ==================== MAIN FEATURED PROPERTIES SECTION ====================
export default function FeaturedPropertiesSectionx() {
  return (
    <section className="py-16 sm:py-24 bg-slate-50 dark:bg-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full text-sm font-medium mb-4"
          >
            <Star className="w-4 h-4 fill-emerald-500 text-emerald-500" />
            Handpicked for You
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Featured{" "}
            <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
              Properties
            </span>
          </h2>

          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
            Discover our curated selection of the best properties across Uganda.
            From cozy hostels to luxury apartments, find your perfect match.
          </p>
        </motion.div>

        {/* Category Subsections */}
        <div className="space-y-16">
          {categorySections.map((section) => (
            <CategorySubSection key={section.id} section={section} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="inline-flex flex-col sm:flex-row gap-4 items-center justify-center p-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl">
            <div className="text-center sm:text-left">
              <h3 className="text-2xl font-bold text-white mb-1">
                Can&apos;t find what you&apos;re looking for?
              </h3>
              <p className="text-emerald-100">
                Browse all {allProperties.length}+ properties in our catalog
              </p>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/properties"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-emerald-600 font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all"
              >
                Browse All Properties
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}