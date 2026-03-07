"use client";


type Severity = "HIGH" | "MEDIUM" | "LOW";
type Category = "GATES" | "POLITICS" | "WAR" | "STOCK MARKET" | "ECONOMY" | "SCIENCE";

interface FeedItem {
  id: number;
  title: string;
  description: string;
  severity: Severity;
  categories: Category[];
  countryFlag: string;
  time: string;
}

const SEVERITY_STYLES: Record<Severity, { bg: string; border: string; text: string }> = {
  HIGH: { bg: "rgba(255,0,0,0.5)", border: "#ff3d3d", text: "#ff3d3d" },
  MEDIUM: { bg: "rgba(255,170,0,0.5)", border: "#ffaa00", text: "#ffaa00" },
  LOW: { bg: "rgba(56,191,43,0.5)", border: "#38bf2b", text: "#38bf2b" },
};

const CATEGORY_STYLES: Record<Category, { bg: string; border: string; text: string }> = {
  GATES: { bg: "rgba(131,75,214,0.5)", border: "#834bd6", text: "#834bd6" },
  POLITICS: { bg: "rgba(86,203,235,0.5)", border: "#56cbeb", text: "#56cbeb" },
  WAR: { bg: "rgba(217,99,15,0.5)", border: "#d9630f", text: "#d9630f" },
  "STOCK MARKET": { bg: "rgba(56,191,43,0.5)", border: "#38bf2b", text: "#38bf2b" },
  ECONOMY: { bg: "rgba(255,170,0,0.5)", border: "#ffaa00", text: "#ffaa00" },
  SCIENCE: { bg: "rgba(86,203,235,0.5)", border: "#56cbeb", text: "#56cbeb" },
};

const MOCK_FEED: FeedItem[] = [
  {
    id: 1,
    title: "S-Rank Gate detected in Seoul — Worldwide Hunter mobilization",
    description: "An S-Rank Gate has appeared in central Seoul. International guilds are on maximum alert.",
    severity: "HIGH",
    categories: ["GATES"],
    countryFlag: "\u{1F1F0}\u{1F1F7}",
    time: "12min",
  },
  {
    id: 2,
    title: "Franco-German Alliance strengthened after Berlin summit",
    description: "Both nations signed a mutual defense pact against cross-border Gate threats.",
    severity: "MEDIUM",
    categories: ["POLITICS", "WAR"],
    countryFlag: "\u{1F1EB}\u{1F1F7}",
    time: "1h",
  },
  {
    id: 3,
    title: "Stock market crash in Tokyo after 5 simultaneous Gates appear",
    description: "Asian markets plunge 8% following the opening of multiple Gates across the Japanese archipelago.",
    severity: "MEDIUM",
    categories: ["STOCK MARKET"],
    countryFlag: "\u{1F1EF}\u{1F1F5}",
    time: "2h",
  },
];

interface MobilePulseFeedProps {
  open: boolean;
  onClose: () => void;
}

export function WorldMobilePulseFeed({ open, onClose }: MobilePulseFeedProps) {
  if (!open) return null;

  return (
    <div className="lg:hidden">
      {/* Drawer */}
      {open && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40" onClick={() => onClose()} />

          {/* Sheet */}
          <div className="absolute inset-x-0 bottom-0 bg-[rgba(5,26,56,0.95)] backdrop-blur-md border-t border-[#385989]/60 flex flex-col max-h-[80vh] animate-slide-up">
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 rounded-full bg-[#385989]/60" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-5 pb-3">
              <div className="flex items-center gap-2">
                <div className="bg-[#041732] border-[0.4px] border-solid border-[#31517e] flex items-center gap-1.5 px-3 py-1.5">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#f0f0f0" strokeWidth="2">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                  <span className="font-chamberi-headline font-semibold text-[#f0f0f0] text-[11px]">
                    PULSE FEED
                  </span>
                </div>
              </div>
              <button
                onClick={() => onClose()}
                className="border border-[#385989]/40 flex items-center justify-center size-[30px] hover:bg-white/5 transition-colors cursor-pointer"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#e3e3e3" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Separator */}
            <div className="w-full h-px bg-[#385989]/40" />

            {/* Feed items */}
            <div className="flex flex-col gap-3 p-4 overflow-y-auto scrollbar-hide">
              {MOCK_FEED.map((item) => {
                const ss = SEVERITY_STYLES[item.severity];
                return (
                  <div
                    key={item.id}
                    className="bg-[#041732] border-[0.4px] border-solid border-[#31517e] flex flex-col gap-2.5 p-3"
                  >
                    {/* Title + severity */}
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-chamberi-headline font-semibold text-[#f0f0f0] text-[12px] leading-normal flex-1">
                        {item.title}
                      </p>
                      <div
                        className="flex items-center justify-center h-[16px] px-2 shrink-0"
                        style={{ background: ss.bg, border: `0.4px solid ${ss.border}` }}
                      >
                        <span className="font-inter text-[8px]" style={{ color: ss.text }}>
                          {item.severity}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="font-inter text-[#b5b5b5] text-[11px] leading-normal">
                      {item.description}
                    </p>

                    {/* Separator */}
                    <div className="w-full h-px bg-[#31517e]/40" />

                    {/* Categories + footer */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {item.categories.map((cat) => {
                          const cs = CATEGORY_STYLES[cat];
                          return (
                            <div
                              key={cat}
                              className="flex items-center justify-center h-[16px] px-1.5"
                              style={{ background: cs.bg, border: `0.4px solid ${cs.border}` }}
                            >
                              <span className="font-inter text-[8px]" style={{ color: cs.text }}>
                                {cat}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[14px]">{item.countryFlag}</span>
                        <span className="font-inter text-[#a0a0a0] text-[10px]">{item.time}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
