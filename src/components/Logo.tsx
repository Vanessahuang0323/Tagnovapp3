import * as React from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const Logo = ({ className, size = "md" }: LogoProps) => {
  const sizeClasses = {
    sm: "text-2xl",
    md: "text-3xl",
    lg: "text-4xl",
  };

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <span className={cn("font-bold", sizeClasses[size])}>
        <span className="text-black">Tag</span>
        <span className="text-purple-600">nova</span>
      </span>
    </div>
  );
}; 