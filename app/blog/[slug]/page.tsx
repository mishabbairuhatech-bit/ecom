import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts } from "@/lib/products";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <article className="bg-white min-h-[70vh]">
      <div className="relative h-[45vh] min-h-[320px]">
        <Image src={post.image} alt={post.title} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex items-center justify-center px-5 text-center">
          <div className="text-white max-w-2xl">
            <p className="eyebrow mb-4">{post.date}</p>
            <h1 className="display-serif text-3xl md:text-4xl leading-snug">{post.title}</h1>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-5 py-4 lg:py-5 space-y-4 text-[15px] font-light text-stone leading-relaxed">
        {post.body.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
        <div className="pt-8 text-center">
          <Link href="/shop" className="btn btn-dark">Shop The Collection</Link>
        </div>
        <div className="text-center pt-2">
          <Link href="/blog" className="eyebrow link-underline text-ink">← Back to Journal</Link>
        </div>
      </div>
    </article>
  );
}
