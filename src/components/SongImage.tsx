interface SongImageProps {
  songId: string;
  artist: "jimfrankenstein" | "theverybaddays";
  title: string;
  className?: string;
}

export default function SongImage({ songId, artist, title, className = "" }: SongImageProps) {
  const imageUrl = `/images/${artist}/songs/${songId}/track-art-512.jpg`;

  return (
    <div className={`max-w-md mx-auto overflow-hidden ${className}`}>
      <img
        className="w-full h-auto shadow-lg"
        src={imageUrl}
        alt={`Track art for ${title}`}
      />
    </div>
  );
}