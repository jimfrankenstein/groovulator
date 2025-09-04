"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { use } from "react";
import { songs } from "../songs";
import { Song } from "@/app/constants/types";
import { SpotifyLogo, AppleLogo, YoutubeLogo } from "@phosphor-icons/react";
import SongImage from "@/components/SongImage";

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
            <SongImage 
              songId={song.id}
              artist="jimfrankenstein"
              title={song.title}
              className="rounded-lg"
            />
          </div>
          <h1 className="text-4xl font-bold mb-4">{song.title}</h1>
          <p className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed">
            {song.description}
          </p>
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
        {song.lyrics && (
        <div className="bg-white/5 rounded-lg p-8 border border-white/20 mb-8">
          <h3 className="text-2xl font-semibold mb-6">Lyrics</h3>
            <div className="prose prose-invert max-w-none">{formatLyrics(song.lyrics)}</div>
          </div>
        )}

        {/* Credits */}
        <div className="bg-white/5 rounded-lg p-6 border border-white/20 mb-8">
          <h3 className="text-lg font-semibold mb-4">Credits</h3>
          {formatCredits(song.credits)}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Link
            href="/jimfrankenstein/songs"
            className="inline-block px-6 py-3 border border-white/20 rounded-lg hover:bg-white hover:text-[#18181b] transition-colors"
          >
            ← Back to Songs
          </Link>

          <Link
            href="/jimfrankenstein"
            className="inline-block px-6 py-3 border border-white/20 rounded-lg hover:bg-white hover:text-[#18181b] transition-colors"
          >
            Back to Artist
          </Link>
        </div>
      </div>
    </main>
  );
}