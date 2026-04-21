import { useState } from "react";

const DISH_EMOJIS: Record<string, string> = {
  oats: "🥣",
  upma: "🥣",
  idli: "🍘",
  dosa: "🥙",
  thepla: "🥙",
  roti: "🥙",
  paratha: "🥙",
  cheela: "🥞",
  chilla: "🥞",
  smoothie: "🥤",
  juice: "🥤",
  lassi: "🥛",
  kheer: "🍮",
  halwa: "🍮",
  dal: "🍲",
  lentil: "🍲",
  rajma: "🍛",
  chana: "🍛",
  chole: "🍛",
  moong: "🍵",
  rice: "🍚",
  biryani: "🍛",
  pulao: "🍛",
  khichdi: "🍲",
  curry: "🍛",
  sabzi: "🥘",
  saag: "🥬",
  palak: "🥬",
  methi: "🌿",
  paneer: "🧀",
  egg: "🍳",
  bhurji: "🍳",
  omelette: "🍳",
  chicken: "🍗",
  mutton: "🥩",
  fish: "🐟",
  salad: "🥗",
  raita: "🥗",
  sprouts: "🌱",
  poha: "🥣",
  sabudana: "🍚",
  makhana: "🍿",
};

function getDishEmoji(name: string): string {
  const lower = name.toLowerCase();
  for (const [key, emoji] of Object.entries(DISH_EMOJIS)) {
    if (lower.includes(key)) return emoji;
  }
  return "🍲";
}

const GRADIENTS = [
  "from-orange-100 to-amber-50",
  "from-green-100 to-emerald-50",
  "from-yellow-100 to-orange-50",
  "from-teal-100 to-cyan-50",
  "from-rose-100 to-orange-50",
  "from-lime-100 to-green-50",
];

function getGradient(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return GRADIENTS[Math.abs(hash) % GRADIENTS.length];
}

interface DishImageProps {
  photoUrl?: string | null;
  name: string;
  className?: string;
  emojiSize?: string;
}

export function DishImage({ photoUrl, name, className = "", emojiSize = "text-4xl" }: DishImageProps) {
  const [errored, setErrored] = useState(false);
  const emoji = getDishEmoji(name);
  const gradient = getGradient(name);

  if (!photoUrl || errored) {
    return (
      <div className={`flex flex-col items-center justify-center bg-gradient-to-br ${gradient} ${className}`}>
        <span className={emojiSize}>{emoji}</span>
      </div>
    );
  }

  return (
    <img
      src={photoUrl}
      alt={name}
      className={`object-cover ${className}`}
      onError={() => setErrored(true)}
    />
  );
}
