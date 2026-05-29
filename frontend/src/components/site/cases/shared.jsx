import React from "react";

// ---------- shared building blocks ----------
export function Block({ eyebrow, title, children }) {
  return (
    <section className="px-6 md:px-10 py-10 border-b border-[var(--border)]">
      <div className="eyebrow">{eyebrow}</div>
      <h3 className="font-display text-2xl md:text-3xl mt-3 leading-tight">{title}</h3>
      <div className="mt-6 text-[15px] leading-relaxed text-[var(--muted)]">
        {children}
      </div>
    </section>
  );
}

export function Bullet({ children }) {
  return (
    <li className="flex gap-3">
      <span className="mt-2 size-1 rounded-full bg-[var(--cta-ring)] shrink-0" />
      <span>{children}</span>
    </li>
  );
}

export function Badge({ children, icon: Icon }) {
  return (
    <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest border border-[var(--border)] px-3 py-1.5 text-[var(--muted)]">
      {Icon && <Icon className="size-3" strokeWidth={1.5} />}
      {children}
    </span>
  );
}

export function Pillar({ n, title, body, slug }) {
  return (
    <div
      className="border-r border-b border-[var(--border)] p-6"
      data-testid={`${slug}-pillar-${n}`}
    >
      <div className="font-mono-ed text-[11px] text-[var(--muted-2)]">Nº {n}</div>
      <div className="font-display text-xl md:text-2xl mt-3 leading-snug">{title}</div>
      <p className="text-sm text-[var(--muted)] mt-3 leading-relaxed">{body}</p>
    </div>
  );
}

export function StatRow({ stats, slug }) {
  return (
    <section className="border-y border-[var(--border)]">
      <div className="px-6 md:px-10 py-6">
        <div className="eyebrow mb-5">Outcomes at a glance</div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-8">
          {stats.map((s, i) => (
            <div key={i} data-testid={`${slug}-stat-${i}`}>
              <div className="font-display text-3xl md:text-4xl tracking-tight">{s.v}</div>
              <div className="eyebrow mt-1.5">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FlowChips({ steps }) {
  return (
    <div className="flex flex-wrap items-center gap-2 mt-2 text-sm">
      {steps.map((step, i, arr) => (
        <React.Fragment key={step}>
          <span className="px-3 py-2 border border-[var(--cta-ring)]/40 text-[var(--cta)] font-display-italic">
            {step}
          </span>
          {i < arr.length - 1 && <span className="text-[var(--muted-2)]">→</span>}
        </React.Fragment>
      ))}
    </div>
  );
}

export function EndCap({ name }) {
  return (
    <div className="px-6 md:px-10 pb-16 pt-6 text-[10px] uppercase tracking-widest text-[var(--muted-2)]">
      End · {name} case study · Built and shipped by Manav Bhardwaj
    </div>
  );
}
