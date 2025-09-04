"use client";

import Image from "next/image";
import Link from "next/link";
import {
  SpotifyLogo,
  InstagramLogo,
  FacebookLogo,
  YoutubeLogo,
  Envelope,
} from "@phosphor-icons/react";

export default function JimFrankensteinPage() {
  return (
    <main className="min-h-screen bg-[#18181b] text-white font-sans">
      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* Artist Image */}
        <div className="text-center mb-8">
          <Image
            src="/images/jimfrankenstein/profile-square.jpg"
            alt="Jim Frankenstein"
            width={400}
            height={400}
            className="rounded-full mx-auto mb-6"
            priority
          />
        </div>

        {/* Bio */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Jim Frankenstein</h1>
          <p className="text-lg text-white/80 leading-relaxed max-w-xl mx-auto">
            Spooky musical man • Minneapolis bassist and performer
          </p>
        </div>

        {/* Social Media Links */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
          <a
            href="https://open.spotify.com/artist/09Pna9M8cfCtPdAkF3PfLb?si=NXeZg63GQxqa4tA_iijA1g"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Jim Frankenstein on Spotify"
            className="flex flex-col items-center p-4 rounded-lg border border-white/20 hover:bg-white hover:text-[#18181b] transition-colors"
          >
            <SpotifyLogo size={32} weight="fill" className="mb-2" />
            <span className="text-sm font-medium">Spotify</span>
          </a>

          <a
            href="https://instagram.com/jimfrankenstein"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Jim Frankenstein on Instagram"
            className="flex flex-col items-center p-4 rounded-lg border border-white/20 hover:bg-white hover:text-[#18181b] transition-colors"
          >
            <InstagramLogo size={32} weight="fill" className="mb-2" />
            <span className="text-sm font-medium">Instagram</span>
          </a>

          <a
            href="https://facebook.com/jimfrankenstein"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Jim Frankenstein on Facebook"
            className="flex flex-col items-center p-4 rounded-lg border border-white/20 hover:bg-white hover:text-[#18181b] transition-colors"
          >
            <FacebookLogo size={32} weight="fill" className="mb-2" />
            <span className="text-sm font-medium">Facebook</span>
          </a>

          <a
            href="https://youtube.com/@jimfrankenstein"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Jim Frankenstein on YouTube"
            className="flex flex-col items-center p-4 rounded-lg border border-white/20 hover:bg-white hover:text-[#18181b] transition-colors"
          >
            <YoutubeLogo size={32} weight="fill" className="mb-2" />
            <span className="text-sm font-medium">YouTube</span>
          </a>

          <a
            href="mailto:jim@jimfrankenstein.com"
            aria-label="Email Jim Frankenstein"
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
            href="https://youtu.be/RaEekujTv6E?si=ykRTArNZpbXAZMWh"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Spooky Song lyric video on YouTube"
            className="block p-4 bg-white text-black rounded-lg hover:bg-gray-100 transition-colors"
          >
            <p className="text-black text-center">Spooky Song | Lyric Video | Youtube</p>
          </a>

          <a
            href="https://open.spotify.com/track/6Tvka4hgnheKaOc8gOC55k?si=7dad26058c60451f"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Spooky Song on Spotify"
            className="block p-4 bg-white text-black rounded-lg hover:bg-gray-100 transition-colors"
          >
            <p className="text-black text-center">Spooky Song | Spotify</p>
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
            href="https://open.spotify.com/track/3hN4CwbdkzFYXdlXsmI6Ru?si=09523d9636b14671"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Weird song on Spotify"
            className="block p-4 bg-white text-black rounded-lg hover:bg-gray-100 transition-colors"
          >
            <p className="text-black text-center">Weird (the song you liked on Resso)</p>
          </a>

          <a
            href="https://open.spotify.com/album/6270AFuOn3qlgGMxIjbrQT?si=AjXkua3CSzScGGb8oxbwUw"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Souls and Ghosts album on Spotify"
            className="block p-4 bg-white text-black rounded-lg hover:bg-gray-100 transition-colors"
          >
            <p className="text-black text-center">Full-length Album | Souls and Ghosts</p>
          </a>

          <a
            href="https://open.spotify.com/album/15fRdFoEfLToMIHjgr3T9c?si=nrfe09Z2QBWP2eeLUplJFw"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="You Call This an Apocalypse album on Spotify"
            className="block p-4 bg-white text-black rounded-lg hover:bg-gray-100 transition-colors"
          >
            <p className="text-black text-center">
              The Very Bad Days | You Call This an Apocalypse?
            </p>
          </a>

          <a
            href="https://instagram.com/theverybaddays"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="The Very Bad Days on Instagram"
            className="block p-4 bg-white text-black rounded-lg hover:bg-gray-100 transition-colors"
          >
            <p className="text-black text-center">The Very Bad Days (my band)</p>
          </a>

          <Link
            href="/jimfrankenstein/songs"
            aria-label="View Jim Frankenstein songs"
            className="block p-4 bg-white text-black rounded-lg hover:bg-gray-100 transition-colors"
          >
            <p className="text-black text-center">View Songs</p>
          </Link>
        </div>
      </div>
    </main>
  );
}
