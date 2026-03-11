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
import { SpotifyLogo, YoutubeLogo, AppleLogo } from "@phosphor-icons/react";
import PlaylistImage from "./PlaylistImage";
import ArtistSongBaseLayout from "./ArtistSongBaseLayout";

// Facebook pixel type declaration
declare global {
  interface Window {
    fbq: (action: string, eventName: string) => void;
  }
}

interface IndividualPlaylistLayoutProps {
  playlist: Playlist;
  artist: ArtistConfig;
}

export default function IndividualPlaylistLayout({
  playlist,
  artist,
}: IndividualPlaylistLayoutProps) {
  return (
    <ArtistSongBaseLayout
      artist={artist}
      navLinks={[{ label: "← All Playlists", href: "/playlists" }]}
    >
      {/* PLAYLIST HERO */}
      <section className="dark bg-gray-950 text-white border-b border-white/10">
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
              <p className="text-lg opacity-80 mb-6 leading-relaxed">
                Created by Ectophonic Groovulator and{" "}
                <a
                  href="https://nicholasburgess.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  Nicholas Burgess
                </a>
                .
              </p>
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
          <div className="mx-auto max-w-6xl px-4 py-10 grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="text-xl md:text-2xl font-bold">Listen</h3>
            </div>
            <div className="md:col-span-2 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {playlist.spotifyId && (
                <Link
                  href={`https://open.spotify.com/playlist/${playlist.spotifyId}`}
                  target="_blank"
                  onClick={() => {
                    if (typeof window !== "undefined" && window.fbq) {
                      window.fbq("track", "PlaylistLinkClick");
                      window.fbq("track", "PlaylistLinkClick_Spotify");
                    }
                  }}
                  className="flex items-center p-4 border border-black/15 dark:border-white/15 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  <SpotifyLogo
                    size={24}
                    weight="fill"
                    className="mr-3"
                    style={{ color: "#1ED760" }}
                  />
                  <span className="text-sm font-medium">Spotify</span>
                </Link>
              )}

              {playlist.appleMusicLink && (
                <Link
                  href={playlist.appleMusicLink}
                  target="_blank"
                  onClick={() => {
                    if (typeof window !== "undefined" && window.fbq) {
                      window.fbq("track", "PlaylistLinkClick");
                      window.fbq("track", "PlaylistLinkClick_AppleMusic");
                    }
                  }}
                  className="flex items-center p-4 border border-black/15 dark:border-white/15 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  <AppleLogo
                    size={24}
                    weight="fill"
                    className="mr-3"
                    style={{ color: "#FA243C" }}
                  />
                  <span className="text-sm font-medium">Apple Music</span>
                </Link>
              )}

              {playlist.youtubeLink && (
                <Link
                  href={playlist.youtubeLink}
                  target="_blank"
                  onClick={() => {
                    if (typeof window !== "undefined" && window.fbq) {
                      window.fbq("track", "PlaylistLinkClick");
                      window.fbq("track", "PlaylistLinkClick_YouTube");
                    }
                  }}
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
                  onClick={() => {
                    if (typeof window !== "undefined" && window.fbq) {
                      window.fbq("track", "PlaylistLinkClick");
                      window.fbq("track", "PlaylistLinkClick_YouTubeMusic");
                    }
                  }}
                  className="flex items-center p-4 border border-black/15 dark:border-white/15 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  <YoutubeLogo size={24} weight="fill" className="mr-3 text-red-600" />
                  <span className="text-sm font-medium">YouTube Music</span>
                </Link>
              )}
            </div>
          </div>
        </section>

        {/* SUPPORT THE ARTISTS */}
        {playlist.merchTableLink && (
          <section className="border-b border-black/10 dark:border-white/10">
            <div className="mx-auto max-w-6xl px-4 py-12 grid gap-6 md:grid-cols-3">
              <div>
                <h3 className="text-xl md:text-2xl font-bold">Support the Artists</h3>
              </div>
              <div className="md:col-span-2 text-sm md:text-base leading-relaxed opacity-90 space-y-4">
                <p>
                  If you enjoy this playlist, please consider supporting the artists by visiting the{" "}
                  <Link
                    href={playlist.merchTableLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Merch Table
                  </Link>{" "}
                  for this playlist. Your support helps them continue creating the music you love.
                  (The money goes directly to the artists, not to us!)
                </p>
                <div className="pt-2">
                  <Link
                    href={playlist.merchTableLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-black text-white dark:bg-white dark:text-black px-6 py-3 text-sm font-medium hover:bg-black/80 dark:hover:bg-white/90 transition-colors"
                  >
                    Support the Artists
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* SIGNUP FORM */}
        <section className="border-b border-black/10 dark:border-white/10">
          <div className="mx-auto max-w-6xl px-4 py-12 grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="text-xl md:text-2xl font-bold">Stay in the Loop</h3>
            </div>
            <div className="md:col-span-2 text-sm md:text-base leading-relaxed opacity-90 space-y-4">
              <p>
                Ectophonic Groovulator is an independent studio and label from Minneapolis, making
                short, haunted musicals and other oddities. We write songs about goblins, cults,
                dolphin suicides, and whatever else crawls out of the woods. Our projects, The Very
                Bad Days and Jim Frankenstein, mix dark humor with 90s alt-rock fuzz and
                basement-punk energy. If you like your laughter with a chill and your horror with a
                wink, welcome to the Groovulator.
              </p>
              <div className="klaviyo-form-VhjV3m"></div>
            </div>
          </div>
        </section>

      </main>
    </ArtistSongBaseLayout>
  );
}
