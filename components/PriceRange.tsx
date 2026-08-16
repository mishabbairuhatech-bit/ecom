"use client";

import { useState } from "react";

/** Whole-dollar labels — cents add noise at slider scale. */
const money = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;

/**
 * Shop By Price — two amount fields over a dual-thumb slider.
 *
 * Bounds come from the products currently in scope (category + search), so the
 * track always spans real prices. The caller keys this component on the active
 * window so a URL change elsewhere (category, clear all) resets the thumbs. The change is committed to the URL on release
 * or on blur rather than on every drag frame.
 */
export default function PriceRange({
  bounds,
  min,
  max,
  onCommit,
}: {
  bounds: { min: number; max: number };
  min: number;
  max: number;
  onCommit: (min: number, max: number) => void;
}) {
  const [lo, setLo] = useState(min);
  const [hi, setHi] = useState(max);

  const span = Math.max(1, bounds.max - bounds.min);
  const step = Math.max(1, Math.round(span / 200));
  const pct = (v: number) => ((v - bounds.min) / span) * 100;

  const commit = (a: number, b: number) => {
    const lowest = Math.max(bounds.min, Math.min(a, b));
    const highest = Math.min(bounds.max, Math.max(a, b));
    setLo(lowest);
    setHi(highest);
    onCommit(lowest, highest);
  };

  const field = (
    label: string,
    value: number,
    set: (n: number) => void,
    commitValue: (n: number) => void
  ) => (
    <label className="relative flex-1 block">
      <span className="absolute -top-2 left-3 px-1 bg-white text-[11px] text-stone">
        {label}
      </span>
      <input
        type="number"
        inputMode="numeric"
        value={value}
        onChange={(e) => set(Number(e.target.value))}
        onBlur={(e) => commitValue(Number(e.target.value))}
        onKeyDown={(e) => {
          if (e.key === "Enter") e.currentTarget.blur();
        }}
        className="w-full border border-black/25 rounded-md px-3 py-3 text-sm text-ink focus:outline-none focus:border-ink"
      />
    </label>
  );

  return (
    <div>
      <p className="text-sm font-light text-ink mb-4">Select Price Range</p>

      <div className="flex gap-3">
        {field("Min. Amount", lo, setLo, (n) => commit(n, hi))}
        {field("Max. Amount", hi, setHi, (n) => commit(lo, n))}
      </div>

      <div className="relative h-6 mt-6">
        <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[2px] bg-sand" />
        <span
          className="absolute top-1/2 -translate-y-1/2 h-[2px] bg-ink"
          style={{ left: `${pct(lo)}%`, right: `${100 - pct(hi)}%` }}
        />
        <input
          aria-label="Minimum price"
          type="range"
          className="range-thumb"
          min={bounds.min}
          max={bounds.max}
          step={step}
          value={lo}
          onChange={(e) => setLo(Math.min(Number(e.target.value), hi))}
          onPointerUp={() => commit(lo, hi)}
          onKeyUp={() => commit(lo, hi)}
        />
        <input
          aria-label="Maximum price"
          type="range"
          className="range-thumb"
          min={bounds.min}
          max={bounds.max}
          step={step}
          value={hi}
          onChange={(e) => setHi(Math.max(Number(e.target.value), lo))}
          onPointerUp={() => commit(lo, hi)}
          onKeyUp={() => commit(lo, hi)}
        />
      </div>

      <div className="flex justify-between text-xs text-ink mt-2">
        <span>{money(lo)}</span>
        <span>{money(hi)}</span>
      </div>
    </div>
  );
}
