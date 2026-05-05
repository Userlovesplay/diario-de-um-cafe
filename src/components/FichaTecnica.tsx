import React from "react";
import { motion } from "framer-motion";

interface Row {
  label: string;
  value: string;
}

export function FichaTecnica({ readingMinutes }: { readingMinutes: number }) {
  const rows: Row[] = [
    { label: "Obra", value: "Diário de um Café" },
    { label: "Edição", value: "Capítulos I — VIII" },
    { label: "Narrativa", value: "Primeira pessoa, voz do grão" },
    { label: "Fotografia", value: "Composição original" },
    { label: "Tipografia", value: "Playfair Display & DM Sans" },
    { label: "Trilha sonora", value: "Composição ambiente generativa" },
    { label: "Local", value: "Serra da Mantiqueira → São Paulo" },
    { label: "Distância", value: "640 quilômetros" },
    { label: "Tempo de leitura", value: `${readingMinutes} minutos` },
    { label: "Ano", value: "MMXXVI" },
  ];

  return (
    <section
      className="relative w-full py-24 md:py-32 px-6 md:px-12 overflow-hidden"
      style={{ backgroundColor: "#0F0A07", color: "#FAF6F0" }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.7 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="text-xs uppercase tracking-[0.4em] font-sans text-center mb-4"
          style={{ color: "#D4A373" }}
        >
          Ficha técnica
        </motion.p>

        <motion.h3
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.1 }}
          className="font-serif italic text-3xl md:text-4xl text-center mb-16"
        >
          Catálogo da exposição
        </motion.h3>

        <div className="space-y-0">
          {rows.map((row, i) => (
            <motion.div
              key={row.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.05 }}
              className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6 py-5 border-t border-[#FAF6F0]/10 last:border-b"
            >
              <dt className="sm:col-span-4 text-[10px] sm:text-xs uppercase tracking-[0.3em] font-sans text-[#FAF6F0]/60">
                {row.label}
              </dt>
              <dd className="sm:col-span-8 font-serif italic text-lg md:text-xl">
                {row.value}
              </dd>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.4 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.8 }}
          className="text-center font-sans text-xs uppercase tracking-[0.3em] mt-20"
        >
          Brasil · MMXXVI
        </motion.p>

        <div className="mt-8 text-center">
          <p className="text-sm mb-3 opacity-70">Links</p>
          <div className="flex items-center justify-center gap-6">
            <a
              href="https://github.com/Userlovesplay/diario-de-um-cafe"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-sm underline hover:opacity-80"
            >
              Repositório do projeto
            </a>
            <a
              href="https://guilhermeoliveira.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-sm underline hover:opacity-80"
            >
              Meu site
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
