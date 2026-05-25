import React, { useEffect, useState } from "react";

const links = [
  { href: "#about", label: "About", id: "about" },
  { href: "#work", label: "Work", id: "work" },
  { href: "#ai", label: "AI Projects", id: "ai" },
  { href: "#experience", label: "Experience", id: "experience" },
  { href: "#skills", label: "Skills", id: "skills" },
  { href: "#contact", label: "Contact", id: "contact" },
];

const sectionMap = {
  about: "About",
  work: "Selected Work",
  ai: "AI Projects",
  experience: "Experience",
  skills: "Capabilities",
  contact: "Contact",
};

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentSection, setCurrentSection] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section observer ("now playing" indicator)
  useEffect(() => {
    const ids = Object.keys(sectionMap);
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the section with highest intersection ratio currently visible
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setCurrentSection(visible[0].target.id);
        } else {
          // If nothing intersecting, find the one just above the viewport
          const above = entries
            .filter((e) => e.boundingClientRect.top < 0)
            .sort((a, b) => b.boundingClientRect.top - a.boundingClientRect.top);
          if (above[0]) setCurrentSection(above[0].target.id);
        }
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.1, 0.4, 0.8] }
    );

    els.forEach((el) => observer.observe(el));

    const onScrollTop = () => {
      if (window.scrollY < 120) setCurrentSection(null);
    };
    window.addEventListener("scroll", onScrollTop);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScrollTop);
    };
  }, []);

  const nowPlaying = currentSection ? sectionMap[currentSection] : null;

  return (
    <header
      data-testid="site-nav"
      className={`fixed top-0 inset-x-0 z-40 transition-colors duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-[var(--bg)]/70 border-b border-[var(--border)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4 min-w-0">
          <a
            href="#top"
            data-testid="nav-logo"
            className="font-display text-xl tracking-tight shrink-0"
          >
            Manav <span className="font-display-italic text-[var(--muted)]">Bhardwaj</span>
          </a>

          {/* Now-playing section indicator */}
          <div
            className="hidden md:flex items-center gap-2 overflow-hidden"
            data-testid="nav-now-playing"
            aria-live="polite"
          >
            <span
              className={`block h-px bg-[var(--cta-ring)] transition-all duration-500 ${
                nowPlaying ? "w-6 opacity-70" : "w-0 opacity-0"
              }`}
            />
            <span
              className={`text-[11px] uppercase tracking-[0.18em] text-[var(--cta)] font-mono-ed whitespace-nowrap transition-all duration-500 ${
                nowPlaying
                  ? "translate-y-0 opacity-90"
                  : "translate-y-2 opacity-0 pointer-events-none"
              }`}
            >
              {nowPlaying || ""}
            </span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-7">
          {links.map((l) => {
            const active = currentSection === l.id;
            return (
              <a
                key={l.href}
                href={l.href}
                data-testid={`nav-link-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
                className={`relative text-[13px] tracking-wide transition-colors ${
                  active
                    ? "text-[var(--fg)]"
                    : "text-[var(--muted)] hover:text-[var(--fg)]"
                }`}
              >
                {l.label}
                <span
                  className={`absolute -bottom-1 left-0 right-0 h-px bg-[var(--cta-ring)] transition-transform duration-300 origin-left ${
                    active ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </a>
            );
          })}
        </nav>

        <a
          href="#contact"
          data-testid="nav-cta-talk"
          className="hidden md:inline-flex items-center gap-2 text-[13px] tracking-wide border border-[var(--border)] px-4 py-2 hover:bg-[var(--surface)] hover:border-[var(--cta-ring)]/60 transition-colors"
        >
          <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Available for roles
        </a>

        <button
          aria-label="Open menu"
          data-testid="nav-mobile-toggle"
          className="md:hidden text-[var(--fg)] text-sm border border-[var(--border)] px-3 py-1.5"
          onClick={() => setOpen((s) => !s)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-[var(--border)] bg-[var(--bg)]/95 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                data-testid={`nav-mobile-link-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-sm text-[var(--muted)] hover:text-[var(--fg)]"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
