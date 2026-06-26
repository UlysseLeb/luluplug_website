# LuluPlug — project notes for AI agents

LuluPlug is a Next.js 16 (App Router, Turbopack) marketing site for an audio plugin brand, with real authentication (Prisma + SQLite, bcrypt, JWT sessions) and a Railway deployment.

## Conventions

- All visible copy is in English.
- Tailwind v4 with custom theme tokens defined in `app/globals.css` (`--color-bg`, `--color-surface`, `--color-dim`, `--color-brown*`, `--color-accent`) — prefer these over raw hex values.
- Client components (`"use client"`) only where interactivity is needed (forms, hover effects, modals); everything else stays a server component.
- Images in `public/` should have transparent backgrounds where used as logos/icons — see existing assets for the expected style.

## Auth

- `app/api/signup`, `app/api/login`, `app/api/logout`, `app/api/me` are Next.js Route Handlers.
- Passwords are hashed with `bcryptjs`, never stored or logged in plaintext.
- Sessions are signed JWTs in an `httpOnly` cookie (`JWT_SECRET` env var).
- Prisma client must be imported from `@/app/generated/prisma/client` (not the folder root) and instantiated with the `@prisma/adapter-better-sqlite3` driver adapter — this generated client requires an explicit adapter, unlike older Prisma versions.

## Deployment

- Hosted on Railway with a persistent volume for the SQLite database file.
- Database migrations run at container **start** (`prisma migrate deploy` in the `start` script), not at build time — Railway volumes are only mounted at runtime, so running migrations during `build` silently fails against an empty filesystem.
