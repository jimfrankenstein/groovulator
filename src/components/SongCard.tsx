import { Song } from "@/app/constants/types";
import SongImage from "./SongImage";
import Link from "next/link";
import { getCurrentArtistSlug, artistHref } from "@/lib/urls";

interface SongCardProps {
  song: Song & { artist: string };
  aspectRatio?: "square" | "4/3";
}

export default async function SongCard({
  song: { id, title, artist, songType, collabArtists, album },
  aspectRatio = "square",
}: SongCardProps) {
  const currentArtist = await getCurrentArtistSlug();
  const aspectClass = aspectRatio === "square" ? "aspect-square" : "aspect-[4/3]";

  const artistUrlMap: Record<string, string> = {
    "Jim Frankenstein": "jimfrankenstein",
    "The Very Bad Days": "theverybaddays",
  };

  // For collabs, prefer the current domain's artist so the link stays on-domain.
  // Falls back to the first collab artist (used on groovulator.com / localhost).
  let linkSlug: string;
  if (collabArtists) {
    const collabSlugs = collabArtists.map(name => artistUrlMap[name]);
    linkSlug = collabSlugs.includes(currentArtist) ? currentArtist : collabSlugs[0];
  } else {
    linkSlug = artistUrlMap[artist];
  }
  const songUrl = artistHref(currentArtist, linkSlug, `/songs/${id}`);

  const artistName = collabArtists
    ? "collaborations"
    : (linkSlug as "jimfrankenstein" | "theverybaddays");

  return (
    <Link
      href={songUrl}
      className="block border border-black/15 dark:border-white/15 hover:shadow-lg hover:shadow-black/10 dark:hover:shadow-white/10 transition-shadow"
    >
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
          {songType === "track" && album ? (
            <>
              TRACK FROM <em>{album}</em>
            </>
          ) : (
            songType
          )}
        </div>
        <h4 className="font-semibold leading-tight">{title}</h4>
        <p className="text-sm opacity-70">{collabArtists ? collabArtists.join(", ") : artist}</p>
        <div className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 pt-2">
          Listen →
        </div>
      </div>
    </Link>
  );
}
