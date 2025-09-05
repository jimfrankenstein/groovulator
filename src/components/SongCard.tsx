import { Song } from '@/app/constants/types';
import SongImage from './SongImage';
import Link from 'next/link';

interface SongCardProps {
  song: Song & { artist: string };
  aspectRatio?: 'square' | '4/3';
}

export default function SongCard({
  song: { id, title, artist, songType, collabArtists },
  aspectRatio = 'square'
}: SongCardProps) {
  const aspectClass = aspectRatio === 'square' ? 'aspect-square' : 'aspect-[4/3]';
  
  // Map artist names to URL paths
  const artistUrlMap: Record<string, string> = {
    "Jim Frankenstein": "jimfrankenstein",
    "The Very Bad Days": "theverybaddays"
  };
  
  // For collaborations, use the first collab artist's URL, otherwise use the regular artist
  const linkArtist = collabArtists ? collabArtists[0] : artist;
  const artistUrl = artistUrlMap[linkArtist];
  const songUrl = `/${artistUrl}/songs/${id}`;

  const artistName = collabArtists ? "collaborations" : artistUrl as "jimfrankenstein" | "theverybaddays";

  return (
    <Link href={songUrl} className="block border border-black/15 dark:border-white/15 hover:shadow-lg hover:shadow-black/10 dark:hover:shadow-white/10 transition-shadow">
      <div className={`${aspectClass} bg-neutral-50 dark:bg-neutral-800 overflow-hidden`}>
        <SongImage 
          songId={id}
          artist={artistName}
          title={title}
          className="!max-w-none !mx-0 w-full h-full"
        />
      </div>
      <div className="p-4 flex flex-col gap-1">
        <div className="text-[11px] uppercase tracking-wide opacity-60">
          {songType}
        </div>
        <h4 className="font-semibold leading-tight">{title}</h4>
        <p className="text-sm opacity-70">{artist}</p>
        <div className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 pt-2">
          Listen →
        </div>
      </div>
    </Link>
  );
}