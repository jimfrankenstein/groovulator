/**
 * IndividualPlaylistLayout - Complete layout for individual playlist detail pages
 *
 * This component provides the full layout for pages like /playlists/[playlistId].
 * It uses ArtistSongBaseLayout as its wrapper and adds:
 *
 * - Playlist hero section (title, description, playlist art in side-by-side layout)
 * - Streaming links section (Spotify, Apple Music, YouTube with platform icons)
 * - About section (formatted description)
 * - Navigation section (back to playlists list)
 *
 * Used by:
 * - /playlists/[playlistId]/page.tsx
 *
 * The component takes formatting functions as props to allow customization
 * of how the about section is displayed if needed.
 */

import Link from "next/link";
import { Playlist, ArtistConfig } from "@/app/constants/types";
import { SpotifyLogo, AppleLogo, YoutubeLogo } from "@phosphor-icons/react";
import PlaylistImage from "./PlaylistImage";
import ArtistSongBaseLayout from "./ArtistSongBaseLayout";

interface IndividualPlaylistLayoutProps {
  playlist: Playlist;
  artist: ArtistConfig;
  formatAbout: (about: string) => React.ReactNode[];
}

export default function IndividualPlaylistLayout({
  playlist,
  artist,
  formatAbout,
}: IndividualPlaylistLayoutProps) {
  return (
    <ArtistSongBaseLayout artist={artist}>
      {/* PLAYLIST HERO */}
      <section className="border-b border-black/10 dark:border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div className="order-2 md:order-1">
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight mb-4">
            {playlist.title}
          </h1>
              <p 
                className="text-lg opacity-80 mb-6 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: playlist.description }}
              />
            </div>
            <div className="order-1 md:order-2">
              <PlaylistImage
                playlistId={playlist.id}
                title={playlist.title}
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
              {playlist.spotifyId && (
                <Link
                  href={`https://open.spotify.com/playlist/${playlist.spotifyId}`}
                  target="_blank"
                  className="flex items-center p-4 border border-black/15 dark:border-white/15 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  <SpotifyLogo size={24} weight="fill" className="mr-3 text-green-600" />
                  <span className="text-sm font-medium">Spotify</span>
                </Link>
              )}

              {playlist.appleMusicLink && (
                <Link
                  href={playlist.appleMusicLink}
                  target="_blank"
                  className="flex items-center p-4 border border-black/15 dark:border-white/15 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  <AppleLogo size={24} weight="fill" className="mr-3" />
                  <span className="text-sm font-medium">Apple Music</span>
                </Link>
              )}

              {playlist.youtubeLink && (
                <Link
                  href={playlist.youtubeLink}
                  target="_blank"
                  className="flex items-center p-4 border border-black/15 dark:border-white/15 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  <YoutubeLogo size={24} weight="fill" className="mr-3 text-red-600" />
                  <span className="text-sm font-medium">YouTube</span>
                </Link>
              )}

              {playlist.youtubeMusicLink && (
                <Link
                  href={playlist.youtubeMusicLink}
                  target="_blank"
                  className="flex items-center p-4 border border-black/15 dark:border-white/15 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  <YoutubeLogo size={24} weight="fill" className="mr-3 text-red-600" />
                  <span className="text-sm font-medium">YouTube Music</span>
                </Link>
              )}
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section className="border-b border-black/10 dark:border-white/10">
          <div className="mx-auto max-w-6xl px-4 py-12 grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="text-xl md:text-2xl font-bold">About</h3>
            </div>
            <div className="md:col-span-2 text-sm md:text-base leading-relaxed opacity-90 space-y-1 [&_a]:underline [&_a]:text-blue-600 hover:[&_a]:text-blue-800 dark:[&_a]:text-blue-400 dark:hover:[&_a]:text-blue-300">
              {formatAbout(playlist.about)}
            </div>
          </div>
        </section>

        {/* NAVIGATION */}
        <section className="border-b border-black/10 dark:border-white/10">
          <div className="mx-auto max-w-6xl px-4 py-10">
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/playlists"
                className="inline-flex items-center gap-2 border border-black/20 dark:border-white/20 px-6 py-3 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                ← All Playlists
              </Link>
            </div>
          </div>
        </section>
      </main>
    </ArtistSongBaseLayout>
  );
}
