"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

type SplashScreenProps = {
  onComplete: () => void;
};

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [phase, setPhase] = useState<"icons" | "loading" | "fadeOut" | "logo" | "logoFadeOut" | "skipping" | "done">("icons");
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [logoOpacity, setLogoOpacity] = useState(0);
  const [circleRadius, setCircleRadius] = useState(0);
  const [skipOpacity, setSkipOpacity] = useState(1);
  const maxRadiusRef = useRef(3000);
  const circleStartedRef = useRef(false);

  // Calculate max radius on mount
  useEffect(() => {
    maxRadiusRef.current = Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2) * 1.2;
  }, []);

  useEffect(() => {
    const loadingStart = setTimeout(() => {
      setPhase("loading");
    }, 50);
    return () => clearTimeout(loadingStart);
  }, []);

  useEffect(() => {
    if (phase === "loading") {
      const duration = 500;
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        setLoadingProgress(progress * 100);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setTimeout(() => setPhase("fadeOut"), 100);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === "fadeOut") {
      const timer = setTimeout(() => setPhase("logo"), 600);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === "logo") {
      const duration = 400;
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        setLogoOpacity(1 - Math.pow(1 - progress, 2));

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setTimeout(() => setPhase("logoFadeOut"), 800);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === "logoFadeOut") {
      circleStartedRef.current = false;
      const logoDuration = 700;
      const circleStartAt = 300;
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const logoProgress = Math.min(elapsed / logoDuration, 1);

        // Logo fade out with ease out
        const logoEased = 1 - Math.pow(1 - logoProgress, 2);
        setLogoOpacity(1 - logoEased);

        // Start circle at 300ms
        if (elapsed >= circleStartAt && !circleStartedRef.current) {
          circleStartedRef.current = true;
          animateCircle();
        }

        if (logoProgress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [phase]);

  const animateCircle = () => {
    const duration = 1000;
    const startTime = Date.now();
    const maxRadius = maxRadiusRef.current;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease in-out cubic
      const eased = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      setCircleRadius(eased * maxRadius);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Animation terminée
        setTimeout(() => setPhase("done"), 50);
      }
    };
    requestAnimationFrame(animate);
  };

  // Handle skip animation
  useEffect(() => {
    if (phase === "skipping") {
      const duration = 500;
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out
        const eased = 1 - Math.pow(1 - progress, 2);
        setSkipOpacity(1 - eased);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setPhase("done");
        }
      };
      requestAnimationFrame(animate);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === "done") {
      onComplete();
    }
  }, [phase, onComplete]);

  if (phase === "done") return null;

  // Gradient mask for loading animation
  const horizontalMask = `linear-gradient(to right, black 0%, black ${Math.max(0, loadingProgress - 15)}%, transparent ${loadingProgress}%)`;

  // Icon positions in the original SVG (x start, width) - 5 icons
  // Total width: 757, each icon roughly 104px wide with gaps
  const iconPositions = [
    { x: 0, width: 91 },      // Icon 1: 0-91
    { x: 155, width: 96 },    // Icon 2: 155-251
    { x: 320, width: 91 },    // Icon 3: 320-411
    { x: 465, width: 96 },    // Icon 4: 465-561
    { x: 645, width: 112 },   // Icon 5: 645-757
  ];
  const svgWidth = 757;
  const svgHeight = 104;

  return (
    <div
      className="fixed inset-0 z-50 cursor-pointer"
      style={{ opacity: skipOpacity }}
      onClick={() => phase !== "skipping" && setPhase("skipping")}
    >
      {/* Dark background with expanding circle hole */}
      <div
        className="absolute inset-0 bg-[#030912]"
        style={circleRadius > 0 ? {
          maskImage: `radial-gradient(circle ${circleRadius}px at 50% 50%, transparent 0%, transparent 80%, black 100%)`,
          WebkitMaskImage: `radial-gradient(circle ${circleRadius}px at 50% 50%, transparent 0%, transparent 80%, black 100%)`,
        } : undefined}
      />

      {/* Icons */}
      <div
        className={`absolute inset-0 flex items-center justify-center px-4 transition-opacity duration-500 ${phase !== "icons" && phase !== "loading" ? "opacity-0" : "opacity-100"
          }`}
      >
        {/* Desktop - Horizontal */}
        <div className="hidden md:block w-full max-w-[757px]">
          <div className="relative w-full" style={{ aspectRatio: "757 / 104" }}>
            <div className="absolute inset-0" style={{ filter: "brightness(0) invert(1)" }}>
              <Image src="/icons-loading.svg" alt="" fill className="object-contain" priority />
            </div>
            <div
              className="absolute inset-0"
              style={{
                maskImage: horizontalMask,
                WebkitMaskImage: horizontalMask,
              }}
            >
              <Image src="/icons-loading.svg" alt="" fill className="object-contain" priority />
            </div>
          </div>
        </div>

        {/* Mobile - Vertical stack of clipped icons (scaled down) */}
        <div className="md:hidden flex flex-col items-center gap-4 py-8" style={{ transform: 'scale(0.7)', transformOrigin: 'center' }}>
          {iconPositions.map((icon, index) => {
            // Calculate which icons should be colored based on progress
            const iconProgress = (index + 1) / iconPositions.length * 100;
            const isColored = loadingProgress >= iconProgress - 20;
            const iconOpacity = isColored ? Math.min(1, (loadingProgress - (iconProgress - 20)) / 20) : 0;

            return (
              <div
                key={index}
                className="relative overflow-hidden"
                style={{
                  width: `${icon.width}px`,
                  height: `${svgHeight}px`,
                }}
              >
                {/* White silhouette */}
                <div
                  className="absolute"
                  style={{
                    width: `${svgWidth}px`,
                    height: `${svgHeight}px`,
                    left: `-${icon.x}px`,
                    filter: "brightness(0) invert(1)",
                  }}
                >
                  <Image src="/icons-loading.svg" alt="" fill className="object-contain object-left" priority />
                </div>
                {/* Colored layer */}
                <div
                  className="absolute"
                  style={{
                    width: `${svgWidth}px`,
                    height: `${svgHeight}px`,
                    left: `-${icon.x}px`,
                    opacity: iconOpacity,
                  }}
                >
                  <Image src="/icons-loading.svg" alt="" fill className="object-contain object-left" priority />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Logo */}
      <div
        className="absolute inset-0 flex items-center justify-center px-4"
        style={{ opacity: logoOpacity }}
      >
        <div className="w-full max-w-[300px] md:max-w-[500px]">
          <div className="relative w-full" style={{ aspectRatio: "1281 / 1244" }}>
            <Image src="/images/earth-leveling-logo.svg" alt="Earth Leveling" fill className="object-contain" priority />
          </div>
        </div>
      </div>
    </div>
  );
}
