"use client";
import Link from "next/link";
import { useState, type FormEvent } from "react";

export default function LoginModal({
  open,
  onClose,
  onSuccess,
}: {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) {
  // message d'erreur à afficher si la connexion échoue (null = pas d'erreur)
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    // on empêche le rechargement de la page par défaut du navigateur
    e.preventDefault();
    setError(null);

    // on récupère les valeurs des champs du formulaire
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    // on envoie une requête POST vers notre route API, avec les données en JSON
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      // res.ok est faux pour les statuts 401 etc. : on lit le message d'erreur renvoyé par l'API
      const data = await res.json();
      setError(data.error ?? "Une erreur est survenue");
      return;
    }

    // succès : on rafraîchit l'utilisateur affiché dans la navbar, puis on ferme la popup
    onSuccess();
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-6"
      onClick={onClose}
    >
      <form
        // on bloque la propagation pour que cliquer dans la modale ne la ferme pas
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        className="relative w-full max-w-sm flex flex-col gap-4 p-8 rounded-2xl border border-border bg-surface shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 text-brown-light hover:text-brown transition-colors text-lg"
        >
          ✕
        </button>

        <h1 className="text-2xl font-bold text-brown mb-2 text-center">Log in</h1>

        {error && (
          <p className="text-sm text-center text-red-600 bg-red-50 border border-red-200 rounded-lg py-2 px-3">
            {error}
          </p>
        )}

        <label className="flex flex-col gap-1 text-sm text-brown-mid">
          Email
          <input
            type="email"
            name="email"
            required
            className="px-4 py-2 rounded-lg border border-border bg-bg text-brown outline-none focus:border-brown transition-colors"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm text-brown-mid">
          Password
          <input
            type="password"
            name="password"
            required
            className="px-4 py-2 rounded-lg border border-border bg-bg text-brown outline-none focus:border-brown transition-colors"
          />
        </label>

        <button
          type="submit"
          className="mt-2 px-6 py-3 rounded-full bg-brown text-bg font-semibold hover:opacity-80 transition-opacity text-sm"
        >
          Log in
        </button>
        <Link
          href="/signup"
          onClick={onClose}
          className="text-center text-sm text-brown-mid hover:text-brown transition-colors"
        >
          No account yet? Sign up
        </Link>
      </form>
    </div>
  );
}
