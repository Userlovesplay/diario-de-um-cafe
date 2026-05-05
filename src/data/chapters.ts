export interface Chapter {
  id: number;
  title: string;
  subtitle: string;
  content: string[];
  images: {
    hero: string;
    support?: string;
  };
  bgColor: string; // for transition
  ambience: string;
  facts: string[];
  pullQuote: string;
}

export const CHAPTERS: Chapter[] = [
  {
    id: 1,
    title: "Amanhecer na fazenda",
    subtitle: "Onde tudo começa",
    content: [
      "Eu nasci a 1.200 metros de altitude, onde o ar é rarefeito e a neblina abraça as encostas da Serra da Mantiqueira antes mesmo do sol pensar em nascer. O silêncio aqui é espesso, quebrado apenas pelo canto dos pássaros que anunciam a manhã.",
      "Minha mãe era uma árvore velha e sábia, de raízes profundas que bebiam da terra vermelha e vulcânica. Demorei meses para deixar de ser uma flor branca e efêmera, transformando-me primeiro num grão verde e duro, paciente, esperando que o tempo me desse cor e propósito.",
      "O frio da noite me ensinou a doçura; o sol do dia me ensinou a complexidade. Fui forjado na lentidão. Cada gota de orvalho, cada nuvem que passava, deixava uma marca minúscula no meu interior. Eu estava me preparando."
    ],
    images: {
      hero: "/images/chapter-1-hero.png"
    },
    bgColor: "#FAF6F0",
    ambience: "farm",
    facts: [
      "Altitude da Mantiqueira: 1.000 a 1.500 metros, ideal para cafés especiais.",
      "Terra vulcânica rica em minerais, que confere complexidade à bebida.",
      "O processo de floração do cafeeiro ocorre geralmente após as primeiras chuvas da primavera."
    ],
    pullQuote: "O frio da noite me ensinou a doçura; o sol do dia me ensinou a complexidade."
  },
  {
    id: 2,
    title: "A colheita",
    subtitle: "O toque humano",
    content: [
      "Quando atingi o vermelho perfeito, brilhante como sangue fresco, conheci as mãos que me levariam embora. Eram mãos ásperas, calejadas pelo trabalho de décadas. Elas me tocaram com uma precisão que misturava força e reverência.",
      "Senti o estalo quando fui separado do galho. De repente, eu não era mais parte da árvore, mas parte do mundo. Fui lançado em um cesto de madeira trançada, caindo junto com milhares de irmãos. O cheiro de poeira levantada, suor e terra preenchia o ar morno da tarde.",
      "Naquele cesto balançante, carregado nos ombros de quem depende da terra para viver, entendi pela primeira vez o peso do meu destino. Eu carregava o trabalho de gerações."
    ],
    images: {
      hero: "/images/chapter-2-hero.png",
      support: "/images/chapter-2-support.png"
    },
    bgColor: "#F3ECE1",
    ambience: "harvest",
    facts: [
      "A colheita seletiva manual garante que apenas os grãos maduros sejam colhidos.",
      "O 'ponto cereja' é o estágio ideal de maturação do café, com doçura máxima.",
      "No Brasil, o período de colheita geralmente ocorre entre maio e setembro."
    ],
    pullQuote: "Eu não era mais parte da árvore, mas parte do mundo."
  },
  {
    id: 3,
    title: "Despolpa e fermentação",
    subtitle: "A química do ser",
    content: [
      "Fui despido. Minha casca doce e vermelha foi violentamente arrancada, deixando-me nu, coberto apenas por uma mucilagem espessa. Fui atirado em um tanque de concreto, submerso em água fria.",
      "Foi ali, no escuro, que a mágica mais silenciosa aconteceu. Durante dias, esperei. Os açúcares ao meu redor começaram a borbulhar, a se transformar. A química estava mudando a minha essência, gravando notas de frutas, de vinho, de chocolate na minha alma ainda verde.",
      "Nesses tanques de água turva, tive sonhos estranhos. Sonhei com o sol que me secaria, com o fogo que me acordaria. Eu estava me decompondo para poder nascer de novo."
    ],
    images: {
      hero: "/images/chapter-3-hero.png"
    },
    bgColor: "#E9E2D5",
    ambience: "fermentation",
    facts: [
      "Fermentação anaeróbica ocorre em ambiente sem oxigênio, criando perfis de sabor exóticos.",
      "A mucilagem é a camada rica em açúcares que envolve o grão, crucial para a doçura.",
      "O tempo de fermentação pode variar de 12 a mais de 72 horas, dependendo do método."
    ],
    pullQuote: "Eu estava me decompondo para poder nascer de novo."
  },
  {
    id: 4,
    title: "Secagem ao sol",
    subtitle: "A paciência da luz",
    content: [
      "Fui espalhado sobre um terreiro suspenso, deitado ao lado dos meus pares sob a imensidão azul do céu brasileiro. O sol castigava, mas era um castigo necessário. Durante semanas, fomos virados e revirados por rodos de madeira, uma dança rítmica para que secássemos por igual.",
      "Meus dias se arrastavam sob o calor implacável, e minhas noites sob a frieza das estrelas. Minha umidade evaporava, minha cor mudava para um verde-oliva pálido. Fui murchando, me encolhendo, concentrando todo o meu sabor em um núcleo pequeno e denso.",
      "Este foi o meu primeiro grande descanso. Um repouso necessário antes da grande travessia que me aguardava."
    ],
    images: {
      hero: "/images/chapter-4-hero.png"
    },
    bgColor: "#DED6C8",
    ambience: "drying",
    facts: [
      "Terreiros suspensos (camas africanas) permitem circulação de ar por todos os lados do grão.",
      "O tempo médio de secagem ao sol é de 2 a 3 semanas.",
      "A umidade ideal do grão verde após a secagem deve ser em torno de 11 a 12%."
    ],
    pullQuote: "Fui murchando, me encolhendo, concentrando todo o meu sabor em um núcleo pequeno e denso."
  },
  {
    id: 5,
    title: "A torra",
    subtitle: "O fogo e a fúria",
    content: [
      "O inferno é barulhento e quente. Fui jogado em um tambor de metal escuro que girava sem parar. O calor era absurdo, sufocante. A princípio, resisti. Tentei manter a minha forma, a minha umidade restante.",
      "Mas o fogo não pede permissão. Comecei a inchar, a suar óleos essenciais. Então veio o estalo — um som agudo, quase um grito de alívio e dor. Eu estava quebrando por dentro para revelar o que eu realmente era.",
      "O aroma que exalou de mim não era mais o da terra ou da fruta, mas algo profundo, caramelizado, tostado. Deixei de ser semente; tornei-me promessa."
    ],
    images: {
      hero: "/images/chapter-5-hero.png"
    },
    bgColor: "#2C1E16",
    ambience: "roast",
    facts: [
      "O primeiro estalo (first crack) indica que a umidade evaporou e o grão está torrando.",
      "Reações de Maillard são responsáveis por desenvolver os sabores caramelizados e escuros.",
      "Perfis de torra clara preservam a acidez, enquanto torras escuras destacam corpo e amargor."
    ],
    pullQuote: "Deixei de ser semente; tornei-me promessa."
  },
  {
    id: 6,
    title: "A viagem",
    subtitle: "O mundo de concreto",
    content: [
      "Selado na escuridão de um saco de papel kraft espesso, respirei através de uma pequena válvula. Pela primeira vez, não ouvia pássaros nem sentia vento. Ouvi o ronco de motores a diesel, o chacoalhar das estradas de asfalto, sirenes distantes.",
      "A viagem foi longa. Saí da montanha silenciosa e acordei no coração pulsante de São Paulo. O ar aqui cheirava a fumaça e pressa. Não havia terra vermelha, apenas calçadas cinzas e luzes elétricas cortando a madrugada.",
      "Eu estava longe de casa, mas pela primeira vez, estava perto das pessoas para as quais fui criado."
    ],
    images: {
      hero: "/images/chapter-6-hero.png"
    },
    bgColor: "#3A2A1F",
    ambience: "city",
    facts: [
      "O Brasil é o maior produtor e exportador de café do mundo.",
      "O Porto de Santos (SP) é a principal via de saída do café brasileiro para o exterior.",
      "O mercado de café especial no Brasil vem crescendo mais de 15% ao ano."
    ],
    pullQuote: "Eu estava longe de casa, mas pela primeira vez, estava perto das pessoas para as quais fui criado."
  },
  {
    id: 7,
    title: "As mãos do barista",
    subtitle: "O ritual",
    content: [
      "Fui triturado em segundos. O que restou de mim foi um pó fino, perfumado, carregando toda a minha história. O barista pesou-me com precisão matemática. Nada é deixado ao acaso.",
      "A água caiu sobre mim em um fio fino e circular. Fui inundado. A água quente me abriu, extraindo cada traço de sol, de terra, de chuva e de fogo que eu havia acumulado em anos.",
      "Para o barista, era um ritual mecânico, repetido centenas de vezes no mesmo dia. Para mim, era a única vez. Eu estava me dissolvendo em vapor e cor."
    ],
    images: {
      hero: "/images/chapter-7-hero.png"
    },
    bgColor: "#423225",
    ambience: "barista",
    facts: [
      "A temperatura ideal da água para extração varia de 90°C a 96°C.",
      "O ratio (proporção) clássico de um espresso é de 1:2 (ex: 18g de pó para 36g de líquido).",
      "A moagem precisa ser ajustada diariamente conforme a temperatura e a umidade do ambiente."
    ],
    pullQuote: "Eu estava me dissolvendo em vapor e cor."
  },
  {
    id: 8,
    title: "O primeiro gole",
    subtitle: "A consumação",
    content: [
      "A xícara de cerâmica aqueceu as mãos que me seguravam. Uma pessoa desconhecida levantou-me até o rosto. Ela fechou os olhos por um instante e respirou o meu aroma. Havia cansaço nela, mas também antecipação.",
      "O toque nos lábios. O gole. O calor descendo pela garganta. O silêncio que se seguiu. Senti meu propósito ser cumprido. Toda aquela espera, todo aquele sol na montanha, a escuridão dos tanques, o terror do fogo — tudo convergiu para este exato segundo.",
      "E então, não fui mais café. Fui energia. Fui despertar. Tornei-me parte daquela manhã."
    ],
    images: {
      hero: "/images/chapter-8-hero.png",
      support: "/images/chapter-8-support.png"
    },
    bgColor: "#1C140F",
    ambience: "sip",
    facts: [
      "A cafeína bloqueia os receptores de adenosina no cérebro, impedindo a sensação de sono.",
      "O tempo médio para sentir o pico do efeito da cafeína é de cerca de 30 a 45 minutos.",
      "Além da energia, o café especial proporciona uma experiência sensorial única com notas complexas."
    ],
    pullQuote: "Toda aquela espera, todo aquele sol na montanha, a escuridão dos tanques, o terror do fogo — tudo convergiu para este exato segundo."
  }
];
