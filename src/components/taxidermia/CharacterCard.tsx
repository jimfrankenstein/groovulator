import Link from "next/link";
import { Character } from "../../app/taxidermia/characters-data";

interface CharacterCardProps {
  character: Character;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
}

const BASE_CLASSES =
  "p-6 rounded-lg min-h-[300px] border-2 border-dotted border-green-300 hover:border-green-200 transition-colors cursor-pointer";

export default function CharacterCard({ character, onClick, className = "" }: CharacterCardProps) {
  return (
    <Link
      href={`/taxidermia/${character.id}`}
      scroll={false}
      onClick={onClick}
      className={`${BASE_CLASSES} ${className}`}
    />
  );
}
