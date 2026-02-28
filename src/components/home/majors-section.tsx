import Image from "next/image";

type MajorCardProps = {
  title: string;
  titleImage: string;
  descriptions: string[];
  year: string;
  backgroundImage: string;
  borderColor?: string;
};

function MajorCard({ title, titleImage, descriptions, year, backgroundImage, borderColor = "#403948" }: MajorCardProps) {
  return (
    <div
      className="relative flex flex-col items-center justify-between overflow-hidden rounded-[20px] lg:rounded-[30px] p-4 sm:p-6 lg:p-8 h-[280px] sm:h-[300px] lg:h-[287px] w-full border-2"
      style={{ borderColor }}
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none rounded-[20px] lg:rounded-[30px] overflow-hidden">
        <Image
          src={backgroundImage}
          alt=""
          fill
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "linear-gradient(180deg, rgba(3, 9, 18, 0) 14%, rgb(3, 9, 18) 100%)"
          }}
        />
      </div>

      {/* Title Image */}
      <div className="relative w-full max-w-[150px] sm:max-w-[180px] lg:max-w-[202px] h-[50px] sm:h-[140px] lg:h-[181px] z-10">
        <Image
          src={titleImage}
          alt={title}
          fill
          className="object-contain"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col gap-3 lg:gap-4 items-center justify-center">
        {descriptions.map((desc, index) => (
          <div key={index} className="flex items-center justify-center w-full">
            <p className="font-caslon text-white text-center text-xs sm:text-sm lg:text-[14px] max-w-[200px] sm:max-w-[250px] lg:max-w-[250px] leading-relaxed">
              {desc}
            </p>
          </div>
        ))}

        {/* Year with lines */}
        <div className="flex gap-3 lg:gap-4 items-center justify-center w-full mt-2">
          <div className="w-12 sm:w-16 lg:w-[70px] h-px bg-linear-to-r from-transparent to-[#f0f0f0]/50" />
          <span className="font-chamberi-display font-bold text-[#f0f0f0] text-sm sm:text-base lg:text-[16px]">
            {year}
          </span>
          <div className="w-12 sm:w-16 lg:w-[70px] h-px bg-linear-to-l from-transparent to-[#f0f0f0]/50" />
        </div>
      </div>
    </div>
  );
}

export function MajorsSection() {
  const majors = [
    {
      title: "Ashes of Awakening",
      titleImage: "/images/major-title-1.svg",
      descriptions: [
        "The first Raids S-Rank Class Dungeons emerge.",
        "Death is no longer temporary. Some losses scar forever, others erase everything."
      ],
      year: "2027",
      backgroundImage: "/images/major-card-1-bg.png",
      borderColor: "#403948",
    },
    {
      title: "The Green Ascension",
      titleImage: "/images/major-title-2.svg",
      descriptions: [
        "Advanced renewable technologies emerge.",
        "Nations that master clean energy gain long-term advantages in production, defense, and sustainability."
      ],
      year: "2028",
      backgroundImage: "/images/major-card-2-bg.png",
      borderColor: "transparent",
    },
    {
      title: "Echoes of the Moon",
      titleImage: "/images/major-title-3.svg",
      descriptions: [
        "Is the Earth really alone?"
      ],
      year: "2028",
      backgroundImage: "/images/major-card-3-bg.png",
      borderColor: "#282f4b",
    },
  ];

  return (
    <section className="relative w-full pt-40 pb-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/images/majors-section-bg.png"
          alt=""
          fill
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at center, transparent 0%, rgba(3, 9, 18, 0.93) 100%)"
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1016px] mx-auto px-4 sm:px-8 lg:px-0">
        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-[38px]">
          {majors.map((major, index) => (
            <MajorCard key={index} {...major} />
          ))}
        </div>
      </div>
    </section>
  );
}
