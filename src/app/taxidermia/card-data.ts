export interface Card {
  id: string;
  title: string;
  cardNumber: number;
  description: string;
  releaseDate: string; // YYYY-MM-DD
  backOrientation?: "landscape" | "portrait"; // defaults to "portrait" if omitted
}

export const cards: Card[] = [
  {
    id: "the-rabbit",
    title: "The Rabbit",
    cardNumber: 1,
    description: "A mysterious rabbit with extraordinary powers and an enigmatic past.",
    releaseDate: "2026-03-20",
  },
  {
    id: "comphooter",
    title: "CompHOOTer",
    cardNumber: 2,
    description: "A digital companion from another dimension with computational abilities.",
    releaseDate: "2026-04-17",
  },
  {
    id: "lil-dogg",
    title: "Lil' Dogg",
    cardNumber: 3,
    description: "The smallest but bravest of the crew, never backs down from a fight.",
    releaseDate: "2026-05-15",
  },
  {
    id: "lil-dogg-2",
    title: "Lil' Dogg #2",
    cardNumber: 4,
    description: "The smallest but bravest of the crew, never backs down from a fight.",
    releaseDate: "2026-05-15",
    backOrientation: "landscape",
  },
  {
    id: "the-beaver",
    title: "The Beaver",
    cardNumber: 5,
    description: "An unlikely duo that became legends through their teamwork and determination.",
    releaseDate: "2026-06-12",
  },
  {
    id: "axe-alot-ul",
    title: "Axe-alot-ul",
    cardNumber: 6,
    description: "An unlikely duo that became legends through their teamwork and determination.",
    releaseDate: "2026-06-12",
  },
  {
    id: "the-taxidermist",
    title: "The Taxidermist",
    cardNumber: 7,
    description: "Wise guardian of ancient secrets with unmatched vision.",
    releaseDate: "2026-07-17",
  },
  {
    id: "rigor-mort-doch",
    title: "Rigor Mort-doch",
    cardNumber: 8,
    description: "Cunning trickster of the forest, always one step ahead.",
    releaseDate: "2026-07-17",
  },
  {
    id: "count-creep",
    title: "Count Creep (The Phantom of the Slop-era)",
    cardNumber: 9,
    description: "Mighty protector with unstoppable force and fierce loyalty.",
    releaseDate: "2026-07-17",
  },
  {
    id: "undead-justice-warriors-of-taxidermia",
    title: "Undead Justice Warriors of Taxidermia",
    cardNumber: 10,
    description: "Mighty protector with unstoppable force and fierce loyalty.",
    releaseDate: "2026-08-21",
    backOrientation: "landscape",
  },
];

export const validCardSlugs = cards.map(card => card.id);

/**
 * Resolves a card id slug to a card number (1-indexed)
 * @param slug - A card id (e.g. "the-rabbit")
 * @returns Card number (1-indexed) or null if invalid
 */
export function getCardNumberFromSlug(slug: string): number | null {
  const card = cards.find(c => c.id === slug);
  return card?.cardNumber ?? null;
}

/**
 * Determines if a card's back side is in landscape or portrait orientation
 * @param cardNumber - Card number (1-indexed)
 * @returns 'portrait' by default, 'landscape' only if the card's backOrientation is set
 */
export function getCardOrientation(cardNumber: number): "landscape" | "portrait" {
  const card = cards.find(c => c.cardNumber === cardNumber);
  return card?.backOrientation ?? "portrait";
}
