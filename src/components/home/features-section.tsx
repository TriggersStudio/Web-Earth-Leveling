import Image from "next/image";

type FeatureCardProps = {
  title: string[];
  description: string;
  imageUrl: string;
};

function FeatureCard({ title, description, imageUrl }: FeatureCardProps) {
  return (
    <div className="flex flex-col items-center gap-4 group cursor-pointer">
      {/* Shield Image with Title overlay */}
      <div className="relative w-52 h-60 sm:w-60 sm:h-72 lg:w-[277px] lg:h-[313px] transition-transform duration-300 group-hover:scale-105">
        <Image
          src={imageUrl}
          alt={title.join(' ')}
          fill
          className="object-contain"
        />
        {/* Gradient overlay from bottom to top */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to top, rgba(3, 9, 18, 0.9) 0%, rgba(3, 9, 18, 0.5) 30%, transparent 60%)'
          }}
        />
        {/* Title - positioned at bottom of image */}
        <div className="absolute bottom-6 sm:bottom-8 lg:bottom-10 left-0 right-0 flex flex-col items-center z-10">
          {title.map((line, index) => (
            <h3
              key={index}
              className="font-chamberi-display font-extrabold text-[#dbdbdb] text-base sm:text-lg lg:text-xl xl:text-2xl text-center uppercase leading-tight"
            >
              {line}
            </h3>
          ))}
        </div>
      </div>

      {/* Description */}
      <p className="font-caslon text-[#dbdbdb] text-xs sm:text-sm lg:text-sm text-center max-w-[247px] leading-relaxed">
        {description}
      </p>
    </div>
  );
}

export function FeaturesSection() {
  const featuresRow1 = [
    {
      title: ["LIVING,", "EVOLVING LORE"],
      description: "Every action matters. Player decisions, wars, alliances, and discoveries permanently shape the world and its history.",
      imageUrl: "/images/feature-1.png",
    },
    {
      title: ["GUILDS &", "NATIONS AT WAR"],
      description: "Join or build powerful guilds, serve your nation, conquer territories, and influence global balance through diplomacy or conflict.",
      imageUrl: "/images/feature-2.png",
    },
    {
      title: ["CHOOSE", "YOUR PATH"],
      description: "Become a Hunter, a Nation Leader, a Scientist, or a strategist in the shadows. Each role offers unique gameplay and impact.",
      imageUrl: "/images/feature-3.png",
    },
  ];

  const featuresRow2 = [
    {
      title: ["YOUR REAL", "WORLD LEVELING", "APP"],
      description: "Train like a Hunter. Earth Leveling features its own Solo Leveling–inspired training app to track progression, challenges, and personal growth beyond the game.",
      imageUrl: "/images/feature-4.png",
    },
    {
      title: ["AND MUCH MORE", "TO DISCOVER"],
      description: "Hidden systems, world events, secrets, and evolving mechanics await those who push beyond the limits.",
      imageUrl: "/images/feature-5.png",
    },
  ];

  return (
    <section className="w-full py-16 sm:px-8 lg:px-16 overflow-hidden">
      <div className="max-w-[870px] mx-auto flex flex-col items-center gap-12 lg:gap-16 mb-24">
        {/* Title */}
        <div className="flex flex-col items-center gap-4">
          <span className="font-chamberi-display font-bold text-[#8c8c8c] text-sm sm:text-base lg:text-lg tracking-[0.4em] uppercase">
            EARTH LEVELING
          </span>
          <div className="flex items-center gap-4 lg:gap-6">
            <div className="w-10 h-10 lg:w-[45px] lg:h-[40px] relative hidden sm:block">
              <Image
                src="/images/features-icon.png"
                alt=""
                fill
                className="object-contain"
              />
            </div>
            <h2 className="font-ghavettor text-[#f0f0f0] text-3xl sm:text-4xl lg:text-5xl text-center">
              A living World to Conquer
            </h2>
          </div>
        </div>

        {/* Features Row 1 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-[19px] w-full justify-items-center">
          {featuresRow1.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>

        {/* Features Row 2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-[19px] max-w-[573px] mx-auto justify-items-center">
          {featuresRow2.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
