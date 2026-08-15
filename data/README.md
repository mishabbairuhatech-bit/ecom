# Product feed import

Brings an external product catalog into the store.

## Usage

```bash
node scripts/import-feed.mjs data/your-feed.json
```

This validates and normalizes the feed, then writes `lib/products.imported.ts`.

To merge the imported products into the storefront, add two lines to
`lib/products.ts`:

```ts
import { importedProducts } from "./products.imported";

// ...after the hand-written `catalog` array:
export const products: Product[] = [...catalog, ...importedProducts];
```

Leave those lines out and the imported file is simply ignored, so you can
re-run the import without touching the live catalog.

## Feed format

A JSON array (or `{ "items": [...] }`) of objects. Only `sku`, `title`,
`price`, and `images` are required — see `feed.sample.json` for a full example
and `lib/feed.ts` for the typed contract.

| Field | Notes |
|---|---|
| `sku` | Unique id from the source (ASIN, SKU, variant id) |
| `title` / `brand` | Combined into the product name |
| `price` / `listPrice` | `listPrice` renders as a strikethrough when higher |
| `category` | Mapped onto store categories via `CATEGORY_MAP` in `lib/feed.ts` |
| `images` | Absolute URLs; the first becomes the card image |
| `bullets` | Shown in the Details & Care accordion |
| `variants` / `variantLabel` | e.g. `["128 GB","256 GB"]` with label `"Storage"` |
| `inStock` | `false` marks the product sold out |

Rows missing required fields, priced at zero, or duplicating an existing slug
are skipped and reported in the run summary.

## Where feeds come from

You must hold the rights to whatever you import. Image URLs are referenced
directly, so they have to be served from a host whose terms allow it.

- **Amazon Product Advertising API** — join the [Amazon Associates][assoc]
  program, then request PA API access. Map `ItemsResult.Items[]` into the feed
  shape: `ASIN` → `sku`, `ItemInfo.Title.DisplayValue` → `title`,
  `Offers.Listings[0].Price.Amount` → `price`, `Images.Primary.Large.URL` →
  `images[0]`. Attribution and the affiliate tag are required by their terms.
- **Supplier / distributor feeds** — most publish CSV or JSON under your
  reseller agreement.
- **Your own catalog** — photography you shot or licensed.

[assoc]: https://affiliate-program.amazon.in/

## Adding a new remote image host

`next.config.ts` allowlists image hosts. Add yours to `images.remotePatterns`
or Next.js will refuse to optimize them.
