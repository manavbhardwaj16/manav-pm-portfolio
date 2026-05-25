import React from "react";
import { ArrowUpRight } from "lucide-react";

const works = [
  {
    idx: "01",
    title: "Thryl",
    subtitle: "B2C Esports & Gaming Platform",
    summary:
      "Took the product from 0 to 150K+ users in two months as a 0→1 and 1→10 builder. Funnel and cohort analysis cut time-to-first-value by 40% and lifted D30 retention by 25%. Structured A/B tests across onboarding and engagement grew DAU by 30%.",
    metrics: [
      { v: "150K+", l: "Users in 2 months" },
      { v: "+30%", l: "DAU growth" },
      { v: "+25%", l: "D30 retention" },
      { v: "-60%", l: "Manual support ops" },
    ],
    tags: ["0→1 & 1→10", "Funnel design", "GenAI Support Ops", "Mobile B2C"],
    image: "https://manavbhardwaj.lovable.app/assets/thryl-BF32bhW_.png",
  },
  {
    idx: "02",
    title: "Kredyble",
    subtitle: "B2B Fintech Payments · RBI-regulated",
    summary:
      "Owning 0→1 lifecycle for a regulated B2B payments platform — a 5-stage pipeline (authorization → retry → failure → reconciliation → settlement) with RBI compliance checkpoints and audit trails at each stage. API contracts spec'd with zero requirements rework across handoffs.",
    metrics: [
      { v: "0 → 1", l: "Lifecycle owned" },
      { v: "5-stage", l: "Payment pipeline" },
      { v: "30", l: "Design partners" },
      { v: "0", l: "Requirements rework" },
    ],
    tags: ["Payments", "RBI Compliance", "API Contracts", "Reconciliation"],
    image: "https://manavbhardwaj.lovable.app/assets/kredyble-BpOw4oe1.png",
  },
  {
    idx: "03",
    title: "OfficeBanao",
    subtitle: "B2B Proptech Marketplace",
    summary:
      "Drove a multi-party B2B marketplace from beta to commercial launch — API-driven fulfillment, payments, project management and procurement. Integrated Midjourney/DALL-E into sales workflows for a 45% lift in lead-to-conversion. Built FIFO reconciliation cutting payout TAT by 30%.",
    metrics: [
      { v: "+45%", l: "Lead→conversion" },
      { v: "-30%", l: "Payout TAT" },
      { v: "45%+", l: "Vendor adoption (60d)" },
      { v: "3×", l: "Faster issue close" },
    ],
    tags: ["Marketplace", "AI in Sales", "FIFO Reconciliation", "Ops Dashboards"],
    image: "https://manavbhardwaj.lovable.app/assets/officebanao-XmSws4Ij.webp",
  },
  {
    idx: "04",
    title: "Evify",
    subtitle: "Rider App & Real-Time FleetOps ERP",
    summary:
      "Authored PRDs for a real-time ops platform across 200+ EV assets — live telemetry ingestion, SLA breach detection, anomaly alerting, and automated payouts covering 15+ edge cases. Reduced manual rider payout reconciliation by 40%.",
    metrics: [
      { v: "200+", l: "EV assets" },
      { v: "15+", l: "Payout edge-cases" },
      { v: "-40%", l: "Manual reconciliation" },
      { v: "70%", l: "Rider retention" },
    ],
    tags: ["Real-Time Telemetry", "FleetOps", "Payout Automation", "ERP"],
    image: "https://manavbhardwaj.lovable.app/assets/evify-BSMPx5WP.png",
  },
];

export default function SelectedWork() {
  return (
    <section id="work" data-testid="work-section" className="py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="flex items-end justify-between gap-8 mb-16 md:mb-24 reveal">
          <div>
            <p className="eyebrow" data-testid="work-eyebrow">Selected work</p>
            <h2
              className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight mt-4 leading-[1.02]"
              data-testid="work-heading"
            >
              Products that moved <br />
              <span className="font-display-italic">numbers, not noise.</span>
            </h2>
          </div>
          <div className="hidden md:block max-w-xs text-sm text-[var(--muted)] leading-relaxed pb-2">
            Four products across consumer, fintech, marketplace and FleetOps. Each one
            shipped to commercial or production scale.
          </div>
        </div>

        <div className="flex flex-col gap-24 md:gap-32">
          {works.map((w, i) => (
            <article
              key={w.idx}
              data-testid={`work-card-${w.title.toLowerCase()}`}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 reveal"
            >
              {/* Image */}
              <div
                className={`lg:col-span-7 ${
                  i % 2 === 1 ? "lg:order-2" : ""
                }`}
              >
                <div className="relative border border-[var(--border)] bg-[var(--surface)] overflow-hidden aspect-[4/3] group">
                  <img
                    src={w.image}
                    alt={w.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    data-testid={`work-image-${w.title.toLowerCase()}`}
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      e.currentTarget.parentElement.style.background =
                        "radial-gradient(circle at 30% 20%, #1f1f23 0%, #0c0c0e 70%)";
                    }}
                  />
                  <div className="absolute top-4 left-4 eyebrow bg-[var(--bg)]/70 backdrop-blur px-2 py-1 border border-[var(--border)]">
                    Case Study {w.idx}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div
                className={`lg:col-span-5 flex flex-col justify-center ${
                  i % 2 === 1 ? "lg:order-1" : ""
                }`}
              >
                <h3
                  className="font-display text-3xl md:text-4xl lg:text-5xl tracking-tight leading-[1.05]"
                  data-testid={`work-title-${w.title.toLowerCase()}`}
                >
                  {w.title}
                </h3>
                <div className="mt-2 text-[var(--muted)] font-display-italic">
                  {w.subtitle}
                </div>

                <p className="mt-6 text-[15px] md:text-base leading-relaxed text-[var(--muted)]">
                  {w.summary}
                </p>

                <div className="mt-8 grid grid-cols-2 border-t border-[var(--border)]">
                  {w.metrics.map((m, k) => (
                    <div
                      key={k}
                      className={`py-5 ${k % 2 === 1 ? "border-l border-[var(--border)]" : ""} ${
                        k >= 2 ? "border-t border-[var(--border)]" : ""
                      } pl-4`}
                      data-testid={`work-metric-${w.title.toLowerCase()}-${k}`}
                    >
                      <div className="font-display text-2xl md:text-3xl tracking-tight">
                        {m.v}
                      </div>
                      <div className="eyebrow mt-1.5">{m.l}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {w.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] tracking-wide uppercase border border-[var(--border)] px-2.5 py-1 text-[var(--muted)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
