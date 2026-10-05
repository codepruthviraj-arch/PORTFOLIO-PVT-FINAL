import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/content";
import { SaturatingProjectImage } from "./SaturatingProjectImage";
import { Placeholder } from "./Reveal";

export function ProjectCard({ p }: { p: Project }) {
  return (
    <Link to="/work/$slug" params={{ slug: p.slug }} className="group block rounded-2xl bg-card p-3 shadow-card transition-transform duration-500 hover:-translate-y-1.5">
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
        {p.image ? (
          <SaturatingProjectImage src={p.image} alt={p.name} className="h-full w-full" />
        ) : (
          <Placeholder label="[Add project image]" className="h-full w-full" />
        )}
        <span className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 scale-75 items-center justify-center rounded-full bg-card opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100">
          <ArrowUpRight className="h-5 w-5" />
        </span>
      </div>
      <div className="px-2 pb-3 pt-5">
        <h3 className="text-xl font-semibold uppercase tracking-tight">{p.name}</h3>
        <div className="mt-4 flex flex-wrap gap-2">
          {p.tags.map((t) => (
            <span key={t} className="label-mono rounded-full border border-border px-3 py-1.5 text-muted-foreground">{t}</span>
          ))}
        </div>
        <span className="mt-5 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider">View Project <ArrowUpRight className="h-3.5 w-3.5" /></span>
      </div>
    </Link>
  );
}
