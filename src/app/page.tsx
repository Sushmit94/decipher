"use client"
import React, { useEffect, useRef } from "react";
import Navigation from "@/components/ui/Navigation";
import CustomButton from "@/components/ui/custom-button";
import { MessageCircle, Users, Rocket } from "lucide-react";

// Import all components directly for better performance
import HeroSection from "@/components/sections/HeroSection";
import CTFSection from "@/components/sections/CTFSection";

export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (scrollContainerRef.current) {
        // Multiply by 3 for faster scrolling
        scrollContainerRef.current.scrollLeft += e.deltaY * 1;
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      
      return () => {
        container.removeEventListener('wheel', handleWheel);
      };
    }
  }, []);

  return (
    <main 
      ref={scrollContainerRef}
      className="bg-black text-white overflow-x-auto overflow-y-hidden"
    >
      <div className="flex h-screen" style={{ width: '200vw' }}>
        <div className="w-screen h-full overflow-hidden flex-shrink-0">
          <HeroSection />
        </div>
        
        <div className="w-screen h-full flex-shrink-0">
          <CTFSection />
        </div>
      </div>
    </main>
  );
}