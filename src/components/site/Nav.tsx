import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";
import { SectionLink } from "@/components/site/SectionLink";

const items = [
  ["Work", "work"],
  ["Services", "services"],
  ["About", "about"],
  ["Process", "how-i-work"],
  ["Contact", "contact"],
] as const;

export function Badge() {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-card px-3 py-1.5 text-xs font-medium shadow-pill">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-live opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-live" />
      </span>
      Available for Select Projects
    </span>
  );
}

export function Nav() {
  const [open, setOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("theme");
    const dark = savedTheme === "dark";
    document.documentElement.classList.toggle("dark", dark);
    setIsDark(dark);
  }, []);

  const toggleTheme = () => {
    const nextIsDark = !isDark;
    document.documentElement.classList.toggle("dark", nextIsDark);
    window.localStorage.setItem("theme", nextIsDark ? "dark" : "light");
    setIsDark(nextIsDark);
  };

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full border border-border bg-card/80 py-2 pl-2 pr-2 backdrop-blur-md shadow-pill">
        <div className="hidden md:block">
          <Badge />
        </div>
        <Link to="/" className="pl-3 text-sm font-bold tracking-tight md:hidden">
          PRUTHVIRAJ<span className="font-light"> RAJPUT</span>
        </Link>
        <ul className="hidden items-center gap-8 md:flex">
          {items.map(([l, id]) => (
            <li key={id}>
              <SectionLink
                to={id}
                className="label-mono text-muted-foreground transition-colors hover:text-foreground"
              >
                {l}
              </SectionLink>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <SectionLink
            to="contact"
            className="hidden items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold uppercase tracking-wider text-primary-foreground transition-transform hover:-translate-y-0.5 md:inline-flex"
          >
            Let's Work <ArrowUpRight className="h-3.5 w-3.5" />
          </SectionLink>
          <button
            type="button"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:bg-muted"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button
            aria-label="Menu"
            onClick={() => setOpen(!open)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>
      {open && (
        <div className="mx-auto mt-2 max-w-6xl rounded-3xl border border-border bg-card p-6 shadow-card md:hidden">
          <Badge />
          <ul className="mt-5 space-y-1">
            {items.map(([l, id]) => (
              <li key={id}>
                <SectionLink
                  onClick={() => setOpen(false)}
                  to={id}
                  className="block py-2 text-3xl font-semibold uppercase tracking-tight"
                >
                  {l}
                </SectionLink>
              </li>
            ))}
          </ul>
          <SectionLink
            onClick={() => setOpen(false)}
            to="contact"
            className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-3 text-xs font-semibold uppercase tracking-wider text-primary-foreground"
          >
            Let's Work <ArrowUpRight className="h-3.5 w-3.5" />
          </SectionLink>
        </div>
      )}
    </header>
  );
}
