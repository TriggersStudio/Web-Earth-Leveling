"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";

export function Navbar() {
  const t = useTranslations("Navigation");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCommunityOpen, setIsCommunityOpen] = useState(false);
  const [isMobileCommunityOpen, setIsMobileCommunityOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { href: "/" as const, label: t("home") },
    { href: "/community" as const, label: t("community"), hasDropdown: true },
    { href: "/world" as const, label: t("world") },
    { href: "/universe" as const, label: t("universe") },
    { href: "/blog" as const, label: t("news") },
    { href: "/wiki" as const, label: t("wiki") },
    { href: "/forums" as const, label: t("forum") },
    { href: "/shop" as const, label: t("shop") },
  ];

  type CommunityItem = { label: string; href: string } | { separator: true };

  const communityDropdownItems: CommunityItem[] = [
    { label: t("organisations"), href: "/community/organisation" },
    { label: t("nations"), href: "/world" },
    { label: t("rankings"), href: "/community/classement" },
    { separator: true },
    { label: t("vote"), href: "/community/voter" },
    { label: t("events"), href: "/community/evenement" },
    { label: t("planning"), href: "/community/planning" },
    { separator: true },
    { label: t("joinUs"), href: "/community/nous-rejoindre" },
    { label: t("partners"), href: "/community/partenaire" },
    { label: t("ambassadorProgram"), href: "/community/ambassadeur" },
    { label: t("creatorProgram"), href: "/community/creator-programme" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCommunityOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <nav className={`fixed top-[50px] left-0 right-0 w-full py-3 px-4 sm:px-6 lg:px-12 z-50 transition-all duration-300 ${isScrolled ? "bg-black/50 backdrop-blur-md" : "bg-gradient-to-b from-black/40 to-transparent"}`}>
        <div className="max-w-6xl mx-auto flex items-center justify-center gap-[90px]">
          <Link href="/" className="flex items-center shrink-0">
            <div className="w-28 h-12 sm:w-34 sm:h-[56px] lg:w-[125px] lg:h-[54px] relative">
              <Image
                src="/images/earth-leveling-logo-text.svg"
                alt="Earth Leveling"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-[37px]">
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <div key={link.href} className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsCommunityOpen(!isCommunityOpen)}
                    className="font-chamberi-headline font-semibold text-[#dbdbdb] text-[13px] hover:text-white transition-colors duration-300 flex items-center gap-1"
                  >
                    {link.label}
                    <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isCommunityOpen ? "rotate-180" : ""}`} />
                  </button>

                  <div
                    className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[220px] rounded-lg border border-white/10 bg-[#0a1222]/95 backdrop-blur-xl shadow-xl overflow-hidden transition-all duration-200 ${isCommunityOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"}`}
                  >
                    <div className="py-2">
                      {communityDropdownItems.map((item, index) =>
                        "separator" in item ? (
                          <div key={`sep-${index}`} className="my-1 mx-3 h-px bg-white/10" />
                        ) : (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsCommunityOpen(false)}
                            className="block px-4 py-2 font-chamberi-headline text-[12px] text-[#b0b0b0] hover:text-white hover:bg-white/5 transition-colors duration-200"
                          >
                            {item.label}
                          </Link>
                        )
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-chamberi-headline font-semibold text-[#dbdbdb] text-[13px] hover:text-white transition-colors duration-300"
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-[#dbdbdb] hover:text-white transition-colors relative z-50"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-40 bg-[#030912]/95 backdrop-blur-xl lg:hidden overflow-y-auto transition-all duration-500 ease-out ${isMenuOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
          }`}
      >
        <div
          className={`flex flex-col items-end min-h-full justify-center px-8 sm:px-12 py-24 transition-transform duration-500 ease-out ${isMenuOpen ? "translate-x-0" : "translate-x-1/3"
            }`}
        >
          {navLinks.map((link, index) =>
            link.hasDropdown ? (
              <div key={link.href} className="flex flex-col items-end">
                <button
                  onClick={() => setIsMobileCommunityOpen(!isMobileCommunityOpen)}
                  className="font-chamberi-headline font-semibold text-[#dbdbdb] text-3xl sm:text-4xl hover:text-white transition-all duration-400 py-3 flex items-center gap-2"
                  style={{
                    transitionDelay: isMenuOpen ? `${100 + index * 60}ms` : "0ms",
                    opacity: isMenuOpen ? 1 : 0,
                    transform: isMenuOpen ? "translateY(0)" : "translateY(16px)",
                  }}
                >
                  {link.label}
                  <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${isMobileCommunityOpen ? "rotate-180" : ""}`} />
                </button>
                <div className={`flex flex-col items-end overflow-hidden transition-all duration-300 ${isMobileCommunityOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`}>
                  {communityDropdownItems.map((item, i) =>
                    "separator" in item ? (
                      <div key={`msep-${i}`} className="my-1 w-24 h-px bg-white/10" />
                    ) : (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => { setIsMenuOpen(false); setIsMobileCommunityOpen(false); }}
                        className="font-chamberi-headline text-[#b0b0b0] text-lg sm:text-xl hover:text-white transition-colors duration-200 py-1.5"
                      >
                        {item.label}
                      </Link>
                    )
                  )}
                </div>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="font-chamberi-headline font-semibold text-[#dbdbdb] text-3xl sm:text-4xl hover:text-white transition-all duration-400 py-3"
                style={{
                  transitionDelay: isMenuOpen ? `${100 + index * 60}ms` : "0ms",
                  opacity: isMenuOpen ? 1 : 0,
                  transform: isMenuOpen ? "translateY(0)" : "translateY(16px)",
                }}
              >
                {link.label}
              </Link>
            )
          )}
        </div>
      </div>
    </>
  );
}
