import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@clerk/react";
import { useGetMyProfile } from "@workspace/api-client-react";
import { X, Send, Sparkles, Bot, ChevronDown, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

const API_BASE = import.meta.env.VITE_API_URL || "";

interface Message {
  role: "user" | "assistant";
  content: string;
  id: string;
}

const TRACK_GREETINGS: Record<string, string> = {
  pcos: "Namaste! 🌸 I'm your MealMate AI — your personal health & nutrition guide. I can help with PCOS-friendly meals, hormone-balancing foods, home remedies, and managing symptoms through diet.\n\n💡 You might also ask:\n• What foods help balance PCOS hormones?\n• Is methi good for PCOS?\n• Best breakfast for PCOS",
  diabetes: "Namaste! 💚 I'm your MealMate AI. Ask me about blood sugar-friendly meals, glycemic index, diabetic Indian recipes, and home remedies for sugar management.\n\n💡 You might also ask:\n• Which dal is best for diabetics?\n• How to reduce post-meal sugar spikes?\n• Is karela juice effective?",
  thyroid: "Namaste! 🦋 I'm your MealMate AI. I can guide you on thyroid-supportive foods, what to avoid, selenium-rich Indian foods, and Ayurvedic remedies for thyroid health.\n\n💡 You might also ask:\n• Foods to avoid with hypothyroid?\n• Can I eat soya with thyroid?\n• How does ashwagandha help thyroid?",
  pregnancy: "Namaste! 👶 I'm your MealMate AI. I specialise in pregnancy nutrition — iron & folate-rich meals, safe Indian foods, morning sickness remedies, and postpartum recovery diets.\n\n💡 You might also ask:\n• Iron-rich vegetarian foods for pregnancy?\n• Safe home remedies for morning sickness?\n• Calcium foods without dairy",
  kids: "Namaste! 🌈 I'm your MealMate AI. I specialise in children's nutrition — healthy lunchbox ideas, picky eater solutions, brain foods, and fun nutritious recipes your kids will love!\n\n💡 You might also ask:\n• Healthy tiffin ideas for school?\n• How to add protein for kids?\n• Brain-boosting foods for children",
  fitness: "Namaste! 💪 I'm your MealMate AI. I can help with pre/post workout meals, protein targets, muscle-building Indian diet plans, creatine & supplement guidance. Let's crush your goals!\n\n💡 You might also ask:\n• Best pre-workout Indian meal?\n• High protein vegetarian diet plan?\n• How much protein do I need daily?",
  general: "Namaste! 🙏 I'm your MealMate AI — your personal Indian health & nutrition guide. Ask me anything about meals, nutrition, home remedies, health issues, or fitness.\n\n💡 You might also ask:\n• How to boost immunity naturally?\n• Easy healthy breakfast ideas?\n• Home remedy for cold & cough",
};

const QUICK_CHIPS: Record<string, string[]> = {
  pcos: ["PCOS diet tips", "Hormone balancing foods", "Best breakfast for PCOS", "Is methi good for PCOS?"],
  diabetes: ["Low glycemic foods", "Best dal for diabetics", "Post-meal sugar spikes", "Karela juice benefits"],
  thyroid: ["Foods to avoid with thyroid", "Thyroid-friendly sabzi", "Can I eat soya?", "Ashwagandha for thyroid"],
  pregnancy: ["Iron-rich foods", "Morning sickness remedies", "Safe foods in 1st trimester", "Calcium without dairy"],
  kids: ["Healthy tiffin ideas", "Protein for kids", "Picky eater tips", "Brain foods for kids"],
  fitness: ["Pre-workout meal ideas", "High protein vegetarian", "Post-workout recovery", "Daily protein needs"],
  general: ["Immunity boosting foods", "Healthy breakfast ideas", "Cold & cough remedy", "Weight loss Indian diet"],
};

// Parse follow-up suggestions from AI response
function parseFollowUps(text: string): { body: string; followUps: string[] } {
  const marker = "💡 You might also ask:";
  const idx = text.indexOf(marker);
  if (idx === -1) return { body: text, followUps: [] };
  const body = text.slice(0, idx).trim();
  const followSection = text.slice(idx + marker.length).trim();
  const followUps = followSection
    .split("\n")
    .map((l) => l.replace(/^[•\-\*]\s*/, "").trim())
    .filter((l) => l.length > 0 && l.length < 120)
    .slice(0, 4);
  return { body, followUps };
}

// Render formatted message text — no markdown symbols shown
function FormattedText({ text }: { text: string }) {
  const lines = text.split("\n");
  const result: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();

    if (!line) {
      result.push(<div key={i} className="h-2" />);
      i++;
      continue;
    }

    // Disclaimer lines
    if (line.startsWith("⚕️") || line.startsWith("🌿")) {
      result.push(
        <div key={i} className="mt-3 px-3 py-2 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-xs leading-relaxed">
          {renderInline(line)}
        </div>
      );
      i++;
      continue;
    }

    // YouTube video link
    if (line.startsWith("🎥")) {
      const urlMatch = line.match(/https?:\/\/[^\s]+/);
      const label = line.replace(/🎥\s*/, "").replace(/https?:\/\/[^\s]+/, "").replace(/Watch recipe:?/i, "").trim();
      result.push(
        <a
          key={i}
          href={urlMatch?.[0]}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 flex items-center gap-2 px-3 py-2.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-semibold hover:bg-red-100 transition-colors"
        >
          <span className="text-base">🎥</span>
          <span>{label || "Watch Recipe on YouTube"}</span>
          <ExternalLink className="w-3 h-3 ml-auto shrink-0" />
        </a>
      );
      i++;
      continue;
    }

    // Bullet point
    if (line.startsWith("•")) {
      const bullets: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("•")) {
        bullets.push(lines[i].trim().replace(/^•\s*/, ""));
        i++;
      }
      result.push(
        <ul key={`ul-${i}`} className="mt-1.5 space-y-1.5">
          {bullets.map((b, bi) => (
            <li key={bi} className="flex gap-2 text-sm leading-snug">
              <span className="text-primary font-bold mt-0.5 shrink-0">•</span>
              <span>{renderInline(b)}</span>
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Numbered list
    if (/^\d+\./.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\./.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s*/, ""));
        i++;
      }
      result.push(
        <ol key={`ol-${i}`} className="mt-1.5 space-y-1.5 list-none">
          {items.map((item, ii) => (
            <li key={ii} className="flex gap-2 text-sm leading-snug">
              <span className="text-primary font-bold shrink-0 tabular-nums">{ii + 1}.</span>
              <span>{renderInline(item)}</span>
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // ALL CAPS label (like "BENEFITS:" "WARNING:" "DOSAGE:")
    if (/^[A-Z][A-Z\s]+:/.test(line)) {
      result.push(
        <p key={i} className="mt-2.5 text-xs font-bold text-primary uppercase tracking-wide">
          {line}
        </p>
      );
      i++;
      continue;
    }

    // Regular paragraph
    result.push(
      <p key={i} className="text-sm leading-relaxed">
        {renderInline(line)}
      </p>
    );
    i++;
  }

  return <div className="space-y-0.5">{result}</div>;
}

// Render inline: make URLs clickable, strip any leftover markdown
function renderInline(text: string): React.ReactNode {
  // Replace URLs with clickable links
  const urlRegex = /https?:\/\/[^\s]+/g;
  const parts: React.ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = urlRegex.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    parts.push(
      <a key={match.index} href={match[0]} target="_blank" rel="noopener noreferrer"
        className="text-primary underline underline-offset-2 break-all">
        {match[0].replace("https://www.youtube.com/results?search_query=", "▶ YouTube: ")}
      </a>
    );
    last = match.index + match[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts.length === 1 ? parts[0] : parts;
}

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2 mb-3">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-orange-400 flex items-center justify-center shrink-0 shadow-sm">
        <Bot className="w-4 h-4 text-white" />
      </div>
      <div className="bg-card border border-border rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
        <div className="flex gap-1.5 items-center h-4">
          {[0, 1, 2].map((i) => (
            <motion.div key={i} className="w-2 h-2 bg-primary rounded-full"
              animate={{ y: [-2, 2, -2] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ChatMessage({ msg, onFollowUp }: { msg: Message; onFollowUp: (q: string) => void }) {
  const isUser = msg.role === "user";

  if (isUser) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-end mb-3"
      >
        <div className="max-w-[80%] bg-gradient-to-br from-primary to-orange-400 text-white px-4 py-3 rounded-2xl rounded-br-sm shadow-sm text-sm leading-relaxed">
          {msg.content}
        </div>
      </motion.div>
    );
  }

  const { body, followUps } = parseFollowUps(msg.content);

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
      <div className="flex items-start gap-2">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-orange-400 flex items-center justify-center shrink-0 shadow-sm mt-0.5">
          <Bot className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1 bg-card border border-border rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
          <FormattedText text={body} />
        </div>
      </div>

      {followUps.length > 0 && (
        <div className="ml-10 mt-2">
          <p className="text-[10px] text-muted-foreground mb-1.5 font-semibold uppercase tracking-wide">💡 You might also ask</p>
          <div className="flex flex-col gap-1.5">
            {followUps.map((q) => (
              <button
                key={q}
                onClick={() => onFollowUp(q)}
                className="text-left text-xs text-primary bg-primary/8 border border-primary/20 rounded-xl px-3 py-2 hover:bg-primary/15 transition-colors font-medium leading-snug"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}
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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open && !hasGreeted) {
      setMessages([{ role: "assistant", content: greeting, id: "greeting" }]);
      setHasGreeted(true);
    }
    if (open) setTimeout(() => inputRef.current?.focus(), 400);
  }, [open, hasGreeted, greeting]);

  const sendMessage = useCallback(async (text: string) => {
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
        body: JSON.stringify({ messages: nextMessages.map(({ role, content }) => ({ role, content })) }),
      });
      const data = await resp.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply || "Sorry, kuch problem ho gayi. Please try again.", id: (Date.now() + 1).toString() },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Oops! Network issue. Please try again. 🙏", id: "err-" + Date.now() },
      ]);
    } finally {
      setLoading(false);
    }
  }, [messages, loading, getToken]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(input); }
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
            whileTap={{ scale: 0.88 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-[4.8rem] right-4 z-40 w-14 h-14 rounded-full bg-gradient-to-br from-primary via-orange-400 to-amber-400 shadow-xl flex items-center justify-center"
          >
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-orange-400 opacity-40"
              animate={{ scale: [1, 1.35, 1], opacity: [0.4, 0, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <Sparkles className="w-6 h-6 text-white relative z-10" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Full-screen chat overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat-panel"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="fixed inset-0 z-[60] flex flex-col bg-background"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary via-orange-400 to-amber-400 shrink-0">
              <div className="flex items-center gap-3 px-4 pt-12 pb-3">
                <div className="w-10 h-10 rounded-full bg-white/25 backdrop-blur flex items-center justify-center shrink-0">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-bold text-base leading-tight">MealMate AI</p>
                  <p className="text-white/80 text-[11px]">Meals · Nutrition · Health · Remedies</p>
                </div>
                <div className="flex items-center gap-1.5 mr-2">
                  <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
                  <span className="text-white/80 text-xs">Online</span>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center shrink-0"
                >
                  <ChevronDown className="w-5 h-5 text-white" />
                </button>
              </div>
              {/* Wavy bottom */}
              <svg className="w-full block -mb-px" viewBox="0 0 400 12" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0,12 C100,0 300,0 400,12 L400,12 L0,12 Z" className="fill-background" />
              </svg>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 pt-4 pb-2">
              {messages.map((msg) => (
                <ChatMessage key={msg.id} msg={msg} onFollowUp={(q) => sendMessage(q)} />
              ))}
              {loading && <TypingIndicator />}

              {/* Quick chips — only when no user messages yet */}
              {messages.length <= 1 && !loading && (
                <div className="mt-2 mb-4">
                  <p className="text-[10px] text-muted-foreground mb-2 font-semibold uppercase tracking-wide">Quick questions</p>
                  <div className="flex flex-wrap gap-2">
                    {chips.map((chip) => (
                      <button key={chip} onClick={() => sendMessage(chip)}
                        className="text-xs bg-primary/8 hover:bg-primary/15 text-primary border border-primary/20 rounded-full px-3 py-1.5 transition-colors font-medium">
                        {chip}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="shrink-0 border-t border-border bg-background px-4 pt-3 pb-6">
              <div className="flex items-end gap-2 bg-muted/40 rounded-2xl px-4 py-2.5 border border-border focus-within:border-primary/50 focus-within:bg-background transition-all">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    e.target.style.height = "auto";
                    e.target.style.height = Math.min(e.target.scrollHeight, 96) + "px";
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about meals, nutrition, health..."
                  rows={1}
                  className="flex-1 bg-transparent resize-none outline-none text-sm text-foreground placeholder:text-muted-foreground leading-6 py-0.5"
                  style={{ scrollbarWidth: "none", overflow: "hidden", minHeight: "24px" }}
                />
                <button
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim() || loading}
                  className={cn(
                    "w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all mb-0.5",
                    input.trim() && !loading
                      ? "bg-gradient-to-br from-primary to-orange-400 shadow-md active:scale-90"
                      : "bg-muted"
                  )}
                >
                  {loading
                    ? <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                    : <Send className={cn("w-4 h-4", input.trim() ? "text-white" : "text-muted-foreground")} />}
                </button>
              </div>
              <p className="text-[10px] text-muted-foreground text-center mt-2">
                ⚕️ General wellness guidance only · Always consult a doctor for medical advice
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
