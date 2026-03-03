import Image from "next/image";
import { getTranslations } from "next-intl/server";

const imgCharacter = "/images/character-hero1.png";

export async function CharactersSection() {
  const t = await getTranslations("Characters");

  return (
    <section className="w-full pt-16 lg:pt-28 pb-12 lg:pb-24 px-4 sm:px-8 lg:px-16 overflow-hidden">
      <div className="max-w-[870px] mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
        {/* Text Content */}
        <div className="flex flex-col gap-4 lg:gap-6 flex-1">
          {/* Title */}
          <div className="flex flex-col">
            <h2 className="font-ghavettor text-gradient-silver text-3xl sm:text-4xl lg:text-6xl leading-[1.1]">
              {t("title1")}
            </h2>
            <h2 className="font-ghavettor text-gradient-silver text-3xl sm:text-4xl lg:text-6xl leading-[1.1]">
              {t("title2")}
            </h2>
          </div>

          {/* Subtitle */}
          <div className="flex flex-col">
            <p className="font-ghavettor text-gradient-silver text-2xl sm:text-3xl lg:text-5xl leading-[1.1]">
              {t("subtitle1")}
            </p>
            <p className="font-ghavettor text-gradient-silver text-2xl sm:text-3xl lg:text-5xl leading-[1.1]">
              {t("subtitle2")}
            </p>
          </div>

          {/* Description paragraphs */}
          <div className="flex flex-col gap-3 lg:gap-4 max-w-[335px]">
            <p className="font-caslon text-[#dbdbdb] text-lg sm:text-xl lg:text-lg">
              {t("desc1")}
            </p>
            <p className="font-caslon text-[#dbdbdb] text-lg sm:text-xl lg:text-lg">
              {t("desc2")}
            </p>
            <p className="font-caslon text-[#dbdbdb] text-lg sm:text-xl lg:text-lg">
              {t("desc3")}
            </p>
          </div>
        </div>

        <div className="flex-1 flex justify-center lg:justify-end overflow-visible">
          <div
            className="relative w-full aspect-3/4">
            <Image
              src={imgCharacter}
              alt="Character"
              fill
              className="object-cover object-top scale-[1.75]"
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "linear-gradient(0deg, #030912 20%, rgba(3, 9, 18, 0.00) 75%)",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
