import Image from "next/image";

// Asset URLs
const imgTitleIcon = "/images/open-world-title-icon.svg";
const imgCardIcon = "/images/open-world-card-icon.svg";

type CardProps = {
  imageUrl: string;
  title: string;
  description: string;
};

function Card({ imageUrl, title, description }: CardProps) {
  return (
    <div
      className="relative p-[2px] rounded-[14px] cursor-pointer group w-full max-w-[259px] mx-auto"
      style={{ background: "#2c2c2c" }}
    >
      {/* Gradient border on hover */}
      <div
        className="absolute inset-0 rounded-[14px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: "linear-gradient(180deg, #E2E2D6 0%, #160856 100%)" }}
      />

      <div className="relative h-[390px] rounded-[12px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        {/* Gradient Overlays */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "linear-gradient(180deg, rgba(10, 10, 10, 0) 81%, rgba(10, 10, 10, 0.8) 100%), linear-gradient(176deg, rgba(10, 10, 10, 0) 69%, rgb(10, 10, 10) 98%), linear-gradient(90deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.5) 100%)",
          }}
        />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6">
          <div className="flex flex-col gap-3 lg:gap-4 translate-y-6 group-hover:translate-y-0 transition-transform duration-300 ease-out">
            {/* Icon */}
            <div className="w-3 h-3 lg:w-[12px] lg:h-[12px] relative">
              <Image src={imgCardIcon} alt="" fill className="object-contain" />
            </div>

            {/* Title */}
            <h3 className="font-qindret text-[#868686] group-hover:text-[#dbdbdb] text-base sm:text-lg lg:text-xl leading-tight transition-colors duration-300">
              {title}
            </h3>
            <p className="font-caslon text-[#868686] text-xs lg:text-[13px] leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function OpenWorldSection() {
  const cardsRow1 = [
    { imageUrl: "/images/open-world-card-1.png", title: "Your Growth Defines Your Rank", description: "Your actions, training, and choices shape your progression. There are no fixed paths — power is earned, not given." },
    { imageUrl: "/images/open-world-card-2.png", title: "Every Decision Has Consequences", description: "Alliances, betrayals, wars, and sacrifices permanently affect your character and the world around you." },
    { imageUrl: "/images/open-world-card-3.png", title: "Learn Through Exploration", description: "Power comes from experience, discovery, and risk. The more you dare, the further you evolve." },
  ];

  const cardsRow2 = [
    { imageUrl: "/images/open-world-card-4.png", title: "Shape Your Role in the World", description: "Hunter, Leader, Scientist and much more. Your progression continues beyond the game through the Earth Leveling mobile app." },
    { imageUrl: "/images/open-world-card-5.png", title: "A World Without Language Barriers", description: "Local proximity chat is automatically translated in real time, allowing players from all nations to interact naturally. English remains the shared international language for voice communication between different parties." },
  ];

  const allCards = [...cardsRow1, ...cardsRow2];

  return (
    <section className="w-full py-12 lg:py-20 overflow-hidden">
      <div className="max-w-[937px] mx-auto flex flex-col gap-12 lg:gap-16">
        {/* Title Section */}
        <div className="flex flex-col items-center gap-2 px-4 sm:px-8 lg:px-16">
          {/* Main Title */}
          <div className="flex items-center gap-4 lg:gap-6">
            <div className="w-10 h-12 sm:w-12 sm:h-14 lg:w-[36px] lg:h-[40px] relative">
              <Image src={imgTitleIcon} alt="" fill className="object-contain" />
            </div>
            <h2 className="font-ghavettor text-gradient-silver text-xl sm:text-2xl lg:text-5xl text-center">
              The Largest Semi-RP UGC Open World
            </h2>
          </div>

          {/* Subtitle */}
          <span className="font-chamberi-display font-bold text-[#8c8c8c] text-xs sm:text-sm lg:text-sm tracking-[0.3em] lg:tracking-[0.4em] uppercase text-center">
            YES, YES! THE BIGGEST ONE
          </span>
        </div>

        {/* Mobile Slider */}
        <div className="sm:hidden">
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-4 pb-4 scrollbar-hide" style={{ WebkitOverflowScrolling: "touch" }}>
            {allCards.map((card, index) => (
              <div key={index} className="flex-shrink-0 w-[75vw] snap-center">
                <Card {...card} />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop/Tablet Grid */}
        <div className="hidden sm:flex flex-col gap-4 lg:gap-8 px-4 sm:px-8 lg:px-16">
          {/* Row 1 - 3 cards */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-[24px]">
            {cardsRow1.map((card, index) => (
              <Card key={index} {...card} />
            ))}
          </div>

          {/* Row 2 - 2 cards centered */}
          <div className="grid grid-cols-2 gap-4 lg:gap-[24px] max-w-[545px] mx-auto w-full">
            {cardsRow2.map((card, index) => (
              <Card key={index} {...card} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
