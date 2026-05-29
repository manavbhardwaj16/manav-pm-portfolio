import React from "react";
import { Sparkles, Wallet, Boxes, Smartphone, Layers } from "lucide-react";
import { Block, Bullet, Badge, StatRow, EndCap } from "./shared";

const heroStats = [
  { v: "+45%", l: "Lead-to-conversion lift" },
  { v: "4", l: "Engineering pods managed" },
  { v: "3", l: "Platforms shipped: OMS · Procurement · Mobile" },
  { v: "−30%", l: "Vendor payout TAT" },
  { v: "45%+", l: "Vendor adoption in 60d" },
  { v: "3×", l: "Faster issue close" },
];

const officebanoScreens = [
  {
    src: "https://customer-assets.emergentagent.com/job_ai-product-builder-10/artifacts/7fqq51db_unnamed%20%282%29.webp",
    caption: "Edit viewing angle — link site photos to floor-plan positions.",
  },
  {
    src: "https://customer-assets.emergentagent.com/job_ai-product-builder-10/artifacts/030033p7_unnamed%20%281%29.webp",
    caption: "Compare images — same position, different days, side-by-side.",
  },
  {
    src: "https://customer-assets.emergentagent.com/job_ai-product-builder-10/artifacts/7gob4tr0_unnamed%20%283%29.webp",
    caption: "Add positions on the layout — Workhall, Board Room, Pantry.",
  },
  {
    src: "https://customer-assets.emergentagent.com/job_ai-product-builder-10/artifacts/l7z3ewqb_unnamed%20%284%29.webp",
    caption: "Upload layout — drop CAD plans, switch sites in one tap.",
  },
];

const themes = [
  {
    eyebrow: "AI-powered space visualization",
    icon: Sparkles,
    title: "DALL·E & Midjourney inside the enterprise sales motion",
    intro:
      "Enterprise clients couldn't visualize their future workspace before committing. Lengthy back-and-forth with designers slowed sales cycles and killed conversion. We fixed that at the product level.",
    blocks: [
      {
        title: "Prompt-to-visualization pipeline",
        body:
          "Designed the end-to-end flow for clients to input space requirements — dimensions, team size, style preference — and generate photorealistic renders via DALL·E and Midjourney. Defined prompt templating logic to keep outputs consistent and brand-safe across client verticals.",
      },
      {
        title: "Reducing sales-cycle friction",
        body:
          "The AI visualization layer replaced a 3–5 day designer turnaround with instant on-demand renders, removing a major drop-off in the enterprise sales funnel. Worked with the sales team to embed the tool directly into client discovery calls.",
      },
      {
        title: "Iteration & adoption tracking",
        body:
          "Defined success metrics — render acceptance rate, iteration count per client, time-to-decision. Led adoption sessions with the BD team to integrate AI renders into standard proposal decks.",
      },
    ],
  },
  {
    eyebrow: "Fintech infrastructure",
    icon: Wallet,
    title: "FIFO-based vendor payment reconciliation",
    intro:
      "A multi-vendor marketplace with project-based billing created a hard reconciliation problem — payments arrived in bulk but needed to be allocated against individual POs, milestone completions and vendor invoices in sequence. Manual reconciliation was failing at scale.",
    blocks: [
      {
        title: "FIFO allocation engine",
        body:
          "Designed the reconciliation logic where incoming payments were matched against the oldest outstanding vendor obligations first — ensuring fair, auditable and dispute-free settlement across the vendor network. Defined edge cases with engineering: partial payments, credit notes, and multi-PO settlements.",
      },
      {
        title: "Multi-party payment system",
        body:
          "Built the spec for a payment flow that handled enterprise clients, vendors and OfficeBanao's own margin — with configurable payout triggers tied to project milestones. Designed reconciliation dashboards for the finance team to track settlement status in real time.",
      },
      {
        title: "Dispute reduction & audit trail",
        body:
          "FIFO sequencing created a clear, reproducible audit trail — every allocation traceable back to a PO, invoice and project milestone. Vendor dispute-resolution time dropped significantly post-launch.",
      },
    ],
  },
  {
    eyebrow: "Order & procurement infrastructure",
    icon: Boxes,
    title: "OMS + Procurement Portal — B2B and internal",
    intro:
      "Two systems, one platform: an external-facing vendor experience and an internal control plane for ops. Built so order, PO, and payment state stayed in sync across both.",
    blocks: [
      {
        title: "Order Management System",
        body:
          "End-to-end order creation, processing and status tracking — from enterprise client request to vendor fulfillment and delivery confirmation. Defined state machines for order lifecycle, exception handling, and escalation paths.",
      },
      {
        title: "Procurement Portal",
        body:
          "B2B-facing portal for vendor onboarding, catalog management, quote submission and PO acceptance. Internal-facing view for ops teams to manage approvals, raise POs and track vendor compliance.",
      },
      {
        title: "Dual-sided portal architecture",
        body:
          "Two distinct UX layers on one platform — external vendors got a streamlined self-serve interface for quotes and PO status; internal ops got a control plane for approval workflows, SLA monitoring and vendor performance scoring.",
      },
      {
        title: "Order creation & processing flows",
        body:
          "Mapped and productized the full order lifecycle — client raises requirement, ops qualifies, vendor submits quote, PO is raised, delivery tracked, payment triggered. Reduced manual intervention at each handoff through automated status updates and notification logic.",
      },
    ],
  },
  {
    eyebrow: "Mobile · project management",
    icon: Smartphone,
    title: "On-site progress tracking for project managers",
    intro:
      "Project managers on construction and fit-out sites had no structured way to log daily progress, flag blockers, or communicate status back to the central ops team — everything happened over WhatsApp. We replaced that with a purpose-built mobile product.",
    blocks: [
      {
        title: "Daily progress logging",
        body:
          "Designed a lightweight mobile-first flow for on-site PMs to log daily task completion, manpower count, material usage, and photo documentation — structured enough to be reportable, fast enough not to disrupt their workflow.",
      },
      {
        title: "Blocker escalation & milestone tracking",
        body:
          "Built escalation flows for on-site issues — material delays, contractor no-shows, design change requests — routed directly to the responsible ops team member with context and priority. Milestone completion on mobile unlocked payment triggers in the OMS.",
      },
      {
        title: "Central visibility dashboard",
        body:
          "Site-level data aggregated into a central dashboard for ops leads — project health at a glance, SLA adherence by site, and flagged blockers requiring intervention. Replaced weekly status calls with real-time project visibility.",
      },
    ],
  },
];

