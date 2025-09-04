"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { use } from "react";
import { songs } from "../songs";
import { Song } from "@/app/constants/types";
import { SpotifyLogo, AppleLogo, YoutubeLogo } from "@phosphor-icons/react";

export default function SongPage({ params }: { params: Promise<{ songId: string }> }) {
  const { songId } = use(params);
  const song: Song | undefined = songs.find(s => s.id === songId);

  if (!song) {
    notFound();
  }

  // Format lyrics to convert markdown headers to HTML
  const formatLyrics = (lyrics: string) => {
    return lyrics.split("\n").map((line, index) => {
      if (line.startsWith("#### ")) {
        return (
          <h4 key={index} className="text-lg font-semibold text-white/90 mt-6 mb-2 first:mt-0">
            {line.substring(4)}
          </h4>
        );
      }
      if (line.trim() === "") {
        return <br key={index} />;
      }
      return (
        <p key={index} className="text-white/80 leading-relaxed mb-1">
          {line}
        </p>
      );
    });
  };

  // Format credits to handle line breaks
  const formatCredits = (credits: string) => {
    return credits.split("\n").map((line, index) => (
      <p key={index} className="text-white/70 text-sm">
        {line}
      </p>
    ));
  };

  return (
    <main className="min-h-screen bg-[#18181b] text-white font-sans">
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Header with Album Art */}
        <div className="text-center mb-8">
          <div className="mb-8">
            <picture className="block max-w-md mx-auto">
              <source
                srcSet={`/images/theverybaddays/songs/${song.id}/track-art-1024.avif 1024w,
                        /images/theverybaddays/songs/${song.id}/track-art-512.avif 512w,
                        /images/theverybaddays/songs/${song.id}/track-art-256.avif 256w`}
                sizes="(max-width: 256px) 256px,
                      (max-width: 512px) 512px,
                      1024px"
                type="image/avif"
              />
              <source
                srcSet={`/images/theverybaddays/songs/${song.id}/track-art-1024.webp 1024w,
                        /images/theverybaddays/songs/${song.id}/track-art-512.webp 512w,
                        /images/theverybaddays/songs/${song.id}/track-art-256.webp 256w`}
                sizes="(max-width: 256px) 256px,
                      (max-width: 512px) 512px,
                      1024px"
                type="image/webp"
              />
              <source
                srcSet={`/images/theverybaddays/songs/${song.id}/track-art-1024.jpg 1024w,
                        /images/theverybaddays/songs/${song.id}/track-art-512.jpg 512w,
                        /images/theverybaddays/songs/${song.id}/track-art-256.jpg 256w`}
                sizes="(max-width: 256px) 256px,
                      (max-width: 512px) 512px,
                      1024px"
                type="image/jpeg"
              />
              <img
                className="w-full h-auto rounded-lg shadow-lg"
                src={`/images/theverybaddays/songs/${song.id}/track-art-512.jpg`}
                alt={`Track art for ${song.title}`}
              />
            </picture>
          </div>
          <h1 className="text-4xl font-bold mb-4">{song.title}</h1>
          <p className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed">
            {song.description}
          </p>
          {song.album && (
            <p className="text-lg text-white/60 mt-2">
              from <em>{song.album}</em>
            </p>
          )}
        </div>

        {/* Album Link (only if applicable) */}
        {song.albumLink && (
          <div className="text-center mb-8">
            <Link
              href={song.albumLink}
              target="_blank"
              className="inline-block px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-semibold transition-colors"
            >
              View Album
            </Link>
          </div>
        )}

        {/* Streaming Links */}
        <div className="flex flex-col gap-4 mb-12 max-w-md mx-auto">
          <Link
            href={`https://open.spotify.com/track/${song.spotifyId}`}
            target="_blank"
            className="flex items-center p-4 rounded-lg bg-white text-black hover:bg-gray-100 transition-colors"
          >
                              <SpotifyLogo size={24} weight="fill" className="mr-3" />
            <span className="text-sm font-medium">Listen on Spotify</span>
          </Link>

          {song.appleMusicLink && (
            <Link
              href={song.appleMusicLink}
              target="_blank"
              className="flex items-center p-4 rounded-lg bg-white text-black hover:bg-gray-100 transition-colors"
            >
                                <AppleLogo size={24} weight="fill" className="mr-3" />
              <span className="text-sm font-medium">Listen on Apple Music</span>
            </Link>
          )}

          {song.youtubeLink && (
            <Link
              href={song.youtubeLink}
              target="_blank"
              className="flex items-center p-4 rounded-lg bg-white text-black hover:bg-gray-100 transition-colors"
            >
                                <YoutubeLogo size={24} weight="fill" className="mr-3" />
              <span className="text-sm font-medium">Listen on YouTube</span>
            </Link>
          )}
        </div>

        {/* Lyrics */}
        <div className="bg-white/5 rounded-lg p-8 border border-white/20 mb-8">
          <h3 className="text-2xl font-semibold mb-6">Lyrics</h3>
          <div className="prose prose-invert max-w-none">{formatLyrics(song.lyrics)}</div>
        </div>

        {/* Credits */}
        <div className="bg-white/5 rounded-lg p-6 border border-white/20 mb-8">
          <h3 className="text-lg font-semibold mb-4">Credits</h3>
          {formatCredits(song.credits)}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Link
            href="/theverybaddays/songs"
            className="inline-block px-6 py-3 border border-white/20 rounded-lg hover:bg-white hover:text-[#18181b] transition-colors"
          >
            ← Back to Songs
          </Link>

          <Link
            href="/theverybaddays"
            className="inline-block px-6 py-3 border border-white/20 rounded-lg hover:bg-white hover:text-[#18181b] transition-colors"
          >
            Back to Band
          </Link>
        </div>
      </div>
    </main>
  );
}
