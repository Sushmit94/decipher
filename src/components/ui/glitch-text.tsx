"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface GlitchTextProps {
  children: React.ReactNode;
  className?: string;
}

const GlitchText = ({ children, className }: GlitchTextProps) => {
  return (
    <div className={cn("relative inline-block", className)}>
      <span className="relative z-10">{children}</span>
      <span className="absolute top-0 left-0 w-full h-full opacity-70 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent animate-glitch-sweep" />
    </div>
  );
};

export default GlitchText;
