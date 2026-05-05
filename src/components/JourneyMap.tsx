import React from "react";
import { motion } from "framer-motion";

export function JourneyMap({
  accentColor,
  textColor,
  bgColor,
}: {
  accentColor: string;
  textColor: string;
  bgColor: string;
}) {
  return (
    <section
      className="relative w-full py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: bgColor }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.5 }}
        className="max-w-3xl mx-auto px-6 md:px-12 text-center"
      >
        <p
          className="text-xs uppercase tracking-[0.3em] font-sans mb-8"
          style={{ color: accentColor }}
        >
          Interlúdio
        </p>

        <svg
          viewBox="0 0 600 280"
          className="w-full h-auto max-w-2xl mx-auto"
          aria-label="Mapa estilizado da jornada de Minas Gerais até São Paulo"
        >
          {/* Outline of Brazil sketch */}
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.25 }}
            viewport={{ once: true }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
            d="M120,80 Q160,40 230,55 T370,70 Q450,80 490,140 Q500,200 440,230 Q360,250 280,235 Q200,220 150,180 Q110,140 120,80 Z"
            fill="none"
            stroke={textColor}
            strokeWidth="1"
            strokeDasharray="2 4"
          />

          {/* Connection line MG -> SP */}
          <motion.path
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2.5, delay: 0.5, ease: "easeInOut" }}
            d="M340,120 Q310,150 290,180"
            fill="none"
            stroke={accentColor}
            strokeWidth="1.5"
            strokeDasharray="4 4"
            strokeLinecap="round"
          />

          {/* MG dot */}
          <motion.g
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1.5 }}
            style={{ transformOrigin: "340px 120px" }}
          >
            <circle cx="340" cy="120" r="6" fill={accentColor} />
            <circle cx="340" cy="120" r="14" fill="none" stroke={accentColor} strokeWidth="1" opacity="0.4" />
            <text
              x="356"
              y="116"
              fill={textColor}
              style={{
                fontSize: 11,
                fontFamily: "DM Sans, sans-serif",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              MG
            </text>
            <text
              x="356"
              y="130"
              fill={textColor}
              opacity="0.55"
              style={{
                fontSize: 9,
                fontFamily: "Playfair Display, serif",
                fontStyle: "italic",
              }}
            >
              Mantiqueira
            </text>
          </motion.g>

          {/* SP dot */}
          <motion.g
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 2.4 }}
            style={{ transformOrigin: "290px 180px" }}
          >
            <circle cx="290" cy="180" r="6" fill={accentColor} />
            <circle cx="290" cy="180" r="14" fill="none" stroke={accentColor} strokeWidth="1" opacity="0.4" />
            <text
              x="306"
              y="178"
              fill={textColor}
              style={{
                fontSize: 11,
                fontFamily: "DM Sans, sans-serif",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              SP
            </text>
            <text
              x="306"
              y="192"
              fill={textColor}
              opacity="0.55"
              style={{
                fontSize: 9,
                fontFamily: "Playfair Display, serif",
                fontStyle: "italic",
              }}
            >
              São Paulo
            </text>
          </motion.g>
        </svg>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 2.8 }}
          className="font-serif italic text-lg md:text-xl mt-8"
          style={{ color: textColor, opacity: 0.75 }}
        >
          640 km até a primeira xícara
        </motion.p>
      </motion.div>
    </section>
  );
}
