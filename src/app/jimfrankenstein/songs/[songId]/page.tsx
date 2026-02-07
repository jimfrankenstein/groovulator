import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { songs } from "../songs";
import { collaborations } from "../../../collaborations/collaborations";
import { Song, ArtistConfig } from "@/app/constants/types";
import IndividualSongLayout from "@/components/IndividualSongLayout";
import { getCurrentArtistSlug, artistHref } from "@/lib/urls";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ songId: string }>;
}): Promise<Metadata> {
  const { songId } = await params;
  const allSongs = [...songs, ...collaborations];
  const song = allSongs.find(s => s.id === songId);

  return {
    title: song ? `${song.title} — Jim Frankenstein` : "Song Not Found",
    alternates: {
      canonical: `https://jimfrankenstein.com/songs/${songId}`,
    },
  };
}

export default async function SongPage({ params }: { params: Promise<{ songId: string }> }) {
  const { songId } = await params;
  const currentArtist = await getCurrentArtistSlug();

  const allSongs = [...songs, ...collaborations];
  const song: Song | undefined = allSongs.find(s => s.id === songId);

  if (!song) {
    notFound();
  }

  const artist: ArtistConfig = {
    name: "Jim Frankenstein",
    displayName: "JIM FRANKENSTEIN",
    slug: "jimfrankenstein",
    socialLinks: ["instagram", "spotify", "youtube", "email"],
    homeLink: artistHref(currentArtist, "jimfrankenstein"),
  };

  return (
    <IndividualSongLayout
      song={song}
      artist={artist}
      songsHref={artistHref(currentArtist, "jimfrankenstein", "/songs")}
      homeHref={artistHref(currentArtist, "jimfrankenstein")}
    />
  );
}
