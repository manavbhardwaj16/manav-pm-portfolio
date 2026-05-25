import React from "react";

const roles = [
  {
    when: "Oct 2025 — Present",
    role: "Product Manager",
    company: "Kredyble",
    note: "B2B Fintech SaaS · India",
    bullets: [
      "Owns 0→1 lifecycle for a regulated B2B payments platform — 5-stage pipeline with RBI checkpoints at each stage",
      "Spec'd API contracts across payment partners; zero requirements rework across engineering handoffs",
      "Discovery with 30 B2B design partners surfaced 3 critical workflow gaps pre-build",
      "Built reliability/reconciliation KPI framework owning weekly C-suite reviews",
    ],
  },
  {
    when: "Sept 2024 — Oct 2025",
    role: "Product Manager",
    company: "Thryl",
    note: "B2C Mobile · 0→150K users in 2 months",
    bullets: [
      "−40% time-to-first-value, +25% D30 retention via funnel & cohort work",
      "+30% DAU via structured A/B tests on onboarding, activation, engagement",
      "−60% manual support ops via GenAI draft-response + escalation routing",
      "4 major releases on time across 6 parallel workstreams",
    ],
  },
  {
    when: "Sept 2023 — Jun 2024",
    role: "Associate Product Manager",
    company: "OfficeBanao",
    note: "B2B Proptech & Marketplace · Gurugram",
    bullets: [
      "Drove B2B marketplace from beta to commercial launch — shipped API-driven integrations across fulfillment, payments, project management and procurement for a multi-party platform connecting vendors, contractors and enterprise buyers",
      "Integrated AI tools (Midjourney, DALL-E) into lead conversion and sales rep workflows — reduced content ops time and improved lead-to-conversion by 45% via AI-assisted automation",
      "Built project management mobile features — real-time site view tracking, daily progress logging, and a live project update dashboard for clients and project managers",
      "Delivered order management and procurement platform — order creation, processing and shipment workflows streamlining multi-party fulfillment across the vendor ecosystem",
      "Developed vendor payment system with FIFO reconciliation engine and credit history tracking — improving settlement accuracy, enabling risk-based decisioning, and cutting payout turnaround by 30%",
      "Launched real-time ops monitoring dashboards with 45%+ vendor adoption in 60 days — reduced time-to-close on escalated issues by 3× by surfacing recurring failure patterns",
    ],
  },
  {
    when: "May — Jun 2023",
    role: "Product Intern",
    company: "Renix Informatics",
    note: "Early-stage SaaS",
    bullets: [
      "Benchmarked 15+ competitors; surfaced 3 underserved use cases that shaped MVP scope",
      "Authored PRDs translating business asks into ship-ready specs with PM and CTO",
    ],
  },
  {
    when: "Jun 2022 — Aug 2023",
    role: "Business Consultant",
    company: "Enwisen Global Advisors",
    note: "Surat, India",
    bullets: [
      "+20% operational efficiency across managed accounts",
      "Authored BRDs & execution roadmaps; tracked KPIs cross-functionally",
    ],
  },
];

const education = [
  { title: "AI Product Management Bootcamp", org: "Airtribe, India", year: "2025" },
  { title: "Product Management Bootcamp", org: "UpGrad, India", year: "2022 — 2023" },
  {
    title: "Bachelor of Business Administration",
    org: "Gujarat Technological University, India",
    year: "2018 — 2021",
  },
];

export default function Experience() {
  return (
    <section id="experience" data-testid="experience-section" className="py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="flex items-end justify-between gap-8 mb-16 md:mb-20 reveal">
          <div>
            <p className="eyebrow">Career path</p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight mt-4 leading-[1.02]">
              Five years.<br />
              <span className="font-display-italic">One throughline:</span>{" "}
              <span className="text-[var(--muted)]">outcomes.</span>
            </h2>
          </div>
        </div>

        <ul className="border-t border-[var(--border)]">
          {roles.map((r, i) => (
            <li
              key={i}
              data-testid={`role-${i}`}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 py-10 lg:py-12 border-b border-[var(--border)] group hover:bg-[var(--surface)] transition-colors reveal"
            >
              <div className="lg:col-span-3">
                <div className="eyebrow">{r.when}</div>
                <div className="text-xs text-[var(--muted-2)] mt-2 font-display-italic">
                  {r.note}
                </div>
              </div>
              <div className="lg:col-span-4">
                <div className="font-display text-2xl md:text-3xl leading-tight">
                  {r.role}
                </div>
                <div className="text-[var(--muted)] mt-1 font-display-italic">
                  {r.company}
                </div>
              </div>
              <ul className="lg:col-span-5 space-y-2 text-sm text-[var(--muted)] leading-relaxed">
                {r.bullets.map((b, k) => (
                  <li key={k} className="flex gap-3">
                    <span className="mt-2 size-1 rounded-full bg-[var(--muted-2)] shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        {/* Education */}
        <div className="mt-20 md:mt-28 grid grid-cols-1 lg:grid-cols-12 gap-10 reveal">
          <div className="lg:col-span-3">
            <p className="eyebrow">Education</p>
            <h3 className="font-display text-3xl md:text-4xl mt-3">
              Built for the <span className="font-display-italic">AI era</span>.
            </h3>
          </div>
          <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-3 border-t border-l border-[var(--border)]">
            {education.map((e, i) => (
              <div
                key={i}
                className="border-r border-b border-[var(--border)] p-6 md:p-8"
                data-testid={`education-${i}`}
              >
                <div className="font-display text-lg md:text-xl leading-snug">
                  {e.title}
                </div>
                <div className="text-sm text-[var(--muted)] mt-2">{e.org}</div>
                <div className="eyebrow mt-4">{e.year}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
