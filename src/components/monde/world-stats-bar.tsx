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
}

export function WorldStatsBar({ onPulseClick }: WorldStatsBarProps) {
  const [gatesOpen, setGatesOpen] = useState(false);

  return (
    <div
      className="fixed top-[120px] left-4 lg:top-[178px] lg:left-1/2 lg:-translate-x-1/2 z-40 flex items-stretch bg-gradient-to-b from-[#051a38] to-[#031022] border-[0.781px] border-solid"
      style={{ borderImage: "linear-gradient(180deg, #385989 0%, #031022 100%) 1" }}
    >
      {/* Pulse section — mobile only */}
      <div
        className="flex items-center gap-1.5 px-2.5 py-[6px] cursor-pointer lg:hidden"
        onClick={onPulseClick}
      >
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#f0f0f0" strokeWidth="2">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
        <span className="font-chamberi-headline font-bold text-[#f0f0f0] text-[6px] leading-[1]">
          PULSE
        </span>
        <div className="size-[4px] rounded-full bg-[#ff3d3d] animate-pulse" />
        <svg width="10" height="10" viewBox="0 0 13 12" fill="none" className="opacity-40">
          <path d="M4.5 2L8.5 6L4.5 10" stroke="#e3e3e3" strokeWidth="1.2" />
        </svg>
      </div>

      {/* Separator — mobile only (same height as the other one) */}
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
