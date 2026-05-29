import React from "react";
import { Truck, Activity, Zap } from "lucide-react";
import { Block, Bullet, Badge, Pillar, StatRow, FlowChips, EndCap } from "./shared";

const stats = [
  { v: "200+", l: "EV assets monitored" },
  { v: "15+", l: "Payout edge-cases covered" },
  { v: "−40%", l: "Manual reconciliation" },
  { v: "70%", l: "Rider retention" },
  { v: "Real-time", l: "Telemetry ingestion" },
  { v: "0", l: "Mid-sprint changes" },
];

const pillars = [
  {
    n: "01",
    title: "Real-time telemetry ingestion",
    body:
      "Spec'd a live telemetry pipeline for 200+ EV assets — location, battery, speed, geofence breaches. Designed for low-latency ingestion and downstream consumers (ops, finance, support).",
  },
  {
    n: "02",
    title: "SLA breach detection",
    body:
      "Defined SLA contracts per route and asset class, with real-time breach alerting. Ops gets paged when a delivery is at risk, not after the customer complains.",
  },
  {
    n: "03",
    title: "Anomaly alerting",
    body:
      "Layered behavior-aware anomaly detection on top of raw telemetry — unusual idle time, off-route deviation, sudden battery drop. Surfaces fraud and mechanical issues before they cascade.",
  },
  {
    n: "04",
    title: "Automated payout workflows",
    body:
      "PRDs covering 15+ edge cases — partial trips, mid-shift swaps, contested deliveries, refunded orders, SLA-penalty deductions. Each path explicit, traceable, and auditable.",
  },
  {
    n: "05",
    title: "Rider app — daily flow",
    body:
      "The other side of the platform — onboarding, task assignment, location history, finance and analytics modules. Built for the actual workflow of a rider, not a spreadsheet view of one.",
  },
  {
    n: "06",
    title: "Operations dashboard",
    body:
      "Live state of every active asset on one screen. SLA risk, anomaly flags, payout-pending counts — the things the ops manager actually needs to act on.",
  },
];

export default function EvifyCase() {
  return (
    <div className="overflow-y-auto h-[calc(100%-65px)]">
      {/* Hero */}
      <section className="px-6 md:px-10 pt-10 pb-12">
        <p className="eyebrow">Authored PRDs · Real-time FleetOps</p>
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.02] mt-3">
          Real-time FleetOps <br />
          <span className="font-display-italic text-[var(--muted)]">
            for 200+ EV assets.
          </span>
        </h2>
        <p className="mt-6 text-lg md:text-xl text-[var(--cta)] font-display-italic leading-snug max-w-2xl">
          “Live telemetry, SLA breach detection, anomaly alerting and automated payouts
          covering 15+ edge cases.”
        </p>

        <div className="mt-7 flex flex-wrap gap-2">
          <Badge icon={Truck}>EV Fleet · 200+ assets</Badge>
          <Badge icon={Activity}>Live Telemetry</Badge>
          <Badge icon={Zap}>Automated Payouts</Badge>
        </div>
      </section>

      <StatRow stats={stats} slug="evify" />

      <Block title="The brief" eyebrow="Context">
        <p>
          EV logistics has two hard problems: knowing what's actually happening with
          your fleet in real time, and paying riders correctly when the trip data
          itself is messy. A late delivery, a mid-shift swap, a partial route — every
          edge case is also a payout dispute waiting to happen.
        </p>
        <p className="mt-4">
          The platform had to do both: a{" "}
          <span className="text-[var(--fg)]">live ops view</span> for the ops manager
          and an <span className="text-[var(--fg)]">automated payout engine</span> for
          finance — backed by the same telemetry source of truth.
        </p>
      </Block>

      <Block title="My role" eyebrow="Ownership">
        <ul className="space-y-3">
          <Bullet>
            Authored PRDs for the real-time ops platform and automated payout system.
          </Bullet>
          <Bullet>
            Mapped the failure-mode taxonomy of EV fleet operations — partial trips,
            swaps, SLA breaches, contested deliveries — before writing a single happy-path spec.
          </Bullet>
          <Bullet>
            Defined the telemetry schema and downstream consumer contracts so ops,
            finance and support could all build against a shared truth.
          </Bullet>
        </ul>
      </Block>

      <Block title="What I shipped" eyebrow="Product pillars">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-l border-[var(--border)] mt-2">
          {pillars.map((p) => (
            <Pillar key={p.n} {...p} slug="evify" />
          ))}
        </div>
      </Block>

      <Block title="The trip-to-payout loop" eyebrow="Core flow">
        <FlowChips
          steps={["Telemetry", "Trip Closure", "Edge-case Check", "Payout", "Audit"]}
        />
        <p className="mt-5 text-[var(--muted)]">
          Every payout is an audit trail. Telemetry → trip closure → edge-case
          classifier → payout amount → audit log. If a rider disputes, the system shows
          the exact path of every rupee back to the data that produced it.
        </p>
      </Block>

      <Block title="Why edge-cases are the product" eyebrow="Working principle">
        <p>
          In payout systems, the happy path is the easy part. The product is the 15
          ways the happy path can break — and each one needs an explicit, defensible
          rule. I wrote them all out before engineering touched the codebase. Result:{" "}
          <span className="text-[var(--fg)]">zero mid-sprint changes</span>, and a
          payout engine that finance trusted from day one.
        </p>
      </Block>

      <Block title="The outcome" eyebrow="Result">
        <p>
          A real-time ops view across 200+ EV assets, an automated payout engine
          covering 15+ edge cases, and a 40% reduction in manual reconciliation work
          for the finance team. Rider retention held at 70% — partly because they got
          paid on time, every time.
        </p>
      </Block>

      <EndCap name="Evify" />
    </div>
  );
}
