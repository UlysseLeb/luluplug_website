import Image from "next/image";

function MarqueeContent() {
  // texte répété plusieurs fois, séparé par le logo, pour remplir la largeur avant la boucle
  return (
    <>
      {Array.from({ length: 8 }).map((_, i) => (
        <span key={i} className="flex items-center gap-8 px-8 whitespace-nowrap">
          <span className="text-4xl font-bold text-brown">New Plugin Vocobox</span>
          <Image src="/vocobox_logo.png" alt="Vocobox" width={68} height={68} className="object-contain" />
          <Image src="/LuLu_Plug_Text.png" alt="LuluPlug" width={120} height={48} className="object-contain relative left-2" />
        </span>
      ))}
    </>
  );
}

export default function Marquee() {
  return (
    <div className="overflow-hidden border-y border-border bg-dim py-6">
      <div
        className="flex w-max"
        style={{ animation: "marquee 110s linear infinite" }}
      >
        <div className="flex">
          <MarqueeContent />
        </div>
        <div className="flex">
          <MarqueeContent />
        </div>
      </div>
    </div>
  );
}
