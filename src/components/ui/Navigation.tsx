"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import CustomButton from "@/components/ui/custom-button";

interface NavigationProps {
  className?: string;
}

const Navigation = ({ className = "" }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      if (position > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Update active section based on scroll position
      const sections = ["about", "ctf", "schedule", "sponsors", "venue", "faq"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setIsOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navItems = [
    { id: "about", label: "About" },
    { id: "ctf", label: "CTF" },
    { id: "schedule", label: "Schedule" },
    { id: "sponsors", label: "Sponsors" },
    { id: "venue", label: "Venue" },
    { id: "faq", label: "FAQ" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "py-4 bg-black/90 backdrop-blur-md border-b border-gray-800/50"
          : "py-6 bg-transparent",
        className
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <div
          className="text-xl font-black text-white cursor-pointer"
          onClick={() => scrollToSection("about")}
        >
          LNMHACKS 8.0
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8 bg-black/20 backdrop-blur-sm border border-gray-700/50 rounded-full px-6 py-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={cn(
                "text-sm font-medium transition-all duration-200 px-4 py-2 rounded-full relative",
                activeSection === item.id
                  ? "text-white bg-gray-800/80"
                  : "text-gray-400 hover:text-white hover:bg-gray-800/40"
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden md:block">
          <CustomButton variant="primary" size="sm" rounded="full">
            Sign Up
          </CustomButton>
        </div>

        {/* Mobile Navigation Toggle */}
        <button
          className="md:hidden text-white bg-black/20 backdrop-blur-sm border border-gray-700 rounded-full p-3"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-md border-b border-gray-700 py-4">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  "text-left py-3 px-4 text-sm font-medium transition-colors hover:text-white rounded-lg",
                  activeSection === item.id
                    ? "text-white bg-gray-800"
                    : "text-gray-400"
                )}
              >
                {item.label}
              </button>
            ))}
            <div className="mx-4 mt-4">
              <CustomButton variant="primary" size="sm" fullWidth={true}>
                Sign Up
              </CustomButton>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
