"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface CountdownProps {
  targetDate?: Date | string;
  className?: string;
}

function CircularDecoration({
  size = 160,
  filledCount,
}: {
  size?: number;
  filledCount: number;
}) {
  const ticks = 30;
  const radius = size * 0.38;
  const center = size / 2;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter
          id="glow-strong"
          x="-200%"
          y="-200%"
          width="500%"
          height="500%"
        >
          <feFlood floodColor="#56B6E8" floodOpacity="0.8" result="color" />
          <feComposite in="color" in2="SourceGraphic" operator="in" result="colored" />
          <feGaussianBlur in="colored" stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter
          id="glow-soft"
          x="-200%"
          y="-200%"
          width="500%"
          height="500%"
        >
          <feFlood floodColor="#56B6E8" floodOpacity="0.5" result="color" />
          <feComposite in="color" in2="SourceGraphic" operator="in" result="colored" />
          <feGaussianBlur in="colored" stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter
          id="glow-idle"
          x="-200%"
          y="-200%"
          width="500%"
          height="500%"
        >
          <feGaussianBlur stdDeviation="1" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {Array.from({ length: ticks }).map((_, i) => {
        const angle = (i * 360) / ticks;
        const rad = (angle * Math.PI) / 180;
        const x = center + radius * Math.sin(rad);
        const y = center - radius * Math.cos(rad);
        const isLit = i < filledCount;
        const isHead = i === filledCount - 1;

        const w = isHead ? 6 : 5;
        const h = isHead ? 18 : 15;
        const r = isHead ? 3 : 2.5;

        return (
          <g key={i} transform={`rotate(${angle} ${x} ${y})`}>
            {isLit ? (
              <rect
                x={x - w / 2}
                y={y - h / 2}
                width={w}
                height={h}
                rx={r}
                fill="#ffffff"
                opacity={isHead ? 1 : 0.8}
                filter={isHead ? "url(#glow-strong)" : "url(#glow-soft)"}
              />
            ) : (
              <rect
                x={x - w / 2 + 0.5}
                y={y - h / 2 + 0.5}
                width={w - 1}
                height={h - 1}
                rx={Math.max(0, r - 0.5)}
                fill="none"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth={0.6}
                filter="url(#glow-idle)"
              />
            )}
          </g>
        );
      })}
    </svg>
  );
}

export function Countdown({ targetDate, className }: CountdownProps) {
  const target = useMemo(
    () => (targetDate ? new Date(targetDate).getTime() : null),
    [targetDate]
  );

  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  const [tick, setTick] = useState(0);

  useEffect(() => {
    const update = () => {
      const now = Date.now();
      setTick((Math.floor(now / 1000) % 30) + 1);

      if (target) {
        const diff = Math.max(0, target - now);
        const totalSeconds = Math.floor(diff / 1000);

        setTimeLeft({
          days: Math.floor(totalSeconds / 86400),
          hours: Math.floor((totalSeconds % 86400) / 3600),
          minutes: Math.floor((totalSeconds % 3600) / 60),
          seconds: totalSeconds % 60,
        });
      }
    };

    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [target]);

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <div
      className={cn(
        "relative flex flex-col items-center w-full",
        className
      )}
    >
      <div className="flex flex-col items-center gap-1 pt-[350px] sm:pt-[380px] pb-10">
        <h1 className="font-ghavettor text-[#dbdbdb] text-4xl sm:text-5xl md:text-6xl leading-none">
          Coming Soon
        </h1>
        <p className="font-caslon text-[#dbdbdb] text-[10px] sm:text-xs tracking-[3px] uppercase text-center">
          THE PAGE WILL BE AVAILABLE SOON!
        </p>
      </div>

      <div className="relative flex flex-col items-center gap-5 pb-24">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1282px] h-[763px] pointer-events-none opacity-50">
          <Image
            src="/images/cloud-6.png"
            alt=""
            fill
            className="object-contain"
          />
        </div>

        <div className="relative z-10 flex flex-col items-center gap-8 pb-12">
          <CircularDecoration filledCount={tick} />

          {target ? (
            <div className="flex items-center gap-3 sm:gap-5">
              {(
                [
                  { value: timeLeft?.days, label: "Days" },
                  { value: timeLeft?.hours, label: "Hours" },
                  { value: timeLeft?.minutes, label: "Min" },
                  { value: timeLeft?.seconds, label: "Sec" },
                ] as const
              ).map((unit, i) => (
                <div key={unit.label} className="flex items-center gap-3 sm:gap-5">
                  <div className="flex flex-col items-center gap-1">
                    <span className="font-caslon text-[#f0f0f0] text-2xl sm:text-[32px] tabular-nums leading-none">
                      {unit.value != null ? pad(unit.value) : "--"}
                    </span>
                    <span className="font-chamberi-headline text-[#9a9a9a] text-[9px] sm:text-[11px] uppercase tracking-[2px]">
                      {unit.label}
                    </span>
                  </div>
                  {i < 3 && (
                    <span className="font-caslon text-[#9a9a9a]/50 text-xl sm:text-2xl -mt-3">
                      :
                    </span>
                  )}
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
