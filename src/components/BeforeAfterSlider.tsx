import React, { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";

export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeLabel = "Antes",
  afterLabel = "Depois",
  accentColor,
}: {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel?: string;
  afterLabel?: string;
  accentColor: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.max(0, Math.min(100, pct)));
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    (e.target as Element).setPointerCapture(e.pointerId);
    updateFromClientX(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    updateFromClientX(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    try {
      (e.target as Element).releasePointerCapture(e.pointerId);
    } catch {}
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.2 }}
      className="w-full max-w-3xl mx-auto my-16"
    >
      <p
        className="text-center text-xs uppercase tracking-[0.3em] font-sans mb-6"
        style={{ color: accentColor }}
      >
        Arraste para revelar
      </p>
      <div
        ref={containerRef}
        className="relative w-full aspect-square sm:aspect-[4/3] overflow-hidden rounded-sm shadow-2xl select-none touch-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        data-cursor="hover"
      >
        <img
          src={afterSrc}
          alt={afterLabel}
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${position}%` }}
        >
          <img
            src={beforeSrc}
            alt={beforeLabel}
            className="absolute inset-0 h-full object-cover"
            style={{ width: `${(100 / position) * 100}%`, maxWidth: "none" }}
            draggable={false}
          />
        </div>

        <span
          className="absolute top-4 left-4 px-3 py-1 text-xs uppercase tracking-widest font-sans rounded-full backdrop-blur"
          style={{
            backgroundColor: "rgba(0,0,0,0.4)",
            color: "#FAF6F0",
          }}
        >
          {beforeLabel}
        </span>
        <span
          className="absolute top-4 right-4 px-3 py-1 text-xs uppercase tracking-widest font-sans rounded-full backdrop-blur"
          style={{
            backgroundColor: "rgba(0,0,0,0.4)",
            color: "#FAF6F0",
          }}
        >
          {afterLabel}
        </span>

        <div
          className="absolute top-0 bottom-0 w-px pointer-events-none"
          style={{
            left: `${position}%`,
            transform: "translateX(-50%)",
            backgroundColor: "#FAF6F0",
          }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center pointer-events-none"
          style={{
            left: `${position}%`,
            transform: "translate(-50%, -50%)",
            backgroundColor: "#FAF6F0",
            boxShadow: "0 6px 24px rgba(0,0,0,0.35)",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M7 5L2 10L7 15"
              stroke="#2C1E16"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M13 5L18 10L13 15"
              stroke="#2C1E16"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}
