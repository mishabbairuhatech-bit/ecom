"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { categories } from "@/lib/products";
import PriceRange from "@/components/PriceRange";

export const stockOptions = [
  { key: "in", label: "In Stock" },
  { key: "out", label: "Sold Out" },
];

export const sortOptions = [
  { key: undefined, label: "Featured" },
  { key: "price-desc", label: "Price: High-Low" },
  { key: "price-asc", label: "Price: Low-High" },
];

type Props = {
  category: string;
  stock: string[];
  sale: boolean;
  sort?: string;
  /** Lowest/highest price available in the current scope. */
  bounds: { min: number; max: number };
  /** Active price window — defaults to the full bounds. */
  min: number;
  max: number;
  /** Route the filter links target — /shop when browsing, /search when searching. */
  basePath?: string;
  /** Active search query, preserved across filter changes on /search. */
  q?: string;
  /** "sidebar" is the desktop rail; "sheet" is the mobile filter drawer. */
  variant?: "sidebar" | "sheet";
};

const Checkbox = ({
  checked,
  label,
  onClick,
}: {
  checked: boolean;
  label: string;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className="flex items-center gap-3 text-sm font-light text-ink hover:opacity-60 transition-opacity"
  >
    <span
      className={`w-4 h-4 shrink-0 border flex items-center justify-center ${
        checked ? "bg-ink border-ink" : "border-black/30 bg-white"
      }`}
    >
      {checked && (
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
          <path d="M5 12l5 5L19 7" />
        </svg>
      )}
    </span>
    {label}
  </button>
);

const Radio = ({
  checked,
  label,
  onClick,
}: {
  checked: boolean;
  label: string;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className="flex items-center gap-3 text-sm font-light text-ink"
  >
    <span
      className={`w-5 h-5 shrink-0 rounded-full border flex items-center justify-center ${
        checked ? "border-ink" : "border-black/30"
      }`}
    >
      {checked && <span className="w-2.5 h-2.5 rounded-full bg-ink" />}
    </span>
    {label}
  </button>
);

export default function ShopFilters({
  category,
  stock,
  sale,
  sort,
  bounds,
  min,
  max,
  basePath = "/shop",
  q,
  variant = "sidebar",
}: Props) {
  const router = useRouter();
  const sheet = variant === "sheet";

  const buildQuery = (
    over: Partial<{
      category: string;
      stock: string[];
      sale: boolean;
      sort?: string;
      min: number;
      max: number;
    }>
  ) => {
    const next = { category, stock, sale, sort, min, max, ...over };
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (next.category && next.category !== "all")
      params.set("category", next.category);
    if (next.stock.length) params.set("stock", next.stock.join(","));
    if (next.sale) params.set("sale", "1");
    if (next.sort) params.set("sort", next.sort);
    // Only carry the price window when it actually narrows the scope, and drop
    // it entirely when the category changes — the new scope has new bounds.
    if (!("category" in over)) {
      if (next.min > bounds.min) params.set("min", String(Math.round(next.min)));
      if (next.max < bounds.max) params.set("max", String(Math.round(next.max)));
    }
    const qs = params.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  };

  const toggle = (list: string[], key: string) =>
    list.includes(key) ? list.filter((k) => k !== key) : [...list, key];

  const hasFilters =
    category !== "all" ||
    stock.length > 0 ||
    sale ||
    min > bounds.min ||
    max < bounds.max;

  return (
    <aside className={sheet ? "" : "lg:border-r lg:border-black/5 lg:pr-8"}>
      {!sheet && hasFilters && (
        <div className="flex justify-end pb-4 border-b border-black/10">
          <Link
            href={q ? `${basePath}?q=${encodeURIComponent(q)}` : basePath}
            className="text-xs text-stone underline underline-offset-2 hover:opacity-60"
          >
            Clear All
          </Link>
        </div>
      )}

      {/* Sort — lives in the sheet on mobile; the desktop rail has its own bar */}
      {sheet && (
        <div className="py-5 border-b border-black/5">
          <h3 className="text-base font-medium text-ink mb-4">Sort By</h3>
          <div className="flex flex-col gap-4">
            {sortOptions.map((s) => (
              <Radio
                key={s.label}
                checked={sort === s.key || (!sort && !s.key)}
                label={s.label}
                onClick={() => router.push(buildQuery({ sort: s.key }))}
              />
            ))}
          </div>
        </div>
      )}

      {/* Categories */}
      <div className="py-5 border-b border-black/5">
        <h3 className={sheet ? "text-base font-medium text-ink mb-4" : "eyebrow text-ink mb-4"}>
          Categories
        </h3>
        <ul className="flex flex-col gap-2.5">
          {categories.map((c) => (
            <li key={c.key}>
              <Link
                href={buildQuery({ category: c.key })}
                className={`text-sm transition-opacity hover:opacity-60 ${
                  category === c.key
                    ? "text-ink font-medium"
                    : "text-stone font-light"
                }`}
              >
                {c.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Shop By Price */}
      <div className="py-5 border-b border-black/5">
        <h3 className={sheet ? "text-base font-medium text-ink mb-4" : "eyebrow text-ink mb-4"}>
          Shop By Price
        </h3>
        <PriceRange
          key={`${bounds.min}-${bounds.max}-${min}-${max}`}
          bounds={bounds}
          min={min}
          max={max}
          onCommit={(a, b) => router.push(buildQuery({ min: a, max: b }))}
        />
      </div>

      {/* Availability */}
      <div className="py-5 border-b border-black/5">
        <h3 className={sheet ? "text-base font-medium text-ink mb-4" : "eyebrow text-ink mb-4"}>
          Availability
        </h3>
        <div className="flex flex-col gap-3">
          {stockOptions.map((s) => (
            <Checkbox
              key={s.key}
              checked={stock.includes(s.key)}
              label={s.label}
              onClick={() => router.push(buildQuery({ stock: toggle(stock, s.key) }))}
            />
          ))}
        </div>
      </div>

      {/* Discount */}
      <div className="py-5">
        <h3 className={sheet ? "text-base font-medium text-ink mb-4" : "eyebrow text-ink mb-4"}>
          Discount
        </h3>
        <Checkbox
          checked={sale}
          label="On Sale"
          onClick={() => router.push(buildQuery({ sale: !sale }))}
        />
      </div>
    </aside>
  );
}
