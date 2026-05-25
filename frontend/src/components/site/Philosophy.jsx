import React from "react";

const principles = [
  {
    q: "Ship outcomes, not features.",
    a: "If we can't tell what changed downstream, we shipped activity — not product.",
  },
  {
    q: "Confidence scoring beats blind trust.",
    a: "AI is most useful when every decision carries a confidence and a human exit ramp.",
  },
  {
    q: "Discovery before delivery.",
    a: "Thirty design-partner conversations save thirty engineering sprints.",
  },
  {
    q: "Zero mid-sprint changes is a craft.",
    a: "The PRD is a promise. Vague specs make engineers slow and ops fragile.",
  },
  {
    q: "Compliance is product surface.",
    a: "In regulated fintech, audit trails are a feature — not a constraint.",
  },
];

export default function Philosophy() {
  return (
    <section data-testid="philosophy-section" className="py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16 reveal">
          <div className="lg:col-span-5">
            <p className="eyebrow">Operating principles</p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight mt-4 leading-[1.02]">
              How I think <br />
              <span className="font-display-italic">about product.</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-[var(--border)]">
          {principles.map((p, i) => (
            <div
              key={i}
              data-testid={`principle-${i}`}
              className="border-r border-b border-[var(--border)] p-8 md:p-10 hover:bg-[var(--surface)] transition-colors reveal"
            >
              <div className="font-mono-ed text-[11px] text-[var(--muted-2)]">
                Nº 0{i + 1}
              </div>
              <blockquote className="mt-6 font-display text-2xl md:text-[28px] leading-[1.2]">
                “{p.q}”
              </blockquote>
              <p className="mt-5 text-sm text-[var(--muted)] leading-relaxed">{p.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
