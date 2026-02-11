import { redirect } from "next/navigation";
import type { Metadata } from "next";
import TaxidermiaCardPage from "./TaxidermiaCardPage";
import { cards, getCardNumberFromSlug } from "../card-data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function TaxidermiaSlugPage({ params }: PageProps) {
  const { slug } = await params;

  // Resolve slug to card number (handles both numeric and named slugs)
  const cardNumber = getCardNumberFromSlug(slug);

  if (!cardNumber) {
    // Invalid slug - redirect to first card
    redirect(`/taxidermia/${cards[0].id}`);
  }

  // Render card carousel at this card number
  return <TaxidermiaCardPage initialCardNumber={cardNumber} />;
}

export async function generateStaticParams() {
  return cards.map(card => ({
    slug: card.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  // Resolve slug to card number
  const cardNumber = getCardNumberFromSlug(slug);

  if (!cardNumber) {
    return {
      title: "Taxidermia | Groovulator",
      description: "Explore the Taxidermia trading card collection",
    };
  }

  const card = cards.find(c => c.cardNumber === cardNumber);
  return {
    title: card
      ? `Card ${cardNumber}: ${card.title} | Taxidermia`
      : "Taxidermia Cards | Groovulator",
    description: card?.description || "Explore the Taxidermia trading card collection",
  };
}
