import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  size?: number;
  className?: string;
}

export const LoadingSpinner = ({ size = 24, className = "" }: LoadingSpinnerProps) => {
  return (
    <div className="flex items-center justify-center">
      <Loader2 
        className={`animate-spin text-primary ${className}`} 
        size={size} 
      />
    </div>
  );
}; 