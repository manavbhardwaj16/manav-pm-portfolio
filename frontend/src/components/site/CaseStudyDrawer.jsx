import React, { useEffect } from "react";
import { X, ArrowUpRight, Apple, Smartphone } from "lucide-react";

const screenshots = [
  {
    src: "https://customer-assets.emergentagent.com/job_ai-product-builder-10/artifacts/2xmk8rhd_GG.webp",
    caption: "Casual gaming layer — 20,000+ no-install titles in one tap.",
  },
  {
    src: "https://customer-assets.emergentagent.com/job_ai-product-builder-10/artifacts/n8od7lid_HH.webp",
    caption: "Tournament discovery — featured cups, prize pools, live state.",
  },
  {
    src: "https://customer-assets.emergentagent.com/job_ai-product-builder-10/artifacts/7lpvklzp_unnamed.webp",
    caption: "Rewards engine — Gems & Tokens tied to behavioral missions.",
  },
  {
    src: "https://customer-assets.emergentagent.com/job_ai-product-builder-10/artifacts/l7o5h7pj_11.jpeg",
    caption: "In-app support — GenAI-assisted ticketing, faster replies.",
  },
];

const heroStats = [
  { v: "150K+", l: "Users" },
  { v: "+30%", l: "DAU growth" },
  { v: "+25%", l: "D30 retention" },
  { v: "−40%", l: "Time to value" },
  { v: "−60%", l: "Manual ops cost" },
  { v: "2 mo", l: "0 → launch" },
];

const pillars = [
  {
    n: "01",
    title: "Real-time competitive core",
    body: "Tournament-based gameplay with live leaderboards, team creation, and squad-based social competition. Built the loop: discover → register → compete → climb.",
  },
  {
    n: "02",
    title: "Onboarding around the aha moment",
    body: "Reframed activation as ‘first competitive match completed’ instead of signup. Surface tournaments instantly. Result: −40% time-to-first-value, +25% D30 retention.",
  },
  {
    n: "03",
    title: "Rewards & wallet economy",
    body: "Designed a dual-currency system (Gems + Tokens), payout flows, and PG integrations. Mapped earn surfaces to behaviors that drive retention (continuous play, daily quests, referrals).",
  },
  {
    n: "04",
    title: "Endless casual layer",
    body: "Integrated third-party casual-gaming APIs to surface 20,000+ no-install titles inside Thryl — solving the cold-start problem and lifting session length.",
  },
  {
    n: "05",
    title: "GenAI support ops",
    body: "Draft-response generation + intelligent escalation routing for the in-app support inbox. Cut manual operations cost by 60% while maintaining SLA on critical tickets.",
  },
  {
    n: "06",
    title: "Thryl Web — Organizer platform",
    body: "Companion B2B web platform for gaming studios & tournament organizers to create, configure and run tournaments live on the Thryl mobile app in real-time.",
  },
];

const experiments = [
  "Reframed onboarding around the first competitive match (not signup) → −40% TTFV.",
  "A/B tested 3 activation paths on the home tab → DAU +30%.",
  "Introduced daily mission stack tied to wallet → D30 retention +25%.",
  "Surface tuned tournament cards by behavior segment → registration rate ↑.",
];

