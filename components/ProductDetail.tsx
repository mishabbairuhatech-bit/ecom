"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { formatPrice, type Product } from "@/lib/products";
import { useStore } from "@/context/StoreContext";

export default function ProductDetail({ product }: { product: Product }) {
  const router = useRouter();
  const { addToCart, toggleWishlist, wishlist, hydrated } = useStore();
  const [size, setSize] = useState(product.sizes[0]);
  const [qty, setQty] = useState(1);
  const [imgIndex, setImgIndex] = useState(0);
  const [added, setAdded] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(true);

  const discount =
    product.compareAt &&
    Math.round((1 - product.price / product.compareAt) * 100);
  const wished = hydrated && wishlist.includes(product.slug);

  const handleAdd = () => {
    addToCart(product.slug, size, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product.slug, size, qty);
    router.push("/checkout");
  };

  return (
    <section className="mx-auto max-w-[1400px] px-5 lg:px-10 py-4 lg:py-5">
      <p className="eyebrow text-stone mb-6">
        <Link href="/" className="hover:opacity-60">Home</Link> /{" "}
        <Link href="/shop" className="hover:opacity-60">Shop</Link> /{" "}
        <span className="text-ink">{product.name}</span>
      </p>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Gallery */}
        <div>
          <div className="relative aspect-[3/4] bg-linen overflow-hidden">
            <Image
              src={product.images[imgIndex]}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            {discount && !product.soldOut && (
              <span className="absolute top-4 left-4 bg-clay text-white text-[11px] tracking-[0.15em] px-3 py-1.5">
                -{discount}%
              </span>
            )}
            {product.soldOut && (
              <span className="absolute top-4 left-4 bg-clay text-white text-[11px] tracking-[0.15em] uppercase px-3 py-1.5">
                Sold out
              </span>
            )}
          </div>
          <div className="flex gap-3 mt-3">
            {product.images.map((img, i) => (
              <button
                key={img}
                onClick={() => setImgIndex(i)}
                className={`relative w-20 aspect-[3/4] overflow-hidden bg-linen ${
                  i === imgIndex ? "ring-1 ring-clay" : "opacity-70 hover:opacity-100"
                } transition-opacity`}
              >
                <Image src={img} alt="" fill sizes="80px" className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="lg:pt-4">
          <h1 className="display-serif text-3xl">{product.name}</h1>
          <p className="mt-4 text-lg font-light">
            {product.compareAt ? (
              <>
                <span className="line-through text-sand mr-3">
                  {formatPrice(product.compareAt)}
                </span>
                <span>{formatPrice(product.price)}</span>
              </>
            ) : (
              formatPrice(product.price)
            )}
          </p>

          <p className="text-sm font-light text-stone leading-relaxed mt-5">
            {product.description}
          </p>

          {/* Size */}
          <div className="mt-6">
            <p className="eyebrow mb-3">
              {product.optionLabel ?? "Size"}: <span className="text-stone">{size}</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`min-w-11 px-3 py-2.5 text-xs tracking-wider border transition-colors ${
                    size === s
                      ? "border-clay bg-clay text-white"
                      : "border-sand text-ink hover:border-clay"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Qty + Add */}
          {product.soldOut ? (
            <div className="mt-8">
              <button disabled className="btn w-full bg-sand text-white cursor-not-allowed">
                Sold Out
              </button>
              <p className="text-xs font-light text-stone mt-3">
                This item is currently sold out. Add it to your wishlist to be
                notified when it returns.
              </p>
            </div>
          ) : (
            <>
              <div className="flex gap-3 mt-6">
                <div className="flex items-center border border-sand">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="px-4 py-3 hover:bg-cream transition-colors"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="w-8 text-center text-sm">{qty}</span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="px-4 py-3 hover:bg-cream transition-colors"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                <button onClick={handleAdd} className="btn btn-dark flex-1">
                  {added ? "Added ✓" : "Add To Cart"}
                </button>
              </div>
              <button onClick={handleBuyNow} className="btn btn-outline w-full mt-3">
                Buy It Now
              </button>
            </>
          )}

          <button
            onClick={() => toggleWishlist(product.slug)}
            className="eyebrow link-underline mt-5 inline-block"
          >
            {wished ? "♥ Saved to wishlist" : "♡ Add to wishlist"}
          </button>

          {/* Details accordion */}
          <div className="border-t border-black/10 mt-8">
            <button
              onClick={() => setDetailsOpen(!detailsOpen)}
              className="w-full flex items-center justify-between py-4 eyebrow"
            >
              Details &amp; Care
              <span>{detailsOpen ? "−" : "+"}</span>
            </button>
            {detailsOpen && (
              <ul className="pb-5 space-y-2 text-sm font-light text-stone">
                {product.details.map((d) => (
                  <li key={d}>— {d}</li>
                ))}
              </ul>
            )}
          </div>
          <div className="border-t border-b border-black/10">
            <div className="py-4 eyebrow text-stone">
              Free shipping on orders over $150 · Free returns within 30 days
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
