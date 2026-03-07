"use client";

import { useState, useRef, useCallback } from "react";
import type { CountryData } from "./world-country-events";

const TENSION_STYLES = {
  HIGH: { bg: "rgba(255,0,0,0.5)", border: "#ff3d3d", text: "#ff3d3d" },
  MEDIUM: { bg: "rgba(255,170,0,0.5)", border: "#ffaa00", text: "#ffaa00" },
  LOW: { bg: "rgba(56,191,43,0.5)", border: "#38bf2b", text: "#38bf2b" },
  NONE: { bg: "rgba(100,100,100,0.5)", border: "#666", text: "#666" },
};

function SectionTitle({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      {icon}
      <span className="font-chamberi-headline font-semibold text-[#b5b5b5] text-[11px]">
        {label}
      </span>
    </div>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-[#010d1c] border-[0.4px] border-solid border-[#385989] flex-1 flex items-center p-3">
      <div className="flex flex-col gap-1">
        <span className="font-chamberi-headline font-semibold text-[#9a9a9a] text-[8px]">{label}</span>
        <span className="font-chamberi-headline font-semibold text-[#f0f0f0] text-[11px]">{value}</span>
      </div>
    </div>
  );
}

interface Props {
  country: CountryData;
  onClose: () => void;
}

export function WorldMobileCountrySheet({ country, onClose }: Props) {
  const ts = TENSION_STYLES[country.tension];
  const [tab, setTab] = useState<"events" | "details">("events");
  const sheetRef = useRef<HTMLDivElement>(null);
  const dragY = useRef({ startY: 0, currentY: 0, dragging: false });
  const [translateY, setTranslateY] = useState(0);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    // Only allow drag-to-close when scrolled to top
    const scrollEl = sheetRef.current?.querySelector("[data-scroll]") as HTMLElement | null;
    if (scrollEl && scrollEl.scrollTop > 0) return;
    dragY.current = { startY: e.touches[0].clientY, currentY: e.touches[0].clientY, dragging: true };
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (!dragY.current.dragging) return;
    const dy = e.touches[0].clientY - dragY.current.startY;
    // Only allow dragging down
    if (dy > 0) {
      e.preventDefault();
      setTranslateY(dy);
    }
  }, []);

  const onTouchEnd = useCallback(() => {
    if (!dragY.current.dragging) return;
    dragY.current.dragging = false;
    if (translateY > 100) {
      // Swipe far enough → close
      setTranslateY(999);
      setTimeout(onClose, 200);
    } else {
      // Snap back
      setTranslateY(0);
    }
  }, [translateY, onClose]);

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 lg:hidden animate-slide-up">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 -z-10 transition-opacity duration-200"
        style={{ opacity: translateY > 0 ? Math.max(0, 1 - translateY / 300) : 1 }}
        onClick={onClose}
      />

      {/* Sheet */}
      <div
        ref={sheetRef}
        className="bg-[rgba(5,26,56,0.95)] backdrop-blur-md border-t border-[#385989]/60 flex flex-col max-h-[75vh] overflow-hidden transition-transform duration-200"
        style={{ transform: `translateY(${translateY}px)`, transitionDuration: dragY.current.dragging ? "0ms" : "200ms" }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 rounded-full bg-[#385989]/60" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 pb-3">
          <div className="flex items-center gap-3">
            <span className="text-[24px]">{country.flag}</span>
            <span className="font-chamberi-headline font-semibold text-[#f0f0f0] text-[20px]">
              {country.name}
            </span>
            <div
              className="flex items-center justify-center h-[18px] px-2"
              style={{ background: ts.bg, border: `0.4px solid ${ts.border}` }}
            >
              <span className="font-inter text-[8px]" style={{ color: ts.text }}>
                TENSION
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="border border-[#385989]/40 flex items-center justify-center size-[30px] hover:bg-white/5 transition-colors cursor-pointer"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#e3e3e3" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-0 px-5 border-b border-[#385989]/30">
          <button
            onClick={() => setTab("events")}
            className={`px-4 py-2 text-[11px] font-chamberi-headline font-semibold transition-colors cursor-pointer ${
              tab === "events"
                ? "text-[#a366ff] border-b-2 border-[#a366ff]"
                : "text-[#8c8c8c]"
            }`}
          >
            EVENTS
          </button>
          <button
            onClick={() => setTab("details")}
            className={`px-4 py-2 text-[11px] font-chamberi-headline font-semibold transition-colors cursor-pointer ${
              tab === "details"
                ? "text-[#a366ff] border-b-2 border-[#a366ff]"
                : "text-[#8c8c8c]"
            }`}
          >
            DETAILS
          </button>
        </div>

        {/* Content */}
        <div data-scroll className="flex-1 overflow-y-auto scrollbar-hide p-5">
          {tab === "events" ? (
            <EventsTab country={country} />
          ) : (
            <DetailsTab country={country} />
          )}
        </div>
      </div>
    </div>
  );
}

