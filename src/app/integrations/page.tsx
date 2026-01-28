import Image from "next/image";
import { PageLayout } from "@/components/site/PageLayout";

const integrations = [
  {
    name: "Google Business Profile",
    src: "https://framerusercontent.com/images/ijUzqrYRIMgThj4gGPaokgHAo.png?width=64&height=64",
  },
  {
    name: "Facebook",
    src: "https://framerusercontent.com/images/U70E3CbFsFRl7fzPQgEWx9Q.png?width=64&height=64",
  },
  {
    name: "Instagram",
    src: "https://framerusercontent.com/images/XzNS6CtXeX8Ccb9M1sGmFz9pg.png?width=64&height=64",
  },
  {
    name: "Tripadvisor",
    src: "https://framerusercontent.com/images/p0YVjxcFTxnGPNhsysbdruNI8.png?width=64&height=64",
  },
];

export default function IntegrationsPage() {
  return (
    <PageLayout
      title="Integrations"
      subtitle="Connect the tools you already use and let BMON keep your marketing running on autopilot."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {integrations.map((i) => (
          <div
            key={i.name}
            className="flex items-center gap-4 rounded-2xl border border-[rgba(22,21,37,0.12)] bg-white p-5 shadow-[0_1px_0_rgba(22,21,37,0.04)]"
          >
            <Image
              src={i.src}
              alt={i.name}
              width={64}
              height={64}
              className="h-12 w-12"
            />
            <div className="text-sm font-semibold text-ink">{i.name}</div>
          </div>
        ))}
      </div>
    </PageLayout>
  );
}

