import Image from "next/image";
import Link from "next/link";
import { ButtonEL } from "@/components/ui/button-el";

type NewsCardProps = {
  title: string;
  date: string;
  imageUrl: string;
};

function NewsCard({ title, date, imageUrl }: NewsCardProps) {
  return (
    <div className="flex flex-col gap-4 lg:gap-[12px] w-full group cursor-pointer">
      {/* Image with gradient border hover */}
      <div className="relative h-[160px] sm:h-[170px] lg:h-[185px] rounded-[10px] p-[2px]" style={{ background: "#2c2c2c" }}>
        {/* Gradient border on hover */}
        <div
          className="absolute inset-0 rounded-[10px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: "linear-gradient(180deg, #E2E2D6 0%, #160856 100%)" }}
        />
        <div className="relative w-full h-full rounded-[8px] overflow-hidden">
          <div className="absolute inset-0 bg-[#0f0b22]" />
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover opacity-80 transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          <div className="absolute inset-0 bg-[rgba(10,10,10,0.5)] group-hover:bg-[rgba(10,10,10,0.3)] transition-colors duration-300" />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-[3px]">
        <h3 className="font-qindret text-[#e6e6e6] text-base sm:text-lg lg:text-[17px] leading-normal line-clamp-2 group-hover:text-[#C29FFF] transition-colors">
          {title}
        </h3>
        <span className="font-chamberi-display font-bold text-[#e6e6e6] text-sm lg:text-[13px]">
          {date}
        </span>
      </div>
    </div>
  );
}

export function NewsSection() {
  const newsItems = [
    {
      title: "Earth Leveling — A New Era of Semi-RP Simulation Begins",
      date: "01/02/2026",
      imageUrl: "/images/preorder-bg.png",
    },
    {
      title: "The First Gates Have Been Detected — Hunters, Prepare Yourselves",
      date: "15/01/2026",
      imageUrl: "/images/preorder-bg.png",
    },
    {
      title: "Nations Rise: How Guilds Will Shape the World's Political Landscape",
      date: "10/01/2026",
      imageUrl: "/images/preorder-bg.png",
    },
  ];

  return (
    <section className="w-full ">
      <div className="max-w-[1070px] mx-auto px-6 lg:px-0">
        {/* Header */}
        <div className="flex flex-row items-center justify-between gap-4 mb-8 lg:mb-[30px]">
          <h2 className="font-ghavettor text-[#f0f0f0] text-4xl sm:text-5xl lg:text-[56px] leading-none">
            News
          </h2>

          {/* CTA Button */}
          <Link href="/news">
            <ButtonEL size="md">OUR NEWS</ButtonEL>
          </Link>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-[31px]">
          {newsItems.map((item, index) => (
            <NewsCard key={index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
