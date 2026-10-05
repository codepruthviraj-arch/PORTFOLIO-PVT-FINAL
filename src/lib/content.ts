// Edit everything here: projects, services, experience, links.
// To add a real image, import it and set `image` on the project.

export type Project = {
  slug: string;
  name: string;
  location?: string;
  category: string;
  role: string;
  description: string;
  tags: string[];
  image?: string;
  roles: string[];
  result?: string; // only fill with real results
};

export const projects: Project[] = [
  {
    slug: "event-campaigns",
    name: "Event Promotional Campaigns",
    category: "Events · Promotion",
    role: "Concepts, reels, editing & promotion",
    image: "/images/Gritty%20Cinematic%20Events%20Collage.png",
    description: "",
    tags: ["Concepts", "Reels", "Editing", "Promotion"],
    roles: ["Concept", "Scripting", "Videography", "Editing", "Social Media"],
  },
  {
    slug: "arihant-jewellers",
    name: "Jewellery Business",
    location: "Chhatrapati Sambhajinagar, Maharashtra",
    category: "Content Production · Social Media",
    role: "Strategy, scripting, production, editing & social",
    image: "/images/Gritty%20Gold%20Jewellers%20Team%20Collage.png",
    description:
      "Developing social-first content for a jewellery brand, from concepts and scripts to production, editing and publishing.",
    tags: ["Content", "Production", "Editing", "Social Media"],
    roles: ["Strategy", "Concept", "Scripting", "Videography", "Production", "Editing", "Social Media"],
  },
  {
    slug: "education-client",
    name: "Institute",
    category: "Social Media Management",
    role: "Planning, reels, stories & editing",
    image: "/images/Institute%20Education%20Collage%20Poster.png",
    description:
      "Running social media for an education institute — content planning, reels, stories and editing.",
    tags: ["Planning", "Reels", "Stories", "Editing"],
    roles: ["Strategy", "Concept", "Videography", "Editing", "Social Media"],
  },
  {
    slug: "advocate-client",
    name: "Professional Services",
    category: "Short-form Content",
    role: "Content creation & reel editing",
    image: "/images/Professional%20Portrait%20Collage.png",
    description:
      "Short-form video content for a professional services client, from creation to reel edit.",
    tags: ["Short-form", "Reels", "Editing"],
    roles: ["Concept", "Videography", "Production", "Editing"],
  },
];

export const pipeline = [
  { n: "01", t: "Strategy", d: "Understand the brand, audience, platform and objective." },
  { n: "02", t: "Concept", d: "Develop content ideas and formats around the objective." },
  { n: "03", t: "Script", d: "Build hooks, structure, storytelling and CTAs." },
  { n: "04", t: "Production", d: "Handle or coordinate the shoot according to the project's requirements." },
  { n: "05", t: "Edit", d: "Turn raw footage into polished, engaging, platform-ready content." },
  { n: "06", t: "Distribution", d: "Publish, optimize and manage content across social platforms." },
];

export const services = [
  { t: "Content Strategy", d: "Turning business and brand objectives into practical content directions, formats and ideas." },
  { t: "Scripting & Concept", d: "Developing hooks, concepts and scripts designed around the platform, audience and objective." },
  { t: "Content Production", d: "Planning and handling shoots according to the requirements of the project, from preparation through execution." },
  { t: "Video Editing", d: "Professional short-form and social-first editing with strong pacing, storytelling, sound design, captions and visual polish." },
  { t: "Social Media", d: "Managing content after production — publishing, optimization, consistency and day-to-day social media execution." },
];

export const experience = [
  { title: "Freelancer", sub: "Videography · Video Editing", dates: "2022 — 2024", d: "Working on freelance projects across videography and video editing." },
  { title: "Content Producer", sub: "Content Strategy · Production · Editing · Social Media", dates: "2024 — 2026", d: "Working directly with brands, businesses and projects to develop, produce and manage social-first content." },
  { title: "Founder — Twisted Media", sub: "Creative Content & Social Media", dates: "2026 — Present", d: "Building and running Twisted Media, a creative content agency." },
];

export const howIWork = [
  { t: "Understand the objective", d: "What are we actually trying to achieve?" },
  { t: "Build the idea", d: "Find the right concept, format and story." },
  { t: "Make it", d: "Script, shoot, edit and execute according to the requirement." },
  { t: "Put it to work", d: "Publish, optimize and learn from performance." },
];

export const clients = ["Arihant Jewellers", "Education Institute", "Advocate", "Retro Bollywood Night", "Cosplay / Diet Coke Rave", "[Add client]"];

// Replace "#" with your real links.
export const links = {
  instagram: "https://www.instagram.com/pruthviraj.mov/",
  telegram: "https://t.me/prithviirajputt",
  email: "mailto:hello@example.com",
  emailAddress: "hello@example.com",
  whatsapp: "https://wa.me/7385725569",
  twisted: "https://instagram.com/twistedmedia.io",
};
