import Image from "next/image";
import Link from "next/link";
import { ButtonEL } from "@/components/ui/button-el";

export function PreOrderSection() {
  return (
    <section className="w-full py-16 lg:py-24 px-4 sm:px-8 lg:px-16">
      <div className="max-w-[870px] mx-auto flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-[27px]">
        {/* Image Card */}
        <div className="relative w-full lg:w-[298px] lg:shrink-0 aspect-[16/9] rounded-[10px] p-[2px]" style={{ background: "linear-gradient(180deg, #E2E2D6 10%, #160856 70%)" }}>
          <div className="relative w-full h-full rounded-[8px] overflow-hidden">
            <div className="absolute inset-0 opacity-80 overflow-hidden">
              <Image
                src="/images/preorder-bg.png"
                alt="Pre-order Preview"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="flex flex-col items-start gap-8 lg:gap-10">
          <div className="flex flex-col gap-0 justify-center">
            <span className="font-chamberi-display font-bold text-[#dbdbdb] text-base sm:text-lg lg:text-base tracking-wide">
              COMING SOON (2027)
            </span>
            <Image
              src="/preorder.svg"
              alt="Pre-Order"
              width={185}
              height={52}
              className="h-auto w-[185px] sm:w-[220px] lg:w-[260px]"
            />
          </div>

          {/* CTA Button */}
          <Link href="/pre-order">
            <ButtonEL size="md">LEARN MORE</ButtonEL>
          </Link>
        </div>
      </div>
    </section>
  );
}
