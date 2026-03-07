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

const EARTH_IMG = "/images/earth-blue-marble.jpg";
const BUMP_IMG = "/images/earth-topology.png";
const CLOUDS_IMG = "/images/earth-clouds.png";
const NIGHT_IMG = "/images/earth-night.jpg";
const CLOUDS_ALT = 0.004;
const CLOUDS_ROTATION_SPEED = -0.006;


interface WorldGlobeProps {
  onCountryClick?: (name: string, pos: { x: number; y: number }) => void;
}

export function WorldGlobe({ onCountryClick }: WorldGlobeProps) {
  const t = useTranslations("World");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const globeRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const starMeshRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cloudMeshRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const glowMeshRef = useRef<any>(null);
  const animFrameRef = useRef<number>(0);
  const setupDone = useRef(false);
  const [countries, setCountries] = useState<CountryFeature[]>([]);
  const [hoverD, setHoverD] = useState<CountryFeature | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const update = () =>
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    [EARTH_IMG, BUMP_IMG, CLOUDS_IMG, NIGHT_IMG].forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    fetch("/data/countries.geojson")
      .then((r) => r.json())
      .then((d) => setCountries(d.features));
  }, []);

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
    globe.pointOfView({ lat: 20, lng: 10, altitude: 2.2 }, 0);

    setIsLoaded(true);

    const scene = globe.scene();
    scene.background = null;

    import("three").then((THREE) => {
      const loader = new THREE.TextureLoader();

      // Better lighting
      // Remove default lights and add custom ones
      scene.children
        .filter((c: { type: string }) => c.type === "DirectionalLight" || c.type === "AmbientLight")
        .forEach((l: { intensity: number }) => { l.intensity = 0; });

      const ambientLight = new THREE.AmbientLight(0x334466, 1.2);
      scene.add(ambientLight);

      const sunLight = new THREE.DirectionalLight(0xfff5e6, 1.8);
      sunLight.position.set(-2, 0.5, 1.5);
      scene.add(sunLight);

      const fillLight = new THREE.DirectionalLight(0x4466aa, 0.4);
      fillLight.position.set(2, -1, -1);
      scene.add(fillLight);

      // Stars
      const starGeo = new THREE.SphereGeometry(1000, 32, 32);
      loader.load("/images/night-sky.png", (tex) => {
        const mat = new THREE.MeshBasicMaterial({
          map: tex,
          side: THREE.BackSide,
          transparent: true,
          opacity: 0.5,
        });
        const mesh = new THREE.Mesh(starGeo, mat);
        scene.add(mesh);
        starMeshRef.current = mesh;
      });

      // Clouds
      const cloudGeo = new THREE.SphereGeometry(
        globe.getGlobeRadius() * (1 + CLOUDS_ALT),
        40,
        40
      );
      loader.load(CLOUDS_IMG, (tex) => {
        const mat = new THREE.MeshPhongMaterial({
          map: tex,
          transparent: true,
          opacity: 1,
          depthWrite: false,
        });
        const mesh = new THREE.Mesh(cloudGeo, mat);
        scene.add(mesh);
        cloudMeshRef.current = mesh;
      });

      // Outer glow halo (fresnel-like)
      const glowRadius = globe.getGlobeRadius() * 1.15;
      const glowGeo = new THREE.SphereGeometry(glowRadius, 32, 32);
      const glowMat = new THREE.ShaderMaterial({
        uniforms: {
          glowColor: { value: new THREE.Color(0x6633cc) },
          viewVector: { value: new THREE.Vector3(0, 0, 1) },
        },
        vertexShader: `
          uniform vec3 viewVector;
          varying float intensity;
          void main() {
            vec3 vNormal = normalize(normalMatrix * normal);
            vec3 vNormel = normalize(normalMatrix * viewVector);
            intensity = pow(0.65 - dot(vNormal, vNormel), 3.0);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 glowColor;
          varying float intensity;
          void main() {
            vec3 glow = glowColor * intensity;
            gl_FragColor = vec4(glow, intensity * 0.6);
          }
        `,
        side: THREE.FrontSide,
        blending: THREE.AdditiveBlending,
        transparent: true,
        depthWrite: false,
      });
      const glowMesh = new THREE.Mesh(glowGeo, glowMat);
      scene.add(glowMesh);
      glowMeshRef.current = glowMesh;

      // Animate
      const animate = () => {
        if (starMeshRef.current) starMeshRef.current.rotation.y += 0.0001;
        if (cloudMeshRef.current)
          cloudMeshRef.current.rotation.y +=
            (CLOUDS_ROTATION_SPEED * Math.PI) / 180;

        // Update glow view vector from camera
        if (glowMeshRef.current && globe.camera()) {
          const cam = globe.camera();
          glowMeshRef.current.material.uniforms.viewVector.value =
            new THREE.Vector3().subVectors(cam.position, glowMeshRef.current.position);
        }

        animFrameRef.current = requestAnimationFrame(animate);
      };
      animate();
    });
  });

  useEffect(() => {
    return () => {
      cancelAnimationFrame(animFrameRef.current);
      [starMeshRef, cloudMeshRef, glowMeshRef].forEach((ref) => {
        if (ref.current) {
          ref.current.geometry?.dispose();
          ref.current.material?.dispose();
          ref.current = null;
        }
      });
    };
  }, []);

  const handlePolygonHover = useCallback((d: object | null) => {
    setHoverD(d as CountryFeature | null);
  }, []);

  const handlePolygonClick = useCallback((d: object, event: MouseEvent) => {
    const feature = d as CountryFeature;
    if (feature?.properties?.NAME && onCountryClick) {
      onCountryClick(feature.properties.NAME, { x: event.clientX, y: event.clientY });
    }
  }, [onCountryClick]);

  const w = dimensions.width || 1;
  const h = dimensions.height || 1;

  return (
    <>
      {/* Loading overlay */}
      <div
        className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#030912] transition-opacity duration-1000 ${isLoaded || !showLoading ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-[#C29FFF]/30 border-t-[#C29FFF] rounded-full animate-spin" />
          <p className="font-chamberi-headline text-[#868686] text-sm tracking-wider">
            {t("loading")}
          </p>
        </div>
      </div>

      <div className={`transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
        <GlobeGL
          ref={globeRef}
          width={w}
          height={h}
          globeImageUrl={EARTH_IMG}
          bumpImageUrl={BUMP_IMG}
          polygonsData={countries}
          polygonAltitude={(d) => (d === hoverD ? 0.035 : 0.005)}
          polygonCapColor={(d) =>
            d === hoverD
              ? "rgba(163, 102, 255, 0.45)"
              : "rgba(180, 180, 200, 0.05)"
          }
          polygonSideColor={(d) =>
            d === hoverD
              ? "rgba(163, 102, 255, 0.3)"
              : "rgba(163, 102, 255, 0.08)"
          }
          polygonStrokeColor={() => "rgba(163, 102, 255, 0.15)"}
          polygonLabel={(d: object) => {
            const feature = d as CountryFeature;
            return `
              <div style="
                background: rgba(4, 12, 23, 0.92);
                backdrop-filter: blur(16px);
                -webkit-backdrop-filter: blur(16px);
                border: 1px solid rgba(163, 102, 255, 0.3);
                padding: 10px 16px;
                color: #e6e6e6;
                font-size: 14px;
                font-weight: 600;
                letter-spacing: 0.05em;
                box-shadow: 0 8px 32px rgba(0,0,0,0.5), 0 0 20px rgba(163,102,255,0.1);
                pointer-events: none;
              ">
                <span style="color: #C29FFF; font-size: 10px; text-transform: uppercase; letter-spacing: 0.15em; display: block; margin-bottom: 3px;">
                  ${t("territory")}
                </span>
                ${feature.properties.NAME}
              </div>
            `;
          }}
          onPolygonClick={handlePolygonClick}
          onPolygonHover={handlePolygonHover}
          // Atmosphere
          atmosphereColor="rgba(80, 40, 160, 1)"
          atmosphereAltitude={0.2}
          animateIn={true}
        />
      </div>
    </>
  );
}
