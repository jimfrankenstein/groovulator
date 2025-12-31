import React from "react";
import { notFound } from "next/navigation";
import Header from "../../../components/sandbox/Header";
import StorySection from "../../../components/sandbox/StorySection";
import CharacterSection from "../../../components/sandbox/CharacterSection";
import TextSection from "../../../components/sandbox/TextSection";
import CharacterCardSection from "../../../components/sandbox/CharacterCardSection";
import { characters, validSlugs } from "../../taxidermia/characters-data";

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
    title: character ? `${character.title} - Sandbox | Groovulator` : "Sandbox | Groovulator",
    description: character?.content || "Explore the sandbox characters",
  };
}
