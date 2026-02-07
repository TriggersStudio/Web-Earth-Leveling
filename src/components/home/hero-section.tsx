import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative flex-1 flex flex-col items-center justify-center lg:justify-end lg:pb-20">
      {/* Content - positioned at the bottom */}
      <div className="relative z-10 flex flex-col items-center justify-end text-center px-4 ">
        {/* Main Title */}
        <h1 className="font-ghavettor text-[#dbdbdb] text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-none">
          Earth Leveling
        </h1>

        {/* Subtitle */}
        <p className="font-caslon text-[#dbdbdb] text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] mt-2">
          THE ULTIMATE SEMI-RP EARTH SIMULATION
        </p>

        {/* Coming Soon Section */}
        <div className="mt-6 sm:mt-8 lg:mt-10 flex flex-col items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-3">
            {/* Left Line */}
            <div className="w-16 sm:w-24 lg:w-[171px] h-[1.2px] gradient-line-left" />

            {/* Coming Soon Text */}
            <span className="font-chamberi-display font-bold text-[#dbdbdb] text-lg sm:text-xl whitespace-nowrap drop-shadow-[0_0_40px_rgba(233,204,127,0.5)]">
              COMING SOON
            </span>

            {/* Right Line */}
            <div className="w-16 sm:w-24 lg:w-[171px] h-[1.2px] gradient-line-right" />
          </div>

          {/* Scroll Indicator */}
          <div className="mt-1 lg:mt-2 flex flex-col items-center gap-2">
            <Image
              src="/images/scroll-indicator.svg"
              alt="Scroll"
              width={80}
              height={40}
              className="w-16 h-8 lg:w-[66px] lg:h-[31px]"
            />
            {/* Scroll Arrow */}
            <svg
              className="w-5 h-5 lg:w-6 lg:h-6 text-[#dbdbdb]/60 animate-bounce"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
