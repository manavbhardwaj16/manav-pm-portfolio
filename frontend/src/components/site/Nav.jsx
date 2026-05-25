import React, { useEffect, useState } from "react";

const links = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#ai", label: "AI Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
        <a
          href="#top"
          data-testid="nav-logo"
          className="font-display text-xl tracking-tight"
        >
          Manav <span className="font-display-italic text-[var(--muted)]">Bhardwaj</span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-testid={`nav-link-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-[13px] tracking-wide text-[var(--muted)] hover:text-[var(--fg)] transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          data-testid="nav-cta-talk"
          className="hidden md:inline-flex items-center gap-2 text-[13px] tracking-wide border border-[var(--border)] px-4 py-2 hover:bg-[var(--surface)] transition-colors"
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
