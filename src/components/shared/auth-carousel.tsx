"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

const slides = [
  {
    id: 1,
    theme: "Customer Satisfaction",
    description: "Highlight the confidence and quality customers receive when shopping with Cruze.",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 2,
    theme: "Order Tracking & Delivery",
    description: "Communicate reliable delivery and transparent order tracking.",
    image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 3,
    theme: "Seamless Shopping Experience",
    description: "Highlight the simplicity, speed, and premium shopping experience offered by Cruze.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop",
  },
];

export function AuthCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Rotate every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-48 md:h-full overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <div className="relative w-full h-full">
            <Image
              src={slide.image}
              alt={slide.theme}
              fill
              className="object-cover"
              priority={index === 0}
            />
            {/* Desktop Overlay Gradient */}
            <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            
            {/* Desktop Text Overlay */}
            <div className="hidden md:flex absolute inset-0 flex-col justify-end p-12 text-white">
              <h2 className="font-commissioner text-3xl font-semibold mb-4">
                {slide.theme}
              </h2>
              <p className="text-base max-w-md text-gray-200">
                {slide.description}
              </p>
            </div>
          </div>
        </div>
      ))}

      {/* Carousel Indicators */}
      <div className="absolute top-6 right-6 z-20 flex space-x-2">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === currentSlide ? "w-6 bg-white" : "w-1.5 bg-white/50"
            }`}
            aria-hidden="true"
          />
        ))}
      </div>
    </div>
  );
}
