"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { formatPrice, getProduct } from "@/lib/products";
import type { CartItem } from "@/context/StoreContext";

type User = { name: string; email: string };
type Order = {
  id: string;
  items: CartItem[];
  total: number;
  placedAt: string;
};

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [order, setOrder] = useState<Order | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const u = localStorage.getItem("luxe-user");
      if (u) setUser(JSON.parse(u));
      else {
        router.replace("/login");
        return;
      }
      const o = localStorage.getItem("luxe-last-order");
      if (o) setOrder(JSON.parse(o));
    } catch {}
    setLoaded(true);
  }, [router]);

  if (!loaded || !user) return <div className="min-h-[60vh]" />;

  const logout = () => {
    localStorage.removeItem("luxe-user");
    router.push("/");
  };

  return (
    <div className="bg-white min-h-[70vh]">
      <div className="bg-cream py-4 lg:py-5 text-center">
        <h1 className="display-serif text-3xl">My Account</h1>
        <p className="eyebrow text-stone mt-3">Welcome back, {user.name}</p>
      </div>

      <div className="mx-auto max-w-[1000px] px-5 lg:px-10 py-4 lg:py-5 grid md:grid-cols-[240px_1fr] gap-8">
        <aside className="space-y-4">
          <p className="eyebrow border-b border-black/10 pb-3">Menu</p>
          <nav className="flex flex-col gap-3 text-sm font-light">
            <span className="text-ink">Orders</span>
            <Link href="/wishlist" className="text-stone hover:text-ink transition-colors">Wishlist</Link>
            <Link href="/cart" className="text-stone hover:text-ink transition-colors">Cart</Link>
            <button onClick={logout} className="text-left text-stone hover:text-ink transition-colors">
              Log out
            </button>
          </nav>
        </aside>

        <section>
          <h2 className="display-serif text-xl mb-5">Order History</h2>
          {order ? (
            <div className="border border-sand p-6">
              <div className="flex flex-wrap justify-between gap-2 border-b border-black/5 pb-4 mb-4">
                <span className="eyebrow">Order {order.id}</span>
                <span className="text-xs font-light text-stone">
                  {new Date(order.placedAt).toLocaleDateString("en-US", {
                    month: "long", day: "numeric", year: "numeric",
                  })}{" "}
                  · <span className="text-ink">Confirmed</span>
                </span>
              </div>
              <ul className="space-y-2 text-sm font-light">
                {order.items.map((i) => {
                  const p = getProduct(i.slug);
                  return (
                    <li key={`${i.slug}-${i.size}`} className="flex justify-between">
                      <span>{p?.name ?? i.slug} · {i.size} × {i.qty}</span>
                      <span>{p ? formatPrice(p.price * i.qty) : ""}</span>
                    </li>
                  );
                })}
              </ul>
              <div className="flex justify-between border-t border-black/5 mt-4 pt-4 text-sm">
                <span>Total</span>
                <span>{formatPrice(order.total)}</span>
              </div>
            </div>
          ) : (
            <div className="text-center border border-sand py-8 px-6">
              <p className="text-sm font-light text-stone mb-6">
                You haven&apos;t placed any orders yet.
              </p>
              <Link href="/shop" className="btn btn-dark">Start Shopping</Link>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
