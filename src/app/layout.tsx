import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";

const figtree = Figtree({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-figtree",
});

export const metadata: Metadata = {
  title: "BMON — AI Marketing for Local Business",
  description:
    "BMON helps local businesses attract new customers and keep them coming back with AI-powered marketing.",
  metadataBase: new URL("https://bmon.ai"),
  openGraph: {
    title: "BMON — AI Marketing for Local Business",
    description:
      "BMON helps local businesses attract new customers and keep them coming back with AI-powered marketing.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={figtree.variable}>
      <body className="min-h-dvh font-[var(--font-figtree)] antialiased">
        {children}
      </body>
    </html>
  );
}
