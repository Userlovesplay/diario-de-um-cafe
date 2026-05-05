import React, { useEffect, useState, useRef, useMemo } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";
import { CHAPTERS, Chapter as ChapterType } from "../data/chapters";
import { useChapterAmbience } from "../components/useChapterAmbience";
import { AudioToggle } from "../components/AudioToggle";
import { NarrationButton } from "../components/NarrationButton";
import { ProgressRail } from "../components/ProgressRail";
import { ChapterIndex } from "../components/ChapterIndex";
import { CollapsibleFacts } from "../components/CollapsibleFacts";
import { PullQuote } from "../components/PullQuote";
import { ParticlesLayer } from "../components/ParticlesLayer";
import { BeforeAfterSlider } from "../components/BeforeAfterSlider";
import { JourneyMap } from "../components/JourneyMap";
import { FichaTecnica } from "../components/FichaTecnica";
import { ShareButton } from "../components/ShareButton";
import { FooterLinks } from "../components/FooterLinks";

const romanNumerals = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

const assetUrl = (path: string) => {
  const base = import.meta.env.BASE_URL;
  const cleanPath = path.replace(/^\//, "");
  return `${base}${cleanPath}`;
};

const isDarkColor = (hex: string): boolean => {
  const c = hex.replace("#", "");
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance < 0.45;
};

const colorsFor = (bgColor: string) => {
  const dark = isDarkColor(bgColor);
  return {
    isDark: dark,
    heading: dark ? "#FAF6F0" : "#2C1E16",
    body: dark ? "rgba(250,246,240,0.85)" : "rgba(44,30,22,0.9)",
    accent: dark ? "#D4A373" : "#9E5B3D",
  };
};

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const ringX = useSpring(cursorX, { stiffness: 200, damping: 25, mass: 0.6 });
  const ringY = useSpring(cursorY, { stiffness: 200, damping: 25, mass: 0.6 });
  const dotX = useSpring(cursorX, { stiffness: 600, damping: 30, mass: 0.3 });
  const dotY = useSpring(cursorY, { stiffness: 600, damping: 30, mass: 0.3 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest(
        "a, button, [role='button'], [data-cursor='hover']"
      );
      setIsHovering(!!interactive);
    };

    const leaveWindow = () => setIsVisible(false);
    const enterWindow = () => setIsVisible(true);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", handleOver);
    window.addEventListener("mouseleave", leaveWindow);
    window.addEventListener("mouseenter", enterWindow);
    document.documentElement.classList.add("custom-cursor-active");

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", handleOver);
      window.removeEventListener("mouseleave", leaveWindow);
      window.removeEventListener("mouseenter", enterWindow);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, [cursorX, cursorY, isVisible]);

  return (
    <>
      <motion.div
        aria-hidden
        className="custom-cursor-ring"
        style={{
          translateX: ringX,
          translateY: ringY,
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          width: isHovering ? 56 : 36,
          height: isHovering ? 56 : 36,
          borderColor: isHovering
            ? "rgba(158, 91, 61, 0.9)"
            : "rgba(158, 91, 61, 0.55)",
        }}
        transition={{ type: "spring", stiffness: 250, damping: 22 }}
      />
      <motion.div
        aria-hidden
        className="custom-cursor-dot"
        style={{
          translateX: dotX,
          translateY: dotY,
          opacity: isVisible ? 1 : 0,
        }}
        animate={{ scale: isHovering ? 0 : 1 }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
      />
    </>
  );
};

const Intro = ({ readingMinutes }: { readingMinutes: number }) => {
  return (
    <section className="relative min-h-[100dvh] flex flex-col items-center justify-center bg-[#FAF6F0] text-[#2C1E16] overflow-hidden px-6">
      <div className="absolute inset-0 noise-overlay"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
        className="z-10 text-center max-w-3xl"
      >
        <p className="font-sans text-[10px] sm:text-xs tracking-[0.3em] uppercase mb-6 text-[#9E5B3D]">
          Uma narrativa em oito capítulos
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl mb-8 tracking-tight leading-[1.05]">
          Diário de um Café
        </h1>
        <p className="font-serif italic text-base sm:text-lg md:text-2xl text-foreground/70 max-w-lg mx-auto leading-relaxed">
          "Eu nasci a 1.200 metros de altitude, onde o ar é rarefeito e a
          neblina abraça as encostas..."
        </p>
        <p className="font-sans text-[10px] tracking-[0.3em] uppercase mt-10 text-[#9E5B3D]/70">
          {readingMinutes} minutos de leitura
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-10 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center"
      >
        <span className="font-sans text-[10px] uppercase tracking-widest mb-3 md:mb-4">
          Deslize para ler
        </span>
        <motion.div
          animate={{ scaleY: [0.6, 1, 0.6] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-12 md:h-16 bg-gradient-to-b from-[#2C1E16] to-transparent origin-top"
        />
      </motion.div>
    </section>
  );
};

const ChapterText = ({
  text,
  index,
  color,
}: {
  text: string;
  index: number;
  color: string;
}) => {
  return (
    <motion.p
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, delay: index * 0.2, ease: "easeOut" }}
      className="mb-7 md:mb-8 leading-relaxed text-base sm:text-lg md:text-xl font-sans font-light"
      style={{ color }}
    >
      {text}
    </motion.p>
  );
};

const ChapterView = ({
  chapter,
  index,
  isMuted,
}: {
  chapter: ChapterType;
  index: number;
  isMuted: boolean;
}) => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const markerOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0]
  );

  const { isDark, heading, body, accent } = colorsFor(chapter.bgColor);
  const isRoastChapter = chapter.id === 5;

  // Split content: para 1 - PullQuote - paras 2..N
  const firstPara = chapter.content[0];
  const restParas = chapter.content.slice(1);

  return (
    <section
      ref={ref}
      id={`chapter-${chapter.id}`}
      className="relative min-h-[150dvh] flex flex-col items-center py-20 md:py-32 overflow-hidden"
      style={{ backgroundColor: chapter.bgColor, color: heading }}
    >
      <div className="absolute inset-0 noise-overlay"></div>
      <ParticlesLayer ambience={chapter.ambience} />

      {/* Sticky Chapter Marker */}
      <motion.div
        style={{ opacity: markerOpacity, color: accent }}
        className="sticky top-8 md:top-12 z-20 font-serif italic text-lg md:text-2xl mb-12 md:mb-24"
      >
        Capítulo {romanNumerals[index]}
      </motion.div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 z-10 flex flex-col items-center">
        {/* Title Block */}
        <div className="text-center mb-16 md:mb-24 max-w-3xl">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-sans uppercase tracking-[0.2em] text-[10px] sm:text-xs md:text-sm mb-3 md:mb-4"
            style={{ color: accent }}
          >
            {chapter.subtitle}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="font-serif text-3xl sm:text-4xl md:text-6xl lg:text-7xl leading-[1.1]"
            style={{ color: heading }}
          >
            {chapter.title}
          </motion.h2>
          <NarrationButton text={chapter.content} accentColor={accent} isMuted={isMuted} />
        </div>

        {/* Hero Image */}
        <div className="w-full aspect-[4/3] sm:aspect-video md:aspect-[21/9] overflow-hidden mb-16 md:mb-24 relative rounded-sm shadow-2xl">
          <motion.img
            style={{ y, scale }}
            src={assetUrl(chapter.images.hero)}
            alt={chapter.title}
            className="w-full h-full object-cover origin-center"
          />
        </div>

        {/* Roast chapter: before/after slider */}
        {isRoastChapter && (
          <BeforeAfterSlider
            beforeSrc={assetUrl("/images/beans-green.png")}
            afterSrc={assetUrl("/images/beans-roasted.png")}
            beforeLabel="Antes"
            afterLabel="Depois"
            accentColor={accent}
          />
        )}

        {/* Content & Support Image Layout */}
        <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 lg:gap-24 items-start">
          <div className="md:col-span-7 lg:col-span-6 relative z-10">
            <ChapterText text={firstPara} index={0} color={body} />
          </div>

          {chapter.images.support && (
            <div className="md:col-span-5 lg:col-span-6 relative">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="aspect-square md:aspect-[3/4] overflow-hidden rounded-sm shadow-xl"
              >
                <img
                  src={assetUrl(chapter.images.support)}
                  alt={`${chapter.title} — imagem de apoio`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          )}
        </div>

        {/* Pull Quote between para 1 and remaining */}
        <PullQuote
          quote={chapter.pullQuote}
          accentColor={accent}
          textColor={heading}
        />

        {/* Remaining paragraphs */}
        <div className="w-full max-w-3xl mx-auto px-2 md:px-0">
          {restParas.map((para, i) => (
            <ChapterText
              key={i}
              text={para}
              index={i}
              color={body}
            />
          ))}
        </div>

        {/* Saiba mais */}
        <CollapsibleFacts facts={chapter.facts} color={body} />
      </div>
    </section>
  );
};

