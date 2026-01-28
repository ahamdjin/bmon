import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { PageLayout } from "@/components/site/PageLayout";

const bySlug: Record<
  string,
  { title: string; subtitle: string; bullets: string[] }
> = {
  "local-seo": {
    title: "Local SEO",
    subtitle:
      "Show up when customers search nearby — keep your listings accurate and competitive.",
    bullets: [
      "Profile optimization and listing consistency",
      "Local insights and performance reporting",
      "Simple recommendations you can act on",
    ],
  },
  "social-media-management": {
    title: "Social Media Management",
    subtitle:
      "Stay top-of-mind with daily content and smarter engagement across platforms.",
    bullets: [
      "Campaign creation and scheduling",
      "Comment/DM triage with on-brand replies",
      "Performance analytics and trend spotting",
    ],
  },
  "review-management": {
    title: "Reputation Management",
    subtitle:
      "Build trust with consistent review requests and fast, on-brand responses.",
    bullets: [
      "Automated review requests via email/SMS",
      "Review response assistance",
      "Reputation reporting and alerts",
    ],
  },
  analytics: {
    title: "Analytics",
    subtitle:
      "Understand what’s working with clear dashboards and decision-ready insights.",
    bullets: ["Unified reporting", "Trend analysis", "Competitive context"],
  },
};

export default async function FeaturePage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const data = bySlug[slug];
  if (!data) notFound();

  return (
    <PageLayout title={data.title} subtitle={data.subtitle}>
      <div className="grid gap-10 md:grid-cols-2">
        <div className="rounded-2xl border border-[rgba(22,21,37,0.12)] bg-white p-6">
          <div className="text-sm font-bold text-ink">Highlights</div>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            {data.bullets.map((b) => (
              <li key={b} className="flex gap-2">
                <span className="mt-[2px] text-brand" aria-hidden>
                  ✓
                </span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl bg-subtle p-6">
          <div className="text-sm font-bold text-ink">Next step</div>
          <p className="mt-3 text-sm text-muted">
            Want to see this in action for your business? Book a free demo and
            we’ll show you what BMON can do in under 15 minutes.
          </p>
          <div className="mt-6">
            <ButtonLink href="/#book" variant="primary" size="lg">
              Book a Free Demo <span aria-hidden>›</span>
            </ButtonLink>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
