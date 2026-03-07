import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Navbar, SupportBar, SocialSidebar } from "@/components/home";
import { WorldUI } from "@/components/monde/world-ui";
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
      {/* Prefetch globe assets */}
      <link rel="prefetch" href="/images/earth-blue-marble.jpg" as="image" />
      <link rel="prefetch" href="/images/earth-topology.png" as="image" />
      <link rel="prefetch" href="/images/earth-clouds.png" as="image" />
      <link rel="prefetch" href="/data/countries.geojson" as="fetch" crossOrigin="anonymous" />

      <SocialSidebar />
      <SupportBar />
      <Navbar />

      {/* Gradient overlays */}
      <div className="absolute inset-0 pointer-events-none z-20">
        <div className="absolute top-0 left-0 right-0 h-36 bg-gradient-to-b from-[#030912]/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-[#030912]/80 to-transparent" />
      </div>

      {/* All world UI (globe + panels + modals + mobile title) */}
      <WorldUI />
    </div>
  );
}
