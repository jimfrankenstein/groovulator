import { playlists } from "./playlists";
import { ArtistConfig } from "@/app/constants/types";
import ArtistSongBaseLayout from "@/components/ArtistSongBaseLayout";
import PlaylistImage from "@/components/PlaylistImage";
import Link from "next/link";

export default function PlaylistsPage() {
  const artist: ArtistConfig = {
    name: "EctophonicGroovulator",
    displayName: "ECTOPHONIC GROOVULATOR",
    slug: "groovulator",
    socialLinks: ["instagram", "spotify", "youtube", "email"],
    homeLink: "/",
  };

  return (
    <ArtistSongBaseLayout artist={artist}>
      <main>
        {/* PLAYLISTS GRID */}
        <section className="border-b border-black/10 dark:border-white/10">
          <div className="mx-auto max-w-6xl px-4 py-10">
            <h3 className="text-xl md:text-2xl font-bold mb-6">All Playlists</h3>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {playlists.map(playlist => (
                <Link
                  key={playlist.id}
                  href={`/playlists/${playlist.id}`}
                  className="block border border-black/15 dark:border-white/15 hover:shadow-lg hover:shadow-black/10 dark:hover:shadow-white/10 transition-shadow"
                >
                  <div className="aspect-square bg-neutral-50 dark:bg-neutral-800 overflow-hidden">
                    <PlaylistImage
                      playlistId={playlist.id}
                      title={playlist.title}
                      className="w-full h-full object-cover"
                      useStatic={true}
                    />
                  </div>
                  <div className="p-4 flex flex-col gap-1">
                    <h4 className="font-semibold leading-tight">{playlist.title}</h4>
                    <p className="text-sm opacity-70 line-clamp-2">{playlist.description}</p>
                    <div className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 pt-2">
                      Listen →
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* NAVIGATION */}
        <section className="border-b border-black/10 dark:border-white/10">
          <div className="mx-auto max-w-6xl px-4 py-10 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 border border-black/20 dark:border-white/20 px-6 py-3 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </section>
      </main>
    </ArtistSongBaseLayout>
  );
}
