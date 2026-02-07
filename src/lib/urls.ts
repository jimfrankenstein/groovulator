// Domain-aware URL utilities for multi-domain routing.

import { DOMAIN_SLUG_MAP } from "@/app/constants/domains";

/**
 * Build a domain-aware href for an artist route.
 * Returns "/" (not "") when linking to the current artist's home.
 *
 * On theverybaddays.com: artistHref("theverybaddays", "theverybaddays", "/songs") → "/songs"
 * On groovulator.com:    artistHref("", "theverybaddays", "/songs") → "/theverybaddays/songs"
 */
export function artistHref(
  currentArtistSlug: string,
  targetSlug: string,
  path: string = ""
): string {
  if (currentArtistSlug === targetSlug) return path || "/";
  return `/${targetSlug}${path}`;
}

/**
 * Read the current artist slug from request headers. Server-only.
 * Tries x-artist-slug (set by middleware), falls back to host detection.
 */
export async function getCurrentArtistSlug(): Promise<string> {
  const { headers } = await import("next/headers");
  const headersList = await headers();

  const fromMiddleware = headersList.get("x-artist-slug");
  if (fromMiddleware) return fromMiddleware;

  // x-forwarded-host can be comma-separated behind proxies/CDNs
  const rawHost = headersList.get("x-forwarded-host") || headersList.get("host") || "";
  const host = rawHost.split(",")[0].trim();
  return DOMAIN_SLUG_MAP[host] || "";
}
