"use client";

import { useState } from "react";

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
  layers: number;
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
    title: "Gate de rang S détectée à Séoul — Mobilisation mondiale des Hunters",
    description: "Une Gate de rang S vient d'apparaître dans le centre de Séoul. Les guildes internationales sont en alerte maximale.",
    severity: "HIGH",
    categories: ["GATES"],
    countryFlag: "🇰🇷",
    time: "12min",
    layers: 3,
  },
  {
    id: 2,
    title: "Alliance Franco-Allemande renforcée après le sommet de Berlin",
    description: "Les deux nations ont signé un accord de défense mutuelle contre les menaces de Gates transfrontalières.",
    severity: "MEDIUM",
    categories: ["POLITICS", "WAR"],
    countryFlag: "🇫🇷",
    time: "1h",
    layers: 3,
  },
  {
    id: 3,
    title: "Krach boursier à Tokyo suite à l'apparition de 5 Gates simultanées",
    description: "Les marchés asiatiques chutent de 8% après l'ouverture de Gates multiples sur l'archipel japonais.",
    severity: "MEDIUM",
    categories: ["STOCK MARKET"],
    countryFlag: "🇯🇵",
    time: "2h",
    layers: 3,
  },
];

function SeverityTag({ severity, small }: { severity: Severity; small?: boolean }) {
  const s = SEVERITY_STYLES[severity];
  return (
    <div
      className={`flex items-center justify-center ${small ? "h-[16px] px-1.5" : "h-[19px] px-3"}`}
      style={{ background: s.bg, border: `0.4px solid ${s.border}` }}
    >
      <span className={`font-inter ${small ? "text-[8px]" : "text-[9px]"}`} style={{ color: s.text }}>
        {severity}
      </span>
    </div>
  );
}

function CategoryTag({ category }: { category: Category }) {
  const s = CATEGORY_STYLES[category];
  return (
    <div
      className="flex items-center justify-center h-[17px] px-1.5"
      style={{ background: s.bg, border: `0.4px solid ${s.border}` }}
    >
      <span className="font-inter text-[8px]" style={{ color: s.text }}>
        {category}
      </span>
    </div>
  );
}

export function WorldPulseFeed() {
  const [activeFilters, setActiveFilters] = useState<Severity[]>([]);

  const toggleFilter = (s: Severity) => {
    setActiveFilters((prev) =>
      prev.includes(s) ? prev.filter((f) => f !== s) : [...prev, s]
    );
  };

  const filtered = activeFilters.length === 0
    ? MOCK_FEED
    : MOCK_FEED.filter((item) => activeFilters.includes(item.severity));

  return (
    <div
      className="fixed top-[230px] left-[70px] z-40 w-[320px] max-h-[calc(100vh-260px)] hidden lg:flex flex-col bg-[rgba(5,26,56,0.75)] border-[0.605px] border-solid overflow-hidden"
      style={{ borderImage: "linear-gradient(180deg, #385989 0%, #031022 100%) 1" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-0">
        <div className="flex items-center gap-1.5">
          <div className="bg-[#041732] border-[0.4px] border-solid border-[#31517e] flex items-center gap-1.5 px-3 py-2">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#f0f0f0" strokeWidth="2">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
            <span className="font-chamberi-headline font-semibold text-[#f0f0f0] text-[11px]">
              PULSE FEED
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3 h-[30px]">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#e3e3e3" strokeWidth="1.5" className="cursor-pointer hover:opacity-70">
            <path d="M1 4v6h6M23 20v-6h-6" />
            <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
          </svg>
          <div className="flex items-center gap-1 p-0.5">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#969696" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
            <span className="font-inter text-[#b5b5b5] text-[10px]">
              {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
          </div>
        </div>
      </div>

      {/* Separator */}
      <div className="w-full h-px bg-[#385989]/40 my-4" />

      {/* Filters + Search */}
      <div className="flex flex-col gap-2.5 px-4">
        <div className="flex items-center gap-2.5">
          {(["HIGH", "MEDIUM"] as Severity[]).map((s) => (
            <button key={s} onClick={() => toggleFilter(s)} className={`cursor-pointer transition-opacity ${activeFilters.includes(s) ? "opacity-100" : "opacity-60"}`}>
              <SeverityTag severity={s} />
            </button>
          ))}
        </div>
        <div className="flex items-center justify-between gap-2">
          <div className="bg-[#051c3d] border-[0.4px] border-solid border-[#31517e] rounded-[6px] flex items-center px-3 h-[34px] flex-1">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#5c5c5c" strokeWidth="1.5">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </div>
          <div className="bg-[#051c3d] border-[0.4px] border-solid border-[#31517e] rounded-[6px] flex items-center justify-center size-[34px] shrink-0">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#e3e3e3" strokeWidth="1.5">
              <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Feed items */}
      <div className="flex flex-col gap-2.5 p-4 overflow-y-auto scrollbar-hide">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-[#041732] border-[0.605px] border-solid border-[#31517e] flex flex-col gap-2.5 p-3"
          >
            {/* Header row */}
            <div className="flex items-start justify-between gap-2">
              <p className="font-inter font-medium text-[#f0f0f0] text-[11px] leading-normal flex-1">
                {item.title}
              </p>
              <SeverityTag severity={item.severity} small />
            </div>

            {/* Description */}
            <p className="font-inter text-[#b5b5b5] text-[10px] leading-normal">
              {item.description}
            </p>

            {/* Separator */}
            <div className="w-full h-px bg-[#31517e]/40" />

            {/* Categories + Footer */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {item.categories.map((cat) => (
                  <CategoryTag key={cat} category={cat} />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[14px]">{item.countryFlag}</span>
                <span className="font-inter text-[#a0a0a0] text-[10px]">{item.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
