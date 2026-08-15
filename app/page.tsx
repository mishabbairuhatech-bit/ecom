import Image from "next/image";
import Link from "next/link";
import { products, getProduct } from "@/lib/products";
import HeroCarousel from "@/components/HeroCarousel";
import ProductCarousel from "@/components/ProductCarousel";

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

const banners = [
  {
    title: "New Arrivals",
    cta: "Shop Now",
    href: "/shop?category=fashion",
    img: "/banners/new-arrivals-category.png",
  },
  {
    title: "Best Sellers",
    cta: "Shop Now",
    href: "/shop?category=accessories",
    img: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1400&auto=format&fit=crop",
  },
  {
    title: "Furniture",
    cta: "Shop Furniture",
    href: "/shop?category=furniture",
    img: "/banners/furniture-category.png",
  },
  {
    title: "Real Estate",
    cta: "View Homes",
    href: "/shop?category=realestate",
    img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1400&auto=format&fit=crop",
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
        <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
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
                    className="group relative aspect-[3/4] overflow-hidden bg-linen"
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
      <section className="py-4 lg:py-5 bg-white">
        {/* Fluid container: scales with the viewport with even side padding
            rather than capping at a fixed width. */}
        <div className="w-full px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {banners.map((b) => (
              <Link
                key={b.title}
                href={b.href}
                className="group relative aspect-[16/9] md:aspect-[21/9] overflow-hidden"
              >
                <Image
                  src={b.img}
                  alt={b.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-black/15" />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <h2 className="display-serif text-3xl md:text-4xl text-white">
                    {b.title}
                  </h2>
                  <span className="btn btn-dark mt-5">{b.cta}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured products slider ──────────────────────── */}
      <section className="bg-cream py-4 lg:py-5">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
          <h2 className="display-serif text-lg mb-4">
            Deals Of The Season
          </h2>
          <ProductCarousel products={featured} />
        </div>
      </section>

      {/* ── Statement banner ──────────────────────────────── */}
      <section className="py-4 lg:py-5 bg-white">
        <div className="w-full px-5 sm:px-8 lg:px-12">
          <div className="relative overflow-hidden py-10 lg:py-12">
            <Image
              src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=2000&auto=format&fit=crop"
              alt="Thoughtfully curated for modern living"
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/45" />
            <div className="relative mx-auto max-w-3xl px-5 text-center text-white">
              <h2 className="display-serif text-3xl md:text-5xl leading-[1.3]">
                Thoughtfully Curated For Modern Living
              </h2>
              <p className="text-sm font-light mt-5 max-w-xl mx-auto">
                From the shirt you reach for daily to the headphones that quiet
                the commute — everything here is chosen to last and made to love.
              </p>
              <Link href="/shop" className="btn btn-light mt-6">
                Discover The Collection
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── More to love slider ───────────────────────────── */}
      <section className="py-4 lg:py-5 bg-white">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
          <h2 className="display-serif text-lg text-center mb-4">
            More To Love
          </h2>
          <ProductCarousel products={moreToLove} viewMoreHref="/shop" />
        </div>
      </section>
    </>
  );
}
