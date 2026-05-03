"use client";
import { useEffect } from "react";

export default function WebMCP() {
  useEffect(() => {
    if (typeof navigator === "undefined") return;
    const nav = navigator as Navigator & {
      modelContext?: {
        provideContext: (ctx: unknown) => void;
      };
    };
    if (!nav.modelContext?.provideContext) return;

    nav.modelContext.provideContext({
      tools: [
        {
          name: "generate_meal_plan",
          description:
            "Navigate to MealCoreAI to generate a personalised 7-day Indian meal plan for a health condition. Uses only real Indian dishes — roti, dal, ragi dosa, jowar khichdi, besan cheela.",
          inputSchema: {
            type: "object",
            properties: {
              condition: {
                type: "string",
                enum: [
                  "pcos",
                  "diabetes",
                  "thyroid",
                  "pregnancy",
                  "kids",
                  "cholesterol",
                  "weight-loss",
                ],
                description: "Health condition to generate a meal plan for",
              },
              cuisine: {
                type: "string",
                enum: [
                  "south-indian",
                  "north-indian",
                  "gujarati",
                  "bengali",
                  "maharashtrian",
                  "punjabi",
                  "rajasthani",
                ],
                description: "Regional Indian cuisine preference",
              },
            },
            required: ["condition"],
          },
          execute: async (input: { condition: string; cuisine?: string }) => {
            const url = `https://mealcoreai.com/${input.condition}-meal-plan`;
            window.location.href = url;
            return { url };
          },
        },
        {
          name: "browse_blog",
          description:
            "Browse MealCoreAI blog posts about Indian nutrition for health conditions including PCOS, Diabetes, Thyroid, Pregnancy, Kids, and Cholesterol",
          inputSchema: {
            type: "object",
            properties: {
              topic: {
                type: "string",
                description:
                  "Topic to find articles on, e.g. 'pcos diet', 'diabetes breakfast', 'thyroid foods India'",
              },
            },
          },
          execute: async (_input: { topic?: string }) => {
            const url = "https://mealcoreai.com/blog";
            window.location.href = url;
            return { url };
          },
        },
        {
          name: "view_pricing",
          description: "View MealCoreAI pricing plans — free tier and paid tiers",
          inputSchema: {
            type: "object",
            properties: {},
          },
          execute: async () => {
            const url = "https://mealcoreai.com/pricing";
            window.location.href = url;
            return { url };
          },
        },
      ],
    });
  }, []);

  return null;
}
