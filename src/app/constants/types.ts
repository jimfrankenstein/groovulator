export interface Song {
  id: string;
  title: string;
  collabArtists?: string[];
  description: string;
  spotifyId: string;
  releaseDate: string;
  songType: "single" | "episode" | "track";
  appleMusicLink?: string;
  amazonMusicLink?: string;
  youtubeLink?: string;
  youtubeMusicLink?: string;
  lyrics?: string;
  credits: string;
  album?: string;
  albumLink?: string;
  trackList?: number;
  headerFont?: string; // Custom font for song page headers
}

// Shared types for artist and social platform configurations
export type SocialPlatform =
  | "instagram"
  | "spotify"
  | "applemusic"
  | "youtube"
  | "tiktok"
  | "email";
export type ArtistSlug = "jimfrankenstein" | "theverybaddays" | "groovulator";

export interface ArtistConfig {
  name: string;
  displayName: string;
  slug: ArtistSlug;
  socialLinks: readonly SocialPlatform[];
}

export interface Playlist {
  id: string;
  title: string;
  description: string;
  spotifyId?: string;
  appleMusicLink?: string;
  youtubeLink?: string;
  youtubeMusicLink?: string;
  about: string;
  headerFont?: string; // Custom font for playlist page headers
}
