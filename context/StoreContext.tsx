"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getProduct } from "@/lib/products";

export type CartItem = {
  slug: string;
  size: string;
  qty: number;
};

type StoreState = {
  cart: CartItem[];
  wishlist: string[];
  addToCart: (slug: string, size: string, qty?: number) => void;
  removeFromCart: (slug: string, size: string) => void;
  updateQty: (slug: string, size: string, qty: number) => void;
  clearCart: () => void;
  toggleWishlist: (slug: string) => void;
  cartCount: number;
  subtotal: number;
  hydrated: boolean;
};

const StoreContext = createContext<StoreState | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const c = localStorage.getItem("luxe-cart");
      const w = localStorage.getItem("luxe-wishlist");
      if (c) setCart(JSON.parse(c));
      if (w) setWishlist(JSON.parse(w));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem("luxe-cart", JSON.stringify(cart));
  }, [cart, hydrated]);

  useEffect(() => {
    if (hydrated) localStorage.setItem("luxe-wishlist", JSON.stringify(wishlist));
  }, [wishlist, hydrated]);

  const addToCart = (slug: string, size: string, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.slug === slug && i.size === size);
      if (existing) {
        return prev.map((i) =>
          i.slug === slug && i.size === size ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [...prev, { slug, size, qty }];
    });
  };

  const removeFromCart = (slug: string, size: string) =>
    setCart((prev) => prev.filter((i) => !(i.slug === slug && i.size === size)));

  const updateQty = (slug: string, size: string, qty: number) => {
    if (qty < 1) return removeFromCart(slug, size);
    setCart((prev) =>
      prev.map((i) => (i.slug === slug && i.size === size ? { ...i, qty } : i))
    );
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (slug: string) =>
    setWishlist((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );

  const cartCount = cart.reduce((n, i) => n + i.qty, 0);
  const subtotal = useMemo(
    () =>
      cart.reduce((sum, i) => {
        const p = getProduct(i.slug);
        return sum + (p ? p.price * i.qty : 0);
      }, 0),
    [cart]
  );

  return (
    <StoreContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        toggleWishlist,
        cartCount,
        subtotal,
        hydrated,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
