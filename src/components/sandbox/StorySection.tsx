"use client";

import React from "react";
import { useCarouselDrag } from "./useCarouselDrag";

const PANEL_COUNT = 4;
const CARD_BASE_CLASSES = "bg-orange-400 p-6 rounded-lg min-h-[300px]";

export default function StorySection() {
  const { scrollRef, handlers } = useCarouselDrag();

  return (
    <section className="pt-8 pb-4 md:px-6 lg:px-8">
      {/* Desktop: 4 columns */}
      <div className="hidden lg:grid lg:grid-cols-4 gap-6">
        {Array.from({ length: PANEL_COUNT }, (_, i) => (
          <div key={i} className={CARD_BASE_CLASSES} />
        ))}
      </div>

      {/* Tablet: 2x2 grid */}
      <div className="hidden md:grid lg:hidden md:grid-cols-2 gap-6">
        {Array.from({ length: PANEL_COUNT }, (_, i) => (
          <div key={i} className={CARD_BASE_CLASSES} />
        ))}
      </div>

      {/* Mobile: Swipable carousel */}
      <div
        ref={scrollRef}
        className="md:hidden overflow-x-auto flex gap-4 snap-x snap-mandatory scrollbar-hide cursor-grab active:cursor-grabbing px-4"
        {...handlers}
      >
        {Array.from({ length: PANEL_COUNT }, (_, i) => (
          <div key={i} className={`flex-none w-[85%] ${CARD_BASE_CLASSES} snap-center`} />
        ))}
      </div>
    </section>
  );
}
