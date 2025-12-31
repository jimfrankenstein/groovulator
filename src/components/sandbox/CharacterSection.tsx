"use client";

import React, { useEffect } from "react";
import { characters } from "../../app/taxidermia/characters-data";
import CharacterCard from "./CharacterCard";
import { useCarouselDrag } from "./useCarouselDrag";

interface CharacterSectionProps {
  initialSlug?: string;
}

export default function CharacterSection({ initialSlug }: CharacterSectionProps) {
  const { scrollRef, handlers, handleCardClick } = useCarouselDrag();

  useEffect(() => {
    if (initialSlug && scrollRef.current) {
      const index = characters.findIndex(char => char.id === initialSlug);
      if (index !== -1) {
        const cardWidth = scrollRef.current.scrollWidth / characters.length;
        scrollRef.current.scrollLeft = cardWidth * index;
      }
    }
  }, [initialSlug, scrollRef]);

  return (
    <section className="relative py-4 px-4 md:px-6 lg:px-8">
      {/* One large green card container */}
      <div className="bg-green-600 rounded-lg p-6 overflow-visible">
        {/* Desktop: 4 columns */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-6">
          {characters.map(character => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>

        {/* Tablet: 2x2 grid */}
        <div className="hidden md:grid lg:hidden md:grid-cols-2 gap-6">
          {characters.map(character => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>

        {/* Mobile: Swipable carousel inside green card */}
        <div
          ref={scrollRef}
          className="md:hidden overflow-x-auto flex gap-4 snap-x snap-mandatory scrollbar-hide cursor-grab active:cursor-grabbing -mx-6 px-6"
          {...handlers}
        >
          {characters.map(character => (
            <CharacterCard
              key={character.id}
              character={character}
              onClick={handleCardClick}
              className="flex-none w-[85%] snap-center"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
