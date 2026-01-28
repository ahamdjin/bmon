import Link from "next/link";

type Variant = "primary" | "outline" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-pill font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 ring-offset-white disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand text-white shadow-soft hover:bg-brand-700 active:bg-brand-700",
  outline:
    "border border-[rgba(22,21,37,0.15)] bg-white text-ink hover:border-[rgba(22,21,37,0.25)] hover:bg-[rgba(79,70,229,0.04)]",
  ghost: "bg-transparent text-ink hover:bg-[rgba(22,21,37,0.04)]",
};

const sizes: Record<Size, string> = {
  md: "h-10 px-5 text-sm",
  lg: "h-12 px-7 text-sm",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
  target,
  rel,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  target?: string;
  rel?: string;
}) {
  const cn = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  const isExternal = href.startsWith("http");
  if (isExternal) {
    return (
      <a href={href} className={cn} target={target} rel={rel}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cn}>
      {children}
    </Link>
  );
}

