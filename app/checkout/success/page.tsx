"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { formatPrice, getProduct } from "@/lib/products";
import type { CartItem } from "@/context/StoreContext";

type Order = {
  id: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  name: string;
  email: string;
  address: string;
  placedAt: string;
};

export default function SuccessPage() {
  const [order, setOrder] = useState<Order | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("luxe-last-order");
      if (raw) setOrder(JSON.parse(raw));
    } catch {}
    setLoaded(true);
  }, []);

  if (!loaded) return <div className="min-h-[60vh]" />;

  return (
    <div className="bg-white min-h-[70vh]">
      <div className="mx-auto max-w-xl px-5 py-4 lg:py-5 text-center">
        <div className="w-16 h-16 mx-auto rounded-full border border-clay flex items-center justify-center mb-6">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#514f45" strokeWidth="1.5">
            <path d="M4 12.5l5 5L20 6.5" />
          </svg>
        </div>
        <h1 className="display-serif text-3xl mb-4">Thank You</h1>
        <p className="text-sm font-light text-stone leading-relaxed">
          {order?.name ? `${order.name}, your` : "Your"} order has been placed
          successfully. A confirmation email
          {order?.email ? ` has been sent to ${order.email}` : " is on its way"}.
        </p>

        {order && (
          <div className="bg-cream text-left p-7 mt-8">
            <div className="flex justify-between items-baseline border-b border-black/10 pb-4 mb-5">
              <span className="eyebrow">Order {order.id}</span>
              <span className="text-xs font-light text-stone">
                {new Date(order.placedAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
            <ul className="space-y-3 text-sm font-light">
              {order.items.map((i) => {
                const p = getProduct(i.slug);
                return (
                  <li key={`${i.slug}-${i.size}`} className="flex justify-between">
                    <span>
                      {p?.name ?? i.slug} · {i.size} × {i.qty}
                    </span>
                    <span>{p ? formatPrice(p.price * i.qty) : ""}</span>
                  </li>
                );
              })}
            </ul>
            <div className="border-t border-black/10 mt-5 pt-4 space-y-2 text-sm font-light">
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{order.shipping === 0 ? "Free" : formatPrice(order.shipping)}</span>
              </div>
              <div className="flex justify-between text-base font-normal">
                <span>Total</span>
                <span>{formatPrice(order.total)}</span>
              </div>
            </div>
            {order.address && (
              <p className="text-xs font-light text-stone mt-5">
                Shipping to: {order.address}
              </p>
            )}
          </div>
        )}

        <Link href="/shop" className="btn btn-dark mt-8">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
