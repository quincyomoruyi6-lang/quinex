import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { askQuinceBot } from "@/lib/chat.functions";

type Msg = { role: "user" | "assistant"; content: string };

const INTRO: Msg = {
  role: "assistant",
  content:
    "hey 👋 i'm QuineBot. ask me anything about Quincy — his projects, stack, pentesting work, or how to hire him.",
};

export function QuincyChat() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([INTRO]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const ask = useServerFn(askQuinceBot);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, open]);

  async function send() {
    const q = input.trim();
    if (!q || loading) return;
    const next = [...msgs, { role: "user", content: q } as Msg];
    setMsgs(next);
    setInput("");
    setLoading(true);
    try {
      const { reply } = await ask({ data: { messages: next } });
      setMsgs((m) => [...m, { role: "assistant", content: reply }]);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Something broke. Try again.";
      setMsgs((m) => [...m, { role: "assistant", content: `⚠️ ${msg}` }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Ask QuineBot"
        className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-black shadow-[0_0_30px_rgba(255,255,255,.18)] ring-1 ring-white/30 transition hover:scale-105"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-black/40 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-black" />
        </span>
        {open ? "close" : "ask quinebot"}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[520px] w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#0a0a0a]/95 shadow-[0_30px_80px_-20px_rgba(0,0,0,.9)] backdrop-blur-xl">
          <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20 font-mono text-xs text-white">
              QB
            </div>
            <div>
              <p className="text-sm font-semibold text-white">QuineBot</p>
              <p className="mono text-[10px] uppercase tracking-[0.18em] text-white/60">
                online · ai assistant
              </p>
            </div>
          </div>
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4 text-sm">
            {msgs.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 leading-relaxed ${
                  m.role === "user"
                    ? "ml-auto bg-white text-black"
                    : "border border-white/10 bg-white/[0.04] text-neutral-200"
                }`}
              >
                {m.content}
              </div>
            ))}
            {loading && (
              <div className="max-w-[85%] rounded-2xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 mono text-xs text-white/70">
                <span className="inline-block animate-pulse">thinking…</span>
              </div>
            )}
          </div>
          <div className="border-t border-white/10 bg-black/40 p-3">
            <p className="mb-2 text-center text-[10px] text-white/40">
              AI may be wrong · powered by Lovable AI
            </p>
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="ask about quincy…"
                className="flex-1 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-sm text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none"
              />
              <button
                onClick={send}
                disabled={loading}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-black transition hover:bg-white/80 disabled:opacity-50"
                aria-label="Send"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
