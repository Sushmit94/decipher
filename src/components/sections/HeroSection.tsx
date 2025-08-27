"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function HeroSection(): JSX.Element {
  const router = useRouter();

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Navigation Bar */}
      <nav className="absolute top-0 left-0 right-0 z-20 flex justify-between items-center p-6">
        {/* Left side - Home button */}
        <div className="flex items-center">
          <Link href="/">
            <button className="group flex items-center space-x-2 px-4 py-2 bg-black/40 backdrop-blur-sm border border-red-500/30 rounded-lg hover:bg-red-900/30 hover:border-red-400/50 transition-all duration-300">
              <svg 
                className="w-5 h-5 text-red-400 group-hover:text-red-300 transition-colors" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
                />
              </svg>
              <span className="text-red-400 group-hover:text-red-300 font-mono font-semibold transition-colors">
                HOME
              </span>
            </button>
          </Link>
        </div>

        {/* Right side - Register and Login buttons */}
        <div className="flex items-center space-x-4">
          <Link href="/register">
            <button className="group px-6 py-2 bg-gradient-to-r from-red-600/20 to-red-500/20 backdrop-blur-sm border border-red-500/40 rounded-lg hover:from-red-500/30 hover:to-red-400/30 hover:border-red-400/60 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20">
              <span className="text-red-300 group-hover:text-red-200 font-mono font-semibold transition-colors">
                REGISTER TEAM
              </span>
            </button>
          </Link>
          
          <Link href="/login">
            <button className="group px-6 py-2 bg-black/40 backdrop-blur-sm border border-red-500/30 rounded-lg hover:bg-red-900/30 hover:border-red-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20">
              <span className="text-red-300 group-hover:text-red-200 font-mono font-semibold transition-colors">
                LOGIN TEAM
              </span>
            </button>
          </Link>
        </div>
      </nav>

      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/download.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Centered Text */}
      <h1
        className="relative z-10 text-8xl md:text-9xl font-extrabold text-transparent bg-clip-text
                    bg-gradient-to-r from-red-500 via-red-400 to-red-600 tracking-wider drop-shadow-2xl"
        style={{
          fontFamily: "'Pixeboy', monospace",
          textShadow:
            "0 0 20px rgba(239, 68, 68, 0.8), 0 0 40px rgba(220, 38, 38, 0.6)",
          transform: "scaleX(1.1)",
        }}
      >
        DECIPHER
      </h1>
    </section>
  );
}