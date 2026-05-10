"use client";
import { useEffect, useRef } from "react";

interface Planet {
  name: string;
  scrollAt: number; // scrollY at which this planet is closest / largest
  x: number;        // % from left edge of viewport
  y: number;        // % from top of viewport when at scrollAt
  size: number;     // diameter in px at scale 1
  bg: string;
  glow: string;
  rings?: boolean;
  sun?: boolean;
}

const PLANETS: Planet[] = [
  {
    name: "Sun",
    scrollAt: -80,
    x: 80,
    y: 26,
    size: 260,
    bg: "radial-gradient(circle at 38% 34%, #fff7ed, #fbbf24 22%, #f97316 52%, #c2410c 78%, #7c2d12 100%)",
    glow: "rgba(251,191,36,0.55)",
    sun: true,
  },
  {
    name: "Mercury",
    scrollAt: 300,
    x: 20,
    y: 60,
    size: 36,
    bg: "radial-gradient(circle at 35% 30%, #e5e7eb, #9ca3af 50%, #6b7280 80%, #374151 100%)",
    glow: "rgba(107,114,128,0.22)",
  },
  {
    name: "Venus",
    scrollAt: 560,
    x: 77,
    y: 52,
    size: 66,
    bg: "radial-gradient(circle at 35% 30%, #fef9c3, #fde68a 35%, #f59e0b 65%, #b45309 100%)",
    glow: "rgba(245,158,11,0.32)",
  },
  {
    name: "Earth",
    scrollAt: 820,
    x: 17,
    y: 44,
    size: 72,
    bg: "radial-gradient(circle at 35% 28%, #e0f2fe, #3b82f6 20%, #1d4ed8 46%, #166534 60%, #1e40af 76%, #0f172a 100%)",
    glow: "rgba(59,130,246,0.38)",
  },
  {
    name: "Mars",
    scrollAt: 1080,
    x: 75,
    y: 62,
    size: 52,
    bg: "radial-gradient(circle at 32% 28%, #fecaca, #ef4444 36%, #dc2626 60%, #7f1d1d 100%)",
    glow: "rgba(220,38,38,0.28)",
  },
  {
    name: "Jupiter",
    scrollAt: 1360,
    x: 18,
    y: 40,
    size: 190,
    bg: "repeating-linear-gradient(to bottom, #d97706 0%, #b45309 11%, #fbbf24 23%, #92400e 35%, #d97706 47%, #f59e0b 59%, #b45309 71%, #d97706 83%, #fbbf24 100%)",
    glow: "rgba(217,119,6,0.32)",
  },
  {
    name: "Saturn",
    scrollAt: 1640,
    x: 74,
    y: 48,
    size: 140,
    bg: "repeating-linear-gradient(to bottom, #ca8a04 0%, #a16207 17%, #d97706 33%, #92400e 49%, #ca8a04 64%, #fbbf24 79%, #a16207 91%, #ca8a04 100%)",
    glow: "rgba(202,138,4,0.28)",
    rings: true,
  },
  {
    name: "Neptune",
    scrollAt: 1920,
    x: 24,
    y: 54,
    size: 95,
    bg: "radial-gradient(circle at 35% 30%, #bfdbfe, #3b82f6 18%, #1d4ed8 42%, #1e3a8a 64%, #0c1445 100%)",
    glow: "rgba(59,130,246,0.42)",
  },
];

const RANGE = 700; // px of scroll over which a planet fades in/out

export default function SolarSystem() {
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let rafId: number;

    function update() {
      const scrollY = window.scrollY;

      for (let i = 0; i < PLANETS.length; i++) {
        const el = refs.current[i];
        if (!el) continue;

        const delta = scrollY - PLANETS[i].scrollAt;
        const dist = Math.abs(delta);

        if (dist > RANGE * 1.5) {
          el.style.opacity = "0";
          continue;
        }

        const opacity = Math.max(0, 1 - dist / RANGE);
        const scale = Math.max(0.05, 1 - (dist / RANGE) * 0.9);
        // Planet moves upward as you scroll down past it (flyby)
        const yShift = -delta * 0.42;

        el.style.opacity = String(opacity);
        el.style.transform = `translate(-50%, -50%) translateY(${yShift}px) scale(${scale})`;
      }
    }

    function onScroll() {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
    >
      {PLANETS.map((p, i) => {
        const ringBorder = Math.round(p.size * 0.07);

        return (
          <div
            key={p.name}
            ref={(el) => { refs.current[i] = el; }}
            style={{
              position: "absolute",
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: 0,
              willChange: "transform, opacity",
            }}
          >
            {/* Atmospheric glow */}
            <div
              style={{
                position: "absolute",
                inset: `-${p.size * 0.48}px`,
                borderRadius: "50%",
                background: `radial-gradient(circle, ${p.glow} 0%, transparent 68%)`,
              }}
            />

            {/* Back ring (behind planet sphere) */}
            {p.rings && (
              <div
                style={{
                  position: "absolute",
                  width: "268%",
                  height: "32%",
                  top: "34%",
                  left: "-84%",
                  border: `${ringBorder}px solid rgba(170,130,50,0.42)`,
                  borderRadius: "50%",
                  zIndex: 0,
                }}
              />
            )}

            {/* Planet sphere */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                overflow: "hidden",
                background: p.bg,
                boxShadow: `inset -${p.size * 0.18}px -${p.size * 0.12}px ${p.size * 0.32}px rgba(0,0,0,0.76)`,
                zIndex: 1,
              }}
            >
              {/* Sphere lighting */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "radial-gradient(circle at 32% 30%, rgba(255,255,255,0.11) 0%, transparent 44%, rgba(0,0,0,0.52) 100%)",
                }}
              />
            </div>

            {/* Front ring (in front of planet, bottom half only) */}
            {p.rings && (
              <div
                style={{
                  position: "absolute",
                  width: "268%",
                  height: "32%",
                  top: "34%",
                  left: "-84%",
                  border: `${ringBorder}px solid rgba(210,165,70,0.65)`,
                  borderRadius: "50%",
                  clipPath: "inset(50% 0 0 0)",
                  zIndex: 2,
                }}
              />
            )}

            {/* Sun corona pulse */}
            {p.sun && (
              <div
                className="animate-pulse"
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, rgba(251,191,36,0.14) 38%, rgba(249,115,22,0.06) 65%, transparent 100%)",
                  transform: "scale(1.5)",
                  zIndex: 3,
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
