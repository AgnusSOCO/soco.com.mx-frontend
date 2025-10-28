import { ReactNode } from "react";

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  gradient?: string;
}

export function GradientText({ 
  children, 
  className = "", 
  gradient = "from-primary via-accent to-primary"
}: GradientTextProps) {
  return (
    <span className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent ${className}`}>
      {children}
    </span>
  );
}

