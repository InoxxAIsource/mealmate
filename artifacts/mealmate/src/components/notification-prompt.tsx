import { useState, useEffect } from "react";
import { Bell, BellOff, X, Smartphone, Check, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNotifications } from "@/hooks/use-notifications";

const DISMISSED_KEY = "mealmate-notif-dismissed";

export function NotificationPrompt() {
  const { state, requestPermission, sendTestNotification, isIOS } = useNotifications();
  const [visible, setVisible] = useState(false);
  const [justGranted, setJustGranted] = useState(false);

  // Show after 3 seconds if not already dismissed / granted
  useEffect(() => {
    if (state === "granted" || state === "denied" || state === "unsupported") return;
    if (localStorage.getItem(DISMISSED_KEY)) return;
    const t = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(t);
  }, [state]);

  const dismiss = () => {
    setVisible(false);
    localStorage.setItem(DISMISSED_KEY, "1");
  };

  const handleEnable = async () => {
    const ok = await requestPermission();
    if (ok) {
      setJustGranted(true);
      setTimeout(() => setVisible(false), 2500);
    }
  };

  if (!visible) return null;

  // iOS install hint
  if (state === "ios-hint") {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          className="fixed bottom-20 left-3 right-3 z-40 max-w-md mx-auto"
        >
          <div className="bg-card border border-border shadow-xl rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                <Smartphone className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm text-foreground">Get meal reminders on iPhone</p>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  Tap the <strong>Share</strong> button in Safari, then <strong>"Add to Home Screen"</strong> to enable notifications.
                </p>
                <div className="flex items-center gap-1.5 mt-2 text-xs text-primary font-semibold">
                  <ChevronUp className="w-3.5 h-3.5" />
                  Tap Share → Add to Home Screen
                </div>
              </div>
              <button onClick={dismiss} className="text-muted-foreground hover:text-foreground shrink-0 p-1">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  // Just granted — success state
  if (justGranted) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          className="fixed bottom-20 left-3 right-3 z-40 max-w-md mx-auto"
        >
          <div className="bg-green-50 border border-green-200 shadow-lg rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center shrink-0">
              <Check className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-bold text-sm text-green-900">Reminders enabled! 🎉</p>
              <p className="text-xs text-green-700 mt-0.5">
                You'll get breakfast, lunch & dinner alerts daily.
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  // Default prompt
  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        className="fixed bottom-20 left-3 right-3 z-40 max-w-md mx-auto"
      >
        <div className="bg-card border border-border shadow-xl rounded-2xl overflow-hidden">
          {/* Top strip */}
          <div className="bg-gradient-to-r from-primary to-orange-400 px-4 py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-white" />
              <span className="text-white text-xs font-bold">Daily Meal Reminders</span>
            </div>
            <button onClick={dismiss} className="text-white/70 hover:text-white p-0.5">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 space-y-3">
            {/* Reminder times preview */}
            <div className="flex items-center justify-between text-xs">
              {[
                { t: "8:00 AM", e: "🌅", l: "Breakfast" },
                { t: "1:00 PM", e: "🍱", l: "Lunch" },
                { t: "7:30 PM", e: "🌙", l: "Dinner" },
              ].map((r) => (
                <div key={r.l} className="flex flex-col items-center gap-1 bg-muted/50 rounded-xl px-3 py-2">
                  <span className="text-lg">{r.e}</span>
                  <span className="font-semibold text-foreground">{r.t}</span>
                  <span className="text-[10px] text-muted-foreground">{r.l}</span>
                </div>
              ))}
            </div>

            <p className="text-xs text-muted-foreground text-center">
              Get personalised reminders with <strong>your actual meal name</strong> — never miss a dish from your plan.
            </p>

            <button
              onClick={handleEnable}
              disabled={state === "loading"}
              className="w-full bg-primary text-primary-foreground font-bold text-sm py-3 rounded-xl flex items-center justify-center gap-2 active:scale-[0.97] transition-transform disabled:opacity-60"
            >
              {state === "loading" ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Bell className="w-4 h-4" />
              )}
              {state === "loading" ? "Setting up…" : "Enable Meal Reminders"}
            </button>

            <p className="text-[10px] text-muted-foreground text-center">
              {isIOS ? "Requires iOS 16.4+ with app added to Home Screen" : "Works on Android & desktop browsers · You can turn off anytime"}
            </p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
