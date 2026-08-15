"use client";

import Link from "next/link";
import { useRef, useState, useEffect, useCallback } from "react";
import type { Product } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export default function ProductCarousel({
  products,
  viewMoreHref,
}: {
  products: Product[];
  /** When set, a "View More" card linking here is appended after the last product. */
  viewMoreHref?: string;
}) {
  const scroller = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateArrows = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  }, []);

  useEffect(() => {
    updateArrows();
    const el = scroller.current;
    if (!el) return;
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [updateArrows]);

  const slide = (dir: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <div className="relative group/carousel">
      <div
        ref={scroller}
        className="flex gap-1.5 overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth"
      >
        {products.map((p) => (
          <div
            key={p.slug}
            className="snap-start shrink-0 w-[62%] sm:w-[42%] md:w-[30%] lg:w-[23%] xl:w-[19%]"
          >
            <ProductCard product={p} />
          </div>
        ))}
        {viewMoreHref && (
          <div className="snap-start shrink-0 w-[62%] sm:w-[42%] md:w-[30%] lg:w-[23%] xl:w-[19%]">
            <Link
              href={viewMoreHref}
              className="group flex aspect-[3/4] flex-col items-center justify-center gap-4 bg-linen hover:bg-cream transition-colors"
            >
              <span className="w-12 h-12 flex items-center justify-center border border-ink/30 rounded-full text-ink transition-transform duration-300 group-hover:translate-x-1">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </span>
              <span className="text-[13px] tracking-[0.15em] uppercase text-ink">
                View More
              </span>
            </Link>
          </div>
        )}
      </div>

      {canPrev && (
        <button
          aria-label="Previous products"
          onClick={() => slide(-1)}
          className="absolute -left-3 top-[35%] z-10 w-10 h-10 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.12)] flex items-center justify-center text-ink hover:bg-cream transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M15 5l-7 7 7 7" />
          </svg>
        </button>
      )}
      {canNext && (
        <button
          aria-label="Next products"
          onClick={() => slide(1)}
          className="absolute -right-3 top-[35%] z-10 w-10 h-10 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.12)] flex items-center justify-center text-ink hover:bg-cream transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
    </div>
  );
}
