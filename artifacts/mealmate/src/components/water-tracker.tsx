import { useWaterLog, useSetWaterLog } from "@/hooks/use-water-log";
import { useLanguage } from "@/hooks/use-language";

interface WaterTrackerProps {
  primaryTrack?: string | null;
}

const TRACK_CONGRATS_EN: Record<string, string> = {
  pcos: "Proper hydration helps regulate hormones and reduces PCOS inflammation. Keep it up! 🌸",
  diabetes: "Staying hydrated improves insulin sensitivity and helps control blood sugar. Well done! 🩺",
  pregnancy: "You're keeping both you and your baby well-hydrated today. 🤰",
  thyroid: "Good hydration supports healthy thyroid function and metabolism. 🦋",
  cholesterol: "Staying hydrated supports heart health and circulation. ❤️",
  kids: "Great — well-hydrated children concentrate better and grow stronger! 🌟",
};

const TRACK_CONGRATS_HI: Record<string, string> = {
  pcos: "सही मात्रा में पानी पीने से हार्मोन संतुलित होते हैं और PCOS में सूजन कम होती है। बहुत अच्छा! 🌸",
  diabetes: "पर्याप्त पानी इंसुलिन संवेदनशीलता बढ़ाता है और रक्त शर्करा नियंत्रित करता है। शाबाश! 🩺",
  pregnancy: "आप और आपके शिशु दोनों आज अच्छी तरह हाइड्रेटेड हैं। 🤰",
  thyroid: "अच्छा जलयोजन थायराइड कार्य और मेटाबॉलिज्म को समर्थन देता है। 🦋",
  cholesterol: "पर्याप्त पानी हृदय स्वास्थ्य और रक्त संचार के लिए अच्छा है। ❤️",
  kids: "बढ़िया — अच्छी तरह हाइड्रेटेड बच्चे बेहतर ध्यान देते हैं और मजबूत होते हैं! 🌟",
};

function WaterDrop({
  filled,
  index,
  onClick,
  lang,
}: {
  filled: boolean;
  index: number;
  onClick: () => void;
  lang: "en" | "hi";
}) {
  const label = lang === "hi"
    ? (filled ? `गिलास ${index + 1} हटाएं` : `गिलास ${index + 1} जोड़ें`)
    : (filled ? `Remove glass ${index + 1}` : `Add glass ${index + 1}`);

  return (
    <button
      onClick={onClick}
      className="active:scale-90 transition-transform touch-manipulation"
      aria-label={label}
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
  const { lang } = useLanguage();

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

  const congratsMap = lang === "hi" ? TRACK_CONGRATS_HI : TRACK_CONGRATS_EN;
  const congratsMessage =
    congratsMap[primaryTrack ?? ""] ??
    (lang === "hi"
      ? "लक्ष्य पूरा! बेहतरीन जल-पान की आदत — इसे जारी रखें! 💧"
      : "Goal reached! Great hydration habit — keep it up! 💧");

  const handleDropClick = (index: number) => {
    const newCount = index + 1;
    if (newCount === glasses) {
      setWater.mutate(glasses - 1);
    } else {
      setWater.mutate(newCount);
    }
  };

  const glassWord = lang === "hi" ? "गिलास" : "glasses";
  const outOfText = lang === "hi"
    ? `आज ${goal} में से ${glasses} ${glassWord}${glasses === 0 ? " — पहला गिलास लॉग करने के लिए बूंद पर टैप करें!" : ""}`
    : `${glasses} out of ${goal} glasses today${glasses === 0 ? " — tap a drop to log your first glass!" : ""}`;

  return (
    <div className="bg-card border border-border shadow-sm rounded-2xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">💧</span>
          <h2 className="text-sm font-bold text-foreground">
            {lang === "hi" ? "पानी की मात्रा" : "Water Intake"}
          </h2>
        </div>
        <span className="text-xs text-muted-foreground font-medium">
          {glasses} / {goal} {glassWord}
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {Array.from({ length: goal }).map((_, i) => (
          <WaterDrop
            key={i}
            filled={i < glasses}
            index={i}
            onClick={() => handleDropClick(i)}
            lang={lang}
          />
        ))}
      </div>

      {goalReached ? (
        <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 rounded-xl p-3">
          <p className="text-xs text-blue-800 dark:text-blue-200 font-medium leading-snug">
            🎉 {congratsMessage}
          </p>
        </div>
      ) : (
        <p className="text-xs text-muted-foreground">{outOfText}</p>
      )}

      {yesterday && (
        <p className="text-xs text-muted-foreground border-t border-border pt-2">
          {lang === "hi"
            ? `कल: ${yesterday.glasses} / ${goal} ${glassWord}`
            : `Yesterday: ${yesterday.glasses} / ${goal} glasses`}
        </p>
      )}
    </div>
  );
}
