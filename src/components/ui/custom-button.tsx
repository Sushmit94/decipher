import React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "gradient" | "glow";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  loading?: boolean;
  loadingText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";
  children: React.ReactNode;
}

const CustomButton = ({
  variant = "primary",
  size = "md",
  loading = false,
  loadingText,
  leftIcon,
  rightIcon,
  fullWidth = false,
  rounded = "lg",
  className,
  children,
  disabled,
  ...props
}: CustomButtonProps) => {
  const baseStyles = `
    relative inline-flex items-center justify-center font-medium transition-all duration-300 
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black
    disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]
    overflow-hidden group
  `;

  const variants = {
    primary: `
      bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400
      text-white border border-teal-500/50 hover:border-teal-400/50
      focus:ring-teal-500/50 shadow-lg shadow-teal-600/25 hover:shadow-teal-500/40
      hover:shadow-xl transform hover:-translate-y-0.5
    `,
    secondary: `
      bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400
      text-white border border-green-500/50 hover:border-green-400/50
      focus:ring-green-500/50 shadow-lg shadow-green-600/25 hover:shadow-green-500/40
      hover:shadow-xl transform hover:-translate-y-0.5
    `,
    outline: `
      bg-transparent hover:bg-white/5 text-white border-2 border-gray-600 
      hover:border-teal-400/70 focus:ring-teal-500/50 hover:text-teal-300
      backdrop-blur-sm hover:backdrop-blur-md
    `,
    ghost: `
      bg-transparent hover:bg-white/10 text-gray-300 hover:text-white
      border border-transparent hover:border-white/20 focus:ring-white/20
      backdrop-blur-sm
    `,
    gradient: `
      bg-gradient-to-r from-teal-500 via-green-500 to-emerald-500 
      hover:from-teal-400 hover:via-green-400 hover:to-emerald-400
      text-white border border-transparent focus:ring-green-500/50
      shadow-lg shadow-green-500/25 hover:shadow-green-400/40
      hover:shadow-xl transform hover:-translate-y-0.5
    `,
    glow: `
      bg-black border-2 border-teal-500/50 text-teal-300 hover:text-white
      hover:border-teal-400 focus:ring-teal-500/50
      shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_30px_rgba(20,184,166,0.5)]
      hover:bg-teal-500/10 backdrop-blur-sm
    `,
  };

  const sizes = {
    xs: "px-3 py-1.5 text-xs min-h-[28px]",
    sm: "px-4 py-2 text-sm min-h-[32px]",
    md: "px-6 py-2.5 text-base min-h-[40px]",
    lg: "px-8 py-3 text-lg min-h-[48px]",
    xl: "px-10 py-4 text-xl min-h-[56px]",
  };

  const roundedStyles = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    full: "rounded-full",
  };

  const iconSizes = {
    xs: "w-3 h-3",
    sm: "w-4 h-4",
    md: "w-4 h-4",
    lg: "w-5 h-5",
    xl: "w-6 h-6",
  };

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        roundedStyles[rounded],
        fullWidth && "w-full",
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {/* Shimmer Effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />

      {/* Content */}
      <div className="relative flex items-center justify-center space-x-2">
        {loading ? (
          <>
            <Loader2 className={cn("animate-spin", iconSizes[size])} />
            {loadingText && <span>{loadingText}</span>}
          </>
        ) : (
          <>
            {leftIcon && (
              <span className={cn("flex-shrink-0", iconSizes[size])}>
                {leftIcon}
              </span>
            )}
            <span className="relative z-10">{children}</span>
            {rightIcon && (
              <span className={cn("flex-shrink-0", iconSizes[size])}>
                {rightIcon}
              </span>
            )}
          </>
        )}
      </div>

      {/* Glow effect for glow variant */}
      {variant === "glow" && (
        <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-green-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
      )}
    </button>
  );
};

export default CustomButton;
