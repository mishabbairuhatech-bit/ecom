import type { Product } from "@/lib/products";

/**
 * Shape of one item from an external product feed.
 *
 * This matches the common denominator of most licensed sources — the Amazon
 * Product Advertising API (ItemsResult.Items[]), Shopify's Admin API, and the
 * CSV/JSON feeds most distributors publish. Map your source into this shape in
 * `normalizeFeed` below and the rest of the store works unchanged.
 */
export type FeedItem = {
  /** Stable unique id from the source (ASIN, SKU, variant id). */
  sku: string;
  title: string;
  brand?: string;
  /** Current selling price, in major units (e.g. 129.99). */
  price: number;
  /** Was-price / MRP. Rendered as a strikethrough when higher than `price`. */
  listPrice?: number;
  /** Source category string — mapped via CATEGORY_MAP below. */
  category?: string;
  /** Absolute image URLs. The first is used as the card image. */
  images: string[];
  description?: string;
  /** Feature bullets — rendered in the Details & Care accordion. */
  bullets?: string[];
  /** Variant labels, e.g. ["S","M","L"] or ["128 GB","256 GB"]. */
  variants?: string[];
  /** Label shown above the variant picker, e.g. "Size" or "Storage". */
  variantLabel?: string;
  inStock?: boolean;
};

/** Maps arbitrary source category strings onto the store's own categories. */
const CATEGORY_MAP: Record<string, Product["category"]> = {
  apparel: "fashion",
  clothing: "fashion",
  fashion: "fashion",
  shoes: "fashion",
  electronics: "electronics",
  computers: "electronics",
  audio: "electronics",
  mobiles: "electronics",
  accessories: "accessories",
  bags: "accessories",
  watches: "accessories",
  jewellery: "accessories",
  home: "home",
  kitchen: "home",
  decor: "home",
  furniture: "furniture",
  realestate: "realestate",
  property: "realestate",
  beauty: "beauty",
  grooming: "beauty",
};

/** Turns "Sony WH-1000XM5 Wireless Headphones" into "sony-wh-1000xm5-wireless-headphones". */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

function resolveCategory(raw?: string): Product["category"] {
  if (!raw) return "home";
  const key = raw.toLowerCase().replace(/[^a-z]/g, "");
  return CATEGORY_MAP[key] ?? "home";
}

/**
 * Converts one feed item into a store Product.
 * Returns null when the item is unusable so a bad row can't break the build.
 */
export function toProduct(item: FeedItem): Product | null {
  if (!item.sku || !item.title || !item.images?.length) return null;
  if (!Number.isFinite(item.price) || item.price <= 0) return null;

  // Only treat listPrice as a discount when it is genuinely higher.
  const compareAt =
    item.listPrice && item.listPrice > item.price ? item.listPrice : undefined;

  return {
    slug: slugify(`${item.title}-${item.sku}`),
    name: item.brand ? `${item.brand} ${item.title}` : item.title,
    price: Number(item.price.toFixed(2)),
    compareAt: compareAt ? Number(compareAt.toFixed(2)) : undefined,
    soldOut: item.inStock === false,
    category: resolveCategory(item.category),
    images: item.images.filter((u) => /^https?:\/\//.test(u)),
    description: item.description?.trim() || item.title,
    details: item.bullets?.length ? item.bullets : ["See product page for full details"],
    sizes: item.variants?.length ? item.variants : ["One Size"],
    optionLabel: item.variantLabel,
  };
}

/** Maps a whole feed, dropping unusable rows and de-duplicating by slug. */
export function normalizeFeed(items: FeedItem[]): Product[] {
  const seen = new Set<string>();
  const out: Product[] = [];

  for (const item of items) {
    const product = toProduct(item);
    if (!product || seen.has(product.slug)) continue;
    seen.add(product.slug);
    out.push(product);
  }
  return out;
}
