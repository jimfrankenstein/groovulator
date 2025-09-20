import { songs } from "./songs";
import { collaborations } from "../../collaborations/collaborations";
import SongsListLayout from "../../../components/SongsListLayout";
import { ArtistConfig } from "../../constants/types";

export default function JimFrankensteinSongsPage() {
  const allSongs = [
    ...songs.map(song => ({ ...song, artist: "Jim Frankenstein" })),
    ...collaborations.map(song => ({ ...song, artist: "Collaboration" })),
  ].sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());

  const artist: ArtistConfig = {
    name: "Jim Frankenstein",
    displayName: "JIM FRANKENSTEIN",
    slug: "jimfrankenstein",
    socialLinks: ["instagram", "spotify", "youtube", "email"],
  };

  return <SongsListLayout artist={artist} songs={allSongs} />;
}
