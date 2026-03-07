"use client";

import { MOCK_INDICES } from "./world-markets";

interface Props {
  open: boolean;
  onClose: () => void;
}

function TrendIcon({ up }: { up: boolean }) {
  if (up) {
    return (
      <svg width="14" height="15" viewBox="0 0 16.9273 18.1364" fill="none">
        <path d="M11.2877 4.94815V6.08167H13.3793L9.42005 10.2714L6.59884 7.24864L1.7661 12.4642L2.50932 13.2607L6.59884 8.87902L9.42005 11.9017L14.1089 6.87798V9.1044H15.1669V4.94815H11.2877Z" fill="#3DE656" />
      </svg>
    );
  }
  return (
    <svg width="14" height="15" viewBox="0 0 16.9273 18.1364" fill="none">
      <path d="M11.2877 13.262V12.1285H13.3793L9.42005 7.93881L6.59884 10.9615L1.7661 5.74601L2.50932 4.94952L6.59884 9.33116L9.42005 6.30843L14.1089 11.3322V9.10578H15.1669V13.262H11.2877Z" fill="#FF3D3D" />
    </svg>
  );
}

export function WorldMobileMarkets({ open, onClose }: Props) {
  return (
    <div
      className={`fixed inset-0 z-[55] lg:hidden transition-opacity duration-300 ${
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      {/* Drawer */}
      <div
        className={`absolute bottom-0 left-0 right-0 max-h-[75vh] bg-[rgba(5,26,56,0.95)] border-t border-[#385989]/40 backdrop-blur-xl flex flex-col transition-transform duration-300 ${
          open ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 rounded-full bg-[#385989]/60" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 pb-3">
          <div className="flex items-center gap-2">
            <div className="bg-[#041732] border-[0.4px] border-solid border-[#31517e] flex items-center gap-1.5 px-3 py-1.5">
              <svg width="16" height="16" viewBox="0 0 21.7636 21.7636" fill="none">
                <path d="M4.5845 18.5897C4.12641 18.5897 3.73867 18.431 3.42128 18.1136C3.10389 17.7962 2.9452 17.4085 2.9452 16.9504V2.72036H4.30543V16.9504C4.30543 17.0202 4.33452 17.0841 4.39271 17.1422C4.45075 17.2004 4.51468 17.2295 4.5845 17.2295H18.8145V18.5897H4.5845ZM6.0667 15.6425V8.24855H8.78715V15.6425H6.0667ZM10.3741 15.6425V3.71445H13.0945V15.6425H10.3741ZM14.6815 15.6425V11.8758H17.4019V15.6425H14.6815Z" fill="#834BD6" />
              </svg>
              <span className="font-chamberi-headline font-semibold text-[#f0f0f0] text-[11px]">
                MARKETS
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

        {/* Separator */}
        <div className="w-full h-px bg-[#385989]/40" />

        {/* Section label */}
        <div className="flex items-center gap-1 px-5 pt-4 pb-2">
          <svg width="12" height="12" viewBox="0 0 21.7636 21.7636" fill="none">
            <path d="M4.5845 18.5897C4.12641 18.5897 3.73867 18.431 3.42128 18.1136C3.10389 17.7962 2.9452 17.4085 2.9452 16.9504V2.72036H4.30543V16.9504C4.30543 17.0202 4.33452 17.0841 4.39271 17.1422C4.45075 17.2004 4.51468 17.2295 4.5845 17.2295H18.8145V18.5897H4.5845ZM6.0667 15.6425V8.24855H8.78715V15.6425H6.0667ZM10.3741 15.6425V3.71445H13.0945V15.6425H10.3741ZM14.6815 15.6425V11.8758H17.4019V15.6425H14.6815Z" fill="#b5b5b5" />
          </svg>
          <span className="font-chamberi-headline font-bold text-[#b5b5b5] text-[9px]">
            INDICES
          </span>
        </div>

        {/* Indices list */}
        <div className="flex flex-col px-5 pb-5 overflow-y-auto scrollbar-hide">
          {MOCK_INDICES.map((idx, i) => (
            <div key={idx.name}>
              <div className="flex items-center justify-between h-[40px]">
                <div className="flex items-center gap-1.5">
                  <span className="font-inter font-medium text-[#f0f0f0] text-[12px]">
                    {idx.name}
                  </span>
                  <div className="bg-[rgba(5,28,61,0.5)] border-[0.4px] border-solid border-[#31517e] flex items-center justify-center h-[16px] px-[5px]">
                    <span className="font-inter text-[#31517e] text-[7px]">
                      {idx.region}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-[6px]">
                  <span className="font-inter font-medium text-[#f0f0f0] text-[12px]">
                    {idx.value}
                  </span>
                  <TrendIcon up={idx.change > 0} />
                  <span
                    className={`font-inter text-[12px] ${
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
