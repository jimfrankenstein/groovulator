"use client";

import { useState, useEffect, useCallback, useMemo, memo } from "react";
import { motion, AnimatePresence, useAnimationControls, PanInfo } from "framer-motion";
import Image from "next/image";
import type { Card } from "../app/taxidermia/card-data";
import { getCardOrientation } from "../app/taxidermia/card-data";

interface CardCarouselProps {
  cards: Card[];
  initialCardNumber?: number;
  onCardChange?: (cardNumber: number) => void;
  revealAll?: boolean;
}

// Type for card state keys - supports both front cards (number) and back cards (string)
type CardStateKey = number | `${number}-back`;

const SpotifyIcon = () => (
  <svg
    width="100"
    height="100"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
  >
    <path
      d="M48.3373 0.0434464C76.3657 -1.10241 98.5209 20.5614 99.6111 47.9662C98.0081 46.616 97.3546 44.9475 96.4038 43.0852C92.7236 19.3343 69.104 0.406823 44.7969 3.90098C33.3212 5.55029 19.376 13.0379 12.5193 22.2468C4.85165 32.6241 1.70709 45.5932 3.78568 58.2686C4.90716 65.3546 7.68693 70.8203 11.1999 77.0346L10.4782 78.3339L10.4801 78.3349L11.2027 77.0346C20.471 90.6015 38.3008 97.6139 54.5406 97.2501C54.5925 97.2482 54.6448 97.2455 54.6967 97.2436C54.6441 97.2455 54.5914 97.2482 54.5387 97.2501C62.4579 95.623 69.3735 90.9379 77.7598 87.5594L77.7608 87.5584C93.4857 70.5057 97.0787 66.7771 96.4019 43.0852C97.3527 44.9476 98.0061 46.617 99.6092 47.9671C102.259 64.7463 91.049 82.329 77.7237 91.8456V91.8484C73.6625 94.0202 67.1839 97.6697 62.5164 97.888C41.0264 105.186 13.9496 92.8305 5.17941 72.2155L6.04763 72.1292L5.17656 72.2155C2.78846 69.2161 0.056177 56.6216 0.00624779 52.3669C-0.163652 37.8606 3.10521 27.1168 13.0448 16.4089C22.1151 6.51785 34.8272 0.623515 48.3373 0.0434464Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M48.2222 28.4177C60.4634 27.4713 71.1735 36.4703 72.1687 48.5394C73.1637 60.6087 64.0682 71.1973 51.8331 72.2127C39.5479 73.2323 28.758 64.2184 27.7589 52.1005C26.76 39.983 35.9318 29.3684 48.2222 28.4177ZM52.6404 55.306C50.1419 54.7807 47.419 54.6829 44.8673 54.7591C42.6704 54.9198 39.9031 54.824 38.0815 56.1503L37.654 57.0471C41.1827 59.8711 49.7543 56.4961 54.4092 58.7986C56.3056 59.7171 57.2206 60.4224 59.3539 60.2639L59.6538 59.3437C58.2996 57.2719 55.0365 55.81 52.6404 55.306ZM61.334 51.1492C56.1499 46.7376 45.9352 47.3564 39.4733 47.9624C38.1336 48.6208 37.2706 49.0714 36.5268 50.4259L36.8819 51.1745C46.2994 52.9665 50.5176 49.1292 60.323 54.8679L61.5949 54.9655L62.5459 54.0574C62.4327 52.7496 62.4227 52.0756 61.334 51.1492ZM61.0008 42.3591C56.1376 40.1101 48.8271 39.4369 43.4964 40.0485C41.1101 40.3898 38.2462 40.5226 36.1889 41.8309C35.4192 43.0642 35.3935 43.1038 35.6291 44.5308C41.31 46.5433 50.1348 42.5457 59.5386 46.2419C61.2343 47.0758 63.0006 48.2638 64.9469 47.7607L65.7761 46.8423C64.9476 44.5505 63.2087 43.3797 61.0008 42.3591Z"
      fill="currentColor"
    />
  </svg>
);

