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

      <main className="flex-1 flex items-center justify-center pt-[50px]">
        {children}
      </main>

      <Footer />
    </div>
  );
}
