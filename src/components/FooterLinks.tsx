import React from "react";
import { ExternalLink } from "lucide-react";

export function FooterLinks({ isDark }: { isDark: boolean }) {
  const fg = isDark ? "#FAF6F0" : "#2C1E16";
  const bg = isDark ? "rgba(250,246,240,0.04)" : "rgba(0,0,0,0.04)";
  const border = isDark ? "rgba(250,246,240,0.06)" : "rgba(44,30,22,0.06)";

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <div
        className="flex items-center gap-4 px-4 py-2 rounded-full backdrop-blur-md text-sm"
        style={{ backgroundColor: bg, color: fg, border: `1px solid ${border}` }}
      >
        <a
          href="https://github.com/Userlovesplay/diario-de-um-cafe"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 hover:opacity-80"
          aria-label="Repositório do projeto"
        >
          <ExternalLink size={14} /> Repositório
        </a>

        <a
          href="https://guilhermeoliveira.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 hover:opacity-80"
          aria-label="Site pessoal"
        >
          <ExternalLink size={14} /> Meu site
        </a>
      </div>
    </div>
  );
}
