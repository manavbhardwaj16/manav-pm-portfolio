import React from "react";

export default function About() {
  return (
    <section id="about" data-testid="about-section" className="py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20">
          {/* Eyebrow + heading */}
          <div className="lg:col-span-5">
            <p className="eyebrow reveal" data-testid="about-eyebrow">About</p>
            <h2
              className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight mt-4 leading-[1.02] reveal"
              data-testid="about-heading"
            >
              A product mind <br />
              <span className="font-display-italic text-[var(--muted)]">wired for AI.</span>
            </h2>

            <div className="mt-10 lg:mt-12 reveal">
              <div className="border-l-2 border-[var(--cta-ring)] pl-5 md:pl-6">
                <p className="font-display text-2xl md:text-3xl leading-[1.18] text-[var(--fg)]">
                  “Ship outcomes,{" "}
                  <span className="font-display-italic text-[var(--muted)]">
                    not features.
                  </span>
                  ”
                </p>
                <p className="mt-3 eyebrow">Operating motto</p>
              </div>
            </div>
          </div>

          {/* Long-form copy */}
          <div className="lg:col-span-7 lg:pt-3">
            <p
              className="text-xl md:text-2xl lg:text-[26px] leading-[1.55] font-light text-[var(--fg)] reveal"
              data-testid="about-paragraph-1"
            >
              I lead products end-to-end — from{" "}
              <span className="font-display-italic">first PRD</span> to compliance audit,
              from empty Mixpanel dashboards to{" "}
              <span className="font-display-italic">150K users in two months</span>. My
              edge is operating where AI, fintech, and consumer growth overlap — and
              turning messy ambiguity into measurable outcomes.
            </p>

            <p
              className="mt-8 text-lg md:text-xl leading-relaxed text-[var(--muted)] reveal"
              data-testid="about-paragraph-2"
            >
              I write{" "}
              <span className="text-[var(--fg)]">explicit specs that ship without rework</span>
              , design{" "}
              <span className="text-[var(--fg)]">human-in-the-loop AI</span> instead of
              black-box automation, and treat KPI frameworks as core product surface. I
              work best on 0→1 problems and 1→10 scale-ups where the brief is unclear and
              the bar is high.
            </p>

            {/* Mini facts grid */}
            <div className="mt-14 grid grid-cols-2 md:grid-cols-4 border-t border-[var(--border)] reveal">
              {[
                { k: "Based", v: "India · Global remote" },
                { k: "Experience", v: "3.5+ years" },
                { k: "Focus", v: "AI · Fintech · B2C" },
                { k: "Status", v: "Open to roles" },
              ].map((f, i) => (
                <div
                  key={i}
                  className={`py-6 ${i !== 0 ? "border-l border-[var(--border)]" : ""} pl-4 md:pl-6`}
                  data-testid={`about-fact-${i}`}
                >
                  <div className="eyebrow">{f.k}</div>
                  <div className="mt-2 text-sm md:text-base">{f.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