const Outro = () => {
  return (
    <section className="relative h-[80dvh] flex flex-col items-center justify-center bg-[#1C140F] text-[#FAF6F0] overflow-hidden py-24 px-6">
      <div className="absolute inset-0 noise-overlay opacity-5"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="z-10 text-center"
      >
        <h2 className="font-serif text-3xl md:text-5xl mb-12 italic" style={{ color: "#D4A373" }}>
          fim.
        </h2>

        <div className="w-[1px] h-20 md:h-24 bg-gradient-to-b from-[#FAF6F0]/20 to-transparent mx-auto mb-12"></div>

        <p className="font-sans text-[10px] md:text-xs tracking-widest uppercase text-[#FAF6F0]/50 mb-2">
          Uma narrativa em oito capítulos
        </p>
        <p className="font-sans text-[10px] tracking-wider text-[#FAF6F0]/30">
          Brasil, 2026
        </p>
      </motion.div>
    </section>
  );
};

export default function Home() {
  const [isMuted, setIsMuted] = useState(true);
  const [activeChapterId, setActiveChapterId] = useState<number | null>(null);
  const [activeBg, setActiveBg] = useState<string>("#FAF6F0");

  useEffect(() => {
    const sections = CHAPTERS.map((ch) =>
      document.getElementById(`chapter-${ch.id}`)
    ).filter((el): el is HTMLElement => !!el);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          const idStr = visible[0].target.id.replace("chapter-", "");
          const id = parseInt(idStr, 10);
          if (!Number.isNaN(id)) {
            setActiveChapterId(id);
            const ch = CHAPTERS.find((c) => c.id === id);
            if (ch) setActiveBg(ch.bgColor);
          }
        }
      },
      {
        rootMargin: "-30% 0px -30% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const readingMinutes = useMemo(() => {
    const totalWords = CHAPTERS.reduce(
      (acc, ch) => acc + ch.content.join(" ").split(/\s+/).length,
      0
    );
    return Math.max(1, Math.round(totalWords / 200));
  }, []);

  const activeAmbience = useMemo(() => {
    if (!activeChapterId) return null;
    const ch = CHAPTERS.find((c) => c.id === activeChapterId);
    return (ch?.ambience as
      | "farm"
      | "harvest"
      | "fermentation"
      | "drying"
      | "roast"
      | "city"
      | "barista"
      | "sip"
      | undefined) || null;
  }, [activeChapterId]);

  useChapterAmbience(activeAmbience, isMuted);

  const isDarkBg = isDarkColor(activeBg);

  // For the JourneyMap interlude, derive colors from chapter 6's bg (the destination).
  const interludeBg = "#1F1411";
  const interludeColors = colorsFor(interludeBg);

  return (
    <div
      className="w-full min-h-screen relative transition-colors duration-700"
      style={{ backgroundColor: activeBg, color: isDarkBg ? "#FAF6F0" : "#2C1E16" }}
    >
      <CustomCursor />

      <ChapterIndex activeBgColor={activeBg} isDarkBg={isDarkBg} />
      <AudioToggle
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        isDarkBg={isDarkBg}
      />
      <ProgressRail
        activeChapterId={activeChapterId}
        isDarkBg={isDarkBg}
      />
      <ShareButton isDarkBg={isDarkBg} />

      <main>
        <Intro readingMinutes={readingMinutes} />

        {CHAPTERS.map((chapter, index) => (
          <React.Fragment key={chapter.id}>
            <ChapterView chapter={chapter} index={index} isMuted={isMuted} />
            {chapter.id === 5 && (
              <JourneyMap
                accentColor={interludeColors.accent}
                textColor={interludeColors.heading}
                bgColor={interludeBg}
              />
            )}
          </React.Fragment>
        ))}

        <Outro />
        <FichaTecnica readingMinutes={readingMinutes} />
      </main>

      <FooterLinks isDark={isDarkBg} />
    </div>
  );
}
