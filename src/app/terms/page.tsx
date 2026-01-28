import { PageLayout } from "@/components/site/PageLayout";

export default function TermsPage() {
  return (
    <PageLayout
      title="Terms of Service"
      subtitle="These terms apply to the BMON marketing site and demo scheduling."
    >
      <div className="space-y-6 text-sm leading-relaxed text-muted">
        <p>
          By using this website, you agree to use it lawfully and not to disrupt
          or misuse the service. The content is provided for informational
          purposes and may change without notice.
        </p>
        <div>
          <div className="text-base font-bold text-ink">Demo scheduling</div>
          <p className="mt-2">
          When you book a demo, you agree that we may contact you about your
          request. You are responsible for the accuracy of information you
          submit.
          </p>
        </div>
        <div>
          <div className="text-base font-bold text-ink">Disclaimer</div>
          <p className="mt-2">
          The website is provided “as is” without warranties of any kind to the
          fullest extent permitted by law.
          </p>
        </div>
      </div>
    </PageLayout>
  );
}
