export default function About() {
  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <span className="text-xs font-semibold tracking-widest uppercase text-accent">
          Our approach
        </span>
        <h2 className="mt-2 text-3xl font-bold text-brown mb-6">Why we make plugins</h2>
        <p className="text-lg text-brown-mid leading-relaxed mb-4">
          LuluPlug is an independent audio plugin brand based in France. We believe sound
          deserves tools that get out of the way — no bloated menus, no guesswork, just precise,
          honest plugins built for producers who want to spend their time making music, not
          reading manuals.
        </p>
        <p className="text-lg text-brown-mid leading-relaxed">
          Every knob you see has a reason to exist. If we can&apos;t explain why a feature is
          there, it doesn&apos;t ship. We&apos;re a small, independent team, and we plan to stay
          that way — thanks for trusting us with your sound.
        </p>
      </div>
    </section>
  );
}
