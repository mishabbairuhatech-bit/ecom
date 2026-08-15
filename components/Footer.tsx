"use client";

import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer className="bg-clay text-white/80 mt-0">
      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-10 py-4 lg:py-5 text-center">
          <h3 className="display-serif text-2xl text-white mb-2">Stay in touch</h3>
          <p className="text-sm font-light mb-5 max-w-md mx-auto">
            Sign up for early access to new collections, private sales and 10% off
            your first order.
          </p>
          {subscribed ? (
            <p className="eyebrow text-white">Thank you for subscribing</p>
          ) : (
            <form
              className="flex max-w-md mx-auto"
              onSubmit={(e) => {
                e.preventDefault();
                if (email) setSubscribed(true);
              }}
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="flex-1 bg-transparent border border-white/30 px-4 py-3 text-sm placeholder:text-white/40 outline-none focus:border-white/70 transition-colors"
              />
              <button type="submit" className="btn btn-light ml-[-1px]">
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Link columns */}
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10 py-4 lg:py-5 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div>
          <span className="text-4xl text-white [font-family:var(--font-script)]">luxe</span>
          <p className="text-sm font-light mt-4 max-w-[220px]">
            Thoughtfully curated essentials — fashion, electronics, accessories,
            home and beauty.
          </p>
        </div>
        <div>
          <h4 className="eyebrow text-white mb-4">Shop</h4>
          <ul className="space-y-3 text-sm font-light">
            <li><Link href="/shop" className="hover:text-white transition-colors">All Products</Link></li>
            <li><Link href="/shop?category=fashion" className="hover:text-white transition-colors">Fashion</Link></li>
            <li><Link href="/shop?category=electronics" className="hover:text-white transition-colors">Electronics</Link></li>
            <li><Link href="/shop?category=accessories" className="hover:text-white transition-colors">Accessories</Link></li>
            <li><Link href="/shop?category=home" className="hover:text-white transition-colors">Home & Living</Link></li>
            <li><Link href="/shop?category=furniture" className="hover:text-white transition-colors">Furniture</Link></li>
            <li><Link href="/shop?category=realestate" className="hover:text-white transition-colors">Real Estate</Link></li>
            <li><Link href="/shop?category=beauty" className="hover:text-white transition-colors">Beauty</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="eyebrow text-white mb-4">Company</h4>
          <ul className="space-y-3 text-sm font-light">
            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link href="/blog" className="hover:text-white transition-colors">Journal</Link></li>
            <li><Link href="/features" className="hover:text-white transition-colors">Theme Features</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="eyebrow text-white mb-4">Customer Care</h4>
          <ul className="space-y-3 text-sm font-light">
            <li><Link href="/account" className="hover:text-white transition-colors">My Account</Link></li>
            <li><Link href="/wishlist" className="hover:text-white transition-colors">Wishlist</Link></li>
            <li><Link href="/cart" className="hover:text-white transition-colors">Cart</Link></li>
            <li><span>Free shipping over $150</span></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-10 py-4 lg:py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-light text-white/50">
          <span>© 2026 Luxe. All rights reserved.</span>
          <span>Visa · Mastercard · Amex · PayPal · Apple Pay</span>
        </div>
      </div>
    </footer>
  );
}
