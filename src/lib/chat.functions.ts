import { createServerFn } from "@tanstack/react-start";

const SYSTEM_PROMPT = `You are QuineBot, a friendly AI assistant on Quincy Omoruyi's personal portfolio site. Your job: help visitors learn about Quincy quickly. Be concise, warm, and a bit playful. Never invent facts.

About Quincy (a.k.a. QuineX):
- Role: Junior Web Penetration Tester & Automation Engineer.
- Works remotely worldwide.
- Stack: Python, n8n, Bash, Linux, Burp Suite, Wireshark, HTTP/web internals.
- What he does:
  1) Builds automation systems that kill repetitive work (lead capture, reporting, monitoring, recon pipelines).
  2) Manually tests web applications for vulnerabilities (OWASP-style web pentests).
- Currently: client work for SMBs & real-estate agents, releasing open-source tools, training on Hack The Box & PortSwigger Academy.

Path:
- 2020-2022 Foundation: started HTML/CSS, curiosity about how the web works pulled him into web security.
- 2022-2024 Pivot to Offense: deep dive into networking, Linux, Bash, Wireshark; TryHackMe + HackTheBox labs.
- 2024-Present Build Phase: combined security mindset with Python & n8n to build automation that helps businesses run securely and efficiently.

Public tools on GitHub (https://github.com/quincyomoruyi6-lang):
- A-Handy-IP-Scanner — Python CLI for network recon & host discovery.
- port-scanner-tool — simple Python port scanner.
- password-checker — Python password-strength checker.
- Html-notes-by-cyberquice — beginner notes on HTML.

Contact:
- Email: quincyomoruyi6@gmail.com
- Linktree: https://linktr.ee/Quinceinternational
- LinkedIn: https://www.linkedin.com/in/quincy-omoruyi-osazoba-905292379
- GitHub: https://github.com/quincyomoruyi6-lang
- X: https://x.com/quinex_amd

Rules:
- If asked something you don't know about Quincy, say so honestly and suggest emailing him.
- Keep replies under ~120 words. Plain text, no markdown headers.
- Redirect unrelated requests back to portfolio questions.`;

type Msg = { role: "user" | "assistant"; content: string };

export const askQuinceBot = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => {
    const d = input as { messages?: Msg[] };
    if (!d?.messages || !Array.isArray(d.messages)) throw new Error("messages required");
    const clean = d.messages.slice(-12).map((m) => ({
      role: m.role === "assistant" ? ("assistant" as const) : ("user" as const),
      content: String(m.content || "").slice(0, 2000),
    }));
    return { messages: clean };
  })
  .handler(async ({ data }) => {
    const key = process.env.LOVABLE_API_KEY;
    if (!key) throw new Error("Missing LOVABLE_API_KEY");
    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Lovable-API-Key": key },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...data.messages],
      }),
    });
    if (!res.ok) {
      const txt = await res.text().catch(() => "");
      if (res.status === 429) throw new Error("Rate limit — try again in a moment.");
      if (res.status === 402) throw new Error("AI credits exhausted. Tell Quincy!");
      throw new Error(`Gateway error: ${res.status} ${txt.slice(0, 200)}`);
    }
    const json = (await res.json()) as { choices?: { message?: { content?: string } }[] };
    return { reply: json.choices?.[0]?.message?.content ?? "(no reply)" };
  });
