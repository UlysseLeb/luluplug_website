

https://github.com/user-attachments/assets/f0784363-d27c-4be0-b10b-491f24ebe8b4

# LuluPlug

Marketing site for LuluPlug, an audio plugin brand. Showcases the plugin catalog (Lulu Verb, LuluDelay, LuluComp, LuluSpace, Vocobox) with a hero section and product cards.

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- [React 19](https://react.dev) — library for building UIs from reusable building blocks called components
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS 4](https://tailwindcss.com)
- [next/font](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) for font optimization (Geist, Geist Mono, DM Serif Display)

## Structure

- `app/layout.tsx` — root layout, fonts, metadata
- `app/page.tsx` — assembles the page from components
- `app/components/Navbar.tsx` — top navigation
- `app/components/Hero.tsx` — hero section with headline and plugin demo
- `app/components/PluginsSection.tsx` — plugin catalog grid
- `app/components/Footer.tsx` — footer
- `public/` — static assets (logo, plugin demo video/audio)

## Getting started

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.
