"use client";

import { useState, useEffect, useCallback, useMemo, memo } from "react";
import { motion, AnimatePresence, useAnimationControls, PanInfo } from "framer-motion";
import Image from "next/image";
import { SpotifyLogo, AppleLogo, YoutubeLogo, AmazonLogo } from "@phosphor-icons/react";
import type { Card } from "../app/taxidermia/card-data";
import { getCardOrientation } from "../app/taxidermia/card-data";

declare global {
  interface Window {
    fbq: (action: string, eventName: string) => void;
  }
}

interface CardCarouselProps {
  cards: Card[];
  initialCardNumber?: number;
  onCardChange?: (cardNumber: number) => void;
  revealAll?: boolean;
}

// Type for card state keys - supports both front cards (number) and back cards (string)
type CardStateKey = number | `${number}-back`;

const LeftArrowSvg = () => (
  <svg viewBox="0 0 75 75" fill="none" className="w-7 h-7">
    <path
      d="M30.4852 16.9558C30.9584 16.8954 31.9372 17.4324 32.1762 18.0552C32.1797 18.2926 32.1146 18.6134 32.0822 18.6989C32.0378 18.8043 31.9866 18.8833 31.9845 18.8868C31.9699 18.9101 31.9569 18.9291 31.9502 18.9388C31.9265 18.9733 31.8997 19.0083 31.8842 19.029C31.7444 19.2146 31.2793 19.8066 30.4255 20.8837C29.0109 22.6683 27.6938 24.6094 26.4252 26.7464C26.3614 27.3489 26.1578 28.0549 25.9085 28.7586C25.6353 29.5297 25.2724 30.4003 24.8662 31.3041C24.0532 33.1126 23.0353 35.1272 22.1431 36.871C21.8422 37.459 21.5586 38.011 21.3014 38.5137C22.0849 38.468 23.073 38.4138 24.22 38.355C24.3574 38.2252 24.4918 38.1528 24.5577 38.1189C24.7523 38.0188 24.9531 37.9686 25.0681 37.9424C25.2078 37.9106 25.3636 37.8842 25.5226 37.8612C25.8419 37.8149 26.2482 37.7724 26.721 37.7317C27.6704 37.6501 28.9679 37.5681 30.5436 37.4765C39.2101 36.9729 46.6208 36.594 51.7562 36.3593C54.3221 36.2421 56.3245 36.1608 57.6328 36.1181C58.2834 36.0969 58.776 36.0842 59.0813 36.0826C59.2116 36.0819 59.3725 36.0829 59.4927 36.094C59.5159 36.0961 59.6127 36.1042 59.725 36.1334C59.7545 36.141 59.9483 36.1884 60.1503 36.3301C60.2207 36.3796 60.3455 36.482 60.4613 36.645C60.8263 36.6439 61.1649 36.6483 61.4744 36.6615C61.4917 36.6623 61.5402 36.6659 61.5709 36.6691C61.647 36.6805 62.0788 36.8385 62.3796 37.0804C62.7079 38.1581 61.913 39.1644 61.7461 39.2196C61.6973 39.2311 61.6257 39.2451 61.6014 39.2488C61.5498 39.256 61.4996 39.2598 61.4935 39.2602C61.4589 39.2627 61.4108 39.2651 61.3602 39.2678C61.2538 39.2736 61.0916 39.2819 60.8815 39.2919C60.4589 39.3121 59.8281 39.3412 59.028 39.377C57.9939 39.4233 56.6732 39.48 55.1471 39.5471C53.2235 39.7166 51.0058 39.9505 48.5468 40.2377C48.1136 40.2883 47.6731 40.3403 47.2265 40.3939C47.6912 40.4439 48.1275 40.4941 48.529 40.5412C48.656 40.5561 48.7803 40.5722 48.901 40.5869C49.0786 40.5871 49.2205 40.5867 49.3225 40.5907C49.3402 40.5914 49.5165 40.5953 49.6817 40.6351C49.7156 40.6433 49.7739 40.6584 49.843 40.6846C49.8607 40.6914 49.8885 40.7044 49.9229 40.7202C50.1206 40.748 50.3029 40.7724 50.4663 40.7989C50.7119 40.8387 50.9376 40.8798 51.1227 40.9233C51.2142 40.9448 51.3161 40.9728 51.4146 41.0058C51.466 41.0231 51.5852 41.063 51.7193 41.1378L51.8564 41.2242L51.9339 41.2838C52.0275 41.361 52.1615 41.4928 52.2665 41.6888C52.4429 42.0185 52.4994 42.4725 52.2843 42.9025C52.1146 43.2415 51.8515 43.4067 51.7473 43.4662C51.622 43.5375 51.5082 43.5762 51.4438 43.5957C51.2224 43.6626 50.9748 43.6805 50.8332 43.6896C50.4807 43.7121 49.9705 43.7153 49.3809 43.7086C48.1869 43.6952 46.4806 43.6419 44.6519 43.5969C43.9712 43.5802 43.2747 43.5671 42.5787 43.555C40.5415 43.6375 38.4375 43.7162 36.8709 43.7645C36.0426 43.79 35.3557 43.808 34.9082 43.814C34.694 43.8169 34.5044 43.8175 34.3801 43.8127C34.3484 43.8115 34.2996 43.8091 34.248 43.8039C34.2234 43.8014 34.1767 43.7954 34.1211 43.7848C34.1074 43.7824 33.9157 43.7508 33.7123 43.635C33.6598 43.6051 33.4727 43.4949 33.3099 43.2745C31.548 43.2846 29.8524 43.2956 28.2508 43.3024C28.1733 43.6808 27.949 43.9196 27.8318 44.0222C27.591 44.2331 27.329 44.3001 27.3062 44.3066C27.1626 44.3482 27.0177 44.3674 26.9394 44.3764C26.5797 44.4179 25.9192 44.4418 25.0668 44.4526C24.9363 44.4542 24.8 44.4529 24.658 44.4539C25.2223 44.7579 25.7876 45.0517 26.3465 45.3349C28.2295 46.2892 30.144 47.1919 31.4322 48.0657C31.6295 48.1995 31.8031 48.3231 31.9337 48.4288C31.992 48.476 32.0881 48.5564 32.1774 48.656C32.2173 48.7005 32.3098 48.8077 32.3882 48.962C32.432 49.0482 32.6141 49.4246 32.4897 49.8938C32.5694 49.9834 32.6489 50.0819 32.7157 50.1909C32.7989 50.3268 32.922 50.5667 32.948 50.8815C32.9781 51.2462 32.869 51.635 32.5938 51.9441C32.568 51.9731 32.5406 51.9997 32.5139 52.0253C33.3951 52.6122 34.2792 53.1859 35.1494 53.7329C36.1375 54.3414 36.8929 54.7897 37.3482 55.0748C37.5823 55.2213 37.797 55.3618 37.969 55.4937C38.097 55.5918 38.3963 55.8237 38.5708 56.1907C38.8786 56.839 38.6032 57.6154 37.9551 57.9236C37.3925 58.1908 36.7338 58.0178 36.3682 57.544C36.2974 57.4915 36.1755 57.4084 35.9683 57.2787C35.5016 56.9866 34.8504 56.6025 33.7859 55.9469L33.7758 55.9406C30.2306 53.713 26.4181 51.0295 23.457 48.7258C22.1118 47.967 20.7181 47.1699 19.4428 46.4229C18.0337 45.5976 16.7137 44.8015 15.7649 44.1847C15.6763 44.1665 15.5733 44.1392 15.4729 44.0997C15.4129 44.0759 15.3048 44.0292 15.1873 43.9473C15.1003 43.8866 14.9276 43.7498 14.7938 43.5144C14.7235 43.4616 14.6579 43.4154 14.6021 43.3697C14.5063 43.2912 14.3819 43.1842 14.2732 43.0599C14.2216 43.0008 14.1309 42.8889 14.0536 42.7375C13.9945 42.6215 13.8173 42.2415 13.9508 41.7599C14.1139 41.1726 14.5831 40.9246 14.8471 40.8433C15.0842 40.7704 15.2891 40.7791 15.3765 40.7849C15.5566 40.797 15.7282 40.8381 15.8513 40.8725C16.0585 40.742 16.3051 40.6687 16.5686 40.6745C16.6814 40.677 16.7994 40.6762 16.9215 40.6783C16.9298 40.6534 16.9369 40.628 16.9469 40.6034C17.8417 38.3871 18.7237 36.3036 19.6104 34.3408C17.8648 36.5444 16.5077 38.2749 16.062 38.8832C15.4595 39.7054 15.0736 40.2171 14.8915 40.4269C14.8654 40.457 14.8262 40.5002 14.7823 40.5437C14.7608 40.5651 14.7235 40.6012 14.6757 40.6402C14.6494 40.6617 14.5234 40.7666 14.3354 40.8433C14.2446 40.8804 14.0127 40.9647 13.7083 40.9335C13.3269 40.8942 12.9531 40.6825 12.7295 40.3165C12.5509 40.0238 12.539 39.7454 12.5391 39.6347C12.5392 39.505 12.5589 39.4024 12.5708 39.3491C12.6094 39.1764 12.6794 39.0406 12.6863 39.0266C12.7539 38.8889 12.8723 38.6996 12.9771 38.5353C13.4524 37.7899 14.5542 36.1703 15.836 34.3332C17.1222 32.4898 18.6065 30.4017 19.8554 28.7142C20.4788 27.8718 21.0516 27.1186 21.5134 26.5433C21.7433 26.2569 21.9548 26.0033 22.1367 25.8006C22.2906 25.6293 22.5065 25.3988 22.7283 25.2446L22.9987 25.063C23.2689 24.8903 23.5359 24.7446 23.7947 24.639C23.8861 24.6017 23.9901 24.5647 24.1032 24.5324C24.2433 24.3574 24.3831 24.1839 24.5209 24.0119C26.6259 21.384 28.4561 19.1078 29.3312 18.0311C29.5485 17.7637 29.7129 17.5638 29.8072 17.4509C29.8307 17.4229 29.8537 17.3962 29.8732 17.3735C29.8828 17.3624 29.8954 17.3477 29.9088 17.3329C29.9126 17.3286 29.9516 17.2849 30.0015 17.2389C30.0189 17.2231 30.0639 17.1843 30.0929 17.1615C30.1473 17.122 30.3409 17.012 30.4852 16.9558Z"
      fill="currentColor"
    />
  </svg>
);

