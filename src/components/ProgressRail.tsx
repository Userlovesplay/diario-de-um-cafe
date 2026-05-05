import React from "react";
import { motion } from "framer-motion";
import { CHAPTERS } from "../data/chapters";

export function ProgressRail({
  activeChapterId,
  isDarkBg,
}: {
  activeChapterId: number | null;
  isDarkBg: boolean;
}) {
  if (!activeChapterId) return null;

  const fg = isDarkBg ? "rgba(250,246,240,0.85)" : "rgba(44,30,22,0.85)";
  const fgMuted = isDarkBg ? "rgba(250,246,240,0.25)" : "rgba(44,30,22,0.25)";

  const scrollTo = (id: number) =>
    document.getElementById(`chapter-${id}`)?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      {/* Desktop: vertical right-edge rail */}
      <motion.nav
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0 }}
        className="fixed right-4 lg:right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-end gap-5"
        aria-label="Progresso da leitura"
      >
        {CHAPTERS.map((ch) => {
          const isActive = ch.id === activeChapterId;
          return (
            <button
              key={ch.id}
              onClick={() => scrollTo(ch.id)}
              className="group flex items-center gap-3"
              aria-label={`Ir para o capítulo ${ch.id}: ${ch.title}`}
              data-cursor="hover"
            >
              <span
                className="text-[10px] uppercase tracking-[0.25em] font-sans transition-opacity duration-300"
                style={{
                  color: fg,
                  opacity: isActive ? 1 : 0,
                }}
              >
                {ch.title}
              </span>
              <span
                className="block h-px transition-all duration-500"
                style={{
                  width: isActive ? 28 : 14,
                  backgroundColor: isActive ? fg : fgMuted,
                }}
              />
            </button>
          );
        })}
      </motion.nav>

      {/* Mobile: bottom horizontal dots */}
      <motion.nav
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 flex md:hidden items-center gap-3 px-4 py-2 rounded-full backdrop-blur-md"
        style={{
          backgroundColor: isDarkBg ? "rgba(28,20,15,0.5)" : "rgba(250,246,240,0.6)",
          border: `1px solid ${fgMuted}`,
        }}
        aria-label="Progresso da leitura"
      >
        {CHAPTERS.map((ch) => {
          const isActive = ch.id === activeChapterId;
          return (
            <button
              key={ch.id}
              onClick={() => scrollTo(ch.id)}
              className="block rounded-full transition-all duration-300"
              style={{
                width: isActive ? 18 : 6,
                height: 6,
                backgroundColor: isActive ? fg : fgMuted,
              }}
              aria-label={`Ir para o capítulo ${ch.id}`}
            />
          );
        })}
      </motion.nav>
    </>
  );
}
