import React from "react";
import { notFound } from "next/navigation";
import Header from "../../../components/taxidermia/Header";
import StorySection from "../../../components/taxidermia/StorySection";
import CharacterSection from "../../../components/taxidermia/CharacterSection";
import TextSection from "../../../components/taxidermia/TextSection";
import CharacterCardSection from "../../../components/taxidermia/CharacterCardSection";
import { characters, validSlugs } from "../characters-data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function CharacterPage({ params }: PageProps) {
  const { slug } = await params;

  // Check if slug is valid
  if (!validSlugs.includes(slug)) {
    notFound();
  }

  return (
    <div className="min-h-screen p-4 md:p-8 lg:p-8">
      {/* Blue card container with max width and centered */}
      <div
        className="max-w-[1280px] bg-cyan-500 rounded-lg overflow-visible"
        style={{ margin: "0 auto" }}
      >
        <Header />
        <div>
          <StorySection />
          <CharacterSection initialSlug={slug} />
          <TextSection />
          <CharacterCardSection characterSlug={slug} />
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return validSlugs.map(slug => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const character = characters.find(c => c.id === slug);

  return {
    title: character ? `${character.title} - Taxidermia | Groovulator` : "Taxidermia | Groovulator",
    description: character?.content || "Explore the world of Taxidermia characters",
  };
}