const AppleMusicIcon = () => (
  <svg
    width="100"
    height="100"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
  >
    <path
      d="M57.7174 33.8926C62.4243 33.3059 65.1516 35.566 68.7145 38.1647C65.9541 41.4736 63.0281 44.8504 63.2671 49.4336C63.5119 54.1146 66.8814 56.9078 70.1541 59.783C67.2456 65.5887 64.9917 69.738 59.1692 73.164C54.5078 71.9111 50.9955 70.7317 46.1691 71.9282C43.9551 72.7182 42.27 73.3747 40.0048 72.2999C35.0476 69.9488 32.0932 64.2619 30.3743 59.3523C28.3423 53.5471 27.8249 47.1222 30.6139 41.4651C32.071 38.514 34.3363 36.0011 37.5633 34.9459C41.684 33.5985 45.7085 34.8671 49.4023 36.7191C52.1285 35.5778 54.8832 34.7225 57.7174 33.8926Z"
      fill="currentColor"
    />
    <path
      d="M58.7999 23.4167C58.8966 24.3898 58.8279 25.2007 58.4978 26.131C57.183 29.8649 53.3864 32.3376 49.9829 33.9796C49.8806 33.7862 49.8806 33.7992 49.784 33.5677C49.1751 32.1854 49.482 30.42 50.0681 29.0764C51.5309 25.7107 54.8955 23.8418 58.1625 22.532L58.7999 23.4167Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M34.5072 2.4445C46.8183 -1.56139 60.2335 -0.616146 71.8445 5.07633C84.059 11.1203 93.0976 20.9895 97.4233 33.8916C101.453 45.9147 100.827 60.6567 95.0444 72.0368C91.5098 78.9941 83.7345 89.7246 75.914 92.2778L75.3732 91.9857L76.4832 90.762L75.9689 90.7386L76.0276 90.6169L76.021 90.6178L75.9632 90.7386H75.9689L76.4775 90.762L75.3676 91.9857L75.9083 92.2778C70.7288 97.617 57.6896 99.8412 50.5237 99.9917C44.2571 100.123 38.3033 98.6906 32.3669 96.8374L32.3716 96.8365C30.4652 96.4664 28.6551 95.6199 26.9251 94.7748C15.7141 89.3035 6.75981 78.5377 2.77162 66.8958C-1.29395 55.0269 -1.06136 39.4853 4.63257 28.1458C10.8343 16.0629 21.5471 6.84417 34.5072 2.4445ZM33.5289 96.8093C35.3948 96.8221 37.7573 97.0481 39.7889 97.0415C37.7565 97.0476 35.3939 96.8217 33.5289 96.8093ZM41.6839 96.9413C41.5427 96.9587 41.3972 96.9719 41.2483 96.9844C41.3952 96.972 41.5388 96.9594 41.6782 96.9423L41.6839 96.9413ZM57.4958 4.22153C46.9262 2.14924 35.9579 4.26876 26.9592 10.1218C15.5321 17.5871 7.35066 25.637 4.56343 39.3117C2.04435 51.6698 3.4532 64.5921 10.635 75.2688C14.9965 81.753 23.4245 89.91 30.4709 93.2618C33.7834 94.8363 37.5574 95.5923 41.1431 96.2962C41.6839 96.4021 42.2589 96.4389 42.7313 96.7391H42.7294C55.7263 97.5005 60.3712 96.037 72.4933 91.5325C72.4961 91.5317 72.4989 91.5306 72.5018 91.5297C98.2544 74.8634 103.308 46.9127 87.6735 21.7287C81.68 12.0707 68.1564 6.37602 57.4958 4.22153Z"
      fill="currentColor"
    />
  </svg>
);

