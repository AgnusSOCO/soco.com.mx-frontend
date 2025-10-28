import { useState, useEffect, useRef } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

export default function OptimizedImage({ src, alt, className = '', width, height }: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!imgRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px',
      }
    );

    observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={imgRef}
      className={`relative overflow-hidden bg-muted ${className}`}
      style={{ width, height }}
    >
      {isInView && (
        <>
          {!isLoaded && (
            <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-muted via-muted-foreground/10 to-muted" />
          )}
          <img
            src={src}
            alt={alt}
            className={`w-full h-full object-cover transition-opacity duration-500 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setIsLoaded(true)}
            loading="lazy"
          />
        </>
      )}
    </div>
  );
}

