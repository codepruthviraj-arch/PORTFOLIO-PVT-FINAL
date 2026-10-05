import { links } from "@/lib/content";
import { SectionLink } from "@/components/site/SectionLink";

export function Footer() {
  return (
    <footer className="bg-ink px-6 py-16 text-ink-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[2fr_1fr_1fr_1fr]">
        <div>
          <p className="text-2xl font-bold tracking-tight">PRUTHVIRAJ RAJPUT</p>
          <p className="label-mono mt-2 text-ink-muted">
            Content Producer & Social Media Strategist
          </p>
        </div>
        <div className="space-y-2 text-sm">
          <p className="label-mono text-ink-muted">Menu</p>
          {[
            ["Work", "work"],
            ["Services", "services"],
            ["About", "about"],
            ["Process", "how-i-work"],
            ["Contact", "contact"],
          ].map(([label, anchor]) => (
            <SectionLink key={label} to={anchor} className="block hover:underline">
              {label}
            </SectionLink>
          ))}
        </div>
        <div className="space-y-2 text-sm">
          <p className="label-mono text-ink-muted">Twisted Media</p>
          <a
            href={links.twisted}
            target="_blank"
            rel="noreferrer"
            className="block hover:underline"
          >
            @twistedmedia.io
          </a>
        </div>
        <div className="space-y-2 text-sm">
          <p className="label-mono text-ink-muted">Social</p>
          <a href={links.instagram} className="block hover:underline">
            Instagram
          </a>
          <a href={links.linkedin} className="block hover:underline">
            LinkedIn
          </a>
        </div>
      </div>
      <p className="mx-auto mt-14 max-w-6xl border-t border-ink-border pt-6 text-xs text-ink-muted">
        © 2026 Pruthviraj Rajput
      </p>
    </footer>
  );
}
