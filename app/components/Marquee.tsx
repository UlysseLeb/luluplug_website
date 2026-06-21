import Image from "next/image";

function MarqueeContent() {
  // texte répété plusieurs fois, séparé par le logo, pour remplir la largeur avant la boucle
  return (
    <>
      {Array.from({ length: 8 }).map((_, i) => (
        <span key={i} className="flex items-center gap-5 px-5 whitespace-nowrap">
          <span className="text-xl font-bold text-brown">New Plugin Vocobox</span>
          <Image src="/vocobox_logo.png" alt="Vocobox" width={36} height={36} className="object-contain" />
          <Image src="/LuLu_Plug_Text.png" alt="LuluPlug" width={64} height={26} className="object-contain relative left-1" />
        </span>
      ))}
    </>
  );
}

export default function Marquee() {
  return (
    <div className="overflow-hidden border-y border-border bg-dim py-3">
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
