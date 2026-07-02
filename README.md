# Nexora Digital Labs

A premium, cinematic digital agency website built with Next.js 15, React 19,
TypeScript, Tailwind CSS, GSAP, Framer Motion and React Three Fiber.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Structure

- `app/` — Next.js App Router pages (home, about, services + 6 dedicated service
  pages, packages, portfolio, contact)
- `components/layout/` — Navbar, Footer, smooth scroll provider
- `components/ui/` — Magnetic buttons, scroll reveals, cards, accordion, marquee,
  the shared service page template
- `components/three/` — React Three Fiber scenes (hero digital core, floating
  accent shapes used across About/Services/Contact)
- `lib/data/` — Services, packages, portfolio, testimonials and FAQ content —
  edit these files to change copy without touching components

## Dependency versions (verified compatible, July 2026)

| Package | Version | Why this version |
|---|---|---|
| `next` | 15.5.18 | Latest patched Next.js 15.x — earlier 15.x minors are missing the May 2026 security patches (RSC DoS, middleware bypass, cache poisoning, XSS). If you later move to Next.js 16, use 16.2.6 or newer for the same reason. |
| `react` / `react-dom` | 19.2.7 | Latest stable 19.x, past the React Server Components RCE (CVE‑2025‑55182, patched at 19.0.1/19.1.2/19.2.1) and the May 2026 follow-up (patched at 19.2.6+). |
| `@react-three/fiber` | 9.6.1 | **This is the fix for the errors you hit.** R3F v8 is built against React 18's reconciler internals; pairing it with React 19 is exactly what throws `ReactCurrentOwner is undefined` / `react-reconciler` errors. R3F v9 is the React‑19‑compatible line (v10 is still alpha and not recommended). |
| `@react-three/drei` | 10.7.7 | Peer-compatible with `@react-three/fiber@^9` and `react@^19` (drei v9 only supports fiber v8 — that mismatch was the second half of the original conflict). |
| `three` | 0.181.1 | Verified pairing with drei 10.7.7 in production; drei's peer range only requires `>=0.159` so newer patch/minor releases of three are also safe. |
| `framer-motion` | 12.42.2 | Latest. Note: upstream has renamed the project to "Motion" (`import from "motion/react"`), but the `framer-motion` package is still published and fully functional if you want to stay on that import path. |
| `gsap` | 3.15.0 | Latest — all GSAP plugins (including ScrollTrigger) are now free for commercial use. |
| `lenis` | 1.3.25 | Latest. |

### Why `npm install` now works without `--legacy-peer-deps`

The original `package.json` had two silent conflicts:
1. `@react-three/fiber@^8.17.10` (built for React 18) installed alongside `react@19.0.0`.
2. `@react-three/drei@^9.117.3`, whose peer dependency is `@react-three/fiber@^8` — incompatible with the fiber v9 you actually need for React 19.

Both are fixed by moving to the v9/v10 pairing above. The `"overrides"` block pinning `react`/`react-dom` to the root-declared version (via npm's `$react` alias) prevents any transitive dependency from pulling in a second, mismatched copy of React — a second copy is the other common cause of `ReactCurrentOwner` errors, since that internal is only ever valid on a single shared React instance.

### After pulling this update

```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

Deleting the lockfile is important — an old `package-lock.json` can keep resolving to the previous (incompatible) fiber/drei/react tree even after `package.json` changes.

## Notes for production

- Replace the Google Maps embed URL in `app/contact/page.tsx` with your real
  studio address.
- The contact form currently only shows a local success state — wire the
  `handleSubmit` function in `app/contact/page.tsx` up to your email/CRM
  provider (Resend, SendGrid, HubSpot, etc.) before launch.
- Swap the placeholder social links in `components/layout/Footer.tsx` for your
  real profiles.
- Run `npm run build` before deploying to catch any type errors.
- Recommended host: Vercel (zero-config for Next.js App Router).

## Design tokens

| Token | Value |
|---|---|
| Background | `#050505` |
| Primary | `#6C63FF` |
| Secondary | `#00E5FF` |
| Accent | `#FF4FD8` |
| Card | `rgba(255,255,255,.05)` |

Defined in `tailwind.config.ts` and `app/globals.css`.
