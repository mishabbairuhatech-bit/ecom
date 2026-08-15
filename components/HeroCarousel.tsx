"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { heroSlides } from "@/lib/hero-slides";

const INTERVAL = 5000;

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(
      () => setIndex((i) => (i + 1) % heroSlides.length),
      INTERVAL
    );
    return () => clearInterval(t);
  }, [paused]);

  const go = (i: number) => setIndex((i + heroSlides.length) % heroSlides.length);

  return (
    <section
      className="relative h-[58vh] min-h-[400px] max-h-[540px] w-full overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {heroSlides.map((s, i) => {
        const active = i === index;
        const layer = `absolute inset-0 transition-opacity duration-700 ${
          active ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
        }`;

        // Finished banner artwork — the image carries its own text.
        if (s.kind === "image") {
          return (
            <div key={s.src} className={layer}>
              <Link href={s.href} className="block relative w-full h-full">
                <Image
                  src={s.src}
                  alt={s.alt}
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  // Banner copy almost always sits on the left, so anchor there:
                  // a centred crop eats the headline on narrow viewports.
                  style={{ objectPosition: s.position ?? "left center" }}
                  className="object-cover"
                />
              </Link>
            </div>
          );
        }

        // Composed slide — offer copy on the left, photography on the right.
        const dark = s.text === "dark";
        return (
          <div key={s.href + s.offer} style={{ background: s.bg }} className={layer}>
            <div className="mx-auto max-w-[1400px] h-full px-5 lg:px-14 grid grid-cols-1 md:grid-cols-2 items-center">
              <div className={`relative z-10 ${dark ? "text-ink" : "text-white"}`}>
                {s.note && (
                  <span className={`eyebrow ${dark ? "text-stone" : "text-white/70"}`}>
                    {s.note}
                  </span>
                )}
                <h1 className="text-4xl md:text-[3.25rem] font-medium leading-[1.05] tracking-tight mt-2">
                  {s.offer}
                </h1>
                <p className="text-xl md:text-2xl font-light mt-2">{s.headline}</p>
                {s.badge && (
                  <span className="inline-block text-xs tracking-wide mt-5 px-4 py-2 bg-white/95 text-ink">
                    {s.badge}
                  </span>
                )}
                <div>
                  <Link
                    href={s.href}
                    className={`btn mt-6 ${dark ? "btn-dark" : "btn-light"}`}
                  >
                    {s.cta}
                  </Link>
                </div>
              </div>

              <div className="absolute inset-y-0 right-0 w-[58%] md:w-[46%] hidden sm:block">
                <Image
                  src={s.img}
                  alt={`${s.offer} — ${s.headline}`}
                  fill
                  priority={i === 0}
                  sizes="(max-width: 768px) 60vw, 46vw"
                  className="object-cover"
                />
                <div
                  className="absolute inset-y-0 left-0 w-32"
                  style={{
                    background: `linear-gradient(to right, ${
                      dark ? "rgba(240,235,226,0.9)" : "rgba(62,60,52,0.85)"
                    }, transparent)`,
                  }}
                />
              </div>
            </div>
          </div>
        );
      })}

      <button
        aria-label="Previous slide"
        onClick={() => go(index - 1)}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 flex items-center justify-center bg-white/85 hover:bg-white text-ink transition-colors"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M15 5l-7 7 7 7" />
        </svg>
      </button>
      <button
        aria-label="Next slide"
        onClick={() => go(index + 1)}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 flex items-center justify-center bg-white/85 hover:bg-white text-ink transition-colors"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex gap-2.5">
        {heroSlides.map((s, i) => (
          <button
            key={(s.kind === "image" ? s.src : s.offer) + i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => go(i)}
            className={`h-[3px] transition-all duration-300 ${
              i === index ? "w-8 bg-ink/70" : "w-4 bg-ink/25 hover:bg-ink/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
