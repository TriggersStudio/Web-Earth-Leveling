"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";

const editionVariants = {
  STANDARD: {
    gradient: "linear-gradient(180deg, #123161 0%, #041126 100%)",
    textureOpacity: { default: 0.15, active: 0.2 },
    overlays: [] as string[],
  },
  HUNTER: {
    gradient: "linear-gradient(180deg, #ad60ff 0%, #2d0557 100%)",
    textureOpacity: { default: 0.6, active: 0.7 },
    overlays: [
      "radial-gradient(62% 165% at 138% -94%, rgba(5,105,255,1), rgba(5,105,255,0))",
      "radial-gradient(69% 238% at -21% 217%, rgba(234,5,255,1), rgba(234,5,255,0))",
      "radial-gradient(69% 235% at 79% 275%, rgba(255,255,255,1), rgba(255,255,255,0))",
    ],
  },
  NATION: {
    gradient: "linear-gradient(180deg, #e495e5 0%, #482848 100%)",
    textureOpacity: { default: 0.15, active: 0.2 },
    overlays: [
      "radial-gradient(104% 295% at 158% -206%, rgba(255,236,29,1), rgba(255,236,29,0))",
      "radial-gradient(99% 340% at -40% 284%, rgba(255,5,9,1), rgba(255,5,9,0))",
      "radial-gradient(70% 239% at 79% 275%, rgba(255,255,255,1), rgba(255,255,255,0))",
    ],
  },
  MONARCH: {
    gradient: "linear-gradient(180deg, #e2e2d6 12%, #160856 123%)",
    textureOpacity: { default: 0.2, active: 0.3 },
    overlays: [
      "radial-gradient(31% 70% at 12% 19%, rgba(55,4,94,1), rgba(55,4,94,0))",
      "radial-gradient(60% 79% at 53% 11%, rgba(55,4,94,1), rgba(55,4,94,0))",
      "radial-gradient(24% 61% at 28% 3%, rgba(46,39,255,1), rgba(46,39,255,0))",
      "radial-gradient(32% 78% at 93% -8%, rgba(5,105,255,1), rgba(5,105,255,0))",
    ],
  },
} as const;

type EditionVariant = keyof typeof editionVariants;

type EditionButtonProps = {
  label: string;
  variant: EditionVariant;
  isActive?: boolean;
  onClick?: () => void;
};

