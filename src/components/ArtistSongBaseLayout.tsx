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

interface NavLink {
  label: string;
  href: string;
}

interface ArtistSongBaseLayoutProps {
  artist: ArtistConfig;
  children: React.ReactNode;
  navLinks?: NavLink[];
}

export default function ArtistSongBaseLayout({ artist, children, navLinks }: ArtistSongBaseLayoutProps) {
  // Use artist.homeLink if provided, otherwise fall back to artist slug path
  const headerLink = artist.homeLink || `/${artist.slug}`;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-black dark:text-white antialiased transition-colors">
      {/* HEADER */}
      <header className="border-b border-black/10 dark:border-black/10 dark:border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-6 flex items-center justify-between">
          <Link
            href={headerLink}
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
      <footer className="dark bg-gray-950 text-white py-10">
        <div className="mx-auto max-w-6xl px-4 grid gap-6 md:grid-cols-2 items-start">
          <div className="order-2 md:order-1 text-center md:text-left">
            {navLinks && navLinks.length > 0 && (
              <div className="flex flex-wrap gap-3 mb-4 justify-center md:justify-start">
                {navLinks.map(link => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="inline-flex items-center gap-2 border border-white/20 px-5 py-2 text-sm font-medium hover:bg-white/5 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
            <div className="text-sm opacity-70">
              <span>
                © {new Date().getFullYear()} {artist.name}. All rights reserved.
              </span>
              <br />
              <span>Minneapolis, MN</span>
            </div>
          </div>
          <div className="order-1 md:order-2 flex gap-2 justify-center md:justify-end items-center text-sm">
            <SocialLinks entity={artist.slug} links={[...artist.socialLinks]} />
            <DarkModeToggle />
          </div>
        </div>
      </footer>
    </div>
  );
}
