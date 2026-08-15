"use client";

import Image from "next/image";
import Link from "next/link";
import { formatPrice, type Product } from "@/lib/products";
import { useStore } from "@/context/StoreContext";

export default function ProductCard({ product }: { product: Product }) {
  const { wishlist, toggleWishlist, hydrated } = useStore();
  const discount =
    product.compareAt &&
    Math.round((1 - product.price / product.compareAt) * 100);
  const wished = hydrated && wishlist.includes(product.slug);

  return (
    <div className="group">
      <div className="relative aspect-[3/4] overflow-hidden bg-linen">
        <Link href={`/product/${product.slug}`}>
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        </Link>
        {product.soldOut ? (
          <span className="absolute top-3 left-3 bg-clay text-white text-[10px] tracking-[0.15em] uppercase px-2.5 py-1">
            Sold out
          </span>
        ) : (
          discount && (
            <span className="absolute top-3 left-3 bg-clay text-white text-[10px] tracking-[0.15em] px-2.5 py-1">
              -{discount}%
            </span>
          )
        )}
        <button
          aria-label="Add to wishlist"
          onClick={() => toggleWishlist(product.slug)}
          className={`absolute top-3 right-3 p-1.5 transition-all ${
            wished ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill={wished ? "#514f45" : "white"}
            stroke={wished ? "#514f45" : "#514f45"}
            strokeWidth="1.5"
          >
            <path d="M12 21s-7.5-4.9-9.9-9.2C.6 8.8 2.4 5 6 5c2.2 0 3.6 1.2 6 3.8C14.4 6.2 15.8 5 18 5c3.6 0 5.4 3.8 3.9 6.8C19.5 16.1 12 21 12 21Z" />
          </svg>
        </button>
      </div>
      <div className="pt-2.5">
        <Link
          href={`/product/${product.slug}`}
          className="block text-[13px] tracking-wide hover:opacity-60 transition-opacity"
        >
          {product.name}
        </Link>
        <p className="text-[13px] mt-0.5 text-stone font-light">
          {product.compareAt ? (
            <>
              From{" "}
              <span className="line-through text-sand">
                {formatPrice(product.compareAt)}
              </span>{" "}
              <span className="text-ink">{formatPrice(product.price)}</span>
            </>
          ) : (
            <span className="text-ink">{formatPrice(product.price)}</span>
          )}
        </p>
        {product.soldOut ? (
          <p className="eyebrow text-stone mt-1.5">Sold out</p>
        ) : (
          <Link
            href={`/product/${product.slug}`}
            className="eyebrow link-underline inline-block mt-1.5"
          >
            View options
          </Link>
        )}
      </div>
    </div>
  );
}
