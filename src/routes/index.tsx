import { createFileRoute } from "@tanstack/react-router";
import { QuincyChat } from "@/components/QuincyChat";
import { HoverPreview, Favicon } from "@/components/HoverPreview";
import { Github, Twitter, Linkedin, Instagram, Mail, Link2 } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "quincy omoruyi ~ quinex" },
      { name: "description", content: "quincy omoruyi (quinex) — automation engineer & jr web pentester. python · n8n · offensive security." },
      { property: "og:title", content: "quincy omoruyi ~ quinex" },
      { property: "og:url", content: "/" },
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

const socials = [
  { label: "github", href: GH, Icon: Github },
  { label: "twitter", href: "https://x.com/quinex_amd", Icon: Twitter },
  { label: "linkedin", href: "https://www.linkedin.com/in/quincy-omoruyi-osazoba-905292379", Icon: Linkedin },
  { label: "instagram", href: "https://www.instagram.com/quinex_amd/", Icon: Instagram },
  { label: "linktree", href: "https://linktr.ee/Quinceinternational", Icon: Link2 },
  { label: "email", href: "mailto:quincyomoruyi6@gmail.com", Icon: Mail },
];

function Index() {
  return (
    <main className="min-h-screen px-6 py-16 pb-44 md:py-24">
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
            <HoverPreview href="https://www.python.org" previewLabel="python.org" className="italic"><span>python</span></HoverPreview>{" "}
            and{" "}
            <HoverPreview href="https://n8n.io" previewLabel="n8n.io" className="italic"><span>n8n</span></HoverPreview>, and i break web apps to understand their weak spots. training on{" "}
            <HoverPreview href="https://www.hackthebox.com" previewLabel="hack the box"><span>hack the box</span></HoverPreview>{" "}&amp;{" "}
            <HoverPreview href="https://portswigger.net/web-security" previewLabel="portswigger academy"><span>portswigger academy</span></HoverPreview>.
          </p>
          <p>enjoy linux, bash, burp suite, wireshark, http internals, and shipping small focused tools.</p>
          <p>i can <em>break</em> anything. then automate fixing it.</p>
        </Section>

        {/* Systems */}
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
            { title: "a-handy-ip-scanner", href: `${GH}/A-Handy-IP-Scanner`, label: "recon · python", blurb: "cross-platform python cli for network recon — icmp sweeps & host discovery in one command." },
            { title: "port-scanner-tool", href: `${GH}/port-scanner-tool`, label: "recon · python", blurb: "lean python port scanner. drop it in a recon pipeline and forget about it." },
            { title: "password-checker", href: `${GH}/password-checker`, label: "security · python", blurb: "rates passwords against real entropy & policy rules. great teaching tool." },
            { title: "html-notes-by-cyberquice", href: `${GH}/Html-notes-by-cyberquice`, label: "notes · html", blurb: "a friendly html primer for aspiring front-end devs — small, clear, opinionated." },
          ].map((b) => (
            <div key={b.title} className="border-t border-rule pt-4">
              <div className="flex items-baseline justify-between gap-4">
                <HoverPreview href={b.href} previewLabel={b.title} className="italic"><span>{b.title}</span></HoverPreview>
                <span className="mono text-muted-foreground">{b.label}</span>
              </div>
              <p className="mt-2 text-muted-foreground">{b.blurb}</p>
            </div>
          ))}
          <p className="pt-2">
            <HoverPreview href={GH} previewLabel="github profile"><span>view all on github →</span></HoverPreview>
          </p>
        </Section>

        {/* Elsewhere — icon row with hover previews */}
        <Section label="elsewhere">
          <div className="flex flex-wrap items-center gap-3">
            {socials.map(({ label, href, Icon }) => {
              const external = /^https?:\/\//.test(href);
              const inner = (
                <span className="group inline-flex items-center gap-2 rounded-full border border-rule px-3 py-1.5 transition hover:border-white/40 hover:bg-white/[0.04]">
                  {external ? <Favicon href={href} size={14} /> : <Mail size={14} className="opacity-70" />}
                  <Icon size={14} className="opacity-80 group-hover:opacity-100" />
                  <span className="mono text-[11px] lowercase tracking-wider text-muted-foreground group-hover:text-foreground">
                    {label}
                  </span>
                </span>
              );
              return external ? (
                <HoverPreview key={label} href={href} previewLabel={label} icon={false} className="no-underline">
                  {inner}
                </HoverPreview>
              ) : (
                <a key={label} href={href} className="no-underline">{inner}</a>
              );
            })}
          </div>
        </Section>

        <footer className="mt-24 mono text-muted-foreground">
          © {new Date().getFullYear()} — quincy omoruyi · quinex
        </footer>
      </div>

      <QuincyChat />
    </main>
  );
}
