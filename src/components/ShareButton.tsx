import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Share2, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { CHAPTERS } from "../data/chapters";

const romanNumerals = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

export function ShareButton({ isDarkBg }: { isDarkBg: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const fg = isDarkBg ? "#FAF6F0" : "#2C1E16";
  const fgBg = isDarkBg ? "rgba(28,20,15,0.5)" : "rgba(250,246,240,0.6)";
  const fgBorder = isDarkBg ? "rgba(250,246,240,0.2)" : "rgba(44,30,22,0.2)";

  const sharePayload = (chapterIndex: number) => {
    const ch = CHAPTERS[chapterIndex];
    const text = `"${ch.pullQuote}" — Diário de um Café, Capítulo ${romanNumerals[chapterIndex]}`;
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator
        .share({ title: "Diário de um Café", text })
        .then(() => setIsOpen(false))
        .catch(() => {});
    } else if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        toast({
          title: "Citação copiada",
          description: "A frase está na sua área de transferência.",
        });
        setIsOpen(false);
      });
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 md:bottom-6 right-4 lg:right-6 z-40 w-12 h-12 flex items-center justify-center rounded-full backdrop-blur-md transition-colors"
        style={{
          backgroundColor: fgBg,
          color: fg,
          border: `1px solid ${fgBorder}`,
        }}
        aria-label="Compartilhar uma citação"
        data-cursor="hover"
      >
        <Share2 size={18} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="share-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 md:p-8"
            style={{ backgroundColor: "rgba(15,10,7,0.85)" }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-sm p-6 md:p-10"
              style={{ backgroundColor: "#FAF6F0", color: "#2C1E16" }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/5 transition-colors"
                aria-label="Fechar"
              >
                <X size={18} />
              </button>

              <p
                className="text-xs uppercase tracking-[0.3em] font-sans mb-2"
                style={{ color: "#9E5B3D" }}
              >
                Compartilhar
              </p>
              <h4 className="font-serif text-2xl md:text-3xl mb-8">
                Escolha uma citação
              </h4>

              <ul className="space-y-3">
                {CHAPTERS.map((ch, i) => (
                  <li key={ch.id}>
                    <button
                      onClick={() => sharePayload(i)}
                      className="w-full text-left p-4 border border-[#2C1E16]/10 hover:border-[#9E5B3D] hover:bg-[#9E5B3D]/5 rounded-sm transition-all group"
                      data-cursor="hover"
                    >
                      <span
                        className="block text-[10px] uppercase tracking-[0.25em] font-sans mb-1"
                        style={{ color: "#9E5B3D" }}
                      >
                        Capítulo {romanNumerals[i]} · {ch.title}
                      </span>
                      <span className="block font-serif italic text-base md:text-lg leading-snug">
                        “{ch.pullQuote}”
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
