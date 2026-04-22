# MealCoreAI 🍱

> **Aaj kya banau?** That's Hindi for "What should I cook today?" — and it's the question this app exists to answer.
>
> **Live app → [mealcoreai.com](https://mealcoreai.com)**
>
> ---
>
> ## Why this exists
>
> My co-founder got PCOS. Her doctor handed her a printed diet sheet that said "avoid refined carbs." No recipes. No context. No understanding that she's from Tamil Nadu and has never cooked a quinoa bowl in her life.
>
> She tried every app. None of them knew what Ragi Dosa was.
>
> So we built one that does.
>
> MealCoreAI generates a personalised 7-day Indian meal plan — breakfast, lunch, snack, dinner — based on your health condition, your region, and food you actually eat. Not a Western wellness app with an Indian font. An app built from scratch for how Indian families actually cook and eat.
>
> ---
>
> ## What it does
>
> You tell it your health condition and region. It gives you a full week of meals. Ragi dosa for PCOS. Moong dal for diabetes. Bajra roti for thyroid support. Real Indian food, clinically matched to your condition.
>
> Every day it sends you a push notification at breakfast, lunch, and dinner — not a generic "time to eat!" reminder, but the actual dish name from your plan. "Lunch time: Palak Paneer + Jowar Roti." That specificity is what makes people actually use it.
>
> If a meal doesn't work for you that day — wrong ingredient in the fridge, not in the mood — you tap Swap. It regenerates just that one meal and leaves the rest of the week alone. That one button is the feature people use most.
>
> ---
>
> ## Health tracks
>
> - 🌸 **PCOS** — low-GI, hormone-friendly, high-protein. No deep-fried anything.
> - - 🩺 **Diabetes** — only dishes verified safe for blood sugar. Bhatura will never appear here.
>   - - 🦋 **Thyroid** — careful about cruciferous vegetables (yes, gobi can interfere with thyroid meds), iodine-aware.
>     - - 🤰 **Pregnancy** — no papaya, no raw eggs, iron + folate + calcium every single day.
>       - - 👧 **Kids** — fun tiffin ideas, school lunch box tab, nothing that takes more than 25 minutes.
>         - - 💪 **Fitness/Gym** — pre/post-workout, lean, keto, gaining — Indian style.
>           - - 🏠 **General** — everyday family meals. The full dish library.
>            
>             - ---
>
> ## The dish database — this is actually the hard part
>
> Before writing any AI code, we built a database of 55 Indian dishes. Every single one has full nutritional data and health flags — `pcos_safe`, `diabetes_safe`, `thyroid_safe`, `pregnancy_safe`, `kids_safe`, `gym_safe`. These were verified with a nutritionist, not scraped from the internet.
>
> This is what stops the AI from hallucinating. Instead of asking GPT-4 to freely generate meal names (it will confidently invent nonsense), we make it choose from a numbered list of validated dish IDs. It becomes a selector, not a generator. The results are reliable.
>
> ---
>
> ## Tech stack
>
> React 19 + Vite + Tailwind on the front. Express 5 (TypeScript) on the back. PostgreSQL + Drizzle ORM. OpenAPI 3.1 as the single source of truth — Orval auto-generates the React Query hooks and Zod schemas from the spec. No manual API client code, ever.
>
> Auth via Clerk. Push notifications via VAPID Web Push. Hosted on Replit.
>
> ```
> pnpm monorepo
> ├── artifacts/mealmate/       # React + Vite PWA
> ├── artifacts/api-server/     # Express 5 API
> ├── lib/db/                   # Drizzle schema + migrations
> ├── lib/api-spec/             # OpenAPI 3.1 spec + Orval config
> ├── lib/api-client-react/     # Generated React Query hooks
> └── lib/api-zod/              # Generated Zod schemas
> ```
>
> ---
>
> ## Running it locally
>
> You'll need Node 24+, pnpm 9+, and a PostgreSQL database.
>
> ```bash
> # Install
> pnpm install
>
> # Push schema
> pnpm --filter @workspace/db run push
>
> # Run API (port 8080)
> pnpm --filter @workspace/api-server run dev
>
> # Run frontend (Vite dev server)
> pnpm --filter @workspace/mealmate run dev
> ```
>
> Environment variables you'll need:
> ```
> DATABASE_URL=
> SESSION_SECRET=
> CLERK_SECRET_KEY=
> CLERK_PUBLISHABLE_KEY=
> VITE_CLERK_PUBLISHABLE_KEY=
> AI_INTEGRATIONS_OPENAI_BASE_URL=
> AI_INTEGRATIONS_OPENAI_API_KEY=
> VAPID_PUBLIC_KEY=
> VAPID_PRIVATE_KEY=
> ```
>
> ---
>
> ## A note on iOS push notifications
>
> They only work on Safari 16.4+ when the app is added to the Home Screen. Not in a browser tab. The app handles this with a custom prompt that shows install instructions — it only appears once and doesn't come back for 30 days if you dismiss it.
>
> ---
>
> ## Lighthouse scores (marketing site)
>
> Performance 97 · Accessibility 96 · Best Practices 100 · SEO 100
>
> ---
>
> ## License
>
> MIT. Fork it, break it, build something better for your market.
>
> ---
>
> *Built by [Inoxx Protocol](https://github.com/InoxxAIsource). Full story on [Dev.to](https://dev.to/inoxx_protocol_0658f35b52/how-i-built-an-ai-meal-planner-for-1-billion-indians-from-zero-to-pwa-with-gpt-4-push-2nda).*
