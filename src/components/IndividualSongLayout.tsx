/**
 * IndividualSongLayout - Complete layout for individual song detail pages
 *
 * This component provides the full layout for pages like /artist/songs/[songId].
 * It uses ArtistSongBaseLayout as its wrapper and adds:
 *
 * - Song hero section (title, description, album art in side-by-side layout)
 * - Streaming links section (Spotify, Apple Music, YouTube with platform icons)
 * - Lyrics section (formatted with markdown-style headers)
 * - Credits section (formatted line by line)
 * - Navigation section (back to songs list + back to artist)
 *
 * Used by:
 * - /jimfrankenstein/songs/[songId]/page.tsx
 * - /theverybaddays/songs/[songId]/page.tsx
 *
 * The component takes formatting functions as props to allow each artist
 * to customize how lyrics and credits are displayed if needed.
 */

import Link from "next/link";
import { Song } from "@/app/constants/types";
import { SpotifyLogo, AppleLogo, YoutubeLogo } from "@phosphor-icons/react";
import SongImage from "./SongImage";
import ArtistSongBaseLayout from "./ArtistSongBaseLayout";

interface IndividualSongLayoutProps {
  song: Song;
  artist: {
    name: string;
    displayName: string;
    slug: string;
    socialLinks: string[];
  };
  formatLyrics: (lyrics: string) => React.ReactNode[];
  formatCredits: (credits: string) => React.ReactNode[];
}

export default function IndividualSongLayout({
  song,
  artist,
  formatLyrics,
  formatCredits,
}: IndividualSongLayoutProps) {
  return (
    <ArtistSongBaseLayout artist={artist}>
      {/* SONG HERO */}
      <section className="border-b border-black/10 dark:border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div className="order-2 md:order-1">
              <h1 className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight mb-4">
                {song.title}
              </h1>
              {song.collabArtists && (
                <p className="text-lg opacity-80 mb-4">{song.collabArtists.join(", ")}</p>
              )}
              <p className="text-lg opacity-80 mb-6 leading-relaxed">{song.description}</p>
              {song.albumLink && (
                <Link
                  href={song.albumLink}
                  target="_blank"
                  className="inline-flex items-center gap-2 border border-black/20 dark:border-white/20 px-6 py-3 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  View Album →
                </Link>
              )}
            </div>
            <div className="order-1 md:order-2">
              <SongImage
                songId={song.id}
                artist={song.collabArtists ? "collaborations" : artist.slug}
                title={song.title}
                className="rounded-lg w-full max-w-md mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      <main>
        {/* STREAMING LINKS */}
        <section className="border-b border-black/10 dark:border-white/10">
          <div className="mx-auto max-w-6xl px-4 py-10">
            <h3 className="text-xl md:text-2xl font-bold mb-6">Listen</h3>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 max-w-3xl">
              <Link
                href={`https://open.spotify.com/track/${song.spotifyId}`}
                target="_blank"
                className="flex items-center p-4 border border-black/15 dark:border-white/15 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                <SpotifyLogo size={24} weight="fill" className="mr-3 text-green-600" />
                <span className="text-sm font-medium">Spotify</span>
              </Link>

              {song.appleMusicLink && (
                <Link
                  href={song.appleMusicLink}
                  target="_blank"
                  className="flex items-center p-4 border border-black/15 dark:border-white/15 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  <AppleLogo size={24} weight="fill" className="mr-3" />
                  <span className="text-sm font-medium">Apple Music</span>
                </Link>
              )}

              {song.youtubeLink && (
                <Link
                  href={song.youtubeLink}
                  target="_blank"
                  className="flex items-center p-4 border border-black/15 dark:border-white/15 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  <YoutubeLogo size={24} weight="fill" className="mr-3 text-red-600" />
                  <span className="text-sm font-medium">YouTube</span>
                </Link>
              )}
            </div>
          </div>
        </section>

        {/* LYRICS */}
        {song.lyrics && (
          <section className="border-b border-black/10 dark:border-white/10">
            <div className="mx-auto max-w-6xl px-4 py-12 grid gap-6 md:grid-cols-3">
              <div>
                <h3 className="text-xl md:text-2xl font-bold">Lyrics</h3>
              </div>
              <div className="md:col-span-2">
                <div className="prose prose-lg max-w-none text-black dark:text-white">
                  {formatLyrics(song.lyrics)}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CREDITS */}
        <section className="border-b border-black/10 dark:border-white/10">
          <div className="mx-auto max-w-6xl px-4 py-12 grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="text-xl md:text-2xl font-bold">Credits</h3>
            </div>
            <div className="md:col-span-2 text-sm md:text-base leading-relaxed opacity-90 space-y-1">
              {formatCredits(song.credits)}
            </div>
          </div>
        </section>

        {/* NAVIGATION */}
        <section className="border-b border-black/10 dark:border-white/10">
          <div className="mx-auto max-w-6xl px-4 py-10">
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href={`/${artist.slug}/songs`}
                className="inline-flex items-center gap-2 border border-black/20 dark:border-white/20 px-6 py-3 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                ← All Songs
              </Link>
              <Link
                href={`/${artist.slug}`}
                className="inline-flex items-center gap-2 border border-black/20 dark:border-white/20 px-6 py-3 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                Back to Artist
              </Link>
            </div>
          </div>
        </section>
      </main>
    </ArtistSongBaseLayout>
  );
}
