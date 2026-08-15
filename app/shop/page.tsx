import ShopView, { type ShopParams } from "@/components/ShopView";

export const metadata = { title: "Shop — Luxe" };

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<ShopParams>;
}) {
  const params = await searchParams;
  // Browsing lives at /shop; searching at /search — same screen, distinct URLs.
  return <ShopView params={{ ...params, q: undefined }} basePath="/shop" />;
}
