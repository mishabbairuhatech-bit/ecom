"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useStore } from "@/context/StoreContext";

const navLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/features", label: "Theme Features" },
];

export default function Header() {
  const pathname = usePathname();
  const { cartCount, hydrated } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const cartBadge = hydrated && cartCount > 0 && (
    <span className="absolute -top-2 -right-2.5 bg-clay text-white text-[10px] w-4.5 h-4.5 min-w-[18px] min-h-[18px] rounded-full flex items-center justify-center">
      {cartCount}
    </span>
  );

  const mobileMenu = menuOpen && (
    <nav className="lg:hidden bg-white text-ink border-t border-black/5 px-5 py-6 flex flex-col gap-5">
      {navLinks.map((l) => (
        <Link key={l.href} href={l.href} className="eyebrow">
          {l.label}
        </Link>
      ))}
      <Link href="/account" className="eyebrow">
        Account
      </Link>
      <Link href="/wishlist" className="eyebrow">
        Wishlist
      </Link>
    </nav>
  );

  const menuButton = (
    <button
      aria-label="Menu"
      className="lg:hidden"
      onClick={() => setMenuOpen((v) => !v)}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        {menuOpen ? (
          <path d="M6 6l12 12M18 6L6 18" />
        ) : (
          <path d="M3 6h18M3 12h18M3 18h18" />
        )}
      </svg>
    </button>
  );

  // ── Shop/search screen — utility bar, left logo, search pill, promo strip ──
  if (pathname === "/shop" || pathname === "/search") {
    return (
      <>
        {/* Utility bar */}
        <div className="hidden md:block bg-[#f5f5f5] relative z-50">
          <div className="mx-auto max-w-[1400px] px-5 lg:px-10 h-9 flex items-center justify-end gap-4 text-xs text-ink">
            <Link href="/about" className="hover:opacity-60 transition-opacity">Help</Link>
            <span className="text-black/25">|</span>
            <Link href="/register" className="hover:opacity-60 transition-opacity">Sign Up</Link>
            <span className="text-black/25">|</span>
            <Link href="/login" className="hover:opacity-60 transition-opacity">Log In</Link>
          </div>
        </div>

        <header
          className={`${
            scrolled
              ? "fixed top-0 left-0 right-0 bg-white text-ink shadow-[0_1px_0_rgba(0,0,0,0.06)]"
              : "relative bg-white text-ink"
          } z-40 transition-colors duration-300`}
        >
          <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
            <div className="flex items-center justify-between h-16 gap-6">
              {/* Logo — left */}
              <div className="flex items-center gap-4">
                {menuButton}
                <Link
                  href="/"
                  className="text-4xl leading-none [font-family:var(--font-script)]"
                >
                  luxe
                </Link>
              </div>

              {/* Search + icons — right */}
              <div className="flex items-center gap-4">
                <form
                  action="/search"
                  className="hidden md:flex items-center h-10 rounded-full bg-[#f5f5f5] hover:bg-[#ececec] transition-colors pl-3.5 pr-4"
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="11" cy="11" r="7" />
                    <path d="M21 21l-4.35-4.35" />
                  </svg>
                  <input
                    name="q"
                    placeholder="Search"
                    className="bg-transparent outline-none text-sm px-2.5 w-32 lg:w-44 placeholder:text-stone"
                  />
                </form>
                <Link href="/search" aria-label="Search" className="md:hidden hover:opacity-60 transition-opacity">
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="11" cy="11" r="7" />
                    <path d="M21 21l-4.35-4.35" />
                  </svg>
                </Link>
                <Link href="/wishlist" aria-label="Wishlist" className="hover:opacity-60 transition-opacity">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 21s-7.5-4.9-9.9-9.2C.6 8.8 2.4 5 6 5c2.2 0 3.6 1.2 6 3.8C14.4 6.2 15.8 5 18 5c3.6 0 5.4 3.8 3.9 6.8C19.5 16.1 12 21 12 21Z" />
                  </svg>
                </Link>
                <Link href="/cart" aria-label="Cart" className="relative hover:opacity-60 transition-opacity">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M5 8h14l-1.2 12H6.2L5 8Z" />
                    <path d="M8.5 8V6.5a3.5 3.5 0 0 1 7 0V8" />
                  </svg>
                  {cartBadge}
                </Link>
              </div>
            </div>
          </div>

          {mobileMenu}
        </header>

        {/* Promo strip */}
        <div className="bg-clay text-white text-center eyebrow py-2.5 relative z-30">
          FREE SHIPPING on orders over $150
        </div>
      </>
    );
  }

  // ── All other pages — original header ──
  return (
    <>
      {/* Announcement bar */}
      <div className="bg-clay text-white text-center eyebrow py-2.5 relative z-50">
        FREE SHIPPING on orders over $150
      </div>

      {/* Solid header — the hero slides use light and dark backgrounds, so a
          transparent overlay would leave the nav unreadable on some of them. */}
      <header
        className={`${
          scrolled
            ? "fixed top-0 left-0 right-0 bg-white text-ink shadow-[0_1px_0_rgba(0,0,0,0.06)]"
            : "relative bg-white text-ink border-b border-black/5"
        } z-40 transition-colors duration-300`}
      >
        <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center h-16">
            {/* Left nav */}
            <nav className="hidden lg:flex items-center gap-7">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="eyebrow hover:opacity-60 transition-opacity"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
            <div className="lg:hidden justify-self-start">{menuButton}</div>

            {/* Logo */}
            <Link
              href="/"
              className="justify-self-center text-4xl leading-none [font-family:var(--font-script)]"
            >
              luxe
            </Link>

            {/* Icons */}
            <div className="flex items-center gap-5 justify-self-end">
              <Link href="/search" aria-label="Search" className="hover:opacity-60 transition-opacity">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="11" cy="11" r="7" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
              </Link>
              <Link href="/account" aria-label="Account" className="hidden sm:block hover:opacity-60 transition-opacity">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5" />
                </svg>
              </Link>
              <Link href="/cart" aria-label="Cart" className="relative hover:opacity-60 transition-opacity">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 8h14l-1.2 12H6.2L5 8Z" />
                  <path d="M8.5 8V6.5a3.5 3.5 0 0 1 7 0V8" />
                </svg>
                {cartBadge}
              </Link>
            </div>
          </div>
        </div>

        {mobileMenu}
      </header>
      {/* Spacer so fixed header doesn't jump content (only when scrolled) */}
    </>
  );
}
