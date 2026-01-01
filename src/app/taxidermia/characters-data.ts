export interface Character {
  id: string;
  title: string;
  content: string;
  description: string;
  abilities: string[];
  stats: {
    power: number;
    speed: number;
    defense: number;
  };
  cardNumber?: number;
}

export const characters: Character[] = [
  {
    id: "the-rabbit",
    title: "The Rabbit",
    content: "A mysterious rabbit with extraordinary powers...",
    description: "A mysterious rabbit with extraordinary powers and an enigmatic past.",
    abilities: ["Time Hop", "Burrow Strike", "Lucky Charm"],
    stats: { power: 7, speed: 9, defense: 6 },
  },
  {
    id: "comphooter",
    title: "Comphooter",
    content: "A digital companion from another dimension...",
    description: "A digital companion from another dimension with computational abilities.",
    abilities: ["Data Blast", "System Override", "Firewall"],
    stats: { power: 8, speed: 7, defense: 7 },
  },
  {
    id: "lil-dogg",
    title: "Lil' Dogg",
    content: "The smallest but bravest of the crew...",
    description: "The smallest but bravest of the crew, never backs down from a fight.",
    abilities: ["Bark Bomb", "Fetch Attack", "Loyal Guard"],
    stats: { power: 6, speed: 8, defense: 9 },
  },
  {
    id: "the-beaver-and-axe-alot-ul",
    title: "The Beaver & Axe-A-Lot-UL",
    content: "An unlikely duo that became legends...",
    description: "An unlikely duo that became legends through their teamwork and determination.",
    abilities: ["Double Team", "Wood Chipper", "Dam Builder"],
    stats: { power: 9, speed: 6, defense: 8 },
  },
  {
    id: "the-owl",
    title: "The Owl",
    content: "Wise guardian of ancient secrets...",
    description: "Wise guardian of ancient secrets with unmatched vision.",
    abilities: ["Night Vision", "Silent Strike", "Wisdom Beam"],
    stats: { power: 7, speed: 8, defense: 7 },
  },
  {
    id: "the-fox",
    title: "The Fox",
    content: "Cunning trickster of the forest...",
    description: "Cunning trickster of the forest, always one step ahead.",
    abilities: ["Shadow Step", "Illusion", "Charm"],
    stats: { power: 6, speed: 9, defense: 6 },
  },
  {
    id: "the-bear",
    title: "The Bear",
    content: "Mighty protector with unstoppable force...",
    description: "Mighty protector with unstoppable force and fierce loyalty.",
    abilities: ["Crush", "Roar", "Hibernate"],
    stats: { power: 10, speed: 5, defense: 9 },
  },
  {
    id: "the-snake",
    title: "The Snake",
    content: "Stealthy predator with venomous precision...",
    description: "Stealthy predator with venomous precision and hypnotic powers.",
    abilities: ["Venom Strike", "Hypnosis", "Coil"],
    stats: { power: 8, speed: 7, defense: 6 },
  },
  {
    id: "the-wolf",
    title: "The Wolf",
    content: "Pack leader with primal instincts...",
    description: "Pack leader with primal instincts and howling power.",
    abilities: ["Howl", "Pack Call", "Feral Rush"],
    stats: { power: 8, speed: 8, defense: 7 },
  },
  {
    id: "the-crow",
    title: "The Crow",
    content: "Dark messenger with mysterious knowledge...",
    description: "Dark messenger with mysterious knowledge and prophetic sight.",
    abilities: ["Omen", "Dark Flight", "Memory Steal"],
    stats: { power: 6, speed: 9, defense: 5 },
  },
  {
    id: "the-deer",
    title: "The Deer",
    content: "Swift wanderer of enchanted forests...",
    description: "Swift wanderer of enchanted forests with graceful power.",
    abilities: ["Sprint", "Antler Charge", "Forest Blessing"],
    stats: { power: 7, speed: 10, defense: 6 },
  },
  {
    id: "the-raccoon",
    title: "The Raccoon",
    content: "Clever scavenger with resourceful nature...",
    description: "Clever scavenger with resourceful nature and nimble hands.",
    abilities: ["Pickpocket", "Trash Bomb", "Mask of Deception"],
    stats: { power: 5, speed: 8, defense: 7 },
  },
  {
    id: "the-bat",
    title: "The Bat",
    content: "Nocturnal hunter with sonic abilities...",
    description: "Nocturnal hunter with sonic abilities and aerial mastery.",
    abilities: ["Echolocation", "Sonic Blast", "Night Glide"],
    stats: { power: 6, speed: 9, defense: 5 },
  },
  {
    id: "the-squirrel",
    title: "The Squirrel",
    content: "Energetic gatherer with acrobatic skills...",
    description: "Energetic gatherer with acrobatic skills and quick reflexes.",
    abilities: ["Acrobat", "Nut Barrage", "Tree Hop"],
    stats: { power: 5, speed: 10, defense: 5 },
  },
  {
    id: "the-turtle",
    title: "The Turtle",
    content: "Ancient warrior with impenetrable shell...",
    description: "Ancient warrior with impenetrable shell and timeless wisdom.",
    abilities: ["Shell Guard", "Tidal Wave", "Slow Time"],
    stats: { power: 7, speed: 3, defense: 10 },
  },
  {
    id: "the-cat",
    title: "The Cat",
    content: "Independent hunter with nine lives...",
    description: "Independent hunter with nine lives and supernatural agility.",
    abilities: ["Nine Lives", "Pounce", "Cat's Eye"],
    stats: { power: 6, speed: 9, defense: 7 },
  },
  {
    id: "the-eagle",
    title: "The Eagle",
    content: "Majestic ruler of the skies...",
    description: "Majestic ruler of the skies with piercing vision and talons of steel.",
    abilities: ["Sky Dive", "Eagle Eye", "Talon Strike"],
    stats: { power: 8, speed: 9, defense: 6 },
  },
  {
    id: "the-mouse",
    title: "The Mouse",
    content: "Tiny hero with surprising courage...",
    description: "Tiny hero with surprising courage and stealth abilities.",
    abilities: ["Sneak", "Nibble", "Size Shift"],
    stats: { power: 4, speed: 10, defense: 5 },
  },
  {
    id: "the-frog",
    title: "The Frog",
    content: "Amphibious champion with toxic touch...",
    description: "Amphibious champion with toxic touch and leaping prowess.",
    abilities: ["Poison Dart", "Tongue Lash", "Leap"],
    stats: { power: 6, speed: 8, defense: 6 },
  },
  {
    id: "the-hedgehog",
    title: "The Hedgehog",
    content: "Spiky defender with rolling attack...",
    description: "Spiky defender with rolling attack and impenetrable quills.",
    abilities: ["Spike Ball", "Quill Shield", "Roll Out"],
    stats: { power: 6, speed: 7, defense: 9 },
  },
  {
    id: "the-otter",
    title: "The Otter",
    content: "Playful warrior with aquatic mastery...",
    description: "Playful warrior with aquatic mastery and clever tactics.",
    abilities: ["Water Jet", "Shell Smash", "River Dance"],
    stats: { power: 6, speed: 8, defense: 7 },
  },
  {
    id: "the-hawk",
    title: "The Hawk",
    content: "Fierce predator with calculated precision...",
    description: "Fierce predator with calculated precision and aerial superiority.",
    abilities: ["Precision Strike", "Wind Blade", "Dive Bomb"],
    stats: { power: 8, speed: 9, defense: 6 },
  },
  {
    id: "the-badger",
    title: "The Badger",
    content: "Tenacious fighter with unbreakable will...",
    description: "Tenacious fighter with unbreakable will and fierce determination.",
    abilities: ["Berserker", "Dig", "Iron Hide"],
    stats: { power: 9, speed: 6, defense: 8 },
  },
  {
    id: "the-chameleon",
    title: "The Chameleon",
    content: "Master of disguise with adaptive powers...",
    description: "Master of disguise with adaptive powers and color-shifting abilities.",
    abilities: ["Camouflage", "Color Blast", "Tongue Snare"],
    stats: { power: 6, speed: 7, defense: 7 },
  },
  {
    id: "the-porcupine",
    title: "The Porcupine",
    content: "Defensive specialist with ranged attacks...",
    description: "Defensive specialist with ranged attacks and needle-sharp quills.",
    abilities: ["Quill Shot", "Spike Armor", "Needle Rain"],
    stats: { power: 7, speed: 6, defense: 9 },
  },
];

export const validSlugs = characters.map(char => char.id);

/**
 * Resolves a slug to a card number (1-indexed)
 * @param slug - Either a numeric string ("14") or a character id ("the-rabbit")
 * @returns Card number (1-25) or null if invalid
 */
export function getCardNumberFromSlug(slug: string): number | null {
  // Check if slug is numeric
  const numericValue = parseInt(slug, 10);
  if (!isNaN(numericValue)) {
    // Validate it's in range
    if (numericValue >= 1 && numericValue <= characters.length) {
      return numericValue;
    }
    return null;
  }

  // Check if slug is a character id with an assigned card number
  const character = characters.find(c => c.id === slug);
  if (character?.cardNumber) {
    return character.cardNumber;
  }

  return null;
}

/**
 * Determines if a card's back side is in landscape or portrait orientation
 * @param cardNumber - Card number (1-indexed)
 * @returns 'landscape' for even cards, 'portrait' for odd cards
 */
export function getCardOrientation(cardNumber: number): "landscape" | "portrait" {
  return cardNumber % 2 === 0 ? "landscape" : "portrait";
}
