import Image from "next/image";

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
            <svg className="w-8 h-8 mb-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-9.54-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 3.6-1.08 7.56-.6 10.68 1.32.42.18.479.659.3 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
            </svg>
            <span className="text-sm font-medium">Spotify</span>
          </a>

          <a
            href="https://instagram.com/theverybaddays"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="The Very Bad Days on Instagram"
            className="flex flex-col items-center p-4 rounded-lg border border-white/20 hover:bg-white hover:text-[#18181b] transition-colors"
          >
            <svg className="w-8 h-8 mb-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            <span className="text-sm font-medium">Instagram</span>
          </a>

          <a
            href="https://facebook.com/theverybaddays"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="The Very Bad Days on Facebook"
            className="flex flex-col items-center p-4 rounded-lg border border-white/20 hover:bg-white hover:text-[#18181b] transition-colors"
          >
            <svg className="w-8 h-8 mb-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            <span className="text-sm font-medium">Facebook</span>
          </a>

          <a
            href="https://youtube.com/@theverybaddays"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="The Very Bad Days on YouTube"
            className="flex flex-col items-center p-4 rounded-lg border border-white/20 hover:bg-white hover:text-[#18181b] transition-colors"
          >
            <svg className="w-8 h-8 mb-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            <span className="text-sm font-medium">YouTube</span>
          </a>

          <a
            href="mailto:press@theverybaddays.com"
            aria-label="Email The Very Bad Days"
            className="flex flex-col items-center p-4 rounded-lg border border-white/20 hover:bg-white hover:text-[#18181b] transition-colors"
          >
            <svg className="w-8 h-8 mb-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
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
            className="block p-4 border border-white/20 rounded-lg hover:bg-white/5 transition-colors"
          >
            <p className="text-white/80 text-center">Find our newest tunes at the top of this playlist</p>
          </a>

          <a
            href="https://theverybaddays.bandcamp.com/yum"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Redeem download code on Bandcamp"
            className="block p-4 border border-white/20 rounded-lg hover:bg-white/5 transition-colors"
          >
            <p className="text-white/80 text-center">Redeem Download Code</p>
          </a>

          <a
            href="/woodman"
            aria-label="Woodman read-along story"
            className="block p-4 border border-white/20 rounded-lg hover:bg-white/5 transition-colors"
          >
            <p className="text-white/80 text-center">Woodman Read-Along Story!</p>
          </a>

          <a
            href="https://youtu.be/1p9DazyMazY?si=yWB5VSsebKAW3MKC"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Here There Be Monsters lyric video on YouTube"
            className="block p-4 border border-white/20 rounded-lg hover:bg-white/5 transition-colors"
          >
            <p className="text-white/80 text-center">Here There Be Monsters | Lyric Video | Youtube</p>
          </a>

          <a
            href="https://www.youtube.com/playlist?list=PLdDD0nxJDFiod72KGwnTh14xKRRJ0wshv"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="The Very Bad Days videos playlist on YouTube"
            className="block p-4 border border-white/20 rounded-lg hover:bg-white/5 transition-colors"
          >
            <p className="text-white/80 text-center">Videos</p>
          </a>

          <a
            href="mailto:press@theverybaddays.com"
            aria-label="Book The Very Bad Days"
            className="block p-4 border border-white/20 rounded-lg hover:bg-white/5 transition-colors"
          >
            <p className="text-white/80 text-center">Book the Band</p>
          </a>
        </div>

        {/* Songs Link */}
        <div className="text-center">
          <a
            href="/theverybaddays/songs"
            aria-label="View The Very Bad Days songs"
            className="inline-block px-8 py-4 bg-white text-[#18181b] rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors text-center"
          >
            View Songs
          </a>
        </div>
      </div>
    </main>
  );
} 