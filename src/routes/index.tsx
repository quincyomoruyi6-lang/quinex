import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "your name ~ personal site" },
      { name: "description", content: "personal site — what i build, write, and work on." },
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

function Index() {
  return (
    <main className="min-h-screen px-6 py-16 md:py-24">
      <div className="mx-auto w-full max-w-2xl">
        {/* Header */}
        <header className="flex items-start justify-between gap-6">
          <div>
            <h1 className="italic text-2xl">your name ~ <span className="not-italic">तपाईंको नाम</span></h1>
            <div className="mt-3">
              <span className="tag">product, ai, web, design, writing</span>
            </div>
            <p className="mt-4 italic">
              i build <u>fast</u>
            </p>
            <p className="mono mt-2 text-muted-foreground">@your_handle</p>
          </div>
          <div className="text-right shrink-0">
            <p className="italic">ಬೆಂಗಳೂರು</p>
            <p className="text-muted-foreground text-sm">Bangalore, India</p>
          </div>
        </header>

        {/* Current */}
        <Section label="current">
          <p>
            ai engineer at{" "}
            <a href="#" className="italic">twospoon.ai</a>, building intelligent systems that are
            both scalable and fast. research aptitude with 4 best paper awards and 30+ citations on{" "}
            <a href="#">google scholar</a>. bachelors' gold medalist. masters student @ IIT Patna
            and IIIT Ranchi.
          </p>
          <p>
            enjoy coding, content creation, writing, superbikes, and reading ancient greek
            philosophy &amp; history.
          </p>
          <p>i can build <em>anything</em>.</p>
        </Section>

        {/* Previous */}
        <Section label="previous">
          {[
            { name: "leapx.ai", role: "ai engineer intern", loc: "gurgaon, india" },
            { name: "composio.dev", role: "software engineering (python)", loc: "bangalore, india" },
            { name: "successscholar.in", role: "product owner/developer", loc: "kolkata, india" },
          ].map((j) => (
            <p key={j.name}>
              <a href="#" className="italic">{j.name}</a> ~ {j.role} [{j.loc}]
            </p>
          ))}
        </Section>

        {/* Writings */}
        <Section label="writings">
          {[
            { date: "june 8, 2026", title: "the \"wiki layer\": building karpathy's llm knowledge base" },
            { date: "may 25, 2026", title: "who is sagar_builds? the story behind the brand" },
            { date: "april 5, 2026", title: "fix ec2 freezing during next.js build" },
          ].map((w) => (
            <div key={w.title} className="grid grid-cols-[8rem_1fr] gap-4">
              <span className="mono text-muted-foreground pt-1">{w.date}</span>
              <a href="#" className="italic">{w.title}</a>
            </div>
          ))}
          <p className="pt-2"><a href="#">read all writings →</a></p>
        </Section>

        {/* Builds */}
        <Section label="builds">
          {[
            {
              date: "may 18, 2026",
              title: "ai engineer's personal desk",
              blurb: "a 3d gaussian splat scan of my personal workspace — every item i use as an ai engineer, in one explorable scene.",
            },
            {
              date: "march 2, 2026",
              title: "tiny rag, big context",
              blurb: "a tiny retrieval pipeline that punches above its weight on real long-document QA.",
            },
          ].map((b) => (
            <div key={b.title} className="border-t border-rule pt-4">
              <div className="flex items-baseline justify-between gap-4">
                <a href="#" className="italic">{b.title}</a>
                <span className="mono text-muted-foreground">{b.date}</span>
              </div>
              <p className="mt-2 text-muted-foreground">{b.blurb}</p>
            </div>
          ))}
        </Section>

        {/* Contact */}
        <Section label="elsewhere">
          <p>
            <a href="#">twitter</a> · <a href="#">github</a> · <a href="#">linkedin</a> ·{" "}
            <a href="mailto:hello@example.com">email</a>
          </p>
        </Section>

        <footer className="mt-24 mono text-muted-foreground">
          © 2026 — built with care.
        </footer>
      </div>
    </main>
  );
}
