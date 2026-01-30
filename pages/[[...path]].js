import fs from "node:fs";
import path from "node:path";

const PUBLIC_DIR = path.join(process.cwd(), "public");
const INDEX_PATH = path.join(PUBLIC_DIR, "index.html");

const HTML_CACHE = new Map();

const TEXT_REPLACEMENTS = [
  [
    "Meet BMON 👋 Your new AI-Powered Digital Marketing Specialist,",
    "Meet BMON 👋 Your done-for-you local growth team.",
  ],
  [
    "Your AI-Powered Digital Marketing Specialist",
    "Website Design • Local SEO • AI Automations • Reviews • Social & Ads",
  ],
  ["who works tirelessly so you don’t have to.", "Strategy + execution—built for local businesses."],
  [
    "Your AI-Powered Digital Marketing Specialist, who works tirelessly so you don’t have to.",
    "Website Design, SEO, and AI automations that get you booked—without the busywork.",
  ],
  ["Start My Free Trial", "Book a Free Strategy Call"],
  ["Start Free Trial", "Book a Free Strategy Call"],
  ["Start free trial", "Book a Free Strategy Call"],
  ["Book My Free Demo", "Book a Free Strategy Call"],
  ["Book a demo", "Book a Free Strategy Call"],
  ["Book a Call", "Book a Free Strategy Call"],
  ["Log in", "Book a Free Strategy Call"],
  ["Login", "Book a Free Strategy Call"],
  ["Sign in", "Book a Free Strategy Call"],
  ["Sign In", "Book a Free Strategy Call"],
  ["Try Essential free", "Book a Free Strategy Call"],
  ["Try Premium free", "Book a Free Strategy Call"],
  ["Try Ultimate free", "Book a Free Strategy Call"],
  ["Ready to attract more customers?", "Ready to get more booked appointments?"],
  [
    "Get started today or book a free demo to see how BMON can help you grow your business.",
    "Book a free strategy call and get a plan for Website Design, SEO, Automations, and Ads—built for local growth.",
  ],
  [
    "Get discovered and chosen by consumers searching for the products or services you offer by improving your Local SEO.",
    "Show up when locals search—SEO + Google Business Profile optimizations that drive calls and booked appointments.",
  ],
  [
    "BMON ensures you protect and leverage your reputation by making it simple to get, respond to, and showcase reviews.",
    "Automate review requests and responses so you earn trust, win the click, and stay ahead of competitors.",
  ],
  [
    "Make data-driven decisions through centralized and visualized key metrics, and direct answers to your natural language questions.",
    "See what’s working in one dashboard—and get AI answers in plain English.",
  ],
  [
    "BMON builds your brand awareness and helps you stay top-of-mind by creating, targeting, and scheduling engaging cross-platform campaigns.",
    "Stay top-of-mind with Social Media Management and Ad Campaigns—planned, created, and scheduled for you.",
  ],
  ["Reputation Management", "Automations"],
  ["Insights & Analytics", "AI Implementation"],
  ["Social Media Management", "Social Media Management & Ad Campaigns"],
];

function normalizeSegments(segments) {
  if (!Array.isArray(segments)) return [];
  return segments
    .filter((s) => typeof s === "string" && s.length > 0)
    .map((s) => s.replace(/\.html$/i, ""));
}

function isSafeSegment(segment) {
  return /^[a-z0-9_-]+$/i.test(segment);
}

function resolveHtmlPath(segments) {
  if (!Array.isArray(segments) || segments.length === 0) return INDEX_PATH;
  if (!segments.every(isSafeSegment)) return INDEX_PATH;

  const base = path.join(PUBLIC_DIR, ...segments);
  const resolved = path.resolve(`${base}.html`);

  // Prevent path traversal (belt + suspenders)
  const publicResolved = path.resolve(PUBLIC_DIR) + path.sep;
  if (!resolved.startsWith(publicResolved)) return INDEX_PATH;

  return resolved;
}

function transformHtml(html) {
  if (typeof html !== "string" || !html) return html;
  let out = html;

  // Replace any leftover template branding/copy before first paint (prevents “flash”).
  out = out.replace(/\bMadison\b/g, "BMON");

  for (const [from, to] of TEXT_REPLACEMENTS) {
    out = out.split(from).join(to);
  }

  return out;
}

function readHtmlCached(filePath) {
  try {
    const stat = fs.statSync(filePath);
    const cached = HTML_CACHE.get(filePath);
    if (cached && cached.mtimeMs === stat.mtimeMs && typeof cached.html === "string") {
      return cached.html;
    }

    const html = transformHtml(fs.readFileSync(filePath, "utf8"));
    HTML_CACHE.set(filePath, { mtimeMs: stat.mtimeMs, html });
    return html;
  } catch {
    return null;
  }
}

export default function CatchAllPage() {
  return null;
}

export async function getServerSideProps({ res, params }) {
  const segments = normalizeSegments(params?.path);
  const requestedPath = resolveHtmlPath(segments);

  const html = readHtmlCached(requestedPath) ?? readHtmlCached(INDEX_PATH) ?? "";

  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.end(html);
  return { props: {} };
}
