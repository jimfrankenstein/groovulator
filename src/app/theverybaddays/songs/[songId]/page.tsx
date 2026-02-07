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
    title: song ? `${song.title} — The Very Bad Days` : "Song Not Found",
    alternates: {
      canonical: `https://theverybaddays.com/songs/${songId}`,
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
    name: "The Very Bad Days",
    displayName: "THE VERY BAD DAYS",
    slug: "theverybaddays",
    socialLinks: ["instagram", "spotify", "youtube", "email"],
    homeLink: artistHref(currentArtist, "theverybaddays"),
  };

  return (
    <IndividualSongLayout
      song={song}
      artist={artist}
      songsHref={artistHref(currentArtist, "theverybaddays", "/songs")}
      homeHref={artistHref(currentArtist, "theverybaddays")}
    />
  );
}
