import React, { useMemo } from "react";
import { motion } from "framer-motion";

type ParticleKind =
  | "dust"
  | "leaves"
  | "bubbles"
  | "shimmer"
  | "embers"
  | "lights"
  | "steam"
  | "specks";

const KIND_BY_AMBIENCE: Record<string, ParticleKind> = {
  farm: "dust",
  harvest: "leaves",
  fermentation: "bubbles",
  drying: "shimmer",
  roast: "embers",
  city: "lights",
  barista: "steam",
  sip: "specks",
};

const COLOR_BY_KIND: Record<ParticleKind, string> = {
  dust: "#E9C681",
  leaves: "#8A5A3B",
  bubbles: "#F0E5D2",
  shimmer: "#FFE9A8",
  embers: "#E25822",
  lights: "#F5C97B",
  steam: "#FFFFFF",
  specks: "#D9A26A",
};

const seeded = (seed: number) => {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
};

interface ParticleSpec {
  left: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  rotate: number;
  opacity: number;
  startY: number;
}

export function ParticlesLayer({ ambience }: { ambience: string }) {
  const kind = KIND_BY_AMBIENCE[ambience] || "dust";
  const color = COLOR_BY_KIND[kind];

  const count = kind === "lights" ? 14 : kind === "steam" ? 10 : 18;

  const particles = useMemo<ParticleSpec[]>(() => {
    const rand = seeded(ambience.length * 17 + count);
    return Array.from({ length: count }).map(() => ({
      left: rand() * 100,
      size: 2 + rand() * 6,
      duration: 14 + rand() * 18,
      delay: -rand() * 20,
      drift: (rand() - 0.5) * 40,
      rotate: (rand() - 0.5) * 360,
      opacity: 0.12 + rand() * 0.18,
      startY: 50 + rand() * 60,
    }));
  }, [ambience, count]);

  const isFalling = kind === "leaves";

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p, i) => {
        const isLight = kind === "lights";
        const isShimmer = kind === "shimmer";
        const isSquare = kind === "leaves";

        if (isLight) {
          return (
            <motion.span
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${p.left}%`,
                top: `${20 + p.startY * 0.6}%`,
                width: p.size * 3,
                height: p.size * 3,
                backgroundColor: color,
                filter: "blur(8px)",
                opacity: p.opacity,
              }}
              animate={{ opacity: [p.opacity * 0.6, p.opacity, p.opacity * 0.6] }}
              transition={{ duration: 4, repeat: Infinity, delay: p.delay * 0.2 }}
            />
          );
        }

        if (isShimmer) {
          return (
            <motion.span
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${p.left}%`,
                top: `${p.startY}%`,
                width: p.size,
                height: p.size,
                backgroundColor: color,
                opacity: p.opacity,
              }}
              animate={{ opacity: [0, p.opacity, 0], scale: [0.5, 1.2, 0.5] }}
              transition={{ duration: 3 + (i % 3), repeat: Infinity, delay: p.delay * 0.1 }}
            />
          );
        }

        return (
          <motion.span
            key={i}
            className="absolute"
            style={{
              left: `${p.left}%`,
              top: isFalling ? "-5%" : "100%",
              width: p.size,
              height: p.size,
              backgroundColor: color,
              borderRadius: isSquare ? 1 : 9999,
              opacity: p.opacity,
              filter: kind === "steam" ? "blur(6px)" : kind === "embers" ? "blur(1.5px)" : "none",
            }}
            animate={
              isFalling
                ? {
                    y: ["-5vh", "120vh"],
                    x: [0, p.drift, -p.drift, 0],
                    rotate: [0, p.rotate],
                  }
                : {
                    y: ["0vh", "-130vh"],
                    x: [0, p.drift, -p.drift, 0],
                  }
            }
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "linear",
            }}
          />
        );
      })}
    </div>
  );
}
