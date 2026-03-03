import Image from "next/image";
import { Navbar, SupportBar, SocialSidebar, Footer } from "@/components/home";

export default function ComingSoonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-[#030912] flex flex-col overflow-x-hidden">
      <SocialSidebar />
      <SupportBar />
      <Navbar />

      <div className="absolute top-0 left-0 right-0 h-[400px] sm:h-[400px] overflow-hidden pointer-events-none">
        <Image
          src="/images/hero-background.png"
          alt=""
          fill
          className="object-cover object-[center_35%]"
          priority
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(3, 9, 18, 0) 40%, rgba(3, 9, 18, 0.6) 65%, rgb(3, 9, 18) 100%)",
          }}
        />
        <div className="absolute inset-0 bg-linear-to-r from-[#030912] via-transparent to-[#030912]" />
      </div>

      <main className="flex-1 flex flex-col items-center relative z-10">
        {children}
      </main>

      <Footer />
    </div>
  );
}
