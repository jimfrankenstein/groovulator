import { Song } from '@/app/constants/types';
import SongImage from './SongImage';
import Link from 'next/link';

interface SongCardProps {
  song: Song & { artist: string };
  aspectRatio?: 'square' | '4/3';
  placeholderText?: string;
}

export default function SongCard({
  song: { id, title, artist, spotifyId, appleMusicLink, youtubeLink, songType },
  aspectRatio = 'square',
  placeholderText = "fArt placeholder"
}: SongCardProps) {
  const aspectClass = aspectRatio === 'square' ? 'aspect-square' : 'aspect-[4/3]';
  
  // Map artist names to URL paths
  const artistUrlMap: Record<string, string> = {
    "Jim Frankenstein": "jimfrankenstein",
    "The Very Bad Days": "theverybaddays"
  };
  
  const artistUrl = artistUrlMap[artist];
  const songUrl = `/${artistUrl}/songs/${id}`;

  return (
    <Link href={songUrl} className="block border border-black/15 hover:shadow-lg transition-shadow">
      <div className={`${aspectClass} bg-neutral-50 border-b border-black/15 overflow-hidden`}>
        <SongImage 
          songId={id}
          artist={artistUrl as "jimfrankenstein" | "theverybaddays"}
          title={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 flex flex-col gap-2">
        <div className="text-[11px] uppercase tracking-wide opacity-60">
          {songType}
        </div>
        <h4 className="font-semibold leading-tight">{title}</h4>
        <p className="text-sm opacity-70">{artist}</p>
        <div className="text-sm text-blue-600 hover:text-blue-800 pt-2">
          View Details →
        </div>
      </div>
    </Link>
  );
}