"use client";
import Image from "next/image";
import { useRef, useState, type MouseEvent, type ReactNode } from "react";

type Control = { label: string; value: number };

type Plugin = {
  name: string;
  tagline: string;
  bestFor: string;
  price: number | "FREE";
  category: string;
  type: "Instrument" | "Effect";
  accent: string;
  controls: Control[];
  downloadUrl?: string;
  image?: string;
};

const plugins: Plugin[] = [
  {
    name: "Vocobox",
    tagline: "Digital Vocoder with analog character",
    bestFor: "Vocals, synths, sound design",
    price: "FREE",
    category: "Modulation",
    type: "Instrument",
    accent: "#f5a623",
    downloadUrl: "/Vocobox_LuluPlug.zip",
    image: "/ui_vocobox-Photoroom.png",
    controls: [
      { label: "RATE", value: 0.3 },
      { label: "DEPTH", value: 0.55 },
      { label: "PHASE", value: 0.4 },
      { label: "MIX", value: 0.5 },
    ],
  },
  {
    name: "Lulu Synth",
    tagline: "Digital Vocoder with analog character",
    bestFor: "Vocals, synths, sound design",
    price: "FREE",
    category: "Modulation",
    type: "Instrument",
    accent: "#34d399",
    downloadUrl: "/Lulu-Synth-2_LuluPlug.zip",
    image: "/ui_lulusynth_no_background.png",
    controls: [
      { label: "RATE", value: 0.3 },
      { label: "DEPTH", value: 0.55 },
      { label: "PHASE", value: 0.4 },
      { label: "MIX", value: 0.5 },
    ],
  },
  {
    name: "Lulu Verb",
    tagline: "Natural, spatial reverb",
    bestFor: "Vocals, pads, ambiences",
    price: 49,
    category: "Reverb",
    type: "Effect",
    accent: "#818cf8",
    image: "/ui_lulu_verb-Photoroom.png",
    controls: [
      { label: "SIZE", value: 0.7 },
      { label: "DECAY", value: 0.55 },
      { label: "DIFF", value: 0.4 },
      { label: "PRE", value: 0.2 },
      { label: "MOD", value: 0.3 },
      { label: "MIX", value: 0.5 },
    ],
  },
  {
    name: "Lulu Comp",
    tagline: "Transparent or colored compression",
    bestFor: "Bus, drums, mix buss",
    price: 39,
    category: "Dynamics",
    type: "Effect",
    accent: "#f43f5e",
    image: "/ui_lulu_comp-Photoroom.png",
    controls: [
      { label: "THRESH", value: 0.6 },
      { label: "RATIO", value: 0.4 },
      { label: "ATTACK", value: 0.3 },
      { label: "REL", value: 0.5 },
      { label: "GAIN", value: 0.65 },
    ],
  },
  {
    name: "Lulu Drums",
    tagline: "Classic drum machine",
    bestFor: "Beats, grooves, sound design",
    price: 39,
    category: "Drums",
    type: "Instrument",
    accent: "#06b6d4",
    image: "/ui_lulu_drums-Photoroom.png",
    controls: [
      { label: "TEMPO", value: 0.5 },
      { label: "SWING", value: 0.4 },
      { label: "START", value: 0.3 },
      { label: "VOLUME", value: 0.6 },
    ],
  },

];

function Knob({ control, accent }: { control: Control; accent: string }) {
  const angle = -135 + control.value * 270;
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className="w-8 h-8 rounded-full border-2 flex items-center justify-center"
        style={{ borderColor: accent, transform: `rotate(${angle}deg)` }}
      >
        <div className="w-0.5 h-2.5 rounded-full" style={{ backgroundColor: accent }} />
      </div>
      <span className="text-brown-light text-[9px] tracking-widest font-mono">{control.label}</span>
    </div>
  );
}

// 2 grands carrés décoratifs, positionnés DANS la fenêtre pour que rien ne déborde
const decorSquares = [
  { top: "-18%", left: "-12%", size: 150, lag: 1 },
  { top: "62%", left: "76%", size: 130, lag: 1.3 },
];

