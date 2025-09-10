interface SongImageProps {
  songId: string;
  artist: "jimfrankenstein" | "theverybaddays" | "collaborations";
  title: string;
  className?: string;
}

import Image from 'next/image';

export default function SongImage({ songId, artist, title, className = "" }: SongImageProps) {
  // For collaborations, use theverybaddays images as default
  const artistFolder = artist === "collaborations" ? "theverybaddays" : artist;
  const imageUrl = `/images/${artistFolder}/songs/${songId}/track-art-512.jpg`;

  return (
    <div className={`max-w-md mx-auto overflow-hidden ${className}`}>
      <Image
        className="w-full h-full object-cover shadow-lg"
        src={imageUrl}
        alt={`Track art for ${title}`}
        width={512}
        height={512}
        priority
      />
    </div>
  );
}