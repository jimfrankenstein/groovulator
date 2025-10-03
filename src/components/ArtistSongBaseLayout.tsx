/**
 * ArtistSongBaseLayout - Base layout wrapper for all artist song-related pages
 *
 * This is the foundational layout component that provides:
 * - Consistent header with artist branding, social links, and dark mode toggle
 * - Consistent footer with copyright and social links
 * - Base page structure (background colors, dark mode support, etc.)
 *
 * Used by:
 * - IndividualSongLayout (for /artist/songs/[songId] pages)
 * - SongsListLayout (for /artist/songs pages)
 *
 * This component handles the common structure while allowing specialized
 * layouts to provide their own content via the children prop.
 */

import Link from "next/link";
import DarkModeToggle from "./DarkModeToggle";
import SocialLinks from "./SocialLinks";
import { ArtistConfig } from "@/app/constants/types";

interface ArtistSongBaseLayoutProps {
  artist: ArtistConfig;
  children: React.ReactNode;
  homeLink?: string; // Optional override for header link
}

export default function ArtistSongBaseLayout({
  artist,
  children,
  homeLink,
}: ArtistSongBaseLayoutProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-black dark:text-white antialiased transition-colors">
      {/* HEADER */}
      <header className="border-b border-black/10 dark:border-black/10 dark:border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-6 flex items-center justify-between">
          <Link
            href={homeLink || `/${artist.slug}`}
            className="font-black tracking-tight text-xl hover:text-pink-500 active:text-pink-700 dark:hover:text-yellow-300 dark:active:text-yellow-300/80 transition-colors"
          >
            {artist.displayName}
          </Link>
          <div className="flex gap-2">
            <SocialLinks entity={artist.slug} links={[...artist.socialLinks]} />
            <DarkModeToggle />
          </div>
        </div>
      </header>

      {children}

      {/* FOOTER */}
      <footer className="py-10">
        <div className="mx-auto max-w-6xl px-4 grid gap-6 md:grid-cols-2 items-end">
          <div className="text-sm opacity-70">
            <span>
              © {new Date().getFullYear()} {artist.name}. All rights reserved.
            </span>
            <br />
            <span>Minneapolis, MN</span>
          </div>
          <div className="flex gap-2 justify-start md:justify-end items-center text-sm">
            <SocialLinks entity={artist.slug} links={[...artist.socialLinks]} />
            <DarkModeToggle />
          </div>
        </div>
      </footer>
    </div>
  );
}
