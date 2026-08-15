import ShopView, { type ShopParams } from "@/components/ShopView";

export const metadata = { title: "Search — Luxe" };

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<ShopParams>;
}) {
  const params = await searchParams;
  // Same screen as /shop, filtered by ?q=… so the two actions keep distinct URLs.
  return <ShopView params={params} basePath="/search" />;
}
