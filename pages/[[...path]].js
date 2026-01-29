import fs from "node:fs";
import path from "node:path";

const INDEX_HTML = fs.readFileSync(path.join(process.cwd(), "public", "index.html"), "utf8");
const GOHIGHLEVEL_HTML = fs.readFileSync(
  path.join(process.cwd(), "public", "gohighlevel.html"),
  "utf8",
);

function normalizeRoute(segments) {
  if (!Array.isArray(segments) || segments.length === 0) return "/";
  return `/${segments.join("/")}`.replace(/\/+$/, "");
}

export default function CatchAllPage() {
  return null;
}

export async function getServerSideProps({ res, params }) {
  const route = normalizeRoute(params?.path);
  const html = route === "/gohighlevel" ? GOHIGHLEVEL_HTML : INDEX_HTML;

  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.end(html);
  return { props: {} };
}
