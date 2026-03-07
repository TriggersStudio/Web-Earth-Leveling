"use client";

export interface CountryData {
  name: string;
  flag: string;
  iso: string;
  tension: "HIGH" | "MEDIUM" | "LOW" | "NONE";
  headOfState: string;
  headOfGov: string;
  government: string;
  population: string;
  capital: string;
  currency: string;
  internetStatus: string;
  internetCode: string;
  anomalyPercent: string;
  anomalyCount: number;
  passportColors: [string, string];
  passportImage?: string;
  passportQuote: string;
  advantages: string[];
  disadvantages: string[];
  recentEvents: { text: string; severity: "HIGH" | "MEDIUM" | "LOW" }[];
}

// Mock country data
export const MOCK_COUNTRIES: Record<string, CountryData> = {
  France: {
    name: "France",
    flag: "🇫🇷",
    iso: "FR",
    tension: "MEDIUM",
    headOfState: "Joueur_Alpha",
    headOfGov: "Joueur_Beta",
    government: "Republic",
    population: "67.4M",
    capital: "Paris",
    currency: "€ Euro",
    internetStatus: "Connected",
    internetCode: "FR_1",
    anomalyPercent: "3.31%",
    anomalyCount: 3,
    passportColors: ["#002395", "#ED2939"],
    passportImage: "/images/passport-france.png",
    passportQuote: "Strength through unity. Protection through the Republic.",
    advantages: [
      "Luxury goods generate +20% export value and increased trade income.",
      "Research facilities produce +15% faster technology development.",
      "Aircraft, ground and aerial systems are produced 15% faster and have extended range.",
    ],
    disadvantages: [
      "National projects and infrastructures take 15% longer to deploy.",
      "Industrial buildings have higher operational costs.",
    ],
    recentEvents: [
      { text: "Gate de rang B apparue à Lyon — Guilde Éclipse mobilisée", severity: "MEDIUM" },
      { text: "Signature du traité de défense Franco-Allemand", severity: "LOW" },
      { text: "Anomalie réseau détectée dans le sud — Enquête en cours", severity: "MEDIUM" },
    ],
  },
  "South Korea": {
    name: "South Korea",
    flag: "🇰🇷",
    iso: "KR",
    tension: "HIGH",
    headOfState: "Hunter_Moon",
    headOfGov: "Guild_Master_K",
    government: "Republic",
    population: "51.7M",
    capital: "Seoul",
    currency: "₩ Won",
    internetStatus: "Connected",
    internetCode: "KR_1",
    anomalyPercent: "12.8%",
    anomalyCount: 7,
    passportColors: ["#FFFFFF", "#C60C30"],
    passportQuote: "La nation qui a donné naissance aux Hunters les plus puissants du monde.",
    advantages: [
      "Plus grande concentration de Hunters S-Rank",
      "Technologie de détection de Gates avancée",
      "Économie résiliente post-Gates",
    ],
    disadvantages: [
      "Cible prioritaire des Gates de haut rang",
      "Tensions avec la Corée du Nord",
      "Surpopulation des zones sûres",
    ],
    recentEvents: [
      { text: "Gate S-Rank détectée au centre de Séoul — Alerte mondiale", severity: "HIGH" },
      { text: "La guilde Ahjin mobilise 200 Hunters d'élite", severity: "HIGH" },
      { text: "Évacuation massive du district de Gangnam", severity: "MEDIUM" },
    ],
  },
};

const TENSION_STYLES = {
  HIGH: { bg: "rgba(255,0,0,0.5)", border: "#ff3d3d", text: "#ff3d3d" },
  MEDIUM: { bg: "rgba(255,170,0,0.5)", border: "#ffaa00", text: "#ffaa00" },
  LOW: { bg: "rgba(56,191,43,0.5)", border: "#38bf2b", text: "#38bf2b" },
  NONE: { bg: "rgba(100,100,100,0.5)", border: "#666", text: "#666" },
};

interface Props {
  country: CountryData;
  onClose: () => void;
  onViewDetails: () => void;
  position: { x: number; y: number };
}

export function WorldCountryEvents({ country, onClose, onViewDetails, position }: Props) {
  const ts = TENSION_STYLES[country.tension];

  // Clamp position so modal stays visible
  const modalW = 334;
  const modalH = 380;
  const x = Math.min(Math.max(position.x - modalW / 2, 10), window.innerWidth - modalW - 10);
  const y = Math.min(Math.max(position.y - modalH / 2, 70), window.innerHeight - modalH - 50);

  return (
    <div
      className="fixed z-50 w-[334px] bg-[rgba(5,26,56,0.85)] backdrop-blur-sm hidden lg:flex flex-col gap-5 p-5 overflow-hidden border-[0.4px] border-solid"
      style={{
        left: x,
        top: y,
        borderImage: "linear-gradient(180deg, #385989 0%, #031022 100%) 1",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          <div className="flex items-center gap-2">
            <span className="text-[20px]">{country.flag}</span>
            <span className="font-chamberi-headline font-semibold text-[#f0f0f0] text-[19px]">
              {country.name}
            </span>
          </div>
          <div
            className="flex items-center justify-center h-[15px] px-2"
            style={{ background: ts.bg, border: `0.4px solid ${ts.border}` }}
          >
            <span className="font-inter text-[7px]" style={{ color: ts.text }}>
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

      {/* Recent Events */}
      <div className="flex flex-col gap-3.5">
        <span className="font-chamberi-headline font-extrabold text-[#b5b5b5] text-[11px]">
          RECENT EVENTS
        </span>
        <div className="flex flex-col gap-[7px]">
          {country.recentEvents.map((event, i) => {
            const es = TENSION_STYLES[event.severity];
            return (
              <div
                key={i}
                className="bg-[rgba(1,13,28,0.5)] border-[0.685px] border-solid border-[#385989] flex items-center justify-between p-[11px] h-[49px]"
              >
                <p className="font-inter text-[#f0f0f0] text-[10px] leading-relaxed max-w-[200px]">
                  {event.text}
                </p>
                <div
                  className="flex items-center justify-center h-[15px] px-2 shrink-0"
                  style={{ background: es.bg, border: `0.4px solid ${es.border}` }}
                >
                  <span className="font-inter text-[7px]" style={{ color: es.text }}>
                    {event.severity}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* View Full Details */}
      <button
        onClick={onViewDetails}
        className="bg-[rgba(131,75,214,0.5)] border-[0.4px] border-solid border-[#a366ff] flex items-center justify-between h-[36px] px-2 cursor-pointer hover:bg-[rgba(131,75,214,0.65)] transition-colors"
      >
        <div className="flex items-center gap-[7px]">
          <span className="font-inter font-medium text-[#a366ff] text-[10px]">
            VIEW FULL DETAILS
          </span>
          <svg width="4" height="7" viewBox="0 0 4 7" fill="none">
            <path d="M0.5 0.5L3.5 3.5L0.5 6.5" stroke="#a366ff" strokeWidth="0.8" />
          </svg>
        </div>
      </button>
    </div>
  );
}
