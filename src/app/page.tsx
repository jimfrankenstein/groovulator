import SongCard from '../components/SongCard';
import DarkModeToggle from '../components/DarkModeToggle';
import { songs as jfSongs } from './jimfrankenstein/songs/songs';
import { songs as tvbdSongs } from './theverybaddays/songs/songs';
import { collaborations } from './collaborations/collaborations';
import Link from 'next/link';

export default function Home() {
  // const featured = {
  //   title: "Here There Be Monsters — Single",
  //   kicker: "Featured",
  //   blurb: "A short, haunting musical vignette. Stream it everywhere or watch the teaser.",
  //   actions: [
  //     { label: "Listen", href: "#" },
  //     { label: "Details", href: "#" },
  //   ],
  // };

  // Combine all songs from both artists and collaborations, sort by release date to get the latest 6
  const allSongs = [
    ...jfSongs.map(song => ({ ...song, artist: "Jim Frankenstein" })),
    ...tvbdSongs.map(song => ({ ...song, artist: "The Very Bad Days" })),
    ...collaborations.map(song => ({ ...song, artist: "Collaboration" }))
  ];

  const latestSongs = allSongs
    .sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())
    .slice(0, 9);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-black dark:text-white antialiased">
      {/* HEADER */}
      <header className="border-b border-black/10 dark:border-black/10 dark:border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-6 flex items-center justify-between">
          <a href="#" className="font-black tracking-tight text-xl hover:text-pink-500 active:text-pink-700">
            <span>ECTOPHONIC</span> GROOVULATOR
          </a>
          {/* <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#series" className="hover:underline">
              Series
            </a>
            <a href="#songs" className="hover:underline">
              Songs
            </a>
            <a href="#about" className="hover:underline">
              About
            </a>
            <a href="#join" className="hover:underline">
              Join
            </a>
          </nav> */}
        </div>
      </header>

      {/* TAGLINE
      <section className="border-b border-black/10 dark:border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight">
            Short, haunting musicals <span className="opacity-60">and other oddities</span>
          </h1>
        </div>
      </section>*/}

      {/* TAGLINE (TEMP) */}
      <section className="border-b border-black/10 dark:border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight">
            The grim grunge ghostbustery of <Link href={'/jimfrankenstein'} className="text-pink-500 hover:text-pink-700 active:text-pink-900 dark:text-yellow-300 dark:hover:text-yellow-300/80 dark:active:text-yellow-300/60 transition-colors duration-200">Jim Frankenstein</Link> and <Link className="text-emerald-500 hover:text-emerald-700 active:text-emerald-900 dark:text-fuchsia-500 dark:hover:text-fuchsia-500/80 dark:active:text-fuchsia-500/60 transition-colors duration-200" href={'/theverybaddays'}>The Very Bad Days</Link>
          </h1>
        </div>
      </section>

      <main>
        {/* FEATURED SECTION
        <section className="border-b border-black/10 dark:border-white/10">
          <div className="mx-auto max-w-6xl px-4 py-10 grid gap-6 md:grid-cols-2">
            <div className="aspect-[16/9] w-full border border-white/20 bg-neutral-800 grid place-items-center">
              <div className="text-xs uppercase tracking-wide opacity-60">
                Image / video placeholder
              </div>
            </div>
            <div className="flex flex-col justify-center gap-4">
              <div className="text-xs uppercase tracking-wider opacity-60">{featured.kicker}</div>
              <h2 className="text-2xl md:text-3xl font-bold">{featured.title}</h2>
              <p className="text-sm md:text-base leading-relaxed opacity-80">{featured.blurb}</p>
              <div className="flex flex-wrap gap-3 pt-2">
                {featured.actions.map(a => (
                  <a
                    key={a.label}
                    href={a.href}
                    className="inline-flex items-center gap-2 border border-white px-4 py-2 text-sm font-medium hover:-translate-y-0.5 transition-transform"
                  >
                    {a.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
        */}

        {/* SERIES GRID (disabled for now)
        <section id="series" className="border-b border-black/10 dark:border-white/10">
          <div className="mx-auto max-w-6xl px-4 py-10">
            <h3 className="text-xl md:text-2xl font-bold mb-6">Series</h3>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {series.map(item => (
                <article key={item.title} className="border border-white/15">
                  <div className="aspect-[4/3] bg-neutral-800 border-b border-white/15 grid place-items-center">
                    <div className="text-[11px] uppercase tracking-wide opacity-60">
                      Cover placeholder
                    </div>
                  </div>
                  <div className="p-4 flex flex-col gap-2">
                    <div className="text-[11px] uppercase tracking-wide opacity-60">
                      {item.meta}
                    </div>
                    <h4 className="font-semibold leading-tight">{item.title}</h4>
                    <p className="text-sm opacity-70">{item.note}</p>
                    <a href="#" className="text-sm underline pt-2">
                      Open
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section> */}

        {/* SONGS GRID */}
        <section id="songs" className="border-b border-black/10 dark:border-white/10">
          <div className="mx-auto max-w-6xl px-4 py-10">
            <h3 className="text-xl md:text-2xl font-bold mb-6">Latest Songs</h3>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {latestSongs.map(song => (
                <SongCard
                  key={song.id}
                  song={song}
                  aspectRatio="square"
                />
              ))}
            </div>
          </div>
        </section>

        {/* JOIN CTA (disabled for now)
        <section id="join" className="border-b border-black/10 dark:border-white/10">
          <div className="mx-auto max-w-6xl px-4 py-12 grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
              <h3 className="text-xl md:text-2xl font-bold">Join the journey</h3>
              <p className="text-sm md:text-base opacity-80 mt-2">
                Get early drops, behind-the-scenes, and weird little experiments.
              </p>
            </div>
            <form className="flex flex-col sm:flex-row gap-3 items-start">
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@domain.com"
                className="w-full sm:w-auto flex-1 border border-white px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-white"
              />
              <button
                type="button"
                className="border border-white px-4 py-2 text-sm font-medium hover:-translate-y-0.5 transition-transform"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section> */}

        {/* ABOUT */}
        <section id="about" className="border-b border-black/10 dark:border-white/10">
          <div className="mx-auto max-w-6xl px-4 py-12 grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="text-xl md:text-2xl font-bold">About</h3>
            </div>
            <div className="md:col-span-2 text-sm md:text-base leading-relaxed opacity-90 space-y-6">
              <p>
              Ectophonic Groovulator is an independent studio and label from Minneapolis, making short, haunting musicals and other oddities. We write songs about goblins, cults, dolphin suicides, and whatever else crawls out of the woods. Our projects, The Very Bad Days and Jim Frankenstein, mix dark humor with 90s alt-rock fuzz and basement-punk energy. If you like your laughter with a chill and your horror with a wink, welcome to the Groovulator.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="py-10">
        <div className="mx-auto max-w-6xl px-4 grid gap-6 md:grid-cols-2 items-end">
          <div className="text-sm opacity-70">
            <span>© {new Date().getFullYear()} Groovulator LLC. All rights reserved.</span>
            <br />
            <span>Minneapolis, MN</span>
          </div>
          <div className="flex gap-6 justify-start md:justify-end items-center text-sm">
            <a href="mailto:makecontact@groovulator.com?subject=I%20have%20been%20summoned%20by%20your%20spooky%20grooves" className="underline">
              Contact
            </a>
            <DarkModeToggle />
          </div>
        </div>
      </footer>
    </div>
  );
}
