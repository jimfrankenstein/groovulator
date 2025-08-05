'use client';

import Image from "next/image";
import Link from "next/link";
import { SpotifyLogo, InstagramLogo, YoutubeLogo, TiktokLogo, Envelope } from "@phosphor-icons/react";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#18181b] text-white font-sans">
      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* Artist Image */}
        <div className="text-center mb-8">
          <Image
            src="/images/logo-with-color-small.png"
            alt="Ectophonic Groovulator"
            width={400}
            height={400}
            className="mx-auto mb-6"
            priority
          />
        </div>

        {/* Bio */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Ectophonic Groovulator</h1>
          <p className="text-lg text-white/80 leading-relaxed max-w-xl mx-auto">
            Ghost-powered music. Monsters, occult, cryptids, undead. Taxidermied heroes.
          </p>
        </div>

        {/* Social Media Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <a
            href="https://instagram.com/groovulator"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Groovulator on Instagram"
            className="flex flex-col items-center p-4 rounded-lg border border-white/20 hover:bg-white hover:text-[#18181b] transition-colors"
          >
            <InstagramLogo size={32} weight="fill" className="mb-2" />
            <span className="text-sm font-medium">Instagram</span>
          </a>

          <a
            href="https://www.tiktok.com/@groovulator"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Groovulator on TikTok"
            className="flex flex-col items-center p-4 rounded-lg border border-white/20 hover:bg-white hover:text-[#18181b] transition-colors"
          >
            <TiktokLogo size={32} weight="fill" className="mb-2" />
            <span className="text-sm font-medium">TikTok</span>
          </a>

          <a
            href="https://youtube.com/@groovulator"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Groovulator on YouTube"
            className="flex flex-col items-center p-4 rounded-lg border border-white/20 hover:bg-white hover:text-[#18181b] transition-colors"
          >
            <YoutubeLogo size={32} weight="fill" className="mb-2" />
            <span className="text-sm font-medium">YouTube</span>
          </a>

          <a
            href="mailto:makecontact@groovulator.com"
            aria-label="Email Groovulator"
            className="flex flex-col items-center p-4 rounded-lg border border-white/20 hover:bg-white hover:text-[#18181b] transition-colors"
          >
            <Envelope size={32} weight="fill" className="mb-2" />
            <span className="text-sm font-medium">Email</span>
          </a>
        </div>

        {/* Projects */}
        <div className="space-y-4 mb-12">
          <h3 className="text-xl font-semibold text-center mb-6">Projects</h3>
          
          <Link
            href="/jimfrankenstein"
            className="block p-4 bg-white text-black rounded-lg hover:bg-gray-100 transition-colors"
          >
            <p className="text-black text-center">Jim Frankenstein</p>
          </Link>
          
          <Link
            href="/theverybaddays"
            className="block p-4 bg-white text-black rounded-lg hover:bg-gray-100 transition-colors"
          >
            <p className="text-black text-center">The Very Bad Days</p>
          </Link>
        </div>
      </div>
    </main>
  );
}