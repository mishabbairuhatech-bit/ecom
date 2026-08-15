"use client";

import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import { formatPrice, getProduct } from "@/lib/products";

const FREE_SHIPPING_THRESHOLD = 150;

export default function CartPage() {
  const { cart, updateQty, removeFromCart, subtotal, hydrated } = useStore();

  if (!hydrated) return <div className="min-h-[60vh]" />;

  const remaining = FREE_SHIPPING_THRESHOLD - subtotal;

  return (
    <div className="bg-white min-h-[70vh]">
      <div className="bg-cream py-4 lg:py-5 text-center">
        <h1 className="display-serif text-3xl">Your Cart</h1>
        <p className="eyebrow text-stone mt-3">
          <Link href="/" className="hover:opacity-60">Home</Link> / Cart
        </p>
      </div>

      <div className="mx-auto max-w-[1200px] px-5 lg:px-10 py-4 lg:py-5">
        {cart.length === 0 ? (
          <div className="text-center py-4 lg:py-5">
            <p className="display-serif text-xl text-stone mb-6">
              Your cart is empty
            </p>
            <Link href="/shop" className="btn btn-dark">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            {/* Free shipping progress */}
            <div className="mb-5 max-w-xl mx-auto text-center">
              {remaining > 0 ? (
                <p className="text-sm font-light">
                  You are{" "}
                  <span className="font-normal">{formatPrice(remaining)}</span>{" "}
                  away from <span className="uppercase tracking-wider text-xs">free shipping</span>
                </p>
              ) : (
                <p className="text-sm font-light">
                  🎉 You&apos;ve unlocked <span className="uppercase tracking-wider text-xs">free shipping</span>
                </p>
              )}
              <div className="h-[3px] bg-linen mt-3">
                <div
                  className="h-full bg-clay transition-all duration-500"
                  style={{
                    width: `${Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)}%`,
                  }}
                />
              </div>
            </div>

            <div className="grid lg:grid-cols-[1fr_360px] gap-10">
              {/* Items */}
              <div>
                <div className="hidden sm:grid grid-cols-[1fr_auto_auto] gap-6 eyebrow text-stone border-b border-black/10 pb-4">
                  <span>Product</span>
                  <span>Quantity</span>
                  <span className="text-right w-20">Total</span>
                </div>
                {cart.map((item) => {
                  const p = getProduct(item.slug);
                  if (!p) return null;
                  return (
                    <div
                      key={`${item.slug}-${item.size}`}
                      className="grid sm:grid-cols-[1fr_auto_auto] gap-6 items-center py-6 border-b border-black/5"
                    >
                      <div className="flex gap-4 items-center">
                        <Link
                          href={`/product/${p.slug}`}
                          className="relative w-20 aspect-[3/4] bg-linen shrink-0 overflow-hidden"
                        >
                          <Image src={p.images[0]} alt={p.name} fill sizes="80px" className="object-cover" />
                        </Link>
                        <div>
                          <Link
                            href={`/product/${p.slug}`}
                            className="text-sm tracking-wide hover:opacity-60"
                          >
                            {p.name}
                          </Link>
                          <p className="text-xs text-stone font-light mt-1">
                            {p.optionLabel ?? "Size"}: {item.size}
                          </p>
                          <p className="text-xs text-stone font-light mt-0.5">
                            {formatPrice(p.price)}
                          </p>
                          <button
                            onClick={() => removeFromCart(item.slug, item.size)}
                            className="eyebrow link-underline text-stone mt-2"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center border border-sand w-fit">
                        <button
                          onClick={() => updateQty(item.slug, item.size, item.qty - 1)}
                          className="px-3 py-2 hover:bg-cream transition-colors"
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-sm">{item.qty}</span>
                        <button
                          onClick={() => updateQty(item.slug, item.size, item.qty + 1)}
                          className="px-3 py-2 hover:bg-cream transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-sm text-right w-20">
                        {formatPrice(p.price * item.qty)}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Summary */}
              <aside className="bg-cream p-8 h-fit">
                <h2 className="display-serif text-xl mb-6">Order Summary</h2>
                <div className="space-y-3 text-sm font-light border-b border-black/10 pb-5">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{remaining > 0 ? "Calculated at checkout" : "Free"}</span>
                  </div>
                </div>
                <div className="flex justify-between py-5 text-base">
                  <span>Total</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <Link href="/checkout" className="btn btn-dark w-full">
                  Checkout
                </Link>
                <Link
                  href="/shop"
                  className="eyebrow link-underline block text-center mt-5"
                >
                  Continue shopping
                </Link>
              </aside>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
