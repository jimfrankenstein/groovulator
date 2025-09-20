/**
 * SongsListLayout - Complete layout for artist songs list pages
 * 
 * This component provides the full layout for pages like /artist/songs.
 * It uses ArtistSongBaseLayout as its wrapper and adds:
 * 
 * - Simple "All Songs" heading (matches home page "Latest Songs" style)
 * - Songs grid using SongCard components
 * - Navigation section with back-to-artist button
 * 
 * Used by:
 * - /jimfrankenstein/songs/page.tsx
 * - /theverybaddays/songs/page.tsx
 * 
 * This component displays all songs for an artist in a clean grid layout
 * with consistent styling across both artists.
 */

import Link from "next/link";
import { Song } from "@/app/constants/types";
import SongCard from "./SongCard";
import ArtistSongBaseLayout from "./ArtistSongBaseLayout";

interface SongsListLayoutProps {
  artist: {
    name: string;
    displayName: string;
    slug: string;
    socialLinks: string[];
  };
  songs: (Song & { artist: string })[];
}

export default function SongsListLayout({ artist, songs }: SongsListLayoutProps) {
  return (
    <ArtistSongBaseLayout artist={artist}>
      <main>
        {/* SONGS GRID */}
        <section className="border-b border-black/10 dark:border-white/10">
          <div className="mx-auto max-w-6xl px-4 py-10">
            <h3 className="text-xl md:text-2xl font-bold mb-6">All Songs</h3>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {songs.map(song => (
                <SongCard key={song.id} song={song} />
              ))}
            </div>
          </div>
        </section>

        {/* NAVIGATION */}
        <section className="border-b border-black/10 dark:border-white/10">
          <div className="mx-auto max-w-6xl px-4 py-10 text-center">
            <Link
              href={`/${artist.slug}`}
              className="inline-flex items-center gap-2 border border-black/20 dark:border-white/20 px-6 py-3 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            >
              ← Back to {artist.name}
            </Link>
          </div>
        </section>
      </main>
    </ArtistSongBaseLayout>
  );
}