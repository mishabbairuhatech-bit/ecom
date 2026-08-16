"use client";

import { useEffect, useState, type ReactNode } from "react";

/** Keep in step with the panel's transition duration. */
const SLIDE_MS = 300;

/**
 * Mobile listing bar — result count on the left, a Filter pill on the right,
 * and the full-screen sheet it opens. The sheet's contents are passed in so the
 * filter logic stays in one place (ShopFilters).
 *
 * `mounted` keeps the panel in the tree long enough to animate out; `shown`
 * drives the transform, flipped a frame after mount so the browser has a start
 * state to animate from.
 */
export default function MobileFilterBar({
  count,
  children,
}: {
  count: number;
  children: ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const [shown, setShown] = useState(false);

  const open = () => {
    setMounted(true);
    // Two frames: the first paints the panel off-screen, the second flips it —
    // one frame alone can batch into the same paint and skip the transition.
    requestAnimationFrame(() =>
      requestAnimationFrame(() => setShown(true))
    );
  };

  const close = () => {
    setShown(false);
    setTimeout(() => setMounted(false), SLIDE_MS);
  };

  // Freeze the page behind the sheet while it is open.
  useEffect(() => {
    if (!mounted) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mounted]);

  return (
    <div className="lg:hidden">
      <div className="flex items-center justify-between py-3">
        <p className="text-lg text-ink">
          {count} Result{count === 1 ? "" : "s"}
        </p>
        <button
          onClick={open}
          className="flex items-center gap-2.5 border border-black/20 rounded-full pl-5 pr-4 py-2.5 text-sm text-ink"
        >
          Filter
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 7h11M17 7h4M3 17h4M10 17h11" />
            <circle cx="15.5" cy="7" r="2" />
            <circle cx="8.5" cy="17" r="2" />
          </svg>
        </button>
      </div>

      {mounted && (
        <div className="fixed inset-0 z-50">
          <div
            className={`absolute inset-0 bg-white flex flex-col transition-transform duration-300 ease-out ${
              shown ? "translate-y-0" : "translate-y-full"
            }`}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-black/10">
              <h2 className="text-xl text-ink">Filter</h2>
              <button
                aria-label="Close filters"
                onClick={close}
                className="w-9 h-9 rounded-full bg-cream flex items-center justify-center text-ink"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 pb-10">{children}</div>
          </div>
        </div>
      )}
    </div>
  );
}
