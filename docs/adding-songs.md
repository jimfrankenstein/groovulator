# Process for Adding New Songs to Groovulator

This document tracks the process for adding new songs to The Very Bad Days (or other artists) on the Groovulator site.

## Overview

Songs are added to the site by creating entries in the songs array and ensuring track art is in place.

## Steps to Add a New Song

### 1. Prepare Track Art

Track art should be placed in: `/public/images/{artist}/songs/{song-id}/`

Required image sizes:

- `track-art-256.jpg` (256x256)
- `track-art-512.jpg` (512x512)
- `track-art-1024.jpg` (1024x1024)

**Note:** The `song-id` should be the kebab-case version of the song title (e.g., "Establishment" becomes "establishment")

### 2. Add Song Entry to songs.ts

Location: `/src/app/{artist}/songs/songs.ts`

For The Very Bad Days: `/src/app/theverybaddays/songs/songs.ts`

### 3. Song Data Structure

Required fields:

```typescript
{
  id: string;                    // kebab-case version of title
  title: string;                 // Song title
  description: string;           // Description (can include HTML links)
  spotifyId: string;             // Spotify track ID (placeholder "TBD" if not available yet)
  releaseDate: string;           // Format: "YYYY-MM-DD"
  songType: "single" | "track";  // "single" for standalone, "track" for album tracks
  credits: string;               // Credits with \n for line breaks

  // Recommended: Add placeholder links (empty strings)
  appleMusicLink: string;        // "" as placeholder, update with full URL when available
  amazonMusicLink: string;       // "" as placeholder, update with full URL when available
  youtubeLink: string;           // "" as placeholder, update with full URL when available
  youtubeMusicLink: string;      // "" as placeholder, update with full URL when available
  lyrics?: string;               // Markdown formatted with #### headers
  album?: string;                // Album name (for tracks only)
  albumLink?: string;            // Spotify album link (for tracks only)
  trackList?: number;            // Track number on album (for tracks only)
  headerFont?: string;           // Custom font for headers
  collabArtists?: string[];      // Array of collaborating artist names
}
```

### 4. Formatting Guidelines

**Lyrics:**

- Use `#### ` prefix for section headers (Verse 1, Chorus, Bridge, etc.)
- Each line is a separate line in the string
- Empty lines create breaks
- Example:

```
lyrics: `#### Verse 1
Line one of verse
Line two of verse

#### Chorus
Chorus line one
Chorus line two`
```

**Credits:**

- Use `\n` for line breaks
- Example: `"Written by X\nRecorded by Y\nMixed by Z"`

**Description:**

- Can include HTML for links: `<a href='URL' target='_blank'>Text</a>`
- Keep concise but engaging

### 5. Handling Future Releases

- If release date is in the future, the site will show a countdown timer instead of streaming links
- You can preview streaming links by adding `?debug=true` to the URL
- Spotify ID must be present but can be a placeholder like `"TBD"` until the song is released
- **Best Practice:** Always add placeholder streaming links as empty strings (`""`) - this makes it easier to update them later and maintains consistent structure across all songs

### 6. Song Ordering

- Songs are displayed in the order they appear in the array
- Recent singles are typically at the top
- Album tracks are grouped together

---

## Example: Adding "Establishment" by The Very Bad Days

**Date:** February 6, 2026  
**Release Date:** February 13, 2026  
**Status:** Track art ✓ in place

### Data Entry:

```typescript
{
  id: "establishment",
  title: "Establishment",
  description: "A surreal love story that threatens the very fabric of reality itself.",
  spotifyId: "TBD", // To be updated when available
  releaseDate: "2026-02-13",
  songType: "single",
  appleMusicLink: "", // To be added when available
  amazonMusicLink: "", // To be added when available
  youtubeLink: "", // To be added when available
  youtubeMusicLink: "", // To be added when available
  lyrics: `[formatted lyrics]`,
  credits: "Written by Brian Reed, Daniel Goodroad\nVocals: Daniel Goodroad\nGuitar and Vocals: Brian Reed\nBass Guitar: Aric Bieganek\nRecorded by Brian Reed, Ectophonic Groovulator\nMix and Mastering Engineer: Jason Obergfoll",
}
```

---

## Checklist for Adding a Song

- [ ] Track art images created and placed in correct directory
- [ ] Song entry added to songs.ts
- [ ] All required fields filled in
- [ ] Placeholder streaming links added (empty strings)
- [ ] Lyrics formatted with #### headers
- [ ] Credits formatted with \n line breaks
- [ ] Release date in YYYY-MM-DD format
- [ ] Test song page loads correctly
- [ ] Test streaming links (or countdown timer for future releases)

---

## Notes

- Always add songs at the appropriate position in the array (usually recent singles at top)
- Double-check the song ID matches the directory name for track art
- Spotify ID can be found in the Spotify share URL after `/track/`
- Use "TBD" as placeholder for spotifyId if not yet available
- Run `npm run build` to verify no errors after adding a song
- The site automatically generates static pages for all songs at build time

## Testing

After adding a song:

1. Run `npm run build` to check for errors
2. Check the build output to confirm the song page is generated
3. Visit the song page URL: `https://theverybaddays.com/songs/{song-id}`
4. For future releases, add `?debug=true` to preview streaming links

## Common Issues

- **Spotify ID required:** Even for unreleased songs, include a placeholder like "TBD"
- **Lyrics formatting:** Always use backticks and #### for headers (not #, ##, or ###)
- **Credits line breaks:** Use `\n` not actual line breaks in the string
- **Track art missing:** Build will succeed but images won't display on site
- **"a[d] is not a function" error:** This is a Next.js cache issue. Clear cache with:
  ```bash
  rm -rf .next && rm -rf node_modules/.cache && npm run build
  ```
