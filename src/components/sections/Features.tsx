import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/site/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";

type Feature = {
  slug: string;
  tag: string;
  title: string;
  description: string;
  image: { src: string; width: number; height: number };
  reverse?: boolean;
};

const features: Feature[] = [
  {
    slug: "local-seo",
    tag: "Local SEO",
    title: "Rank higher on Google",
    description:
      "Get discovered and chosen by customers searching for what you offer by improving your local presence.",
    image: {
      src: "https://framerusercontent.com/images/Uwt9ulz0l9yaU5xnPzX5Cd6XUx8.png?scale-down-to=1024&width=1336&height=541",
      width: 1336,
      height: 541,
    },
  },
  {
    slug: "social-media-management",
    tag: "Social Media Management",
    title: "Grow your brand reach",
    description:
      "Create, target, and schedule engaging campaigns that keep you top-of-mind across platforms.",
    image: {
      src: "https://framerusercontent.com/images/B3pqMcGnJItBHjYIaRQtafUQ.png?scale-down-to=1024&width=2501&height=927",
      width: 2501,
      height: 927,
    },
    reverse: true,
  },
  {
    slug: "review-management",
    tag: "Reputation Management",
    title: "Protect your reputation",
    description:
      "Turn reviews into revenue with fast, on-brand responses and automated review requests.",
    image: {
      src: "https://framerusercontent.com/images/N5Ool9C6LRx6Hkl3SiZrsvtLVsI.png?scale-down-to=1024&width=1863&height=390",
      width: 1863,
      height: 390,
    },
  },
  {
    slug: "analytics",
    tag: "Insights",
    title: "See what’s working",
    description:
      "Track performance, spot trends, and make smarter marketing decisions with clear reporting.",
    image: {
      src: "https://framerusercontent.com/images/vtD0ixaC571lq5yVs8UgLdmKBLI.png?scale-down-to=1024&width=3036&height=639",
      width: 3036,
      height: 639,
    },
    reverse: true,
  },
];

export function Features() {
  return (
    <section id="features" className="bg-white py-24">
      <Container>
        <div className="text-center">
          <h2 className="text-balance text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
            Simply connect your profiles
            <br className="hidden md:block" />{" "}
            <span className="text-brand">and watch BMON work magic</span>
          </h2>
          <div className="mt-10 flex items-center justify-center gap-14 opacity-95">
            {[
              {
                alt: "Facebook",
                src: "https://framerusercontent.com/images/U70E3CbFsFRl7fzPQgEWx9Q.png?width=64&height=64",
              },
              {
                alt: "Tripadvisor",
                src: "https://framerusercontent.com/images/p0YVjxcFTxnGPNhsysbdruNI8.png?width=64&height=64",
              },
              {
                alt: "Google",
                src: "https://framerusercontent.com/images/ijUzqrYRIMgThj4gGPaokgHAo.png?width=64&height=64",
              },
              {
                alt: "Instagram",
                src: "https://framerusercontent.com/images/XzNS6CtXeX8Ccb9M1sGmFz9pg.png?width=64&height=64",
              },
              {
                alt: "Twitter",
                src: "https://framerusercontent.com/images/WnBPJbgo0m6WPBI6oCLlSzsjRTk.png?width=62&height=62",
              },
            ].map((i) => (
              <Image
                key={i.alt}
                src={i.src}
                alt={i.alt}
                width={64}
                height={64}
                className="h-12 w-12"
              />
            ))}
          </div>
        </div>
      </Container>

      <div className="mt-20 space-y-20">
        {features.map((f) => (
          <Container key={f.slug}>
            <div
              className={`grid items-center gap-12 md:grid-cols-2 ${
                f.reverse ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="relative overflow-hidden rounded-card bg-brand">
                <div className="absolute inset-0 opacity-10 [background:radial-gradient(circle_at_30%_20%,white,transparent_55%)]" />
                <div className="p-10">
                  <Image
                    src={f.image.src}
                    alt=""
                    width={f.image.width}
                    height={f.image.height}
                    className="w-full rounded-2xl bg-white/10 object-contain"
                  />
                </div>
              </div>

              <div>
                <div className="inline-flex rounded-pill bg-[rgba(79,70,229,0.08)] px-3 py-1 text-xs font-bold text-brand">
                  {f.tag}
                </div>
                <h3 className="mt-4 text-3xl font-extrabold tracking-tight text-ink md:text-4xl">
                  {f.title}
                </h3>
                <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
                  {f.description}
                </p>
                <div className="mt-8 flex items-center gap-4">
                  <ButtonLink href={`/features/${f.slug}`} variant="outline">
                    Learn More
                  </ButtonLink>
                  <Link
                    href="/#book"
                    className="text-sm font-semibold text-brand hover:underline"
                  >
                    Book a demo
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        ))}
      </div>
    </section>
  );
}
