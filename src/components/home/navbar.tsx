"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "HOME" },
  { href: "/community", label: "COMMUNITY" },
  { href: "/universe", label: "UNIVERSE" },
  { href: "/news", label: "NEWS" },
  { href: "/wiki", label: "WIKI" },
  { href: "/forums", label: "FORUM" },
  { href: "/shop", label: "SHOP" },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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

  return (
    <>
      <nav className={`fixed top-[50px] left-0 right-0 w-full py-3 px-4 sm:px-6 lg:px-12 z-50 transition-all duration-300 ${isScrolled ? "bg-black/50 backdrop-blur-md" : "bg-transparent"}`}>
        <div className="max-w-6xl mx-auto flex items-center justify-center gap-[90px]">
          <Link href="/" className="flex items-center shrink-0">
            <div className="w-24 h-8 sm:w-32 sm:h-10 lg:w-[95px] lg:h-[36px] relative">
              <Image
                src="/images/earth-leveling-logo.png"
                alt="Earth Leveling"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-[37px]">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-chamberi-headline font-semibold text-[#dbdbdb] text-[13px] hover:text-white transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
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
        className={`fixed inset-0 z-40 bg-[#030912]/95 backdrop-blur-xl lg:hidden transition-all duration-500 ease-out ${isMenuOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
          }`}
      >
        <div
          className={`flex flex-col items-end justify-center h-full px-8 sm:px-12 transition-transform duration-500 ease-out ${isMenuOpen ? "translate-x-0" : "translate-x-1/3"
            }`}
        >
          {navLinks.map((link, index) => (
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
          ))}
        </div>
      </div>
    </>
  );
}
