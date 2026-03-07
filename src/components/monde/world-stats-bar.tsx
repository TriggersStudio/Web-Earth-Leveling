"use client";

import { useState } from "react";

interface GateRank {
  rank: string;
  count: number;
}

const MOCK_GATES: GateRank[] = [
  { rank: "S", count: 2 },
  { rank: "A", count: 32 },
  { rank: "B", count: 25 },
  { rank: "C", count: 29 },
  { rank: "D", count: 42 },
  { rank: "E", count: 59 },
];

const MOCK_TOTAL_GATES = 70;
const MOCK_TENSIONS = 24;

function StatBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-[1px] lg:gap-[2px]">
      <p className="font-chamberi-headline font-bold text-[#f0f0f0] text-[12px] lg:text-[23px] leading-[1]">
        {value}
      </p>
      <p className="font-chamberi-headline text-[#b0b0b0] text-[6px] lg:text-[8px] leading-[1]">
        {label}
      </p>
    </div>
  );
}

function RankStatBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-[1px] lg:gap-[2px]">
      <p className="font-chamberi-headline font-bold text-[#f0f0f0] text-[12px] lg:text-[23px] leading-[1]">
        {value}
      </p>
      <p className="font-chamberi-headline text-[#b0b0b0] text-[6px] lg:text-[8px] leading-[1]">
        {label}
      </p>
    </div>
  );
}

interface WorldStatsBarProps {
  onPulseClick?: () => void;
  onMarketsClick?: () => void;
}

export function WorldStatsBar({ onPulseClick, onMarketsClick }: WorldStatsBarProps) {
  const [gatesOpen, setGatesOpen] = useState(false);

  return (
    <div
      className="fixed top-[168px] left-4 lg:top-[178px] lg:left-1/2 lg:-translate-x-1/2 z-40 flex items-stretch bg-gradient-to-b from-[#051a38] to-[#031022] border-[0.781px] border-solid"
      style={{ borderImage: "linear-gradient(180deg, #385989 0%, #031022 100%) 1" }}
    >
      {/* Pulse + Markets buttons — mobile only, stacked */}
      <div className="flex flex-col justify-center lg:hidden">
        <div
          className="flex items-center gap-1.5 px-2.5 py-[4px] cursor-pointer"
          onClick={onPulseClick}
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#f0f0f0" strokeWidth="2">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
          <span className="font-chamberi-headline font-bold text-[#f0f0f0] text-[6px] leading-[1]">
            PULSE
          </span>
          <div className="size-[4px] rounded-full bg-[#ff3d3d] animate-pulse" />
          <svg width="8" height="8" viewBox="0 0 13 12" fill="none" className="opacity-40">
            <path d="M4.5 2L8.5 6L4.5 10" stroke="#e3e3e3" strokeWidth="1.2" />
          </svg>
        </div>
        <div
          className="flex items-center gap-1.5 px-2.5 py-[4px] cursor-pointer"
          onClick={onMarketsClick}
        >
          <svg width="11" height="11" viewBox="0 0 21.7636 21.7636" fill="none">
            <path d="M4.5845 18.5897C4.12641 18.5897 3.73867 18.431 3.42128 18.1136C3.10389 17.7962 2.9452 17.4085 2.9452 16.9504V2.72036H4.30543V16.9504C4.30543 17.0202 4.33452 17.0841 4.39271 17.1422C4.45075 17.2004 4.51468 17.2295 4.5845 17.2295H18.8145V18.5897H4.5845ZM6.0667 15.6425V8.24855H8.78715V15.6425H6.0667ZM10.3741 15.6425V3.71445H13.0945V15.6425H10.3741ZM14.6815 15.6425V11.8758H17.4019V15.6425H14.6815Z" fill="#834BD6" />
          </svg>
          <span className="font-chamberi-headline font-bold text-[#f0f0f0] text-[6px] leading-[1]">
            MARKETS
          </span>
          <svg width="8" height="8" viewBox="0 0 13 12" fill="none" className="opacity-40">
            <path d="M4.5 2L8.5 6L4.5 10" stroke="#e3e3e3" strokeWidth="1.2" />
          </svg>
        </div>
      </div>

      {/* Separator — mobile only */}
      <div className="w-px self-center h-[12px] bg-[#385989] lg:hidden" />

      {/* Gates section */}
      <div
        className="flex items-center justify-center px-2.5 lg:px-[31px] py-[6px] lg:py-[11px] cursor-pointer select-none"
        onClick={() => setGatesOpen(!gatesOpen)}
      >
        <StatBlock value={MOCK_TOTAL_GATES} label="GATES" />

        {/* Chevron */}
        <svg
          width="10"
          height="10"
          viewBox="0 0 13 12"
          fill="none"
          className={`opacity-40 transition-transform duration-300 shrink-0 ml-1.5 lg:ml-[11px] lg:w-[13px] lg:h-[12px] ${gatesOpen ? "rotate-180" : ""}`}
        >
          <path d="M4.5 2L8.5 6L4.5 10" stroke="#e3e3e3" strokeWidth="1.2" />
        </svg>

        {/* Ranks — animated */}
        <div
          className={`flex items-center gap-[8px] lg:gap-[17px] overflow-hidden transition-all duration-300 ease-in-out ${
            gatesOpen ? "max-w-[700px] opacity-100 ml-[8px] lg:ml-[17px]" : "max-w-0 opacity-0 ml-0"
          }`}
        >
          {MOCK_GATES.map((gate, i) => (
            <div key={gate.rank} className="flex items-center gap-[8px] lg:gap-[17px] shrink-0">
              <RankStatBlock value={gate.count} label={`RANK ${gate.rank}`} />
              {i < MOCK_GATES.length - 1 && (
                <span className="font-chamberi-headline font-bold text-[#b0b0b0] text-[6px] lg:text-[8px]">
                  •
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Vertical separator */}
      <div className="w-px self-center h-[12px] lg:h-[19px] bg-[#385989]" />

      {/* Tensions section — same px as gates on desktop */}
      <div className="flex items-center justify-center px-2.5 lg:px-[31px] py-[6px] lg:py-[11px]">
        <StatBlock value={MOCK_TENSIONS} label="TENSIONS" />
      </div>

    </div>
  );
}
