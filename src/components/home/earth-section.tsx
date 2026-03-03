import Image from "next/image";
import { getTranslations } from "next-intl/server";

// Asset URLs
const imgVector = "/images/earth-vector.png";
const imgWorld1 = "/images/earth-world.png";

export async function EarthSection() {
  const t = await getTranslations("Earth");

  return (
    <section className="w-full py-12 lg:py-24 px-4 sm:px-8 lg:px-16 overflow-hidden">
      <div className="max-w-[814px] mx-auto flex flex-col items-center gap-8 lg:gap-12">
        {/* Title */}
        <div className="flex flex-col items-center gap-2">
          <span className="font-chamberi-display font-bold text-[#8c8c8c] text-xs sm:text-sm lg:text-base tracking-[0.3em] uppercase">
            {t("sectionLabel")}
          </span>
          <div className="flex items-center gap-3 lg:gap-4">
            <div className="w-10 h-10 lg:w-[47px] lg:h-[40px] relative hidden sm:block">
              <Image src={imgVector} alt="" fill className="object-contain" />
            </div>
            <h2 className="font-ghavettor text-gradient-silver text-3xl sm:text-4xl lg:text-5xl text-center">
              {t("title")}
            </h2>
          </div>
        </div>

        {/* Subtitle with lines */}
        <div className="flex items-center gap-3 lg:gap-4">
          <div className="w-12 sm:w-16 lg:w-[74px] h-px bg-gradient-to-r from-transparent to-[#f0f0f0]" />
          <span className="font-caslon text-[#f0f0f0] text-xs sm:text-sm lg:text-sm tracking-wider text-center">
            {t("subtitle")}
          </span>
          <div className="w-12 sm:w-16 lg:w-[74px] h-px bg-gradient-to-l from-transparent to-[#f0f0f0]" />
        </div>

        {/* World Map */}
        <div className="relative w-full max-w-4xl aspect-[2/1]">
          <Image
            src={imgWorld1}
            alt="World Map"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}
