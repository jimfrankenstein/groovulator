import Link from "next/link";
import { notFound } from "next/navigation";

const songs = {
  "midnight-ritual": {
    title: "Midnight Ritual",
    description: "Dark ambient exploration of nocturnal ceremonies",
    duration: "4:32",
    lyrics: "In the depths of night, where shadows dance...",
    releaseDate: "2024",
    genre: "Dark Ambient"
  },
  "cryptid-whispers": {
    title: "Cryptid Whispers",
    description: "Ethereal sounds from the depths of the unknown",
    duration: "6:18",
    lyrics: "Whispers echo through the mist...",
    releaseDate: "2024",
    genre: "Experimental"
  },
  "ectoplasmic-dance": {
    title: "Ectoplasmic Dance",
    description: "Haunting melodies for spectral gatherings",
    duration: "5:47",
    lyrics: "Spirits swirl in spectral light...",
    releaseDate: "2024",
    genre: "Electronic"
  },
  "occult-symphony": {
    title: "Occult Symphony",
    description: "Orchestral darkness with electronic undertones",
    duration: "8:23",
    lyrics: "Ancient rites in modern times...",
    releaseDate: "2024",
    genre: "Orchestral"
  }
};

export default function SongPage({ params }: { params: { songId: string } }) {
  const song = songs[params.songId as keyof typeof songs];

  if (!song) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#18181b] text-white font-sans">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{song.title}</h1>
          <p className="text-xl text-white/80 mb-4">{song.description}</p>
          <div className="flex justify-center gap-6 text-white/60">
            <span>{song.duration}</span>
            <span>•</span>
            <span>{song.genre}</span>
            <span>•</span>
            <span>{song.releaseDate}</span>
          </div>
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
              <p className="text-white/80 leading-relaxed">{song.lyrics}</p>
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