import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CHAPTERS } from "../data/chapters";

const romanNumerals = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

const isDarkColor = (hex: string): boolean => {
  const c = hex.replace("#", "");
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance < 0.45;
};

export function ChapterIndex({
  activeBgColor,
  isDarkBg,
}: {
  activeBgColor: string;
  isDarkBg: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const overlayDark = isDarkColor(activeBgColor);
  const overlayFg = overlayDark ? "#FAF6F0" : "#2C1E16";
  const overlayAccent = overlayDark ? "#D4A373" : "#9E5B3D";
  const overlayBorder = overlayDark ? "rgba(250,246,240,0.15)" : "rgba(44,30,22,0.12)";

  const triggerFg = isDarkBg ? "#FAF6F0" : "#2C1E16";
  const triggerBg = isDarkBg ? "rgba(28,20,15,0.5)" : "rgba(250,246,240,0.6)";
  const triggerBorder = isDarkBg ? "rgba(250,246,240,0.2)" : "rgba(44,30,22,0.2)";

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 lg:top-6 lg:left-6 z-50 flex items-center gap-2 lg:gap-3 text-[10px] lg:text-xs uppercase tracking-[0.25em] px-3 lg:px-4 py-2 lg:py-2.5 rounded-full backdrop-blur-md transition-colors"
        style={{
          backgroundColor: triggerBg,
          color: triggerFg,
          border: `1px solid ${triggerBorder}`,
        }}
        aria-label="Abrir sumário"
        data-cursor="hover"
      >
        <Menu size={14} /> Sumário
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[60] flex flex-col items-center justify-start px-6 py-16 overflow-y-auto"
            style={{ backgroundColor: activeBgColor, color: overlayFg }}
            role="dialog"
            aria-modal="true"
            aria-label="Sumário dos capítulos"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 lg:top-6 lg:right-6 p-3 rounded-full hover:bg-current/10 transition-colors"
              style={{ color: overlayFg }}
              aria-label="Fechar sumário"
              data-cursor="hover"
            >
              <X size={22} />
            </button>

            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-xs uppercase tracking-[0.4em] font-sans mb-3"
              style={{ color: overlayAccent }}
            >
              Sumário
            </motion.p>
            <motion.h3
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-serif italic text-3xl md:text-4xl mb-12 md:mb-16 text-center"
            >
              Oito capítulos
            </motion.h3>

            <div className="w-full max-w-2xl flex flex-col">
              {CHAPTERS.map((ch, i) => (
                <motion.button
                  key={ch.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + i * 0.05, duration: 0.5 }}
                  onClick={() => {
                    setIsOpen(false);
                    setTimeout(() => {
                      document
                        .getElementById(`chapter-${ch.id}`)
                        ?.scrollIntoView({ behavior: "smooth" });
                    }, 200);
                  }}
                  className="group flex items-baseline justify-between text-left py-4 md:py-5 transition-all"
                  style={{ borderBottom: `1px solid ${overlayBorder}` }}
                  data-cursor="hover"
                >
                  <div className="flex items-baseline gap-4 md:gap-8 min-w-0">
                    <span
                      className="font-serif italic text-base md:text-xl opacity-50 w-8"
                      style={{ color: overlayAccent }}
                    >
                      {romanNumerals[i]}
                    </span>
                    <div className="min-w-0">
                      <span className="font-serif text-2xl md:text-4xl group-hover:opacity-80 transition-opacity block whitespace-normal break-words">
                        {ch.title}
                      </span>
                      <span
                        className="font-sans text-[10px] md:text-xs uppercase tracking-[0.25em] mt-1 block opacity-50 whitespace-normal"
                      >
                        {ch.subtitle}
                      </span>
                    </div>
                  </div>
                  <span
                    className="font-sans text-xs hidden md:inline opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: overlayAccent }}
                  >
                    →
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
