"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Emma Thompson",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Business Traveler",
    content:
      "Luxe Stays has completely transformed my business travel experience. The curated selection of hotels always exceeds my expectations, and the customer service is unparalleled.",
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Honeymoon Planner",
    content:
      "We booked our honeymoon through Luxe Stays and it was absolutely perfect. The special touches and attention to detail made our stay truly memorable.",
  },
  {
    id: 3,
    name: "Sophia Rodriguez",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Family Vacationer",
    content:
      "Finding luxury accommodations that cater to families can be challenging, but Luxe Stays made it effortless. The properties they recommended had amazing amenities for both adults and children.",
  },
  {
    id: 4,
    name: "James Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Adventure Traveler",
    content:
      "What sets Luxe Stays apart is their ability to find unique properties in extraordinary locations. I've discovered hidden gems I would never have found on my own.",
  },
  {
    id: 5,
    name: "Olivia Parker",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Solo Traveler",
    content:
      "As a solo traveler, safety and comfort are my priorities. Every hotel recommended by Luxe Stays has exceeded my expectations and made me feel at home away from home.",
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleTestimonials, setVisibleTestimonials] = useState<
    typeof testimonials
  >([]);

  useEffect(() => {
    // Determine how many testimonials to show based on screen size
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setVisibleTestimonials([testimonials[activeIndex]]);
      } else if (width < 1024) {
        setVisibleTestimonials(
          testimonials.slice(activeIndex, activeIndex + 2)
        );
      } else {
        setVisibleTestimonials(
          testimonials.slice(activeIndex, activeIndex + 3)
        );
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeIndex]);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1 >= testimonials.length ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setActiveIndex((prev) =>
      prev - 1 < 0 ? testimonials.length - 1 : prev - 1
    );
  };

  return (
    <div className="relative">
      <div className="flex overflow-hidden">
        <div className="flex gap-6 transition-transform duration-500 w-full">
          {visibleTestimonials.map((testimonial) => (
            <Card key={testimonial.id} className="flex-1 min-w-0">
              <CardContent className="p-6">
                <Quote className="h-8 w-8 text-primary/20 mb-4" />
                <p className="text-muted-foreground mb-6">
                  {testimonial.content}
                </p>
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-4">
                    <AvatarImage
                      src={testimonial.avatar}
                      alt={testimonial.name}
                    />
                    <AvatarFallback>
                      {testimonial.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-8 gap-2">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous</span>
        </Button>
        {testimonials.map((_, index) => (
          <Button
            key={index}
            variant="ghost"
            size="icon"
            className={`w-2 h-2 rounded-full p-0 ${
              index >= activeIndex &&
              index < activeIndex + visibleTestimonials.length
                ? "bg-primary"
                : "bg-muted"
            }`}
            onClick={() => setActiveIndex(index)}
          >
            <span className="sr-only">Go to slide {index + 1}</span>
          </Button>
        ))}
        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
          onClick={nextSlide}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next</span>
        </Button>
      </div>
    </div>
  );
};

export default Testimonials;
