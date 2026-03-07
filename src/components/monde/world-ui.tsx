"use client";

import { useCallback, useState } from "react";
import { useTranslations } from "next-intl";
import { CountryProvider, useCountryContext } from "./world-country-context";
import { WorldGlobe } from "./world-globe";
import { WorldPulseFeed } from "./world-pulse-feed";
import { WorldCountryEvents } from "./world-country-events";
import { WorldCountryPanel } from "./world-country-panel";
import { WorldStatsBar } from "./world-stats-bar";
import { WorldNewsTicker } from "./world-news-ticker";
import { WorldIntroModal } from "./world-intro-modal";
import { WorldMobileCountrySheet } from "./world-mobile-country-sheet";
import { WorldMobilePulseFeed } from "./world-mobile-pulse-feed";

function WorldUIInner() {
  const t = useTranslations("World");
  const {
    selectedCountry,
    showEvents,
    showPanel,
    clickPos,
    selectCountry,
    openPanel,
    closeEvents,
    closePanel,
    closeAll,
  } = useCountryContext();

  const [pulseOpen, setPulseOpen] = useState(false);

  const handleCountryClick = useCallback(
    (name: string, pos: { x: number; y: number }) => {
      selectCountry(name, pos);
    },
    [selectCountry]
  );

  return (
    <>
      {/* Globe */}
      <div className="absolute inset-0">
        <WorldGlobe onCountryClick={handleCountryClick} />
      </div>

      {/* Title overlay — mobile (bottom-left), hidden when country sheet is open */}
      {!selectedCountry && (
        <div className="absolute bottom-28 left-6 z-30 pointer-events-none lg:hidden">
          <p className="font-chamberi-display font-bold text-[#C29FFF]/60 text-xs tracking-[0.3em] uppercase mb-2">
            {t("label")}
          </p>
          <h1 className="font-ghavettor text-gradient-gold text-5xl sm:text-6xl leading-none">
            {t("title")}
          </h1>
          <p className="font-caslon text-[#868686] text-sm mt-3 max-w-xs">
            {t("description")}
          </p>
        </div>
      )}

      {/* Title overlay — desktop (top-right), hidden when country panel is open */}
      {!(selectedCountry && showPanel) && (
        <div className="absolute top-[240px] right-[70px] z-30 pointer-events-none text-right hidden lg:block">
          <p className="font-chamberi-display font-bold text-[#C29FFF]/60 text-xs tracking-[0.3em] uppercase mb-2">
            {t("label")}
          </p>
          <h1 className="font-ghavettor text-gradient-gold text-4xl leading-none">
            {t("title")}
          </h1>
          <p className="font-caslon text-[#868686] text-xs mt-3 max-w-[200px] ml-auto">
            {t("description")}
          </p>
        </div>
      )}

      {/* Pulse Feed - Desktop (left panel) */}
      <WorldPulseFeed />

      {/* Pulse Feed - Mobile (drawer controlled by stats bar) */}
      <WorldMobilePulseFeed open={pulseOpen} onClose={() => setPulseOpen(false)} />

      {/* Country Events - Desktop (follows click position) */}
      {selectedCountry && showEvents && clickPos && (
        <WorldCountryEvents
          country={selectedCountry}
          onClose={closeEvents}
          onViewDetails={openPanel}
          position={clickPos}
        />
      )}

      {/* Country Panel - Desktop (right panel) */}
      {selectedCountry && showPanel && (
        <WorldCountryPanel
          country={selectedCountry}
          onClose={closePanel}
        />
      )}

      {/* Country Sheet - Mobile (bottom sheet with tabs) */}
      {selectedCountry && (showEvents || showPanel) && (
        <WorldMobileCountrySheet
          country={selectedCountry}
          onClose={closeAll}
        />
      )}

      {/* Bottom overlays */}
      <WorldStatsBar onPulseClick={() => setPulseOpen(true)} />
      <WorldNewsTicker />
      <WorldIntroModal />
    </>
  );
}

export function WorldUI() {
  return (
    <CountryProvider>
      <WorldUIInner />
    </CountryProvider>
  );
}