const YoutubeMusicIcon = () => (
  <svg
    width="100"
    height="100"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M59.0653 0.828445C77.5241 4.23082 92.5272 17.6903 97.9039 35.6779C103.28 53.6653 98.13 73.1495 84.5665 86.1283C70.9972 99.1063 51.3089 103.391 33.5755 97.2235C34.2761 97.1462 34.9736 97.1076 35.6683 97.0982C34.9727 97.1073 34.2733 97.1452 33.5717 97.2225C19.3114 92.2614 8.05361 81.1201 2.94887 66.909L3.73886 66.9052C3.50056 66.9031 3.23995 66.905 2.94887 66.909C2.18401 64.7922 1.56575 62.6254 1.10117 60.4259C6.34162 60.0917 6.36413 63.6991 7.73499 68.1148L7.73688 68.1157C9.35729 73.2779 16.2409 81.8719 20.2805 85.5536C26.5864 91.3009 40.1382 96.0758 48.3477 97.719C47.7307 97.7702 47.1152 97.792 46.501 97.7925C47.1164 97.7921 47.7332 97.7713 48.3515 97.7199C80.7137 97.7772 104.725 63.1114 93.1611 32.8753C87.2915 17.519 74.8327 10.7837 60.8895 3.73649C60.8735 3.70996 59.2289 1.09358 59.0653 0.828445Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M32.8779 32.7322C40.8211 32.0868 61.138 31.0929 68.022 33.3756C69.9935 34.0283 71.2229 35.2962 72.118 37.1211C74.9392 42.8681 74.4641 56.2629 72.3 62.2422C71.3765 64.8028 69.7838 65.6669 67.4667 66.7705C59.8067 67.6079 41.1103 68.2258 33.9828 66.5482C31.745 66.0202 29.0084 64.9212 27.7788 62.8479C25.6656 59.278 25.9946 43.4607 27.0086 39.2802C27.8301 35.899 30.0622 34.4562 32.8779 32.7322ZM44.8729 56.9762C48.1928 55.5723 51.1897 53.9678 54.2491 52.0579L58.6458 49.5182C54.1757 46.7215 49.6374 44.0393 45.0313 41.4761L44.8729 56.9762Z"
      fill="currentColor"
    />
    <path
      d="M13.3554 15.9782C23.4686 5.0906 37.8939 -0.737055 52.7266 0.0748219C46.1886 0.087291 46.2505 0.374124 40.2565 2.78033C31.5542 6.27102 23.554 9.35776 17.0499 16.4586C7.53167 26.005 4.70942 36.6514 2.12589 49.5662C1.40073 53.1893 0.488576 52.5129 0.41488 56.4195C-1.49431 41.6855 3.24804 26.8657 13.3554 15.9782Z"
      fill="currentColor"
    />
  </svg>
);

