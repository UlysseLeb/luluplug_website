"use client";
import Link from "next/link";

export default function LoginModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-6"
      onClick={onClose}
    >
      <form
        // on bloque la propagation pour que cliquer dans la modale ne la ferme pas
        onClick={(e) => e.stopPropagation()}
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
