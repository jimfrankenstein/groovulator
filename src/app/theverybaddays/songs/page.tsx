import { songs } from "./songs";
import { collaborations } from "../../collaborations/collaborations";
import SongsListLayout from "../../../components/SongsListLayout";
import { ArtistConfig } from "../../constants/types";

export default function TheVeryBadDaysSongsPage() {
  const allSongs = [
    ...songs.map(song => ({ ...song, artist: "The Very Bad Days" })),
    ...collaborations.map(song => ({ ...song, artist: "Collaboration" })),
  ].sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());

  const artist: ArtistConfig = {
    name: "The Very Bad Days",
    displayName: "THE VERY BAD DAYS",
    slug: "theverybaddays",
    socialLinks: ["instagram", "spotify", "youtube", "email"],
  };

  return <SongsListLayout artist={artist} songs={allSongs} />;
}
