import Link from "next/link";
import { Container } from "@/components/site/Container";

const main = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/#features" },
  { label: "Integrations", href: "/integrations" },
  { label: "Pricing", href: "/pricing" },
];

const learn = [
  { label: "Terms of Service", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
];

const join = [{ label: "Partners", href: "/partners" }];

export function SiteFooter() {
  return (
    <footer className="border-t border-[rgba(22,21,37,0.06)] bg-white">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <div className="text-lg font-extrabold tracking-tight text-brand">
              BMON
            </div>
            <p className="mt-2 max-w-sm text-sm text-muted">
              AI-powered marketing specialist for local businesses.
            </p>
          </div>

          <div>
            <div className="text-xs font-bold tracking-wider text-ink/70">
              MAIN
            </div>
            <ul className="mt-4 space-y-3 text-sm">
              {main.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-ink hover:text-brand">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-xs font-bold tracking-wider text-ink/70">
              LEARN
            </div>
            <ul className="mt-4 space-y-3 text-sm">
              {learn.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-ink hover:text-brand">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-xs font-bold tracking-wider text-ink/70">
              JOIN US
            </div>
            <ul className="mt-4 space-y-3 text-sm">
              {join.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-ink hover:text-brand">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-[rgba(22,21,37,0.06)] pt-6 text-xs text-muted">
          © {new Date().getFullYear()} BMON. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}

