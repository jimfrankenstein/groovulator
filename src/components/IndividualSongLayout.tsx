"use client";

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
import { useSearchParams } from "next/navigation";
import { Song, ArtistConfig } from "@/app/constants/types";
import { AmazonLogo, SpotifyLogo, AppleLogo, YoutubeLogo } from "@phosphor-icons/react";
import SongImage from "./SongImage";
import ArtistSongBaseLayout from "./ArtistSongBaseLayout";
import CountdownTimer from "./CountdownTimer";

// Facebook pixel type declaration
declare global {
  interface Window {
    fbq: (action: string, eventName: string) => void;
  }
}

interface IndividualSongLayoutProps {
  song: Song;
  artist: ArtistConfig;
  songsHref: string;
  homeHref: string;
}

// Format lyrics to convert markdown headers to HTML
function formatLyrics(lyrics: string) {
  return lyrics.split("\n").map((line, index) => {
    if (line.startsWith("#### ")) {
      return (
        <h4 key={index} className="text-lg font-semibold opacity-90 mt-6 mb-2 first:mt-0">
          {line.substring(4)}
        </h4>
      );
    }
    if (line.trim() === "") {
      return <br key={index} />;
    }
    return (
      <p key={index} className="opacity-80 leading-relaxed mb-1">
        {line}
      </p>
    );
  });
}

// Format credits to handle line breaks
function formatCredits(credits: string) {
  return credits.split("\n").map((line, index) => (
    <p key={index} className="">
      {line}
    </p>
  ));
}

export default function IndividualSongLayout({
  song,
  artist,
  songsHref,
  homeHref,
}: IndividualSongLayoutProps) {
  const searchParams = useSearchParams();
  const debugMode = searchParams.get("debug") === "true";

  // Check if release date is in the future
  const isFutureRelease = new Date(song.releaseDate) > new Date();

  // Show music links if not a future release OR if debug mode is enabled
  const showMusicLinks = !isFutureRelease || debugMode;
  return (
    <ArtistSongBaseLayout artist={artist}>
      {/* SONG HERO */}
      <section className="border-b border-black/10 dark:border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div className="order-2 md:order-1">
              <h1
                className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight mb-4"
                style={song.headerFont ? { fontFamily: `var(--font-${song.headerFont})` } : {}}
              >
                {song.title}
              </h1>
              {song.collabArtists && (
                <p className="text-lg opacity-80 mb-4">{song.collabArtists.join(", ")}</p>
              )}
              <p
                className="text-lg opacity-80 mb-6 leading-relaxed [&_a]:underline [&_a]:text-pink-700 dark:[&_a]:text-yellow-300 [&_a]:hover:text-pink-800 dark:[&_a]:hover:text-yellow-300/80 [&_a]:active:text-pink-900 dark:[&_a]:active:text-yellow-400 [&_a]:focus:outline-none [&_a]:focus:ring-2 [&_a]:focus:ring-pink-700 dark:[&_a]:focus:ring-yellow-300 [&_a]:transition-colors"
                dangerouslySetInnerHTML={{ __html: song.description }}
              />
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
                artist={
                  song.collabArtists
                    ? "collaborations"
                    : artist.slug === "groovulator"
                      ? "jimfrankenstein"
                      : (artist.slug as "jimfrankenstein" | "theverybaddays")
                }
                title={song.title}
                className="rounded-lg w-full max-w-md mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      <main>
        {/* STREAMING LINKS OR COUNTDOWN */}
        <section className="border-b border-black/10 dark:border-white/10">
          <div className="mx-auto max-w-6xl px-4 py-10">
            {showMusicLinks ? (
              <div className="grid gap-6 md:grid-cols-3">
                <div>
                  <h3
                    className="text-xl md:text-2xl font-bold"
                    style={song.headerFont ? { fontFamily: `var(--font-${song.headerFont})` } : {}}
                  >
                    Listen
                  </h3>
                </div>
                <div className="md:col-span-2">
                  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 max-w-3xl">
                    <Link
                      href={`https://open.spotify.com/track/${song.spotifyId}`}
                      target="_blank"
                      onClick={() => {
                        if (typeof window !== "undefined" && window.fbq) {
                          window.fbq("track", "SongLinkClick");
                          window.fbq("track", "SongLinkClick_Spotify");
                        }
                      }}
                      className="flex items-center p-4 border border-black/15 dark:border-white/15 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                    >
                      <SpotifyLogo size={24} weight="fill" className="mr-3 text-green-600" />
                      <span className="text-sm font-medium">Spotify</span>
                    </Link>

                    {song.appleMusicLink && (
                      <Link
                        href={song.appleMusicLink}
                        target="_blank"
                        onClick={() => {
                          if (typeof window !== "undefined" && window.fbq) {
                            window.fbq("track", "SongLinkClick");
                            window.fbq("track", "SongLinkClick_AppleMusic");
                          }
                        }}
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
                        onClick={() => {
                          if (typeof window !== "undefined" && window.fbq) {
                            window.fbq("track", "SongLinkClick");
                            window.fbq("track", "SongLinkClick_YouTube");
                          }
                        }}
                        className="flex items-center p-4 border border-black/15 dark:border-white/15 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                      >
                        <YoutubeLogo size={24} weight="fill" className="mr-3 text-red-600" />
                        <span className="text-sm font-medium">YouTube</span>
                      </Link>
                    )}

                    {song.youtubeMusicLink && (
                      <Link
                        href={song.youtubeMusicLink}
                        target="_blank"
                        onClick={() => {
                          if (typeof window !== "undefined" && window.fbq) {
                            window.fbq("track", "SongLinkClick");
                            window.fbq("track", "SongLinkClick_YouTube");
                          }
                        }}
                        className="flex items-center p-4 border border-black/15 dark:border-white/15 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                      >
                        <YoutubeLogo
                          size={24}
                          weight="fill"
                          className="mr-3 text-white bg-red-600 rounded-full p-1"
                        />
                        <span className="text-sm font-medium">YouTube Music</span>
                      </Link>
                    )}

                    {song.amazonMusicLink && (
                      <Link
                        href={song.amazonMusicLink}
                        target="_blank"
                        onClick={() => {
                          if (typeof window !== "undefined" && window.fbq) {
                            window.fbq("track", "SongLinkClick");
                            window.fbq("track", "SongLinkClick_AmazonMusic");
                          }
                        }}
                        className="flex items-center p-4 border border-black/15 dark:border-white/15 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                      >
                        <AmazonLogo size={24} weight="fill" className="mr-3 text-red-600" />
                        <span className="text-sm font-medium">Amazon Music</span>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <CountdownTimer releaseDate={song.releaseDate} headerFont={song.headerFont} />
            )}
          </div>
        </section>

        {/* LYRICS */}
        {song.lyrics && (
          <section className="border-b border-black/10 dark:border-white/10">
            <div className="mx-auto max-w-6xl px-4 py-12 grid gap-6 md:grid-cols-3">
              <div>
                <h3
                  className="text-xl md:text-2xl font-bold"
                  style={song.headerFont ? { fontFamily: `var(--font-${song.headerFont})` } : {}}
                >
                  Lyrics
                </h3>
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
              <h3
                className="text-xl md:text-2xl font-bold"
                style={song.headerFont ? { fontFamily: `var(--font-${song.headerFont})` } : {}}
              >
                Credits
              </h3>
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
                href={songsHref}
                className="inline-flex items-center gap-2 border border-black/20 dark:border-white/20 px-6 py-3 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                ← All Songs
              </Link>
              <Link
                href={homeHref}
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
