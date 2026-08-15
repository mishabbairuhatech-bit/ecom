import { notFound } from "next/navigation";
import { getProduct, products } from "@/lib/products";
import ProductDetail from "@/components/ProductDetail";
import ProductCard from "@/components/ProductCard";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = products
    .filter((p) => p.slug !== slug && p.category === product.category)
    .concat(products.filter((p) => p.slug !== slug && p.category !== product.category))
    .slice(0, 4);

  return (
    <div className="bg-white">
      <ProductDetail product={product} />

      <section className="mx-auto max-w-[1400px] px-5 lg:px-10 pb-4 lg:pb-5">
        <h2 className="display-serif text-2xl text-center mb-5">
          You May Also Like
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-1.5 gap-y-6">
          {related.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
