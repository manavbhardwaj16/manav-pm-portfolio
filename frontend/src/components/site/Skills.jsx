import React from "react";

const groups = [
  {
    title: "AI & Agentic Systems",
    items: [
      "Agentic Architecture",
      "Human-in-the-Loop Design",
      "Confidence Scoring",
      "Escalation Logic",
      "RAG Architecture",
      "Evaluation Loops",
      "Prompt Engineering",
      "GenAI Automation",
      "Hallucination Mitigation",
      "AI Explainability & Audit",
      "n8n",
    ],
  },
  {
    title: "Fintech & Payments",
    items: [
      "Card-Based Payment Flows",
      "Authorization Cycles",
      "Settlement & Reconciliation",
      "Retry Logic",
      "Payment Orchestration",
      "KYC",
      "RBI Compliance",
      "FIFO Reconciliation",
      "Vendor Payments",
    ],
  },
  {
    title: "Product Management",
    items: [
      "End-to-End Lifecycle",
      "0→1 Development",
      "PRD & BRD Authoring",
      "Roadmapping",
      "Backlog Management",
      "OKRs & KPIs",
      "Agile / Scrum",
      "GTM Strategy",
    ],
  },
  {
    title: "Analytics & Growth",
    items: [
      "Funnel Analysis",
      "Cohort & Retention",
      "A/B Testing",
      "KPI Monitoring",
      "DAU/MAU Tracking",
      "Activation & Conversion",
      "SQL (Basic)",
    ],
  },
  {
    title: "Platform & API",
    items: [
      "API-Based Product Design",
      "Multi-Party Platform Architecture",
      "Marketplace Systems",
      "System Integrations",
      "Data Pipelines",
      "Order Management",
      "Procurement Workflows",
    ],
  },
  {
    title: "Tools",
    items: [
      "Claude",
      "ChatGPT",
      "Gemini",
      "Groq",
      "n8n",
      "Cursor",
      "Figma",
      "JIRA",
      "Notion",
      "Postman",
      "Mixpanel",
      "Amplitude",
      "Google Analytics",
      "HubSpot",
      "Airtable",
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" data-testid="skills-section" className="py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16 md:mb-20 reveal">
          <div className="lg:col-span-7">
            <p className="eyebrow">Capabilities</p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight mt-4 leading-[1.02]">
              Built for the AI era — <br />
              <span className="font-display-italic">from agents to audits.</span>
            </h2>
          </div>
          <p className="lg:col-span-5 text-[var(--muted)] text-sm md:text-base leading-relaxed lg:pt-3">
            A working stack across AI agents, regulated fintech, growth analytics and
            marketplace systems — exercised on shipped products, not slide-deck strategy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-[var(--border)]">
          {groups.map((g, i) => (
            <div
              key={g.title}
              data-testid={`skill-group-${i}`}
              className="border-r border-b border-[var(--border)] p-8 md:p-10"
            >
              <div className="flex items-baseline justify-between">
                <h3 className="font-display text-xl md:text-2xl">{g.title}</h3>
                <span className="font-mono-ed text-[11px] text-[var(--muted-2)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="mt-6 flex flex-wrap gap-1.5">
                {g.items.map((it) => (
                  <span
                    key={it}
                    className="text-[12px] border border-[var(--border)] px-2.5 py-1 text-[var(--muted)] hover:text-[var(--fg)] hover:border-[var(--border-strong)] transition-colors"
                    data-testid={`skill-item-${it.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                  >
                    {it}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
