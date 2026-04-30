import { useWaterLog, useSetWaterLog } from "@/hooks/use-water-log";

interface WaterTrackerProps {
  primaryTrack?: string | null;
}

const TRACK_CONGRATS: Record<string, string> = {
  pcos: "Proper hydration helps regulate hormones and reduces PCOS inflammation. Keep it up! 🌸",
  diabetes: "Staying hydrated improves insulin sensitivity and helps control blood sugar. Well done! 🩺",
  pregnancy: "You're keeping both you and your baby well-hydrated today. 🤰",
  thyroid: "Good hydration supports healthy thyroid function and metabolism. 🦋",
  cholesterol: "Staying hydrated supports heart health and circulation. ❤️",
  kids: "Great — well-hydrated children concentrate better and grow stronger! 🌟",
};

function WaterDrop({
  filled,
  index,
  onClick,
}: {
  filled: boolean;
  index: number;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`active:scale-90 transition-transform touch-manipulation`}
      aria-label={filled ? `Remove glass ${index + 1}` : `Add glass ${index + 1}`}
    >
      <svg
        width="28"
        height="32"
        viewBox="0 0 24 28"
        fill={filled ? "#3b82f6" : "#e5e7eb"}
        className="transition-colors duration-200"
      >
        <path d="M12 1C12 1 3 10.5 3 17C3 21.9706 7.02944 26 12 26C16.9706 26 21 21.9706 21 17C21 10.5 12 1 12 1Z" />
        {filled && (
          <ellipse cx="9" cy="13" rx="2" ry="3" fill="white" opacity="0.3" />
        )}
      </svg>
    </button>
  );
}

export function WaterTracker({ primaryTrack }: WaterTrackerProps) {
  const { data, isLoading } = useWaterLog();
  const setWater = useSetWaterLog();

  if (isLoading || !data) {
    return (
      <div className="bg-card border border-border shadow-sm rounded-2xl p-4 space-y-3 animate-pulse">
        <div className="h-4 bg-muted rounded w-1/3" />
        <div className="flex gap-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="w-7 h-8 bg-muted rounded-full" />
          ))}
        </div>
      </div>
    );
  }

  const { today, yesterday, goal } = data;
  const glasses = today.glasses;
  const goalReached = glasses >= goal;

  const congratsMessage =
    TRACK_CONGRATS[primaryTrack ?? ""] ??
    "Goal reached! Great hydration habit — keep it up! 💧";

  const handleDropClick = (index: number) => {
    const newCount = index + 1;
    if (newCount === glasses) {
      setWater.mutate(glasses - 1);
    } else {
      setWater.mutate(newCount);
    }
  };

  return (
    <div className="bg-card border border-border shadow-sm rounded-2xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">💧</span>
          <h2 className="text-sm font-bold text-foreground">Water Intake</h2>
        </div>
        <span className="text-xs text-muted-foreground font-medium">
          {glasses} / {goal} glasses
        </span>
      </div>

      {/* Drop grid — wrap at 5 per row so 10-drop goals look clean */}
      <div className="flex flex-wrap gap-1.5">
        {Array.from({ length: goal }).map((_, i) => (
          <WaterDrop
            key={i}
            filled={i < glasses}
            index={i}
            onClick={() => handleDropClick(i)}
          />
        ))}
      </div>

      {/* Status text */}
      {goalReached ? (
        <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 rounded-xl p-3">
          <p className="text-xs text-blue-800 dark:text-blue-200 font-medium leading-snug">
            🎉 {congratsMessage}
          </p>
        </div>
      ) : (
        <p className="text-xs text-muted-foreground">
          {glasses} out of {goal} glasses today
          {glasses === 0 && " — tap a drop to log your first glass!"}
        </p>
      )}

      {/* Yesterday reference */}
      {yesterday && (
        <p className="text-xs text-muted-foreground border-t border-border pt-2">
          Yesterday: {yesterday.glasses} / {goal} glasses
        </p>
      )}
    </div>
  );
}
