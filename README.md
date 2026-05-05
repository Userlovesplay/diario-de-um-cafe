# ☕ Diário de um Café

Uma narrativa poética interativa em oito capítulos que acompanha a jornada de um grão de café especial desde as montanhas de Minas Gerais até o primeiro gole em São Paulo.

## 🎯 Características

- **Narrativa em primeira pessoa** — A história é contada pelo próprio grão de café
- **8 capítulos temáticos** — Da fazenda ao preparo final, passando por fermentação, secagem e torra
- **Ambientes sonoros generativos** — Trilha sonora que muda com cada capítulo
- **Design responsivo** — Otimizado para desktop, tablet e mobile
- **Scrollbar personalizada** — Interface refinada e intuitiva
- **Suporte para leitura em voz alta** — Componente de narração em português
- **Galeria interativa** — Slider "antes/depois" e outras interações visuais
- **Acessibilidade** — Estrutura semântica e navegação por teclado

## 🛠 Stack Tecnológico

- **React 19** — Framework UI
- **TypeScript** — Type-safe development
- **Vite** — Build tool e dev server
- **Tailwind CSS** — Utility-first CSS framework
- **Framer Motion** — Animações fluidas
- **Radix UI** — Componentes acessíveis sem estilo
- **React Hook Form** — Gerenciamento de formulários
- **Recharts** — Visualização de dados
- **Web Audio API** — Áudio generativo ambientes

## 📦 Instalação

```bash
# Clonar repositório
git clone https://github.com/Userlovesplay/diario-de-um-cafe.git
cd diario-de-um-cafe

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run serve
```

O app estará disponível em `http://localhost:5173`

## 📖 Estrutura do Projeto

```
src/
├── components/
│   ├── AudioToggle.tsx          # Toggle som/mute
│   ├── BeforeAfterSlider.tsx    # Slider antes/depois
│   ├── ChapterIndex.tsx         # Sumário dos capítulos
│   ├── CollapsibleFacts.tsx     # "Saiba mais" colapsível
│   ├── FichaTecnica.tsx         # Ficha técnica final
│   ├── FooterLinks.tsx          # Links de rodapé
│   ├── JourneyMap.tsx           # Mapa da jornada
│   ├── NarrationButton.tsx      # Botão de leitura em voz alta
│   ├── ParticlesLayer.tsx       # Camada de partículas
│   ├── ProgressRail.tsx         # Barra de progresso
│   ├── PullQuote.tsx            # Citações destacadas
│   ├── ShareButton.tsx          # Botão de compartilhamento
│   ├── useChapterAmbience.tsx   # Hook de áudio ambiental
│   └── ui/                      # Componentes Radix UI
├── pages/
│   ├── Home.tsx                 # Página principal
│   └── not-found.tsx            # 404
├── data/
│   └── chapters.ts              # Conteúdo dos 8 capítulos
├── hooks/
│   └── use-toast.ts             # Toast notifications
└── lib/
    └── utils.ts                 # Utilities e helpers
```

## 🎨 Personalizações

### Cores e Temas

As cores e estilos podem ser ajustados em:
- `src/index.css` — Variáveis CSS e estilos globais
- `tailwind.config.js` — Configuração do Tailwind

### Conteúdo

Edite os capítulos em `src/data/chapters.ts`:

```typescript
{
  id: 1,
  title: "Amanhecer na Fazenda",
  subtitle: "Onde tudo começa",
  bgColor: "#E8D5C4",
  content: ["Parágrafo 1", "Parágrafo 2", ...],
  pullQuote: "Uma citação marcante",
  images: { hero: "...", support: "..." },
  facts: ["Fato 1", "Fato 2", ...]
}
```

## 🎵 Áudio Generativo

Cada capítulo tem uma trilha sonora ambiental única gerada em tempo real usando Web Audio API. Disable o som com o botão no canto superior direito.

## ♿ Acessibilidade

- ✅ Navegação por teclado completa
- ✅ ARIA labels e roles semânticos
- ✅ Contraste de cores acessível
- ✅ Texto alternativo para imagens
- ✅ Suporte a leitor de tela

## 📱 Mobile First

O design é otimizado mobile-first com breakpoints em:
- `sm` (640px)
- `md` (768px)
- `lg` (1024px)
- `xl` (1280px)

## 🚀 Deploy

O projeto deployado em:
- **Vercel** — [Diário de um Café](https://diario-de-um-cafe.vercel.app)


```bash
npm run build
# Arquivos estáticos em ./dist/public
```

## 📝 Scripts

```bash
npm run dev          # Inicia servidor de desenvolvimento
npm run build        # Build para produção
npm run serve        # Preview do build local
npm run typecheck    # Verifica tipos TypeScript
```

## 🔗 Links

- **Deploy:** [Diário de um Café](https://diario-de-um-cafe.vercel.app)
- **Meu Site:** [Guilherme Oliveira](https://guilhermeoliveira.dev)

## 📄 Licença

Este projeto está licenciado sob a licença MIT — veja o arquivo [LICENSE](LICENSE) para detalhes.

---

**Desenvolvido com ☕ e ❤️ por Guilherme Oliveira**
