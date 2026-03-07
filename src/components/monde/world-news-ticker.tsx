"use client";

import { useRef, useState, useCallback, useEffect } from "react";

interface NewsItem {
  id: number;
  text: string;
  time: string;
}

const MOCK_NEWS: NewsItem[] = [
  { id: 1, text: "Gate de rang S détectée en Corée du Sud — Alerte mondiale", time: "3 min" },
  { id: 2, text: "Alliance Franco-Allemande renforcée après le sommet de Berlin", time: "11 min" },
  { id: 3, text: "Nouveau record : 15 Gates fermées en 24h par la Guilde Eclipse", time: "24 min" },
  { id: 4, text: "Tensions croissantes entre les Nations Unies et le Conseil des Hunters", time: "38 min" },
  { id: 5, text: "Découverte scientifique majeure : les Gates pourraient être prévisibles", time: "1h" },
  { id: 6, text: "Le marché mondial des ressources de Gate atteint un nouveau sommet", time: "2h" },
];

function WarningIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#f0f0f0" strokeWidth="1.5">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function GateIcon() {
  return (
    <svg width="15" height="12" viewBox="0 0 24 24" fill="none" stroke="#834bd6" strokeWidth="2">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  );
}

export function WorldNewsTicker() {
  const items = [...MOCK_NEWS, ...MOCK_NEWS];
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const animRef = useRef<number>(0);
  const [isDragging, setIsDragging] = useState(false);
  const pausedRef = useRef(false);
  const dragStart = useRef({ x: 0, offset: 0 });
  const pauseTimer = useRef<NodeJS.Timeout | null>(null);

  const getHalfWidth = useCallback(() => {
    if (!trackRef.current) return 1;
    return trackRef.current.scrollWidth / 2;
  }, []);

  const applyOffset = useCallback(() => {
    if (!trackRef.current) return;
    const half = getHalfWidth();
    // Wrap around
    if (offsetRef.current <= -half) offsetRef.current += half;
    if (offsetRef.current > 0) offsetRef.current -= half;
    trackRef.current.style.transform = `translateX(${offsetRef.current}px)`;
  }, [getHalfWidth]);

  // Auto-scroll loop
  useEffect(() => {
    const step = () => {
      if (!pausedRef.current) {
        offsetRef.current -= 0.5;
        applyOffset();
      }
      animRef.current = requestAnimationFrame(step);
    };
    animRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animRef.current);
  }, [applyOffset]);

  const scheduleResume = useCallback(() => {
    if (pauseTimer.current) clearTimeout(pauseTimer.current);
    pauseTimer.current = setTimeout(() => { pausedRef.current = false; }, 3000);
  }, []);

  // Mouse drag
  const onMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    pausedRef.current = true;
    dragStart.current = { x: e.clientX, offset: offsetRef.current };
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.current.x;
    offsetRef.current = dragStart.current.offset + dx;
    applyOffset();
  }, [isDragging, applyOffset]);

  const onMouseUp = useCallback(() => {
    setIsDragging(false);
    scheduleResume();
  }, [scheduleResume]);

  // Touch
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    pausedRef.current = true;
    dragStart.current = { x: e.touches[0].clientX, offset: offsetRef.current };
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    const dx = e.touches[0].clientX - dragStart.current.x;
    offsetRef.current = dragStart.current.offset + dx;
    applyOffset();
  }, [applyOffset]);

  const onTouchEnd = useCallback(() => {
    scheduleResume();
  }, [scheduleResume]);

  useEffect(() => {
    return () => { if (pauseTimer.current) clearTimeout(pauseTimer.current); };
  }, []);

  return (
    <div className="fixed top-[128px] left-0 right-0 z-40 flex items-stretch h-[35px]">
      {/* LATEST label */}
      <div className="bg-[#834bd6] flex items-center justify-between gap-2 px-2 lg:px-3 shrink-0">
        <WarningIcon />
        <span className="font-inter font-semibold text-[#f0f0f0] text-[9px] tracking-wider hidden sm:inline">
          LATEST
        </span>
      </div>

      {/* Scrolling news — draggable */}
      <div
        className="bg-[#020e20] border-t border-[#03142d] flex-1 overflow-hidden relative select-none"
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Gradient line at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-[rgba(131,75,214,0.5)] pointer-events-none" />

        <div ref={trackRef} className="flex items-center h-full w-max will-change-transform">
          {items.map((item, i) => (
            <div key={`${item.id}-${i}`} className="flex items-center gap-2.5 shrink-0 px-[15px]">
              <GateIcon />
              <div className="flex items-center gap-[7px]">
                <span className="font-inter font-medium text-[#a366ff] text-[10px] whitespace-nowrap">
                  {item.text}
                </span>
                <span className="font-chamberi-headline font-bold text-[#8a8a8a] text-[14px]">
                  •
                </span>
                <span className="font-inter font-medium text-[#8a8a8a] text-[9px] whitespace-nowrap">
                  {item.time} ago
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
