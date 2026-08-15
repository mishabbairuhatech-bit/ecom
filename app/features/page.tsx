import Link from "next/link";

export const metadata = { title: "Theme Features — Luxe" };

const features = [
  { title: "Home", href: "/", text: "Hero, Just Landed, dual banners, product grid and statement section." },
  { title: "Shop", href: "/shop", text: "Fashion, electronics, accessories, home and beauty — with filters and sorting." },
  { title: "Product Detail", href: "/product/aria-wireless-headphones", text: "Gallery, size selector, quantity, add to cart, buy now, details accordion." },
  { title: "Cart", href: "/cart", text: "Free-shipping progress bar, quantity editing and order summary." },
  { title: "Checkout", href: "/checkout", text: "Contact, shipping address and card/PayPal payment screen." },
  { title: "Wishlist", href: "/wishlist", text: "Save favourites from any product card with the heart icon." },
  { title: "Search", href: "/search", text: "Live search across the full catalogue." },
  { title: "Journal", href: "/blog", text: "Editorial blog with article pages." },
  { title: "Account", href: "/account", text: "Sign in / register and order history." },
];

export default function FeaturesPage() {
  return (
    <div className="bg-white min-h-[70vh]">
      <div className="bg-cream py-4 lg:py-5 text-center">
        <h1 className="display-serif text-3xl">Theme Features</h1>
        <p className="eyebrow text-stone mt-3">
          <Link href="/" className="hover:opacity-60">Home</Link> / Features
        </p>
      </div>

      <div className="mx-auto max-w-[1200px] px-5 lg:px-10 py-4 lg:py-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f) => (
          <Link
            key={f.title}
            href={f.href}
            className="border border-sand p-8 hover:border-clay transition-colors group"
          >
            <h2 className="display-serif text-lg mb-3 group-hover:opacity-60 transition-opacity">
              {f.title}
            </h2>
            <p className="text-sm font-light text-stone leading-relaxed">{f.text}</p>
            <span className="eyebrow link-underline inline-block mt-5">View</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
