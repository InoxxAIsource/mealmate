# MealMate 🍱

> **Aaj kya banau?** — A personalised Indian meal planning app that solves the daily "what should I cook today?" problem.

MealMate generates smart weekly meal plans tailored to your health track, dietary preferences, and regional Indian cuisine. Built as a mobile-first progressive web app.

---

## Features

- **AI-Generated Weekly Plans** — OpenAI-powered meal plan generation personalised to your health condition
- **7 Health Tracks** — PCOS, Diabetes, Thyroid, Pregnancy, Kids, Fitness/Gym, General
- **Swap & Customise** — Instantly swap any meal with a one-tap alternative
- **Dish Preferences** — Like/dislike dishes to teach the AI your taste
- **Grocery List** — Auto-generated shopping list from your weekly plan
- **Kids Lunch Box** — 10+ tiffin recipes for school lunch boxes
- **Fitness Nutrition Hub** — Pre/post-workout, lean, keto, and mass-gaining recipes with macro targets
- **Profile & Track Switching** — Change your health track anytime from the Profile page
- **Beautiful Dish Photos** — AI-generated images for all 55 dishes

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19 + Vite + Tailwind CSS + shadcn/ui |
| Routing | Wouter |
| Animations | Framer Motion |
| Backend | Express 5 (TypeScript) |
| Database | PostgreSQL (Replit) + Drizzle ORM |
| Auth | Clerk |
| AI | OpenAI via Replit AI Integration |
| API codegen | Orval (from OpenAPI 3.1 spec) |
| Monorepo | pnpm workspaces |

---

## Project Structure

```
├── artifacts/
│   ├── mealmate/          # React + Vite frontend
│   └── api-server/        # Express 5 API server
├── lib/
│   ├── db/                # Drizzle ORM schema + migrations
│   ├── api-spec/          # OpenAPI 3.1 spec + Orval codegen config
│   ├── api-client-react/  # Generated React Query hooks
│   └── api-zod/           # Generated Zod schemas
└── package.json           # pnpm workspace root
```

---

## Health Tracks

| Track | Focus | Special Feature |
|-------|-------|----------------|
| 🌸 PCOS | Low-GI, hormone-balancing | Excludes deep-fried, high-sugar dishes |
| 🩺 Diabetes | Blood-sugar friendly | Only diabetesSafe + low-GI dishes |
| 🦋 Thyroid | Metabolism-supportive | Thyroid-safe flag filtering |
| 🤰 Pregnancy | Nourishing for mum & baby | Excludes unsafe ingredients |
| 👧 Kids | Fun, nutritious tiffins | Lunch Box tab with 10 tiffin recipes |
| 💪 Fitness/Gym | Workout nutrition | Pre/post-workout, lean, keto, gaining |
| 🏠 General | Everyday family meals | Full dish library |

---

## Getting Started

### Prerequisites
- Node.js 24+
- pnpm 9+
- PostgreSQL database (or use Replit's built-in DB)

### Environment Variables

Create environment secrets for:

```
DATABASE_URL=           # PostgreSQL connection string
SESSION_SECRET=         # Express session secret
CLERK_SECRET_KEY=       # Clerk backend key
CLERK_PUBLISHABLE_KEY=  # Clerk publishable key (also set as VITE_CLERK_PUBLISHABLE_KEY)
AI_INTEGRATIONS_OPENAI_BASE_URL=    # OpenAI-compatible base URL
AI_INTEGRATIONS_OPENAI_API_KEY=     # OpenAI API key
```

### Install & Run

```bash
# Install all dependencies
pnpm install

# Push database schema
pnpm --filter @workspace/db run push

# Run API server (port 8080)
pnpm --filter @workspace/api-server run dev

# Run frontend (Vite dev server)
pnpm --filter @workspace/mealmate run dev
```

### Key Commands

```bash
# Full typecheck across all packages
pnpm run typecheck

# Regenerate API client from OpenAPI spec
pnpm --filter @workspace/api-spec run codegen

# Build all packages
pnpm run build
```

---

## Database Schema

### `dishes`
55 seeded Indian dishes with full nutritional data:
- Macros: calories, protein, carbs, fat, fibre, calcium, iron, sodium, sugar
- Health flags: `pcos_safe`, `diabetes_safe`, `thyroid_safe`, `pregnancy_safe`, `kids_safe`, `gym_safe`
- Gym fields: `gym_categories` (pre_workout | post_workout | lean | keto | gaining), `benefits_gym`
- Metadata: region, diet_type, meal_type, prep_time_min, ingredients (JSONB)

### `profiles`
User profiles with onboarding state, health track, dietary preferences, and body stats.

### `meal_plans`
Weekly meal plans stored as JSON (7 days × 4 meal slots: breakfast, lunch, snack, dinner).

### `dish_preferences`
Per-user liked/disliked dish IDs used to bias AI meal generation.

---

## API Routes

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/healthz` | Health check |
| GET/PUT | `/api/profiles/me` | Get / upsert user profile |
| GET | `/api/dishes` | List all dishes (filterable) |
| GET | `/api/dishes/:id` | Get single dish |
| GET | `/api/meal-plans/active` | Current week's meal plan |
| GET | `/api/meal-plans/dashboard` | Today's dashboard summary |
| POST | `/api/meal-plans/generate` | AI-generate a new weekly plan |
| POST | `/api/meal-plans/swap` | Swap a single meal |
| GET | `/api/grocery-list` | Auto-generated grocery list |
| GET/POST | `/api/dish-preferences` | Get / set liked or disliked dishes |

---

## Dish Library

| IDs | Category |
|-----|----------|
| 1–20 | General Indian dishes (all tracks) |
| 21–30 | Kids lunch box / tiffin recipes |
| 31–35 | Pre-workout meals |
| 36–40 | Post-workout / high-protein meals |
| 41–45 | Lean / cutting phase meals |
| 46–50 | Keto Indian meals |
| 51–55 | Mass-gaining / bulking meals |

---

## License

MIT
