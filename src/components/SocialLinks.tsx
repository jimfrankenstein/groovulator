"use client";

import { InstagramLogoIcon, SpotifyLogoIcon, AppleLogoIcon, YoutubeLogoIcon, TiktokLogoIcon, EnvelopeSimpleIcon } from '@phosphor-icons/react';
import { SOCIAL_LINKS } from '@/app/constants/consts';

type SocialPlatform = 'instagram' | 'spotify' | 'applemusic' | 'youtube' | 'tiktok' | 'email';
type EntityName = keyof typeof SOCIAL_LINKS;

interface SocialLink {
  platform: SocialPlatform;
  href: string;
}

interface SocialLinksProps {
  entity?: EntityName;
  links?: SocialPlatform[] | SocialLink[];
}

export default function SocialLinks({
    entity = 'groovulator',
    links,
  }: SocialLinksProps) {
  // Get social links for the specified entity
  const entitySocialLinks = SOCIAL_LINKS[entity];

  const platformIcons = {
    instagram: <InstagramLogoIcon size={16} className="text-black dark:text-white" />,
    spotify: <SpotifyLogoIcon size={16} className="text-black dark:text-white" />,
    applemusic: <AppleLogoIcon size={16} className="text-black dark:text-white" />,
    youtube: <YoutubeLogoIcon size={16} className="text-black dark:text-white" />,
    tiktok: <TiktokLogoIcon size={16} className="text-black dark:text-white" />,
    email: <EnvelopeSimpleIcon size={16} className="text-black dark:text-white" />
  };

  // Determine which links to show and their URLs
  let linksToShow: { platform: SocialPlatform; href: string; label: string; }[] = [];

  if (!links) {
    // Show all links for this entity
    linksToShow = Object.entries(entitySocialLinks).map(([platform, { href, label }]) => ({
      platform: platform as SocialPlatform,
      href,
      label
    }));
  } else if (typeof links[0] === 'string') {
    // Array of platform names - use entity URLs
    const platformArray = links as SocialPlatform[];
    linksToShow = platformArray.map(platform => ({
      platform,
      href: entitySocialLinks[platform].href,
      label: entitySocialLinks[platform].label
    }));
  } else {
    // Array of custom link objects
    const customLinks = links as { platform: SocialPlatform; href: string; label?: string; }[];
    linksToShow = customLinks.map(link => ({
      platform: link.platform,
      href: link.href,
      label: link.label || entitySocialLinks[link.platform].label
    }));
  }

  return (
    <div className="flex gap-2">
      {linksToShow.map(({ platform, href, label }) => (
        <a
          key={platform}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="w-8 h-8 rounded-full border border-black/20 dark:border-white/20 flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          aria-label={label || `${platform} link`}
        >
          {platformIcons[platform]}
        </a>
      ))}
    </div>
  );
}