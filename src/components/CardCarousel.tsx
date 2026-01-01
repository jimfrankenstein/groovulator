"use client";

import { useState, useEffect, useCallback, useMemo, memo } from "react";
import { motion, PanInfo } from "framer-motion";
import type { Character } from "../app/taxidermia/characters-data";

interface CardCarouselProps {
  cards: Character[];
  initialCardNumber?: number;
  onCardChange?: (cardNumber: number) => void;
}

const SWIPE_THRESHOLD = 50;
const DISCARD_SPACING = 80;
const BASE_RADIUS = 700;
const ANGLE_PER_CARD = 6;

export default function CardCarousel({
  cards,
  initialCardNumber = 1,
  onCardChange,
}: CardCarouselProps) {
  // Initialize from prop (cardNumber is 1-indexed, currentIndex is 0-indexed)
  const [currentIndex, setCurrentIndex] = useState(initialCardNumber - 1);
  const [isMobile, setIsMobile] = useState(false);

  // Notify parent when card changes (for share button tracking)
  useEffect(() => {
    onCardChange?.(currentIndex + 1);
  }, [currentIndex, onCardChange]);

  // Detect mobile using matchMedia API for better performance
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    setIsMobile(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Responsive visible range - fewer cards on mobile for better performance
  const visibleRange = useMemo(() => (isMobile ? 3 : 6), [isMobile]);
  const discardRange = useMemo(() => (isMobile ? 2 : 5), [isMobile]);

  // Responsive discard position - keep discarded cards visible on mobile without overlap
  // Mobile: -300px shows more of discard pile (~60-80px visible) with 14px safety margin
  // Desktop: -400px keeps proper spacing
  const discardBasePosition = useMemo(() => (isMobile ? -300 : -400), [isMobile]);

  // Create a card ID to index map for O(1) lookups
  const cardIndexMap = useMemo(() => {
    const map = new Map<string, number>();
    cards.forEach((card, index) => {
      map.set(card.id, index + 1);
    });
    return map;
  }, [cards]);

  const goToNext = useCallback(() => {
    setCurrentIndex(prev => Math.min(prev + 1, cards.length - 1));
  }, [cards.length]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  }, []);

  const handleDragEnd = useCallback(
    (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      const swipeDistance = info.offset.x;

      if (swipeDistance > SWIPE_THRESHOLD) {
        goToPrevious();
      } else if (swipeDistance < -SWIPE_THRESHOLD) {
        goToNext();
      }
    },
    [goToNext, goToPrevious]
  );

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        goToPrevious();
      } else if (event.key === "ArrowRight") {
        goToNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [goToNext, goToPrevious]);

  // Calculate which cards should be visible
  const startIndex = Math.max(0, currentIndex - discardRange);
  const endIndex = Math.min(cards.length, currentIndex + visibleRange + 1);
  const visibleCards = useMemo(
    () => cards.slice(startIndex, endIndex),
    [cards, startIndex, endIndex]
  );

  // Optimize progress indicators for mobile - show fewer dots
  const progressDots = useMemo(() => {
    if (isMobile && cards.length > 15) {
      // Show only 7 dots on mobile: 3 before, current, 3 after
      const start = Math.max(0, currentIndex - 3);
      const end = Math.min(cards.length, currentIndex + 4);
      return Array.from({ length: end - start }, (_, i) => start + i);
    }
    return Array.from({ length: cards.length }, (_, i) => i);
  }, [isMobile, cards.length, currentIndex]);

  return (
    <div className="relative w-full max-w-full overflow-hidden">
      {/* Card container */}
      <div className="relative h-[600px] w-full">
        <div className="absolute inset-0 flex items-center justify-center pt-4 overflow-visible">
          {visibleCards.map((card, arrayIndex) => {
            const actualIndex = startIndex + arrayIndex;
            const offset = actualIndex - currentIndex;
            const isDiscarded = actualIndex < currentIndex;

            return (
              <Card
                key={card.id}
                cardNumber={cardIndexMap.get(card.id) ?? 0}
                offset={offset}
                isActive={actualIndex === currentIndex}
                isDiscarded={isDiscarded}
                discardBasePosition={discardBasePosition}
                onDragEnd={handleDragEnd}
              />
            );
          })}
        </div>
      </div>

      {/* Navigation controls */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          onClick={goToPrevious}
          disabled={currentIndex === 0}
          className="w-10 h-10 flex items-center justify-center text-black dark:text-white opacity-50 hover:opacity-100 disabled:opacity-20 disabled:cursor-not-allowed transition-opacity text-xl"
          aria-label="Previous card"
        >
          ←
        </button>

        <div className="flex gap-1.5">
          {progressDots.map(index => (
            <div
              key={index}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index < currentIndex
                  ? "w-1.5 bg-pink-500/30 dark:bg-yellow-300/30"
                  : index === currentIndex
                    ? "w-8 bg-pink-500 dark:bg-yellow-300"
                    : "w-1.5 bg-black/10 dark:bg-white/10"
              }`}
            />
          ))}
        </div>

        <button
          onClick={goToNext}
          disabled={currentIndex === cards.length - 1}
          className="w-10 h-10 flex items-center justify-center text-black dark:text-white opacity-50 hover:opacity-100 disabled:opacity-20 disabled:cursor-not-allowed transition-opacity text-xl"
          aria-label="Next card"
        >
          →
        </button>
      </div>
    </div>
  );
}

interface CardProps {
  cardNumber: number;
  offset: number;
  isActive: boolean;
  isDiscarded: boolean;
  discardBasePosition: number;
  onDragEnd: (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
}

const Card = memo(
  function Card({
    cardNumber,
    offset,
    isActive,
    isDiscarded,
    discardBasePosition,
    onDragEnd,
  }: CardProps) {
    // Calculate position and rotation based on offset for natural card fan arrangement
    const absOffset = Math.abs(offset);

    let x, y, rotate, scale, zIndex;

    if (isDiscarded) {
      // Discarded cards stack up on the left with spacing
      x = offset * DISCARD_SPACING + discardBasePosition;
      y = Math.abs(offset) * 15; // Slight vertical stagger
      rotate = -15 + offset * 3; // Slight rotation for discarded pile
      scale = 0.85;
      // Keep the most recently discarded card (offset === -1) on top during transition
      zIndex = offset === -1 ? 25 : 5 + offset;
    } else {
      // Active and upcoming cards fan out naturally to the right following an arc
      const angle = offset * ANGLE_PER_CARD;
      const angleRad = (angle * Math.PI) / 180;

      x = Math.sin(angleRad) * BASE_RADIUS;
      // Create a natural downward arc - cards progressively lower as they go right
      y = offset > 0 ? Math.pow(offset, 1.5) * 20 : 0;
      rotate = angle;
      scale = isActive ? 1 : 0.92;
      zIndex = isActive ? 20 : 10 - absOffset;
    }

    // Calculate color gradation based on distance from center - memoized for performance
    const colors = useMemo(() => {
      const fadeAmount = absOffset * 0.15;

      // Light mode: interpolate toward white (255, 255, 255)
      const lightR = Math.min(255, Math.round(156 + (255 - 156) * fadeAmount * 2));
      const lightG = Math.min(255, Math.round(163 + (255 - 163) * fadeAmount * 2));
      const lightB = Math.min(255, Math.round(175 + (255 - 175) * fadeAmount * 2));
      const lightRGB = `${lightR}, ${lightG}, ${lightB}`;

      // Dark mode: darken toward black
      const lightnessDark = Math.max(0.2, 1 - fadeAmount);
      const darkRGB = `${Math.round(75 * lightnessDark)}, ${Math.round(85 * lightnessDark)}, ${Math.round(99 * lightnessDark)}`;

      return { lightRGB, darkRGB };
    }, [absOffset]);

    return (
      <motion.div
        layoutId={`card-${cardNumber}`}
        className="absolute cursor-grab active:cursor-grabbing select-none"
        style={{
          width: "320px",
          height: "450px",
          zIndex,
          willChange: "transform",
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
        }}
        initial={false}
        animate={{
          x,
          y,
          rotate,
          scale,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
        drag={isActive ? "x" : false}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={onDragEnd}
      >
        <div
          className="w-full h-full rounded-3xl shadow-lg md:shadow-2xl flex items-center justify-center"
          style={{
            backgroundColor: `rgb(${colors.lightRGB})`,
          }}
        >
          {/* Dark mode overlay - fully opaque, just darker color */}
          <div
            className="hidden dark:block absolute inset-0 rounded-3xl"
            style={{
              backgroundColor: `rgb(${colors.darkRGB})`,
            }}
          />
          <div className="text-8xl font-bold text-white relative z-10">{cardNumber}</div>
        </div>
      </motion.div>
    );
  },
  // Custom comparison to prevent unnecessary re-renders
  (prevProps, nextProps) =>
    prevProps.cardNumber === nextProps.cardNumber &&
    prevProps.offset === nextProps.offset &&
    prevProps.isActive === nextProps.isActive &&
    prevProps.isDiscarded === nextProps.isDiscarded &&
    prevProps.discardBasePosition === nextProps.discardBasePosition
);

Card.displayName = "Card";
