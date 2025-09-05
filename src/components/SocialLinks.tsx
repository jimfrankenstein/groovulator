"use client";

import { InstagramLogoIcon, SpotifyLogoIcon, AppleLogoIcon, YoutubeLogoIcon, TiktokLogoIcon, EnvelopeSimpleIcon } from '@phosphor-icons/react';

type SocialPlatform = 'instagram' | 'spotify' | 'applemusic' | 'youtube' | 'tiktok' | 'email';

interface SocialLinksProps {
  links?: SocialPlatform[];
}

export default function SocialLinks({
    links,
  }: SocialLinksProps) {
  const socialLinks = [
    {
      id: 'instagram',
      name: 'Instagram',
      symbol: <InstagramLogoIcon size={20} className="text-black dark:text-white" />,
      href: 'https://instagram.com/groovulator',
      ariaLabel: 'Follow Groovulator on Instagram'
    },
    {
      id: 'spotify',
      name: 'Spotify',
      symbol: <SpotifyLogoIcon size={20} className="text-black dark:text-white" />,
      href: 'https://open.spotify.com/artist/groovulator',
      ariaLabel: 'Listen to Groovulator on Spotify'
    },
    {
      id: 'applemusic',
      name: 'Apple Music',
      symbol: <AppleLogoIcon size={20} className="text-black dark:text-white" />,
      href: 'https://music.apple.com/artist/groovulator',
      ariaLabel: 'Listen to Groovulator on Apple Music'
    },
    {
      id: 'youtube',
      name: 'YouTube',
      symbol: <YoutubeLogoIcon size={20} className="text-black dark:text-white" />,
      href: 'https://youtube.com/@groovulator',
      ariaLabel: 'Watch Groovulator on YouTube'
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      symbol: <TiktokLogoIcon size={20} className="text-black dark:text-white" />,
      href: 'https://tiktok.com/@groovulator',
      ariaLabel: 'Follow Groovulator on TikTok'
    },
    {
      id: 'email',
      name: 'Email',
      symbol: <EnvelopeSimpleIcon size={20} className="text-black dark:text-white" />,
      href: 'mailto:makecontact@groovulator.com?subject=I%20have%20been%20summoned%20by%20your%20spooky%20grooves',
      ariaLabel: 'Email Groovulator'
    }
  ] as const;

  return (
    <div className="flex gap-2">
      {socialLinks.map(link => (
        (!links || links.includes(link.id)) && (
          <a
            key={link.id}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full border border-black/20 dark:border-white/20 flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            aria-label={link.ariaLabel}
          >
            {link.symbol}
          </a>
        )
      ))}
    </div>
  );
}