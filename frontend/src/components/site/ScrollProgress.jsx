import React, { useEffect, useState } from "react";

/**
 * Editorial reading indicator — a 1px bronze hairline fixed at the top of the
 * viewport. Width tracks scroll progress. Subtle, premium, never in the way.
 */
export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop || document.body.scrollTop;
      const height = doc.scrollHeight - doc.clientHeight;
      const pct = height > 0 ? Math.min(100, (scrollTop / height) * 100) : 0;
      setProgress(pct);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      data-testid="scroll-progress"
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[60] h-px bg-transparent pointer-events-none"
    >
      <div
        className="h-full transition-[width] duration-150 ease-out"
        style={{
          width: `${progress}%`,
          background:
            "linear-gradient(90deg, transparent 0%, var(--cta-ring) 40%, var(--cta) 100%)",
          boxShadow: progress > 0 ? "0 0 8px var(--cta-ring)" : "none",
        }}
      />
    </div>
  );
}
