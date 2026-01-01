import { redirect } from "next/navigation";
import type { Metadata } from "next";
import TaxidermiaCardPage from "./TaxidermiaCardPage";
import { characters, getCardNumberFromSlug } from "../characters-data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function TaxidermiaSlugPage({ params }: PageProps) {
  const { slug } = await params;

  // Resolve slug to card number (handles both numeric and named slugs)
  const cardNumber = getCardNumberFromSlug(slug);

  if (!cardNumber) {
    // Invalid slug - redirect to card 1
    redirect("/taxidermia/1");
  }

  // Render card carousel at this card number
  return <TaxidermiaCardPage initialCardNumber={cardNumber} />;
}

export async function generateStaticParams() {
  return [
    // Generate paths for all character slugs
    ...characters.map(character => ({
      slug: character.id,
    })),
    // Generate paths for all card numbers
    ...Array.from({ length: characters.length }, (_, i) => ({
      slug: String(i + 1),
    })),
  ];
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

  const character = characters[cardNumber - 1];
  return {
    title: character
      ? `Card ${cardNumber}: ${character.title} | Taxidermia`
      : "Taxidermia Cards | Groovulator",
    description: character?.description || "Explore the Taxidermia trading card collection",
  };
}
