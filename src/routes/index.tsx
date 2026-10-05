import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, type FormEvent, type MouseEvent } from "react";
import { ArrowUpRight, ArrowDown, Plus, X, Instagram, Linkedin, Mail, MessageCircle } from "lucide-react";
import { Nav, Badge } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { ProjectCard } from "@/components/site/ProjectCard";
import { MusicPlayer } from "@/components/site/MusicPlayer";
import { Reveal, SectionTitle, Placeholder } from "@/components/site/Reveal";
import { projects, pipeline, services, experience, howIWork, clients, links } from "@/lib/content";

const TITLE = "Pruthviraj Rajput — Content Producer & Social Media Strategist";
const DESC = "Pruthviraj Rajput is a content producer and social media strategist handling the content pipeline from strategy and scripting to production, editing and social media.";
const PROFILE_IMAGE = "/images/Firefly.png";
const BRAND_LOGOS = [
  {
    name: "PW",
    src: "https://upload.wikimedia.org/wikipedia/commons/7/76/Physics_wallah_logo.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original",
  },
  {
    name: "Arihant Jewellers",
    src: "https://instagram.fpnq7-5.fna.fbcdn.net/v/t51.82787-19/782252562_18090376358207756_5277349299874742441_n.jpg?stp=dst-jpg_s150x150_tt6&_nc_cat=107&_nc_map=urlgen_bucketless&ccb=7-5&_nc_sid=f7ccc5&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy4xMDgwLkMzIn0%3D&_nc_ohc=U5Rc0l1jbx8Q7kNvwHD2Bfu&_nc_oc=AdrswOzXdLQyBWumjKhvTX4FA16kWbd6KTwQexMUyxagPROcQtYvkRZTJGrCrkl7zJ0&_nc_zt=24&_nc_ht=instagram.fpnq7-5.fna&_nc_gid=kJQ5IMK5F6fU1kp3LCqvZg&_nc_ss=7baaf&oh=00_AQMRTVKS8Ofzidx25yXn60GIrDOotc3rdtDdbDLIMBupgA&oe=6AC94DBD",
  },
  {
    name: "Kalawanti Jewellers",
    src: "https://instagram.fpnq7-5.fna.fbcdn.net/v/t51.82787-19/707693967_18126657229619119_6639000657813023886_n.jpg?stp=dst-jpg_s150x150_tt6&_nc_cat=102&_nc_map=urlgen_bucketless&ccb=7-5&_nc_sid=f7ccc5&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy4xMDgwLkMzIn0%3D&_nc_ohc=g2d62_Us4AgQ7kNvwGiC0pv&_nc_oc=Adp11YA71T8TyVf-sdpmRiuO3H3fbyuje3P6jZ8BefjlWkCzsLBg8tNniVvZbC8myf4&_nc_zt=24&_nc_ht=instagram.fpnq7-5.fna&_nc_gid=03m-hhs7_EtJ8_n49fS5Bw&_nc_ss=7baaf&oh=00_AQNzwWeQsIxUzVa8OyWn_TJmJUWGQy6mJ25FC7UuoGeADg&oe=6AC932FD",
  },
  {
    name: "Hridayam Entertainment",
    src: "https://instagram.fpnq7-1.fna.fbcdn.net/v/t51.82787-19/673858195_18083343704147300_5231103566078354440_n.jpg?stp=dst-jpg_s150x150_tt6&_nc_cat=108&_nc_map=urlgen_bucketless&ccb=7-5&_nc_sid=f7ccc5&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy4xMDgwLkMzIn0%3D&_nc_ohc=ddDcgsZzhBIQ7kNvwE_0Ix_&_nc_oc=AdofXJXWc9N5F2c1AzRxi1hs1yGC6f1dktRwOcmc9UV0kkT0OH2n4MlRAOMe_D8N69c&_nc_zt=24&_nc_ht=instagram.fpnq7-1.fna&_nc_gid=PvieNBfpfJjJzL_hjumOFw&_nc_ss=7baaf&oh=00_AQPQ6msDgT7f9BfPTpTHoahmW8Pi7sDlD7jBD7JJQ4ucyA&oe=6AC95BF9",
  },
  {
    name: "PERL Education",
    src: "https://instagram.fpnq7-10.fna.fbcdn.net/v/t51.82787-19/572128531_17983122506875685_5361622751145063821_n.jpg?stp=dst-jpg_s150x150_tt6&_nc_cat=105&_nc_map=urlgen_bucketless&ccb=7-5&_nc_sid=f7ccc5&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy4xMDgwLkMzIn0%3D&_nc_ohc=UjZbBZELGq4Q7kNvwHxmY5i&_nc_oc=AdrBWqOAl0WLkJczz_kPR5-_j2pCfTVVWip4fHSWI7uz13_dnIfVLuq06i1S_ySNtb0&_nc_zt=24&_nc_ht=instagram.fpnq7-10.fna&_nc_gid=4rl91JZi8ykkbVpHUH37-A&_nc_ss=7baaf&oh=00_AQM1XfAHLFQ041PvqAIxpftGMDCsP-TnT452d7JvlHNUNA&oe=6AC94C3C",
  },
  {
    name: "Fourteen O Nine Entertainment",
    src: "https://instagram.fpnq7-8.fna.fbcdn.net/v/t51.82787-19/767388234_18114136021878309_679435959141984673_n.jpg?stp=dst-jpg_s150x150_tt6&_nc_cat=103&_nc_map=urlgen_bucketless&ccb=7-5&_nc_sid=f7ccc5&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy4xMDI0LkMzIn0%3D&_nc_ohc=KW3G_igkxXsQ7kNvwFv3735&_nc_oc=AdqLEtwqkqvVQxKVJHD6LcMP1Fb6KBq5pLA4Io3eAz6QE7kYf_SxP5sW7ObxG9d2BqM&_nc_zt=24&_nc_ht=instagram.fpnq7-8.fna&_nc_gid=YnsjiHIpakh1STI-83pR7Q&_nc_ss=7baaf&oh=00_AQMKBgvGfBkCrpS9Pd7vi_NRjdz-rpvpi5rGEMiml_ok8A&oe=6AC95B93",
  },
  {
    name: "The Black Horse",
    src: "https://instagram.fpnq7-7.fna.fbcdn.net/v/t51.82787-19/694496011_18021562853663321_3227033068813643904_n.jpg?stp=dst-jpg_s150x150_tt6&_nc_cat=110&_nc_map=urlgen_bucketless&ccb=7-5&_nc_sid=f7ccc5&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy4xMDgwLkMzIn0%3D&_nc_ohc=nzCYNV5JQJwQ7kNvwERsydQ&_nc_oc=AdpsbC_1gNJRgcRDGuohVSUnMmhAmeJpif38PoH0K58Vs10TLPbYyZDjC8GMNn-LFmM&_nc_zt=24&_nc_ht=instagram.fpnq7-7.fna&_nc_gid=RCWXjZDJ5AQNfE2BuP-kwA&_nc_ss=7baaf&oh=00_AQPv8v7ju6delsQm-390wc0krCUv2mWPe_PD5mE-kQyDhw&oe=6AC949B7",
  },
  {
    name: "Hotel Silver Inn",
    src: "https://instagram.fpnq7-8.fna.fbcdn.net/v/t51.2885-19/444638621_785805750309796_8547313043807468880_n.jpg?stp=dst-jpg_s150x150_tt6&_nc_cat=105&_nc_map=urlgen_bucketless&ccb=7-5&_nc_sid=f7ccc5&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy4xMDgwLkMzIn0%3D&_nc_ohc=c2Aq_-6C_KkQ7kNvwG2RmX4&_nc_oc=Adr2ICCYFekETwIeKNoc9V4w6wJiCkzPj1rNc1DShDv25YnyZR9KLaciKGau5bjyOYk&_nc_zt=24&_nc_ht=instagram.fpnq7-8.fna&_nc_ss=7baaf&oh=00_AQPHUxsLFlqSjWj5_ovlXx04u1Ca99dRuMI402k9ceZNqg&oe=6AC939B1",
  },
  {
    name: "Paramdhara",
    src: "https://instagram.fpnq7-7.fna.fbcdn.net/v/t51.82787-19/673147105_17874331152595846_8319369590296193659_n.jpg?stp=dst-jpg_s150x150_tt6&_nc_cat=101&_nc_map=urlgen_bucketless&ccb=7-5&_nc_sid=f7ccc5&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy45MjguQzMifQ%3D%3D&_nc_ohc=w5sVvSSoVT8Q7kNvwHXGvpb&_nc_oc=Adqx3a3iA9LSsH2Y-EUVaVRhoLoBvvA7CCTpgcgC0i3GJ_gq9VyaI8H59lfBLEuxip0&_nc_zt=24&_nc_ht=instagram.fpnq7-7.fna&_nc_gid=V4HhXaUBmdYVnr0JMvPxrw&_nc_ss=7baaf&oh=00_AQO0widWES71ypiguMJbVuMa0g-IrjDmw9_QTx5eoIUEXA&oe=6AC9315F",
  },
  {
    name: "Growth Media",
    src: "https://instagram.fpnq7-3.fna.fbcdn.net/v/t51.82787-19/774076437_18240306301311162_8216488887306741194_n.jpg?stp=dst-jpg_s150x150_tt6&_nc_cat=100&_nc_map=urlgen_bucketless&ccb=7-5&_nc_sid=f7ccc5&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy4xMDI0LkMzIn0%3D&_nc_ohc=5SVfAyxPOrwQ7kNvwGdbrPQ&_nc_oc=AdqouOpQ7rTxc_xpCwniSJKyPxEO2QLflD2gFgsosU_5eeigkoibJQO5V2SfSFrVu6w&_nc_zt=24&_nc_ht=instagram.fpnq7-3.fna&_nc_gid=6wL9tfMUDxc630TEndw9UA&_nc_ss=7baaf&oh=00_AQMIpJ232IYJiz0h9mCespjtFWKwk1Siv4p5rvAatccP4Q&oe=6AC9495A",
  },
  {
    name: "That Unpredictable Journey",
    src: "https://yt3.googleusercontent.com/F4_xKgodlOQ0AoWCNgBP6tCL1H2MMYhW8XvwhmEqj-w91rvC5u8PUDwrxYBGBdPXiCgsIlANEA=s160-c-k-c0x00ffffff-no-rj",
  },
  {
    name: "S’Wich",
    src: "https://instagram.fpnq7-10.fna.fbcdn.net/v/t51.2885-19/455011927_2127269261006643_3681704367616476548_n.jpg?stp=dst-jpg_s150x150_tt6&_nc_cat=106&_nc_map=urlgen_bucketless&ccb=7-5&_nc_sid=f7ccc5&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy42ODcuQzMifQ%3D%3D&_nc_ohc=-UvbgVYQdbYQ7kNvwFlL3kE&_nc_oc=AdrZXYQkVzdaLXaPDgbRHn6NB6OTwOBWkH6aISOdLWWPx7n-szrBT4Ebr52evRb7tHg&_nc_zt=24&_nc_ht=instagram.fpnq7-10.fna&_nc_ss=7baaf&oh=00_AQM5XBxsTs8Vg4i5ZdxjjGWtLpNDa0c0WMEI3Ouksyrupg&oe=6AC955E6",
  },
  {
    name: "The Why Events",
    src: "https://instagram.fpnq7-6.fna.fbcdn.net/v/t51.2885-19/468519193_1776103543162042_4807034748144731873_n.jpg?stp=dst-jpg_s150x150_tt6&_nc_cat=104&_nc_map=urlgen_bucketless&ccb=7-5&_nc_sid=f7ccc5&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy44NTguQzMifQ%3D%3D&_nc_ohc=xFuEtht9rxsQ7kNvwEuAss3&_nc_oc=Adp-ldcsXWb7hXUTg4ierj2Et11hG9pcIbDI9hWBPQaU-WumT3CcIVGxws1yFjLASz0&_nc_zt=24&_nc_ht=instagram.fpnq7-6.fna&_nc_ss=7baaf&oh=00_AQOR_1Z7y7OmMo6gNY6Luqn7Hq_bKMH8pk6gbOrn0S8kIA&oe=6AC93A70",
  },
  {
    name: "Meridian Icecream",
    src: "https://instagram.fpnq7-9.fna.fbcdn.net/v/t51.2885-19/271960904_1216719058855131_88057082360184165_n.jpg?stp=dst-jpg_s150x150_tt6&_nc_cat=102&_nc_map=urlgen_bucketless&ccb=7-5&_nc_sid=f7ccc5&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy41MDAuQzMifQ%3D%3D&_nc_ohc=bqhV3C0Krs4Q7kNvwE-C8ED&_nc_oc=AdpUvz_oofEa0J0kX_unOy6cNyiARtuvB7aE0ksndvxczQ-8XlEZJZNF9n0GzCrF-oo&_nc_zt=24&_nc_ht=instagram.fpnq7-9.fna&_nc_ss=7baaf&oh=00_AQPP5g0a-bZu1usEy6WaqaRwOeOLRxkTxtKfYGMy7TtBWg&oe=6AC95F39",
  },
  {
    name: "Rockstarz Events",
    src: "https://instagram.fpnq7-10.fna.fbcdn.net/v/t51.82787-19/652907367_18060003419441061_1119784934914883967_n.jpg?stp=dst-jpg_s150x150_tt6&_nc_cat=102&_nc_map=urlgen_bucketless&ccb=7-5&_nc_sid=f7ccc5&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy43MDQuQzMifQ%3D%3D&_nc_ohc=1ZLurEFgbgoQ7kNvwEEgU9M&_nc_oc=AdoJXfbd-hs84j1Ng6ggwESo9b9LtzOfp8z8WEnedDP9wuIvCb8YUGuMAusns3ezzgw&_nc_zt=24&_nc_ht=instagram.fpnq7-10.fna&_nc_gid=hd8O3QHp1BXtJcL58y-43w&_nc_ss=7baaf&oh=00_AQOL9BA7-6oAltDQW8Gd5PwcHVbteSp6K1XzFNHn95FL4A&oe=6AC94D19",
  },
  {
    name: "Cafe SaltNPepper",
    src: "https://instagram.fpnq7-9.fna.fbcdn.net/v/t51.2885-19/288545627_133335809331894_6651619939963013217_n.jpg?stp=dst-jpg_s150x150_tt6&_nc_cat=110&_nc_map=urlgen_bucketless&ccb=7-5&_nc_sid=f7ccc5&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy40MzcuQzMifQ%3D%3D&_nc_ohc=c2P1EHqkVbwQ7kNvwEhvHk8&_nc_oc=AdrdZUdm4Y4KdhOl9wsPJJ-R1FzXQ0Qoa5KCGL18goQmO-oy9sntJdxJtEifRIrmZvU&_nc_zt=24&_nc_ht=instagram.fpnq7-9.fna&_nc_ss=7baaf&oh=00_AQMNyP68bspg69ZcnZqazLU7A7hFnKw-onn6BR-ITAJKzw&oe=6AC93790",
  },
  {
    name: "Body Zone Gym",
    src: "https://instagram.fpnq7-1.fna.fbcdn.net/v/t51.82787-19/573501893_17847060708596580_1185605122272156119_n.jpg?stp=dst-jpg_s150x150_tt6&_nc_cat=106&_nc_map=urlgen_bucketless&ccb=7-5&_nc_sid=f7ccc5&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy44NjEuQzMifQ%3D%3D&_nc_ohc=1ZFVQUteo_EQ7kNvwGhAwMR&_nc_oc=Adpzg-v0X5dHxBj0QrbNDPsYdIQTj3npBSy_VACYu6IwGPMtHB5XQyyx1gJMjtEriUw&_nc_zt=24&_nc_ht=instagram.fpnq7-1.fna&_nc_gid=lp4TwgpX-sMOla6LJlIIkA&_nc_ss=7baaf&oh=00_AQO_NSVLsncFpmjOei8kbPqIX7WiyGTQXsGfnrIfyPELFw&oe=6AC9442D",
  },
  {
    name: "NEW ERA ELITE",
    src: "https://instagram.fpnq7-2.fna.fbcdn.net/v/t51.82787-19/760819984_18074965367397112_521312081045759654_n.jpg?stp=dst-jpg_s150x150_tt6&_nc_cat=108&_nc_map=urlgen_bucketless&ccb=7-5&_nc_sid=f7ccc5&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy4xMDgwLkMzIn0%3D&_nc_ohc=_7WD0qyJ2ScQ7kNvwG9W8eU&_nc_oc=AdqqCCwJTJjVtv-ZRLxnwv1HPZmyFYkFxcAP9WTsxMNKpJxdT-N0eFhKH8o-A9j0anM&_nc_zt=24&_nc_ht=instagram.fpnq7-2.fna&_nc_gid=TvOLGQGucYtbO7_kCD5Wpw&_nc_ss=7baaf&oh=00_AQPUJ3u0EiHGZ8EmhNL7T5_O-28h09t-N71flX8bBqipiw&oe=6AC96ADB",
  },
  {
    name: "Anand Mamidwar",
    src: "https://instagram.fpnq7-10.fna.fbcdn.net/v/t51.82787-19/602958905_18076559357215638_7494002252672088957_n.jpg?stp=dst-jpg_s150x150_tt6&_nc_cat=109&_nc_map=urlgen_bucketless&ccb=7-5&_nc_sid=f7ccc5&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy4xMDgwLkMzIn0%3D&_nc_ohc=rwotqniDB7AQ7kNvwHHo-dc&_nc_oc=AdofPDsxeaf20GXgqsyJM3jQek3x3FBq3FD1utNiG7fq_E0oPdI8M6rjpBxvivjm-0I&_nc_zt=24&_nc_ht=instagram.fpnq7-10.fna&_nc_gid=IGrClqbODxVGmRRTNXYNMA&_nc_ss=7baaf&oh=00_AQON6YLjk9WeI2-651KS-GykXwFvI8FwwL7IFQXGxKwLtg&oe=6AC95A1A",
  },
];
const BRAND_PRIORITY = [
  "The Why Events",
  "PW",
  "Kalawanti Jewellers",
  "Arihant Jewellers",
  "Growth Media",
  "PERL Education",
  "Meridian Icecream",
  "That Unpredictable Journey",
  "Anand Mamidwar",
  "The Black Horse",
  "Fourteen O Nine Entertainment",
];
const ORDERED_BRAND_LOGOS = [...BRAND_LOGOS].sort((first, second) => {
  const firstPriority = BRAND_PRIORITY.indexOf(first.name);
  const secondPriority = BRAND_PRIORITY.indexOf(second.name);
  if (firstPriority === -1) return secondPriority === -1 ? 0 : 1;
  if (secondPriority === -1) return -1;
  return firstPriority - secondPriority;
});

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative">
      <Nav />
      <main>
        <Hero />
        <Work />
        <Services />
        <Experience />
        <Twisted />
        <About />
        <BrandMarquee />
        <HowIWork />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function SaturatingImage({ src, alt, wrapClass = "", imgClass = "" }: { src: string; alt: string; wrapClass?: string; imgClass?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ x: string; y: string } | null>(null);
  const update = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos({ x: `${((e.clientX - r.left) / r.width) * 100}%`, y: `${((e.clientY - r.top) / r.height) * 100}%` });
  };
  const mask = pos ? `radial-gradient(circle 170px at ${pos.x} ${pos.y}, black 35%, transparent 100%)` : "none";
  return (
    <div ref={ref} onMouseMove={update} onMouseLeave={() => setPos(null)} className={`relative ${wrapClass}`}>
      <img src={src} alt={alt} className={imgClass} />
      <img
        src={src}
        alt=""
        aria-hidden
        loading="lazy"
        className="pointer-events-none absolute inset-0 h-full w-full object-contain transition-opacity duration-300"
        style={{ WebkitMaskImage: mask, maskImage: mask, opacity: pos ? 1 : 0 }}
      />
    </div>
  );
}

