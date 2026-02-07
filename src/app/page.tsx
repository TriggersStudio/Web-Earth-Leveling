import Image from "next/image";
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

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-[#030912] overflow-x-hidden">
      <SocialSidebar />

      <SupportBar />
      <Navbar />

      <div className="relative z-10 flex flex-col">
        <div className="relative h-screen flex flex-col">
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src="/images/hero-background.png"
              alt=""
              fill
              className="object-cover object-top"
              priority
            />
            {/* Eye glow overlay */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Flicker effect - quick flash before glow starts */}
              <div
                className="hero-eye-flicker absolute w-3 h-3 rounded-full"
                style={{
                  top: "31%",
                  left: "46.3%",
                  background: "radial-gradient(circle, rgba(0,180,255,0.9) 0%, transparent 70%)",
                  filter: "blur(2px)",
                }}
              />

              {/* Primary eye - bright core */}
              <div
                className="hero-eye-glow absolute w-4 h-3 rounded-full"
                style={{
                  top: "30.5%",
                  left: "46%",
                  background: "radial-gradient(ellipse, rgba(0,200,255,0.95) 0%, rgba(0,150,255,0.4) 50%, transparent 80%)",
                  filter: "blur(3px)",
                }}
              />

              {/* Primary eye - large aura */}
              <div
                className="hero-eye-aura absolute w-16 h-14 rounded-full"
                style={{
                  top: "27.5%",
                  left: "44%",
                  background: "radial-gradient(ellipse, rgba(0,160,255,0.3) 0%, rgba(0,100,255,0.1) 40%, transparent 70%)",
                  filter: "blur(12px)",
                }}
              />

              {/* Secondary eye - subtle glow */}
              <div
                className="hero-eye-glow absolute w-2 h-2 rounded-full"
                style={{
                  top: "31%",
                  left: "49.8%",
                  background: "radial-gradient(circle, rgba(0,180,255,0.5) 0%, transparent 70%)",
                  filter: "blur(3px)",
                  animationDelay: "1.7s",
                }}
              />

              {/* Secondary eye - subtle aura */}
              <div
                className="hero-eye-aura absolute w-10 h-8 rounded-full"
                style={{
                  top: "28.5%",
                  left: "48.5%",
                  background: "radial-gradient(ellipse, rgba(0,140,255,0.15) 0%, transparent 60%)",
                  filter: "blur(8px)",
                  animationDelay: "1.7s",
                }}
              />
            </div>

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
