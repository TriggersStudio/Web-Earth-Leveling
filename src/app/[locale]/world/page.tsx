import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Navbar, SupportBar, SocialSidebar } from "@/components/home";
import { WorldGlobe } from "@/components/monde/world-globe";
import { Countdown } from "@/components/ui/countdown";

const isDev = process.env.NODE_ENV === "development";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return {
    title: t("worldTitle"),
    description: t("worldDescription"),
  };
}

export default async function WorldPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "World" });

  if (!isDev) {
    return (
      <div className="relative min-h-screen bg-[#030912] overflow-hidden">
        <SocialSidebar />
        <SupportBar />
        <Navbar />
        <Countdown />
      </div>
    );
  }

  return (
    <div className="relative h-screen bg-[#030912] overflow-hidden">
      {/* Prefetch globe assets — low priority so they don't block JS chunks */}
      <link rel="prefetch" href="/images/earth-night.jpg" as="image" />
      <link rel="prefetch" href="/images/earth-topology.png" as="image" />
      <link rel="prefetch" href="/images/earth-clouds.png" as="image" />
      <link rel="prefetch" href="/data/countries.geojson" as="fetch" crossOrigin="anonymous" />

      <SocialSidebar />
      <SupportBar />
      <Navbar />

      {/* Globe */}
      <div className="absolute inset-0">
        <WorldGlobe />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 pointer-events-none z-20">
        <div className="absolute top-0 left-0 right-0 h-36 bg-gradient-to-b from-[#030912]/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-[#030912]/80 to-transparent" />
        <div className="absolute top-0 bottom-0 left-0 w-80 bg-gradient-to-r from-[#030912]/50 to-transparent hidden lg:block" />
      </div>

      {/* Title overlay */}
      <div className="absolute bottom-12 left-6 lg:bottom-16 lg:left-12 z-30 pointer-events-none">
        <p className="font-chamberi-display font-bold text-[#C29FFF]/60 text-xs tracking-[0.3em] uppercase mb-2">
          {t("label")}
        </p>
        <h1 className="font-ghavettor text-gradient-gold text-5xl sm:text-6xl lg:text-7xl leading-none">
          {t("title")}
        </h1>
        <p className="font-caslon text-[#868686] text-sm lg:text-base mt-3 max-w-xs">
          {t("description")}
        </p>
      </div>

      {/* Controls hint */}
      <div className="absolute bottom-6 right-6 z-30 pointer-events-none hidden lg:flex items-center gap-3">
        <div className="flex items-center gap-2 bg-[#040c17]/80 backdrop-blur-sm border border-white/5 rounded-lg px-3 py-2">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#868686"
            strokeWidth="1.5"
          >
            <path d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
          </svg>
          <span className="font-chamberi-headline text-[#868686] text-[11px] tracking-wider">
            {t("controlsHint")}
          </span>
        </div>
      </div>
    </div>
  );
}
