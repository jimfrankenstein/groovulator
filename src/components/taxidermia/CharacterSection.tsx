"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { characters } from "../../app/taxidermia/characters-data";

interface CharacterSectionProps {
  initialSlug?: string;
}

export default function CharacterSection({ initialSlug }: CharacterSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [hasDragged, setHasDragged] = useState(false);

  useEffect(() => {
    if (initialSlug && scrollRef.current) {
      const index = characters.findIndex(char => char.id === initialSlug);
      if (index !== -1) {
        const cardWidth = scrollRef.current.scrollWidth / characters.length;
        scrollRef.current.scrollLeft = cardWidth * index;
      }
    }
  }, [initialSlug]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setHasDragged(false);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = x - startX;
    if (Math.abs(walk) > 5) {
      setHasDragged(true);
    }
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
    // Reset hasDragged after a short delay to allow click to check it
    setTimeout(() => setHasDragged(false), 100);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setHasDragged(false);
    setStartX(e.touches[0].pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !scrollRef.current) return;
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
    const walk = x - startX;
    if (Math.abs(walk) > 5) {
      setHasDragged(true);
    }
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setTimeout(() => setHasDragged(false), 100);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    if (hasDragged) {
      e.preventDefault();
    }
  };

  return (
    <section className="relative py-4 px-4 md:px-6 lg:px-8">
      {/* One large green card container */}
      <div className="bg-green-600 rounded-lg p-6 overflow-visible">
        {/* Desktop: 4 columns */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-6">
          {characters.map(character => (
            <Link
              key={character.id}
              href={`/taxidermia/${character.id}`}
              scroll={false}
              className="p-6 rounded-lg min-h-[300px] border-2 border-dotted border-green-300 hover:border-green-200 transition-colors cursor-pointer"
            ></Link>
          ))}
        </div>

        {/* Tablet: 2x2 grid */}
        <div className="hidden md:grid lg:hidden md:grid-cols-2 gap-6">
          {characters.map(character => (
            <Link
              key={character.id}
              href={`/taxidermia/${character.id}`}
              scroll={false}
              className="p-6 rounded-lg min-h-[300px] border-2 border-dotted border-green-300 hover:border-green-200 transition-colors cursor-pointer"
            ></Link>
          ))}
        </div>

        {/* Mobile: Swipable carousel inside green card - extends to edges */}
        <div
          ref={scrollRef}
          className="md:hidden overflow-x-auto flex gap-4 snap-x snap-mandatory scrollbar-hide cursor-grab active:cursor-grabbing -mx-6"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            scrollBehavior: "smooth",
            paddingLeft: "1.5rem",
            paddingRight: "1.5rem",
          }}
        >
          {characters.map(character => (
            <Link
              key={character.id}
              href={`/taxidermia/${character.id}`}
              scroll={false}
              onClick={handleCardClick}
              className="flex-none w-[85%] p-6 rounded-lg snap-center min-h-[300px] border-2 border-dotted border-green-300 hover:border-green-200 transition-colors"
            ></Link>
          ))}
        </div>
      </div>
    </section>
  );
}
