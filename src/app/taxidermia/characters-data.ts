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
];

export const validSlugs = characters.map(char => char.id);
