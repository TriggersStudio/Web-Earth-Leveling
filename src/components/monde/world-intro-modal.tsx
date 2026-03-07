"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

const STORAGE_KEY = "world-intro-dismissed";

const SLIDES_ICONS = [
  // Globe
  <svg key="globe" width="47" height="47" viewBox="0 0 24 24" fill="none" stroke="#C29FFF" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z" />
  </svg>,
  // Sword (Gates)
  <svg key="sword" width="47" height="47" viewBox="0 0 24 24" fill="none" stroke="#C29FFF" strokeWidth="1.5">
    <path d="M14.5 17.5L3 6V3h3l11.5 11.5M13 19l6-6M15 21l6-6" />
    <path d="M12 12l4.5 4.5" />
  </svg>,
  // Shield (Tensions)
  <svg key="shield" width="47" height="47" viewBox="0 0 24 24" fill="none" stroke="#C29FFF" strokeWidth="1.5">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>,
  // Users (Nations)
  <svg key="users" width="47" height="47" viewBox="0 0 24 24" fill="none" stroke="#C29FFF" strokeWidth="1.5">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>,
  // Star (Rankings)
  <svg key="star" width="47" height="47" viewBox="0 0 24 24" fill="none" stroke="#C29FFF" strokeWidth="1.5">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>,
];

export function WorldIntroModal() {
  const t = useTranslations("WorldIntro");
  const [visible, setVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  const totalSlides = 5;

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (!dismissed) {
      setVisible(true);
    }
  }, []);

  const handleClose = () => {
    if (dontShowAgain) {
      localStorage.setItem(STORAGE_KEY, "true");
    }
    setVisible(false);
  };

  const handleNext = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide((s) => s + 1);
    } else {
      handleClose();
    }
  };

  const handleBack = () => {
    if (currentSlide > 0) setCurrentSlide((s) => s - 1);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-[rgba(5,26,56,0.85)] border border-[#385989]/40 flex flex-col gap-3 items-start p-6 w-[460px] max-w-[90vw]">
        {/* Close button */}
        <div className="flex items-center justify-end w-full">
          <button
            onClick={handleClose}
            className="border border-[#385989]/40 flex items-center justify-center size-10 hover:bg-white/5 transition-colors cursor-pointer"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e3e3e3" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-[18px] items-center w-full">
          {/* Icon */}
          <div className="bg-[rgba(163,102,255,0.5)] border border-[#a366ff]/40 flex items-center justify-center size-[76px]">
            {SLIDES_ICONS[currentSlide]}
          </div>

          {/* Text */}
          <div className="flex flex-col gap-3 items-center text-center">
            <p className="font-inter font-semibold text-[#f0f0f0] text-base">
              {t(`slide${currentSlide + 1}Title`)}
            </p>
            <p className="font-inter text-[#a4a4a4] text-[11px] leading-relaxed max-w-[356px]">
              {t(`slide${currentSlide + 1}Desc`)}
            </p>
          </div>

          {/* Dots */}
          <div className="flex gap-[5px] items-center">
            {Array.from({ length: totalSlides }).map((_, i) => (
              <div
                key={i}
                className={
                  i === currentSlide
                    ? "bg-[#a165fb] h-[4px] w-[18px] transition-all duration-300"
                    : "bg-[#381a6b] size-[4px] transition-all duration-300"
                }
              />
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between w-full h-9">
            {/* Back */}
            <button
              onClick={handleBack}
              className={`flex gap-1.5 items-center cursor-pointer transition-opacity ${currentSlide === 0 ? "opacity-0 pointer-events-none" : "opacity-100"}`}
            >
              <svg width="7" height="7" viewBox="0 0 7 7" fill="none">
                <path d="M4.5 1L1.5 3.5L4.5 6" stroke="#666" strokeWidth="1" />
              </svg>
              <span className="font-inter text-[#666] text-[9px] tracking-wider">
                {t("back")}
              </span>
            </button>

            {/* Next */}
            <button
              onClick={handleNext}
              className="bg-[#a165fb] flex gap-1.5 items-center px-2.5 py-1.5 hover:bg-[#8a4fe0] transition-colors cursor-pointer"
            >
              <span className="font-inter text-[#f0f0f0] text-[9px] tracking-wider">
                {currentSlide === totalSlides - 1 ? t("finish") : t("next")}
              </span>
              <svg width="7" height="7" viewBox="0 0 7 7" fill="none">
                <path d="M2.5 1L5.5 3.5L2.5 6" stroke="#f0f0f0" strokeWidth="1" />
              </svg>
            </button>
          </div>

          {/* Don't show again + Skip */}
          <div className="flex flex-col items-center gap-2">
            <button
              onClick={handleClose}
              className="font-inter text-[#666] text-[7px] tracking-wider hover:text-[#999] transition-colors cursor-pointer"
            >
              {t("skip")}
            </button>
            <label className="flex items-center gap-2 cursor-pointer group">
              <div
                className={`size-3 border border-[#385989] flex items-center justify-center transition-colors ${dontShowAgain ? "bg-[#a165fb] border-[#a165fb]" : "bg-transparent"}`}
                onClick={() => setDontShowAgain(!dontShowAgain)}
              >
                {dontShowAgain && (
                  <svg width="8" height="8" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" />
                  </svg>
                )}
              </div>
              <span
                className="font-inter text-[#666] text-[7px] tracking-wider group-hover:text-[#999] transition-colors"
                onClick={() => setDontShowAgain(!dontShowAgain)}
              >
                {t("dontShowAgain")}
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
