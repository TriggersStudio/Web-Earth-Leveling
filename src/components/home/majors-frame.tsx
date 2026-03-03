import Image from "next/image";
import { getTranslations } from "next-intl/server";

export async function MajorsFrame() {
  const t = await getTranslations("Majors");

  return (
    <div className="relative w-full sm:px-8 lg:px-16">
      <div
        className="relative max-w-[620px] mx-auto"
        style={{ aspectRatio: "620 / 148" }}
      >
        {/* Frame SVG (includes border, gradients, and diamond) */}
        <Image
          src="/images/majors-frame.svg"
          alt=""
          fill
          className="object-cover md:object-contain pointer-events-none"
        />

        {/* Content centered inside frame */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-0">
          {/* Title with lines */}
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="w-6 sm:w-12 lg:w-20 h-px bg-linear-to-r from-transparent to-[#f0f0f0]/40" />
            <h2 className="font-ghavettor text-gradient-silver text-base sm:text-xl lg:text-[40px] text-center">
              {t("title")}
            </h2>
            <div className="w-6 sm:w-12 lg:w-20 h-px bg-linear-to-l from-transparent to-[#f0f0f0]/40" />
          </div>

          {/* Subtitle */}
          <p className="font-chamberi-display font-bold text-[#848484] text-[6px] sm:text-[8px] lg:text-[12px] text-center tracking-wide uppercase whitespace-nowrap">
            {t("subtitle")}
          </p>
        </div>
      </div>
    </div>
  );
}
