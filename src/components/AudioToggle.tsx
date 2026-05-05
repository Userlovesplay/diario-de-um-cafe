import React, { useState, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function AudioToggle({
  isMuted,
  setIsMuted,
  isDarkBg,
}: {
  isMuted: boolean;
  setIsMuted: (v: boolean) => void;
  isDarkBg: boolean;
}) {
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem("diario_visited");
    if (!hasVisited) {
      const t1 = window.setTimeout(() => setShowHint(true), 2500);
      const t2 = window.setTimeout(() => {
        setShowHint(false);
        localStorage.setItem("diario_visited", "true");
      }, 8500);
      return () => {
        window.clearTimeout(t1);
        window.clearTimeout(t2);
      };
    }
    return undefined;
  }, []);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    setShowHint(false);
    localStorage.setItem("diario_visited", "true");
  };

  const fg = isDarkBg ? "#FAF6F0" : "#2C1E16";
  const bg = isDarkBg ? "rgba(28,20,15,0.5)" : "rgba(250,246,240,0.6)";
  const border = isDarkBg ? "rgba(250,246,240,0.2)" : "rgba(44,30,22,0.2)";

  return (
    <div className="fixed top-4 right-4 lg:top-6 lg:right-6 z-50 flex items-center gap-3">
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.6 }}
            className="text-[10px] uppercase tracking-[0.25em] px-3 py-2 rounded-full hidden md:block backdrop-blur-md"
            style={{
              backgroundColor: bg,
              color: fg,
              border: `1px solid ${border}`,
            }}
          >
            Ative o som para uma experiência completa
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={toggleMute}
        className="w-11 h-11 flex items-center justify-center rounded-full backdrop-blur-md transition-colors"
        style={{
          backgroundColor: bg,
          color: fg,
          border: `1px solid ${border}`,
        }}
        aria-label={isMuted ? "Ativar som" : "Desativar som"}
        data-cursor="hover"
      >
        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </button>
    </div>
  );
}