const BandcampIcon = () => (
  <svg
    width="100"
    height="100"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
  >
    <path
      d="M96.3758 40.1296C98.2461 42.1159 98.9629 44.7433 99.8669 47.3082C99.9408 49.7877 100.128 52.5402 99.8612 55.3172C97.8427 76.133 81.8992 95.229 60.5599 98.3327H60.4398C37.9808 105.399 10.309 89.0573 3.24712 67.1816C5.20305 68.9763 7.18805 70.7415 9.20083 72.4775C11.6401 75.6374 16.1262 81.8175 18.9748 84.4187C25.0817 89.9984 41.8157 98.2408 50.1 98.1247C52.0214 97.4679 54.3346 97.6445 56.7217 96.8642C76.2301 90.4807 94.8571 75.0203 97.2226 53.7315C97.5921 50.4094 96.2281 44.3993 96.3758 40.1296Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.77888 20.5665C21.6344 3.23359 46.7838 -4.5375 66.5307 2.6986C75.0539 4.5801 85.1355 12.2721 90.1846 19.275C87.7568 18.017 85.3173 16.7943 82.8553 15.6089C82.6165 15.5238 81.5645 14.7982 81.2801 14.6099C69.6978 8.00434 62.9712 2.46882 48.9496 3.0088C33.4839 3.60461 25.7911 10.0073 15.1129 19.5337H15.111C9.0222 25.4905 5.08822 35.144 3.89992 43.45C3.89885 43.4525 3.8972 43.4549 3.89614 43.4575C3.00971 54.1357 3.01207 63.0845 9.20272 72.4775C7.18989 70.7414 5.20499 68.9754 3.24902 67.1807C2.39044 64.8753 1.1225 59.7623 0.968954 57.3752C0.969285 57.3728 0.968623 57.3701 0.968954 57.3677C0.912964 57.1768 0.862558 56.9837 0.823257 56.7895C-2.05382 43.9325 3.01266 31.2055 9.77888 20.5665ZM1.28873 50.7645L1.78259 56.5364C1.78278 56.5308 1.78239 56.5252 1.78259 56.5196L1.28968 50.7476C1.28949 50.7532 1.28891 50.7589 1.28873 50.7645Z"
      fill="currentColor"
    />
    <path
      d="M73.4096 39.4202L73.9782 40.079C66.5297 46.7684 59.5814 53.8866 52.258 60.6843C44.6161 61.0321 36.9168 60.7774 29.2748 60.5559C28.5415 60.6026 28.1661 60.4748 27.535 60.1051C28.6665 56.1663 44.1545 43.0405 48.1237 39.6273C56.2204 39.4238 64.3289 39.625 72.4314 39.3968L73.4096 39.4202Z"
      fill="currentColor"
    />
    <path
      d="M82.8544 15.6098C85.3164 16.7952 87.7567 18.017 90.1846 19.275C96.405 28.6047 99.3949 35.8716 99.8725 47.3082C98.9685 44.743 98.2521 42.115 96.3815 40.1287C96.1654 32.3711 87.9547 21.2324 82.8544 15.6098Z"
      fill="currentColor"
    />
  </svg>
);

const SPLASH_SVGS = [
  "/images/taxidermia/SVG/Pink Splash Tall.svg",
  "/images/taxidermia/SVG/Yellow Splash Tall.svg",
  "/images/taxidermia/SVG/Green Splash Tall.svg",
];

