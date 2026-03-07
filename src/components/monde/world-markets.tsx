"use client";

import { useState } from "react";

interface MarketIndex {
  name: string;
  region: string;
  value: string;
  change: number;
}

export const MOCK_INDICES: MarketIndex[] = [
  { name: "S&P 500", region: "US", value: "6,740,02", change: -1.88 },
  { name: "NASDAQ", region: "US", value: "22,387,68", change: -1.84 },
  { name: "Dow Jones", region: "US", value: "47,501,55", change: -2.54 },
  { name: "DAX", region: "EU", value: "23,591,03", change: -2.54 },
  { name: "FTSE 100", region: "UK", value: "10,284,75", change: -2.68 },
  { name: "Nikkei 225", region: "JP", value: "55,620,84", change: 0.62 },
];

function FinanceIcon({ size = 22, color = "#834BD6" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 21.7636 21.7636" fill="none">
      <path d="M4.5845 18.5897C4.12641 18.5897 3.73867 18.431 3.42128 18.1136C3.10389 17.7962 2.9452 17.4085 2.9452 16.9504V2.72036H4.30543V16.9504C4.30543 17.0202 4.33452 17.0841 4.39271 17.1422C4.45075 17.2004 4.51468 17.2295 4.5845 17.2295H18.8145V18.5897H4.5845ZM6.0667 15.6425V8.24855H8.78715V15.6425H6.0667ZM10.3741 15.6425V3.71445H13.0945V15.6425H10.3741ZM14.6815 15.6425V11.8758H17.4019V15.6425H14.6815Z" fill={color} />
    </svg>
  );
}

function TrendIcon({ up }: { up: boolean }) {
  if (up) {
    return (
      <svg width="17" height="18" viewBox="0 0 16.9273 18.1364" fill="none">
        <path d="M11.2877 4.94815V6.08167H13.3793L9.42005 10.2714L6.59884 7.24864L1.7661 12.4642L2.50932 13.2607L6.59884 8.87902L9.42005 11.9017L14.1089 6.87798V9.1044H15.1669V4.94815H11.2877Z" fill="#3DE656" />
      </svg>
    );
  }
  return (
    <svg width="17" height="18" viewBox="0 0 16.9273 18.1364" fill="none">
      <path d="M11.2877 13.262V12.1285H13.3793L9.42005 7.93881L6.59884 10.9615L1.7661 5.74601L2.50932 4.94952L6.59884 9.33116L9.42005 6.30843L14.1089 11.3322V9.10578H15.1669V13.262H11.2877Z" fill="#FF3D3D" />
    </svg>
  );
}

function RefreshIcon() {
  return (
    <svg width="18" height="14" viewBox="0 0 18.2486 13.2748" fill="none" className="cursor-pointer hover:opacity-70">
      <path d="M9.16712 23.5328C7.31478 23.5328 5.73836 22.8883 4.43786 21.5992C3.13721 20.3101 2.48689 18.7422 2.48689 16.8954V16.2267L0.902473 17.8111L0 16.9087L3.12922 13.7792L6.25843 16.9087L5.35596 17.8111L3.77155 16.2267V16.8954C3.77155 18.3832 4.29526 19.6473 5.34268 20.6877C6.39025 21.728 7.66506 22.2481 9.16712 22.2481C9.52183 22.2481 9.87618 22.2095 10.2302 22.1321C10.5843 22.0546 10.93 21.9385 11.2671 21.7837L12.2306 22.7472C11.7486 23.0063 11.2509 23.202 10.7376 23.3343C10.2242 23.4666 9.70068 23.5328 9.16712 23.5328ZM15.1194 20.0116L11.9902 16.8821L12.8926 15.9796L14.477 17.5641V16.8954C14.477 15.4076 13.9533 14.1435 12.9059 13.1031C11.8583 12.0628 10.5835 11.5426 9.08147 11.5426C8.72676 11.5426 8.37241 11.5813 8.01842 11.6587C7.66428 11.7362 7.31863 11.8523 6.98148 12.0071L6.01799 11.0436C6.50002 10.7845 6.99768 10.5888 7.51098 10.4565C8.02441 10.3241 8.54791 10.258 9.08147 10.258C10.9338 10.258 12.5102 10.9025 13.8107 12.1916C15.1114 13.4807 15.7617 15.0486 15.7617 16.8954V17.5641L17.3461 15.9796L18.2486 16.8821L15.1194 20.0116Z" fill="#969696" transform="translate(0,-10.258)" />
    </svg>
  );
}

function ChevronUpIcon({ open, onClick }: { open: boolean; onClick: () => void }) {
  return (
    <svg
      width="12"
      height="8"
      viewBox="0 0 12.091 7.2546"
      fill="none"
      className={`cursor-pointer hover:opacity-70 transition-transform duration-300 ${open ? "" : "rotate-180"}`}
      onClick={onClick}
    >
      <path d="M6.0455 0L12.091 6.115L10.9642 7.2546L6.0455 2.2795L1.1268 7.2546L0 6.115L6.0455 0Z" fill="#969696" />
    </svg>
  );
}

export function WorldMarkets() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className="fixed top-[230px] right-[70px] z-40 w-[320px] hidden lg:flex flex-col bg-[rgba(5,26,56,0.5)] border-[0.605px] border-solid overflow-hidden"
      style={{ borderImage: "linear-gradient(180deg, #385989 0%, #031022 100%) 1" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-5 pb-0">
        <div className="flex items-center gap-1.5">
          <FinanceIcon size={22} color="#834BD6" />
          <span className="font-chamberi-headline font-semibold text-[#f0f0f0] text-[18px]">
            MARKETS
          </span>
        </div>
        <div className="flex items-center gap-4">
          <RefreshIcon />
          <ChevronUpIcon open={isOpen} onClick={() => setIsOpen(!isOpen)} />
        </div>
      </div>

      {/* Separator */}
      <div className="w-full h-px bg-[#385989]/40 my-5" />

      {/* Content */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {/* Section label */}
        <div className="flex items-center gap-1 px-5 pb-3">
          <FinanceIcon size={15} color="#b5b5b5" />
          <span className="font-chamberi-headline font-bold text-[#b5b5b5] text-[10px]">
            INDICES
          </span>
        </div>

        {/* Indices list */}
        <div className="flex flex-col px-5 pb-5">
          {MOCK_INDICES.map((idx, i) => (
            <div key={idx.name}>
              <div className="flex items-center justify-between h-[33px]">
                <div className="flex items-center gap-1.5">
                  <span className="font-inter font-medium text-[#f0f0f0] text-[11px]">
                    {idx.name}
                  </span>
                  <div className="bg-[rgba(5,28,61,0.5)] border-[0.4px] border-solid border-[#31517e] flex items-center justify-center h-[16px] px-[5px]">
                    <span className="font-inter text-[#31517e] text-[6px]">
                      {idx.region}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-[6px]">
                  <span className="font-inter font-medium text-[#f0f0f0] text-[11px]">
                    {idx.value}
                  </span>
                  <TrendIcon up={idx.change > 0} />
                  <span
                    className={`font-inter text-[11px] ${
                      idx.change > 0 ? "text-[#3de656]" : "text-[#ff3d3d]"
                    }`}
                  >
                    {idx.change > 0 ? "+" : ""}
                    {idx.change.toFixed(2)}%
                  </span>
                </div>
              </div>
              {i < MOCK_INDICES.length - 1 && (
                <div className="w-full h-px bg-[#385989]/20" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
