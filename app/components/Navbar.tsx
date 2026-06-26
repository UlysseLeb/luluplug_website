"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import LoginModal from "./LoginModal";

export default function Navbar() {
  // état du menu mobile (ouvert/fermé)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // état de la popup de connexion (ouverte/fermée)
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  // utilisateur actuellement connecté (null si personne)
  const [user, setUser] = useState<{ email: string } | null>(null);

  // demande à /api/me qui est connecté, à partir du cookie de session
  function refreshUser() {
    fetch("/api/me")
      .then((res) => res.json())
      .then((data) => setUser(data.user));
  }

  // on vérifie l'état de connexion une fois, au chargement de la navbar
  useEffect(() => {
    refreshUser();
  }, []);

  async function handleLogout() {
    await fetch("/api/logout", { method: "POST" });
    setUser(null);
  }

  return (
    <>
    <header className="sticky top-0 z-50 bg-accent/15 backdrop-blur-sm border-b border-border">
      <div className="max-w-10xl mx-auto px-6 h-28 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <a href="/" className="flex items-center">
            <Image
              src="/new_logo.png"
              alt="LuluPlug"
              width={220}
              height={88}
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
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-brown">{user.email}</span>
              <button
                type="button"
                onClick={handleLogout}
                className="px-5 py-2.5 rounded-full border border-border text-brown hover:bg-dim transition-colors"
              >
                Log out
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setIsLoginOpen(true)}
              className="px-5 py-2.5 rounded-full border border-border text-brown hover:bg-dim transition-colors"
            >
              Login
            </button>
          )}
        </div>

        {/* bouton hamburger, visible seulement sur mobile */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="md:hidden w-10 h-10 flex items-center justify-center text-brown text-2xl"
        >
          {isMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* menu déroulant mobile */}
      {isMenuOpen && (
        <nav className="md:hidden flex flex-col gap-1 px-6 pb-6 text-base font-medium text-brown-mid border-t border-border">
          <a
            href="#plugins"
            onClick={() => setIsMenuOpen(false)}
            className="py-3 hover:text-brown transition-colors"
          >
            Plugins
          </a>
          <a
            href="#learn"
            onClick={() => setIsMenuOpen(false)}
            className="py-3 hover:text-brown transition-colors"
          >
            Learn
          </a>
          <a
            href="#about"
            onClick={() => setIsMenuOpen(false)}
            className="py-3 hover:text-brown transition-colors"
          >
            About
          </a>
          <a
            href="#faq"
            onClick={() => setIsMenuOpen(false)}
            className="py-3 hover:text-brown transition-colors"
          >
            Support / FAQ
          </a>
          {user ? (
            <button
              type="button"
              onClick={() => {
                setIsMenuOpen(false);
                handleLogout();
              }}
              className="mt-2 px-5 py-2.5 rounded-full border border-border text-brown text-center hover:bg-dim transition-colors"
            >
              Log out ({user.email})
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                setIsMenuOpen(false);
                setIsLoginOpen(true);
              }}
              className="mt-2 px-5 py-2.5 rounded-full border border-border text-brown text-center hover:bg-dim transition-colors"
            >
              Login
            </button>
          )}
        </nav>
      )}

    </header>
    <LoginModal
      open={isLoginOpen}
      onClose={() => setIsLoginOpen(false)}
      onSuccess={refreshUser}
    />
    </>
  );
}
