import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/lib/products";

export const metadata = { title: "Journal — Luxe" };

export default function BlogPage() {
  return (
    <div className="bg-white min-h-[70vh]">
      <div className="bg-cream py-4 lg:py-5 text-center">
        <h1 className="display-serif text-3xl">The Journal</h1>
        <p className="eyebrow text-stone mt-3">
          <Link href="/" className="hover:opacity-60">Home</Link> / Blog
        </p>
      </div>

      <div className="mx-auto max-w-[1200px] px-5 lg:px-10 py-4 lg:py-5 grid md:grid-cols-3 gap-7">
        {blogPosts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
            <div className="relative aspect-[4/3] bg-linen overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
            </div>
            <p className="eyebrow text-stone mt-5">{post.date}</p>
            <h2 className="display-serif text-lg mt-2 leading-snug group-hover:opacity-60 transition-opacity">
              {post.title}
            </h2>
            <p className="text-sm font-light text-stone mt-3 leading-relaxed">
              {post.excerpt}
            </p>
            <span className="eyebrow link-underline inline-block mt-4">Read more</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
