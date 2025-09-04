export interface Song {
  id: string;
  title: string;
  description: string;
  spotifyId: string;
  releaseDate: string;
  songType: "single" | "episode" | "track";
  appleMusicLink?: string;
  youtubeLink?: string;
  lyrics?: string;
  credits: string;
  album?: string;
  albumLink?: string;
  trackList?: number;
}
