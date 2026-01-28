import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Container } from "@/components/site/Container";

export function PageLayout({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <SiteHeader />
      <main className="bg-white">
        <Container className="py-16 md:py-20">
          <h1 className="text-balance text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
              {subtitle}
            </p>
          ) : null}
          <div className="mt-10">{children}</div>
        </Container>
      </main>
      <SiteFooter />
    </div>
  );
}

