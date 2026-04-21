import { Router } from "express";
import { openai } from "../lib/openai-client";
import { db, profilesTable, mealPlansTable, dishesTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { requireAuth } from "../lib/auth-middleware";

const router = Router();

const TRACK_LABELS: Record<string, string> = {
  pcos: "PCOS (Polycystic Ovary Syndrome)",
  diabetes: "Diabetes management",
  thyroid: "Thyroid health",
  pregnancy: "Pregnancy & postnatal nutrition",
  kids: "Children's nutrition & lunchbox planning",
  fitness: "Fitness, gym & muscle building",
  general: "General healthy eating",
};

router.post("/chat", requireAuth, async (req, res) => {
  const clerkUserId = (req as any).clerkUserId as string;
  const { messages } = req.body as {
    messages: { role: "user" | "assistant"; content: string }[];
  };

  if (!Array.isArray(messages) || messages.length === 0) {
    res.status(400).json({ error: "messages array required" });
    return;
  }

  // Fetch user profile for personalised context
  const profiles = await db
    .select()
    .from(profilesTable)
    .where(eq(profilesTable.clerkUserId, clerkUserId))
    .limit(1);
  const profile = profiles[0];

  // Fetch today's meals
  let todayMealsSummary = "";
  if (profile) {
    const plans = await db
      .select()
      .from(mealPlansTable)
      .where(eq(mealPlansTable.profileId, profile.id))
      .limit(5);
    const activePlan = plans.find((p) => p.isActive) || plans[0];
    if (activePlan?.planData) {
      const days = activePlan.planData as any[];
      const today = days[0];
      if (today) {
        const dishIds = [today.breakfastId, today.lunchId, today.snackId, today.dinnerId].filter(Boolean);
        if (dishIds.length > 0) {
          const allDishes = await db.select().from(dishesTable);
          const dishMap = new Map(allDishes.map((d) => [d.id, d]));
          const mealNames = {
            breakfast: today.breakfastId ? dishMap.get(today.breakfastId)?.name : null,
            lunch: today.lunchId ? dishMap.get(today.lunchId)?.name : null,
            snack: today.snackId ? dishMap.get(today.snackId)?.name : null,
            dinner: today.dinnerId ? dishMap.get(today.dinnerId)?.name : null,
          };
          todayMealsSummary = `Today's planned meals: Breakfast: ${mealNames.breakfast || "not set"}, Lunch: ${mealNames.lunch || "not set"}, Snack: ${mealNames.snack || "not set"}, Dinner: ${mealNames.dinner || "not set"}.`;
        }
      }
    }
  }

  const userName = profile?.name || "there";
  const track = profile?.primaryTrack || "general";
  const trackLabel = TRACK_LABELS[track] || "general healthy eating";
  const dietType = profile?.dietType || "vegetarian";
  const region = profile?.region || "North India";
  const allergies = profile?.allergies?.length ? `Allergies: ${profile.allergies.join(", ")}.` : "No known allergies.";

  const systemPrompt = `You are MealMate AI — a warm, knowledgeable Indian health & nutrition assistant for ${userName}.

User Profile:
- Health focus: ${trackLabel}
- Diet: ${dietType}
- Region: ${region}
- ${allergies}
- ${todayMealsSummary}

Your expertise covers:
- Indian meal planning, recipes, and nutrition (calories, macros, micronutrients)
- Health conditions: PCOS, diabetes, thyroid, pregnancy, postpartum, children's nutrition
- Fitness & gym: protein intake, pre/post workout meals, muscle building
- Allergies & intolerances: safe substitutions, cross-contamination advice
- Indian home remedies: haldi doodh, ajwain, methi, jeera water, etc.
- Kid-friendly meals, lunchbox ideas, picky eater strategies

Your style:
- Warm, encouraging, like a knowledgeable didi or friend
- Always give PROACTIVE suggestions — don't just answer, add "You might also want to know..." or "Pro tip:"
- Use Indian food names (roti, dal, sabzi, kadha, etc.)
- Keep responses concise but helpful — use bullet points for lists
- For serious symptoms, recommend consulting a doctor
- Mix English & Hindi naturally (Hinglish is fine)
- Never suggest non-vegetarian food if the user is vegetarian

Always end with a short proactive tip or follow-up suggestion relevant to the user's health track.`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: systemPrompt },
      ...messages,
    ],
    max_tokens: 600,
    temperature: 0.7,
  });

  const reply = completion.choices[0]?.message?.content || "Sorry, I couldn't generate a response right now.";
  res.json({ reply });
});

export default router;
