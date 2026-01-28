import Image from "next/image";
import { Container } from "@/components/site/Container";

const logos = [
  {
    alt: "Mario's",
    src: "https://framerusercontent.com/images/RcAIiIf341UpDLuckYY65UpaT8U.png?width=345&height=98",
    w: 345,
    h: 98,
  },
  {
    alt: "Servpro",
    src: "https://framerusercontent.com/images/6SsxWWJdw842dA3LyXPcyCxyr4.png?width=409&height=240",
    w: 409,
    h: 240,
  },
  {
    alt: "16 Handles",
    src: "https://framerusercontent.com/images/AgrANf1KJwfqJgS71woN7gX1Xk.png?width=561&height=179",
    w: 561,
    h: 179,
  },
  {
    alt: "Bumper Burger",
    src: "https://framerusercontent.com/images/ozyNSvBSRqRefUDxNoY7htqjgz8.png?width=232&height=51",
    w: 232,
    h: 51,
  },
  {
    alt: "Hilton",
    src: "https://framerusercontent.com/images/WnBPJbgo0m6WPBI6oCLlSzsjRTk.png?width=62&height=62",
    w: 62,
    h: 62,
  },
];

export function LogoStrip() {
  return (
    <section className="bg-white pb-8">
      <Container>
        <div className="text-center text-sm font-semibold text-ink/75">
          Trusted by businesses of all kinds and sizes
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-90">
          {logos.map((l) => (
            <Image
              key={l.alt}
              src={l.src}
              alt={l.alt}
              width={l.w}
              height={l.h}
              className="h-8 w-auto object-contain md:h-9"
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

