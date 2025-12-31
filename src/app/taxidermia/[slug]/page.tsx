import { notFound } from "next/navigation";
import type { Metadata } from "next";
import TaxidermiaCharacterContent from "./TaxidermiaCharacterContent";
import { characters } from "../characters-data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function TaxidermiaCharacterPage({ params }: PageProps) {
  const { slug } = await params;
  const character = characters.find(c => c.id === slug);

  if (!character) {
    notFound();
  }

  return <TaxidermiaCharacterContent character={character} />;
}

export async function generateStaticParams() {
  return characters.map(character => ({
    slug: character.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const character = characters.find(c => c.id === slug);

  return {
    title: character ? `${character.title} - Taxidermia | Groovulator` : "Taxidermia | Groovulator",
    description: character?.description || "Explore the world of Taxidermia characters",
  };
}
