import Link from "next/link";
import { notFound } from "next/navigation";
import { songs } from "../songs";

export default function SongPage({ params }: { params: { songId: string } }) {
  const song = songs.find(s => s.id === params.songId);

  if (!song) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#18181b] text-white font-sans">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{song.title}</h1>
          {/* <p className="text-xl text-white/80 mb-4">{song.description}</p> */}
          {/* <div className="flex justify-center gap-6 text-white/60">
            <span>{song.duration}</span>
            <span>•</span>
            <span>{song.genre}</span>
            <span>•</span>
            <span>{song.releaseDate}</span>
          </div> */}
        </div>

        {/* Song Content */}
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          {/* Audio Player Placeholder */}
          <div className="bg-white/5 rounded-lg p-8 border border-white/20">
            <h3 className="text-xl font-semibold mb-4">Listen</h3>
            <div className="bg-white/10 rounded-lg p-6 text-center">
              <p className="text-white/60">Audio player coming soon...</p>
            </div>
          </div>

          {/* Lyrics */}
          <div className="bg-white/5 rounded-lg p-8 border border-white/20">
            <h3 className="text-xl font-semibold mb-4">Lyrics</h3>
            <div className="prose prose-invert max-w-none">
              {/* <p className="text-white/80 leading-relaxed">{song.lyrics}</p> */}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Link
            href="/jimfrankenstein/songs"
            className="inline-block px-6 py-3 border border-white/20 rounded-lg hover:bg-white hover:text-[#18181b] transition-colors"
          >
            ← Back to Songs
          </Link>
          
          <Link
            href="/jimfrankenstein"
            className="inline-block px-6 py-3 border border-white/20 rounded-lg hover:bg-white hover:text-[#18181b] transition-colors"
          >
            Back to Artist
          </Link>
        </div>
      </div>
    </main>
  );
} 