"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  MapPin,
  Home,
  Building2,
  BedDouble,
  Calendar,
  Star,
  ChevronRight,
  Play,
  ArrowRight,
  Sparkles,
} from "lucide-react";

// ==================== TYPES ====================
type PropertyCategory = "all" | "rentals" | "hostels" | "short-stay" | "apartments";

// ==================== DATA ====================
const districts = [
  "Kampala",
  "Wakiso",
  "Mukono",
  "Entebbe",
  "Jinja",
  "Mbarara",
  "Gulu",
  "Lira",
];

const propertyImages = [
  {
    url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
    title: "Modern Apartment",
    location: "Kololo, Kampala",
    price: "1.5M",
    rating: 4.9,
  },
  {
    url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    title: "Luxury Villa",
    location: "Muyenga, Kampala",
    price: "3.2M",
    rating: 4.8,
  },
  {
    url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
    title: "Family Home",
    location: "Ntinda, Kampala",
    price: "2.5M",
    rating: 4.7,
  },
];

const stats = [
  { value: "2,500+", label: "Properties", icon: Building2 },
  { value: "10,000+", label: "Happy Tenants", icon: Sparkles },
  { value: "50+", label: "Districts", icon: MapPin },
];

// ==================== ANIMATION VARIANTS ====================
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0 },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0 },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// ==================== FLOATING SHAPES ====================
function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient Orbs */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-emerald-400/30 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 20, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-teal-400/25 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.25, 0.4, 0.25],
          x: [0, -30, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/3 w-64 h-64 bg-cyan-400/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Floating Geometric Shapes */}
      <motion.div
        className="absolute top-32 right-1/4 w-4 h-4 bg-emerald-500 rounded-full"
        animate={{
          y: [0, -20, 0],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-1/3 left-1/4 w-3 h-3 bg-teal-500 rounded-full"
        animate={{
          y: [0, 15, 0],
          x: [0, 10, 0],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-emerald-400 rounded-full"
        animate={{
          y: [0, -10, 0],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%2310b981%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />
    </div>
  );
}

// ==================== PROPERTY CARD CAROUSEL ====================
function PropertyCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % propertyImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      {/* Main Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          exit={{ opacity: 0, scale: 0.9, rotateY: 10 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative z-10"
        >
          <div className="relative bg-white dark:bg-slate-800 rounded-3xl shadow-2xl shadow-slate-200/50 dark:shadow-slate-900/50 overflow-hidden transform hover:scale-[1.02] transition-transform duration-500">
            {/* Image */}
            <div className="relative h-64 overflow-hidden">
              <motion.img
                src={propertyImages[activeIndex].url}
                alt={propertyImages[activeIndex].title}
                className="w-full h-full object-cover"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              
              {/* Badges */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="absolute top-4 left-4 px-3 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-semibold rounded-full shadow-lg"
              >
                Featured
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="absolute top-4 right-4 px-3 py-1.5 bg-white/95 backdrop-blur text-slate-700 text-sm font-medium rounded-full flex items-center gap-1 shadow-lg"
              >
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                {propertyImages[activeIndex].rating}
              </motion.div>
            </div>

            {/* Content */}
            <div className="p-6">
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl font-bold text-slate-900 dark:text-white"
              >
                {propertyImages[activeIndex].title}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-slate-500 dark:text-slate-400 text-sm flex items-center gap-1 mt-1"
              >
                <MapPin className="w-4 h-4" />
                {propertyImages[activeIndex].location}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center justify-between mt-4"
              >
                <div className="text-emerald-600 dark:text-emerald-400 font-bold text-2xl">
                  UGX {propertyImages[activeIndex].price}
                  <span className="text-slate-400 text-sm font-normal">/month</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 font-medium rounded-xl hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors"
                >
                  View Details
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Background Cards */}
      <motion.div
        className="absolute -top-4 -left-4 w-full h-full bg-emerald-100 dark:bg-emerald-900/30 rounded-3xl -z-10"
        animate={{ rotate: [-3, -2, -3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -top-8 -left-8 w-full h-full bg-teal-100 dark:bg-teal-900/20 rounded-3xl -z-20"
        animate={{ rotate: [-6, -5, -6] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />

      {/* Carousel Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {propertyImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === activeIndex
                ? "w-8 bg-emerald-500"
                : "w-2 bg-slate-300 dark:bg-slate-600 hover:bg-emerald-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// ==================== SEARCH BOX ====================
function SearchBox() {
  const [searchCategory, setSearchCategory] = useState<PropertyCategory>("all");
  const [location, setLocation] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const categories = [
    { id: "all", label: "All", icon: Search },
    { id: "rentals", label: "Rentals", icon: Home },
    { id: "hostels", label: "Hostels", icon: BedDouble },
    { id: "short-stay", label: "Short Stay", icon: Calendar },
    { id: "apartments", label: "Apartments", icon: Building2 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      className={`bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-2xl shadow-xl transition-shadow duration-300 ${
        isFocused ? "shadow-2xl shadow-emerald-500/10" : "shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50"
      } border border-slate-100 dark:border-slate-700`}
    >
      {/* Category Tabs */}
      <motion.div
        className="flex flex-wrap gap-2 mb-4"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {categories.map((cat, index) => (
          <motion.button
            key={cat.id}
            variants={fadeInUp}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSearchCategory(cat.id as PropertyCategory)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
              searchCategory === cat.id
                ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/25"
                : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
            }`}
          >
            <cat.icon className="w-4 h-4" />
            {cat.label}
          </motion.button>
        ))}
      </motion.div>

      {/* Search Inputs */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="w-full pl-10 pr-4 py-3.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 appearance-none cursor-pointer transition-all"
          >
            <option value="">Select Location</option>
            {districts.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 rotate-90" />
        </div>
        <motion.button
          whileHover={{ scale: 1.02, boxShadow: "0 20px 40px -15px rgba(16, 185, 129, 0.4)" }}
          whileTap={{ scale: 0.98 }}
          className="px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all"
        >
          <Search className="w-5 h-5" />
          Search
        </motion.button>
      </div>
    </motion.div>
  );
}

// ==================== MAIN HERO SECTION ====================
export default function HeroSectionz() {
  return (
    <section className="relative min-h-[95vh] flex items-center pt-0 overflow-hidden bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
      {/* Floating Background Elements */}
      <FloatingShapes />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            className="space-y-8"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {/* Badge */}
            <motion.div
              variants={fadeInUp}
              className="hidden items-center gap-2 px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full text-sm font-medium"
            >
              
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={fadeInUp}
              className="text-3xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white leading-tight"
            >
              Find Your
              <motion.span
                className="block bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                style={{ backgroundSize: "200% 200%" }}
              >
                Perfect Stay
              </motion.span>
              in Uganda
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={fadeInUp}
              className="text-lg text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed"
            >
              Discover verified hostels, apartments, and rental homes across Uganda.
              From student accommodation to luxury apartments, we&apos;ve got you covered.
            </motion.p>

            {/* Search Box */}
            <SearchBox />

            {/* Stats */}
            <motion.div
              variants={staggerContainer}
              className="flex flex-wrap gap-8 pt-4"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <motion.div
                      className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-slate-500 dark:text-slate-400 text-sm">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap gap-4 pt-2"
            >
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/properties"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold rounded-xl hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors"
                >
                  Explore Properties
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <button className="inline-flex items-center gap-2 px-6 py-3 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-xl hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  <Play className="w-5 h-5" />
                  Watch Video
                </button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Content - Property Carousel */}
          <motion.div
            className="relative hidden lg:block"
            initial="hidden"
            animate="visible"
            variants={fadeInRight}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <PropertyCarousel />

            {/* Floating Elements */}
            <motion.div
              className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg"
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Star className="w-8 h-8 text-white" />
            </motion.div>

            <motion.div
              className="absolute -bottom-5 -left-5 px-4 py-3 bg-white dark:bg-slate-800 rounded-xl shadow-lg flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 border-2 border-white dark:border-slate-800 flex items-center justify-center text-white text-xs font-medium"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-900 dark:text-white">500+ Verified</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Landlords</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-slate-300 dark:border-slate-600 rounded-full flex items-start justify-center p-2">
          <motion.div
            className="w-1.5 h-3 bg-emerald-500 rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}