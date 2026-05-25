import React from "react";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer data-testid="site-footer" className="border-t border-[var(--border)] py-10 mt-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="font-display text-lg">
          Manav Bhardwaj —{" "}
          <span className="font-display-italic text-[var(--muted)]">{year}</span>
        </div>
        <div className="text-xs text-[var(--muted-2)] tracking-wide uppercase">
          Built with precision. Designed for outcomes.
        </div>
      </div>
    </footer>
  );
}
