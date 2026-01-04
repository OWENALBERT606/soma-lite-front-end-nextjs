"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import Logo from "../global/logo";

const images = [
  {
    src: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop",
    title: "Manage Properties Efficiently",
    description: "Easily track rent payments, maintenance requests, and tenant communications in one place. Say goodbye to the hassle of manual management.",
    rating: 4.9,
  },
  {
    src: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070&auto=format&fit=crop",
    title: "Modern Living Spaces",
    description: "Find high-quality apartments in Kampala's most sought-after neighborhoods. Experience comfort and style like never before.",
    rating: 4.8,
  },
  {
    src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
    title: "Premium Student Hostels",
    description: "Secure, affordable, and well-equipped hostels near top universities. Focus on your studies while we take care of your stay.",
    rating: 4.7,
  },
  {
    src: "https://images.unsplash.com/photo-1590490360182-137d62341e1d?q=80&w=2072&auto=format&fit=crop",
    title: "Short-Stay Solutions",
    description: "Ideal for business or leisure. Discover fully furnished homes for daily or weekly rentals across various locations.",
    rating: 4.9,
  },
];

export default function CustomCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="relative w-full h-full min-h-[600px] overflow-hidden rounded-[32px] group"
      style={{
        clipPath: "inset(0 0 0 0 round 40px 140px 40px 40px)"
      }}
    >
      {/* Background Images */}
      {images.map((image, index) => (
        <div
          key={image.src}
          className={cn(
            "absolute inset-0 transition-all duration-1000 ease-in-out transform",
            index === currentIndex ? "opacity-100 scale-100" : "opacity-0 scale-105"
          )}
        >
          <Image
            src={image.src}
            alt={image.title}
            fill
            className="object-cover"
            priority={index === 0}
          />
          {/* Enhanced Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10 transition-opacity duration-1000" />
        </div>
      ))}

      {/* Glassmorphism Logo Badge */}
      <div className="absolute top-8 left-8 z-30">
        <div className="glass px-4 py-2 rounded-2xl flex items-center shadow-xl border-white/30">
          <Logo size="sm" className="!gap-1.5" />
        </div>
      </div>

      {/* Property Text Overlay (Bottom) */}
      <div className="absolute bottom-12 left-12 right-12 z-30 space-y-4">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex bg-emerald-500/20 backdrop-blur-md px-2 py-1 rounded-lg border border-emerald-500/30 items-center gap-1">
              <Star className="w-3 h-3 text-emerald-400 fill-emerald-400" />
              <span className="text-xs font-bold text-emerald-400">{images[currentIndex].rating}</span>
            </div>
            <span className="text-xs font-medium text-white/60 tracking-wider uppercase bg-white/5 backdrop-blur-sm px-2 py-1 rounded-lg border border-white/10">
              Premium Listing
            </span>
          </div>
          <h2 className="text-3xl font-bold text-white leading-tight mb-2 tracking-tight">
            {images[currentIndex].title}
          </h2>
          <p className="text-white/70 text-sm max-w-md leading-relaxed line-clamp-3">
            {images[currentIndex].description}
          </p>
        </div>
      </div>

      {/* Minimalist Pill Indicators (Bottom-Right) */}
      <div className="absolute bottom-12 right-12 flex space-x-2 z-30">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-500",
              index === currentIndex
                ? "bg-white w-8"
                : "bg-white/30 w-3 hover:bg-white/50"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
