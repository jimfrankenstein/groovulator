import SongCard from "../../components/SongCard";
import DarkModeToggle from "../../components/DarkModeToggle";
import SocialLinks from "../../components/SocialLinks";
import LinkCard from "../../components/LinkCard";
import { songs as tvbdSongs } from "./songs/songs";
import { collaborations } from "../collaborations/collaborations";
import Link from "next/link";
import Image from "next/image";
import { getCurrentArtistSlug, artistHref } from "@/lib/urls";

export default async function TheVeryBadDaysPage() {
  const currentArtist = await getCurrentArtistSlug();
  const vbdHome = artistHref(currentArtist, "theverybaddays");
  // Combine TVBD songs and collaborations, sort by release date
  const allSongs = [
    ...tvbdSongs.map(song => ({ ...song, artist: "The Very Bad Days" })),
    ...collaborations.map(song => ({ ...song, artist: "Collaboration" })),
  ];

  const allSongsSorted = allSongs.sort(
    (a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
  );

  const links = [
    {
      title: "Spotify Playlist",
      description: "Find our newest tunes at the top",
      href: "https://open.spotify.com/playlist/5uhuvVfRzb632ZgZKDL0pz?si=71e2b64de9ee4469",
      isExternal: true,
    },
    {
      title: "Download Codes",
      description: "Redeem on Bandcamp",
      href: "https://theverybaddays.bandcamp.com/yum",
      isExternal: true,
    },
    {
      title: "Woodman Story",
      description: "Read-along adventure",
      href: "/woodman",
      isExternal: false,
    },
    {
      title: "Music Videos",
      description: "YouTube playlist",
      href: "https://www.youtube.com/playlist?list=PLdDD0nxJDFiod72KGwnTh14xKRRJ0wshv",
      isExternal: true,
    },
    {
      title: "Book the Band",
      description: "Press inquiries",
      href: "mailto:press@theverybaddays.com",
      isExternal: true,
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-black dark:text-white antialiased transition-colors">
      {/* HEADER */}
      <header className="border-b border-black/10 dark:border-black/10 dark:border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-6 flex items-center justify-between">
          <Link
            href={vbdHome}
            className="font-black tracking-tight text-xl hover:text-pink-500 active:text-pink-700 dark:hover:text-yellow-300 dark:active:text-yellow-300/80 transition-colors"
          >
            THE VERY BAD DAYS
          </Link>
          <div className="flex gap-2">
            <SocialLinks
              entity="theverybaddays"
              links={["instagram", "spotify", "youtube", "email"]}
            />
            <DarkModeToggle />
          </div>
        </div>
      </header>

      {/* TAGLINE */}
      <section className="border-b border-black/10 dark:border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <Image
              src="/images/theverybaddays/profile-square.jpg"
              alt="The Very Bad Days"
              width={200}
              height={200}
              className="rounded-full flex-shrink-0 w-48 h-48 md:w-32 md:h-32"
              priority
            />
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight">
              Catchy tunes about <span className="text-fuchsia-500">the</span> terrible, horrible,
              no good, <span className="text-fuchsia-500">very bad days</span>
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
                <SongCard key={song.id} song={song} />
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
              <p>
                Emerging from the scary basement of the Minneapolis music scene, The Very Bad Days
                are a devilishly funny B-horror flick of a band.
              </p>
              <ul className="list-disc list-outside space-y-2 pl-6">
                <li>
                  Dark and danceable originals. Upbeat, bittersweet ballads. Grotesque puns and
                  90&apos;s covers.
                </li>
                <li>
                  Minimalist, backbeat drumming. Melodic, punk jazz basslines. Powerful axe-chops
                  and chilling solos.
                </li>
                <li>
                  Fantastical grindhouse macabre, all tied up with the unexpected sweetness of
                  alt-rock nostalgia.
                </li>
              </ul>
              <p>
                These grim humor grunge rock Ghostbusters proudly capture a bizarre spirit all their
                own. On a terrible, horrible, no good, very bad day, you can catch the band haunting
                the bars, theaters, and curiosity shops of Minnesota.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="py-10">
        <div className="mx-auto max-w-6xl px-4 grid gap-6 md:grid-cols-2 items-end">
          <div className="text-sm opacity-70">
            <span>© {new Date().getFullYear()} The Very Bad Days. All rights reserved.</span>
            <br />
            <span>
              An{" "}
              <Link
                href="https://groovulator.com"
                className="underline hover:opacity-80 transition-opacity"
              >
                Ectophonic Groovulator
              </Link>{" "}
              band
            </span>
            <br />
            <span>Minneapolis, MN</span>
          </div>
          <div className="flex gap-2 justify-start md:justify-end items-center text-sm">
            <SocialLinks
              entity="theverybaddays"
              links={["instagram", "spotify", "youtube", "email"]}
            />
            <DarkModeToggle />
          </div>
        </div>
      </footer>
    </div>
  );
}
