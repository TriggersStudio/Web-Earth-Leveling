"use client";

import Image from "next/image";

export function SupportBar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-full bg-black border-b border-white/10 h-[50px] px-4 sm:px-8 lg:px-[136px] flex items-center">
      <div className="flex items-center justify-between w-full max-w-[1008px] mx-auto">
        {/* Left spacer */}
        <div className="flex-1 h-[23px]" />

        {/* Center - Radio */}
        <div className="flex-1 flex items-center justify-center">
          <div className="flex items-center justify-between w-[179px]">
            {/* Pochette */}
            <div className="w-[30px] h-[31px] rounded-[7px] overflow-hidden relative shrink-0">
              <Image
                src="/images/radio-pochette.png"
                alt="Album Cover"
                fill
                className="object-cover"
              />
            </div>

            {/* Title */}
            <span className="font-manrope font-extrabold text-[#dbdbdb] text-[10px] leading-normal">
              LEVELING FM
            </span>

            {/* Icons */}
            <div className="flex items-center gap-[9px]">
              <div className="relative w-[11px] h-[11px]">
                <Image src="/images/radio-sound.svg" alt="Sound" fill className="object-contain" />
              </div>
              <div className="relative w-[9px] h-[9px]">
                <Image src="/images/radio-link.svg" alt="Link" fill className="object-contain" />
              </div>
            </div>
          </div>
        </div>

        {/* Right - Support + Flag */}
        <div className="flex-1 flex items-center justify-end gap-[32px]">
          <span className="font-manrope font-extrabold text-[#dbdbdb] text-[10px] leading-normal">
            SUPPORT
          </span>
          <div className="relative w-[42px] h-[15px] shrink-0">
            <Image
              src="/images/support-flags.png"
              alt="Language"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
