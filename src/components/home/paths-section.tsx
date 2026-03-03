"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";

// Asset URLs
const imgVector1 = "/images/paths-vector.png";
const imgEllipse1 = "/images/paths-ellipse1.png";
const imgEllipse2 = "/images/paths-ellipse2.png";
const imgEllipse3 = "/images/paths-ellipse3.png";
const imgEllipse4 = "/images/paths-ellipse4.png";
const imgEllipse5 = "/images/paths-ellipse5.png";
const imgEllipse6 = "/images/paths-ellipse6.png";
const imgImage8 = "/images/paths-image.png";
const imgCharacterHunter = "/images/paths-character5.png";
const imgCharacterLeader = "/images/paths-character7.png";
const imgCharacterEngineer = "/images/paths-character3.png";
const imgCharacterScientist = "/images/paths-character1.png";
const imgCharacterStrategist = "/images/paths-character4.png";

export function PathsSection() {
  const t = useTranslations("Paths");
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const roles = [
    {
      image: imgEllipse1,
      characterImage: imgCharacterHunter,
      name: t("hunterName"),
      tagline: t("hunterTagline"),
      descriptions: [t("hunterDesc1"), t("hunterDesc2")],
    },
    {
      image: imgEllipse2,
      characterImage: imgCharacterScientist,
      name: t("scientistName"),
      tagline: t("scientistTagline"),
      descriptions: [t("scientistDesc1"), t("scientistDesc2")],
    },
    {
      image: imgEllipse3,
      characterImage: imgCharacterEngineer,
      name: t("engineerName"),
      tagline: t("engineerTagline"),
      descriptions: [t("engineerDesc1"), t("engineerDesc2")],
    },
    {
      image: imgEllipse4,
      characterImage: imgCharacterLeader,
      name: t("leaderName"),
      tagline: t("leaderTagline"),
      descriptions: [t("leaderDesc1"), t("leaderDesc2")],
    },
    {
      image: imgEllipse5,
      characterImage: imgCharacterStrategist,
      name: t("strategistName"),
      tagline: t("strategistTagline"),
      descriptions: [t("strategistDesc1"), t("strategistDesc2")],
    },
    {
      image: imgEllipse6,
      name: t("mysteryName"),
      tagline: t("mysteryTagline"),
      descriptions: [t("mysteryDesc")],
      isMystery: true,
    },
  ];

  const activeRole = activeIndex !== null ? roles[activeIndex] : null;

  return (
    <section className="w-full py-12 lg:py-24 px-4 sm:px-8 lg:px-16 overflow-hidden">
      <div className="max-w-[870px] mx-auto flex flex-col items-center gap-8 lg:gap-12">
        {/* Title */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-3 lg:gap-4">
            <div className="w-8 h-8 lg:w-[41px] lg:h-[47px] relative hidden sm:block">
              <Image src={imgVector1} alt="" fill className="object-contain" />
            </div>
            <h2 className="font-ghavettor text-gradient-silver text-2xl sm:text-3xl lg:text-5xl text-center">
              {t("title")}
            </h2>
          </div>
          <span className="font-chamberi-display font-bold text-[#8c8c8c] text-xs sm:text-sm lg:text-base tracking-[0.3em] uppercase">
            {t("subtitle")}
          </span>
        </div>

        {/* Subtitle with lines */}
        <div className="flex items-center gap-3 lg:gap-6">
          <div className="w-10 sm:w-14 lg:w-[74px] h-px bg-linear-to-r from-transparent to-[#f0f0f0]" />
          <span className="font-caslon text-[#f0f0f0] text-xs sm:text-sm lg:text-sm tracking-wider text-center">
            {t("note")}
          </span>
          <div className="w-10 sm:w-14 lg:w-[74px] h-px bg-linear-to-l from-transparent to-[#f0f0f0]" />
        </div>

        {/* Character Avatars */}
        <div className="flex flex-wrap items-center justify-center gap-3 lg:gap-[25px]">
          {roles.map((role, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(activeIndex === index ? null : index)}
              className={`relative w-12 h-14 sm:w-16 sm:h-20 lg:w-[91px] lg:h-[119px] cursor-pointer transition-all duration-300 ${activeIndex === index
                ? "scale-110"
                : activeIndex !== null
                  ? "opacity-40 hover:opacity-80"
                  : "hover:scale-105"
                }`}
            >
              {/* Gradient border ring for active avatar */}
              {activeIndex === index && (
                <div
                  className="absolute -inset-[1.5px] rounded-full pointer-events-none z-0"
                  style={{
                    background: "linear-gradient(180deg, #E2E2D6 0%, #160856 100%)",
                  }}
                />
              )}
              <Image
                src={role.image}
                alt={role.name}
                fill
                className="object-contain relative z-10"
              />
              {"isMystery" in role && role.isMystery && (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <span className="font-qindret text-[#787878] text-2xl lg:text-4xl">?</span>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Role Description - animated reveal */}
        <div
          className={`w-full overflow-hidden transition-all duration-500 ease-out ${activeRole ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
            }`}
        >
          {activeRole && (
            <div key={activeIndex} className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12 pt-4 animate-[fadeInUp_0.4s_ease-out]">
              {/* Text Content */}
              <div className="flex flex-col gap-3 flex-1 pt-8 lg:pt-20">
                <span className="font-chamberi-display font-bold text-[#8c8c8c] text-xs lg:text-sm tracking-wider uppercase animate-[fadeInUp_0.4s_ease-out]">
                  {activeRole.tagline}
                </span>
                <h3 className="font-qindret text-[#f0f0f0] max-w-[420px] text-2xl sm:text-3xl md:text-4xl lg:text-6xl animate-[fadeInUp_0.4s_ease-out_0.05s_both]">
                  {activeRole.name}
                </h3>
                <div className="flex flex-col gap-2 max-w-[420px]">
                  {activeRole.descriptions.map((desc, i) => (
                    <p
                      key={i}
                      className="font-caslon text-[#dbdbdb] text-sm lg:text-base leading-relaxed animate-[fadeInUp_0.4s_ease-out_both]"
                      style={{ animationDelay: `${0.1 + i * 0.05}s` }}
                    >
                      {desc}
                    </p>
                  ))}
                </div>
              </div>

              {/* Right - Character Image */}
              {(("characterImage" in activeRole && activeRole.characterImage) || ("isMystery" in activeRole && activeRole.isMystery)) && (
                <div className="flex-1 flex justify-center lg:justify-center lg:-ml-50 animate-[fadeInUp_0.4s_ease-out_0.15s_both]">
                  <div className="relative w-[351px] h-[478px] max-w-xs lg:max-w-4xl">
                    <Image
                      src={("characterImage" in activeRole && activeRole.characterImage) || imgImage8}
                      alt={activeRole.name}
                      fill
                      className="object-cover"
                    />
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(0deg, #030912 20%, rgba(3, 9, 18, 0.00) 75%)",
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
