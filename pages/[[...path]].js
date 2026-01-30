import fs from "node:fs";
import path from "node:path";

const PUBLIC_DIR = path.join(process.cwd(), "public");
const INDEX_PATH = path.join(PUBLIC_DIR, "index.html");

const HTML_CACHE = new Map();

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

function readHtmlCached(filePath) {
  try {
    const stat = fs.statSync(filePath);
    const cached = HTML_CACHE.get(filePath);
    if (cached && cached.mtimeMs === stat.mtimeMs && typeof cached.html === "string") {
      return cached.html;
    }

    const html = fs.readFileSync(filePath, "utf8");
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
