import React from "react";
import { cn } from "@/lib/utils"; 

interface LoadingProps {
  size?: "small" | "medium" | "large";
  className?: string;
}

const spinnerSizes = {
  small: "h-4 w-4 border-2",
  medium: "h-6 w-6 border-4",
  large: "h-8 w-8 border-4",
};

export const Loading: React.FC<LoadingProps> = ({ size = "medium", className }) => {
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center",
        className
      )}
    >
      <div
        className={cn(
          "animate-spin rounded-full border-t-transparent",
          spinnerSizes[size],
          "border-gray-500"
        )}
        role="status"
        aria-label="Loading"
      />
    </div>
  );
};

export default Loading;
