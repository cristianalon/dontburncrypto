# Don't Burn Crypto

**dontburncrypto.org** — Before you burn it. Donate it.

A single-page site with no navigation, no forms, no accounts, and no
tracking. It exists to do one thing: offer a wallet address instead of
a burn address.

## Stack

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide Icons

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Before you deploy

Open `src/lib/wallets.ts` and replace the placeholder addresses with
your real BTC, ETH, SOL, and USDT receiving addresses. That file is
the only place addresses live — everything else (cards, copy buttons,
QR codes) reads from it.

QR codes are rendered on the fly via `api.qrserver.com` from the
address text — nothing is generated or stored server-side.

## Structure

The whole site is five full-height sections, in order:

1. Hero — "Before you burn it. Donate it."
2. Wallets — one card per chain
3. "Burning destroys value. Donating creates value."
4. Transparency — "Blockchain is public. Every donation is verifiable."
5. Closing — the hero line, repeated, alone

Nothing else. No footer, no nav, no forms.

## Design notes

- Pure black background, single white/ash type scale, one signature
  motion element: a field of embers in the hero that cool from
  ember-orange to still white light as they rise — burning, quietly
  becoming something that lasts.
- No analytics, no cookies, no third-party scripts beyond the QR
  image endpoint.

## Performance

- `EmberField` and `QRModal` are dynamically imported (`next/dynamic`,
  `ssr: false`) so they're code-split out of the initial bundle —
  the ember canvas is purely decorative and the QR modal is only
  needed after a click.
- The ember animation pauses itself via `IntersectionObserver` once
  scrolled out of view, and is skipped entirely for
  `prefers-reduced-motion`.
- `WalletCard`, `CopyButton`, and `QRModal` are memoized; event
  handlers passed down are wrapped in `useCallback` so those memos
  actually hold.
- QR images go through `next/image`.

## Accessibility

- Respects `prefers-reduced-motion` everywhere — Framer Motion via
  `MotionConfig reducedMotion="user"`, the ember canvas via a direct
  media-query check, and CSS transitions via a media query block.
- Visible focus states on every interactive element.
- The QR modal traps focus on its close button when it opens and
  restores focus to whatever triggered it when it closes; `Escape`
  and click-outside both close it.
- Semantic heading outline (`h1` → `h2` per section) with
  `aria-labelledby` wiring each section to its heading.

## SEO

- Canonical URL, Open Graph, and Twitter Card metadata in
  `src/app/layout.tsx`.
- Generated OG image, favicon, and Apple touch icon
  (`opengraph-image.tsx`, `icon.tsx`, `apple-icon.tsx`) — no static
  image assets to keep in sync.
- `robots.ts` and `sitemap.ts` file-based routes.
- `WebSite` structured data (JSON-LD).

## Build for production

```bash
npm run build
npm run start
```
