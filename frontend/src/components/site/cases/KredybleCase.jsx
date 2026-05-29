import React from "react";
import { Shield, CreditCard, Building2 } from "lucide-react";
import { Block, Bullet, Badge, Pillar, StatRow, FlowChips, EndCap } from "./shared";

const stats = [
  { v: "0 → 1", l: "Lifecycle owned" },
  { v: "5-stage", l: "Payment pipeline" },
  { v: "30", l: "B2B design partners" },
  { v: "0", l: "Requirements rework" },
  { v: "RBI", l: "Compliance built-in" },
  { v: "Weekly", l: "C-suite KPI review" },
];

const pillars = [
  {
    n: "01",
    title: "5-stage payment pipeline",
    body:
      "Authorization → retry → failure → reconciliation → settlement. Each stage has explicit RBI compliance checkpoints, audit trails, and a defined failure-recovery path. Designed so any single stage can be inspected, replayed or escalated without touching the others.",
  },
  {
    n: "02",
    title: "API contracts that don't break",
    body:
      "Spec'd request/response schemas, idempotency keys, retry semantics and failure modes across payment partners. Zero requirements rework across engineering handoffs to date — the PRD is treated as a binding contract, not a sketch.",
  },
  {
    n: "03",
    title: "Discovery before delivery",
    body:
      "Ran 30 structured discovery sessions with B2B design partners pre-build. Surfaced 3 critical workflow gaps that would have caused expensive rework — backlog reprioritized around compliance and reliability impact before a single line of code.",
  },
  {
    n: "04",
    title: "Reliability KPI framework",
    body:
      "Built the KPI tree: pipeline reliability, failure rate by stage, reconciliation accuracy, settlement TAT. Owns weekly C-suite review aligning roadmap to business + regulatory objectives. Every release ties to one of these numbers.",
  },
  {
    n: "05",
    title: "Audit-first product surface",
    body:
      "In regulated fintech, audit trails are not overhead — they're product. Designed event logging, idempotency proofs and stage-level observability so an auditor (or a CTO) can answer 'what happened on this transaction' in under 30 seconds.",
  },
  {
    n: "06",
    title: "Roadmap aligned to risk",
    body:
      "Backlog prioritized by compliance impact first, reliability second, growth third. Trade-offs documented. No mid-sprint changes — every spec walks engineering through happy path, failure modes and audit expectations before sign-off.",
  },
];

export default function KredybleCase() {
  return (
    <div className="overflow-y-auto h-[calc(100%-65px)]">
      {/* Hero */}
      <section className="px-6 md:px-10 pt-10 pb-12">
        <p className="eyebrow">Product Manager · Oct 2025 — Present</p>
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.02] mt-3">
          0→1 fintech payments, <br />
          <span className="font-display-italic text-[var(--muted)]">
            built for the regulator.
          </span>
        </h2>
        <p className="mt-6 text-lg md:text-xl text-[var(--cta)] font-display-italic leading-snug max-w-2xl">
          “A regulated B2B payments platform with five stages, audit-grade trails, and
          zero requirements rework.”
        </p>

        <div className="mt-7 flex flex-wrap gap-2">
          <Badge icon={Shield}>RBI Compliance</Badge>
          <Badge icon={CreditCard}>B2B Payments · Card-based flows</Badge>
          <Badge icon={Building2}>Enterprise · India</Badge>
        </div>
      </section>

      <StatRow stats={stats} slug="kredyble" />

      <Block title="The brief" eyebrow="Context">
        <p>
          Build a regulated B2B payments platform from first principle. The space is
          dense — RBI mandates, multiple payment partners, real money flowing through —
          and the cost of a vague spec is real. I came in as the PM owning the 0→1
          lifecycle end-to-end.
        </p>
        <p className="mt-4">
          My job: turn a complex multi-stakeholder workflow into a{" "}
          <span className="text-[var(--fg)]">predictable, audit-grade product</span> —
          while keeping the engineering team unblocked and the C-suite confident.
        </p>
      </Block>

      <Block title="My role" eyebrow="Ownership">
        <ul className="space-y-3">
          <Bullet>
            Own the <span className="text-[var(--fg)]">0→1 lifecycle</span> end-to-end —
            discovery, PRDs, sprint planning, QA, launch, post-launch iteration.
          </Bullet>
          <Bullet>
            Run discovery with payment partners, banks, and B2B design partners; convert
            findings into ship-ready specs.
          </Bullet>
          <Bullet>
            Author API contracts, reconciliation rules, and audit policies — the
            interfaces engineering can build against without ambiguity.
          </Bullet>
          <Bullet>
            Lead weekly C-suite review on reliability and compliance KPIs.
          </Bullet>
        </ul>
      </Block>

      <Block title="What I shipped" eyebrow="Product pillars">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-l border-[var(--border)] mt-2">
          {pillars.map((p) => (
            <Pillar key={p.n} {...p} slug="kredyble" />
          ))}
        </div>
      </Block>

      <Block title="The payment pipeline" eyebrow="Core architecture">
        <FlowChips
          steps={["Authorization", "Retry", "Failure", "Reconciliation", "Settlement"]}
        />
        <p className="mt-5 text-[var(--muted)]">
          Five stages, each independently observable and replayable. Each one has its
          own RBI checkpoint, audit log, and failure-recovery path. The whole thing is
          designed so an auditor — or a sleep-deprived ops engineer at 2 AM — can find
          exactly where a transaction sits and what happened to it.
        </p>
      </Block>

      <Block title="The discovery moves" eyebrow="Pre-build research">
        <ul className="space-y-3">
          <Bullet>
            30 design-partner sessions across treasurers, finance ops, and CFOs of mid-market B2B firms.
          </Bullet>
          <Bullet>
            Surfaced 3 critical workflow gaps that would have triggered expensive rework
            had we shipped blind. Backlog reprioritized around compliance and reliability
            impact first.
          </Bullet>
          <Bullet>
            Mapped the failure-mode taxonomy of card-based payments — authorization
            failures, partial settlements, reconciliation mismatches — before writing the
            happy-path PRD.
          </Bullet>
        </ul>
      </Block>

      <Block title="How I keep mid-sprint changes at zero" eyebrow="Working principle">
        <p>
          Every PRD walks the team through happy path, failure modes, and audit
          expectations before sign-off. Discovery happens up-front. Trade-offs are
          documented. If a change is needed mid-sprint, it gets a strong reason and
          becomes the exception, not the default. The result: engineering can ship with
          confidence, the roadmap stays predictable, and reliability KPIs trend in the
          right direction.
        </p>
      </Block>

      <Block title="The outcome" eyebrow="Result">
        <p>
          Owning the 0→1 lifecycle of a regulated payments product —{" "}
          <span className="text-[var(--fg)]">zero requirements rework</span>,{" "}
          <span className="text-[var(--fg)]">RBI-compliant by design</span>, and a KPI
          framework tying every release to system reliability and reconciliation
          accuracy.
        </p>
        <p className="mt-5 text-[var(--muted)]">
          In regulated fintech, the boring metric is the most valuable one: durability.
          That's what we're building toward.
        </p>
      </Block>

      <EndCap name="Kredyble" />
    </div>
  );
}
