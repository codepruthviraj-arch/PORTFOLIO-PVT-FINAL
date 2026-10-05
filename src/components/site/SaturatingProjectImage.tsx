import { useRef, useState, type MouseEvent } from "react";

type SaturatingProjectImageProps = {
  src: string;
  alt: string;
  className?: string;
};

export function SaturatingProjectImage({ src, alt, className = "" }: SaturatingProjectImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ x: string; y: string } | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const updatePosition = (event: MouseEvent<HTMLDivElement>) => {
    const element = ref.current;
    if (!element) return;

    const bounds = element.getBoundingClientRect();
    setPosition({
      x: `${((event.clientX - bounds.left) / bounds.width) * 100}%`,
      y: `${((event.clientY - bounds.top) / bounds.height) * 100}%`,
    });
    setIsHovered(true);
  };

  const mask = position
    ? `radial-gradient(circle 170px at ${position.x} ${position.y}, black 35%, transparent 100%)`
    : "none";

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={updatePosition}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover grayscale"
      />
      <img
        src={src}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        style={{
          WebkitMaskImage: mask,
          maskImage: mask,
          opacity: isHovered ? 1 : 0,
          transition: "opacity 300ms ease",
        }}
      />
    </div>
  );
}
