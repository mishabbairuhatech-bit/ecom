import Image from "next/image";
import Link from "next/link";

export const metadata = { title: "About — Luxe" };

export default function AboutPage() {
  return (
    <div className="bg-white">
      <div className="bg-cream py-4 lg:py-5 text-center">
        <h1 className="display-serif text-3xl">Our Story</h1>
        <p className="eyebrow text-stone mt-3">
          <Link href="/" className="hover:opacity-60">Home</Link> / About
        </p>
      </div>

      <section className="mx-auto max-w-[1200px] px-5 lg:px-10 py-4 lg:py-5 grid lg:grid-cols-2 gap-8 items-center">
        <div className="relative aspect-[4/5] bg-linen">
          <Image
            src="https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1200&auto=format&fit=crop"
            alt="Luxe atelier"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div>
          <h2 className="display-serif text-2xl mb-6">Luxurious Comfort, Considered</h2>
          <div className="space-y-5 text-sm font-light text-stone leading-relaxed">
            <p>
              Luxe began with a simple observation: the objects we live with every
              day — the shirt we reach for, the headphones on the commute, the
              candle lit at dusk — deserve the same care as the ones we save for
              occasions.
            </p>
            <p>
              So we curate across categories, not within one: fashion cut from
              European linen, electronics chosen for their restraint, leather
              goods that deepen with age, and pieces for the home that ask you to
              slow down.
            </p>
            <p>
              Everything is sourced in small batches from partner ateliers and
              independent makers. Good design should never come at the cost of
              the people who make it — or the planet it comes from.
            </p>
          </div>
          <Link href="/shop" className="btn btn-dark mt-8">
            Shop The Collection
          </Link>
        </div>
      </section>

      <section className="bg-cream py-4 lg:py-5">
        <div className="mx-auto max-w-[1200px] px-5 lg:px-10 grid sm:grid-cols-3 gap-10 text-center">
          {[
            { title: "Natural Fibres", text: "European flax linen, washed cotton and modal — nothing that doesn't breathe." },
            { title: "Small Batches", text: "Made-to-last pieces produced in limited runs by family-owned ateliers." },
            { title: "Free Returns", text: "30 days to decide, free exchanges, and free shipping over $150." },
          ].map((f) => (
            <div key={f.title}>
              <h3 className="display-serif text-lg mb-3">{f.title}</h3>
              <p className="text-sm font-light text-stone leading-relaxed">{f.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
