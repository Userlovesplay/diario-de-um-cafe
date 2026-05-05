import { useEffect, useRef, useState } from "react";

type AmbienceKey =
  | "farm"
  | "harvest"
  | "fermentation"
  | "drying"
  | "roast"
  | "city"
  | "barista"
  | "sip";

interface ActiveLayer {
  nodes: AudioNode[];
  gain: GainNode;
  cleanup?: () => void;
}

const fadeOut = (gain: GainNode, ctx: AudioContext, seconds: number) => {
  const now = ctx.currentTime;
  gain.gain.cancelScheduledValues(now);
  gain.gain.setValueAtTime(gain.gain.value, now);
  gain.gain.linearRampToValueAtTime(0.0001, now + seconds);
};

const fadeIn = (
  gain: GainNode,
  ctx: AudioContext,
  target: number,
  seconds: number
) => {
  const now = ctx.currentTime;
  gain.gain.cancelScheduledValues(now);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.linearRampToValueAtTime(target, now + seconds);
};

const createNoiseBuffer = (ctx: AudioContext, type: "white" | "pink" | "brown") => {
  const length = ctx.sampleRate * 2;
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  if (type === "white") {
    for (let i = 0; i < length; i++) data[i] = Math.random() * 2 - 1;
  } else if (type === "pink") {
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < length; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.969 * b2 + white * 0.153852;
      b3 = 0.8665 * b3 + white * 0.3104856;
      b4 = 0.55 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.016898;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
      b6 = white * 0.115926;
    }
  } else {
    let lastOut = 0;
    for (let i = 0; i < length; i++) {
      const white = Math.random() * 2 - 1;
      data[i] = (lastOut + 0.02 * white) / 1.02;
      lastOut = data[i];
      data[i] *= 3.5;
    }
  }
  return buffer;
};

const buildLayer = (
  ctx: AudioContext,
  master: GainNode,
  ambience: AmbienceKey
): ActiveLayer => {
  const layerGain = ctx.createGain();
  layerGain.gain.value = 0.0001;
  layerGain.connect(master);
  const nodes: AudioNode[] = [];
  let cleanup: (() => void) | undefined;

  const noise = (
    type: "white" | "pink" | "brown",
    filterType: BiquadFilterType,
    freq: number,
    q: number,
    amp: number
  ) => {
    const src = ctx.createBufferSource();
    src.buffer = createNoiseBuffer(ctx, type);
    src.loop = true;
    const filter = ctx.createBiquadFilter();
    filter.type = filterType;
    filter.frequency.value = freq;
    filter.Q.value = q;
    const g = ctx.createGain();
    g.gain.value = amp;
    src.connect(filter).connect(g).connect(layerGain);
    src.start();
    nodes.push(src, filter, g);
  };

  const tone = (freq: number, type: OscillatorType, amp: number, detune = 0) => {
    const o = ctx.createOscillator();
    o.type = type;
    o.frequency.value = freq;
    o.detune.value = detune;
    const g = ctx.createGain();
    g.gain.value = amp;
    o.connect(g).connect(layerGain);
    o.start();
    nodes.push(o, g);
  };

  switch (ambience) {
    case "farm":
      noise("pink", "highpass", 3000, 0.7, 0.35);
      tone(110, "sine", 0.18);
      tone(165, "sine", 0.12, 8);
      break;
    case "harvest":
      noise("brown", "bandpass", 600, 0.8, 0.55);
      tone(80, "sine", 0.15);
      break;
    case "fermentation": {
      noise("brown", "lowpass", 250, 0.5, 0.4);
      tone(60, "sine", 0.2);
      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.3;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 30;
      lfo.connect(lfoGain);
      const modOsc = ctx.createOscillator();
      modOsc.type = "sine";
      modOsc.frequency.value = 90;
      lfoGain.connect(modOsc.frequency);
      const modGain = ctx.createGain();
      modGain.gain.value = 0.1;
      modOsc.connect(modGain).connect(layerGain);
      lfo.start();
      modOsc.start();
      nodes.push(lfo, lfoGain, modOsc, modGain);
      break;
    }
    case "drying":
      noise("white", "bandpass", 5000, 1.5, 0.18);
      tone(140, "sine", 0.08);
      break;
    case "roast": {
      tone(50, "sine", 0.4);
      noise("brown", "lowpass", 200, 0.4, 0.45);
      const crackleInterval = window.setInterval(() => {
        const burst = ctx.createBufferSource();
        burst.buffer = createNoiseBuffer(ctx, "white");
        const g = ctx.createGain();
        g.gain.value = 0;
        const filt = ctx.createBiquadFilter();
        filt.type = "highpass";
        filt.frequency.value = 1500;
        burst.connect(filt).connect(g).connect(layerGain);
        const startTime = ctx.currentTime;
        g.gain.setValueAtTime(0, startTime);
        g.gain.linearRampToValueAtTime(0.5, startTime + 0.005);
        g.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.08);
        burst.start(startTime);
        burst.stop(startTime + 0.1);
      }, 800);
      cleanup = () => window.clearInterval(crackleInterval);
      break;
    }
    case "city":
      noise("brown", "lowpass", 400, 0.6, 0.5);
      tone(90, "sine", 0.18);
      tone(135, "sine", 0.1, 12);
      break;
    case "barista":
      noise("white", "bandpass", 8000, 2, 0.25);
      tone(160, "sine", 0.08);
      break;
    case "sip":
      tone(80, "sine", 0.25);
      tone(120, "sine", 0.15, 5);
      noise("pink", "lowpass", 600, 0.5, 0.15);
      break;
  }

  return { nodes, gain: layerGain, cleanup };
};

