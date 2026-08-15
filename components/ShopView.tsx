import Link from "next/link";
import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import ShopFilters from "@/components/ShopFilters";
import StickySidebar from "@/components/StickySidebar";

export type ShopParams = {
  category?: string;
  sort?: string;
  price?: string;
  stock?: string;
  sale?: string;
  q?: string;
};

const inBucket = (price: number, bucket: string) => {
  if (bucket === "under100") return price < 100;
  if (bucket === "100-500") return price >= 100 && price < 500;
  if (bucket === "500-2000") return price >= 500 && price < 2000;
  if (bucket === "over2000") return price >= 2000;
  return false;
};

/**
 * The full shop screen — filter sidebar, sort bar and product grid.
 * Used by /shop (browsing) and /search (same screen filtered by ?q=…).
 */
export default function ShopView({
  params,
  basePath,
}: {
  params: ShopParams;
  basePath: string;
}) {
  const {
    category = "all",
    sort,
    price: priceParam,
    stock: stockParam,
    sale: saleParam,
    q,
  } = params;

  const price = priceParam ? priceParam.split(",").filter(Boolean) : [];
  const stock = stockParam ? stockParam.split(",").filter(Boolean) : [];
  const sale = saleParam === "1";
  const query = q?.trim().toLowerCase() ?? "";

  let list = products.filter(
    (p) => category === "all" || p.category === category
  );
  if (query)
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.category.includes(query) ||
        p.description.toLowerCase().includes(query)
    );
  if (price.length)
    list = list.filter((p) => price.some((b) => inBucket(p.price, b)));
  if (stock.length)
    list = list.filter((p) => stock.includes(p.soldOut ? "out" : "in"));
  if (sale) list = list.filter((p) => p.compareAt !== undefined);

  if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
  if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);

  const sortQuery = (key?: string) => {
    const sp = new URLSearchParams();
    if (q) sp.set("q", q);
    if (category !== "all") sp.set("category", category);
    if (price.length) sp.set("price", price.join(","));
    if (stock.length) sp.set("stock", stock.join(","));
    if (sale) sp.set("sale", "1");
    if (key) sp.set("sort", key);
    const qs = sp.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10 py-4">
        {/* Nike-style listing: the page scrolls as one. The sidebar is sticky
            with its own internal scroll — once it reaches its end, the wheel
            chains into the page scroll and the product list continues. */}
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8 items-start">
          {/* Filter sidebar — scrolls with the page, pins once its end shows */}
          <StickySidebar className="lg:sticky">
            <ShopFilters
              category={category}
              price={price}
              stock={stock}
              sale={sale}
              sort={sort}
              basePath={basePath}
              q={q}
            />
          </StickySidebar>

          {/* Products */}
          <div>
            <div className="lg:sticky lg:top-16 z-20 bg-white flex flex-wrap items-center justify-between gap-5 mb-5 border-b border-black/5 pt-1 pb-4">
              <p className="eyebrow text-stone">
                {list.length} product{list.length === 1 ? "" : "s"}
                {query && (
                  <>
                    {" "}for <span className="text-ink">“{q}”</span>
                  </>
                )}
              </p>
              <div className="flex gap-5 items-center">
                <span className="eyebrow text-stone">Sort:</span>
                {[
                  { key: undefined, label: "Featured" },
                  { key: "price-asc", label: "Price ↑" },
                  { key: "price-desc", label: "Price ↓" },
                ].map((s) => (
                  <Link
                    key={s.label}
                    href={sortQuery(s.key)}
                    className={`eyebrow ${
                      sort === s.key || (!sort && !s.key)
                        ? "text-ink underline underline-offset-4"
                        : "text-stone hover:opacity-60"
                    }`}
                  >
                    {s.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-1.5 gap-y-7">
              {list.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
            {list.length === 0 && (
              <div className="text-center py-4 lg:py-5">
                <p className="text-stone font-light mb-6">
                  {query
                    ? `Nothing found for “${q}”. Try “shirt”, “watch”, “candle” or “headphones”.`
                    : "No products match these filters."}
                </p>
                <Link href="/shop" className="btn btn-dark">
                  Browse All
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
