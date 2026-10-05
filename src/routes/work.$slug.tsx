import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { SectionLink } from "@/components/site/SectionLink";
import { Footer } from "@/components/site/Footer";
import { Reveal, Placeholder } from "@/components/site/Reveal";
import { SaturatingProjectImage } from "@/components/site/SaturatingProjectImage";
import { projects } from "@/lib/content";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const project = projects.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    const t = `${loaderData?.project.name ?? "Project"} — Pruthviraj Rajput`;
    const d = loaderData?.project.description ?? "Case study by Pruthviraj Rajput.";
    return {
      meta: [
        { title: t },
        { name: "description", content: d },
        { property: "og:title", content: t },
        { property: "og:description", content: d },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: CaseStudy,
});

const flow = ["Strategy", "Concept", "Script", "Production", "Edit", "Distribution"];
const jewelleryVideos = [
  "bbg-P-SaYbs",
  "A2GE1nMTFIU",
  "HhFvPamvAfM",
  "MgnzMbNar14",
  "x-ZIBqFJlrU",
  "wkEn-7RWcBg",
];
const eventCampaignVideos = [
  "x-2LphCY0ig",
  "_g-O2RbZn_I",
  "-LV6x17IGGI",
  "naXvoqbFCXA",
  "r2nHJ3tME1k",
  "mpu2IDZjlTM",
];
const instituteVideos = [
  "Joa6z_HwJx8",
  "HIA2JaJwofc",
  "r97u0ZF6JjM",
  "SWhPoclbH6M",
  "WSNe2ByRGEk",
  "K5ZxFlEHBv4",
];

function buildYouTubeEmbedUrl(videoId: string) {
  const params = new URLSearchParams({
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
    vq: "hd1080",
    controls: "1",
  });

  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}

function Label({ children }: { children: string }) {
  return <h2 className="label-mono text-muted-foreground">/{children}</h2>;
}

function CaseStudy() {
  const { project: p } = Route.useLoaderData();
  const next = projects[(projects.findIndex((x) => x.slug === p.slug) + 1) % projects.length]!;
  return (
    <div className="bg-background">
      <Nav />
      <main className="px-4 pb-20 pt-28">
        <article className="mx-auto max-w-6xl">
          <SectionLink to="work" className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-3.5 w-3.5" />All work
          </SectionLink>
          <Reveal>
            <p className="label-mono mt-10 text-muted-foreground">{p.category}{p.location ? ` · ${p.location}` : ""}</p>
            <h1 className="mt-4 text-5xl font-extrabold uppercase leading-[0.95] tracking-tight md:text-8xl">{p.name}</h1>
            {p.description && (
              <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{p.description}</p>
            )}
          </Reveal>
          <Reveal>
            {p.image ? <SaturatingProjectImage src={p.image} alt={p.name} className="mt-12 aspect-[4/3] w-full rounded-3xl" /> : <Placeholder label="[Add hero image / reel thumbnail]" className="mt-12 aspect-[4/3] w-full rounded-3xl" />}
          </Reveal>

          <div className="mt-20 grid gap-14">
            <Reveal>
              <Label>My Role</Label>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.roles.map((r) => <span key={r} className="rounded-full bg-primary px-4 py-2 text-xs font-semibold uppercase tracking-wider text-primary-foreground">{r}</span>)}
              </div>
              <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-red-500/25 bg-red-500/5 px-4 py-2 text-sm font-bold text-foreground">
                <span aria-hidden="true" className="relative flex h-2.5 w-2.5 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-60" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
                </span>
                For the best experience, switch to higher quality.
              </p>
            </Reveal>
          </div>

          {p.slug === "arihant-jewellers" || p.slug === "event-campaigns" || p.slug === "education-client" ? (
            <Reveal className="mt-12">
              <Label>Selected Videos</Label>
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {(p.slug === "arihant-jewellers"
                  ? jewelleryVideos
                  : p.slug === "event-campaigns"
                    ? eventCampaignVideos
                    : instituteVideos).map((videoId, index) => (
                  <div
                    key={videoId}
                    className="mx-auto w-full max-w-[360px] overflow-hidden rounded-[1.5rem] border border-border bg-card shadow-card"
                  >
                    <div className="aspect-[9/16] w-full">
                      <iframe
                        className="h-full w-full"
                        src={buildYouTubeEmbedUrl(videoId)}
                        title={`${p.name} video ${index + 1}`}
                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                        loading="lazy"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          ) : (
            <div className="mt-12 grid items-center gap-4 md:grid-cols-[1fr_420px_1fr]">
              <div className="hidden h-[420px] rounded-[1.5rem] border border-border bg-card/70 md:block" />
              <div className="mx-auto w-full max-w-[420px] overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-card">
                <div className="aspect-[9/16] w-full">
                  <iframe
                    className="h-full w-full"
                    src={buildYouTubeEmbedUrl("uDGcUm2gqio")}
                    title="YouTube short"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              </div>
              <div className="hidden h-[420px] rounded-[1.5rem] border border-border bg-card/70 md:block" />
            </div>
          )}

          <Reveal className="mt-20 rounded-3xl bg-ink px-6 py-14 text-ink-foreground md:px-12">
            <h2 className="label-mono text-ink-muted">/Content Pipeline</h2>
            <ol className="mt-8 flex flex-col gap-2 md:flex-row md:flex-wrap md:items-center md:gap-4">
              {flow.map((s, i) => (
                <li key={s} className="flex items-center gap-4">
                  <span className={`text-2xl font-semibold uppercase tracking-tight md:text-3xl ${p.roles.some((r) => s.startsWith(r.slice(0, 4))) ? "" : "text-ink-muted"}`}>{s}</span>
                  {i < flow.length - 1 && <span className="text-ink-muted">→</span>}
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal className="mt-20"><Label>Result</Label><p className="mt-4 text-xl text-muted-foreground">{p.result ?? "[Add result]"}</p></Reveal>

          <Link to="/work/$slug" params={{ slug: next.slug }} className="group mt-24 flex items-center justify-between border-t border-border pt-10">
            <div><p className="label-mono text-muted-foreground">Next project</p><p className="mt-2 text-3xl font-bold uppercase tracking-tight md:text-5xl">{next.name}</p></div>
            <ArrowUpRight className="h-10 w-10 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
          </Link>
        </article>
      </main>
      <Footer />
    </div>
  );
}
