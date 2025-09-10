import SongCard from '../../components/SongCard';
import DarkModeToggle from '../../components/DarkModeToggle';
import SocialLinks from '../../components/SocialLinks';
import LinkCard from '../../components/LinkCard';
import { songs as jfSongs } from './songs/songs';
import { collaborations } from '../collaborations/collaborations';
import Link from 'next/link';
import Image from 'next/image';

export default function JimFrankensteinPage() {
  // Combine JF songs and collaborations, sort by release date
  const allSongs = [
    ...jfSongs.map(song => ({ ...song, artist: "Jim Frankenstein" })),
    ...collaborations.map(song => ({ ...song, artist: "Collaboration" }))
  ];

  const allSongsSorted = allSongs
    .sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());

  const links = [
    {
      title: "Spooky Song Video",
      description: "Lyric video on YouTube",
      href: "https://youtu.be/RaEekujTv6E?si=ykRTArNZpbXAZMWh",
      isExternal: true
    },
    {
      title: "Spooky Song",
      description: "Listen on Spotify",
      href: "https://open.spotify.com/track/6Tvka4hgnheKaOc8gOC55k?si=7dad26058c60451f",
      isExternal: true
    },
    {
      title: "Weird",
      description: "The song you liked on Resso",
      href: "https://open.spotify.com/track/3hN4CwbdkzFYXdlXsmI6Ru?si=09523d9636b14671",
      isExternal: true
    },
    {
      title: "Souls and Ghosts",
      description: "Full-length album",
      href: "https://open.spotify.com/album/6270AFuOn3qlgGMxIjbrQT?si=AjXkua3CSzScGGb8oxbwUw",
      isExternal: true
    },
    {
      title: "You Call This an Apocalypse?",
      description: "The Very Bad Days album",
      href: "https://open.spotify.com/album/15fRdFoEfLToMIHjgr3T9c?si=nrfe09Z2QBWP2eeLUplJFw",
      isExternal: true
    },
    {
      title: "The Very Bad Days",
      description: "My band",
      href: "https://instagram.com/theverybaddays",
      isExternal: true
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-black dark:text-white antialiased transition-colors">
      {/* HEADER */}
      <header className="border-b border-black/10 dark:border-black/10 dark:border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-6 flex items-center justify-between">
          <Link href="/" className="font-black tracking-tight text-xl hover:text-pink-500 active:text-pink-700 dark:hover:text-yellow-300 dark:active:text-yellow-300/80 transition-colors">
            JIM FRANKENSTEIN
          </Link>
          <div className="flex gap-2">
            <SocialLinks entity="jimfrankenstein" links={['instagram', 'spotify', 'youtube', 'email']} />
            <DarkModeToggle />
          </div>
        </div>
      </header>

      {/* TAGLINE */}
      <section className="border-b border-black/10 dark:border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <Image
              src="/images/jimfrankenstein/profile-square.jpg"
              alt="Jim Frankenstein"
              width={200}
              height={200}
              className="rounded-full flex-shrink-0 w-48 h-48 md:w-32 md:h-32"
              priority
            />
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight">
              Crooked lullabies for <span className="text-lime-500">monsters,</span> <span className="text-amber-500">misfits,</span> and <span className="text-cyan-400">midnight wanderers</span>
            </h1>
          </div>
        </div>
      </section>

      <main>
        {/* LINKS GRID */}
        <section className="border-b border-black/10 dark:border-white/10">
          <div className="mx-auto max-w-6xl px-4 py-10">
            <h3 className="text-xl md:text-2xl font-bold mb-6">Links</h3>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              {links.map(link => (
                <LinkCard
                  key={link.title}
                  title={link.title}
                  description={link.description}
                  href={link.href}
                  isExternal={link.isExternal}
                />
              ))}
            </div>
          </div>
        </section>

        {/* SONGS GRID */}
        <section id="songs" className="border-b border-black/10 dark:border-white/10">
          <div className="mx-auto max-w-6xl px-4 py-10">
            <h3 className="text-xl md:text-2xl font-bold mb-6">All Songs</h3>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {allSongsSorted.map(song => (
                <SongCard
                  key={song.id}
                  song={song}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="border-b border-black/10 dark:border-white/10">
          <div className="mx-auto max-w-6xl px-4 py-12 grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="text-xl md:text-2xl font-bold">About</h3>
            </div>
            <div className="md:col-span-2 text-sm md:text-base leading-relaxed opacity-90 space-y-4">
              <p>Irreverent yet poignant, the experimental indie Ghostbustery of Jim Frankenstein evokes a malty, existential angst with the bourbon oak undertones of a bassy pasquinade. Jim is truly the soul of an old man who died asking &apos;why?&apos;</p>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="py-10">
        <div className="mx-auto max-w-6xl px-4 grid gap-6 md:grid-cols-2 items-end">
          <div className="text-sm opacity-70">
            <span>© {new Date().getFullYear()} Jim Frankenstein. All rights reserved.</span>
            <br />
            <span>Minneapolis, MN</span>
          </div>
          <div className="flex gap-2 justify-start md:justify-end items-center text-sm">
            <SocialLinks entity="jimfrankenstein" links={['instagram', 'spotify', 'youtube', 'email']} />
            <DarkModeToggle />
          </div>
        </div>
      </footer>
    </div>
  );
}
