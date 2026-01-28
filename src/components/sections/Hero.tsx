import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/site/Container";

export function Hero() {
  return (
    <section className="bg-white py-20 md:py-28">
      <Container>
        <div className="flex flex-col items-center text-center">
          <ButtonLink
            href="/#book"
            variant="outline"
            className="h-10 px-4 text-xs font-bold"
          >
            Watch 2-min video <span aria-hidden>▶</span>
          </ButtonLink>

          <h1 className="mt-10 max-w-4xl text-balance text-5xl font-extrabold tracking-tight text-ink md:text-7xl">
            Attract{" "}
            <span className="text-brand">new customers</span>
            <br className="hidden md:block" /> and bring them back more often
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted">
            Meet BMON — your AI-powered marketing specialist that works
            tirelessly so you don’t have to.
          </p>

          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
            <ButtonLink href="/#book" variant="primary" size="lg">
              Start My Free Trial <span aria-hidden>&gt;</span>
            </ButtonLink>
            <ButtonLink href="/#book" variant="outline" size="lg">
              Book My Free Demo
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