function EditionButton({ label, variant, isActive = false, onClick }: EditionButtonProps) {
  const config = editionVariants[variant];

  return (
    <div
      className="relative p-[2px] rounded-full transition-all duration-300 group cursor-pointer"
      style={{
        background: isActive
          ? "linear-gradient(180deg, #E2E2D6 0%, #160856 100%)"
          : "#2c2c2c",
      }}
      onClick={onClick}
    >
      {/* Gradient border on hover */}
      <div
        className={`absolute inset-0 rounded-full transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
        style={{ background: "linear-gradient(180deg, #E2E2D6 0%, #160856 100%)" }}
      />

      <button
        className="relative flex items-center justify-center h-[35px] sm:h-[40px] lg:h-[36px] px-5 sm:px-6 lg:px-8 rounded-full overflow-hidden transition-all duration-300"
      >
        {/* Default background */}
        <div
          className={`absolute inset-0 rounded-full transition-opacity duration-300 ${isActive ? "opacity-0" : "opacity-100 group-hover:opacity-0"}`}
          style={{ background: "#061326" }}
        />
        {/* Hover/Active gradient background */}
        <div
          className={`absolute inset-0 rounded-full transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
          style={{ background: config.gradient }}
        />
        {/* Radial color overlays (hover/active only) */}
        {config.overlays.map((overlay, i) => (
          <div
            key={i}
            className={`absolute inset-0 rounded-full transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
            style={{ background: overlay, mixBlendMode: "plus-lighter" }}
          />
        ))}
        {/* Texture overlay */}
        <div
          className="absolute inset-0 rounded-full overflow-hidden mix-blend-luminosity"
          style={{ opacity: isActive ? config.textureOpacity.active : config.textureOpacity.default }}
        >
          <Image
            src="/images/button-texture.png"
            alt=""
            fill
            className="object-cover scale-150 -translate-y-1/4"
          />
        </div>

        <span className={`font-chamberi-headline relative z-10 text-xs sm:text-sm lg:text-base transition-colors duration-300 ${isActive ? "text-[#f0f0f0]" : "text-[#868686] group-hover:text-[#f0f0f0]"}`}>
          {label}
        </span>
      </button>
    </div>
  );
}

export function EditionsSection() {
  const t = useTranslations("Editions");
  const [selectedEdition, setSelectedEdition] = useState<EditionVariant>("STANDARD");

  const editionCards: Record<EditionVariant, {
    title: string;
    features: string[];
    borderColor: string;
    previewImage: string;
  }> = {
    STANDARD: {
      title: t("standard"),
      features: [t("soon")],
      borderColor: "#385989",
      previewImage: "/images/edition-card-preview.png",
    },
    HUNTER: {
      title: t("hunter"),
      features: [t("soon")],
      borderColor: "#385989",
      previewImage: "/images/edition-card-preview.png",
    },
    NATION: {
      title: t("nation"),
      features: [t("soon")],
      borderColor: "#385989",
      previewImage: "/images/edition-card-preview.png",
    },
    MONARCH: {
      title: t("monarch"),
      features: [t("soon")],
      borderColor: "#385989",
      previewImage: "/images/edition-card-preview.png",
    },
  };

  const currentCard = editionCards[selectedEdition];

  return (
    <section className="relative w-full py-16 lg:py-24 px-4 sm:px-8 lg:px-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/images/editions-section-bg.png"
          alt=""
          fill
          className="object-cover opacity-75"
        />
        <div className="absolute inset-0 opacity-50 overflow-hidden">
          <Image
            src="/images/editions-hunter-bg.png"
            alt=""
            fill
            className="object-cover"
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at center, rgba(3, 9, 18, 0) 0%, rgba(3, 9, 18, 0.93) 100%)"
          }}
        />
      </div>

      <div className="relative z-10 max-w-[818px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
          {/* Left Side */}
          <div className="flex flex-col gap-8 lg:gap-12 items-center lg:items-start flex-1">
            {/* Title and Buttons */}
            <div className="flex flex-col gap-6 items-center lg:items-start">
              {/* Titles */}
              <div className="flex flex-col items-center lg:items-start">
                <p className="font-chamberi-display font-bold text-[#808080] text-sm sm:text-base lg:text-lg text-center lg:text-left leading-tight">
                  {t("selectEdition")}
                </p>
                <p className="font-chamberi-display font-bold text-[#f0f0f0] text-lg sm:text-xl lg:text-2xl text-center lg:text-left leading-tight">
                  {t("preOrder")}
                </p>
              </div>

              {/* Edition Buttons Grid */}
              <div className="flex flex-col gap-3 w-full max-w-md">
                <div className="flex gap-3">
                  <div className="relative">
                    <EditionButton
                      label="STANDARD"
                      variant="STANDARD"
                      isActive={selectedEdition === "STANDARD"}
                      onClick={() => setSelectedEdition("STANDARD")}
                    />
                    <div className="absolute -top-2 -right-2 bg-emerald-500/90 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full leading-none tracking-wider shadow-lg">
                      {t("free")}
                    </div>
                  </div>
                  <EditionButton
                    label="HUNTER"
                    variant="HUNTER"
                    isActive={selectedEdition === "HUNTER"}
                    onClick={() => setSelectedEdition("HUNTER")}
                  />
                </div>
                <div className="flex gap-3">
                  <EditionButton
                    label="NATION"
                    variant="NATION"
                    isActive={selectedEdition === "NATION"}
                    onClick={() => setSelectedEdition("NATION")}
                  />
                  <EditionButton
                    label="MONARCH"
                    variant="MONARCH"
                    isActive={selectedEdition === "MONARCH"}
                    onClick={() => setSelectedEdition("MONARCH")}
                  />
                </div>
              </div>
            </div>

            {/* Coming Soon Section */}
            <div className="flex flex-col gap-4 items-center w-full">
              <p className="font-chamberi-display font-bold text-[#f0f0f0] text-base sm:text-lg lg:text-xl text-center lg:text-left leading-tight">
                {t("comingSoonOn")}
              </p>
              <div className="relative w-[124px] sm:w-[160px] lg:w-[124px] h-[63px] sm:h-[80px] lg:h-[63px]" style={{ filter: "drop-shadow(0px 0px 100px rgba(0,0,0,0.6))" }}>
                <Image
                  src="/images/hytale-logo.png"
                  alt="Hytale"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          {/* Right Side - Edition Card */}
          <div
            className="rounded-[16.7px] p-[22px] flex flex-col gap-[18px] items-center w-full max-w-md lg:max-w-lg overflow-hidden transition-all duration-500"
            style={{
              background: "linear-gradient(to bottom, #051a38, #031022)",
              borderWidth: "0.7px",
              borderStyle: "solid",
              borderColor: currentCard.borderColor,
            }}
          >
            {/* Preview Image */}
            <div className="relative w-full h-[150px] sm:h-[200px] lg:h-[235px] rounded-[8.4px] overflow-hidden" style={{ borderWidth: "0.67px", borderStyle: "solid", borderColor: "white" }}>
              <Image
                src={currentCard.previewImage}
                alt={`${currentCard.title} Preview`}
                fill
                className="object-cover transition-opacity duration-300"
              />
            </div>

            {/* Features */}
            <div className="flex flex-col gap-[13px] w-full">
              {/* Title */}
              <div className="flex gap-[10px] items-center">
                <div className="relative w-[15px] h-[15px] shrink-0">
                  <Image
                    src="/images/edition-diamond.svg"
                    alt=""
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="font-chamberi-display font-bold text-[#f0f0f0] text-[21px] transition-all duration-300">
                  {currentCard.title}
                </p>
              </div>

              {/* Features List */}
              <div className="flex flex-col justify-between flex-1 gap-2" key={selectedEdition}>
                {currentCard.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex gap-[10px] items-center animate-[fadeInUp_0.3s_ease-out_both]"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="relative w-[10px] h-[10px] shrink-0">
                      <Image
                        src="/images/edition-checkmark.svg"
                        alt=""
                        fill
                        className="object-contain"
                      />
                    </div>
                    <p className="font-caslon text-[#cacaca] text-[15px]">
                      {feature}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
