# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Primary product: **MealCoreAI** — a personalised Indian meal planning web app for 8 health condition tracks (PCOS, Diabetes, Thyroid, Pregnancy, Kids, Fitness, General, Cholesterol).

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: Replit PostgreSQL + Drizzle ORM
- **Auth**: Clerk (whitelabel, provisioned via Replit)
- **AI**: Replit OpenAI AI Integration (`AI_INTEGRATIONS_OPENAI_BASE_URL` + `AI_INTEGRATIONS_OPENAI_API_KEY`)
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec in `lib/api-spec/openapi.yaml`)
- **Build**: esbuild (CJS bundle)
- **Frontend**: React + Vite + Tailwind CSS + shadcn/ui + wouter + framer-motion

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

## Artifacts

### MealCoreAI Marketing (artifacts/marketing)
- React + Vite marketing/SEO site, preview at `/marketing/`
- Package: `@workspace/marketing`, port 22813
- Pages: Home (single-page with Hero, Features, Health Tracks, How It Works, Testimonials, FAQ, CTA)
- Components: `Navbar.tsx`, `Footer.tsx`, `CTAButton.tsx`, `TrackBadge.tsx`
- CTA buttons link to the app via `VITE_APP_URL` env var (defaults to `/mealmate/`)
- Orange/rose brand palette, Inter font, fully responsive

### MealCoreAI (artifacts/mealmate)
- React + Vite frontend, preview at `/`
- Routes: `/` (landing), `/sign-in`, `/sign-up`, `/onboarding/*`, `/dashboard/*`
- API proxy: Vite proxies `/api` → `http://localhost:8080`
- Env vars: `VITE_CLERK_PUBLISHABLE_KEY`, `VITE_CLERK_PROXY_URL` (optional in dev)

### API Server (artifacts/api-server)
- Express 5 + Clerk middleware + Drizzle ORM
- Port 8080, exposed externally at 8080
- Routes: `/api/healthz`, `/api/profiles/me`, `/api/dishes`, `/api/meal-plans/*`, `/api/grocery-list`, `/api/dish-preferences`
- Clerk proxy middleware at `CLERK_PROXY_PATH`
- OpenAI integration for meal plan generation

## Database Schema (lib/db/src/schema/)

- `profiles` — user profiles with health track, diet preferences, onboarding state
- `dishes` — 155 seeded Indian dishes (20 per region, covering all 8 tracks) with nutritional data, health flags, gym_categories, cholesterolSafe, and YouTube links
- `meal_plans` — weekly meal plans (stored as JSON: 7 days × 4 meals)
- `dish_preferences` — user-favourite and disliked dish IDs

## Health Tracks

- **PCOS** (rose-400): Low-GI, no deep-fried, hormone-friendly
- **Diabetes** (teal-500): Low-GI + `diabetesSafe` flag
- **Thyroid** (emerald-400): `thyroidSafe` flag
- **Pregnancy** (orange-300): `pregnancySafe`, no `pregnancyExclude`
- **Kids** (yellow-400): `kidsSafe` flag; shows Lunch Box tab in bottom nav + `/dashboard/lunchbox` page
- **Fitness/Gym** (blue-to-violet): `gymSafe` flag; 5 gym_categories: `pre_workout`, `post_workout`, `lean`, `keto`, `gaining`; shows Fitness tab in bottom nav + `/dashboard/fitness` page
- **Cholesterol** (red-400): `cholesterolSafe` flag + no `deepFried`
- **General** (blue-400): All dishes

## API Client

- Generated hooks in `lib/api-client-react/src/generated/api.ts`
- Import from `@workspace/api-client-react` in the frontend
- Sessions via Clerk cookies (no bearer tokens needed in web)

## Packages

| Package | Path | Role |
|---------|------|------|
| `@workspace/marketing` | `artifacts/marketing` | Marketing/SEO landing page |
| `@workspace/mealmate` | `artifacts/mealmate` | Frontend React app (MealCoreAI) |
| `@workspace/api-server` | `artifacts/api-server` | Backend Express API |
| `@workspace/db` | `lib/db` | Drizzle schema + migrations |
| `@workspace/api-spec` | `lib/api-spec` | OpenAPI spec + Orval codegen |
| `@workspace/api-client-react` | `lib/api-client-react` | Generated React hooks |
| `@workspace/api-zod` | `lib/api-zod` | Generated Zod schemas |

See the `pnpm-workspace` skill for workspace structure and TypeScript setup.
