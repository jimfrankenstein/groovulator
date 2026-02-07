/**
 * Domain-aware URL utilities for multi-domain routing.
 *
 * The middleware sets an `x-artist-slug` request header that tells us
 * which artist domain (if any) the current request is coming from.
 * These utilities use that value to build correct relative paths so
 * links stay within the current host.
 */

/**
 * Build a domain-aware href for an artist route.
 * Always returns a valid path (never an empty string).
 *
 * @param currentArtistSlug - The x-artist-slug header value ("" on groovulator/localhost)
 * @param targetSlug - The artist slug to link to ("theverybaddays" | "jimfrankenstein")
 * @param path - Optional sub-path (e.g., "/songs", "/songs/devils-door")
 * @returns A root-relative href string (e.g., "/", "/songs", "/theverybaddays/songs")
 *
 * @example
 * // On theverybaddays.com (currentArtistSlug = "theverybaddays"):
 * artistHref("theverybaddays", "theverybaddays", "/songs")  // → "/songs"
 * artistHref("theverybaddays", "theverybaddays")             // → "/"
 * artistHref("theverybaddays", "jimfrankenstein", "/songs")   // → "/jimfrankenstein/songs"
 *
 * @example
 * // On groovulator.com or localhost (currentArtistSlug = ""):
 * artistHref("", "theverybaddays", "/songs")  // → "/theverybaddays/songs"
 * artistHref("", "theverybaddays")            // → "/theverybaddays"
 */
export function artistHref(
  currentArtistSlug: string,
  targetSlug: string,
  path: string = ""
): string {
  // On the target artist's own domain: no prefix needed
  if (currentArtistSlug === targetSlug) {
    return path || "/";
  }
  // On groovulator.com, localhost, or a different artist's domain: prefix with slug
  return `/${targetSlug}${path}`;
}

/**
 * Read the current artist slug from Next.js request headers.
 * Convenience wrapper to avoid repeating header access boilerplate.
 *
 * Must be called from a Server Component or generateMetadata — not from
 * client components (use props passed from a parent server component instead).
 */
export async function getCurrentArtistSlug(): Promise<string> {
  const { headers } = await import("next/headers");
  const headersList = await headers();
  return headersList.get("x-artist-slug") || "";
}
