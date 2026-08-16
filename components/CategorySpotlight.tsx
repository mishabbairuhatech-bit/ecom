import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { categories } from "@/lib/products";

/**
 * Spotlight — one tile per store category.
 *
 * Art direction follows the supplied Fashion mark (public/icons/fashion.png):
 * a flat illustration with a white keyline, sitting on a soft blob. Categories
 * listed in `artwork` render a supplied cut-out PNG; the rest are inline SVG
 * drawn to match, each in a palette that suits its category.
 */

type Palette = { deep: string; soft: string };

const palettes: Record<string, Palette> = {
  realestate: { deep: "#155a68", soft: "#bde0e7" },
};

/** White keyline under the fill, as in the reference mark. */
const keyline = (deep: string) => ({
  fill: deep,
  stroke: "#fff",
  strokeWidth: 7,
  strokeLinejoin: "round" as const,
  paintOrder: "stroke" as const,
});

const art = (key: string, draw: (p: Palette) => ReactNode) => {
  const p = palettes[key];
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <circle cx="57" cy="55" r="39" fill={p.soft} />
      {draw(p)}
    </svg>
  );
};

const icons: Record<string, ReactNode> = {
  realestate: art("realestate", ({ deep }) => (
    <>
      <path d="M50 12L94 50H82v38H18V50H6z" {...keyline(deep)} />
      <rect x="41" y="60" width="18" height="28" rx="3" fill="#fff" />
    </>
  )),
};

/** Categories whose artwork is supplied as a cut-out PNG rather than drawn. */
const artwork: Record<string, string> = {
  fashion: "/icons/fashion.png",
  electronics: "/icons/electronics.png",
  accessories: "/icons/accessories.png",
  home: "/icons/home.png",
  furniture: "/icons/furniture.png",
  beauty: "/icons/beauty.png",
};

const tiles = categories.filter((c) => c.key !== "all");

export default function CategorySpotlight() {
  return (
    <section className="py-10 lg:py-14 bg-white">
      <div className="mx-auto max-w-[1920px] px-6 lg:px-32">
        <h2 className="display-serif text-2xl md:text-[1.75rem] text-ink text-center">
          Spotlight
        </h2>
        <p className="text-sm font-light text-stone text-center mt-3 max-w-xl mx-auto">
          Everything the store carries, in one place — start wherever you like.
        </p>

        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-x-4 gap-y-9 mt-10 lg:mt-12">
          {tiles.map(({ key, label }) => (
            <Link
              key={key}
              href={`/shop?category=${key}`}
              className="group flex flex-col items-center gap-3 text-ink"
            >
              <span className="w-16 h-16 lg:w-20 lg:h-20 transition-transform duration-300 group-hover:-translate-y-1">
                {artwork[key] ? (
                  <Image
                    src={artwork[key]}
                    alt=""
                    width={160}
                    height={160}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  icons[key]
                )}
              </span>
              <span className="text-xs font-light text-center leading-snug group-hover:text-clay transition-colors">
                {label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
