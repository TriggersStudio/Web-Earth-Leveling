"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

const flags: Record<Locale, string> = {
  en: "\u{1F1FA}\u{1F1F8}",
  fr: "\u{1F1EB}\u{1F1F7}",
  es: "\u{1F1EA}\u{1F1F8}",
  ru: "\u{1F1F7}\u{1F1FA}",
  zh: "\u{1F1E8}\u{1F1F3}",
};

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
        <span className={compact ? "text-sm" : "text-xl"}>{flags[locale]}</span>
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
                <span className={compact ? "text-sm" : "text-lg"}>{flags[l]}</span>
                <span className={`font-medium ${compact ? "text-xs" : "text-sm"}`}>{t(l)}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
