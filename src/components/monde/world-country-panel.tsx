"use client";

import type { CountryData } from "./world-country-events";

const TENSION_STYLES = {
  HIGH: { bg: "rgba(255,0,0,0.5)", border: "#ff3d3d", text: "#ff3d3d" },
  MEDIUM: { bg: "rgba(255,170,0,0.5)", border: "#ffaa00", text: "#ffaa00" },
  LOW: { bg: "rgba(56,191,43,0.5)", border: "#38bf2b", text: "#38bf2b" },
  NONE: { bg: "rgba(100,100,100,0.5)", border: "#666", text: "#666" },
};

function SectionTitle({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-1">
      {icon}
      <span className="font-chamberi-headline font-semibold text-[#b5b5b5] text-[12px]">
        {label}
      </span>
    </div>
  );
}

function InfoCard({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return (
    <div className="bg-[#010d1c] border-[0.4px] border-solid border-[#385989] flex items-center p-3 flex-1">
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-1 h-[8px]">
          {icon || (
            <svg width="8" height="7" viewBox="0 0 24 24" fill="none" stroke="#8c8c8c" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          )}
          <span className="font-chamberi-headline font-semibold text-[#9a9a9a] text-[9px]">{label}</span>
        </div>
        <span className="font-chamberi-headline font-semibold text-[#f0f0f0] text-[12px]">{value}</span>
      </div>
    </div>
  );
}

interface Props {
  country: CountryData;
  onClose: () => void;
}

export function WorldCountryPanel({ country, onClose }: Props) {
  const ts = TENSION_STYLES[country.tension];

  return (
    <div
      className="fixed top-[230px] right-[70px] z-40 w-[320px] max-h-[calc(100vh-260px)] hidden lg:flex bg-[rgba(5,26,56,0.75)] border-[0.605px] border-solid flex-col gap-5 p-4 overflow-y-auto overflow-x-hidden scrollbar-hide"
      style={{ borderImage: "linear-gradient(180deg, #385989 0%, #031022 100%) 1" }}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center gap-[11px]">
            <span className="text-[22px]">{country.flag}</span>
            <span className="font-chamberi-headline font-semibold text-[#f0f0f0] text-[21px]">
              {country.name}
            </span>
          </div>
          <div
            className="flex items-center justify-center h-[24px] w-[72px]"
            style={{ background: ts.bg, border: `0.4px solid ${ts.border}` }}
          >
            <span className="font-inter text-[11px]" style={{ color: ts.text }}>
              TENSION
            </span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="border-[0.4px] border-solid border-[#385989] flex items-center justify-center size-[33px] hover:bg-white/5 transition-colors cursor-pointer"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e3e3e3" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Separator */}
      <div className="w-full h-px bg-[#385989]/40" />

      {/* COUNTRY INTEL */}
      <div className="flex flex-col gap-3">
        <SectionTitle
          icon={
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#b5b5b5" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
          }
          label="COUNTRY INTEL"
        />
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <InfoCard label="HEAD OF STATE" value={country.headOfState} />
            <InfoCard label="HEAD OF GOV" value={country.headOfGov} />
          </div>
          <div className="flex items-center gap-2">
            <InfoCard label="GOVERNMENT" value={country.government} />
            <InfoCard
              label="POPULATION"
              value={country.population}
              icon={
                <svg width="10" height="7" viewBox="0 0 24 24" fill="none" stroke="#8c8c8c" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              }
            />
          </div>
          <div className="flex items-center gap-2">
            <InfoCard
              label="CAPITAL"
              value={country.capital}
              icon={
                <svg width="6" height="7" viewBox="0 0 24 24" fill="none" stroke="#8c8c8c" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              }
            />
            <InfoCard
              label="MONEY"
              value={country.currency}
              icon={
                <svg width="6" height="7" viewBox="0 0 24 24" fill="none" stroke="#8c8c8c" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              }
            />
          </div>
        </div>
      </div>

      {/* Separator */}
      <div className="w-full h-px bg-[#385989]/40" />

      {/* INTERNET STATUS */}
      <div className="flex flex-col gap-3">
        <SectionTitle
          icon={
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#b5b5b5" strokeWidth="1.5">
              <path d="M1 1l22 22M16.72 11.06A10.94 10.94 0 0 1 19 12.55M5 12.55a10.94 10.94 0 0 1 5.17-2.39M10.71 5.05A16 16 0 0 1 22.56 9M1.42 9a15.91 15.91 0 0 1 4.7-2.88M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01" />
            </svg>
          }
          label="INTERNET STATUS"
        />
        <div className="bg-[#010d1c] border-[0.4px] border-solid border-[#385989] flex items-center justify-between px-[18px] py-3 w-full">
          <div className="flex items-center gap-[18px]">
            {/* Green dot */}
            <div className="size-[8px] rounded-full bg-[#38bf2b] shadow-[0_0_6px_rgba(56,191,43,0.6)]" />
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-[7px]">
                <span className="font-chamberi-headline font-semibold text-[#f0f0f0] text-[13px]">
                  {country.internetStatus}
                </span>
                <div
                  className="flex items-center justify-center h-[13px] px-1"
                  style={{ background: "rgba(255,170,0,0.5)", border: "0.4px solid #ffaa00" }}
                >
                  <span className="font-chamberi-headline font-semibold text-[#ffaa00] text-[8px]">
                    {country.anomalyPercent} anomaly
                  </span>
                </div>
                <div
                  className="flex items-center justify-center h-[13px] px-1"
                  style={{ background: "rgba(255,0,0,0.5)", border: "0.4px solid #ff3d3d" }}
                >
                  <span className="font-chamberi-headline font-semibold text-[#ff3d3d] text-[8px]">
                    {country.anomalyCount}
                  </span>
                </div>
              </div>
              <span className="font-chamberi-headline font-semibold text-[#9a9a9a] text-[9px]">Internet Connectivity</span>
            </div>
          </div>
          <span className="font-chamberi-headline font-semibold text-[#a4a4a4] text-[10px]">{country.internetCode}</span>
        </div>
      </div>

      {/* Separator */}
      <div className="w-full h-px bg-[#385989]/40" />

      {/* PASSEPORT */}
      <div className="flex flex-col gap-3">
        <SectionTitle
          icon={
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#b5b5b5" strokeWidth="1.5">
              <rect x="2" y="3" width="20" height="18" rx="2" />
              <circle cx="12" cy="11" r="3" />
              <path d="M7 21v-1a5 5 0 0 1 10 0v1" />
            </svg>
          }
          label="PASSEPORT"
        />
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-center gap-4">
            {/* Passport book — tilted */}
            <div className="shrink-0 -rotate-[3.8deg]">
              <img
                src={country.passportImage || "/images/passport-book.png"}
                alt="Passport"
                className="w-[72px] h-[90px] object-cover"
              />
            </div>
            {/* Plate */}
            <img src="/images/passport-plate.png" alt="Plate" className="w-[144px] h-[37px] object-cover" />
          </div>
          <p className="font-chamberi-headline font-semibold italic text-[#e8e8e8] text-[11px] leading-relaxed text-center">
            &ldquo;{country.passportQuote}&rdquo;
          </p>
        </div>
      </div>

      {/* ADVANTAGES & DISADVANTAGES */}
      <div className="flex items-start justify-between">
        {/* Advantages */}
        <div className="flex flex-col gap-3">
          <SectionTitle
            icon={
              <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                <path d="M6 0L11.196 9H0.804L6 0Z" fill="#38bf2b" />
              </svg>
            }
            label="ADVANTAGES"
          />
          <div className="flex flex-col gap-1.5">
            {country.advantages.map((adv, i) => (
              <div key={i} className="flex items-start gap-1.5">
                <span className="font-chamberi-headline font-bold text-[#804bd1] text-[14px] leading-none">•</span>
                <span className="font-chamberi-headline font-semibold text-[#f0f0f0] text-[11px] leading-relaxed max-w-[140px]">
                  {adv}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Disadvantages */}
        <div className="flex flex-col gap-3">
          <SectionTitle
            icon={
              <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                <path d="M6 10L0.804 1H11.196L6 10Z" fill="#ff3d3d" />
              </svg>
            }
            label="DISADVANTAGES"
          />
          <div className="flex flex-col gap-1.5">
            {country.disadvantages.map((dis, i) => (
              <div key={i} className="flex items-start gap-1.5">
                <span className="font-chamberi-headline font-bold text-[#804bd1] text-[14px] leading-none">•</span>
                <span className="font-chamberi-headline font-semibold text-[#f0f0f0] text-[11px] leading-relaxed max-w-[140px]">
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
