import Image from "next/image";
import { getTranslations } from "next-intl/server";

export async function MajorsHeader() {
  const t = await getTranslations("Majors");

  return (
    <section className="relative w-full px-4 sm:px-8 lg:px-16">
      <div className="relative max-w-[622px] mx-auto">
        {/* Diamond icon at top center */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 lg:w-[29px] lg:h-[29px]">
          <Image
            src="/images/majors-diamond.svg"
            alt=""
            fill
            className="object-contain"
          />
        </div>

        {/* Frame border - stretches to fit content */}
        <svg
          className="absolute -inset-[1px] pointer-events-none"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 1 100 L 0 92 L 0 15 L 2 0 L 48 0 M 52 0 L 98 0 L 100 15 L 100 92 L 99 100 L 1 100"
            stroke="#243d66"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-2 lg:gap-3 pt-8 sm:pt-10 lg:pt-12 pb-5 sm:pb-6 lg:pb-8 px-4">
          {/* Title with lines */}
          <div className="flex items-center gap-3 lg:gap-6">
            <div className="w-12 sm:w-20 lg:w-[77px] h-px bg-gradient-to-r from-transparent to-[#f0f0f0]/40" />
            <h2 className="font-ghavettor text-[#f0f0f0] text-2xl sm:text-3xl lg:text-4xl text-center whitespace-nowrap">
              {t("title")}
            </h2>
            <div className="w-12 sm:w-20 lg:w-[77px] h-px bg-gradient-to-l from-transparent to-[#f0f0f0]/40" />
          </div>

          {/* Subtitle */}
          <p className="font-chamberi-display font-bold text-[#848484] text-[9px] sm:text-[10px] lg:text-xs text-center tracking-[0.15em] uppercase max-w-3xl">
            {t("subtitle")}
          </p>
        </div>
      </div>
    </section>
  );
}
