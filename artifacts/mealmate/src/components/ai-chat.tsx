import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@clerk/react";
import { useGetMyProfile } from "@workspace/api-client-react";
import {
  X,
  Send,
  Sparkles,
  Bot,
  ChevronDown,
  Mic,
} from "lucide-react";
import { cn } from "@/lib/utils";

const API_BASE = import.meta.env.VITE_API_URL || "";

interface Message {
  role: "user" | "assistant";
  content: string;
  id: string;
}

const TRACK_GREETINGS: Record<string, string> = {
  pcos: "Namaste! 🌸 I'm your MealMate AI. I can help with PCOS-friendly meals, hormone-balancing foods, and managing symptoms through diet. What's on your mind today?",
  diabetes: "Namaste! 💚 I'm your MealMate AI. Ask me about blood sugar-friendly meals, glycemic index, or diabetic-friendly Indian recipes. Kaisa madad kar sakti hoon?",
  thyroid: "Namaste! 🦋 I'm your MealMate AI. I can guide you on thyroid-supportive foods, what to avoid, and how to plan meals for better thyroid health. Kya poochhna hai?",
  pregnancy: "Namaste! 👶 I'm your MealMate AI. I'm here to help with pregnancy nutrition, safe Indian foods, iron & folate-rich meals, and postpartum recovery. What do you need?",
  kids: "Namaste! 🌈 I'm your MealMate AI. I specialise in kids' nutrition — healthy lunchbox ideas, picky eater solutions, and fun nutritious recipes. Kya help chahiye?",
  fitness: "Namaste! 💪 I'm your MealMate AI. I can help with pre/post workout meals, protein targets, muscle-building Indian diet plans, and supplement advice. Let's crush it!",
  general: "Namaste! 🙏 I'm your MealMate AI. Ask me anything about Indian nutrition, healthy recipes, home remedies, or meal planning. Aaj kya poochhna hai?",
};

const QUICK_CHIPS: Record<string, string[]> = {
  pcos: ["PCOS diet tips", "Hormone balancing foods", "Best breakfast for PCOS", "Is methi good for PCOS?"],
  diabetes: ["Low glycemic foods", "Sugar-free mithai ideas", "Best dal for diabetics", "Post-meal sugar spikes"],
  thyroid: ["Foods to avoid with thyroid", "Thyroid-friendly sabzi", "Can I eat soya?", "Selenium-rich Indian foods"],
  pregnancy: ["Iron-rich foods", "Morning sickness remedies", "Safe foods in 1st trimester", "Calcium without dairy"],
  kids: ["Healthy tiffin ideas", "Protein for kids", "My child won't eat vegetables", "Brain foods for kids"],
  fitness: ["Pre-workout meal ideas", "High protein vegetarian", "Post-workout recovery", "Muscle gain diet plan"],
  general: ["Immunity boosting foods", "Easy healthy breakfast", "Home remedy for cold", "Weight loss Indian diet"],
};

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2 mb-4">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-orange-400 flex items-center justify-center shrink-0 shadow-md">
        <Bot className="w-4 h-4 text-white" />
      </div>
      <div className="bg-card border border-border rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
        <div className="flex gap-1.5 items-center h-4">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-primary rounded-full"
              animate={{ y: [-2, 2, -2] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ChatMessage({ msg }: { msg: Message }) {
  const isUser = msg.role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.2 }}
      className={cn("flex items-end gap-2 mb-4", isUser ? "flex-row-reverse" : "flex-row")}
    >
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-orange-400 flex items-center justify-center shrink-0 shadow-md">
          <Bot className="w-4 h-4 text-white" />
        </div>
      )}
      <div
        className={cn(
          "max-w-[78%] px-4 py-3 rounded-2xl shadow-sm text-sm leading-relaxed",
          isUser
            ? "bg-gradient-to-br from-primary to-orange-400 text-white rounded-br-sm"
            : "bg-card border border-border text-foreground rounded-bl-sm"
        )}
      >
        {msg.content.split("\n").map((line, i) => (
          <p key={i} className={line.startsWith("•") || line.startsWith("-") ? "ml-1 my-0.5" : "my-0.5"}>
            {line || "\u00A0"}
          </p>
        ))}
      </div>
    </motion.div>
  );
}

