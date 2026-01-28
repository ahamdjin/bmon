import { ButtonLink } from "@/components/ui/ButtonLink";
import { PageLayout } from "@/components/site/PageLayout";

export default function PartnersPage() {
  return (
    <PageLayout
      title="Partners"
      subtitle="Work with BMON to help more local businesses grow."
    >
      <div className="rounded-2xl border border-[rgba(22,21,37,0.12)] bg-subtle p-8">
        <h2 className="text-2xl font-extrabold tracking-tight text-ink">
          Become a partner
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-muted">
          If you’re an agency, consultant, or platform serving local businesses,
          we’d love to collaborate. Book a demo and we’ll walk you through
          partner options.
        </p>
        <div className="mt-6">
          <ButtonLink href="/#book" variant="primary" size="lg">
            Schedule a Partner Call <span aria-hidden>&gt;</span>
          </ButtonLink>
        </div>
      </div>
    </PageLayout>
  );
}
