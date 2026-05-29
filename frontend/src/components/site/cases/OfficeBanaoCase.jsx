import React from "react";
import { Building2, Sparkles, Wallet } from "lucide-react";
import { Block, Bullet, Badge, Pillar, StatRow, FlowChips, EndCap } from "./shared";

const stats = [
  { v: "Beta → GA", l: "Commercial launch shipped" },
  { v: "+45%", l: "Lead-to-conversion lift" },
  { v: "−30%", l: "Vendor payout TAT" },
  { v: "45%+", l: "Vendor adoption in 60d" },
  { v: "3×", l: "Faster issue close" },
  { v: "Multi-party", l: "API platform live" },
];

const pillars = [
  {
    n: "01",
    title: "Multi-party marketplace from beta to GA",
    body:
      "Shipped API-driven integrations across fulfillment, payments, project management and procurement — connecting vendors, contractors and enterprise buyers in one operating platform.",
  },
  {
    n: "02",
    title: "AI inside the sales workflow",
    body:
      "Integrated Midjourney and DALL-E into lead conversion and sales-rep workflows. Cut content-ops time and lifted lead-to-conversion by 45% via AI-assisted automation — without breaking the existing CRM flow.",
  },
  {
    n: "03",
    title: "Project management for the field",
    body:
      "Real-time site-view tracking, daily progress logging, and a live project update dashboard for clients and project managers. Field teams stopped sending screenshots over WhatsApp.",
  },
  {
    n: "04",
    title: "Order management & procurement",
    body:
      "Order creation, processing and shipment workflows streamlining multi-party fulfillment across the vendor ecosystem. One pipeline, multiple stakeholders, predictable handoffs.",
  },
  {
    n: "05",
    title: "Vendor payment & credit system",
    body:
      "FIFO reconciliation engine with credit-history tracking — improving settlement accuracy, enabling risk-based decisioning, and cutting payout turnaround by 30%.",
  },
  {
    n: "06",
    title: "Real-time ops monitoring",
    body:
      "Live ops dashboards reaching 45%+ vendor adoption in 60 days. Surfaced recurring failure patterns and reduced time-to-close on escalated issues by 3×.",
  },
];

export default function OfficeBanaoCase() {
  return (
    <div className="overflow-y-auto h-[calc(100%-65px)]">
      {/* Hero */}
      <section className="px-6 md:px-10 pt-10 pb-12">
        <p className="eyebrow">Associate Product Manager · Sept 2023 — Jun 2024</p>
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.02] mt-3">
          A B2B marketplace, <br />
          <span className="font-display-italic text-[var(--muted)]">
            from beta to commercial launch.
          </span>
        </h2>
        <p className="mt-6 text-lg md:text-xl text-[var(--cta)] font-display-italic leading-snug max-w-2xl">
          “An API-driven workspace-design marketplace connecting vendors, contractors,
          and enterprise buyers — shipped from beta to GA.”
        </p>

        <div className="mt-7 flex flex-wrap gap-2">
          <Badge icon={Building2}>B2B Proptech · Gurugram</Badge>
          <Badge icon={Sparkles}>AI-assisted Sales</Badge>
          <Badge icon={Wallet}>FIFO Reconciliation</Badge>
        </div>
      </section>

      <StatRow stats={stats} slug="officebanao" />

      <Block title="The brief" eyebrow="Context">
        <p>
          A multi-party B2B marketplace for workspace design — vendors, contractors,
          enterprise buyers, project managers, finance — all in one operating system.
          The product was in beta. My job was to get it to{" "}
          <span className="text-[var(--fg)]">commercial launch</span> with a real revenue
          engine, fast settlement and live ops monitoring.
        </p>
        <p className="mt-4">
          Three problems compounded: the sales motion was slow (manual content + manual
          qualification), vendor payouts were unreliable (manual reconciliation), and
          escalations took days to close (no live visibility). I attacked them as one
          stack.
        </p>
      </Block>

      <Block title="My role" eyebrow="Ownership">
        <ul className="space-y-3">
          <Bullet>
            Owned the marketplace's path from <span className="text-[var(--fg)]">beta to commercial launch</span>.
          </Bullet>
          <Bullet>
            Designed and shipped vendor payment system, order/procurement platform, and
            real-time ops dashboards.
          </Bullet>
          <Bullet>
            Integrated AI tools (Midjourney, DALL-E) into the sales workflow without
            disrupting the existing process.
          </Bullet>
          <Bullet>
            Coordinated across engineering, design, sales, finance and vendor ops as the
            cross-functional anchor.
          </Bullet>
        </ul>
      </Block>

      <Block title="What I shipped" eyebrow="Product pillars">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-l border-[var(--border)] mt-2">
          {pillars.map((p) => (
            <Pillar key={p.n} {...p} slug="officebanao" />
          ))}
        </div>
      </Block>

      <Block title="The order flow" eyebrow="Marketplace loop">
        <FlowChips
          steps={["Lead", "Quote", "Order", "Fulfillment", "Settlement"]}
        />
        <p className="mt-5 text-[var(--muted)]">
          Every stage instrumented. Where it used to be email + WhatsApp + spreadsheets,
          now it's an API-driven workflow with state transitions, audit logs, and a
          dashboard for the people stuck in the middle.
        </p>
      </Block>

      <Block title="AI where it actually paid off" eyebrow="Generative AI in sales">
        <p>
          Midjourney and DALL-E weren't bolted on as a “we have AI” feature. They were
          embedded inside the lead conversion flow — sales reps used them to generate
          design previews, mood-boards and concept renders during the call itself.
          Content-ops time dropped. Lead-to-conversion moved up by{" "}
          <span className="text-[var(--fg)]">45%</span>.
        </p>
        <p className="mt-4 text-[var(--muted)]">
          The lesson I carried forward: AI works when it's embedded in a workflow, not
          when it's a separate page.
        </p>
      </Block>

      <Block title="The vendor payments unlock" eyebrow="FIFO reconciliation">
        <ul className="space-y-3">
          <Bullet>
            Built a FIFO reconciliation engine with credit-history tracking.
          </Bullet>
          <Bullet>
            Cut payout turnaround by <span className="text-[var(--fg)]">30%</span> — a
            real trust-builder for vendors.
          </Bullet>
          <Bullet>
            Enabled risk-based decisioning (who gets fast settlement, who gets standard)
            without manual review.
          </Bullet>
        </ul>
      </Block>

      <Block title="The outcome" eyebrow="Result">
        <p>
          Drove the platform from beta to commercial launch with a working AI-assisted
          sales motion, a payments stack that vendors trusted, and live ops monitoring
          adopted by 45%+ of vendors in 60 days. Escalations closed 3× faster — and the
          team stopped firefighting.
        </p>
      </Block>

      <EndCap name="OfficeBanao" />
    </div>
  );
}