// fenêtre de plugin "flottante", avec des carrés décoratifs qui bougent avec elle au survol, sans déborder
function PluginWindow({ accent, children }: { accent: string; children: ReactNode }) {
  const windowRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const el = windowRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    // position de la souris par rapport au centre de la fenêtre, normalisée entre -1 et 1
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setOffset({ x: px * 14, y: py * 10 });
  }

  function handleMouseLeave() {
    setOffset({ x: 0, y: 0 });
    setIsHovering(false);
  }

  const transition = isHovering ? "transform 0.15s ease-out" : "transform 0.4s ease-out";

  return (
    <div className="relative pt-6 px-6 pb-2">
      <div
        ref={windowRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={handleMouseLeave}
        className="relative bg-accent/15 rounded-xl overflow-hidden shadow-xl"
        style={{
          aspectRatio: "16/8",
          animation: "plugin-float 6s ease-in-out infinite",
          transform: `translate(${offset.x}px, ${offset.y}px) scale(${isHovering ? 1.03 : 1})`,
          transition,
        }}
      >
        {/* les carrés sont clippés par le overflow-hidden de la fenêtre : ils ne débordent jamais */}
        {decorSquares.map((sq, i) => (
          <div
            key={i}
            className="absolute rounded-md"
            style={{
              top: sq.top,
              left: sq.left,
              width: sq.size,
              height: sq.size,
              backgroundColor: accent,
              opacity: isHovering ? 0.5 : 0.2,
              transform: `translate(${offset.x * sq.lag}px, ${offset.y * sq.lag}px) scale(${isHovering ? 1.1 : 1})`,
              transition,
            }}
          />
        ))}

        {/* l'interface du plugin (image ou mockup) bouge aussi légèrement au survol */}
        <div
          className="absolute inset-0"
          style={{
            transform: `translate(${offset.x * 0.6}px, ${offset.y * 0.6}px) scale(${isHovering ? 1.04 : 1})`,
            transition,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

function PluginUI({ plugin }: { plugin: Plugin }) {
  const bars = [0.4, 0.7, 0.9, 0.6, 0.8, 0.5, 0.95, 0.4, 0.75, 0.6, 0.85, 0.5];

  // si le plugin a une vraie image, on l'affiche à la place de la fausse interface générée
  if (plugin.image) {
    return (
      <PluginWindow accent={plugin.accent}>
        <Image src={plugin.image} alt={plugin.name} fill className="object-contain" />
      </PluginWindow>
    );
  }

  return (
    <PluginWindow accent={plugin.accent}>
      <div className="h-full p-6 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <span className="text-brown-light text-[10px] font-mono tracking-widest uppercase">luluplug</span>
          <span className="text-[10px] font-mono tracking-widest uppercase" style={{ color: plugin.accent }}>
            {plugin.category}
          </span>
        </div>
        <p className="text-brown text-xl font-bold tracking-tight leading-none">{plugin.name}</p>
        <div className="flex items-end justify-between">
          <div className="flex gap-4">
            {plugin.controls.map((ctrl) => (
              <Knob key={ctrl.label} control={ctrl} accent={plugin.accent} />
            ))}
          </div>
          <div className="flex items-end gap-0.5">
            {bars.map((h, i) => (
              <div
                key={i}
                className="w-1 rounded-sm"
                style={{ height: `${h * 28}px`, backgroundColor: plugin.accent, opacity: 0.5 + h * 0.5 }}
              />
            ))}
          </div>
        </div>
      </div>
    </PluginWindow>
  );
}

function PluginCard({ plugin }: { plugin: Plugin }) {
  const isFree = plugin.price === "FREE";
  return (
    <div className="flex flex-col rounded-xl overflow-visible bg-transparent">
      <PluginUI plugin={plugin} />
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-brown-light">
            {plugin.category}
          </span>
          <span className={`text-sm font-bold ${isFree ? "text-accent" : "text-brown"}`}>
            {isFree ? "Free" : `$${plugin.price}`}
          </span>
        </div>
        <h3 className="text-lg font-bold text-brown mb-1">{plugin.name}</h3>
        <p className="text-sm text-brown-mid mb-1">{plugin.tagline}</p>
        <p className="text-xs text-brown-light mb-5">
          <span className="font-medium">Best for</span> {plugin.bestFor}
        </p>
        <a
          href={plugin.downloadUrl || `#${plugin.name.toLowerCase()}`}
          download={plugin.downloadUrl ? true : undefined}
          className="mt-auto block text-center text-sm font-semibold py-2.5 rounded-full border border-border text-brown hover:bg-dim transition-colors"
        >
          {isFree ? "Download for free" : "Learn more"}
          

        </a>
      </div>
    </div>
  );
}

export default function PluginsSection() {
  const instruments = plugins.filter((p) => p.type === "Instrument");
  const effects = plugins.filter((p) => p.type === "Effect");

  return (
    <section id="plugins" className="py-20 px-6 bg-dim">
      <div className="max-w-10xl mx-auto">
        <div className="mb-12">
          <span className="text-sm font-semibold tracking-widest uppercase text-accent">
            Catalog
          </span>
          <h2 className="mt-2 text-4xl xl:text-5xl font-bold text-brown">All plugins</h2>
        </div>

        <h3 className="text-2xl xl:text-3xl font-bold text-brown mb-8">Instruments</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 mb-20">
          {instruments.map((plugin) => (
            <PluginCard key={plugin.name} plugin={plugin} />
          ))}
        </div>

        <h3 className="text-2xl xl:text-3xl font-bold text-brown mb-8">Effects</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
          {effects.map((plugin) => (
            <PluginCard key={plugin.name} plugin={plugin} />
          ))}
        </div>
      </div>
    </section>
  );
}
