# AGENTS.md

Single Next.js 16 App Router app (`studio-space-client`) — not a monorepo. A sibling backend repo exists at `../studio-space-server`; this client currently makes no API calls (no `fetch`/env usage anywhere).

## Commands (npm — `package-lock.json` is the source of truth)

- `npm run dev` — dev server (Turbopack)
- `npx tsc --noEmit` — typecheck. **There is no `typecheck` or `test` script, and no test suite exists.**
- `npm run lint` — ESLint only
- `npm run build` — final verification; `next build` also typechecks
- Suggested order before finishing: `npx tsc --noEmit` → `npm run lint` → `npm run build`

## Structure

- `@/*` path alias maps to the repo root (`tsconfig.json`)
- `components/ui/` — shadcn-generated primitives; keep hand-written feature components in `components/home/`, `components/layout/`, `components/studios/` etc.
- Shared code: `lib/` (notably `lib/utils.ts` `cn()`), `hooks/`
- Route props are generated: use `LayoutProps<"/">`-style globals instead of hand-writing param types. If generated types are missing/stale, run `next dev` or `next build` once to regenerate `.next/types`.

## shadcn/ui + Tailwind v4

- Add primitives with `npx shadcn add <component>` (aliases/style in `components.json`). Style is **`base-nova`, which uses Base UI primitives (`@base-ui/react`) — not Radix** as in older shadcn examples. Shadcn CLI v4: `npx shadcn --help`.
- `npx shadcn add` installs registry deps, but components that need extra npm packages (e.g. `sonner`) still require a manual `npm i <pkg>`.
- Tailwind v4: no `tailwind.config`; theme/custom CSS lives in `app/globals.css`, loaded via the `@tailwindcss/turbopack` rule in `next.config.ts` (don't remove it).

## next.config.ts gotchas

- `cacheComponents: true` + `partialPrefetching: true`: uncached async data reads must be wrapped in `<Suspense>` or the dev overlay errors; use `'use cache'` for cached data. See `node_modules/next/dist/docs/01-app/01-getting-started/08-caching.md`.
- `images.remotePatterns` allows only `images.unsplash.com` — other image hosts fail until added there.

## Known pre-existing issues (verified 2026-11-02)

- `npm run build` fails at prerender of `/`: swiper evaluates `new Date()` in a Client Component, which `cacheComponents` rejects. Pre-existing — reproduces on clean HEAD; compile + typecheck pass. `next dev` and both routes work.
- `npm run lint` exits non-zero from 2 pre-existing `react-hooks/set-state-in-effect` errors in `components/ui/carousel.tsx` and `hooks/use-mobile.ts` — not caused by your changes.
- The `form` component is absent from the `base-nova` shadcn registry (`npx shadcn add form` is a no-op) — `components/ui/form.tsx` is hand-written (RHF + local `Label`, no Radix). Edit it directly instead of expecting the registry to provide it.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
