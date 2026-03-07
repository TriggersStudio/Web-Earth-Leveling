"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

function Flag({ code, size = 20 }: { code: Locale; size?: number }) {
  const h = size * 0.75;
  switch (code) {
    case "fr":
      return (
        <svg width={size} height={h} viewBox="0 0 30 20" className="rounded-[2px] shrink-0">
          <rect width="10" height="20" fill="#002395" />
          <rect x="10" width="10" height="20" fill="#fff" />
          <rect x="20" width="10" height="20" fill="#ED2939" />
        </svg>
      );
    case "en":
      return (
        <svg width={size} height={h} viewBox="0 0 60 30" className="rounded-[2px] shrink-0">
          <rect width="60" height="30" fill="#00247d" />
          <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
          <path d="M0,0 L60,30 M60,0 L0,30" stroke="#cf142b" strokeWidth="2" />
          <path d="M30,0 V30 M0,15 H60" stroke="#fff" strokeWidth="10" />
          <path d="M30,0 V30 M0,15 H60" stroke="#cf142b" strokeWidth="6" />
        </svg>
      );
    case "es":
      return (
        <svg width={size} height={h} viewBox="0 0 30 20" className="rounded-[2px] shrink-0">
          <rect width="30" height="5" fill="#AA151B" />
          <rect y="5" width="30" height="10" fill="#F1BF00" />
          <rect y="15" width="30" height="5" fill="#AA151B" />
        </svg>
      );
    case "ru":
      return (
        <svg width={size} height={h} viewBox="0 0 30 20" className="rounded-[2px] shrink-0">
          <rect width="30" height="6.67" fill="#fff" />
          <rect y="6.67" width="30" height="6.67" fill="#0039A6" />
          <rect y="13.33" width="30" height="6.67" fill="#D52B1E" />
        </svg>
      );
    case "zh":
      return (
        <svg width={size} height={h} viewBox="0 0 30 20" className="rounded-[2px] shrink-0">
          <rect width="30" height="20" fill="#DE2910" />
          <g fill="#FFDE00">
            <polygon points="5,2 5.9,4.8 3,3.5 7,3.5 4.1,4.8" />
            <polygon points="10,1 10.4,2.2 9.2,1.5 10.8,1.5 9.6,2.2" />
            <polygon points="12,3 12.4,4.2 11.2,3.5 12.8,3.5 11.6,4.2" />
            <polygon points="12,6 12.4,7.2 11.2,6.5 12.8,6.5 11.6,7.2" />
            <polygon points="10,8 10.4,9.2 9.2,8.5 10.8,8.5 9.6,9.2" />
          </g>
        </svg>
      );
    case "hi":
      return (
        <svg width={size} height={h} viewBox="0 0 30 20" className="rounded-[2px] shrink-0">
          <rect width="30" height="6.67" fill="#FF9933" />
          <rect y="6.67" width="30" height="6.67" fill="#fff" />
          <rect y="13.33" width="30" height="6.67" fill="#138808" />
          <circle cx="15" cy="10" r="2.5" fill="none" stroke="#000080" strokeWidth="0.5" />
        </svg>
      );
    case "ar":
      return (
        <svg width={size} height={h} viewBox="0 0 30 20" className="rounded-[2px] shrink-0">
          <rect width="30" height="20" fill="#006C35" />
          <text x="15" y="11" textAnchor="middle" fill="#fff" fontSize="5" fontFamily="serif">لا إله إلا الله</text>
          <line x1="10" y1="14" x2="20" y2="14" stroke="#fff" strokeWidth="0.8" />
        </svg>
      );
    default:
      return null;
  }
}

export function LanguageSwitcher({ compact = false }: { compact?: boolean } = {}) {
  const t = useTranslations("LanguageSwitcher");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function switchLocale(newLocale: Locale) {
    router.replace(pathname, { locale: newLocale });
    setIsOpen(false);
  }

  return (
    <div className="relative z-[1000]" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center cursor-pointer hover:opacity-80 transition-opacity ${compact ? "gap-1.5" : "gap-3"}`}
      >
        <Flag code={locale} size={compact ? 16 : 22} />
        {!compact && (
          <span className="font-medium text-[#f0f0f0] text-[18px]">{t(locale)}</span>
        )}
        <svg
          className={`text-[#f0f0f0] transition-transform duration-200 ${isOpen ? "rotate-180" : ""} ${compact ? "w-2.5 h-2.5" : "w-4 h-4"}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className={`absolute right-0 w-[180px] z-[3000] rounded-lg border border-white/10 bg-[#0a1222]/95 backdrop-blur-xl shadow-xl overflow-hidden ${compact ? "top-full mt-2" : "bottom-full mb-2"}`}>
          <div className="py-1">
            {routing.locales.map((l) => (
              <button
                key={l}
                onClick={() => switchLocale(l)}
                className={`w-full flex items-center gap-3 px-4 text-left hover:bg-white/5 transition-colors ${compact ? "py-2" : "py-2.5"} ${l === locale ? "text-white bg-white/5" : "text-[#b0b0b0]"}`}
              >
                <Flag code={l} size={compact ? 16 : 20} />
                <span className={`font-medium ${compact ? "text-xs" : "text-sm"}`}>{t(l)}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
