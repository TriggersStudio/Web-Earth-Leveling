"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const supportLinks = [
  { label: "Universe", href: "/universe" },
  { label: "Blog", href: "/blog" },
  { label: "Community", href: "/community" },
  { label: "Wiki", href: "/wiki" },
  { label: "Forums", href: "/forums" },
  { label: "Shop", href: "/shop" },
];

const legalLinks = [
  { label: "Terms of Sale", href: "/cgv" },
  { label: "Terms of Use", href: "/cgu" },
  { label: "Privacy Policy", href: "/privacy" },
];

const triggersLinks = [
  { label: "SUPPORT", href: "/support" },
  { label: "TERMS OF USE", href: "/cgu" },
  { label: "TERMS OF SALE", href: "/cgv" },
  { label: "PRIVACY POLICY", href: "/privacy" },
  { label: "WORK WITH US", href: "/jobs" },
];

const socialIcons = [
  { name: "YouTube", href: "https://youtube.com/", icon: "youtube" },
  { name: "Instagram", href: "https://instagram.com/", icon: "instagram" },
  { name: "X", href: "https://x.com/Earth_Leveling", icon: "x" },
  { name: "TikTok", href: "https://tiktok.com/", icon: "tiktok" },
  { name: "Discord", href: "https://discord.gg/GU6GY9K4WG", icon: "discord" },
  { name: "Reddit", href: "https://reddit.com/", icon: "reddit" },
];

export function Footer() {
  const [logoClicks, setLogoClicks] = useState(0);
  const isOldLogo = logoClicks >= 10;

  return (
    <footer className="relative bg-[#040c17] shadow-[0px_36px_250px_0px_#010409]">
      <div className="flex flex-col lg:flex-row">
        {/* Left Section - Earth Leveling (70%) */}
        <div className="relative w-full lg:w-[65.6%] overflow-hidden">
          {/* Background texture - extends full width */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 mix-blend-overlay overflow-hidden">
              <Image
                src="/images/footer-texture.png"
                alt=""
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-[#111a27] mix-blend-color" />
            <div className="absolute inset-0 bg-black/10" />
          </div>

          {/* Content - with padding */}
          <div className="relative z-10 flex flex-col justify-between h-full gap-8 lg:gap-12 py-12 lg:py-[60px] px-8 sm:px-12 lg:px-[60px]">
            {/* Top Links Section */}
            <div className="flex flex-col gap-4">
              {/* Support Links - Left aligned */}
              <div className="flex flex-wrap gap-x-8 lg:gap-x-12 gap-y-2">
                {supportLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className="font-semibold text-[#f0f0f0] text-[12px] hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Separator - gradient line */}
              <div className="w-full h-px bg-gradient-to-r from-[#f0f0f0]/50 to-transparent" />

              {/* Legal Links - Left aligned */}
              <div className="flex flex-wrap gap-x-5 lg:gap-x-[19px] gap-y-2">
                {legalLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className="font-semibold text-[#f0f0f0] text-[12px] hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Earth Leveling Logo - Centered */}
            <div className="flex justify-center">
              <div
                className="relative w-48 h-20 lg:w-[200px] lg:h-[86px] cursor-pointer select-none"
                onClick={() => setLogoClicks((c) => c + 1)}
              >
                <Image
                  src={isOldLogo ? "/images/earth-leveling-text-logo.png" : "/images/earth-leveling-logo-text.svg"}
                  alt="Earth Leveling"
                  fill
                  className="object-contain transition-opacity duration-300"
                />
              </div>
            </div>

            {/* Bottom Section */}
            <div className="flex flex-col gap-6">
              {/* Social Icons - Centered with lines */}
              <div className="flex items-center justify-center gap-4 w-full">
                <div className="flex-1 max-w-32 lg:max-w-[210px] h-px bg-gradient-to-r from-transparent to-[#f0f0f0]/50" />
                <div className="flex items-center gap-5 lg:gap-6">
                  {socialIcons.map((social) => (
                    <Link
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#f0f0f0] hover:text-white transition-colors"
                      aria-label={social.name}
                    >
                      <SocialIcon name={social.icon} />
                    </Link>
                  ))}
                </div>
                <div className="flex-1 max-w-32 lg:max-w-[210px] h-px bg-gradient-to-l from-transparent to-[#f0f0f0]/50" />
              </div>

              {/* Bottom Bar - 3 columns */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
                {/* PEGI Rating - Left */}
                <div className="flex items-start gap-1 flex-1">
                  <div className="relative w-8 lg:w-[32px] h-10 lg:h-[39px]">
                    <Image
                      src="/images/pegi-12.png"
                      alt="PEGI 12"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="relative w-6 lg:w-[26px] h-6 lg:h-[26px]">
                    <Image
                      src="/images/violence-icon.png"
                      alt="Violence"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Copyright - Center */}
                <p className="font-medium text-[#f0f0f0] text-[12px] text-center flex-1">
                  © 2026 Earth Leveling. All Rights Reserved.
                </p>

                {/* Language Selector - Right */}
                <div className="flex items-center justify-end gap-2 cursor-pointer hover:opacity-80 transition-opacity flex-1">
                  <span className="text-base">🇺🇸</span>
                  <span className="font-medium text-[#f0f0f0] text-[12px]">English</span>
                  <svg
                    className="w-3 h-3 text-[#f0f0f0]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Triggers Studio (30%) */}
        <div className="bg-black py-12 lg:py-[60px] px-8 sm:px-12 lg:px-[60px] w-full lg:w-[34.4%] flex flex-col items-end gap-6 lg:gap-[21px]">
          {/* Triggers Studio Logo */}
          <div className="relative w-32 lg:w-[153px] h-8 lg:h-[37px]">
            <Image
              src="/images/triggers-studio-logo-white.png"
              alt="Triggers Studio"
              fill
              className="object-contain object-right"
            />
          </div>

          {/* Description */}
          <p className="text-[#f0f0f0] text-[10px] lg:text-[13px] text-right leading-relaxed">
            Triggers Studio is an independent game development studio crafting immersive, player-driven worlds. Our mission is to push the boundaries of simulation and community-driven experiences.
          </p>

          {/* Links */}
          <div className="flex flex-col gap-2 lg:gap-[21px] items-end">
            {triggersLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="font-medium text-[#f0f0f0] text-[10px] lg:text-[13px] text-right hover:text-white transition-colors uppercase tracking-wide font-oswald"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Bottom Text */}
          <p className="text-[#a9a9a9] text-[10px] lg:text-[13px] text-right leading-relaxed mt-auto">
            Earth Leveling is a product of Triggers Studio. All game content, logos, and trademarks are the property of their respective owners.
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ name }: { name: string }) {
  const iconClass = "w-4 h-4 lg:w-[13px] lg:h-[13px]";

  switch (name) {
    case "youtube":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={iconClass}>
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      );
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={iconClass}>
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
        </svg>
      );
    case "x":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={iconClass}>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case "tiktok":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={iconClass}>
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
        </svg>
      );
    case "discord":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={iconClass}>
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.947 2.418-2.157 2.418z" />
        </svg>
      );
    case "reddit":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={iconClass}>
          <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
        </svg>
      );
    default:
      return null;
  }
}
