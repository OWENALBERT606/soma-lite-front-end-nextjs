"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Home,
  Building2,
  BedDouble,
  Calendar,
  ArrowRight,
  MapPin,
  Star,
  Users,
} from "lucide-react";

// ==================== DATA ====================
const categories = [
  {
    id: "rentals",
    title: "Rentals",
    subtitle: "Houses & Rooms",
    description: "Long-term rental homes perfect for families and professionals",
    icon: Home,
    count: "800+",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
    color: "from-blue-600 to-indigo-700",
    shadowColor: "shadow-blue-500/25",
    features: ["Monthly Rent", "Verified Landlords", "All Sizes"],
  },
  {
    id: "hostels",
    title: "Student Hostels",
    subtitle: "Near Universities",
    description: "Affordable accommodation for students near major campuses",
    icon: BedDouble,
    count: "500+",
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80",
    color: "from-emerald-500 to-teal-600",
    shadowColor: "shadow-emerald-500/25",
    features: ["Per Semester", "Near Campus", "Furnished"],
  },
  {
    id: "short-stay",
    title: "Short Stays",
    subtitle: "Daily & Weekly",
    description: "Airbnb-style rentals for travelers and short visits",
    icon: Calendar,
    count: "600+",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
    color: "from-amber-500 to-orange-600",
    shadowColor: "shadow-amber-500/25",
    features: ["Per Night", "Fully Equipped", "Flexible"],
  },
  {
    id: "apartments",
    title: "Apartments",
    subtitle: "Modern Living",
    description: "Contemporary apartments in prime urban locations",
    icon: Building2,
    count: "400+",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
    color: "from-purple-500 to-pink-600",
    shadowColor: "shadow-purple-500/25",
    features: ["Prime Location", "Amenities", "Secure"],
  },
];

// ==================== ANIMATION VARIANTS ====================
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

// ==================== CATEGORY CARD ====================
function CategoryCard({ category, index }: { category: typeof categories[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
    //   variants={cardVariants}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      <Link href={`/properties?category=${category.id}`}>
        <motion.div
          className={`relative h-[400px] sm:h-[450px] rounded-3xl overflow-hidden cursor-pointer ${category.shadowColor}`}
          whileHover={{ 
            scale: 1.02,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {/* Background Image */}
          <motion.div
            className="absolute inset-0"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <img
              src={category.image}
              alt={category.title}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Gradient Overlay */}
          <motion.div
            className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-70`}
            animate={{ opacity: isHovered ? 0.85 : 0.7 }}
            transition={{ duration: 0.3 }}
          />

          {/* Dark Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          {/* Animated Pattern Overlay */}
          <motion.div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
            animate={{ opacity: isHovered ? 0.2 : 0.1 }}
            transition={{ duration: 0.3 }}
          />

          {/* Content */}
          <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between">
            {/* Top Section */}
            <div className="flex items-start justify-between">
              {/* Icon */}
              <motion.div
                className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center"
                animate={{ 
                  rotate: isHovered ? [0, -10, 10, 0] : 0,
                  scale: isHovered ? 1.1 : 1,
                }}
                transition={{ duration: 0.5 }}
              >
                <category.icon className="w-7 h-7 text-white" />
              </motion.div>

              {/* Count Badge */}
              <motion.div
                className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full"
                animate={{ 
                  scale: isHovered ? 1.1 : 1,
                  backgroundColor: isHovered ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.2)",
                }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-white font-bold">{category.count}</span>
                <span className="text-white/80 text-sm ml-1">listings</span>
              </motion.div>
            </div>

            {/* Bottom Section */}
            <div>
              {/* Features - Show on Hover */}
              <motion.div
                className="flex flex-wrap gap-2 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: isHovered ? 1 : 0,
                  y: isHovered ? 0 : 20,
                }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                {category.features.map((feature, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium"
                  >
                    {feature}
                  </span>
                ))}
              </motion.div>

              {/* Title & Subtitle */}
              <motion.div
                animate={{ y: isHovered ? -10 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                  {category.title}
                </h3>
                <p className="text-white/80 text-sm font-medium mb-2">
                  {category.subtitle}
                </p>
              </motion.div>

              {/* Description - Show on Hover */}
              <motion.p
                className="text-white/70 text-sm mb-4 line-clamp-2"
                initial={{ opacity: 0, height: 0 }}
                animate={{ 
                  opacity: isHovered ? 1 : 0,
                  height: isHovered ? "auto" : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                {category.description}
              </motion.p>

              {/* CTA Button */}
              <motion.div
                className="flex items-center gap-2"
                animate={{ x: isHovered ? 5 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-white font-semibold">Explore</span>
                <motion.div
                  animate={{ x: isHovered ? 5 : 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <ArrowRight className="w-5 h-5 text-white" />
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Shine Effect on Hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
            initial={{ x: "-200%" }}
            animate={{ x: isHovered ? "200%" : "-200%" }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          />
        </motion.div>
      </Link>
    </motion.div>
  );
}

// ==================== MAIN CATEGORIES SECTION ====================
export default function CategoriesSectionx() {
  return (
    <section className="py-8 sm:py-12 bg-white dark:bg-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2 },
            },
          }}
        >
          <motion.div
            variants={titleVariants}
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full text-sm font-medium mb-4"
          >
            <MapPin className="w-4 h-4" />
            Find Your Perfect Space
          </motion.div>

          <motion.h2
            variants={titleVariants}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4"
          >
            Browse by{" "}
            <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
              Category
            </span>
          </motion.h2>

          <motion.p
            variants={titleVariants}
            className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg"
          >
            Whatever your housing needs, we have the perfect option for you.
            Explore our diverse range of properties across Uganda.
          </motion.p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {categories.map((category, index) => (
            <CategoryCard key={category.id} category={category} index={index} />
          ))}
        </motion.div>

        {/* Bottom Stats */}
        {/* <motion.div
          className="mt-16 sm:mt-20 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {[
            { icon: Building2, value: "2,300+", label: "Total Properties" },
            { icon: Users, value: "10,000+", label: "Happy Tenants" },
            { icon: MapPin, value: "50+", label: "Districts Covered" },
            { icon: Star, value: "4.8", label: "Average Rating" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(16, 185, 129, 0.1)" }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center mx-auto mb-3"
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
              >
                <stat.icon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </motion.div>
              <div className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-1">
                {stat.value}
              </div>
              <div className="text-slate-500 dark:text-slate-400 text-sm">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div> */}
      </div>
    </section>
  );
}