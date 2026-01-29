import fs from "node:fs";
import path from "node:path";

const INDEX_HTML = fs.readFileSync(path.join(process.cwd(), "public", "index.html"), "utf8");
const GOHIGHLEVEL_HTML = fs.readFileSync(
  path.join(process.cwd(), "public", "gohighlevel.html"),
  "utf8",
);
const INTEGRATIONS_HTML = fs.readFileSync(
  path.join(process.cwd(), "public", "integrations.html"),
  "utf8",
);
const PARTNERS_HTML = fs.readFileSync(path.join(process.cwd(), "public", "partners.html"), "utf8");
const PRICING_HTML = fs.readFileSync(path.join(process.cwd(), "public", "pricing.html"), "utf8");

const ROUTE_HTML = new Map([
  ["/", INDEX_HTML],
  ["/gohighlevel", GOHIGHLEVEL_HTML],
  ["/integrations", INTEGRATIONS_HTML],
  ["/partners", PARTNERS_HTML],
  ["/pricing", PRICING_HTML],
]);

function normalizeRoute(segments) {
  if (!Array.isArray(segments) || segments.length === 0) return "/";
  return `/${segments.join("/")}`.replace(/\/+$/, "");
}

export default function CatchAllPage() {
  return null;
}

export async function getServerSideProps({ res, params }) {
  const route = normalizeRoute(params?.path);
  const html = ROUTE_HTML.get(route) ?? INDEX_HTML;

  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.end(html);
  return { props: {} };
}
