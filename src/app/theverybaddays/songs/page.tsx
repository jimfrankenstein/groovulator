import Link from "next/link";
import { songs } from "./songs";

export default function TheVeryBadDaysSongsPage() {
  return (
    <main className="min-h-screen bg-[#18181b] text-white font-sans">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">The Very Bad Days</h1>
          <h2 className="text-2xl text-white/80">Songs</h2>
        </div>

        {/* Songs List */}
        <div className="grid gap-6">
          {songs.map(song => (
            <Link
              key={song.id}
              href={`/theverybaddays/songs/${song.id}`}
              className="block p-6 border border-white/20 rounded-lg hover:bg-white/5 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{song.title}</h3>
                  <p className="text-white/70 mb-2">{song.description}</p>
                </div>
                {/* <div className="text-white/60 text-sm">
                  {song.duration}
                </div> */}
              </div>
            </Link>
          ))}
        </div>

        {/* Back to Artist */}
        <div className="text-center mt-12">
          <Link
            href="/theverybaddays"
            className="inline-block px-6 py-3 border border-white/20 rounded-lg hover:bg-white hover:text-[#18181b] transition-colors"
          >
            ← Back to The Very Bad Days
          </Link>
        </div>
      </div>
    </main>
  );
}