const RightArrowSvg = () => (
  <svg viewBox="0 0 75 75" fill="none" className="w-7 h-7">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M33.8079 17.0541C33.9975 17.0459 34.1568 17.0772 34.2446 17.0972C34.4309 17.1398 34.6198 17.2108 34.779 17.2775C35.1143 17.4179 35.5649 17.6416 36.1247 17.9402C36.2263 17.9944 36.4268 18.1285 36.5945 18.2398C36.8053 18.3797 37.0973 18.5749 37.4552 18.8162C38.1722 19.2995 39.1629 19.9708 40.3167 20.7573C42.3241 22.1255 44.8301 23.8469 47.2687 25.5333C47.3039 25.414 47.3593 25.2881 47.4452 25.1626C47.7699 24.6879 48.2534 24.599 48.4747 24.5875C48.5846 24.5818 48.6833 24.5901 48.7642 24.6027L48.947 24.6433L49.5792 24.8401C52.7124 25.8925 55.4255 27.9422 57.2954 29.743C58.2992 30.7097 59.0963 31.639 59.6136 32.3621C59.8643 32.7125 60.0866 33.067 60.2243 33.3802C60.2827 33.5132 60.387 33.7722 60.3995 34.0772C60.4059 34.2354 60.3937 34.5323 60.2166 34.8415C60.0457 35.1397 59.7824 35.3398 59.4968 35.4432C56.9553 39.0435 54.3506 42.2559 51.7489 45.4014C51.5644 45.6244 51.3796 45.8469 51.1954 46.0692C48.1804 50.0265 45.6858 53.2316 44.1672 55.1451C43.4913 55.9968 43.002 56.6021 42.6793 56.9884C42.5211 57.1779 42.3885 57.3313 42.2896 57.4379C42.2497 57.4808 42.1745 57.5605 42.089 57.6321C42.064 57.653 42.0225 57.6866 41.9697 57.7222C41.9301 57.7489 41.8169 57.8232 41.6561 57.8784C41.5637 57.9101 41.0132 58.0932 40.4716 57.7045C39.9104 57.3014 39.9243 56.698 39.9295 56.5847C39.9378 56.4057 39.9816 56.2697 39.9968 56.2242C40.0176 56.162 40.039 56.1119 40.0527 56.082C40.0802 56.0219 40.1086 55.9709 40.1263 55.9398C40.1636 55.8743 40.2069 55.8057 40.2469 55.7443C40.33 55.6169 40.4448 55.4518 40.5808 55.2593C40.8552 54.8709 41.2483 54.3311 41.7323 53.6775L41.7386 53.6673C43.8026 50.9347 45.887 48.3967 47.9517 45.9054C47.5632 46.1079 47.2272 46.2797 46.9704 46.4082C46.8178 46.4845 46.7011 46.5419 46.6149 46.5872C46.5318 46.6308 46.5156 46.6416 46.5324 46.6303C46.0657 46.9654 45.6965 47.2249 45.4164 47.4098C45.2749 47.5033 45.1461 47.5842 45.0343 47.6498C44.9441 47.7027 44.7932 47.7894 44.6306 47.8478C44.5977 47.8596 44.3237 47.9663 43.9793 47.9215C43.7691 47.894 43.3967 47.7895 43.1148 47.4301C42.8351 47.0734 42.8216 46.6915 42.8418 46.4881C42.8755 46.1511 43.0343 45.9134 43.0539 45.8826C43.106 45.8002 43.1603 45.7318 43.1973 45.6871C43.3359 45.5196 43.5463 45.3129 43.761 45.1107C44.6625 44.2615 46.5567 42.6404 48.6411 40.8933C50.3135 39.4915 52.1319 37.9918 53.7027 36.7064C53.7066 36.6816 53.708 36.6564 53.7116 36.6315C53.642 36.6752 53.5843 36.7069 53.5491 36.7229C53.4527 36.7667 53.3653 36.7925 53.3205 36.8054C53.2214 36.834 53.113 36.8579 53.0171 36.8765C52.6297 36.952 51.9084 37.0562 50.8462 37.1939C48.6958 37.4727 44.9868 37.9089 39.3189 38.551C34.4266 39.1053 28.9098 39.3169 24.4666 39.4257C22.2501 39.48 20.2692 39.5096 18.7918 39.5413C18.0467 39.5572 17.4289 39.5739 16.9574 39.5946C16.7216 39.6049 16.5299 39.6159 16.3823 39.6276C16.3091 39.6334 16.2511 39.639 16.2071 39.6441C16.1854 39.6466 16.1683 39.6487 16.1563 39.6505C16.1479 39.6517 16.1411 39.653 16.1411 39.653C15.4362 39.7895 14.7541 39.3283 14.6176 38.6234C14.4954 37.9911 14.8538 37.379 15.4377 37.1609C15.3729 37.0204 15.3248 36.8545 15.3184 36.6594C15.3013 36.1393 15.5842 35.8078 15.6904 35.6984C15.8148 35.5703 15.9387 35.4959 15.9951 35.4635C16.1911 35.351 16.4132 35.2903 16.4978 35.2668C16.9767 35.1335 17.9603 34.9461 19.2121 34.731C21.7717 34.2912 25.7637 33.6801 29.9624 33.0616C30.9492 32.9162 31.9493 32.7729 32.9446 32.6287C32.9688 32.4229 33.0378 32.1519 33.0995 32.0231C33.2755 31.711 33.527 31.5655 33.5882 31.5305C33.6835 31.4761 33.7664 31.4457 33.8066 31.4315C33.8901 31.4022 33.9615 31.3865 33.9894 31.3807C34.0544 31.3672 34.1153 31.3598 34.1506 31.3553C34.23 31.3454 34.3263 31.3354 34.4248 31.3274C34.8235 31.2952 35.5519 31.2552 36.4637 31.2093C38.3004 31.1169 40.9674 30.9998 43.4499 30.8894C43.7538 30.8759 44.055 30.8608 44.3513 30.8475C43.0292 29.4592 41.9829 28.0108 41.1559 26.865C40.6892 26.2185 40.3105 25.696 39.974 25.2946C39.936 25.2493 39.8977 25.2092 39.8635 25.1702C39.8085 25.1342 39.7543 25.1009 39.7036 25.0673C39.3498 24.8336 38.999 24.596 38.82 24.4351C38.79 24.4082 38.7353 24.3571 38.6778 24.2904C38.6489 24.2569 38.6023 24.2 38.5546 24.1241C38.5286 24.0826 38.481 24.0001 38.4378 23.8854C36.581 22.4746 34.9849 21.2496 33.9983 20.4209C33.6384 20.1186 33.3252 19.8421 33.1033 19.6147C33.0007 19.5096 32.8658 19.3633 32.758 19.1983C32.7089 19.1232 32.6093 18.9614 32.5523 18.7425C32.4968 18.529 32.4237 18.0009 32.824 17.5289C33.1841 17.1043 33.6558 17.0607 33.8079 17.0541ZM48.0228 33.8487C46.1452 33.8916 44.0809 33.9282 42.0839 33.9553C41.7063 34.0077 41.3173 34.0634 40.9185 34.1191C43.2368 34.0927 45.7547 34.0902 48.4925 34.1216C48.3333 34.0333 48.177 33.9417 48.0228 33.8487Z"
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

      {/* Listen box + nav arrows */}
      {(() => {
        const hoverColor = ACTIVE_DOT_COLORS[currentIndex % ACTIVE_DOT_COLORS.length];
        const arrowBtnClass =
          "relative z-10 group shrink-0 w-9 h-9 rounded-full border border-black bg-transparent flex items-center justify-center text-black cursor-pointer transition-colors hover:[background-color:var(--btn-hover)] hover:border-[var(--btn-hover)] hover:text-white active:opacity-80 disabled:opacity-30 disabled:cursor-not-allowed self-end mb-[6px]";
        const arrowStyle = { "--btn-hover": hoverColor } as React.CSSProperties;
        return (
          <div className="relative z-30 mt-10 mb-4 flex items-center justify-center gap-4 min-h-[48px] max-[500px]:min-h-[93px] max-[500px]:items-end">
            <button
              onClick={goToPrevious}
              disabled={currentIndex === 0}
              aria-label="Previous card"
              className={arrowBtnClass}
              style={arrowStyle}
            >
              <LeftArrowSvg />
            </button>

            {(() => {
              const activeCard = cards[currentIndex];
              const isCurrentReleased =
                activeCard && (revealAll || new Date(activeCard.releaseDate) <= new Date());
              return (
                <div
                  className={`relative flex justify-center ${isCurrentReleased ? "" : "min-w-[320px] max-[500px]:min-w-[234px]"}`}
                >
                  <AnimatePresence mode="wait">
                    {(() => {
                      if (!activeCard) return null;

                      const isReleased =
                        revealAll || new Date(activeCard.releaseDate) <= new Date();
                      const splashSvg = SPLASH_SVGS[currentIndex % SPLASH_SVGS.length];

                      const formatReleaseDate = (dateStr: string) => {
                        const d = new Date(dateStr + "T00:00:00");
                        const month = d.toLocaleString("en-US", { month: "short" });
                        const day = d.getDate();
                        return `${month} ${day}`;
                      };

                      if (!isReleased) {
                        return (
                          <motion.div
                            key={`coming-${currentIndex}`}
                            className="relative flex items-center justify-center w-full"
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
                              style={{
                                left: "-150px",
                                top: "-72px",
                                width: "600px",
                                height: "auto",
                              }}
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ type: "spring", stiffness: 500, damping: 20 }}
                            />
                            <motion.span
                              className="relative italic text-black select-none max-[500px]:mb-2"
                              style={{ fontSize: "33px", lineHeight: "33px" }}
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{
                                type: "spring",
                                stiffness: 500,
                                damping: 20,
                                delay: 0.15,
                              }}
                            >
                              Coming {formatReleaseDate(activeCard.releaseDate)}
                            </motion.span>
                          </motion.div>
                        );
                      }

                      const links = [
                        {
                          href: activeCard.spotifyLink ?? "",
                          label: "Spotify",
                          fbqEvent: "SongLinkClick_Spotify",
                          icon: <SpotifyLogo size={24} weight="fill" />,
                        },
                        {
                          href: activeCard.appleMusicLink ?? "",
                          label: "Apple Music",
                          fbqEvent: "SongLinkClick_AppleMusic",
                          icon: <AppleLogo size={24} weight="fill" />,
                        },
                        {
                          href: activeCard.youtubeMusicLink ?? "",
                          label: "YouTube Music",
                          fbqEvent: "SongLinkClick_YouTube",
                          icon: <YoutubeLogo size={24} weight="fill" />,
                        },
                        {
                          href: activeCard.amazonMusicLink ?? "",
                          label: "Amazon Music",
                          fbqEvent: "SongLinkClick_AmazonMusic",
                          icon: <AmazonLogo size={24} weight="fill" />,
                        },
                      ];

                      return (
                        <motion.div
                          key={`listen-${currentIndex}`}
                          className="relative flex items-center justify-center max-[500px]:flex-col"
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
                            style={{ left: "-150px", top: "-72px", width: "600px", height: "auto" }}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 500, damping: 20 }}
                          />
                          <motion.span
                            className="relative italic text-black select-none mr-[19px] max-[500px]:mr-0 max-[500px]:mb-3"
                            style={{ fontSize: "33px", lineHeight: "33px" }}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{
                              type: "spring",
                              stiffness: 500,
                              damping: 20,
                              delay: 0.15,
                            }}
                          >
                            Listen
                          </motion.span>
                          <div className="relative flex gap-[14px]">
                            {links.map((link, i) => {
                              const linkHoverColor =
                                ACTIVE_DOT_COLORS[currentIndex % ACTIVE_DOT_COLORS.length];
                              return (
                                <motion.a
                                  key={link.label}
                                  href={link.href || undefined}
                                  target={link.href ? "_blank" : undefined}
                                  rel={link.href ? "noopener noreferrer" : undefined}
                                  aria-label={`Listen on ${link.label}`}
                                  onClick={() => {
                                    if (typeof window !== "undefined" && window.fbq) {
                                      window.fbq("track", "SongLinkClick");
                                      window.fbq("track", link.fbqEvent);
                                    }
                                  }}
                                  className="group w-12 h-12 rounded-full bg-black hover:bg-[var(--btn-hover)] text-white hover:text-black transition-colors flex items-center justify-center cursor-pointer active:opacity-80"
                                  style={{ "--btn-hover": linkHoverColor } as React.CSSProperties}
                                  initial={{ scale: 0, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  transition={{
                                    type: "spring",
                                    stiffness: 500,
                                    damping: 20,
                                    delay: 0.2 + i * 0.07,
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
              );
            })()}

            <button
              onClick={goToNext}
              disabled={currentIndex === cards.length - 1}
              aria-label="Next card"
              className={arrowBtnClass}
              style={arrowStyle}
            >
              <RightArrowSvg />
            </button>
          </div>
        );
      })()}
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
