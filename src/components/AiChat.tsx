import { useState } from "react";
import { Sparkles, X, Send } from "lucide-react";

const samples = [
  "I need running shoes under ₹5000",
  "Show me white sneakers for daily use",
  "What's good for basketball?",
];

export function AiChat() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<{ role: "ai" | "you"; text: string }[]>([
    { role: "ai", text: "Hey! I'm your 537 shoe expert. Tell me what you're looking for." },
  ]);
  const [input, setInput] = useState("");

  const send = (text: string) => {
    if (!text.trim()) return;
    setMsgs((m) => [
      ...m,
      { role: "you", text },
      { role: "ai", text: "Great pick! I'd recommend the Air Runner 537 — lightweight and under your budget. Want to see it?" },
    ]);
    setInput("");
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-foreground text-background h-14 w-14 rounded-full shadow-lg hover:bg-brand transition-colors flex items-center justify-center"
        aria-label="Open AI assistant"
      >
        <Sparkles className="h-6 w-6" />
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:justify-end p-0 sm:p-6 bg-black/40 sm:bg-transparent">
          <div className="bg-background w-full sm:w-96 sm:rounded-lg shadow-2xl border border-border flex flex-col h-[70vh] sm:h-[560px]">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-foreground text-background sm:rounded-t-lg">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-brand" />
                <span className="font-display tracking-wider">537 AI</span>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close"><X className="h-5 w-5" /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {msgs.map((m, i) => (
                <div key={i} className={`flex ${m.role === "you" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${m.role === "you" ? "bg-foreground text-background" : "bg-secondary"}`}>
                    {m.text}
                  </div>
                </div>
              ))}
              <div className="pt-2 flex flex-wrap gap-2">
                {samples.map((s) => (
                  <button key={s} onClick={() => send(s)} className="text-xs px-3 py-1.5 border border-border rounded-full hover:bg-secondary">
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="p-3 border-t border-border flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything…"
                className="flex-1 px-4 py-2 bg-secondary rounded-full text-sm outline-none focus:ring-2 focus:ring-foreground"
              />
              <button type="submit" className="bg-foreground text-background rounded-full h-10 w-10 flex items-center justify-center hover:bg-brand">
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
