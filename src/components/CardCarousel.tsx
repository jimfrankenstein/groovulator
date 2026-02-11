"use client";

import { useState, useEffect, useCallback, useMemo, memo } from "react";
import { motion, PanInfo } from "framer-motion";
import Image from "next/image";
import type { Card } from "../app/taxidermia/card-data";
import { getCardOrientation } from "../app/taxidermia/card-data";

interface CardCarouselProps {
  cards: Card[];
  initialCardNumber?: number;
  onCardChange?: (cardNumber: number) => void;
}

// Type for card state keys - supports both front cards (number) and back cards (string)
type CardStateKey = number | `${number}-back`;

const SWIPE_THRESHOLD = 50;
const DISCARD_SPACING = 80;
const BASE_RADIUS = 700;
const ANGLE_PER_CARD = 6;

// Flip animation timing constants
const FLIP_DURATION = 0.6; // seconds
const FLIP_SWAP_PERCENTAGE = 0.35; // swap at 35% (when card is at 90°)
const FLIP_SWAP_DELAY = FLIP_DURATION * FLIP_SWAP_PERCENTAGE * 1000; // 210ms

export default function CardCarousel({
  cards,
  initialCardNumber = 1,
  onCardChange,
}: CardCarouselProps) {
  // Initialize from prop (cardNumber is 1-indexed, currentIndex is 0-indexed)
  const [currentIndex, setCurrentIndex] = useState(initialCardNumber - 1);
  const [isMobile, setIsMobile] = useState(false);

  // Track which cards have loaded and their load states
  const [cardStates, setCardStates] = useState<Map<CardStateKey, "loading" | "loaded" | "error">>(
    new Map()
  );

  // Track which cards are flipped (showing back side)
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());

  // Notify parent when card changes (for share button tracking)
  useEffect(() => {
    onCardChange?.(currentIndex + 1);
  }, [currentIndex, onCardChange]);

  // Auto-reset: flip cards back to front when swiping away
  useEffect(() => {
    const activeCardNumber = currentIndex + 1;

    // Remove all flipped cards except the active one
    setFlippedCards(prev => {
      const next = new Set<number>();
      if (prev.has(activeCardNumber)) {
        next.add(activeCardNumber);
      }
      return next;
    });
  }, [currentIndex]);

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

  // Create a card number to ID map for image path lookups
  const cardNumberToId = useMemo(() => {
    const map = new Map<number, string>();
    cards.forEach((card, index) => {
      map.set(index + 1, card.id);
    });
    return map;
  }, [cards]);

  const goToNext = useCallback(() => {
    setCurrentIndex(prev => Math.min(prev + 1, cards.length - 1));
  }, [cards.length]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  }, []);

  const toggleFlip = useCallback(
    (cardNumber: number) => {
      // Only allow flipping the active card
      const activeCardNumber = currentIndex + 1;
      if (cardNumber !== activeCardNumber) return;

      setFlippedCards(prev => {
        const next = new Set(prev);
        if (next.has(cardNumber)) {
          next.delete(cardNumber);
        } else {
          next.add(cardNumber);
        }
        return next;
      });
    },
    [currentIndex]
  );

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

  // Smart prefetching: Load adjacent cards (fronts and backs)
  useEffect(() => {
    const prefetchRange: number[] = [];
    const prefetchBackRange: number[] = [];
    const priorityBackRange: number[] = []; // HIGH PRIORITY: Current card back

    // Forward-biased: -3 to +4 from current index
    for (let i = currentIndex - 3; i <= currentIndex + 4; i++) {
      const cardNum = i + 1; // Convert to 1-indexed
      if (cardNum >= 1 && cardNum <= cards.length && !cardStates.has(cardNum)) {
        prefetchRange.push(cardNum);
      }
    }

    // Prefetch backs for adjacent cards (current - 1, current, current + 1)
    for (let i = currentIndex - 1; i <= currentIndex + 1; i++) {
      const cardNum = i + 1; // Convert to 1-indexed
      const backKey: CardStateKey = `${cardNum}-back`;
      if (cardNum >= 1 && cardNum <= cards.length && !cardStates.has(backKey)) {
        // Current card back is priority
        if (i === currentIndex) {
          priorityBackRange.push(cardNum);
        } else {
          prefetchBackRange.push(cardNum);
        }
      }
    }

    // Helper to build image path prefix from card number
    const getImagePrefix = (num: number) =>
      `${String(num).padStart(2, "0")}-${cardNumberToId.get(num) ?? "unknown"}`;

    // PRIORITY: Load current card back immediately (no delay)
    priorityBackRange.forEach(cardNum => {
      const backKey: CardStateKey = `${cardNum}-back`;

      // Mark as loading immediately to prevent race conditions
      setCardStates(prev => {
        if (prev.has(backKey)) return prev; // Already handled
        const next = new Map(prev);
        next.set(backKey, "loading");
        return next;
      });

      const img = new window.Image();
      img.src = `/images/groovulator/taxidermia/cards-final/${getImagePrefix(cardNum)}-back.webp`;
      img.onload = () => {
        setCardStates(prev => {
          const next = new Map(prev);
          next.set(backKey, "loaded");
          return next;
        });
      };
      img.onerror = () => {
        setCardStates(prev => {
          const next = new Map(prev);
          next.set(backKey, "error");
          return next;
        });
      };
    });

    if (prefetchRange.length === 0 && prefetchBackRange.length === 0) return;

    // Prefetch other images on idle to avoid blocking animations
    const prefetchImages = () => {
      // Prefetch front images
      prefetchRange.forEach(cardNum => {
        const img = new window.Image();
        img.src = `/images/groovulator/taxidermia/cards-final/${getImagePrefix(cardNum)}-front.webp`;
        img.onload = () => {
          setCardStates(prev => {
            const next = new Map(prev);
            next.set(cardNum, "loaded");
            return next;
          });
        };
        img.onerror = () => {
          setCardStates(prev => {
            const next = new Map(prev);
            next.set(cardNum, "error");
            return next;
          });
        };
      });

      // Prefetch adjacent back images (not current)
      prefetchBackRange.forEach(cardNum => {
        const img = new window.Image();
        img.src = `/images/groovulator/taxidermia/cards-final/${getImagePrefix(cardNum)}-back.webp`;
        const backKey: CardStateKey = `${cardNum}-back`;
        img.onload = () => {
          setCardStates(prev => {
            const next = new Map(prev);
            next.set(backKey, "loaded");
            return next;
          });
        };
        img.onerror = () => {
          setCardStates(prev => {
            const next = new Map(prev);
            next.set(backKey, "error");
            return next;
          });
        };
      });
    };

    // Use requestIdleCallback if available, otherwise fallback to setTimeout
    if ("requestIdleCallback" in window) {
      const idleCallbackId = requestIdleCallback(prefetchImages);
      return () => cancelIdleCallback(idleCallbackId);
    } else {
      const timer = setTimeout(prefetchImages, 100);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, cards.length]);
  // Note: cardStates intentionally omitted - only prefetch on navigation, not on every image load

  // Callback for when card load state changes
  const handleLoadStateChange = useCallback((cardNumber: number, state: "loaded" | "error") => {
    setCardStates(prev => {
      const next = new Map(prev);
      next.set(cardNumber, state);
      return next;
    });
  }, []);

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

            const cardNum = cardIndexMap.get(card.id) ?? 0;
            const backKey: CardStateKey = `${cardNum}-back`;
            return (
              <Card
                key={card.id}
                cardNumber={cardNum}
                cardId={card.id}
                offset={offset}
                isActive={actualIndex === currentIndex}
                isDiscarded={isDiscarded}
                discardBasePosition={discardBasePosition}
                loadState={cardStates.get(cardNum)}
                backLoadState={cardStates.get(backKey)}
                isFlipped={flippedCards.has(cardNum)}
                onDragEnd={handleDragEnd}
                onLoadStateChange={handleLoadStateChange}
                onToggleFlip={toggleFlip}
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

// Simple loading spinner component
function Spinner() {
  return (
    <div
      className="w-12 h-12 border-4 border-gray-300 dark:border-gray-700 
                    border-t-gray-600 dark:border-t-gray-400 rounded-full 
                    animate-spin"
    />
  );
}

// Placeholder card shown while image loads
function PlaceholderCard({ opacity }: { opacity: number }) {
  return (
    <div
      className="relative w-full h-full rounded bg-gray-100 dark:bg-gray-900 
                 flex items-center justify-center"
      style={{
        opacity,
        transition: "opacity 0.3s ease-out",
      }}
    >
      <Image
        src="/images/groovulator/taxidermia/cards-final/placeholder.webp"
        alt="Loading card"
        width={640}
        height={896}
        className="object-cover w-full h-full"
        draggable={false}
      />
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <Spinner />
      </div>
    </div>
  );
}

interface CardProps {
  cardNumber: number;
  cardId: string;
  offset: number;
  isActive: boolean;
  isDiscarded: boolean;
  discardBasePosition: number;
  loadState: "loading" | "loaded" | "error" | undefined;
  backLoadState: "loading" | "loaded" | "error" | undefined;
  isFlipped: boolean;
  onDragEnd: (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
  onLoadStateChange: (cardNumber: number, state: "loaded" | "error") => void;
  onToggleFlip: (cardNumber: number) => void;
}

const Card = memo(
  function Card({
    cardNumber,
    cardId,
    offset,
    isActive,
    isDiscarded,
    discardBasePosition,
    loadState,
    backLoadState,
    isFlipped,
    onDragEnd,
    onLoadStateChange,
    onToggleFlip,
  }: CardProps) {
    // Track which side should be visible with a delay for smooth flip
    const [showBack, setShowBack] = useState(isFlipped);

    // Update visibility when flip state changes, with timing to match animation
    useEffect(() => {
      if (isFlipped && !showBack) {
        // Flip to back: show back at 35% of animation duration (when card is at 90°)
        const timer = setTimeout(() => setShowBack(true), FLIP_SWAP_DELAY);
        return () => clearTimeout(timer);
      } else if (!isFlipped && showBack) {
        // Flip to front: show front at 35% of animation duration
        const timer = setTimeout(() => setShowBack(false), FLIP_SWAP_DELAY);
        return () => clearTimeout(timer);
      }
    }, [isFlipped, showBack]);

    // Calculate position and rotation based on offset for natural card fan arrangement
    const absOffset = Math.abs(offset);
    const isLandscape = getCardOrientation(cardNumber) === "landscape";

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

    // Add 90° rotation for landscape cards when flipped
    let rotateZ = rotate;
    if (isLandscape && isFlipped) {
      rotateZ = rotate - 90;
    }

    const flippedScale = scale;

    // Calculate image opacity for dimming effect
    const imageOpacity = Math.max(0.3, 1 - absOffset * 0.15);

    return (
      <motion.div
        className="absolute cursor-grab active:cursor-grabbing select-none"
        style={{
          width: "320px",
          height: "448px",
          zIndex,
          willChange: "transform",
          transformStyle: "preserve-3d",
          contain: "layout style paint",
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
          perspective: 1000,
        }}
        initial={false}
        animate={{
          x,
          y: isFlipped ? y - 15 : y,
          rotate: rotateZ,
          rotateY: isFlipped ? 180 : 0,
          rotateX: isFlipped ? 3 : 0,
          scale: flippedScale,
        }}
        transition={{
          type: "tween",
          duration: FLIP_DURATION,
          ease: [0.4, 0, 0.2, 1],
        }}
        drag={isActive ? "x" : false}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={onDragEnd}
        onTap={() => onToggleFlip(cardNumber)}
      >
        <div
          className="relative w-full h-full rounded overflow-hidden bg-white dark:bg-black select-none border border-black/10 dark:border-white/10"
          style={{
            boxShadow:
              "0 10px 30px -5px rgba(0, 0, 0, 0.3), 0 5px 15px -5px rgba(0, 0, 0, 0.2), 0 2px 5px -2px rgba(0, 0, 0, 0.15)",
          }}
        >
          {loadState === "loaded" ? (
            <>
              {/* Front image */}
              <Image
                src={`/images/groovulator/taxidermia/cards-final/${String(cardNumber).padStart(2, "0")}-${cardId}-front.webp`}
                alt={`Card ${cardNumber}`}
                width={640}
                height={896}
                sizes="(max-width: 768px) 320px, 640px"
                quality={85}
                priority={isActive || Math.abs(offset) <= 1}
                className="object-cover w-full h-full"
                style={{
                  position: "absolute",
                  inset: 0,
                  opacity: showBack ? 0 : imageOpacity,
                  transition: isActive ? "none" : "opacity 0.3s ease-out",
                  imageRendering: "crisp-edges",
                  WebkitFontSmoothing: "antialiased",
                  pointerEvents: showBack ? "none" : "auto",
                }}
                draggable={false}
                onError={() => onLoadStateChange(cardNumber, "error")}
              />

              {/* Back image - only render if loaded or loading */}
              {(backLoadState === "loaded" || backLoadState === "loading") && (
                <Image
                  src={`/images/groovulator/taxidermia/cards-final/${String(cardNumber).padStart(2, "0")}-${cardId}-back.webp`}
                  alt={`Card ${cardNumber} back`}
                  width={640}
                  height={896}
                  sizes="(max-width: 768px) 320px, 640px"
                  quality={85}
                  priority={isActive || Math.abs(offset) <= 1}
                  className="object-cover w-full h-full"
                  style={{
                    position: "absolute",
                    inset: 0,
                    opacity: showBack ? imageOpacity : 0,
                    transition: isActive ? "none" : "opacity 0.3s ease-out",
                    transform: "scaleX(-1)",
                    imageRendering: "crisp-edges",
                    WebkitFontSmoothing: "antialiased",
                    pointerEvents: showBack ? "auto" : "none",
                  }}
                  draggable={false}
                />
              )}
            </>
          ) : loadState === "error" ? (
            <div
              className="flex items-center justify-center h-full"
              style={{
                opacity: imageOpacity,
                transition: "opacity 0.3s ease-out",
              }}
            >
              <div className="text-2xl font-bold text-gray-700 text-center px-4">
                Error loading card
              </div>
            </div>
          ) : (
            <PlaceholderCard opacity={imageOpacity} />
          )}
        </div>
      </motion.div>
    );
  },
  (prevProps, nextProps) => {
    // Custom comparison to prevent unnecessary re-renders
    // NOTE: Parent must memoize callbacks (onDragEnd, onLoadStateChange, onToggleFlip)
    // to prevent re-renders due to callback reference changes
    return (
      prevProps.cardNumber === nextProps.cardNumber &&
      prevProps.cardId === nextProps.cardId &&
      prevProps.offset === nextProps.offset &&
      prevProps.isActive === nextProps.isActive &&
      prevProps.isDiscarded === nextProps.isDiscarded &&
      prevProps.loadState === nextProps.loadState &&
      prevProps.backLoadState === nextProps.backLoadState &&
      prevProps.isFlipped === nextProps.isFlipped &&
      prevProps.discardBasePosition === nextProps.discardBasePosition
    );
  }
);

Card.displayName = "Card";
