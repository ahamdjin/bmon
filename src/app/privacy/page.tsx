import { PageLayout } from "@/components/site/PageLayout";

export default function PrivacyPage() {
  return (
    <PageLayout
      title="Privacy Policy"
      subtitle="This is a simplified privacy notice for the BMON marketing site."
    >
      <div className="space-y-6 text-sm leading-relaxed text-muted">
        <p>
          We collect basic analytics to understand how visitors use the site and
          to improve performance and content. When you book a demo, your
          information is captured through our scheduling provider.
        </p>
        <div>
          <div className="text-base font-bold text-ink">What we collect</div>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Basic usage metrics (pages viewed, device/browser, referrer).</li>
            <li>Information you submit when scheduling a demo.</li>
          </ul>
        </div>
        <div>
          <div className="text-base font-bold text-ink">How we use it</div>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Operate and improve the website.</li>
            <li>Respond to demo requests and provide customer support.</li>
          </ul>
        </div>
        <div>
          <div className="text-base font-bold text-ink">Contact</div>
          <p className="mt-2">
            If you have questions about privacy, contact us through the demo
            form.
          </p>
        </div>
      </div>
    </PageLayout>
  );
}
