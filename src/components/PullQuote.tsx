import React from "react";
import { motion } from "framer-motion";

export function PullQuote({
  quote,
  accentColor,
  textColor,
}: {
  quote: string;
  accentColor: string;
  textColor: string;
}) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      className="my-20 md:my-28 w-full max-w-4xl mx-auto px-2 text-center relative"
    >
      <span
        aria-hidden
        className="block mx-auto h-px w-16 mb-10"
        style={{ backgroundColor: accentColor, opacity: 0.6 }}
      />
      <blockquote
        className="font-serif italic leading-[1.15] text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
        style={{ color: textColor }}
      >
        <span style={{ color: accentColor }}>“</span>
        {quote}
        <span style={{ color: accentColor }}>”</span>
      </blockquote>
      <span
        aria-hidden
        className="block mx-auto h-px w-16 mt-10"
        style={{ backgroundColor: accentColor, opacity: 0.6 }}
      />
    </motion.figure>
  );
}
