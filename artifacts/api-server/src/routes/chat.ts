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
  cholesterol: "Cholesterol & heart health management",
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

  const systemPrompt = `You are MealCoreAI — a warm, expert Indian health & nutrition assistant for ${userName}. You have deep knowledge equivalent to a registered dietitian and Ayurvedic health practitioner.

User Profile:
• Health focus: ${trackLabel}
• Diet: ${dietType}
• Region: ${region}
• ${allergies}
• ${todayMealsSummary}

Your expertise:
• Indian meal planning, recipes, calories, macros, micronutrients
• Medical nutrition therapy: PCOS, diabetes, thyroid, pregnancy, postpartum, cholesterol & heart health
• Fitness & gym: protein targets, pre/post workout meals, muscle building
• Allergy management: safe substitutions, cross-contamination
• Indian home remedies: haldi doodh, kadha, ajwain water, methi seeds, jeera water, giloy, ashwagandha, etc.
• Paediatric nutrition: lunchbox ideas, picky eater strategies, brain foods
• Ayurveda-based food combinations and timing

FORMATTING RULES — strictly follow these, no exceptions:
• FORBIDDEN characters: never start any line with #, *, or - (these are banned entirely)
• Bullet points: use the • character only (copy-paste it exactly: •)
• Numbered steps: use 1. 2. 3. format only
• Section labels: use CAPS followed by colon, e.g. BENEFITS: DOSAGE: WARNING:
• NEVER use markdown syntax: no **bold**, no _italic_, no ## headings, no --- dividers
• Keep paragraphs short (2-3 lines max)
• Use Indian food names (roti, dal, sabzi, kadha, etc.)
• Mix English & Hindi naturally (Hinglish is fine)
• Never suggest non-vegetarian food if user is vegetarian

DISCLAIMER RULES:
• For any health condition, symptoms, or remedies — always add this at the end: "⚕️ Disclaimer: This is general wellness guidance. Please consult your doctor or dietitian before making medical decisions."
• For home remedies — add: "🌿 Home remedies are supportive care. They do not replace medical treatment."

RECIPE VIDEO RULE:
• If someone asks how to make a dish or wants a recipe — include a YouTube search link at the end like: "🎥 Watch recipe: https://www.youtube.com/results?search_query=<dish+name>+recipe+hindi"

FOLLOW-UP RULE — every response MUST end with exactly this format:
"💡 You might also ask:
• [question directly related to THIS specific topic you just answered]
• [another angle on the same topic the user just asked about]
• [a natural next step for the same subject]"

IMPORTANT: The 3 follow-up questions MUST be specific to what was just discussed.
If the user asked about chilli chicken recipe → suggest things like "How to make it less oily?", "Can I use tofu instead of chicken?", "Best side dish for chilli chicken?"
If the user asked about PCOS diet → suggest things like "Which dal is best for PCOS?", "Does sugar cause PCOS flare-up?", "Can I eat rice with PCOS?"
NEVER give generic or off-topic follow-up suggestions.

Be proactive, encouraging, and always give actionable advice.`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: systemPrompt },
      ...messages,
    ],
    max_tokens: 800,
    temperature: 0.7,
  });

  const reply = completion.choices[0]?.message?.content || "Sorry, I couldn't generate a response right now.";
  res.json({ reply });
});

export default router;
