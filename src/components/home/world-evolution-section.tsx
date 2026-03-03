"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";

// Asset URLs
const imgVector = "/images/world-evolution-icon.svg";
const imgBg = "/images/world-evo-bg.png";
const imgCard = "/images/world-evo-card.png";
const imgIcon1 = "/images/world-evo-icon-1.svg";
const imgIcon2 = "/images/world-evo-icon-2.svg";
const imgIcon3 = "/images/world-evo-icon-3.svg";

type FeatureItemProps = {
  icon: string;
  text: string;
  description: string;
  isActive?: boolean;
  onClick?: () => void;
};

function FeatureItem({ icon, text, isActive = false, onClick }: FeatureItemProps) {
  return (
    <div onClick={onClick} className="relative p-[2px] rounded-l-full cursor-pointer" style={{ background: isActive ? "linear-gradient(180deg, #E2E2D6 0%, #160856 100%)" : "#2c2c2c" }}>
      {/* Gradient border when active */}
      {isActive && (
        <div
          className="absolute inset-0 rounded-l-full"
          style={{ background: "linear-gradient(180deg, #E2E2D6 0%, #160856 100%)" }}
        />
      )}
      <div
        className="relative flex items-center gap-4 lg:gap-[13px] h-[44px] sm:h-[50px] lg:h-[45px] px-6 lg:px-[25px] rounded-l-full overflow-hidden transition-all duration-300"
      >
        {/* Background */}
        <div className={`absolute inset-0 rounded-l-full transition-all duration-300 ${isActive ? "bg-linear-to-r from-[#123161] to-[#06162f]" : "bg-linear-to-r from-[#0a1a30] to-[#060e1c]"}`} />
        <div className={`absolute inset-0 rounded-l-full overflow-hidden mix-blend-luminosity transition-opacity duration-300 ${isActive ? "opacity-40" : "opacity-20"}`}>
          <Image src={imgBg} alt="" fill className="object-cover" />
        </div>

        {/* Content */}
        <div className="relative w-4 h-4 lg:w-[12px] lg:h-[12px] shrink-0 z-10">
          <Image src={icon} alt="" fill className="object-contain" />
        </div>
        <span
          className={`relative z-10 font-caslon text-xs lg:text-[13px] transition-colors duration-300 ${isActive ? "text-[#dbdbdb]" : "text-[#b0b0b0]"}`}
        >
          {text}
        </span>
      </div>
    </div>
  );
}

export function WorldEvolutionSection() {
  const t = useTranslations("WorldEvolution");
  const [activeIndex, setActiveIndex] = useState(0);

  const features = [
    { icon: imgIcon1, text: t("feature1"), description: t("feature1Desc"), cardImage: "/images/preorder-bg.png" },
    { icon: imgIcon2, text: t("feature2"), description: t("feature2Desc"), cardImage: "/images/Multi paths one world.png" },
    { icon: imgIcon3, text: t("feature3"), description: t("feature3Desc"), cardImage: "/images/Guild nations-influence.png" },
    { icon: imgIcon3, text: t("feature4"), description: t("feature4Desc"), cardImage: imgCard },
    { icon: imgIcon3, text: t("feature5"), description: t("feature5Desc"), cardImage: "/images/Evolving Systems-World Events.png" },
  ];

  return (
    <section className="w-full py-12 lg:py-20 px-4 sm:px-8 lg:px-16 overflow-hidden">
      <div className="max-w-[914px] mx-auto flex flex-col gap-10 lg:gap-[64px]">
        {/* Title */}
        <div className="flex flex-col items-center gap-2">
          <span className="font-chamberi-display font-bold text-[#8c8c8c] text-xs sm:text-sm lg:text-base tracking-[0.4em] uppercase">
            {t("sectionLabel")}
          </span>
          <div className="flex items-center gap-4 lg:gap-[18px]">
            <div className="w-8 h-10 sm:w-10 sm:h-12 lg:w-[30px] lg:h-[40px] relative">
              <Image src={imgVector} alt="" fill className="object-contain" />
            </div>
            <h2 className="font-ghavettor text-gradient-silver text-3xl sm:text-4xl lg:text-5xl text-center">
              {t("title")}
            </h2>
          </div>
        </div>

        {/* Content - left features / right image */}
        <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-0">
          {/* Feature List */}
          <div className="flex flex-col shrink-0 gap-3 lg:gap-0 lg:justify-between lg:w-[360px] lg:h-[271px]">
            {features.map((feature, index) => (
              <FeatureItem
                key={index}
                {...feature}
                isActive={index === activeIndex}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>

          {/* Main Image Card */}
          <div className="relative w-full lg:w-[551px] h-[250px] sm:h-[300px] lg:h-[340px] p-[2px] rounded-2xl lg:rounded-[8px] shadow-[2px_1px_54px_0px_rgba(10,10,10,0.8)]" style={{ background: "linear-gradient(180deg, #E2E2D6 0%, #160856 100%)" }}>
            <div className="relative w-full h-full rounded-[14px] lg:rounded-[7px] overflow-hidden group">
              {/* Background gradient */}
              <div
                className="absolute inset-0"
                style={{
                  background: "radial-gradient(ellipse at center, rgba(44,2,67,1) 0%, rgba(31,1,48,1) 50%, rgba(18,0,28,1) 100%)",
                }}
              />

              {/* Image */}
              <div className="absolute inset-0">
                <Image
                  key={activeIndex}
                  src={features[activeIndex].cardImage}
                  alt=""
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105 animate-[fadeIn_0.3s_ease-out]"
                />
              </div>

              {/* Gradient overlay */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: "linear-gradient(180deg, rgba(10, 10, 10, 0) 50%, rgb(10, 10, 10) 100%), linear-gradient(178deg, rgba(10, 10, 10, 0) 74%, rgb(10, 10, 10) 100%)",
                }}
              />

              {/* Text - limited width */}
              <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-[18px]">
                <p key={activeIndex} className="font-caslon text-[#dbdbdb] text-xs lg:text-[14.5px] leading-relaxed max-w-[322px] animate-[fadeInUp_0.3s_ease-out]">
                  {features[activeIndex].description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