const pods = [
  {
    name: "AI & Visualization",
    body: "DALL·E / Midjourney integration, prompt engineering, render pipeline.",
  },
  {
    name: "Payments & Fintech",
    body: "FIFO reconciliation, vendor payouts, milestone-linked triggers.",
  },
  {
    name: "OMS & Procurement",
    body: "Order lifecycle, PO workflows, dual-sided portal.",
  },
  {
    name: "Mobile",
    body: "Project manager app, site logging, escalation flows.",
  },
];

export default function OfficeBanaoCase() {
  return (
    <div className="overflow-y-auto h-[calc(100%-65px)]">
      {/* Hero */}
      <section className="px-6 md:px-10 pt-10 pb-12">
        <p className="eyebrow">Associate Product Manager · Sept 2023 — Jun 2024</p>
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.02] mt-3">
          Scaling a B2B PropTech marketplace <br />
          <span className="font-display-italic text-[var(--muted)]">end-to-end.</span>
        </h2>
        <p className="mt-6 text-lg md:text-xl text-[var(--cta)] font-display-italic leading-snug max-w-2xl">
          “From AI-powered space visualization to FIFO vendor reconciliation — building
          the product infrastructure that connected enterprises, vendors and project
          managers on one platform.”
        </p>

        <div className="mt-7 flex flex-wrap gap-2">
          <Badge>B2B SaaS</Badge>
          <Badge>PropTech</Badge>
          <Badge>0 → 1 & Scale</Badge>
          <Badge icon={Sparkles}>AI Integration</Badge>
          <Badge icon={Wallet}>Fintech Infra</Badge>
        </div>
      </section>

      <StatRow stats={heroStats} slug="officebanao" />

      <Block title="The brief" eyebrow="Context">
        <p>
          A multi-party B2B marketplace for workspace design — vendors, contractors,
          enterprise buyers, project managers, finance — all in one operating system.
          The product was in beta. My job was to get it to{" "}
          <span className="text-[var(--fg)]">commercial launch</span> with a real
          revenue engine, fast settlement, and live ops monitoring.
        </p>
        <p className="mt-4">
          Three problems compounded — the sales motion was slow (manual content +
          manual qualification), vendor payouts were unreliable (manual
          reconciliation), and escalations took days to close (no live visibility).
          I attacked them as one stack across four engineering pods.
        </p>
      </Block>

      {/* Thematic stacks */}
      {themes.map((t, idx) => {
        const Icon = t.icon;
        const isMobile = t.eyebrow === "Mobile · project management";
        return (
          <section
            key={idx}
            data-testid={`officebanao-theme-${idx}`}
            className="px-6 md:px-10 py-12 border-b border-[var(--border)]"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="size-9 shrink-0 border border-[var(--cta-ring)]/40 flex items-center justify-center mt-1">
                <Icon strokeWidth={1.4} className="size-4 text-[var(--cta)]" />
              </div>
              <div>
                <p className="eyebrow">{t.eyebrow}</p>
                <h3 className="font-display text-2xl md:text-3xl mt-2 leading-tight">
                  {t.title}
                </h3>
              </div>
            </div>

            <p className="text-[15px] text-[var(--muted)] leading-relaxed max-w-3xl">
              {t.intro}
            </p>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 border-t border-l border-[var(--border)]">
              {t.blocks.map((b, k) => (
                <div
                  key={k}
                  className="border-r border-b border-[var(--border)] p-6"
                  data-testid={`officebanao-theme-${idx}-block-${k}`}
                >
                  <div className="font-mono-ed text-[11px] text-[var(--muted-2)]">
                    {String(k + 1).padStart(2, "0")}
                  </div>
                  <div className="font-display text-lg md:text-xl mt-3 leading-snug">
                    {b.title}
                  </div>
                  <p className="text-sm text-[var(--muted)] mt-3 leading-relaxed">
                    {b.body}
                  </p>
                </div>
              ))}
            </div>

            {isMobile && (
              <div className="mt-10">
                <p className="eyebrow mb-4">From the mobile product</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {officebanoScreens.map((s, i) => (
                    <figure
                      key={i}
                      className="border border-[var(--border)] bg-[var(--surface)] overflow-hidden"
                      data-testid={`officebanao-screen-${i}`}
                    >
                      <div className="aspect-square overflow-hidden">
                        <img
                          src={s.src}
                          alt={s.caption}
                          loading="lazy"
                          className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-700"
                        />
                      </div>
                      <figcaption className="text-[11px] text-[var(--muted)] px-3 py-2 border-t border-[var(--border)] font-display-italic leading-snug">
                        {s.caption}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            )}
          </section>
        );
      })}

      {/* Cross-functional execution */}
      <section className="px-6 md:px-10 py-12 border-b border-[var(--border)]">
        <div className="flex items-start gap-4 mb-6">
          <div className="size-9 shrink-0 border border-[var(--cta-ring)]/40 flex items-center justify-center mt-1">
            <Layers strokeWidth={1.4} className="size-4 text-[var(--cta)]" />
          </div>
          <div>
            <p className="eyebrow">Cross-functional execution</p>
            <h3 className="font-display text-2xl md:text-3xl mt-2 leading-tight">
              Managing 4 engineering pods <span className="font-display-italic text-[var(--muted)]">simultaneously.</span>
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-[var(--border)]">
          {pods.map((p, i) => (
            <div
              key={p.name}
              data-testid={`officebanao-pod-${i}`}
              className="border-r border-b border-[var(--border)] p-6"
            >
              <div className="font-mono-ed text-[11px] text-[var(--muted-2)]">
                Pod {String(i + 1).padStart(2, "0")}
              </div>
              <div className="font-display text-xl mt-3">{p.name}</div>
              <p className="text-sm text-[var(--muted)] mt-3 leading-relaxed">
                {p.body}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-8 text-[var(--muted)] leading-relaxed max-w-3xl">
          Ran sprint planning, backlog grooming, and stakeholder demos across all four
          pods concurrently. Owned the dependency map between them — payments couldn't
          go live without OMS milestones, mobile couldn't escalate without the ops
          dashboard. Sequenced releases to maintain momentum without breaking
          inter-system contracts.
        </p>
      </section>

      <Block title="The outcome" eyebrow="Result">
        <p>
          Shipped <span className="text-[var(--fg)]">three platforms</span> (OMS,
          Procurement, Mobile), an{" "}
          <span className="text-[var(--fg)]">AI-assisted sales motion</span>, and a{" "}
          <span className="text-[var(--fg)]">FIFO payments stack</span> that vendors
          trusted — with a <span className="text-[var(--fg)]">+45%</span>{" "}
          lead-to-conversion lift and live ops dashboards adopted by 45%+ of vendors
          inside 60 days.
        </p>
        <p className="mt-5 text-[var(--muted)]">
          The lesson I carried forward: a marketplace isn't one product — it's three
          systems pretending to be one. The PM's job is to keep the contracts between
          them honest.
        </p>
      </Block>

      <EndCap name="OfficeBanao" />
    </div>
  );
}
