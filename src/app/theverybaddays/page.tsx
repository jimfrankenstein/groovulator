'use client';

import Image from "next/image";
import { SpotifyLogo, InstagramLogo, FacebookLogo, YoutubeLogo, Envelope } from "@phosphor-icons/react";

export default function TheVeryBadDaysPage() {
  return (
    <main className="min-h-screen bg-[#18181b] text-white font-sans">
      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* Band Image */}
        <div className="text-center mb-8">
          <Image
            src="/images/theverybaddays/profile-square.jpg"
            alt="The Very Bad Days"
            width={400}
            height={400}
            className="rounded-full mx-auto mb-6"
            priority
          />
        </div>

        {/* Bio */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">The Very Bad Days</h1>
          <p className="text-lg text-white/80 leading-relaxed max-w-xl mx-auto mb-4">
            Grim humor grunge rock Ghostbusters • Minneapolis, MN
          </p>
        </div>

        {/* Social Media Links */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
          <a
            href="https://open.spotify.com/artist/2dIRQutExUe2Q9guDq4CAH?si=lbwIdQf7Q5mG2YI5Wchmkw"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="The Very Bad Days on Spotify"
            className="flex flex-col items-center p-4 rounded-lg border border-white/20 hover:bg-white hover:text-[#18181b] transition-colors"
          >
            <SpotifyLogo size={32} weight="fill" className="mb-2" />
            <span className="text-sm font-medium">Spotify</span>
          </a>

          <a
            href="https://instagram.com/theverybaddays"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="The Very Bad Days on Instagram"
            className="flex flex-col items-center p-4 rounded-lg border border-white/20 hover:bg-white hover:text-[#18181b] transition-colors"
          >
            <InstagramLogo size={32} weight="fill" className="mb-2" />
            <span className="text-sm font-medium">Instagram</span>
          </a>

          <a
            href="https://facebook.com/theverybaddays"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="The Very Bad Days on Facebook"
            className="flex flex-col items-center p-4 rounded-lg border border-white/20 hover:bg-white hover:text-[#18181b] transition-colors"
          >
            <FacebookLogo size={32} weight="fill" className="mb-2" />
            <span className="text-sm font-medium">Facebook</span>
          </a>

          <a
            href="https://youtube.com/@theverybaddays"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="The Very Bad Days on YouTube"
            className="flex flex-col items-center p-4 rounded-lg border border-white/20 hover:bg-white hover:text-[#18181b] transition-colors"
          >
            <YoutubeLogo size={32} weight="fill" className="mb-2" />
            <span className="text-sm font-medium">YouTube</span>
          </a>

          <a
            href="mailto:press@theverybaddays.com"
            aria-label="Email The Very Bad Days"
            className="flex flex-col items-center p-4 rounded-lg border border-white/20 hover:bg-white hover:text-[#18181b] transition-colors"
          >
            <Envelope size={32} weight="fill" className="mb-2" />
            <span className="text-sm font-medium">Email</span>
          </a>
        </div>

        {/* Music Links */}
        <div className="space-y-4 mb-12">
          <h3 className="text-xl font-semibold text-center mb-6">Music & Links</h3>
          
          <a
            href="https://open.spotify.com/playlist/5uhuvVfRzb632ZgZKDL0pz?si=71e2b64de9ee4469"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="The Very Bad Days playlist on Spotify"
            className="block p-4 bg-white text-black rounded-lg hover:bg-gray-100 transition-colors"
          >
            <p className="text-black text-center">Find our newest tunes at the top of this playlist</p>
          </a>

          <a
            href="https://theverybaddays.bandcamp.com/yum"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Redeem download code on Bandcamp"
            className="block p-4 bg-white text-black rounded-lg hover:bg-gray-100 transition-colors"
          >
            <p className="text-black text-center">Redeem Download Code</p>
          </a>

          <a
            href="/woodman"
            aria-label="Woodman read-along story"
            className="block p-4 bg-white text-black rounded-lg hover:bg-gray-100 transition-colors"
          >
            <p className="text-black text-center">Woodman Read-Along Story!</p>
          </a>

          <a
            href="https://youtu.be/1p9DazyMazY?si=yWB5VSsebKAW3MKC"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Here There Be Monsters lyric video on YouTube"
            className="block p-4 bg-white text-black rounded-lg hover:bg-gray-100 transition-colors"
          >
            <p className="text-black text-center">Here There Be Monsters | Lyric Video | Youtube</p>
          </a>

          <a
            href="https://www.youtube.com/playlist?list=PLdDD0nxJDFiod72KGwnTh14xKRRJ0wshv"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="The Very Bad Days videos playlist on YouTube"
            className="block p-4 bg-white text-black rounded-lg hover:bg-gray-100 transition-colors"
          >
            <p className="text-black text-center">Videos</p>
          </a>

          <a
            href="mailto:press@theverybaddays.com"
            aria-label="Book The Very Bad Days"
            className="block p-4 bg-white text-black rounded-lg hover:bg-gray-100 transition-colors"
          >
            <p className="text-black text-center">Book the Band</p>
          </a>

          <a
            href="/theverybaddays/songs"
            aria-label="View The Very Bad Days songs"
            className="block p-4 bg-white text-black rounded-lg hover:bg-gray-100 transition-colors"
          >
            <p className="text-black text-center">View Songs</p>
          </a>
        </div>

      </div>
    </main>
  );
} 