"use client";
import { useRef, useState } from "react";

export default function Hero() {
  // référence vers la balise audio pour pouvoir la lancer au clic
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  function handlePlayPause() {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  }


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
          {/* audio caché, pas de contrôles visibles : on le lance via le bouton */}
          <audio ref={audioRef} src="/vocobox-demo.mp3" />
          <button
            type="button"
            onClick={handlePlayPause}
            className="w-full px-6 py-8 rounded-2xl border border-border bg-surface hover:bg-dim transition-colors text-center shadow-2xl"
          >
            <span className="block text-xs font-semibold tracking-widest uppercase text-accent mb-2">
              Vocobox — One of the best vocoders on the market
            </span>
            <span className="text-lg font-bold text-brown">▶ Listen to a demo</span>
          </button>
        </div>
      </div>
    </section>
  );
}
