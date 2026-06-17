function FeaturedPluginMock() {
  return (
    <div className="bg-zinc-900 rounded-2xl p-8 aspect-[16/10] flex flex-col justify-between shadow-2xl">
      <div className="flex items-center justify-between">
        <span className="text-zinc-500 text-xs font-mono tracking-widest uppercase">luluplug</span>
        <span className="text-indigo-400 text-xs font-mono tracking-widest uppercase">Reverb</span>
      </div>

      <div>
        <p className="text-zinc-400 text-xs font-mono mb-1">v1.0.0</p>
        <h2 className="text-white text-3xl font-bold tracking-tight">LuluVerb</h2>
      </div>

      <div className="flex items-end gap-5">
        {["SIZE", "DECAY", "DIFF", "PREDELAY", "MOD", "MIX"].map((ctrl, i) => (
          <div key={ctrl} className="flex flex-col items-center gap-2">
            <div
              className="w-9 h-9 rounded-full border-2 border-indigo-500 flex items-center justify-center"
              style={{ transform: `rotate(${-120 + i * 30}deg)` }}
            >
              <div className="w-1 h-3 bg-indigo-400 rounded-full" />
            </div>
            <span className="text-zinc-500 text-[9px] tracking-widest font-mono">{ctrl}</span>
          </div>
        ))}
        <div className="ml-auto flex gap-1 items-end">
          {[0.3, 0.6, 0.9, 0.7, 0.4, 0.8, 0.5, 0.9, 0.3, 0.6].map((h, i) => (
            <div
              key={i}
              className="w-1.5 bg-indigo-500 rounded-sm opacity-80"
              style={{ height: `${h * 32}px` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="pt-20 pb-16 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-5">
            Audio Plugins
          </span>
          <h1 className="text-5xl font-bold tracking-tight text-brown leading-tight mb-5">
            Tools that let
            <br />
            your music breathe.
          </h1>
          <p className="text-lg text-brown-mid leading-relaxed mb-8 max-w-md">
            Simple, precise and honest audio plugins — built for producers
            who want to focus on the music.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="#plugins"
              className="px-6 py-3 rounded-full bg-brown text-bg font-semibold hover:opacity-80 transition-opacity text-sm text-center"
            >
              View plugins
            </a>
            <a
              href="#about"
              className="px-6 py-3 rounded-full border border-border text-brown font-semibold hover:bg-dim transition-colors text-sm text-center"
            >
              Our approach
            </a>
          </div>
        </div>

        <div>
          <FeaturedPluginMock />
        </div>
      </div>
    </section>
  );
}
