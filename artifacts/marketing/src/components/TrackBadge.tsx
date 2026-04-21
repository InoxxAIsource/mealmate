type Track =
  | "pcos"
  | "diabetes"
  | "thyroid"
  | "pregnancy"
  | "kids"
  | "fitness"
  | "cholesterol"
  | "general";

interface TrackBadgeProps {
  track: Track;
  size?: "sm" | "md";
}

const TRACK_META: Record<
  Track,
  { label: string; color: string; bg: string; emoji: string }
> = {
  pcos: { label: "PCOS", color: "text-rose-600", bg: "bg-rose-50 border-rose-200", emoji: "🌸" },
  diabetes: { label: "Diabetes", color: "text-teal-700", bg: "bg-teal-50 border-teal-200", emoji: "💙" },
  thyroid: { label: "Thyroid", color: "text-emerald-700", bg: "bg-emerald-50 border-emerald-200", emoji: "🦋" },
  pregnancy: { label: "Pregnancy", color: "text-orange-700", bg: "bg-orange-50 border-orange-200", emoji: "🤰" },
  kids: { label: "Kids", color: "text-yellow-700", bg: "bg-yellow-50 border-yellow-200", emoji: "🧒" },
  fitness: { label: "Fitness", color: "text-blue-700", bg: "bg-blue-50 border-blue-200", emoji: "💪" },
  cholesterol: { label: "Cholesterol", color: "text-purple-700", bg: "bg-purple-50 border-purple-200", emoji: "❤️" },
  general: { label: "General", color: "text-slate-700", bg: "bg-slate-50 border-slate-200", emoji: "🌿" },
};

export default function TrackBadge({ track, size = "md" }: TrackBadgeProps) {
  const meta = TRACK_META[track];
  const sizeClass = size === "sm" ? "text-xs px-2 py-0.5" : "text-sm px-3 py-1";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-medium ${sizeClass} ${meta.bg} ${meta.color}`}
    >
      <span>{meta.emoji}</span>
      {meta.label}
    </span>
  );
}

export { TRACK_META };
export type { Track };
