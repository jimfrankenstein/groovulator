# Process for Adding Playlist Links to Groovulator

This document describes how to add streaming platform links to playlists on the Groovulator site.

## Overview

Playlists can have links to multiple streaming platforms: Spotify, Apple Music, YouTube, and YouTube Music. These links appear on the individual playlist pages.

## File Locations

- **Playlist data**: `/src/app/playlists/playlists.ts`
- **Playlist layout component**: `/src/components/IndividualPlaylistLayout.tsx`
- **Type definitions**: `/src/app/constants/types.ts`

## Supported Streaming Platforms

The `Playlist` interface supports these streaming platform fields:

```typescript
export interface Playlist {
  id: string;
  hasMerchTable?: boolean;
  title: string;
  description: string;
  spotifyId?: string; // Spotify playlist ID (just the ID, not full URL)
  appleMusicLink?: string; // Full Apple Music URL
  youtubeLink?: string; // Full YouTube URL
  youtubeMusicLink?: string; // Full YouTube Music URL
  about: string;
  headerFont?: string;
}
```

## Steps to Add a Streaming Link

### 1. Add the Link to playlists.ts

Open `/src/app/playlists/playlists.ts` and find the playlist you want to update.

Add the appropriate field to the playlist object:

```typescript
{
  id: "halloween-bone-skeletons",
  title: "Bone Skeleton Music Songs",
  description: "...",
  spotifyId: "6fAukc4ibGBEUqoIsYdbRV",  // Just the ID for Spotify
  appleMusicLink: "https://music.apple.com/us/playlist/bone-skeleton-music-songs-ectophonic-spooky-rock-punk/pl.u-DdAN8l3T0ZNpBYE",
  youtubeLink: "https://youtube.com/playlist?list=PLJbrImz6To6FCLut4CTwv59wc1hJI_pKo",
  youtubeMusicLink: "https://music.youtube.com/playlist?list=PLJbrImz6To6FCLut4CTwv59wc1hJI_pKo",
  about: "...",
}
```

**Important notes:**

- **Spotify**: Use only the playlist ID, not the full URL (e.g., `6fAukc4ibGBEUqoIsYdbRV`)
- **Other platforms**: Use the complete URL including `https://`

### 2. Update the Component (if needed)

If you're adding a new streaming platform that isn't already supported, you'll need to update `/src/components/IndividualPlaylistLayout.tsx`:

1. Import the appropriate icon from `@phosphor-icons/react`
2. Add a new conditional rendering block in the streaming links section

Example for Apple Music:

```typescript
import { SpotifyLogo, YoutubeLogo, AppleLogo } from "@phosphor-icons/react";

// In the streaming links section:
{playlist.appleMusicLink && (
  <Link
    href={playlist.appleMusicLink}
    target="_blank"
    onClick={() => {
      if (typeof window !== "undefined" && window.fbq) {
        window.fbq("track", "PlaylistLinkClick");
        window.fbq("track", "PlaylistLinkClick_AppleMusic");
      }
    }}
    className="flex items-center p-4 border border-black/15 dark:border-white/15 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
  >
    <AppleLogo
      size={24}
      weight="fill"
      className="mr-3"
      style={{ color: "#FA243C" }}
    />
    <span className="text-sm font-medium">Apple Music</span>
  </Link>
)}
```

### 3. Verify the Changes

1. Run the dev server: `npm run dev`
2. Navigate to the playlist page: `http://localhost:3000/playlists/{playlist-id}`
3. Verify that the new link appears in the "Listen" section
4. Click the link to ensure it goes to the correct destination

### 4. Build and Deploy

1. Run a production build to verify no errors: `npm run build`
2. Deploy the changes to production

## Platform-Specific Notes

### Spotify

- Only requires the playlist ID, not the full URL
- The component constructs the full URL: `https://open.spotify.com/playlist/${playlist.spotifyId}`
- Find the ID in the Spotify URL after `/playlist/`

### Apple Music

- Requires the full URL
- Apple Music URLs are typically very long with the format: `https://music.apple.com/{country}/playlist/{name}/{playlist-id}`

### YouTube

- Use the full playlist URL
- Regular YouTube format: `https://youtube.com/playlist?list={LIST_ID}`

### YouTube Music

- Use the full playlist URL
- YouTube Music format: `https://music.youtube.com/playlist?list={LIST_ID}`
- Often shares the same playlist ID as regular YouTube

## Common Mistakes to Avoid

❌ Using full Spotify URL instead of just the ID  
✅ Extract only the playlist ID for `spotifyId` field

❌ Forgetting `https://` for non-Spotify platforms  
✅ Always include the full URL with protocol

❌ Not testing the link after adding  
✅ Always verify links work in both dev and production

## Troubleshooting

**Link not showing up on the page:**

- Check that the field name matches exactly in `playlists.ts` and `IndividualPlaylistLayout.tsx`
- Verify the component has a conditional rendering block for that platform
- Check the dev server console for TypeScript errors

**Link goes to wrong destination:**

- Verify the URL is complete and correct
- For Spotify, ensure you're using just the ID, not the full URL
- Check for typos in the URL string

**Icon not displaying:**

- Verify the icon is imported from `@phosphor-icons/react`
- Check that the icon component name is correct (e.g., `AppleLogo` not `AppleIcon`)
- Ensure the icon has appropriate size and styling props
