import Image from "next/image";

const imgCharacter = "/images/character-hero1.png";

export function CharactersSection() {
  return (
    <section className="w-full pt-16 lg:pt-28 pb-12 lg:pb-24 px-4 sm:px-8 lg:px-16 overflow-hidden">
      <div className="max-w-[870px] mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
        {/* Text Content */}
        <div className="flex flex-col gap-4 lg:gap-6 flex-1">
          {/* Title */}
          <div className="flex flex-col">
            <h2 className="font-ghavettor text-gradient-silver text-3xl sm:text-4xl lg:text-6xl leading-[1.1]">
              The world&apos;s largest
            </h2>
            <h2 className="font-ghavettor text-gradient-silver text-3xl sm:text-4xl lg:text-6xl leading-[1.1]">
              Semi-RP simulation.
            </h2>
          </div>

          {/* Subtitle */}
          <div className="flex flex-col">
            <p className="font-ghavettor text-gradient-silver text-2xl sm:text-3xl lg:text-5xl leading-[1.1]">
              One world. One server.
            </p>
            <p className="font-ghavettor text-gradient-silver text-2xl sm:text-3xl lg:text-5xl leading-[1.1]">
              One shared history.
            </p>
          </div>

          {/* Description paragraphs */}
          <div className="flex flex-col gap-3 lg:gap-4 max-w-[335px]">
            <p className="font-caslon text-[#dbdbdb] text-lg sm:text-xl lg:text-lg">
              Earth Leveling is a unique world, shared by all players, inspired by Solo Leveling.
            </p>
            <p className="font-caslon text-[#dbdbdb] text-lg sm:text-xl lg:text-lg">
              Nations rise, guilds dominate, and players shape history through wars, alliances, and conquest.
            </p>
            <p className="font-caslon text-[#dbdbdb] text-lg sm:text-xl lg:text-lg">
              Explore a Earth transformed by portals, where power is earned through effort, strategy, and influence, in a persistent experience blending action, progression, and political stakes.
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
