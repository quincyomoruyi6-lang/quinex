import { createFileRoute } from "@tanstack/react-router";
import { QuincyChat } from "@/components/QuincyChat";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "quincy omoruyi ~ personal site" },
      { name: "description", content: "quincy omoruyi (quinex) — automation engineer & jr web pentester. python · n8n · offensive security." },
    ],
  }),
  component: Index,
});

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="mt-16">
      <h2 className="section-label">{label}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

const GH = "https://github.com/quincyomoruyi6-lang";

function Index() {
  return (
    <main className="min-h-screen px-6 py-16 md:py-24">
      <div className="mx-auto w-full max-w-2xl">
        {/* Header */}
        <header className="flex items-start justify-between gap-6">
          <div>
            <h1 className="italic text-2xl">quincy omoruyi ~ <span className="not-italic">quinex</span></h1>
            <div className="mt-3">
              <span className="tag">automation, web pentesting, python, n8n, linux</span>
            </div>
            <p className="mt-4 italic">
              i build &amp; <u>break</u> systems
            </p>
            <p className="mono mt-2 text-muted-foreground">@quinex_amd</p>
          </div>
          <div className="text-right shrink-0">
            <p className="italic">remote</p>
            <p className="text-muted-foreground text-sm">working worldwide</p>
          </div>
        </header>

        {/* Current */}
        <Section label="current">
          <p>
            junior web pentester &amp; automation engineer. i build automation tools with{" "}
            <a href="https://www.python.org" target="_blank" rel="noreferrer" className="italic">python</a> and{" "}
            <a href="https://n8n.io" target="_blank" rel="noreferrer" className="italic">n8n</a>, and i break
            web apps to understand their weak spots. training on{" "}
            <a href="https://www.hackthebox.com" target="_blank" rel="noreferrer">hack the box</a> &amp;{" "}
            <a href="https://portswigger.net/web-security" target="_blank" rel="noreferrer">portswigger academy</a>.
          </p>
          <p>
            enjoy linux, bash, burp suite, wireshark, http internals, and shipping small focused tools.
          </p>
          <p>i can <em>break</em> anything. then automate fixing it.</p>
        </Section>

        {/* What I do */}
        <Section label="systems">
          {[
            { name: "recon → report pipeline", role: "n8n · python · slack", loc: "automated recon" },
            { name: "lead-gen bot for agents", role: "n8n · whatsapp api · sheets", loc: "real-estate" },
            { name: "uptime & header monitor", role: "python · cron · email", loc: "client sites" },
            { name: "pentest notes engine", role: "markdown · bash · github", loc: "engagement writeups" },
          ].map((j) => (
            <p key={j.name}>
              <span className="italic">{j.name}</span> ~ {j.role} [{j.loc}]
            </p>
          ))}
        </Section>

        {/* Journey */}
        <Section label="journey">
          {[
            { date: "2020 — 2022", title: "the foundation — html, css, and curiosity about how the web actually works" },
            { date: "2022 — 2024", title: "the pivot to offense — networking, linux, bash, wireshark, tryhackme & hack the box" },
            { date: "2024 — now", title: "the build phase — python + n8n + security mindset, shipping for clients" },
          ].map((w) => (
            <div key={w.title} className="grid grid-cols-[8rem_1fr] gap-4">
              <span className="mono text-muted-foreground pt-1">{w.date}</span>
              <span className="italic">{w.title}</span>
            </div>
          ))}
        </Section>

        {/* Builds */}
        <Section label="builds">
          {[
            {
              title: "a-handy-ip-scanner",
              href: `${GH}/A-Handy-IP-Scanner`,
              label: "recon · python",
              blurb: "cross-platform python cli for network recon — icmp sweeps & host discovery in one command.",
            },
            {
              title: "port-scanner-tool",
              href: `${GH}/port-scanner-tool`,
              label: "recon · python",
              blurb: "lean python port scanner. drop it in a recon pipeline and forget about it.",
            },
            {
              title: "password-checker",
              href: `${GH}/password-checker`,
              label: "security · python",
              blurb: "rates passwords against real entropy & policy rules. great teaching tool.",
            },
            {
              title: "html-notes-by-cyberquice",
              href: `${GH}/Html-notes-by-cyberquice`,
              label: "notes · html",
              blurb: "a friendly html primer for aspiring front-end devs — small, clear, opinionated.",
            },
          ].map((b) => (
            <div key={b.title} className="border-t border-rule pt-4">
              <div className="flex items-baseline justify-between gap-4">
                <a href={b.href} target="_blank" rel="noreferrer" className="italic">{b.title}</a>
                <span className="mono text-muted-foreground">{b.label}</span>
              </div>
              <p className="mt-2 text-muted-foreground">{b.blurb}</p>
            </div>
          ))}
          <p className="pt-2"><a href={GH} target="_blank" rel="noreferrer">view all on github →</a></p>
        </Section>

        {/* Contact */}
        <Section label="elsewhere">
          <p>
            <a href="https://x.com/quinex_amd" target="_blank" rel="noreferrer">twitter</a> ·{" "}
            <a href={GH} target="_blank" rel="noreferrer">github</a> ·{" "}
            <a href="https://www.linkedin.com/in/quincy-omoruyi-osazoba-905292379" target="_blank" rel="noreferrer">linkedin</a> ·{" "}
            <a href="https://www.instagram.com/quinex_amd/" target="_blank" rel="noreferrer">instagram</a> ·{" "}
            <a href="https://linktr.ee/Quinceinternational" target="_blank" rel="noreferrer">linktree</a> ·{" "}
            <a href="mailto:quincyomoruyi6@gmail.com">email</a>
          </p>
        </Section>

        <footer className="mt-24 mono text-muted-foreground">
          © {new Date().getFullYear()} — quincy omoruyi · quinex
        </footer>
      </div>

      <QuincyChat />
    </main>
  );
}