function EventsTab({ country }: { country: CountryData }) {
  return (
    <div className="flex flex-col gap-3">
      <SectionTitle
        icon={
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#b5b5b5" strokeWidth="1.5">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        }
        label="RECENT EVENTS"
      />
      <div className="flex flex-col gap-2">
        {country.recentEvents.map((event, i) => {
          const es = TENSION_STYLES[event.severity];
          return (
            <div
              key={i}
              className="bg-[rgba(1,13,28,0.6)] border-[0.4px] border-solid border-[#385989] flex items-center justify-between p-3"
            >
              <p className="font-chamberi-headline font-semibold text-[#f0f0f0] text-[11px] leading-relaxed max-w-[70%]">
                {event.text}
              </p>
              <div
                className="flex items-center justify-center h-[16px] px-2 shrink-0"
                style={{ background: es.bg, border: `0.4px solid ${es.border}` }}
              >
                <span className="font-inter text-[8px]" style={{ color: es.text }}>
                  {event.severity}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DetailsTab({ country }: { country: CountryData }) {
  return (
    <div className="flex flex-col gap-5">
      {/* Country Intel */}
      <div className="flex flex-col gap-3">
        <SectionTitle
          icon={
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#b5b5b5" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
          }
          label="COUNTRY INTEL"
        />
        <div className="grid grid-cols-2 gap-2">
          <InfoCard label="HEAD OF STATE" value={country.headOfState} />
          <InfoCard label="HEAD OF GOV" value={country.headOfGov} />
          <InfoCard label="GOVERNMENT" value={country.government} />
          <InfoCard label="POPULATION" value={country.population} />
          <InfoCard label="CAPITAL" value={country.capital} />
          <InfoCard label="MONEY" value={country.currency} />
        </div>
      </div>

      {/* Internet Status */}
      <div className="flex flex-col gap-3">
        <SectionTitle
          icon={
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#b5b5b5" strokeWidth="1.5">
              <path d="M1 1l22 22M16.72 11.06A10.94 10.94 0 0 1 19 12.55M5 12.55a10.94 10.94 0 0 1 5.17-2.39M10.71 5.05A16 16 0 0 1 22.56 9M1.42 9a15.91 15.91 0 0 1 4.7-2.88M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01" />
            </svg>
          }
          label="INTERNET STATUS"
        />
        <div className="bg-[#010d1c] border-[0.4px] border-solid border-[#385989] flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="size-[8px] rounded-full bg-[#38bf2b] shadow-[0_0_6px_rgba(56,191,43,0.6)]" />
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="font-chamberi-headline font-semibold text-[#f0f0f0] text-[12px]">
                  {country.internetStatus}
                </span>
                <div
                  className="flex items-center justify-center h-[14px] px-1.5"
                  style={{ background: "rgba(255,170,0,0.5)", border: "0.4px solid #ffaa00" }}
                >
                  <span className="font-chamberi-headline font-semibold text-[#ffaa00] text-[7px]">
                    {country.anomalyPercent} anomaly
                  </span>
                </div>
              </div>
              <span className="font-chamberi-headline font-semibold text-[#9a9a9a] text-[8px]">
                Internet Connectivity
              </span>
            </div>
          </div>
          <span className="font-chamberi-headline font-semibold text-[#a4a4a4] text-[9px]">
            {country.internetCode}
          </span>
        </div>
      </div>

      {/* Passport */}
      <div className="flex flex-col gap-3">
        <SectionTitle
          icon={
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#b5b5b5" strokeWidth="1.5">
              <rect x="2" y="3" width="20" height="18" rx="2" />
              <circle cx="12" cy="11" r="3" />
              <path d="M7 21v-1a5 5 0 0 1 10 0v1" />
            </svg>
          }
          label="PASSEPORT"
        />
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-center gap-4">
            <div className="shrink-0 -rotate-[3.8deg]">
              <img
                src={country.passportImage || "/images/passport-book.png"}
                alt="Passport"
                className="w-[60px] h-[75px] object-cover"
              />
            </div>
            <img src="/images/passport-plate.png" alt="Plate" className="w-[120px] h-[31px] object-cover" />
          </div>
          <p className="font-chamberi-headline font-semibold italic text-[#e8e8e8] text-[11px] leading-relaxed text-center">
            &ldquo;{country.passportQuote}&rdquo;
          </p>
        </div>
      </div>

      {/* Advantages & Disadvantages */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <SectionTitle
            icon={
              <svg width="10" height="8" viewBox="0 0 12 10" fill="none">
                <path d="M6 0L11.196 9H0.804L6 0Z" fill="#38bf2b" />
              </svg>
            }
            label="ADVANTAGES"
          />
          <div className="flex flex-col gap-1.5">
            {country.advantages.map((adv, i) => (
              <div key={i} className="flex items-start gap-1.5">
                <span className="font-chamberi-headline font-bold text-[#804bd1] text-[12px] leading-none">•</span>
                <span className="font-chamberi-headline font-semibold text-[#f0f0f0] text-[10px] leading-relaxed">
                  {adv}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <SectionTitle
            icon={
              <svg width="10" height="8" viewBox="0 0 12 10" fill="none">
                <path d="M6 10L0.804 1H11.196L6 10Z" fill="#ff3d3d" />
              </svg>
            }
            label="DISADVANTAGES"
          />
          <div className="flex flex-col gap-1.5">
            {country.disadvantages.map((dis, i) => (
              <div key={i} className="flex items-start gap-1.5">
                <span className="font-chamberi-headline font-bold text-[#804bd1] text-[12px] leading-none">•</span>
                <span className="font-chamberi-headline font-semibold text-[#f0f0f0] text-[10px] leading-relaxed">
                  {dis}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
