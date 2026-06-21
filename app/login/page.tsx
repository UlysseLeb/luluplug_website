"use client";
import Link from "next/link";
import { FormEvent } from "react";

export default function LoginPage() {

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
      // on empêche le rechargement de la page par défaut du navigateur
      e.preventDefault();
  
      // on récupère les valeurs des champs du formulaire
      const form = e.currentTarget;
      const email = (form.elements.namedItem("email") as HTMLInputElement).value;
      const password = (form.elements.namedItem("password") as HTMLInputElement).value;
  
      // on envoie une requête POST vers notre route API, avec les données en JSON
      await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
    }

    
  return (
    <section className="min-h-[70vh] flex items-center justify-center px-6 py-20">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm flex flex-col gap-4 p-8 rounded-2xl border border-border bg-surface shadow-2xl"
      >
        <h1 className="text-2xl font-bold text-brown mb-2 text-center">Log in</h1>

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
          className="text-center text-sm text-brown-mid hover:text-brown transition-colors"
        >
          No account yet? Sign up
        </Link>
      </form>
    </section>
  );
}
