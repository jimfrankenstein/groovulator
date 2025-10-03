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

  // Format about section to handle HTML content
  const formatAbout = (about: string) => {
    return <div dangerouslySetInnerHTML={{ __html: about }} />;
  };

  const artist: ArtistConfig = {
    name: "Groovulator",
    displayName: "GROOVULATOR",
    slug: "groovulator",
    socialLinks: ["instagram", "spotify", "youtube", "email"],
  };

  return <IndividualPlaylistLayout playlist={playlist} artist={artist} formatAbout={formatAbout} />;
}
