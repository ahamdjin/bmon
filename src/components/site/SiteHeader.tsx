"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/site/Container";

const nav = [
  { label: "Features", href: "/#features" },
  { label: "Integrations", href: "/integrations" },
  { label: "Partners", href: "/partners" },
  { label: "Pricing", href: "/pricing" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-[rgba(22,21,37,0.05)] bg-white/90 backdrop-blur">
      <Container className="py-4">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 font-extrabold tracking-tight text-brand"
            aria-label="BMON Home"
          >
            <span className="text-xl">BMON</span>
          </Link>

          <nav className="hidden items-center gap-10 text-sm font-medium text-ink md:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-brand"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <ButtonLink href="/#book" variant="outline" size="md">
              Sign In
            </ButtonLink>
            <ButtonLink href="/#book" variant="primary" size="md">
              Start Free Trial <span aria-hidden>&gt;</span>
            </ButtonLink>
          </div>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[rgba(22,21,37,0.12)] bg-white md:hidden"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="block h-[2px] w-5 bg-ink" />
          </button>
        </div>
      </Container>

      {open ? (
        <div className="border-t border-[rgba(22,21,37,0.06)] bg-white md:hidden">
          <Container className="py-4">
            <div className="flex flex-col gap-3">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-3 py-2 text-sm font-semibold text-ink hover:bg-[rgba(22,21,37,0.04)]"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-2 flex gap-3">
                <ButtonLink href="/#book" variant="outline" className="flex-1">
                  Sign In
                </ButtonLink>
                <ButtonLink href="/#book" variant="primary" className="flex-1">
                  Start Free Trial
                </ButtonLink>
              </div>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
