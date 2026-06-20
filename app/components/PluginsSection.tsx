type Control = { label: string; value: number };

type Plugin = {
  name: string;
  tagline: string;
  bestFor: string;
  price: number | "FREE";
  category: string;
  accent: string;
  controls: Control[];
  downloadUrl?: string;
};

const plugins: Plugin[] = [
  {
    name: "Vocobox",
    tagline: "Digital Vocoder with analog character",
    bestFor: "Vocals, synths, sound design",
    price: "FREE",
    category: "Modulation",
    accent: "#e879f9",
    downloadUrl: "/Vocobox_LuluPlug.zip",
    controls: [
      { label: "RATE", value: 0.3 },
      { label: "DEPTH", value: 0.55 },
      { label: "PHASE", value: 0.4 },
      { label: "MIX", value: 0.5 },
    ],
  },
  {
    name: "Lulu Synth 2",
    tagline: "Digital Vocoder with analog character",
    bestFor: "Vocals, synths, sound design",
    price: "FREE",
    category: "Modulation",
    accent: "#34d399",
    downloadUrl: "/Lulu-Synth-2_LuluPlug.zip",
    controls: [
      { label: "RATE", value: 0.3 },
      { label: "DEPTH", value: 0.55 },
      { label: "PHASE", value: 0.4 },
      { label: "MIX", value: 0.5 },
    ],
  },
  {
    name: "LuluVerb",
    tagline: "Natural, spatial reverb",
    bestFor: "Vocals, pads, ambiences",
    price: 49,
    category: "Reverb",
    accent: "#818cf8",
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
    name: "LuluComp",
    tagline: "Transparent or colored compression",
    bestFor: "Bus, drums, mix buss",
    price: 39,
    category: "Dynamics",
    accent: "#fb923c",
    controls: [
      { label: "THRESH", value: 0.6 },
      { label: "RATIO", value: 0.4 },
      { label: "ATTACK", value: 0.3 },
      { label: "REL", value: 0.5 },
      { label: "GAIN", value: 0.65 },
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
      <span className="text-zinc-500 text-[9px] tracking-widest font-mono">{control.label}</span>
    </div>
  );
}

function PluginUI({ plugin }: { plugin: Plugin }) {
  const bars = [0.4, 0.7, 0.9, 0.6, 0.8, 0.5, 0.95, 0.4, 0.75, 0.6, 0.85, 0.5];
  return (
    <div className="bg-zinc-900 rounded-t-xl p-6 flex flex-col gap-5" style={{ aspectRatio: "16/8" }}>
      <div className="flex items-center justify-between">
        <span className="text-zinc-600 text-[10px] font-mono tracking-widest uppercase">luluplug</span>
        <span className="text-[10px] font-mono tracking-widest uppercase" style={{ color: plugin.accent }}>
          {plugin.category}
        </span>
      </div>
      <p className="text-white text-xl font-bold tracking-tight leading-none">{plugin.name}</p>
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
  );
}

function PluginCard({ plugin }: { plugin: Plugin }) {
  const isFree = plugin.price === "FREE";
  return (
    <div className="group flex flex-col rounded-xl border border-border overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 bg-surface">
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
  return (
    <section id="plugins" className="py-20 px-6 bg-dim">
      <div className="max-w-10xl mx-auto">
        <div className="mb-12">
          <span className="text-xs font-semibold tracking-widest uppercase text-accent">
            Catalog
          </span>
          <h2 className="mt-2 text-3xl font-bold text-brown">All plugins</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {plugins.map((plugin) => (
            <PluginCard key={plugin.name} plugin={plugin} />
          ))}
        </div>
      </div>
    </section>
  );
}
