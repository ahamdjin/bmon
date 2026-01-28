import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Hero } from "@/components/sections/Hero";
import { LogoStrip } from "@/components/sections/LogoStrip";
import { Features } from "@/components/sections/Features";
import { Pricing } from "@/components/sections/Pricing";
import { CalendarPanel } from "@/components/sections/CalendarPanel";

export default function Home() {
  return (
    <div>
      <SiteHeader />
      <main>
        <Hero />
        <LogoStrip />
        <Features />
        <Pricing />
        <CalendarPanel />
      </main>
      <SiteFooter />
    </div>
  );
}
