# Elderly Wellness — Next.js

This folder holds the Next.js rewrite of `theelderlywellness.com`. It lives
side-by-side with the legacy static HTML at the repo root during migration.
At cutover, Vercel's Root Directory switches to this folder.

## Run

```powershell
pnpm install
pnpm dev
```

Then open http://localhost:3000.

## Scripts

- `pnpm dev` — start the Next.js dev server
- `pnpm build` — production build
- `pnpm start` — run the production server
- `pnpm lint` — ESLint (Next.js flat config)
- `pnpm typecheck` — `tsc --noEmit`

## Where things live

- Source (legacy HTML): repo root (`../`), specifically `../index.html`,
  `../blogs/`, `../images/`, `../fonts/`, `../css/`, `../js/`.
- Migration docs: `../docs/` — `MIGRATION_INVENTORY.md`, `REDIRECT_MAP.md`,
  `PHASE1_DECISIONS.md`, and specs under `../docs/superpowers/specs/`.
- Deployment: Vercel (auto-deploy on `main`). Never push `main` until cutover.

## Status

Phase 2a — Foundation scaffolding complete. Header, Footer, fonts,
homepage content, blog extraction, and redirect map arrive in later phases.
