import fs from "node:fs";
import path from "node:path";

const INDEX_HTML_PATH = path.join(process.cwd(), "public", "index.html");
const INDEX_HTML = fs.readFileSync(INDEX_HTML_PATH, "utf8");

export default function CatchAllPage() {
  return null;
}

export async function getServerSideProps({ res }) {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.end(INDEX_HTML);
  return { props: {} };
}

