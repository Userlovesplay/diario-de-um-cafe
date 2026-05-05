import React, { useEffect, useState } from "react";
import { Play, Pause, Square } from "lucide-react";

export function NarrationButton({
  text,
  accentColor,
  isMuted,
}: {
  text: string[];
  accentColor: string;
  isMuted?: boolean;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [hasVoice, setHasVoice] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      setHasVoice(false);
      return;
    }
    const checkVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      const ptVoice = voices.find((v) => v.lang.startsWith("pt"));
      setHasVoice(!!ptVoice || voices.length > 0);
    };
    checkVoices();
    window.speechSynthesis.addEventListener("voiceschanged", checkVoices);
    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", checkVoices);
      window.speechSynthesis.cancel();
    };
  }, []);

  const start = () => {
    if (isMuted) {
      return;
    }
    const fullText = text.join(" ");
    const utterance = new SpeechSynthesisUtterance(fullText);
    utterance.lang = "pt-BR";
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    // ensure volume respects muting when supported
    utterance.volume = isMuted ? 0 : 1;
    const voices = window.speechSynthesis.getVoices();
    const ptVoice = voices.find((v) => v.lang.startsWith("pt"));
    if (ptVoice) utterance.voice = ptVoice;
    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };
    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
    setIsPaused(false);
  };

  const togglePauseResume = () => {
    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    } else {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  };

  if (!hasVoice) return null;

  return (
    <div
      className="inline-flex items-center gap-2 mt-6 md:mt-8"
      style={{ color: accentColor }}
    >
      {!isPlaying ? (
        <button
          onClick={start}
          className="inline-flex items-center gap-2 text-[10px] md:text-xs uppercase tracking-[0.25em] font-sans px-4 py-2 rounded-full border hover:opacity-70 transition-opacity"
          style={{ borderColor: accentColor }}
          aria-label="Ouvir narração do capítulo"
          data-cursor="hover"
        >
          <Play size={12} /> Ouvir capítulo
        </button>
      ) : (
        <>
          <button
            onClick={togglePauseResume}
            className="inline-flex items-center gap-2 text-[10px] md:text-xs uppercase tracking-[0.25em] font-sans px-4 py-2 rounded-full border hover:opacity-70 transition-opacity"
            style={{ borderColor: accentColor }}
            aria-label={isPaused ? "Continuar narração" : "Pausar narração"}
            data-cursor="hover"
          >
            {isPaused ? <Play size={12} /> : <Pause size={12} />}
            {isPaused ? "Continuar" : "Pausar"}
          </button>
          <button
            onClick={stop}
            className="inline-flex items-center gap-2 text-[10px] md:text-xs uppercase tracking-[0.25em] font-sans px-4 py-2 rounded-full hover:opacity-70 transition-opacity"
            style={{ color: accentColor }}
            aria-label="Parar narração"
            data-cursor="hover"
          >
            <Square size={12} /> Parar
          </button>
        </>
      )}
    </div>
  );
}
