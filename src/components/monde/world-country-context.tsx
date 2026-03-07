"use client";

import { createContext, useContext, useState, useCallback } from "react";
import type { CountryData } from "./world-country-events";
import { MOCK_COUNTRIES } from "./world-country-events";

interface ClickPosition {
  x: number;
  y: number;
}

interface CountryContextValue {
  selectedCountry: CountryData | null;
  showEvents: boolean;
  showPanel: boolean;
  clickPos: ClickPosition | null;
  selectCountry: (name: string, pos?: ClickPosition) => void;
  openPanel: () => void;
  closeAll: () => void;
  closeEvents: () => void;
  closePanel: () => void;
}

const CountryContext = createContext<CountryContextValue | null>(null);

export function useCountryContext() {
  const ctx = useContext(CountryContext);
  if (!ctx) throw new Error("useCountryContext must be used within CountryProvider");
  return ctx;
}

export function CountryProvider({ children }: { children: React.ReactNode }) {
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null);
  const [showEvents, setShowEvents] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const [clickPos, setClickPos] = useState<ClickPosition | null>(null);

  const selectCountry = useCallback((name: string, pos?: ClickPosition) => {
    const country = MOCK_COUNTRIES[name];
    if (country) {
      setSelectedCountry(country);
      setShowEvents(true);
      setShowPanel(true);
      if (pos) setClickPos(pos);
    }
  }, []);

  const openPanel = useCallback(() => {
    setShowEvents(false);
    setShowPanel(true);
  }, []);

  const closeAll = useCallback(() => {
    setSelectedCountry(null);
    setShowEvents(false);
    setShowPanel(false);
    setClickPos(null);
  }, []);

  const closeEvents = useCallback(() => setShowEvents(false), []);
  const closePanel = useCallback(() => setShowPanel(false), []);

  return (
    <CountryContext.Provider
      value={{ selectedCountry, showEvents, showPanel, clickPos, selectCountry, openPanel, closeAll, closeEvents, closePanel }}
    >
      {children}
    </CountryContext.Provider>
  );
}
