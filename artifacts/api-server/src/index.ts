import app from "./app";
import { logger } from "./lib/logger";
import { startScheduler } from "./scheduler";
import { pool } from "@workspace/db";

async function runMigrations() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS push_subscriptions (
        id SERIAL PRIMARY KEY,
        profile_id INTEGER NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
        endpoint TEXT NOT NULL UNIQUE,
        p256dh TEXT NOT NULL,
        auth TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL
      );
      CREATE INDEX IF NOT EXISTS push_subscriptions_profile_id_idx
        ON push_subscriptions(profile_id);
      ALTER TABLE profiles ADD COLUMN IF NOT EXISTS plan_invalidated_at TIMESTAMP;
      ALTER TABLE dishes ADD COLUMN IF NOT EXISTS vrat_safe BOOLEAN NOT NULL DEFAULT false;
      ALTER TABLE dishes ADD COLUMN IF NOT EXISTS benefits_vrat TEXT;
    `);

    // Deduplicate active plans: for each profile with multiple active plans,
    // keep only the most recently created one
    await pool.query(`
      UPDATE meal_plans
      SET is_active = false
      WHERE is_active = true
        AND id NOT IN (
          SELECT DISTINCT ON (profile_id) id
          FROM meal_plans
          WHERE is_active = true
          ORDER BY profile_id, created_at DESC
        )
    `);

    // Mark existing production dishes that are vrat-safe (no onion, garlic, non-veg, regular wheat/rice)
    await pool.query(`
      UPDATE dishes SET vrat_safe = true
      WHERE id IN (9, 10, 17, 20, 29, 32, 35)
        AND vrat_safe = false;
    `);

    // Insert vrat-specific dishes (idempotent — skip if name already exists)
    const vratDishes = [
      {
        name: "Aloo Jeera",
        region: ["North", "West", "Pan India"],
        mealType: ["lunch", "dinner"],
        dietType: "veg",
        cal: 210, protein: 4, carbs: 32, fat: 8, fibre: 4,
        calcium: 30, iron: 1.5, sodium: 280, sugar: 2,
        prepTimeMin: 20,
        vatSafe: true,
        ingredients: [
          { name: "Potato", grams: 200 },
          { name: "Ghee", grams: 12 },
          { name: "Cumin Seeds", grams: 3 },
          { name: "Sendha Namak", grams: 2 },
          { name: "Green Chili", grams: 2 },
          { name: "Coriander", grams: 10 },
        ],
      },
      {
        name: "Kuttu Paratha",
        region: ["North", "Pan India"],
        mealType: ["breakfast", "lunch"],
        dietType: "veg",
        cal: 260, protein: 7, carbs: 38, fat: 9, fibre: 5,
        calcium: 60, iron: 2.2, sodium: 250, sugar: 1,
        prepTimeMin: 25,
        vatSafe: true,
        ingredients: [
          { name: "Kuttu Atta (Buckwheat Flour)", grams: 100 },
          { name: "Potato", grams: 80 },
          { name: "Ghee", grams: 10 },
          { name: "Sendha Namak", grams: 2 },
          { name: "Green Chili", grams: 2 },
        ],
      },
      {
        name: "Sama Chawal Pulao",
        region: ["North", "Pan India"],
        mealType: ["lunch", "dinner"],
        dietType: "veg",
        cal: 230, protein: 5, carbs: 36, fat: 7, fibre: 3,
        calcium: 20, iron: 1.2, sodium: 260, sugar: 2,
        prepTimeMin: 25,
        vatSafe: true,
        ingredients: [
          { name: "Sama Chawal (Barnyard Millet)", grams: 80 },
          { name: "Potato", grams: 60 },
          { name: "Ghee", grams: 10 },
          { name: "Cumin Seeds", grams: 3 },
          { name: "Sendha Namak", grams: 2 },
          { name: "Coriander", grams: 10 },
        ],
      },
      {
        name: "Sabudana Kheer",
        region: ["North", "West", "Pan India"],
        mealType: ["snack", "dinner"],
        dietType: "veg",
        cal: 280, protein: 6, carbs: 42, fat: 8, fibre: 1,
        calcium: 180, iron: 0.8, sodium: 80, sugar: 22,
        prepTimeMin: 20,
        vatSafe: true,
        ingredients: [
          { name: "Sabudana", grams: 60 },
          { name: "Full Fat Milk", grams: 250 },
          { name: "Sugar", grams: 15 },
          { name: "Cardamom", grams: 1 },
        ],
      },
      {
        name: "Makhana Stir Fry",
        region: ["North", "Pan India"],
        mealType: ["snack", "breakfast"],
        dietType: "veg",
        cal: 180, protein: 5, carbs: 22, fat: 8, fibre: 2,
        calcium: 40, iron: 1.0, sodium: 200, sugar: 1,
        prepTimeMin: 10,
        vatSafe: true,
        ingredients: [
          { name: "Makhana (Fox Nuts)", grams: 80 },
          { name: "Ghee", grams: 8 },
          { name: "Sendha Namak", grams: 1 },
          { name: "Black Pepper", grams: 1 },
        ],
      },
      {
        name: "Rajgira Paratha",
        region: ["North", "West", "Pan India"],
        mealType: ["breakfast", "lunch"],
        dietType: "veg",
        cal: 270, protein: 8, carbs: 35, fat: 10, fibre: 6,
        calcium: 280, iron: 3.5, sodium: 240, sugar: 1,
        prepTimeMin: 20,
        vatSafe: true,
        ingredients: [
          { name: "Rajgira Atta (Amaranth Flour)", grams: 100 },
          { name: "Potato", grams: 80 },
          { name: "Ghee", grams: 10 },
          { name: "Sendha Namak", grams: 2 },
          { name: "Green Chili", grams: 2 },
        ],
      },
      {
        name: "Paneer Saffron Gravy",
        region: ["North", "Pan India"],
        mealType: ["lunch", "dinner"],
        dietType: "veg",
        cal: 300, protein: 14, carbs: 12, fat: 22, fibre: 2,
        calcium: 280, iron: 1.0, sodium: 300, sugar: 4,
        prepTimeMin: 30,
        vatSafe: true,
        ingredients: [
          { name: "Paneer", grams: 150 },
          { name: "Curd", grams: 60 },
          { name: "Tomato Puree", grams: 80 },
          { name: "Saffron", grams: 0.2 },
          { name: "Ghee", grams: 10 },
          { name: "Cardamom", grams: 1 },
          { name: "Sendha Namak", grams: 2 },
        ],
      },
      {
        name: "Arbi Sabzi (Taro Root Curry)",
        region: ["North", "West", "Pan India"],
        mealType: ["lunch", "dinner"],
        dietType: "veg",
        cal: 200, protein: 4, carbs: 30, fat: 7, fibre: 4,
        calcium: 40, iron: 1.4, sodium: 270, sugar: 1,
        prepTimeMin: 25,
        vatSafe: true,
        ingredients: [
          { name: "Arbi (Taro Root)", grams: 200 },
          { name: "Ghee", grams: 10 },
          { name: "Cumin Seeds", grams: 3 },
          { name: "Sendha Namak", grams: 2 },
          { name: "Amchur", grams: 2 },
          { name: "Green Chili", grams: 2 },
        ],
      },
      {
        name: "Lauki Halwa (Bottle Gourd Dessert)",
        region: ["North", "Pan India"],
        mealType: ["snack", "dinner"],
        dietType: "veg",
        cal: 220, protein: 5, carbs: 30, fat: 9, fibre: 2,
        calcium: 150, iron: 0.6, sodium: 80, sugar: 24,
        prepTimeMin: 30,
        vatSafe: true,
        ingredients: [
          { name: "Bottle Gourd (Lauki)", grams: 300 },
          { name: "Full Fat Milk", grams: 200 },
          { name: "Sugar", grams: 25 },
          { name: "Ghee", grams: 10 },
          { name: "Cardamom", grams: 1 },
        ],
      },
      {
        name: "Singhare Ki Puri",
        region: ["North", "Pan India"],
        mealType: ["breakfast", "lunch"],
        dietType: "veg",
        cal: 280, protein: 6, carbs: 38, fat: 11, fibre: 5,
        calcium: 50, iron: 2.0, sodium: 260, sugar: 1,
        prepTimeMin: 20,
        vatSafe: true,
        ingredients: [
          { name: "Singhare Ka Atta (Water Chestnut Flour)", grams: 100 },
          { name: "Potato", grams: 60 },
          { name: "Oil", grams: 12 },
          { name: "Sendha Namak", grams: 2 },
          { name: "Green Chili", grams: 2 },
        ],
      },
    ];

    // Maharashtra-specific dishes
    const marathiDishes = [
      {
        name: "Puran Poli",
        region: ["Maharashtra", "West"],
        mealType: ["breakfast", "lunch"],
        dietType: "veg",
        cal: 310, protein: 9, carbs: 52, fat: 7, fibre: 5,
        calcium: 50, iron: 2.5, sodium: 220, sugar: 18,
        prepTimeMin: 45,
        vatSafe: false,
        ingredients: [
          { name: "Chana Dal", grams: 80 },
          { name: "Jaggery", grams: 50 },
          { name: "Whole Wheat Flour", grams: 80 },
          { name: "Ghee", grams: 10 },
          { name: "Cardamom", grams: 1 },
        ],
      },
      {
        name: "Vada Pav",
        region: ["Maharashtra", "West"],
        mealType: ["breakfast", "snack", "lunch"],
        dietType: "veg",
        cal: 350, protein: 8, carbs: 55, fat: 11, fibre: 4,
        calcium: 60, iron: 2.0, sodium: 480, sugar: 4,
        prepTimeMin: 30,
        vatSafe: false,
        ingredients: [
          { name: "Potato", grams: 150 },
          { name: "Pav Bun", grams: 80 },
          { name: "Besan", grams: 40 },
          { name: "Oil", grams: 15 },
          { name: "Garlic", grams: 8 },
          { name: "Green Chili", grams: 3 },
          { name: "Mustard Seeds", grams: 2 },
        ],
      },
      {
        name: "Misal Pav",
        region: ["Maharashtra", "West"],
        mealType: ["breakfast", "lunch"],
        dietType: "veg",
        cal: 380, protein: 16, carbs: 58, fat: 9, fibre: 12,
        calcium: 80, iron: 4.0, sodium: 520, sugar: 4,
        prepTimeMin: 35,
        vatSafe: false,
        ingredients: [
          { name: "Matki (Moth Beans) Sprouts", grams: 150 },
          { name: "Pav Bun", grams: 80 },
          { name: "Onion", grams: 60 },
          { name: "Tomato", grams: 60 },
          { name: "Oil", grams: 10 },
          { name: "Misal Masala", grams: 8 },
        ],
      },
      {
        name: "Jowar Bhakri with Zunka",
        region: ["Maharashtra", "West"],
        mealType: ["lunch", "dinner"],
        dietType: "veg",
        cal: 290, protein: 12, carbs: 44, fat: 8, fibre: 7,
        calcium: 70, iron: 3.5, sodium: 300, sugar: 2,
        prepTimeMin: 30,
        vatSafe: false,
        ingredients: [
          { name: "Jowar Flour", grams: 100 },
          { name: "Besan", grams: 60 },
          { name: "Onion", grams: 50 },
          { name: "Garlic", grams: 5 },
          { name: "Oil", grams: 10 },
          { name: "Turmeric", grams: 1 },
          { name: "Red Chili Powder", grams: 2 },
        ],
      },
      {
        name: "Amti (Maharashtrian Dal)",
        region: ["Maharashtra", "West"],
        mealType: ["lunch", "dinner"],
        dietType: "veg",
        cal: 200, protein: 10, carbs: 28, fat: 6, fibre: 6,
        calcium: 50, iron: 2.8, sodium: 310, sugar: 3,
        prepTimeMin: 25,
        vatSafe: false,
        ingredients: [
          { name: "Toor Dal", grams: 80 },
          { name: "Tamarind", grams: 8 },
          { name: "Jaggery", grams: 5 },
          { name: "Goda Masala", grams: 5 },
          { name: "Mustard Seeds", grams: 2 },
          { name: "Oil", grams: 8 },
          { name: "Coconut", grams: 20 },
        ],
      },
      {
        name: "Shrikhand",
        region: ["Maharashtra", "West", "Gujarat"],
        mealType: ["snack"],
        dietType: "veg",
        cal: 230, protein: 8, carbs: 38, fat: 5, fibre: 1,
        calcium: 220, iron: 0.3, sodium: 70, sugar: 32,
        prepTimeMin: 15,
        vatSafe: false,
        ingredients: [
          { name: "Hung Curd", grams: 200 },
          { name: "Sugar", grams: 40 },
          { name: "Saffron", grams: 0.1 },
          { name: "Cardamom", grams: 1 },
          { name: "Pistachio", grams: 10 },
        ],
      },
      {
        name: "Sabudana Thalipeeth",
        region: ["Maharashtra", "West"],
        mealType: ["breakfast", "snack"],
        dietType: "veg",
        cal: 250, protein: 6, carbs: 38, fat: 8, fibre: 3,
        calcium: 40, iron: 1.5, sodium: 240, sugar: 1,
        prepTimeMin: 20,
        vatSafe: true,
        ingredients: [
          { name: "Sabudana", grams: 80 },
          { name: "Potato", grams: 60 },
          { name: "Peanuts", grams: 30 },
          { name: "Oil", grams: 8 },
          { name: "Sendha Namak", grams: 2 },
          { name: "Green Chili", grams: 2 },
          { name: "Coriander", grams: 8 },
        ],
      },
    ];

    for (const d of [...vratDishes, ...marathiDishes]) {
      await pool.query(
        `INSERT INTO dishes (
          name, region, meal_type, diet_type,
          cal, protein, carbs, fat, fibre, calcium, iron, sodium, sugar,
          prep_time_min, vrat_safe, benefits_vrat, ingredients,
          pcos_safe, diabetes_safe, thyroid_safe, pregnancy_safe,
          kids_safe, gym_safe, cholesterol_safe, low_gi, high_calcium,
          high_fibre, deep_fried, pregnancy_exclude,
          photo_url, gym_categories, benefits_pcos, benefits_diabetes,
          benefits_thyroid, benefits_pregnancy, benefits_kids,
          benefits_gym, benefits_cholesterol
        ) SELECT
          $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,
          false,false,false,false,false,false,false,false,false,false,false,false,
          '','[]'::jsonb,'','','','','','',''
        WHERE NOT EXISTS (SELECT 1 FROM dishes WHERE name = $1)`,
        [
          d.name, JSON.stringify(d.region), JSON.stringify(d.mealType), d.dietType,
          d.cal, d.protein, d.carbs, d.fat, d.fibre,
          d.calcium, d.iron, d.sodium, d.sugar,
          d.prepTimeMin, d.vatSafe,
          d.vatSafe ? "Vrat-safe sattvik dish — no onion, garlic or grains. Suitable for Hindu fasting days." : null,
          JSON.stringify(d.ingredients),
        ]
      );
    }

    logger.info("Startup migrations completed");
  } catch (err) {
    logger.error({ err }, "Startup migration failed");
  }
}

const rawPort = process.env["PORT"];

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

app.listen(port, async (err) => {
  if (err) {
    logger.error({ err }, "Error listening on port");
    process.exit(1);
  }

  logger.info({ port }, "Server listening");
  await runMigrations();
  startScheduler();
});
