# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev        # Vite dev server on http://localhost:3000 (HMR enabled)
pnpm build      # Bundle client → dist/public/ and server → dist/index.js
pnpm start      # Run production Express server (NODE_ENV=production)
pnpm check      # TypeScript type-check without emit
pnpm format     # Prettier auto-format
```

No test suite is configured.

## Architecture

**Dive Dream** is a luxury dive center marketing site for Mauritius. It is a pure client-side SPA — all content is hardcoded in `client/src/const.ts`, no database or backend API exists. The Express server (`server/index.ts`) only serves static files in production.

### Directory structure

```
client/src/
  pages/          # 16 route-level page components
  components/     # Shared UI
    Layout.tsx    # Header + footer + mobile nav wrapper used by every page
    Map.tsx       # Google Maps via Manus platform proxy (no API key needed)
    ui/           # shadcn/ui primitives (~60 components)
  contexts/       # ThemeContext (dark/light)
  hooks/          # useMobile
  const.ts        # All data: DiveSite[], Course[], DivePackage[], Promotion[], etc.
  index.css       # CSS variables / design tokens + custom utility classes
  App.tsx         # Wouter route definitions

server/index.ts   # Express static file server (production only)
shared/const.ts   # Shared cookie/timeout constants
```

TypeScript path aliases: `@/*` → `client/src/`, `@shared/*` → `shared/`

### Routing

Uses **Wouter** (not React Router). All routes are flat and defined in `client/src/App.tsx`. Every page component wraps its content in `<Layout>` for the shared header/footer. To add a page: create the component, add a `<Route>` in App.tsx, and add a nav link in `Layout.tsx`.

### Data

All content lives in `client/src/const.ts` as typed arrays (`DIVE_SITES`, `COURSES`, `DIVE_PACKAGES`, `PROMOTIONS`, etc.). Updating content means editing this file directly.

**Images** are managed in `client/src/images.ts`, organized by page/section (e.g. `home.heroBackgrounds`, `equipment.rentalGear`, `diveCenter.reception`). To change any photo on the site, open `images.ts`, find the section, and swap the URL. Shared images that appear on multiple pages are in the `shared` object at the top -- changing one updates everywhere. Local images go in `client/public/images/` and are referenced as `/images/filename.webp`. Gallery images are auto-imported from `client/src/assets/gallery/` via Vite glob. Optimize images before adding (use `.webp`, max 1920px wide, ~80% quality).

### Design system

Dark-mode-first. Design tokens are CSS variables in `client/src/index.css`. Use semantic color classes (`bg-background`, `bg-card text-card-foreground`, etc.) paired correctly. Custom utilities defined there:

- `.glass-panel` — glassmorphic card (backdrop-blur + semi-transparent border)
- `.btn-premium-primary` / `.btn-premium-secondary` — CTA button styles
- `.container` — centered layout with responsive padding, `max-w-5xl`

### Forms and notifications

Use **React Hook Form + Zod** for forms. Toast notifications use **Sonner** (`import { toast } from "sonner"`), not any Radix toast.

### Build output

`pnpm build` runs two steps: Vite bundles the React app to `dist/public/`, then esbuild bundles `server/index.ts` to `dist/index.js`. Production: `node dist/index.js` serves the SPA with a catch-all for client-side routing.

## Key conventions

- Never nest `<a>` inside Wouter `<Link>` — `Link` already renders an `<a>`.
- Never use empty `value=""` on `<Select.Item>` (shadcn/ui constraint).
- Always pair `bg-card` with `text-card-foreground` (semantic tokens don't inherit automatically).
- Wouter does not support nested routing; keep routes flat.
- Always use TypeScript — no `any` types without a comment explaining why.
- Use Tailwind utility classes, not inline styles.
- Mobile-first CSS — always consider small screens first.
- Glassmorphic design theme — preserve existing visual style.

## What NOT to change without asking

- CSS variable names in the theme (breaking these breaks the whole design).
- Wouter routing setup — do not swap to React Router.
- The Tailwind CSS 4 config — v4 works differently from v3, be careful.

## Deployment

- Output is a static build (`pnpm build` → `dist/public/` folder).
- No environment variables needed (no backend).
- Can be deployed to Vercel, Netlify, or any static host.
- Originally built on Manus, now maintained locally with Claude Code.

## Approach

- Read existing files before writing. Don't re-read unless changed.
- Thorough in reasoning, concise in output.
- Skip files over 100KB unless required.
- No sycophantic openers or closing fluff.
- No emojis or em-dashes.
- Do not guess APIs, versions, flags, commit SHAs, or package names. Verify by reading code or docs before asserting.

<!-- code-review-graph MCP tools -->
## MCP Tools: code-review-graph

**IMPORTANT: This project has a knowledge graph. ALWAYS use the
code-review-graph MCP tools BEFORE using Grep/Glob/Read to explore
the codebase.** The graph is faster, cheaper (fewer tokens), and gives
you structural context (callers, dependents, test coverage) that file
scanning cannot.

### When to use graph tools FIRST

- **Exploring code**: `semantic_search_nodes` or `query_graph` instead of Grep
- **Understanding impact**: `get_impact_radius` instead of manually tracing imports
- **Code review**: `detect_changes` + `get_review_context` instead of reading entire files
- **Finding relationships**: `query_graph` with callers_of/callees_of/imports_of/tests_for
- **Architecture questions**: `get_architecture_overview` + `list_communities`

Fall back to Grep/Glob/Read **only** when the graph doesn't cover what you need.

### Key Tools

| Tool | Use when |
| ------ | ---------- |
| `detect_changes` | Reviewing code changes — gives risk-scored analysis |
| `get_review_context` | Need source snippets for review — token-efficient |
| `get_impact_radius` | Understanding blast radius of a change |
| `get_affected_flows` | Finding which execution paths are impacted |
| `query_graph` | Tracing callers, callees, imports, tests, dependencies |
| `semantic_search_nodes` | Finding functions/classes by name or keyword |
| `get_architecture_overview` | Understanding high-level codebase structure |
| `refactor_tool` | Planning renames, finding dead code |

### Workflow

1. The graph auto-updates on file changes (via hooks).
2. Use `detect_changes` for code review.
3. Use `get_affected_flows` to understand impact.
4. Use `query_graph` pattern="tests_for" to check coverage.