export default function CaseStudyDrawer({ open, onClose }) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        aria-hidden={!open}
        data-testid="case-drawer-backdrop"
        className={`fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer */}
      <aside
        aria-hidden={!open}
        role="dialog"
        aria-label="Thryl case study"
        data-testid="case-drawer-thryl"
        className={`fixed top-0 right-0 z-[80] h-full w-full md:w-[720px] lg:w-[820px] bg-[var(--bg)] border-l border-[var(--border-strong)] shadow-[0_0_80px_rgba(0,0,0,0.6)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Sticky header */}
        <div className="sticky top-0 z-10 bg-[var(--bg)]/95 backdrop-blur-xl border-b border-[var(--border)] px-6 md:px-10 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <span className="eyebrow shrink-0">Case Study 01</span>
            <span className="text-[var(--muted-2)]">·</span>
            <span className="font-display text-lg truncate">Thryl</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close case study"
            data-testid="case-drawer-close"
            className="text-[var(--muted)] hover:text-[var(--fg)] border border-[var(--border)] hover:border-[var(--cta-ring)] p-2 transition-colors"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto h-[calc(100%-65px)]">
          {/* Hero */}
          <section className="px-6 md:px-10 pt-10 pb-12">
            <p className="eyebrow">Founding Product Manager · Sept 2024 — Oct 2025</p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.02] mt-3">
              Building Thryl <br />
              <span className="font-display-italic text-[var(--muted)]">
                from idea to 150K+ users.
              </span>
            </h2>
            <p className="mt-6 text-lg md:text-xl text-[var(--cta)] font-display-italic leading-snug max-w-2xl">
              “A real-time competitive gaming platform built for engagement, rewards,
              and scale.”
            </p>

            {/* Platform badges */}
            <div className="mt-7 flex flex-wrap gap-2">
              <Badge icon={Apple}>App Store · iOS</Badge>
              <Badge icon={Smartphone}>Google Play · Android</Badge>
              <Badge>B2C Mobile · India</Badge>
              <Badge>Esports & Casual Gaming</Badge>
            </div>
          </section>

          {/* TL;DR Stat strip */}
          <section className="border-y border-[var(--border)]">
            <div className="px-6 md:px-10 py-6">
              <div className="eyebrow mb-5">Outcomes at a glance</div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-8">
                {heroStats.map((s, i) => (
                  <div key={i} data-testid={`thryl-stat-${i}`}>
                    <div className="font-display text-3xl md:text-4xl tracking-tight">
                      {s.v}
                    </div>
                    <div className="eyebrow mt-1.5">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Context */}
          <Block title="The brief" eyebrow="Context">
            <p>
              Make competitive gaming <em>actually</em> engaging for everyday Indian users —
              not just hardcore esports players. The market had tournament platforms and
              casual aggregators, but nothing that fused{" "}
              <span className="text-[var(--fg)]">competitive structure</span>,{" "}
              <span className="text-[var(--fg)]">instant rewards</span> and{" "}
              <span className="text-[var(--fg)]">social play</span> into one loop.
            </p>
            <p className="mt-4">
              I joined as the Founding Product Manager. No CTO. A small engineering team.
              A whiteboard. The first three months were 0→1: define the MVP, write the
              first PRDs, ship a focused launch around{" "}
              <span className="font-display-italic">one</span> behavior — competitive
              play with instant rewards.
            </p>
          </Block>

          {/* My role */}
          <Block title="My role" eyebrow="Ownership">
            <ul className="space-y-3">
              <Bullet>
                Owned the full <span className="text-[var(--fg)]">0→1 product lifecycle</span>{" "}
                — discovery, PRDs, roadmap, sprints, QA, launch, iteration.
              </Bullet>
              <Bullet>
                Acted as the cross-functional anchor across Engineering, Design,
                Operations and DevOps (no CTO in place).
              </Bullet>
              <Bullet>
                Ran user interviews, usability sessions, and weekly funnel reviews to
                continuously re-prioritize the backlog.
              </Bullet>
              <Bullet>
                Defined and owned the KPI tree: <em>activation</em>, <em>retention</em>,{" "}
                <em>monetization</em>, <em>ops cost</em>.
              </Bullet>
            </ul>
          </Block>

          {/* What we built */}
          <Block title="What we shipped" eyebrow="Product pillars">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-l border-[var(--border)] mt-2">
              {pillars.map((p) => (
                <div
                  key={p.n}
                  className="border-r border-b border-[var(--border)] p-6"
                  data-testid={`thryl-pillar-${p.n}`}
                >
                  <div className="font-mono-ed text-[11px] text-[var(--muted-2)]">
                    Nº {p.n}
                  </div>
                  <div className="font-display text-xl md:text-2xl mt-3 leading-snug">
                    {p.title}
                  </div>
                  <p className="text-sm text-[var(--muted)] mt-3 leading-relaxed">
                    {p.body}
                  </p>
                </div>
              ))}
            </div>
          </Block>

          {/* Screens */}
          <Block title="Inside the app" eyebrow="Selected screens">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              {screenshots.map((s, i) => (
                <figure
                  key={i}
                  className="border border-[var(--border)] bg-[var(--surface)] overflow-hidden"
                  data-testid={`thryl-screen-${i}`}
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={s.src}
                      alt={s.caption}
                      loading="lazy"
                      className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-700"
                    />
                  </div>
                  <figcaption className="text-xs text-[var(--muted)] px-4 py-3 border-t border-[var(--border)] font-display-italic">
                    {s.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </Block>

          {/* Flow */}
          <Block title="The core loop" eyebrow="User flow">
            <div className="flex flex-wrap items-center gap-2 mt-2 text-sm">
              {["Onboarding", "Tournament", "Wallet", "Leaderboard"].map((step, i, arr) => (
                <React.Fragment key={step}>
                  <span className="px-3 py-2 border border-[var(--cta-ring)]/40 text-[var(--cta)] font-display-italic">
                    {step}
                  </span>
                  {i < arr.length - 1 && (
                    <span className="text-[var(--muted-2)]">→</span>
                  )}
                </React.Fragment>
              ))}
            </div>
            <p className="mt-5 text-[var(--muted)]">
              Every screen earned its place against this loop. Anything that didn't move
              a user one step further got cut.
            </p>
          </Block>

          {/* Experiments */}
          <Block title="Experiments that moved the needle" eyebrow="Growth & retention">
            <ul className="space-y-3">
              {experiments.map((e, i) => (
                <Bullet key={i}>{e}</Bullet>
              ))}
            </ul>
          </Block>

          {/* Monetization */}
          <Block title="Monetization & systems" eyebrow="Revenue craft">
            <p>
              Built monetization <span className="text-[var(--fg)]">into</span> the
              experience, not on top of it. Three rails — kept independent so each could
              be tuned without breaking the others:
            </p>
            <ul className="space-y-3 mt-5">
              <Bullet>
                <strong className="text-[var(--fg)]">Ads & offerwalls</strong> — Google
                Ads + integrated offerwalls for scalable revenue without breaking flow.
              </Bullet>
              <Bullet>
                <strong className="text-[var(--fg)]">Wallet & payouts</strong> — Full
                in-app wallet with payment-gateway integrations and a payout roadmap
                designed for compliance and edge-case durability.
              </Bullet>
              <Bullet>
                <strong className="text-[var(--fg)]">Rewards economy</strong> — Gems &
                Tokens tied to behaviors that drive D30 — not vanity actions.
              </Bullet>
            </ul>
          </Block>

          {/* Thryl Web */}
          <Block title="Thryl Web — Organizer platform" eyebrow="Companion product">
            <p>
              Built and launched a <span className="text-[var(--fg)]">B2B web platform</span>{" "}
              for gaming studios and tournament organizers to{" "}
              <em>create and manage tournaments in real time</em> on the Thryl mobile
              app. Brackets, registrations, prize pools, room IDs, broadcast metadata —
              all configurable live without engineering involvement.
            </p>
            <ul className="space-y-3 mt-5">
              <Bullet>
                Self-serve tournament creation: format, schedule, prize pool,
                eligibility, fees — all from a web console.
              </Bullet>
              <Bullet>
                Live state sync to the mobile app — registration closes, brackets
                advance, room IDs broadcast — without app releases.
              </Bullet>
              <Bullet>
                Organizer analytics: registrations, drop-off, prize distribution, and
                player feedback in one dashboard.
              </Bullet>
            </ul>
          </Block>

          {/* Outcome */}
          <Block title="The outcome" eyebrow="Result">
            <p>
              From whiteboard to a fully functional platform live on{" "}
              <span className="text-[var(--fg)]">iOS and Android</span>, Thryl scaled to{" "}
              <span className="text-[var(--fg)]">150K+ users</span> with a clear PLG
              engine — high activation, retentive rewards loops, AI-assisted support
              ops, and a B2B side-product feeding the consumer side.
            </p>
            <p className="mt-5 text-[var(--muted)]">
              The throughline: every release was tied to a hypothesis and a measurable
              outcome. No mid-sprint changes. No ships without instrumentation.
            </p>
          </Block>

          {/* CTA / Links */}
          <section className="px-6 md:px-10 py-12 border-t border-[var(--border)]">
            <div className="eyebrow mb-4">Available on</div>
            <div className="flex flex-wrap gap-3">
              <LinkPill href="https://apps.apple.com/" icon={Apple}>
                App Store
              </LinkPill>
              <LinkPill
                href="https://play.google.com/store/apps"
                icon={Smartphone}
              >
                Google Play
              </LinkPill>
              <LinkPill
                href="mailto:manavbhardwaj16@gmail.com?subject=Thryl%20case%20study"
                icon={ArrowUpRight}
              >
                Ask Manav about Thryl
              </LinkPill>
            </div>
          </section>

          <div className="px-6 md:px-10 pb-16 pt-6 text-[10px] uppercase tracking-widest text-[var(--muted-2)]">
            End · Thryl case study · Built and shipped by Manav Bhardwaj
          </div>
        </div>
      </aside>
    </>
  );
}

// ---------- helpers ----------
function Block({ eyebrow, title, children }) {
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

function Bullet({ children }) {
  return (
    <li className="flex gap-3">
      <span className="mt-2 size-1 rounded-full bg-[var(--cta-ring)] shrink-0" />
      <span>{children}</span>
    </li>
  );
}

function Badge({ children, icon: Icon }) {
  return (
    <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest border border-[var(--border)] px-3 py-1.5 text-[var(--muted)]">
      {Icon && <Icon className="size-3" strokeWidth={1.5} />}
      {children}
    </span>
  );
}

function LinkPill({ href, icon: Icon, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-2 border border-[var(--border)] hover:border-[var(--cta-ring)] hover:bg-[var(--surface)] px-4 py-3 text-sm transition-colors"
    >
      <Icon className="size-4 text-[var(--muted)] group-hover:text-[var(--cta)] transition-colors" strokeWidth={1.5} />
      {children}
      <ArrowUpRight className="size-3.5 text-[var(--muted)] group-hover:text-[var(--cta)] transition-colors" />
    </a>
  );
}
