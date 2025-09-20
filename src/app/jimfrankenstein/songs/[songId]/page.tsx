"use client";

import { notFound } from "next/navigation";
import { use } from "react";
import { songs } from "../songs";
import { collaborations } from "../../../collaborations/collaborations";
import { Song, ArtistConfig } from "@/app/constants/types";
import IndividualSongLayout from "@/components/IndividualSongLayout";

export default function SongPage({ params }: { params: Promise<{ songId: string }> }) {
  const { songId } = use(params);
  const allSongs = [...songs, ...collaborations];
  const song: Song | undefined = allSongs.find(s => s.id === songId);

  if (!song) {
    notFound();
  }

  // Format lyrics to convert markdown headers to HTML
  const formatLyrics = (lyrics: string) => {
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
  };

  // Format credits to handle line breaks
  const formatCredits = (credits: string) => {
    return credits.split("\n").map((line, index) => (
      <p key={index} className="">
        {line}
      </p>
    ));
  };

  const artist: ArtistConfig = {
    name: "Jim Frankenstein",
    displayName: "JIM FRANKENSTEIN",
    slug: "jimfrankenstein",
    socialLinks: ["instagram", "spotify", "youtube", "email"],
  };

  return (
    <IndividualSongLayout
      song={song}
      artist={artist}
      formatLyrics={formatLyrics}
      formatCredits={formatCredits}
    />
  );
}