function Shell({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-6xl rounded-3xl border border-border bg-card/95 px-6 py-16 shadow-card md:px-14 md:py-24 ${className}`}>{children}</div>;
}

function Hero() {
  return (
    <section className="px-4 pt-24">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-border bg-card shadow-card">
        <h1 className="hero-slide-down relative z-10 px-4 pt-14 text-center text-[13vw] font-extrabold leading-[0.9] tracking-tight md:pt-16 md:text-[8.5rem]">
          <span className="text-outline block md:inline">PRUTHVIRAJ</span>{" "}
          <span className="block md:inline">RAJPUT</span>
        </h1>
        <div className="relative grid gap-8 px-6 pb-10 pt-6 md:grid-cols-[1fr_1.1fr_1fr] md:items-end md:px-12 md:pb-0">
          <div className="hero-slide-down order-2 md:order-1 md:pb-14" style={{ animationDelay: "0.1s" }}>
            <p className="text-2xl font-semibold uppercase leading-tight tracking-tight">Content Producer &<br />Social Media Strategist</p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              <span className="text-foreground">4+ Years</span>
              <span className="text-muted-foreground">Experience</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">I handle the entire content pipeline.<br /></p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#contact" className="inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-3 text-xs font-semibold uppercase tracking-wider text-primary-foreground transition-transform hover:-translate-y-0.5">Let's Work <ArrowUpRight className="h-3.5 w-3.5" /></a>
              <a href="#work" className="inline-flex items-center gap-1.5 rounded-full border border-border px-5 py-3 text-xs font-semibold uppercase tracking-wider transition-colors hover:bg-muted">View My Work <ArrowDown className="h-3.5 w-3.5" /></a>
            </div>
          </div>
          <SaturatingImage src={PROFILE_IMAGE} alt="Portrait of Prithvi" wrapClass="hero-fade-in order-1 -mt-10 md:order-2 md:z-20 md:-mt-72 md:origin-bottom md:scale-[1.3]" imgClass="w-full grayscale" />
          <div className="hero-slide-up order-3 flex flex-col gap-3 md:items-end md:pb-14" style={{ animationDelay: "0.15s" }}>
            <p className="max-w-[16rem] text-sm leading-relaxed text-muted-foreground md:text-right">From concept to distribution, I build and manage content around what each project actually needs.</p>
            <div className="hero-slide-up flex flex-wrap gap-2 md:justify-end" style={{ animationDelay: "0.25s" }}>
              <a href={links.instagram} className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-medium shadow-pill"><Instagram className="h-3.5 w-3.5" />Instagram</a>
              <a href={links.whatsapp} className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-medium shadow-pill"><MessageCircle className="h-3.5 w-3.5" />WhatsApp</a>
            </div>
          </div>
        </div>
        <div className="border-t border-border bg-ink px-6 py-4 text-ink-foreground">
          <p className="label-mono flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-center">
            {["Strategy", "Script", "Shoot", "Edit", "Publish"].map((s, i) => (
              <span key={s} className="flex items-center gap-4">{s}{i < 4 && <span className="text-ink-muted">→</span>}</span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}

function Work() {
  return (
    <section id="work" className="scroll-mt-24 px-4 py-10">
      <Shell>
        <Reveal><div className="text-center"><div className="inline-block text-left"><SectionTitle ghost="Portfolio">Selected Work</SectionTitle></div></div></Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 2) * 120}><ProjectCard p={p} /></Reveal>
          ))}
        </div>
      </Shell>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="scroll-mt-24 px-4 py-20">
      <div className="mx-auto max-w-5xl">
        <Reveal><SectionTitle>Services</SectionTitle></Reveal>
        <div className="mt-10">
          {services.map((s, i) => (
            <div key={s.t} className="group my-3 overflow-hidden rounded-xl border-b border-foreground/15 transition-all duration-500 hover:bg-ink hover:text-ink-foreground hover:shadow-card">
              <div className="flex w-full items-center gap-4 px-5 py-7 text-left md:px-8">
                <span className="text-xs font-medium text-muted-foreground transition-colors duration-500 group-hover:text-ink-muted">0{i + 1}</span>
                <span className="flex-1 text-2xl font-medium uppercase tracking-tight md:text-5xl">{s.t}</span>
                <ArrowUpRight className="h-6 w-6 shrink-0 text-muted-foreground transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-ink-foreground" />
              </div>
              <div className="grid max-h-0 grid-rows-[0fr] transition-all duration-500 group-hover:max-h-40 group-hover:grid-rows-[1fr]">
                <p className="min-h-0 max-w-md overflow-hidden px-5 pb-0 text-sm leading-relaxed text-ink-muted transition-colors duration-500 group-hover:text-ink-muted md:px-8 md:pl-[4.25rem]">
                  <span className="block pb-8">{s.d}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section className="px-4 py-10">
      <div className="mx-auto max-w-6xl rounded-3xl bg-ink px-6 py-16 text-ink-foreground shadow-card md:px-14 md:py-20">
        <Reveal><SectionTitle ghost="Experience" dark>Experience</SectionTitle></Reveal>
        <div className="mt-12">
          {experience.map((e) => (
            <Reveal key={e.title} className="grid gap-3 border-b border-ink-border py-8 md:grid-cols-[1.2fr_1.5fr_auto] md:gap-10">
              <div>
                <h3 className="font-semibold">{e.title}</h3>
                <p className="mt-1 text-sm text-ink-muted">{e.sub}</p>
              </div>
              <p className="text-sm leading-relaxed text-ink-muted">{e.d}</p>
              <p className="text-sm text-ink-muted md:text-right">{e.dates}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Twisted() {
  return (
    <section className="px-4 py-20">
      <Reveal className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[1fr_1.3fr]">
        <div className="relative aspect-square overflow-hidden rounded-3xl border border-border bg-card/70 backdrop-blur-sm">
          <img src="/images/IMG_2774.PNG" alt="Twisted Media logo" className="h-full w-full object-cover" loading="lazy" />
        </div>
        <div>
          <p className="label-mono text-muted-foreground">/Also Building Twisted Media</p>
          <p className="mt-5 text-2xl font-medium leading-snug tracking-tight md:text-3xl">I also run Twisted Media, where I work on larger creative and social media projects.</p>
          <p className="mt-4 text-xl font-medium leading-snug tracking-tight text-muted-foreground md:text-2xl">The System to produce quality content for brands</p>
          <a href={links.twisted} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-1.5 rounded-full border border-foreground px-5 py-3 text-xs font-semibold uppercase tracking-wider transition-colors hover:bg-primary hover:text-primary-foreground">Visit Twisted Media <ArrowUpRight className="h-3.5 w-3.5" /></a>
        </div>
      </Reveal>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="scroll-mt-24 px-4 py-10">
      <Shell>
        <div className="grid gap-12 md:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <SectionTitle>About</SectionTitle>
            <div className="mt-10 flex flex-col items-center gap-8">
              <a href={links.instagram} target="_blank" rel="noreferrer" className="block aspect-square w-44 overflow-hidden rounded-full border border-border bg-card shadow-card transition-transform hover:scale-[1.02] sm:w-52">
                <img
                  src="/images/IMG_7210.JPG.jpeg"
                  alt="Portrait of Prithvi"
                  className="h-full w-full object-cover grayscale"
                  loading="lazy"
                />
              </a>
              <div className="aspect-video w-full overflow-hidden rounded-2xl border border-border bg-card shadow-card">
                <iframe
                  className="h-full w-full"
                  src="https://www.youtube.com/embed/w6gN_MUFN9I?rel=0&modestbranding=1&controls=1&vq=hd1080"
                  title="YouTube video player"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
          </Reveal>
          <Reveal className="space-y-5 text-lg leading-relaxed text-muted-foreground md:pt-24">
            <p className="hero-slide-up text-2xl font-medium leading-snug tracking-tight text-foreground" style={{ animationDelay: "0.08s" }}>I focus on turning ideas into content that actually gets used, published and seen.</p>
            <p className="hero-slide-up" style={{ animationDelay: "0.24s" }}>I don't believe every project needs the same process. Sometimes a brand needs a script. Sometimes it needs a shoot. Sometimes it needs someone to take the entire content pipeline off its hands.</p>
            <p className="hero-slide-up font-semibold text-foreground" style={{ animationDelay: "0.32s" }}>I step in where I'm needed.</p>
            <MusicPlayer />
          </Reveal>
        </div>
      </Shell>
    </section>
  );
}

function BrandMarquee() {
  return (
    <section className="px-4 py-10" aria-label="Brand collaborations">
      <div className="mx-auto max-w-6xl">
        <p className="mx-auto mb-6 w-fit rounded-full border border-border px-4 py-2 text-xs font-medium text-muted-foreground">
          Brands &amp; Collaborators
        </p>
        <div className="brand-marquee" tabIndex={0} aria-label="Brands and collaborators">
          <div className="brand-marquee__track">
            {[0, 1].map((copy) => (
              <div className="brand-marquee__group" key={copy} aria-hidden={copy === 1}>
                {ORDERED_BRAND_LOGOS.map((brand) => (
                  <div className="brand-marquee__item" key={brand.name}>
                    <img src={brand.src} alt={copy === 0 ? brand.name : ""} loading="lazy" />
                    <span>{brand.name}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function HowIWork() {
  return (
    <section id="how-i-work" className="scroll-mt-24 px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <Reveal><SectionTitle>How I Work</SectionTitle></Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {howIWork.map((h, i) => (
            <Reveal key={h.t} delay={i * 80} className="rounded-2xl border border-border bg-card/90 p-6 shadow-card transition-transform duration-500 hover:-translate-y-1">
              <span className="text-sm text-muted-foreground">0{i + 1}</span>
              <h3 className="mt-10 text-lg font-semibold uppercase leading-tight tracking-tight">{h.t}</h3>
              <p className="mt-3 text-sm text-muted-foreground">"{h.d}"</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY?.trim() || "d967215f-e9cf-4197-891c-58c15609b40e";
  const formRef = useRef<HTMLFormElement | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (status === "submitting" || status === "success") {
      return;
    }

    const f = new FormData(e.currentTarget);
    const botcheck = String(f.get("botcheck") ?? "").trim();
    const name = String(f.get("name") ?? "").trim();
    const email = String(f.get("email") ?? "").trim();
    const company = String(f.get("company") ?? "").trim();
    const service = String(f.get("service") ?? "").trim();
    const budget = String(f.get("budget") ?? "").trim();
    const message = String(f.get("message") ?? "").trim();

    if (botcheck) {
      setStatus("error");
      setError("Spam check failed. Please try again.");
      return;
    }

    if (!name || !email || !message) {
      setStatus("error");
      setError("Please fill in your name, email and message.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setStatus("error");
      setError("Please enter a valid email address.");
      return;
    }

    if (!accessKey) {
      setStatus("error");
      setError("The contact form is not configured yet. Please add the Web3Forms access key.");
      return;
    }

    setStatus("submitting");
    setError("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name,
          email,
          company,
          service,
          budget,
          message,
          botcheck: "",
        }),
      });

      const result = (await response.json().catch(() => ({}))) as { success?: boolean; message?: string };

      if (!response.ok || result.success === false) {
        throw new Error(result.message ?? "Unable to send your inquiry right now. Please try again.");
      }

      setStatus("success");
      if (formRef.current) {
        formRef.current.reset();
      }
    } catch (submitError) {
      setStatus("error");
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unable to send your inquiry right now. Please try again."
      );
    }
  };
  const input = "w-full rounded-xl border border-input bg-card px-4 py-3 text-sm outline-none transition-colors focus:border-foreground";
  return (
    <section id="contact" className="scroll-mt-24 px-4 py-10 pb-20">
      <div className="mx-auto max-w-6xl rounded-3xl border border-border bg-card/70 px-6 py-16 backdrop-blur-md md:px-14 md:py-24">
        <Reveal className="text-center">
          <Badge />
          <h2 className="mt-6 text-4xl font-bold uppercase tracking-tight md:text-7xl">Have content in mind?</h2>
          <p className="mx-auto mt-5 max-w-xl text-muted-foreground">Whether you need someone to develop the idea, write the script, handle production, edit the content or manage the social side — let's talk.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {[[Instagram, "Instagram", links.instagram], [Linkedin, "LinkedIn", links.linkedin], [Mail, "Email", links.email], [MessageCircle, "WhatsApp", links.whatsapp]].map(([Icon, l, h]) => {
              const I = Icon as typeof Mail;
              return <a key={l as string} href={h as string} className="inline-flex items-center gap-1.5 rounded-full bg-card px-4 py-2 text-sm font-medium shadow-pill transition-transform hover:-translate-y-0.5"><I className="h-4 w-4" />{l as string}</a>;
            })}
          </div>
        </Reveal>
        <Reveal>
          {status === "success" ? (
            <div className="mx-auto mt-14 grid max-w-xl gap-4 rounded-2xl border border-border bg-card/80 p-8 text-center shadow-card">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <ArrowUpRight className="h-5 w-5" />
              </div>
              <h3 className="text-2xl font-semibold uppercase tracking-tight">Inquiry Sent</h3>
              <p className="text-sm text-muted-foreground">Thanks for reaching out. Your message is on the way and I’ll get back to you soon.</p>
              <button
                type="button"
                onClick={() => {
                  setStatus("idle");
                  setError("");
                }}
                className="inline-flex items-center justify-center gap-1.5 rounded-full bg-primary px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-primary-foreground transition-transform hover:-translate-y-0.5"
              >
                Send another inquiry
              </button>
            </div>
          ) : (
            <form ref={formRef} onSubmit={onSubmit} className="mx-auto mt-14 grid max-w-3xl gap-4 sm:grid-cols-2">
              <input type="text" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
              <input required name="name" placeholder="Name" className={input} />
              <input required type="email" name="email" placeholder="Email" className={input} />
              <input name="company" placeholder="Company / Brand" className={input} />
              <select name="service" defaultValue="" className={input}>
                <option value="" disabled>What do you need help with?</option>
                {services.map((s) => <option key={s.t} value={s.t}>{s.t}</option>)}
                <option value="The full pipeline">The full pipeline</option>
              </select>
              <input name="budget" placeholder="Budget / project range (optional)" className={`${input} sm:col-span-2`} />
              <textarea required name="message" rows={5} placeholder="Message" className={`${input} sm:col-span-2`} />
              <div className="sm:col-span-2 flex flex-wrap items-center justify-between gap-4">
                <p className="text-xs text-muted-foreground">
                  {status === "submitting"
                    ? "Sending your inquiry…"
                    : status === "error"
                      ? <span className="text-destructive">{error}</span>
                      : "Replies usually within a couple of days."}
                </p>
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="inline-flex items-center gap-1.5 rounded-full bg-primary px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {status === "submitting" ? "Sending..." : "Send Inquiry"} <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
