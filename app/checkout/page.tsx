"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/context/StoreContext";
import { formatPrice, getProduct } from "@/lib/products";

const FREE_SHIPPING_THRESHOLD = 150;
const SHIPPING_FLAT = 8;

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, subtotal, clearCart, hydrated } = useStore();
  const [placing, setPlacing] = useState(false);
  const [payMethod, setPayMethod] = useState<"card" | "paypal">("card");
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zip: "",
    country: "United States",
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvc: "",
  });

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT;
  const total = subtotal + shipping;

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const formatCardNumber = (v: string) =>
    v.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ");
  const formatExpiry = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 4);
    return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
  };

  const placeOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    setPlacing(true);
    const orderId = `LX-${Math.floor(100000 + Math.random() * 900000)}`;
    const order = {
      id: orderId,
      items: cart,
      subtotal,
      shipping,
      total,
      name: `${form.firstName} ${form.lastName}`.trim(),
      email: form.email,
      address: `${form.address}, ${form.city} ${form.zip}, ${form.country}`,
      placedAt: new Date().toISOString(),
    };
    localStorage.setItem("luxe-last-order", JSON.stringify(order));
    // Simulate payment processing
    setTimeout(() => {
      clearCart();
      router.push("/checkout/success");
    }, 1200);
  };

  if (!hydrated) return <div className="min-h-[60vh]" />;

  if (cart.length === 0 && !placing) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6">
        <p className="display-serif text-xl text-stone">Your cart is empty</p>
        <Link href="/shop" className="btn btn-dark">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-[70vh]">
      <div className="bg-cream py-4 lg:py-5 text-center">
        <h1 className="display-serif text-3xl">Checkout</h1>
        <p className="eyebrow text-stone mt-3">Secure checkout · SSL encrypted</p>
      </div>

      <form
        onSubmit={placeOrder}
        className="mx-auto max-w-[1200px] px-5 lg:px-10 py-4 lg:py-5 grid lg:grid-cols-[1fr_420px] gap-8"
      >
        {/* Left: forms */}
        <div className="space-y-7">
          {/* Contact */}
          <section>
            <h2 className="display-serif text-xl mb-4">Contact</h2>
            <input
              type="email"
              required
              placeholder="Email address"
              className="input"
              value={form.email}
              onChange={set("email")}
            />
          </section>

          {/* Shipping */}
          <section>
            <h2 className="display-serif text-xl mb-4">Shipping Address</h2>
            <div className="grid grid-cols-2 gap-4">
              <input required placeholder="First name" className="input" value={form.firstName} onChange={set("firstName")} />
              <input required placeholder="Last name" className="input" value={form.lastName} onChange={set("lastName")} />
              <input required placeholder="Address" className="input col-span-2" value={form.address} onChange={set("address")} />
              <input required placeholder="City" className="input" value={form.city} onChange={set("city")} />
              <input required placeholder="ZIP / Postal code" className="input" value={form.zip} onChange={set("zip")} />
              <select className="input col-span-2" value={form.country} onChange={set("country")}>
                {["United States", "Canada", "United Kingdom", "Australia", "India", "United Arab Emirates"].map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
          </section>

          {/* Payment */}
          <section>
            <h2 className="display-serif text-xl mb-4">Payment</h2>
            <div className="border border-sand divide-y divide-sand">
              {/* Card option */}
              <label className="flex items-center gap-3 p-4 cursor-pointer">
                <input
                  type="radio"
                  name="pay"
                  checked={payMethod === "card"}
                  onChange={() => setPayMethod("card")}
                  className="accent-clay"
                />
                <span className="text-sm">Credit / Debit Card</span>
                <span className="ml-auto text-xs text-stone font-light">Visa · MC · Amex</span>
              </label>
              {payMethod === "card" && (
                <div className="p-4 bg-cream grid grid-cols-2 gap-4">
                  <input
                    required
                    placeholder="Card number"
                    inputMode="numeric"
                    className="input col-span-2"
                    value={form.cardNumber}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, cardNumber: formatCardNumber(e.target.value) }))
                    }
                  />
                  <input
                    required
                    placeholder="Name on card"
                    className="input col-span-2"
                    value={form.cardName}
                    onChange={set("cardName")}
                  />
                  <input
                    required
                    placeholder="MM/YY"
                    inputMode="numeric"
                    className="input"
                    value={form.expiry}
                    onChange={(e) => setForm((f) => ({ ...f, expiry: formatExpiry(e.target.value) }))}
                  />
                  <input
                    required
                    placeholder="CVC"
                    inputMode="numeric"
                    maxLength={4}
                    className="input"
                    value={form.cvc}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, cvc: e.target.value.replace(/\D/g, "") }))
                    }
                  />
                </div>
              )}
              {/* PayPal option */}
              <label className="flex items-center gap-3 p-4 cursor-pointer">
                <input
                  type="radio"
                  name="pay"
                  checked={payMethod === "paypal"}
                  onChange={() => setPayMethod("paypal")}
                  className="accent-clay"
                />
                <span className="text-sm">PayPal</span>
              </label>
              {payMethod === "paypal" && (
                <p className="p-4 bg-cream text-xs font-light text-stone">
                  You will be redirected to PayPal to complete your purchase
                  securely.
                </p>
              )}
            </div>
            <p className="text-xs font-light text-stone mt-4">
              This is a demo store — no real payment is processed.
            </p>
          </section>

          <button
            type="submit"
            disabled={placing}
            className="btn btn-dark w-full disabled:opacity-60"
          >
            {placing ? "Processing payment…" : `Pay ${formatPrice(total)}`}
          </button>
        </div>

        {/* Right: order summary */}
        <aside className="bg-cream p-8 h-fit lg:sticky lg:top-24">
          <h2 className="display-serif text-xl mb-5">Your Order</h2>
          <div className="space-y-5 border-b border-black/10 pb-6">
            {cart.map((item) => {
              const p = getProduct(item.slug);
              if (!p) return null;
              return (
                <div key={`${item.slug}-${item.size}`} className="flex gap-4 items-center">
                  <div className="relative w-14 aspect-[3/4] bg-linen shrink-0 overflow-hidden">
                    <Image src={p.images[0]} alt={p.name} fill sizes="56px" className="object-cover" />
                    <span className="absolute -top-1.5 -right-1.5 bg-clay text-white text-[10px] w-[18px] h-[18px] rounded-full flex items-center justify-center">
                      {item.qty}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm tracking-wide">{p.name}</p>
                    <p className="text-xs text-stone font-light">{p.optionLabel ?? "Size"}: {item.size}</p>
                  </div>
                  <span className="text-sm">{formatPrice(p.price * item.qty)}</span>
                </div>
              );
            })}
          </div>
          <div className="space-y-3 text-sm font-light py-5 border-b border-black/10">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
            </div>
          </div>
          <div className="flex justify-between pt-5 text-base">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
        </aside>
      </form>
    </div>
  );
}
