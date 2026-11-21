# AGENTS.md

Monorepo (npm workspaces, Node `>=22.23.4`, ESM) for the HAW Hamburg orientation week (OE) static websites of two faculties, built with Astro and Tailwind CSS v4.

## Project Structure

```text
/
├── shared/   # @oe/shared — Shared library (components, pages, layouts, data, styles, assets, types, utils)
├── emi/      # @oe/emi    — Static website for EMI (Elektro-, Medien- und Informationstechnik)
└── inf/      # @oe/inf    — Static website for INF (Informatik und Digitale Gesellschaft)
```

- `emi/` and `inf/` are thin site wrappers around `@oe/shared`. Each contains only its Astro config, `public/` static files, route entrypoints in `src/pages/`, and faculty-specific primary theme colors in `src/styles/global.css`.
- Put reusable UI, page templates, layouts, content data, styles, types, and utilities in `shared/src/` rather than duplicating them across `emi/` and `inf/`.
- When adding or modifying routes or page props, update both `emi/src/pages/` and `inf/src/pages/` unless the change is explicitly faculty-specific.
- Import shared modules via the `@oe/shared/*` package exports (mapped in `shared/package.json`, workspace `tsconfig.json`, and `shared/src/vite-shared.ts`).

### `shared/src/` Subfolders

- `assets/`: Images, SVG icons, and logos imported by components.
- `components/`: Reusable Astro UI and feature components grouped by domain (`header`, `footer`, `hero`, `roadmap`, `faq`, `oe-info`, `studiengang`, `sponsor`, `card`, `wartungsarbeiten`, `ui`).
- `data/`: Static domain data and content (faculties, study programs, roadmap, FAQ content, links, general info, tutor names).
- `layouts/`: Base page layout (`Layout.astro`).
- `pages/`: Shared full-page Astro templates (`HomePage`, `FaqPage`, `StudiengaengePage`, `StudiengangDetailPage`, `ImpressumPage`, `DatenschutzPage`) invoked by the thin route files in `emi/` and `inf/`.
- `styles/`: Shared Tailwind CSS v4 base stylesheet (`global.css`) and section-specific stylesheets (`faq.css`, `legal.css`, `prose.css`).
- `types/`: Shared TypeScript interfaces and types (`types.ts`).
- `util/`: Pure helper utilities (formatting, roadmap helpers, maintenance mode check).

## Tooling

- **Astro** (static output) with `@astrojs/sitemap` and **Tailwind CSS v4** (`@tailwindcss/vite`).
- **TypeScript** (strict Astro config) for type checking (`tsc --noEmit` + `astro sync`).
- **ESLint** (`eslint.config.js`) with `typescript-eslint` and `eslint-plugin-astro`.
- **oxfmt** (`oxfmt.config.ts`) for code formatting (with `astro`, `sortImports`, and `sortTailwindcss` enabled).
- **Lefthook** (`lefthook.yml`) for git `pre-commit` and `pre-push` checks.

## Commands

Run commands from the repository root:

- `npm run dev:emi` / `npm run dev:inf` — Start dev server for a site
- `npm run build` (`build:emi`, `build:inf`) — Build both sites (or one site) to `<site>/dist/`
- `npm run preview:emi` / `npm run preview:inf` — Preview a built site locally
- `npm run typecheck` — Run `typecheck` across all workspaces
- `npm run lint` / `npm run lint:fix` — Run ESLint across the repo
- `npm run fmt` / `npm run fmt:check` — Format or check formatting with `oxfmt`

### Maintenance Mode

Controlled at build time via `PUBLIC_MAINTENANCE_MODE=true` (or `1`), read by `shared/src/util/maintenance.util.ts`.

### Verification

Before finishing changes, ensure formatting, linting, types, and builds pass (matching Lefthook and CI):

```bash
npm run fmt:check && npm run lint && npm run typecheck && npm run build
```

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

(From the root workspace, pass `-- --background`, e.g. `npm run dev:emi -- --background`.)

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
