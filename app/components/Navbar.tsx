import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-bg/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-10xl mx-auto px-6 h-28 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <a href="/" className="flex items-center">
            <Image
              src="/new_logo.png"
              alt="LuluPlug"
              width={160}
              height={64}
              className="object-contain"
              priority
            />
          </a>

          <nav className="hidden md:flex items-center gap-6 text-base font-medium text-brown-mid">
            <a href="#plugins" className="hover:text-brown transition-colors">
              Plugins
            </a>
            <a href="#learn" className="hover:text-brown transition-colors">
              Learn
            </a>
            <a href="#about" className="hover:text-brown transition-colors">
              About
            </a>
          </nav>
        </div>

        <div className="hidden md:flex items-center gap-5 text-base font-medium text-brown-mid">
          <a href="#faq" className="hover:text-brown transition-colors">
            Support / FAQ
          </a>
          <Link
            href="/login"
            className="px-5 py-2.5 rounded-full border border-border text-brown hover:bg-dim transition-colors"
          >
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}
