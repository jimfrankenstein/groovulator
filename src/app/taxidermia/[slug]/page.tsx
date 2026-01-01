import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import TaxidermiaCharacterContent from "./TaxidermiaCharacterContent";
import TaxidermiaCardPage from "./TaxidermiaCardPage";
import { characters } from "../characters-data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function TaxidermiaSlugPage({ params }: PageProps) {
  const { slug } = await params;

  // Check if slug is a number (card index)
  const cardNumber = parseInt(slug, 10);

  if (!isNaN(cardNumber)) {
    // It's a card number - validate range
    if (cardNumber < 1 || cardNumber > characters.length) {
      redirect("/taxidermia/1");
    }

    // Render card carousel at this index
    return <TaxidermiaCardPage initialCardNumber={cardNumber} />;
  }

  // It's a character slug - find character
  const character = characters.find(c => c.id === slug);

  if (!character) {
    notFound();
  }

  return <TaxidermiaCharacterContent character={character} />;
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
  const cardNumber = parseInt(slug, 10);

  if (!isNaN(cardNumber)) {
    const character = characters[cardNumber - 1];
    return {
      title: character
        ? `Card ${cardNumber}: ${character.title} | Taxidermia`
        : "Taxidermia Cards | Groovulator",
      description: character?.description || "Explore the Taxidermia trading card collection",
    };
  }

  const character = characters.find(c => c.id === slug);
  return {
    title: character ? `${character.title} - Taxidermia | Groovulator` : "Taxidermia | Groovulator",
    description: character?.description || "Explore the world of Taxidermia characters",
  };
}
