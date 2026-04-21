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
- Next.js 14 App Router SEO/marketing site, preview at `/` (root)
- Package: `@workspace/marketing`, port 22813
- Production: server mode (`next start`), dev mode (`next dev`)
- Pages: Home `/`, condition pages (`/pcos-meal-plan`, `/diabetes-meal-plan`, etc.), `/how-it-works`, `/pricing`, `/faq`, `/about`, `/blog`, `/blog/[slug]`, `/meal-plans/[slug]` (250 programmatic SEO pages)
- SEO: dynamic sitemap (`/sitemap.xml`), `robots.txt`, FAQPage/BreadcrumbList/Article JSON-LD schemas on all relevant pages
- OG Image API: `/api/og?title=...&condition=...&accent=...` using Next.js ImageResponse (edge runtime)
- Analytics: GA4 via `NEXT_PUBLIC_GA_ID` env var with afterInteractive loading
- Security headers: X-Frame-Options, X-Content-Type-Options, Referrer-Policy
- Blog: 20 full blog posts in `lib/blog-data.ts`, blog index + individual post pages with social share
- Data: `lib/seo-data.ts` (8 conditions, 17 regions, 6 meal types), `lib/blog-data.ts` (20 posts)

### MealCoreAI (artifacts/mealmate)
- React + Vite frontend, preview at `/app/` (BASE_PATH=/app/)
- Routes: `/dashboard`, `/dashboard/meal-plan`, `/dashboard/grocery`, etc. (all under /app/)
- API proxy: Vite proxies `/api` → api-server
- **PWA**: `public/manifest.json` + `public/sw.js` with push notification support
- **Push notifications**: `src/hooks/use-notifications.ts` + `src/components/notification-prompt.tsx`
  - NotificationPrompt shown on home dashboard after 3 seconds
  - iOS install hint for non-standalone iOS browsers
  - Service worker handles `push` events, `notificationclick` opens/focuses app
- Env vars: `VITE_CLERK_PUBLISHABLE_KEY`, `VITE_CLERK_PROXY_URL`, `VAPID_PUBLIC_KEY` (in .replit), `VAPID_PRIVATE_KEY` (secret)

### API Server (artifacts/api-server)
- Express 5 + Clerk middleware + Drizzle ORM
- Port 8080, exposed externally at 8080
- Routes: `/api/healthz`, `/api/profiles/me`, `/api/dishes`, `/api/meal-plans/*`, `/api/grocery-list`, `/api/dish-preferences`, `/api/notifications/*`
- Clerk proxy middleware at `CLERK_PROXY_PATH`
- OpenAI integration for meal plan generation
- **Push notification routes**: `/api/notifications/vapid-public-key`, `/api/notifications/subscribe`, `/api/notifications/unsubscribe`, `/api/notifications/test`
- **Meal reminder scheduler** (`src/scheduler.ts`): sends personalised push notifications at 8:00am, 1:00pm, 7:30pm IST with actual dish names from user's active plan

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
