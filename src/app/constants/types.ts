export interface Song {
  id: string;
  title: string;
  description: string;
  spotifyId: string;
  releaseDate: string;
  appleMusicLink?: string;
  youtubeLink?: string;
  lyrics: string;
  credits: string;
  album?: string;
  albumLink?: string;
}
