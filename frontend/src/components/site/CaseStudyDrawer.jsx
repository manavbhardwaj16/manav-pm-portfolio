import React, { useEffect } from "react";
import { X } from "lucide-react";
import ThrylCase from "@/components/site/cases/ThrylCase";
import KredybleCase from "@/components/site/cases/KredybleCase";
import OfficeBanaoCase from "@/components/site/cases/OfficeBanaoCase";
import EvifyCase from "@/components/site/cases/EvifyCase";

const REGISTRY = {
  thryl: {
    idx: "01",
    name: "Thryl",
    component: ThrylCase,
  },
  kredyble: {
    idx: "02",
    name: "Kredyble",
    component: KredybleCase,
  },
  officebanao: {
    idx: "03",
    name: "OfficeBanao",
    component: OfficeBanaoCase,
  },
  evify: {
    idx: "04",
    name: "Evify",
    component: EvifyCase,
  },
};

export default function CaseStudyDrawer({ slug, onClose }) {
  const open = !!slug;
  const entry = slug ? REGISTRY[slug] : null;
  const CaseBody = entry ? entry.component : null;

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
        aria-label={entry ? `${entry.name} case study` : "Case study"}
        data-testid={slug ? `case-drawer-${slug}` : "case-drawer"}
        className={`fixed top-0 right-0 z-[80] h-full w-full md:w-[720px] lg:w-[820px] bg-[var(--bg)] border-l border-[var(--border-strong)] shadow-[0_0_80px_rgba(0,0,0,0.6)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Sticky header */}
        <div className="sticky top-0 z-10 bg-[var(--bg)]/95 backdrop-blur-xl border-b border-[var(--border)] px-6 md:px-10 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <span className="eyebrow shrink-0">
              {entry ? `Case Study ${entry.idx}` : "Case Study"}
            </span>
            <span className="text-[var(--muted-2)]">·</span>
            <span className="font-display text-lg truncate">
              {entry ? entry.name : ""}
            </span>
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

        {/* Body — render the active case */}
        {CaseBody && <CaseBody />}
      </aside>
    </>
  );
}
