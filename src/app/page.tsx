import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#18181b] text-white font-sans">
      <div className="w-full max-w-xl px-6 py-24 flex flex-col items-center text-center">
        <Image
          src="/images/logo-with-color-small.png"
          alt="Ectophonic Groovulator"
          width={400}
          height={200}
          className="mb-6"
          priority
        />
        <p className="text-lg md:text-2xl mb-10 text-white/80 font-light">
          Ghost-powered music.<br />
          Monsters, occult, cryptids, undead.<br />
          Taxidermied heroes.
        </p>
        <div className="flex gap-6 mt-8">
          <a
            href="https://instagram.com/groovulator"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-5 py-2 rounded-full border border-white/20 hover:bg-white hover:text-[#18181b] transition-colors text-lg font-medium"
            aria-label="Instagram"
          >
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.5" y2="6.5"/></svg>
            Instagram
          </a>
          <a
            href="https://www.tiktok.com/@groovulator"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-5 py-2 rounded-full border border-white/20 hover:bg-white hover:text-[#18181b] transition-colors text-lg font-medium"
            aria-label="TikTok"
          >
            <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M16.5 3a1 1 0 0 1 1 1c0 3.03 2.47 5.5 5.5 5.5a1 1 0 0 1 1 1v2.5a1 1 0 0 1-1 1c-2.21 0-4.21-.9-5.66-2.34V17a5.5 5.5 0 1 1-5.5-5.5 1 1 0 0 1 1 1V15a2.5 2.5 0 1 0 2.5 2.5V3a1 1 0 0 1 1-1z"/></svg>
            TikTok
          </a>
        </div>
      </div>
    </main>
  );
}
