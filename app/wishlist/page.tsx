"use client";

import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import { getProduct } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export default function WishlistPage() {
  const { wishlist, hydrated } = useStore();

  if (!hydrated) return <div className="min-h-[60vh]" />;

  const items = wishlist.map(getProduct).filter((p) => p !== undefined);

  return (
    <div className="bg-white min-h-[70vh]">
      <div className="bg-cream py-4 lg:py-5 text-center">
        <h1 className="display-serif text-3xl">Wishlist</h1>
        <p className="eyebrow text-stone mt-3">
          <Link href="/" className="hover:opacity-60">Home</Link> / Wishlist
        </p>
      </div>

      <div className="mx-auto max-w-[1400px] px-5 lg:px-10 py-4 lg:py-5">
        {items.length === 0 ? (
          <div className="text-center py-4 lg:py-5">
            <p className="display-serif text-xl text-stone mb-6">
              Your wishlist is empty
            </p>
            <p className="text-sm font-light text-stone mb-8">
              Tap the heart on any product to save it here.
            </p>
            <Link href="/shop" className="btn btn-dark">Browse The Shop</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-1.5 gap-y-7">
            {items.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
