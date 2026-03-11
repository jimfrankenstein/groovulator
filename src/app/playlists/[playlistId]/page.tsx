"use client";

import { notFound } from "next/navigation";
import { use } from "react";
import { playlists } from "../playlists";
import { Playlist, ArtistConfig } from "@/app/constants/types";
import IndividualPlaylistLayout from "@/components/IndividualPlaylistLayout";

export default function PlaylistPage({ params }: { params: Promise<{ playlistId: string }> }) {
  const { playlistId } = use(params);
  const playlist: Playlist | undefined = playlists.find(p => p.id === playlistId);

  if (!playlist) {
    notFound();
  }

  const artist: ArtistConfig = {
    name: "EctophonicGroovulator",
    displayName: "Ectophonic Groovulator",
    slug: "groovulator",
    socialLinks: ["instagram", "spotify", "youtube", "email"],
    homeLink: "/",
  };

  return <IndividualPlaylistLayout playlist={playlist} artist={artist} />;
}