export function AIChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { getToken } = useAuth();
  const { data: profile } = useGetMyProfile();

  const track = (profile?.primaryTrack as keyof typeof TRACK_GREETINGS) || "general";
  const chips = QUICK_CHIPS[track] || QUICK_CHIPS.general;
  const greeting = TRACK_GREETINGS[track] || TRACK_GREETINGS.general;

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Greet when chat opens
  useEffect(() => {
    if (open && !hasGreeted) {
      setMessages([{ role: "assistant", content: greeting, id: "greeting" }]);
      setHasGreeted(true);
    }
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open, hasGreeted, greeting]);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || loading) return;
      const userMsg: Message = { role: "user", content: text.trim(), id: Date.now().toString() };
      const nextMessages = [...messages, userMsg];
      setMessages(nextMessages);
      setInput("");
      setLoading(true);

      try {
        const token = await getToken();
        const resp = await fetch(`${API_BASE}/api/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({
            messages: nextMessages.map(({ role, content }) => ({ role, content })),
          }),
        });
        const data = await resp.json();
        const aiMsg: Message = {
          role: "assistant",
          content: data.reply || "Sorry, I couldn't respond right now. Please try again.",
          id: (Date.now() + 1).toString(),
        };
        setMessages((prev) => [...prev, aiMsg]);
      } catch {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "Oops! Something went wrong. Please try again. 🙏", id: "err" },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [messages, loading, getToken]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <>
      {/* Floating trigger button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            key="fab"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-[4.5rem] right-4 z-40 w-14 h-14 rounded-full bg-gradient-to-br from-primary via-orange-400 to-amber-400 shadow-xl flex items-center justify-center"
            style={{ boxShadow: "0 0 0 0 rgba(249,115,22,0.5)" }}
          >
            <motion.div
              animate={{ boxShadow: ["0 0 0 0 rgba(249,115,22,0.5)", "0 0 0 14px rgba(249,115,22,0)"] }}
              transition={{ duration: 1.8, repeat: Infinity }}
              className="absolute inset-0 rounded-full"
            />
            <Sparkles className="w-6 h-6 text-white" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Full-screen chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
            className="fixed inset-0 z-50 flex flex-col bg-background"
            style={{ maxWidth: "448px", left: "50%", transform: "translateX(-50%)" }}
          >
            {/* Header */}
            <div className="relative bg-gradient-to-r from-primary via-orange-400 to-amber-400 pt-safe">
              <div className="flex items-center gap-3 px-4 py-4">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center shrink-0">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-bold text-base leading-tight">MealMate AI</p>
                  <p className="text-white/80 text-xs">
                    Meals · Nutrition · Health · Remedies
                  </p>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
                  <span className="text-white/80 text-xs">Online</span>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="ml-2 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"
                >
                  <ChevronDown className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Wavy bottom edge */}
              <svg className="w-full -mb-px" viewBox="0 0 448 16" preserveAspectRatio="none" fill="white">
                <path d="M0,16 C112,0 336,0 448,16 L448,16 L0,16 Z" />
              </svg>
            </div>

            {/* Messages area */}
            <div className="flex-1 overflow-y-auto px-4 pt-4 pb-2 space-y-0">
              {messages.map((msg) => (
                <ChatMessage key={msg.id} msg={msg} />
              ))}
              {loading && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick chips */}
            {messages.length <= 1 && !loading && (
              <div className="px-4 pb-2">
                <p className="text-[10px] text-muted-foreground mb-2 font-medium uppercase tracking-wide">Quick questions</p>
                <div className="flex flex-wrap gap-2">
                  {chips.map((chip) => (
                    <button
                      key={chip}
                      onClick={() => sendMessage(chip)}
                      className="text-xs bg-primary/8 hover:bg-primary/15 text-primary border border-primary/20 rounded-full px-3 py-1.5 transition-colors font-medium"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input area */}
            <div className="border-t border-border bg-background/95 backdrop-blur px-4 pt-3 pb-safe pb-4">
              <div className="flex items-end gap-2 bg-muted/40 rounded-2xl px-4 py-2 border border-border focus-within:border-primary/50 focus-within:bg-background transition-all">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about meals, nutrition, health..."
                  rows={1}
                  className="flex-1 bg-transparent resize-none outline-none text-sm text-foreground placeholder:text-muted-foreground min-h-[24px] max-h-[96px] py-1 leading-6"
                  style={{ scrollbarWidth: "none" }}
                />
                <button
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim() || loading}
                  className={cn(
                    "w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all",
                    input.trim() && !loading
                      ? "bg-gradient-to-br from-primary to-orange-400 shadow-md active:scale-90"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  <Send className={cn("w-4 h-4", input.trim() ? "text-white" : "")} />
                </button>
              </div>
              <p className="text-[10px] text-muted-foreground text-center mt-2">
                AI advice is for guidance only · Consult a doctor for medical decisions
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