export function useChapterAmbience(
  activeAmbience: AmbienceKey | null,
  isMuted: boolean
) {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const currentLayerRef = useRef<ActiveLayer | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initAudio = () => {
      if (audioCtxRef.current) return;
      const AudioContextClass =
        window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioContextClass();
      const master = ctx.createGain();
      master.gain.value = 0;
      master.connect(ctx.destination);
      audioCtxRef.current = ctx;
      masterGainRef.current = master;
      setIsInitialized(true);
    };
    const handler = () => initAudio();
    window.addEventListener("click", handler, { once: true });
    window.addEventListener("touchstart", handler, { once: true });
    window.addEventListener("keydown", handler, { once: true });
    return () => {
      window.removeEventListener("click", handler);
      window.removeEventListener("touchstart", handler);
      window.removeEventListener("keydown", handler);
    };
  }, []);

  useEffect(() => {
    const master = masterGainRef.current;
    const ctx = audioCtxRef.current;
    if (!master || !ctx) return;
    const target = isMuted ? 0 : 0.05;
    const now = ctx.currentTime;
    master.gain.cancelScheduledValues(now);
    master.gain.linearRampToValueAtTime(target, now + 1);
  }, [isMuted, isInitialized]);

  useEffect(() => {
    const ctx = audioCtxRef.current;
    const master = masterGainRef.current;
    if (!ctx || !master || !activeAmbience) return;

    const previous = currentLayerRef.current;
    if (previous) {
      fadeOut(previous.gain, ctx, 2);
      previous.cleanup?.();
      window.setTimeout(() => {
        previous.nodes.forEach((n) => {
          try {
            (n as OscillatorNode).stop?.();
          } catch {}
          try {
            n.disconnect();
          } catch {}
        });
        try { previous.gain.disconnect(); } catch {}
      }, 2200);
    }

    const layer = buildLayer(ctx, master, activeAmbience);
    fadeIn(layer.gain, ctx, 0.6, 2);
    currentLayerRef.current = layer;

    return () => {
      const lyr = currentLayerRef.current;
      if (lyr === layer) currentLayerRef.current = null;
      fadeOut(layer.gain, ctx, 1.5);
      layer.cleanup?.();
      window.setTimeout(() => {
        layer.nodes.forEach((n) => {
          try {
            (n as OscillatorNode).stop?.();
          } catch {}
          try {
            n.disconnect();
          } catch {}
        });
        try { layer.gain.disconnect(); } catch {}
      }, 1700);
    };
  }, [activeAmbience, isInitialized]);

  return isInitialized;
}
