import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

const conditionEmojis: Record<string, string> = {
  pcos: "🌸",
  diabetes: "🩺",
  thyroid: "🦋",
  pregnancy: "🤱",
  kids: "👶",
  cholesterol: "❤️",
  weightloss: "⚖️",
  highprotein: "💪",
  nutrition: "🥗",
  general: "🍱",
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") || "MealCoreAI";
  const condition = searchParams.get("condition") || "general";
  const accent = searchParams.get("accent") || "16a34a";
  const emoji = conditionEmojis[condition] || "🍱";

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: `linear-gradient(135deg, #${accent}22 0%, #0f172a 60%)`,
          backgroundColor: "#0f172a",
          padding: "60px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top: wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ fontSize: "28px", fontWeight: 700, color: `#${accent}`, letterSpacing: "-1px" }}>
            MealCoreAI
          </span>
        </div>

        {/* Center: emoji + title */}
        <div style={{ display: "flex", alignItems: "center", gap: "40px" }}>
          <div style={{ fontSize: "140px", lineHeight: 1 }}>{emoji}</div>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: title.length > 40 ? "44px" : "56px",
                fontWeight: 800,
                color: "#ffffff",
                lineHeight: 1.15,
                letterSpacing: "-1px",
              }}
            >
              {title}
            </div>
            <div
              style={{
                marginTop: "16px",
                fontSize: "24px",
                color: "#94a3b8",
                fontWeight: 400,
              }}
            >
              Personalised AI meal planning for your health
            </div>
          </div>
        </div>

        {/* Bottom: tagline + domain */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: `#${accent}33`,
              border: `1px solid #${accent}66`,
              borderRadius: "999px",
              padding: "8px 20px",
              fontSize: "18px",
              color: "#ffffff",
            }}
          >
            🇮🇳 Made for Indian families
          </div>
          <div style={{ fontSize: "20px", color: "#64748b", fontWeight: 500 }}>
            mealcoreai.com
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
