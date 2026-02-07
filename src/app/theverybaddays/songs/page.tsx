import { songs } from "./songs";
import { collaborations } from "../../collaborations/collaborations";
import SongsListLayout from "../../../components/SongsListLayout";
import { ArtistConfig } from "../../constants/types";
import { getCurrentArtistSlug, artistHref } from "@/lib/urls";

export default async function TheVeryBadDaysSongsPage() {
  const currentArtist = await getCurrentArtistSlug();

  const allSongs = [
    ...songs.map(song => ({ ...song, artist: "The Very Bad Days" })),
    ...collaborations.map(song => ({ ...song, artist: "Collaboration" })),
  ].sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());

  const artist: ArtistConfig = {
    name: "The Very Bad Days",
    displayName: "THE VERY BAD DAYS",
    slug: "theverybaddays",
    socialLinks: ["instagram", "spotify", "youtube", "email"],
    homeLink: artistHref(currentArtist, "theverybaddays"),
  };

  return <SongsListLayout artist={artist} songs={allSongs} />;
}
