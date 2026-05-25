import React from "react";
import { Brain, LineChart, Cpu } from "lucide-react";

const projects = [
  {
    icon: Brain,
    name: "AI Mapping Copilot",
    sub: "Human-in-the-Loop Decision System",
    body:
      "0→1 AI product shipped independently. RAG-adjacent architecture with confidence scoring and explainable outputs — every decision is auditable, traceable, and overridable by human reviewers.",
    bullets: [
      "Evaluation framework: override rate, false-confidence rate, calibration",
      "Weekly feedback loops continuously raising output quality",
      "Designed for high-stakes domains where wrong answers are costly",
    ],
    tags: ["RAG", "Confidence Scoring", "HITL", "Eval Loops", "Audit Trails"],
  },
  {
    icon: LineChart,
    name: "Groq Equity Analyzer",
    sub: "AI-Powered Stock Analysis MVP",
    body:
      "Composite signal engine producing confidence-quantified Buy/Sell calls with multi-horizon predictions (Intraday, T+1, T+2) powered by Groq. Performance SLAs and cost governance built into the spec.",
    bullets: [
      "6-indicator scoring (RSI, MACD, EMA, Bollinger Bands, Volume)",
      "Full pipeline for 15 stocks in <45 seconds",
      "Caching + on-demand AI call governance for cost/speed/reliability",
    ],
    tags: ["Signal Engine", "Groq", "Predictive Analytics", "Cost Governance"],
  },
  {
    icon: Cpu,
    name: "EVIFY Real-Time FleetOps",
    sub: "Live Telemetry + Automated Payouts",
    body:
      "PRDs for a real-time ops platform across 200+ EV assets — live telemetry ingestion, SLA breach detection, anomaly alerting, and automated payout workflows covering 15+ edge cases.",
    bullets: [
      "Real-time SLA breach detection and anomaly alerting",
      "Automated payouts handling 15+ edge cases without manual intervention",
      "Zero mid-sprint changes across engineering handoffs",
    ],
    tags: ["Real-Time", "Telemetry", "Payout Automation", "PRDs"],
  },
];

export default function AIProjects() {
  return (
    <section id="ai" data-testid="ai-section" className="py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="flex items-end justify-between gap-8 mb-16 md:mb-20 reveal">
          <div>
            <p className="eyebrow" data-testid="ai-eyebrow">AI-Native Builds</p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight mt-4 leading-[1.02]">
              0→1 AI products, <br />
              <span className="font-display-italic">shipped solo.</span>
            </h2>
          </div>
          <p className="hidden md:block max-w-sm text-sm text-[var(--muted)] leading-relaxed pb-2">
            Each project ships with an evaluation framework, confidence governance, and an
            opinion about where the human belongs in the loop.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-[var(--border)]">
          {projects.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={p.name}
                data-testid={`ai-card-${i}`}
                className="border-r border-b border-[var(--border)] p-8 md:p-10 hover:bg-[var(--surface)] transition-colors group reveal"
              >
                <div className="flex items-start justify-between">
                  <Icon
                    strokeWidth={1.2}
                    className="size-7 text-[var(--muted)] group-hover:text-[var(--fg)] transition-colors"
                  />
                  <span className="font-mono-ed text-[11px] text-[var(--muted-2)]">
                    PROJECT 0{i + 1}
                  </span>
                </div>

                <h3 className="font-display text-2xl md:text-3xl mt-10 leading-tight" data-testid={`ai-card-name-${i}`}>
                  {p.name}
                </h3>
                <div className="text-sm font-display-italic text-[var(--muted)] mt-1">
                  {p.sub}
                </div>

                <p className="mt-6 text-[15px] leading-relaxed text-[var(--muted)]">
                  {p.body}
                </p>

                <ul className="mt-6 space-y-2 text-sm text-[var(--muted)]">
                  {p.bullets.map((b, k) => (
                    <li key={k} className="flex gap-3">
                      <span className="text-[var(--muted-2)] mt-2 size-1 rounded-full bg-[var(--muted-2)] shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] tracking-wide uppercase border border-[var(--border)] px-2 py-1 text-[var(--muted-2)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
