import Script from "next/script";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/site/Container";

export function CalendarPanel() {
  return (
    <section className="bg-white py-20" id="book">
      <Container>
        <div className="overflow-hidden rounded-[50px] bg-brand text-white shadow-soft">
          <div className="grid items-stretch gap-0 md:grid-cols-[1fr_1.1fr]">
            <div className="p-10 md:p-14">
              <h2 className="text-balance text-3xl font-extrabold tracking-tight md:text-4xl">
                Ready to attract more customers?
              </h2>
              <p className="mt-4 max-w-md text-sm text-white/85">
                Book a free demo to see how BMON can help you grow your business.
              </p>
              <div className="mt-8">
                <ButtonLink
                  href="#book"
                  variant="outline"
                  className="border-white/30 bg-white text-ink hover:bg-white/95"
                >
                  Start Free Trial <span aria-hidden>&gt;</span>
                </ButtonLink>
              </div>
            </div>

            <div className="bg-white/5 p-6 md:p-8">
              <div className="rounded-2xl bg-white p-2 shadow-soft">
                <iframe
                  title="Book a demo"
                  src="https://links.bmon.ai/widget/booking/3RE6MHpeNLyOKf2RC1yZ"
                  style={{
                    width: "100%",
                    border: "none",
                    overflow: "hidden",
                  }}
                  scrolling="no"
                  loading="lazy"
                  id="3RE6MHpeNLyOKf2RC1yZ_1769580878746"
                />
              </div>
              <Script
                src="https://links.bmon.ai/js/form_embed.js"
                strategy="afterInteractive"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
