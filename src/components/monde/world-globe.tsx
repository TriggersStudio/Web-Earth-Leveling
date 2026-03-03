"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";

const GlobeGL = dynamic(() => import("react-globe.gl"), { ssr: false });

interface CountryFeature {
  type: string;
  properties: {
    NAME: string;
    ISO_A2: string;
    POP_EST: number;
    [key: string]: unknown;
  };
  geometry: unknown;
}

const EARTH_IMG = "/images/earth-night.jpg";
const BUMP_IMG = "/images/earth-topology.png";
const STARS_IMG = "/images/night-sky.png";
const CLOUDS_IMG = "/images/earth-clouds.png";
const CLOUDS_ALT = 0.004;
const CLOUDS_ROTATION_SPEED = -0.006; // degrees per frame

export function WorldGlobe() {
  const t = useTranslations("World");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const globeRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const starMeshRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cloudMeshRef = useRef<any>(null);
  const animFrameRef = useRef<number>(0);
  const setupDone = useRef(false);
  const [countries, setCountries] = useState<CountryFeature[]>([]);
  const [hoverD, setHoverD] = useState<CountryFeature | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [showLoading, setShowLoading] = useState(true);

  // Auto-dismiss loading screen after 3s max (dev mode is slow due to Turbopack)
  useEffect(() => {
    const timer = setTimeout(() => setShowLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Responsive sizing
  useEffect(() => {
    const update = () =>
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Warm browser cache for textures (low-priority, after JS)
  useEffect(() => {
    [EARTH_IMG, BUMP_IMG, STARS_IMG, CLOUDS_IMG].forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Fetch country data
  useEffect(() => {
    fetch("/data/countries.geojson")
      .then((r) => r.json())
      .then((d) => setCountries(d.features));
  }, []);

  // Setup globe once ref is available
  useEffect(() => {
    const globe = globeRef.current;
    if (!globe || setupDone.current) return;
    setupDone.current = true;

    const controls = globe.controls();
    controls.autoRotate = false;
    controls.enableZoom = true;
    controls.minDistance = 140;
    controls.maxDistance = 500;
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    globe.pointOfView({ lat: 25, lng: 10, altitude: 2.2 }, 0);

    setIsLoaded(true);

    const scene = globe.scene();
    scene.background = null;

    import("three").then((THREE) => {
      const loader = new THREE.TextureLoader();

      // Stars
      const starGeo = new THREE.SphereGeometry(900, 64, 64);
      loader.load(STARS_IMG, (tex) => {
        const mat = new THREE.MeshBasicMaterial({
          map: tex,
          side: THREE.BackSide,
          transparent: true,
          opacity: 0.25,
        });
        const mesh = new THREE.Mesh(starGeo, mat);
        scene.add(mesh);
        starMeshRef.current = mesh;
      });

      // Clouds
      const cloudGeo = new THREE.SphereGeometry(
        globe.getGlobeRadius() * (1 + CLOUDS_ALT),
        75,
        75
      );
      loader.load(CLOUDS_IMG, (tex) => {
        const mat = new THREE.MeshPhongMaterial({
          map: tex,
          transparent: true,
          opacity: 0.8,
        });
        const mesh = new THREE.Mesh(cloudGeo, mat);
        scene.add(mesh);
        cloudMeshRef.current = mesh;
      });

      // Animate
      const animate = () => {
        if (starMeshRef.current) starMeshRef.current.rotation.y += 0.00015;
        if (cloudMeshRef.current)
          cloudMeshRef.current.rotation.y +=
            (CLOUDS_ROTATION_SPEED * Math.PI) / 180;
        animFrameRef.current = requestAnimationFrame(animate);
      };
      animate();
    });
  });

  // Cleanup
  useEffect(() => {
    return () => {
      cancelAnimationFrame(animFrameRef.current);
      [starMeshRef, cloudMeshRef].forEach((ref) => {
        if (ref.current) {
          ref.current.geometry.dispose();
          ref.current.material.dispose();
          ref.current = null;
        }
      });
    };
  }, []);

  const handlePolygonHover = useCallback((d: object | null) => {
    setHoverD(d as CountryFeature | null);
  }, []);

  const w = dimensions.width || 1;
  const h = dimensions.height || 1;

  return (
    <>
      {/* Loading overlay — hides when globe is ready OR after 3s max */}
      <div
        className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#030912] transition-opacity duration-1000 ${
          isLoaded || !showLoading ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-[#C29FFF]/30 border-t-[#C29FFF] rounded-full animate-spin" />
          <p className="font-chamberi-headline text-[#868686] text-sm tracking-wider">
            {t("loading")}
          </p>
        </div>
      </div>

      {/* Globe fades in independently */}
      <div className={`transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}>

      <GlobeGL
        ref={globeRef}
        width={w}
        height={h}
        globeImageUrl={EARTH_IMG}
        bumpImageUrl={BUMP_IMG}
        polygonsData={countries}
        polygonAltitude={(d) => (d === hoverD ? 0.04 : 0.006)}
        polygonCapColor={(d) =>
          d === hoverD
            ? "rgba(194, 159, 255, 0.35)"
            : "rgba(200, 200, 214, 0.06)"
        }
        polygonSideColor={() => "rgba(194, 159, 255, 0.15)"}
        polygonStrokeColor={() => "rgba(194, 159, 255, 0.2)"}
        polygonLabel={(d: object) => {
          const feature = d as CountryFeature;
          return `
            <div style="
              background: rgba(4, 12, 23, 0.92);
              backdrop-filter: blur(16px);
              -webkit-backdrop-filter: blur(16px);
              border: 1px solid rgba(194, 159, 255, 0.25);
              border-radius: 10px;
              padding: 10px 16px;
              color: #e6e6e6;
              font-size: 14px;
              font-weight: 600;
              letter-spacing: 0.05em;
              box-shadow: 0 8px 32px rgba(0,0,0,0.4);
              pointer-events: none;
            ">
              <span style="color: #C29FFF; font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; display: block; margin-bottom: 2px;">
                ${t("territory")}
              </span>
              ${feature.properties.NAME}
            </div>
          `;
        }}
        onPolygonHover={handlePolygonHover}
        atmosphereColor="rgba(100, 60, 180, 1)"
        atmosphereAltitude={0.18}
        animateIn={true}
      />
      </div>
    </>
  );
}
