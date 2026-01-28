import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Pricing } from "@/components/sections/Pricing";
import { CalendarPanel } from "@/components/sections/CalendarPanel";

export default function PricingPage() {
  return (
    <div>
      <SiteHeader />
      <main>
        <Pricing />
        <CalendarPanel />
      </main>
      <SiteFooter />
    </div>
  );
}

