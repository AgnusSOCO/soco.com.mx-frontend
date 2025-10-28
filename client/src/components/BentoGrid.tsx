import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function BentoGrid({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
}

export function BentoCard({
  children,
  className,
  title,
  description,
  icon,
  gradient = "from-primary/10 to-accent/10",
}: {
  children?: ReactNode;
  className?: string;
  title?: string;
  description?: string;
  icon?: ReactNode;
  gradient?: string;
}) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border border-border bg-card p-6 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300",
        className
      )}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
      <div className="relative z-10">
        {icon && (
          <div className="mb-4 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            {icon}
          </div>
        )}
        {title && (
          <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
        )}
        {description && (
          <p className="text-muted-foreground text-sm mb-4">{description}</p>
        )}
        {children}
      </div>
    </div>
  );
}

