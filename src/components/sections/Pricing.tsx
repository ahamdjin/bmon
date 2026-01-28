"use client";

import { useMemo, useState } from "react";
import { ButtonLink } from "@/components/ui/ButtonLink";

type Billing = "monthly" | "yearly";

type Plan = {
  name: string;
  monthly: number;
  yearly: number;
  cta: string;
  featured?: boolean;
  sections: { title: string; items: string[] }[];
};

const plans: Plan[] = [
  {
    name: "Essentials",
    monthly: 149,
    yearly: 119,
    cta: "Try Essentials free",
    sections: [
      {
        title: "Reputation Management",
        items: [
          "On-brand review responses",
          "500 emails to request reviews",
          "Reputation analytics",
        ],
      },
      {
        title: "Social Media",
        items: ["Performant daily campaigns", "Social media analytics"],
      },
      {
        title: "Local SEO",
        items: ["Basic Google Profile optimizations", "Local SEO analytics"],
      },
      { title: "Support", items: ["Self-serve onboarding", "Standard support"] },
    ],
  },
  {
    name: "Premium",
    monthly: 224,
    yearly: 179,
    cta: "Try Premium free",
    featured: true,
    sections: [
      {
        title: "Reputation Management",
        items: [
          "On-brand review responses",
          "1.5k emails + 250 SMS to request reviews",
          "Reputation analytics",
          "Report unfair reviews for removal",
        ],
      },
      {
        title: "Social Media",
        items: [
          "Performant daily campaigns",
          "Social media analytics",
          "Engaging DM and comment replies",
        ],
      },
      {
        title: "Local SEO",
        items: ["Advanced Google Profile optimizations", "Local SEO analytics"],
      },
      {
        title: "Support",
        items: ["White-glove onboarding & training", "Priority support"],
      },
    ],
  },
  {
    name: "Ultimate",
    monthly: 374,
    yearly: 299,
    cta: "Try Ultimate free",
    sections: [
      {
        title: "Reputation Management",
        items: [
          "On-brand review responses",
          "5k emails + 1k SMS to request reviews",
          "Analytics with competitor benchmarks",
          "Report unfair reviews for removal",
          "Capture customer emails",
        ],
      },
      {
        title: "Social Media",
        items: [
          "Performant daily campaigns",
          "Analytics with competitor benchmarks",
          "Engaging DM and comment replies",
          "Annual photoshoot*",
        ],
      },
      {
        title: "Local SEO",
        items: [
          "Optimizations across platforms",
          "Analytics with competitor benchmarks",
        ],
      },
      {
        title: "Support",
        items: ["White-glove onboarding & training", "Dedicated success manager"],
      },
    ],
  },
];

export function Pricing() {
  const [billing, setBilling] = useState<Billing>("monthly");

  const label = useMemo(
    () => (billing === "monthly" ? "Monthly" : "Yearly (Save 20%)"),
    [billing],
  );

  return (
    <section id="pricing" className="bg-white py-24">
      <div className="mx-auto max-w-[1000px] px-6 text-center">
        <h2 className="text-balance text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
          Pricing that’s simple,
          <br className="hidden md:block" /> predictable, and reasonable
        </h2>
        <p className="mt-4 text-sm text-muted">
          We’re here to help you grow your business, not your bills.
          <br className="hidden md:block" /> No nickel and diming. No hidden
          fees.
        </p>

        <div className="mt-10 flex items-center justify-center gap-3 text-xs font-semibold text-ink">
          <span className={billing === "monthly" ? "" : "text-ink/40"}>
            Monthly
          </span>
          <button
            type="button"
            className="relative h-6 w-11 rounded-pill bg-[rgba(22,21,37,0.12)] p-1"
            aria-label={`Billing toggle: ${label}`}
            onClick={() =>
              setBilling((v) => (v === "monthly" ? "yearly" : "monthly"))
            }
          >
            <span
              className={`block h-4 w-4 rounded-full bg-brand transition-transform ${
                billing === "yearly" ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
          <span className={billing === "yearly" ? "" : "text-ink/40"}>
            Yearly (Save 20%)
          </span>
        </div>
      </div>

      <div className="mx-auto mt-14 grid max-w-[1100px] gap-6 px-6 md:grid-cols-3">
        {plans.map((plan) => {
          const price = billing === "monthly" ? plan.monthly : plan.yearly;
          const border = plan.featured
            ? "border-brand shadow-soft bg-[rgba(79,70,229,0.04)]"
            : "border-[rgba(22,21,37,0.15)] bg-white";

          return (
            <div
              key={plan.name}
              className={`rounded-2xl border p-6 ${border}`}
            >
              <div className="text-sm font-bold text-ink">{plan.name}</div>
              <div className="mt-4 flex items-end gap-2">
                <div className="text-5xl font-extrabold tracking-tight text-ink">
                  ${price}
                </div>
                <div className="pb-2 text-xs text-muted">
                  / month per location
                </div>
              </div>

              <div className="mt-6">
                <ButtonLink
                  href="/#book"
                  variant={plan.featured ? "primary" : "outline"}
                  className="w-full justify-center"
                >
                  {plan.cta}
                </ButtonLink>
              </div>

              <div className="mt-8 space-y-6 text-left text-xs">
                {plan.sections.map((section) => (
                  <div key={section.title}>
                    <div className="font-bold text-ink">{section.title}</div>
                    <ul className="mt-3 space-y-2">
                      {section.items.map((item) => (
                        <li key={item} className="flex gap-2 text-ink/85">
                          <span
                            className="mt-[2px] inline-flex h-4 w-4 items-center justify-center rounded-full bg-[rgba(34,197,94,0.12)] text-[10px] font-black text-green-700"
                            aria-hidden
                          >
                            ✓
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

