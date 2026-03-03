import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import {
  Navbar,
  HeroSection,
  PreOrderSection,
  NewsSection,
  CharactersSection,
  FeaturesSection,
  MajorsFrame,
  MajorsSection,
  WorldEvolutionSection,
  OpenWorldSection,
  EditionsSection,
  EarthSection,
  PathsSection,
  SocialSidebar,
  SupportBar,
  Footer,
} from "@/components/home";

function CloudBackground({ className }: { className?: string }) {
  return (
    <div className={`${className}`}>
      <Image src="/images/cloud-6.png" alt="" fill className="object-contain" />
    </div>
  );
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="relative min-h-screen bg-[#030912] overflow-x-hidden">
      <SocialSidebar />
      <SupportBar />
      <Navbar />

      <div className="relative z-10 flex flex-col">
        <div className="relative h-screen flex flex-col">
          <div className="absolute inset-0 overflow-hidden">
            <video
              src="/images/Background.webm"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(180deg, rgba(3, 9, 18, 0) 40%, rgba(3, 9, 18, 0.6) 65%, rgb(3, 9, 18) 100%)",
              }}
            />
          </div>

          <HeroSection />
        </div>

        <div className="relative isolate">
          <CloudBackground className="absolute top-1/10 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1282px] h-[763px] pointer-events-none -z-10 opacity-50" />
          <PreOrderSection />
        </div>
        <NewsSection />
        <CharactersSection />

        <div className="relative isolate">
          <CloudBackground className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1282px] h-[763px] pointer-events-none -z-10" />
          <FeaturesSection />
        </div>

        <div className="relative z-10 -mt-12 lg:-mt-20 -mb-12 lg:-mb-15">
          <MajorsFrame />
        </div>

        <MajorsSection />

        <div className="relative isolate">
          <CloudBackground className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1282px] h-[763px] pointer-events-none -z-10" />
          <WorldEvolutionSection />
        </div>

        <OpenWorldSection />
        <EditionsSection />

        <div className="relative isolate">
          <CloudBackground className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1282px] h-[763px] pointer-events-none -z-10" />
          <EarthSection />
        </div>

        <PathsSection />
        <Footer />
      </div>
    </div>
  );
}
