"use client";

import React, { useRef, useState } from "react";

const panels = [
  { id: 1, title: "Story Panel 1", content: "Once upon a time in a strange world..." },
  { id: 2, title: "Story Panel 2", content: "The characters embarked on a journey..." },
  { id: 3, title: "Story Panel 3", content: "They faced many challenges along the way..." },
  { id: 4, title: "Story Panel 4", content: "And their adventure continues..." },
];

export default function StorySection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = x - startX;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !scrollRef.current) return;
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
    const walk = x - startX;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <section className="pt-8 pb-4 md:px-6 lg:px-8">
      {/* Desktop: 4 columns */}
      <div className="hidden lg:grid lg:grid-cols-4 gap-6">
        {panels.map(panel => (
          <div key={panel.id} className="bg-orange-400 p-6 rounded-lg min-h-[300px]"></div>
        ))}
      </div>

      {/* Tablet: 2x2 grid */}
      <div className="hidden md:grid lg:hidden md:grid-cols-2 gap-6">
        {panels.map(panel => (
          <div key={panel.id} className="bg-orange-400 p-6 rounded-lg min-h-[300px]"></div>
        ))}
      </div>

      {/* Mobile: Swipable carousel with visible slivers */}
      <div
        ref={scrollRef}
        className="md:hidden overflow-x-auto flex gap-4 snap-x snap-mandatory scrollbar-hide cursor-grab active:cursor-grabbing pl-4 pr-4"
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
        }}
      >
        {panels.map(panel => (
          <div
            key={panel.id}
            className="flex-none w-[85%] bg-orange-400 p-6 rounded-lg snap-center min-h-[300px]"
          ></div>
        ))}
      </div>
    </section>
  );
}
