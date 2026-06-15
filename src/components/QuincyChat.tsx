import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Paperclip, Mic, ArrowUp, Sparkles, Search, X } from "lucide-react";
import { askQuinceBot } from "@/lib/chat.functions";

type Msg = { role: "user" | "assistant"; content: string };

export function QuincyChat() {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [think, setThink] = useState(false);
  const [deep, setDeep] = useState(false);
  const ask = useServerFn(askQuinceBot);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const open = msgs.length > 0;

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs]);

  async function send() {
    const q = input.trim();
    if (!q || loading) return;
    let prefix = "";
    if (think) prefix += "[think step by step] ";
    if (deep) prefix += "[deep search across what you know about Quincy] ";
    const next = [...msgs, { role: "user", content: prefix + q } as Msg];
    setMsgs(next);
    setInput("");
    setLoading(true);
    try {
      const { reply } = await ask({ data: { messages: next } });
      setMsgs((m) => [...m, { role: "assistant", content: reply }]);
    } catch (e: unknown) {
      const m = e instanceof Error ? e.message : "Something broke.";
      setMsgs((mm) => [...mm, { role: "assistant", content: `⚠️ ${m}` }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* expanded transcript panel */}
      {open && (
        <div className="fixed inset-x-0 bottom-32 z-40 px-4 pointer-events-none">
          <div className="mx-auto w-full max-w-2xl pointer-events-auto">
            <div
              ref={scrollRef}
              className="max-h-[60vh] space-y-3 overflow-y-auto rounded-2xl border border-white/10 bg-[#0a0a0a]/85 p-4 shadow-[0_30px_80px_-20px_rgba(0,0,0,.9)] backdrop-blur-xl animate-fade-in"
            >
              <div className="flex items-center justify-between pb-2">
                <p className="mono text-[10px] uppercase tracking-[0.2em] text-white/50">
                  QuineBot · live
                </p>
                <button
                  onClick={() => setMsgs([])}
                  className="rounded-full p-1 text-white/40 hover:bg-white/5 hover:text-white"
                  aria-label="Clear"
                >
                  <X size={14} />
                </button>
              </div>
              {msgs.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[88%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 leading-relaxed ${
                    m.role === "user"
                      ? "ml-auto bg-white text-black"
                      : "border border-white/10 bg-white/[0.03] text-neutral-200"
                  }`}
                >
                  {m.content}
                </div>
              ))}
              {loading && (
                <div className="flex items-center gap-2 px-1 py-2">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-white/60" />
                  <span className="mono text-[11px] text-white/60">thinking…</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* centered animated pill input — drops to bottom when chatting */}
      <div
        className={`fixed inset-x-0 z-50 px-4 transition-all duration-700 ease-out ${
          open ? "bottom-6" : "top-1/2 -translate-y-1/2"
        }`}
      >
        <div className="mx-auto w-full max-w-2xl">
          {/* animated glow border */}
          <div className="relative">
            <div className="pointer-events-none absolute -inset-[1.5px] rounded-[28px] bg-[conic-gradient(from_0deg,transparent,rgba(255,255,255,.35),transparent_30%)] opacity-70 animate-[spin_6s_linear_infinite]" />
            <div className="relative rounded-[26px] border border-white/10 bg-[#0a0a0a]/95 px-3 py-2 shadow-[0_20px_60px_-20px_rgba(0,0,0,.9)] backdrop-blur-xl">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white/60 transition hover:bg-white/5 hover:text-white"
                  aria-label="Attach"
                >
                  <Paperclip size={16} />
                </button>
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      send();
                    }
                  }}
                  rows={1}
                  placeholder="ask me anything about quincy"
                  className="flex-1 resize-none bg-transparent py-2 text-[15px] text-white placeholder:text-white/40 focus:outline-none"
                  style={{ fontFamily: "var(--font-serif)" }}
                />
                <button
                  type="button"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white/60 transition hover:bg-white/5 hover:text-white"
                  aria-label="Voice"
                >
                  <Mic size={16} />
                </button>
                <button
                  type="button"
                  onClick={send}
                  disabled={loading || !input.trim()}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-black transition hover:scale-105 disabled:opacity-40 disabled:hover:scale-100"
                  aria-label="Send"
                >
                  <ArrowUp size={16} strokeWidth={2.5} />
                </button>
              </div>
              {/* tool toggles */}
              <div className="flex items-center gap-2 px-1 pb-1 pt-1">
                <button
                  type="button"
                  onClick={() => setThink((v) => !v)}
                  className={`mono inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] transition ${
                    think
                      ? "border-white/40 bg-white/10 text-white"
                      : "border-white/10 text-white/55 hover:text-white"
                  }`}
                >
                  <Sparkles size={11} /> think
                </button>
                <button
                  type="button"
                  onClick={() => setDeep((v) => !v)}
                  className={`mono inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] transition ${
                    deep
                      ? "border-white/40 bg-white/10 text-white"
                      : "border-white/10 text-white/55 hover:text-white"
                  }`}
                >
                  <Search size={11} /> deep search
                </button>
                <span className="mono ml-auto text-[10px] text-white/30">powered by lovable ai</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