const ACTIVE_DOT_COLORS = [
  "var(--color-taxidermia-yellow)",
  "var(--color-taxidermia-blue)",
  "var(--color-taxidermia-pink)",
];

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
  revealAll = false,
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

    // Helper to check if a card is released
    const isCardReleased = (num: number) => {
      if (revealAll) return true;
      const card = cards[num - 1];
      return card ? new Date(card.releaseDate) <= new Date() : false;
    };

    // PRIORITY: Load current card back immediately (no delay) — only for released cards
    priorityBackRange.forEach(cardNum => {
      if (!isCardReleased(cardNum)) return;

      const backKey: CardStateKey = `${cardNum}-back`;

      // Mark as loading immediately to prevent race conditions
      setCardStates(prev => {
        if (prev.has(backKey)) return prev; // Already handled
        const next = new Map(prev);
        next.set(backKey, "loading");
        return next;
      });

      const img = new window.Image();
      img.src = `/images/taxidermia/cards-final/${getImagePrefix(cardNum)}-back.webp`;
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
      // Prefetch front images (mystery image for unreleased cards)
      prefetchRange.forEach(cardNum => {
        const img = new window.Image();
        img.src = isCardReleased(cardNum)
          ? `/images/taxidermia/cards-final/${getImagePrefix(cardNum)}-front.webp`
          : `/images/taxidermia/card-mystery/${String(cardNum).padStart(2, "0")}.webp`;
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

      // Prefetch adjacent back images (not current) — only for released cards
      prefetchBackRange.forEach(cardNum => {
        if (!isCardReleased(cardNum)) return;

        const img = new window.Image();
        img.src = `/images/taxidermia/cards-final/${getImagePrefix(cardNum)}-back.webp`;
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
  }, [currentIndex, cards.length, revealAll]);
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
      <div className="relative h-[520px] w-full">
        <div className="absolute inset-0 flex items-center justify-center overflow-visible">
          {visibleCards.map((card, arrayIndex) => {
            const actualIndex = startIndex + arrayIndex;
            const offset = actualIndex - currentIndex;
            const isDiscarded = actualIndex < currentIndex;

            const cardNum = cardIndexMap.get(card.id) ?? 0;
            const backKey: CardStateKey = `${cardNum}-back`;
            const released = revealAll || new Date(card.releaseDate) <= new Date();
            return (
              <Card
                key={card.id}
                cardNumber={cardNum}
                cardId={card.id}
                offset={offset}
                isActive={actualIndex === currentIndex}
                isDiscarded={isDiscarded}
                isReleased={released}
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

      {/* Listen box — only for released active cards, animates on card change */}
      <div className="relative z-30 flex justify-center mt-4" style={{ minHeight: 48 }}>
        <AnimatePresence mode="wait">
          {(() => {
            const activeCard = cards[currentIndex];
            const isReleased =
              activeCard && (revealAll || new Date(activeCard.releaseDate) <= new Date());
            if (!isReleased) return null;

            const splashSvg = SPLASH_SVGS[currentIndex % SPLASH_SVGS.length];
            const links = [
              {
                href: activeCard.spotifyId
                  ? `https://open.spotify.com/track/${activeCard.spotifyId}`
                  : "",
                label: "Spotify",
                icon: <SpotifyIcon />,
              },
              {
                href: activeCard.appleMusicLink ?? "",
                label: "Apple Music",
                icon: <AppleMusicIcon />,
              },
              {
                href: activeCard.youtubeMusicLink ?? "",
                label: "YouTube Music",
                icon: <YoutubeMusicIcon />,
              },
              { href: activeCard.bandcampLink ?? "", label: "Bandcamp", icon: <BandcampIcon /> },
            ];

            return (
              <motion.div
                key={currentIndex}
                className="relative flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.12 }}
              >
                <motion.img
                  src={splashSvg}
                  alt=""
                  aria-hidden="true"
                  draggable={false}
                  className="absolute pointer-events-none max-w-none"
                  style={{ left: "-82px", top: "-56px", width: "470px", height: "240px" }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 20 }}
                />
                <motion.span
                  className="relative italic text-black select-none mr-[19px]"
                  style={{ fontSize: "33px", lineHeight: "33px" }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 20, delay: 0.1 }}
                >
                  Listen
                </motion.span>
                <div className="relative flex gap-[14px]">
                  {links.map((link, i) => {
                    const hoverColor = ACTIVE_DOT_COLORS[currentIndex % ACTIVE_DOT_COLORS.length];
                    return (
                      <motion.a
                        key={link.label}
                        href={link.href || undefined}
                        target={link.href ? "_blank" : undefined}
                        rel={link.href ? "noopener noreferrer" : undefined}
                        aria-label={`Listen on ${link.label}`}
                        className="w-12 h-12 text-black transition-colors cursor-pointer hover:[color:var(--btn-hover)] active:opacity-80"
                        style={{ "--btn-hover": hoverColor } as React.CSSProperties}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 20,
                          delay: 0.15 + i * 0.07,
                        }}
                      >
                        {link.icon}
                      </motion.a>
                    );
                  })}
                </div>
              </motion.div>
            );
          })()}
        </AnimatePresence>
      </div>

      {/* Navigation controls */}
      <div className="relative z-30 flex items-center justify-center gap-4 mt-2 mb-6">
        <button
          onClick={goToPrevious}
          disabled={currentIndex === 0}
          className="w-10 h-10 flex items-center justify-center text-black dark:text-white disabled:cursor-not-allowed text-xl"
          aria-label="Previous card"
        >
          ←
        </button>

        <div className="flex items-center gap-1">
          {progressDots.map(index => {
            const isActive = index === currentIndex;
            const dotNum = String(index + 1).padStart(2, "0");
            const svgUrl = `/images/taxidermia/SVG/progress/${dotNum}.svg`;
            const activeDotColor = ACTIVE_DOT_COLORS[currentIndex % ACTIVE_DOT_COLORS.length];
            return (
              <motion.div
                key={index}
                className="relative flex items-center justify-center"
                animate={{
                  width: isActive ? 36 : 18,
                  height: isActive ? 36 : 18,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <div
                  className="absolute inset-0 transition-colors duration-200"
                  style={{
                    backgroundColor: isActive ? activeDotColor : "white",
                    WebkitMaskImage: `url('${svgUrl}')`,
                    WebkitMaskSize: "contain",
                    WebkitMaskRepeat: "no-repeat",
                    WebkitMaskPosition: "center",
                    maskImage: `url('${svgUrl}')`,
                    maskSize: "contain",
                    maskRepeat: "no-repeat",
                    maskPosition: "center",
                  }}
                />
                <img
                  src={svgUrl}
                  alt=""
                  aria-hidden="true"
                  draggable={false}
                  className="relative w-full h-full"
                  style={{
                    filter: "saturate(0) contrast(10)",
                    mixBlendMode: "multiply",
                  }}
                />
              </motion.div>
            );
          })}
        </div>

        <button
          onClick={goToNext}
          disabled={currentIndex === cards.length - 1}
          className="w-10 h-10 flex items-center justify-center text-black dark:text-white disabled:cursor-not-allowed text-xl"
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
        src="/images/taxidermia/cards-final/placeholder.webp"
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
  isReleased: boolean;
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
    isReleased,
    discardBasePosition,
    loadState,
    backLoadState,
    isFlipped,
    onDragEnd,
    onLoadStateChange,
    onToggleFlip,
  }: CardProps) {
    // Animation controls for shake effect on unreleased cards
    const shakeControls = useAnimationControls();
    const [isShaking, setIsShaking] = useState(false);

    const handleTap = useCallback(() => {
      if (isReleased) {
        onToggleFlip(cardNumber);
      } else if (!isShaking) {
        setIsShaking(true);
        shakeControls
          .start({
            x: [0, -8, 8, -6, 6, -3, 3, 0],
            transition: { duration: 0.4, ease: "easeInOut" },
          })
          .then(() => setIsShaking(false));
      }
    }, [isReleased, isShaking, cardNumber, onToggleFlip, shakeControls]);

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
        onTap={handleTap}
      >
        <motion.div
          className="relative w-full h-full rounded overflow-hidden bg-taxidermia-blue select-none border border-taxidermia-blue-dark"
          animate={shakeControls}
          style={{
            boxShadow:
              "0 10px 30px -5px rgba(0, 0, 0, 0.3), 0 5px 15px -5px rgba(0, 0, 0, 0.2), 0 2px 5px -2px rgba(0, 0, 0, 0.15)",
          }}
        >
          {loadState === "loaded" ? (
            <>
              {/* Front image (or mystery image if unreleased) */}
              <Image
                src={
                  isReleased
                    ? `/images/taxidermia/cards-final/${String(cardNumber).padStart(2, "0")}-${cardId}-front.webp`
                    : `/images/taxidermia/card-mystery/${String(cardNumber).padStart(2, "0")}.webp`
                }
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

              {/* Back image - only render if released and loaded or loading */}
              {isReleased && (backLoadState === "loaded" || backLoadState === "loading") && (
                <Image
                  src={`/images/taxidermia/cards-final/${String(cardNumber).padStart(2, "0")}-${cardId}-back.webp`}
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
        </motion.div>
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
      prevProps.isReleased === nextProps.isReleased &&
      prevProps.loadState === nextProps.loadState &&
      prevProps.backLoadState === nextProps.backLoadState &&
      prevProps.isFlipped === nextProps.isFlipped &&
      prevProps.discardBasePosition === nextProps.discardBasePosition
    );
  }
);

Card.displayName = "Card";
