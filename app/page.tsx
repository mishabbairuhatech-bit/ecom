import Image from "next/image";
import Link from "next/link";
import { products, getProduct } from "@/lib/products";
import HeroCarousel from "@/components/HeroCarousel";
import ProductCarousel from "@/components/ProductCarousel";
import CategorySpotlight from "@/components/CategorySpotlight";

const justLanded = [
  { slug: "aria-wireless-headphones", label: "Aria Headphones" },
  { slug: "marlow-velvet-sofa", label: "Marlow Sofa" },
  { slug: "heritage-leather-bag", label: "Heritage Bag" },
];

const featuredSlugs = [
  "adeline-shirt",
  "aria-wireless-headphones",
  "marlow-velvet-sofa",
  "meridian-watch",
  "vista-modern-residence",
  "haven-ceramic-vases",
  "lumen-pro-phone",
  "cecilie-shirt",
  "cloud-upholstered-bed",
  "ember-scented-candle",
];

// Finished 900×1200 offer artwork — the promo copy is baked into each image,
// so the panels carry no overlaid text. Sources: _banner-sources/ (re-render
// with gen.py, then screenshot each page at 900×1200).
const banners = [
  {
    title: "New Arrivals — up to 40% off",
    href: "/shop?category=fashion",
    img: "/banners/new-arrivals-offer-v2.png",
  },
  {
    title: "Best Sellers — extra 15% off",
    href: "/shop?category=accessories",
    img: "/banners/best-sellers-offer-v2.png",
  },
  {
    title: "Real Estate — zero brokerage",
    href: "/shop?category=realestate",
    img: "/banners/real-estate-offer-v2.png",
  },
];

export default function Home() {
  const featured = featuredSlugs
    .map(getProduct)
    .filter((p) => p !== undefined);
  const moreToLove = products.filter((p) => !featuredSlugs.includes(p.slug));

  return (
    <>
      {/* ── Hero carousel ─────────────────────────────────── */}
      <HeroCarousel />

      {/* ── Just Landed ────────────────────────────────────── */}
      <section className="py-4 lg:py-5 bg-white">
        <div className="mx-auto max-w-[1920px] px-6 lg:px-32">
          <div className="grid lg:grid-cols-[280px_1fr] gap-6 lg:gap-8 items-center">
            <div>
              <h2 className="display-serif text-2xl md:text-[1.75rem] text-ink">
                Just Landed
              </h2>
              <p className="text-sm font-light text-stone leading-relaxed mt-4">
                Discover the latest additions across the store — from wireless
                audio and hand-thrown ceramics to leather goods made to last a
                lifetime.
              </p>
              <Link href="/shop" className="btn btn-dark mt-5">
                Shop Now
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5">
              {justLanded.map(({ slug, label }) => {
                const p = getProduct(slug)!;
                return (
                  <Link
                    key={slug}
                    href={`/product/${slug}`}
                    className="group relative aspect-[4/5] sm:aspect-square overflow-hidden bg-linen"
                  >
                    <Image
                      src={p.images[0]}
                      alt={label}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                    <span className="display-serif absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-base whitespace-nowrap">
                      {label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Category banners ──────────────────────────────── */}
      {/* Three tall panels, edge to edge up to 1920px and centred beyond it.
          Photography only — the whole panel is the link, no copy over it. */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1920px] grid grid-cols-1 md:grid-cols-3">
          {banners.map((b) => (
            <Link
              key={b.title}
              href={b.href}
              aria-label={b.title}
              className="group relative aspect-[4/5] md:aspect-[3/4] overflow-hidden"
            >
              <Image
                src={b.img}
                alt={b.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </Link>
          ))}
        </div>
      </section>

      {/* ── Featured products slider ──────────────────────── */}
      <section className="py-4 lg:py-5 bg-white">
        <div className="mx-auto max-w-[1920px] px-6 lg:px-32">
          <h2 className="display-serif text-lg mb-4">
            Deals Of The Season
          </h2>
          <ProductCarousel products={featured} />
        </div>
      </section>

      {/* ── Statement banner ──────────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1920px]">
          <Image
            src="/banners/flight-bookings-offer.webp"
            alt="Visit Kuala Lumpur, Hanoi and more — up to 10% off on flight bookings"
            width={3194}
            height={682}
            sizes="100vw"
            className="w-full h-auto"
          />
        </div>
      </section>

      {/* ── More to love slider ───────────────────────────── */}
      <section className="py-4 lg:py-5 bg-white">
        <div className="mx-auto max-w-[1920px] px-6 lg:px-32">
          <h2 className="display-serif text-lg text-center mb-4">
            More To Love
          </h2>
          <ProductCarousel products={moreToLove} viewMoreHref="/shop" />
        </div>
      </section>

      {/* ── Spotlight ─────────────────────────────────────── */}
      <CategorySpotlight />
    </>
  );
}
