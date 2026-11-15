import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ListingDetail } from "@/components/marketplace/listing-detail";

export const metadata: Metadata = { title: "Listing" };

export default async function ListingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) notFound();
  return <ListingDetail id={id} />;
}
