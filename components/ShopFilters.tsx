"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { categories } from "@/lib/products";

export const priceBuckets = [
  { key: "under100", label: "Under $100" },
  { key: "100-500", label: "$100 – $500" },
  { key: "500-2000", label: "$500 – $2,000" },
  { key: "over2000", label: "Over $2,000" },
];

export const stockOptions = [
  { key: "in", label: "In Stock" },
  { key: "out", label: "Sold Out" },
];

type Props = {
  category: string;
  price: string[];
  stock: string[];
  sale: boolean;
  sort?: string;
  /** Route the filter links target — /shop when browsing, /search when searching. */
  basePath?: string;
  /** Active search query, preserved across filter changes on /search. */
  q?: string;
};

export default function ShopFilters({
  category,
  price,
  stock,
  sale,
  sort,
  basePath = "/shop",
  q,
}: Props) {
  const router = useRouter();

  const buildQuery = (over: Partial<Props>) => {
    const next = { category, price, stock, sale, sort, ...over };
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (next.category && next.category !== "all") params.set("category", next.category);
    if (next.price.length) params.set("price", next.price.join(","));
    if (next.stock.length) params.set("stock", next.stock.join(","));
    if (next.sale) params.set("sale", "1");
    if (next.sort) params.set("sort", next.sort);
    const qs = params.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  };

  const toggle = (list: string[], key: string) =>
    list.includes(key) ? list.filter((k) => k !== key) : [...list, key];

  const hasFilters =
    category !== "all" || price.length > 0 || stock.length > 0 || sale;

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

  return (
    <aside className="lg:border-r lg:border-black/5 lg:pr-8">
      <div className="flex items-baseline justify-between border-b border-black/10 pb-4">
        <h2 className="text-xl font-medium text-ink">Filters</h2>
        {hasFilters && (
          <Link
            href={q ? `${basePath}?q=${encodeURIComponent(q)}` : basePath}
            className="text-xs text-stone underline underline-offset-2 hover:opacity-60"
          >
            Clear All
          </Link>
        )}
      </div>

      {/* Categories */}
      <div className="py-5 border-b border-black/5">
        <h3 className="eyebrow text-ink mb-4">Categories</h3>
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

      {/* Price */}
      <div className="py-5 border-b border-black/5">
        <h3 className="eyebrow text-ink mb-4">Price</h3>
        <div className="flex flex-col gap-3">
          {priceBuckets.map((b) => (
            <Checkbox
              key={b.key}
              checked={price.includes(b.key)}
              label={b.label}
              onClick={() => router.push(buildQuery({ price: toggle(price, b.key) }))}
            />
          ))}
        </div>
      </div>

      {/* Availability */}
      <div className="py-5 border-b border-black/5">
        <h3 className="eyebrow text-ink mb-4">Availability</h3>
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
        <h3 className="eyebrow text-ink mb-4">Discount</h3>
        <Checkbox
          checked={sale}
          label="On Sale"
          onClick={() => router.push(buildQuery({ sale: !sale }))}
        />
      </div>
    </aside>
  );
}
