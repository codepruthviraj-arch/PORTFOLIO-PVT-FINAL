import { useEffect, useRef, type ReactNode, type ElementType } from "react";

export function Reveal({ children, as: Tag = "div", className = "", delay = 0 }: { children: ReactNode; as?: ElementType; className?: string; delay?: number }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e?.isIntersecting) { el.classList.add("in"); io.disconnect(); }
    }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <Tag ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</Tag>;
}

export function SectionTitle({ children, ghost, dark }: { children: ReactNode; ghost?: string; dark?: boolean }) {
  return (
    <div className="relative">
      {ghost && (
        <span aria-hidden className={`pointer-events-none absolute -top-8 left-0 select-none text-6xl font-extrabold uppercase tracking-tight opacity-[0.06] sm:text-8xl md:-top-12 md:text-[9rem] ${dark ? "text-ink-foreground" : "text-foreground"}`}>
          {ghost}
        </span>
      )}
      <h2 className="relative text-4xl font-semibold uppercase tracking-tight sm:text-5xl md:text-6xl">
        <span className="font-light">/</span>{children}
      </h2>
    </div>
  );
}

export function Placeholder({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div className={`placeholder-stripes flex items-center justify-center ${className}`}>
      <span className="label-mono rounded-full border border-border bg-card/80 px-3 py-1.5 text-muted-foreground">{label}</span>
    </div>
  );
}
