import React from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

const stats = [
  { value: "150K+", label: "Users scaled (0→1, 2 months)" },
  { value: "0 → 10", label: "Product builder · 0→1 and 1→10" },
  { value: "60%", label: "Manual ops cut via GenAI" },
  { value: "0", label: "Mid-sprint changes, career-wide" },
];

export default function Hero() {
  return (
    <section
      id="top"
      data-testid="hero-section"
      className="relative pt-28 md:pt-36 lg:pt-44 pb-20 md:pb-28"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="flex items-center gap-3 mb-10 reveal">
          <span className="size-1.5 rounded-full bg-emerald-400" />
          <span className="eyebrow" data-testid="hero-eyebrow">
            Global Product Manager &nbsp;·&nbsp; AI-Native Product Builder
          </span>
        </div>

        <h1
          data-testid="hero-name"
          className="font-display text-[14vw] sm:text-[10vw] md:text-[8.5vw] lg:text-[7.5rem] xl:text-[8.5rem] leading-[0.92] tracking-[-0.04em] reveal"
        >
          Manav
          <br />
          <span className="font-display-italic text-[var(--muted)]">Bhardwaj</span>
          <span className="text-[var(--fg)]">.</span>
        </h1>

        <div className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end">
          <p
            data-testid="hero-tagline"
            className="lg:col-span-7 text-lg md:text-xl leading-relaxed text-[var(--muted)] max-w-2xl reveal"
          >
            I build <span className="text-[var(--fg)]">AI-native products</span> that move
            metrics — across <span className="text-[var(--fg)]">B2B SaaS</span>,{" "}
            <span className="text-[var(--fg)]">B2C consumer</span>,{" "}
            <span className="text-[var(--fg)]">fintech</span>, and{" "}
            <span className="text-[var(--fg)]">marketplaces</span>. 3.5+ years of 0→1 work,
            regulated-fintech rigor, and zero mid-sprint changes.
          </p>

          <div className="lg:col-span-5 flex flex-col sm:flex-row items-start gap-3 lg:justify-end reveal">
            <a
              href="#work"
              data-testid="hero-cta-work"
              className="group inline-flex items-center gap-3 bg-[var(--cta)] text-[var(--cta-fg)] px-6 py-3.5 text-sm font-medium hover:bg-[var(--cta-hover)] transition-colors"
            >
              View selected work
              <ArrowDownRight className="size-4 transition-transform group-hover:translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <a
              href="#contact"
              data-testid="hero-cta-contact"
              className="group inline-flex items-center gap-3 border border-[var(--cta-ring)]/40 text-[var(--cta)] px-6 py-3.5 text-sm hover:border-[var(--cta-ring)] hover:bg-[var(--surface)] transition-colors"
            >
              Get in touch
              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>

        {/* Outcome stat strip */}
        <div className="mt-20 md:mt-28 border-t border-[var(--border)] grid grid-cols-2 md:grid-cols-4 reveal" data-testid="hero-stats">
          {stats.map((s, i) => (
            <div
              key={i}
              className={`py-8 md:py-10 ${
                i !== 0 ? "md:border-l border-[var(--border)]" : ""
              } ${i % 2 === 1 ? "border-l border-[var(--border)] md:border-l" : ""} px-4 md:px-8`}
              data-testid={`hero-stat-${i}`}
            >
              <div className="font-display text-4xl sm:text-5xl md:text-6xl tracking-tight">
                {s.value}
              </div>
              <div className="eyebrow mt-3 leading-relaxed">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Currently building marquee */}
        <div className="mt-16 md:mt-20 overflow-hidden border-y border-[var(--border)] py-4 reveal">
          <div className="marquee-track flex gap-12 whitespace-nowrap text-sm text-[var(--muted)]">
            {Array.from({ length: 2 }).map((_, k) => (
              <div key={k} className="flex gap-12">
                <span className="font-display-italic">Currently building at Kredyble</span>
                <span>·</span>
                <span>Regulated B2B Payments · RBI Compliance</span>
                <span>·</span>
                <span>0→1 Lifecycle Owner</span>
                <span>·</span>
                <span className="font-display-italic">Ships outcomes, not features</span>
                <span>·</span>
                <span>AI Mapping Copilot · Groq Equity Analyzer</span>
                <span>·</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
