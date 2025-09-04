export default function Home() {
  const featured = {
    title: "Here There Be Monsters — Single",
    kicker: "Featured",
    blurb: "A short, haunting musical vignette. Stream it everywhere or watch the teaser.",
    actions: [
      { label: "Listen", href: "#" },
      { label: "Details", href: "#" },
    ],
  };

  const series = [
    { title: "Sutton Mountain Sabbath", meta: "Series", note: "Folk-horror radio arc" },
    { title: "Undead Justice Warriors", meta: "Series", note: "Cult-punk saga" },
    { title: "Creatures of the Void", meta: "Series", note: "Monster interludes" },
  ];

  const other = [
    { title: "Devil's Door", meta: "Song", note: "Jim Frankenstein" },
    { title: "Spooky Song", meta: "Song", note: "The Very Bad Days" },
    { title: "Grass & Water (Frogman)", meta: "Song", note: "TVBD" },
  ];

  const roster = [
    { name: "The Very Bad Days", href: "/theverybaddays" },
    { name: "Jim Frankenstein", href: "/jimfrankenstein" },
  ];

  return (
    <div className="min-h-screen bg-white text-black antialiased">
      {/* HEADER */}
      <header className="border-b border-black/10">
        <div className="mx-auto max-w-6xl px-4 py-6 flex items-center justify-between">
          <a href="#" className="font-black tracking-tight text-xl">
            GROOVULATOR
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm">
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
          </nav>
        </div>
      </header>

      {/* TAGLINE */}
      <section className="border-b border-black/10">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight">
            Short, haunting musicals <span className="opacity-60">and other oddities</span>
          </h1>
        </div>
      </section>

      <main>
        {/* FEATURED SECTION */}
        <section className="border-b border-black/10">
          <div className="mx-auto max-w-6xl px-4 py-10 grid gap-6 md:grid-cols-2">
            <div className="aspect-[16/9] w-full border border-black/20 bg-neutral-50 grid place-items-center">
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
                    className="inline-flex items-center gap-2 border border-black px-4 py-2 text-sm font-medium hover:-translate-y-0.5 transition-transform"
                  >
                    {a.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SERIES GRID */}
        <section id="series" className="border-b border-black/10">
          <div className="mx-auto max-w-6xl px-4 py-10">
            <h3 className="text-xl md:text-2xl font-bold mb-6">Series</h3>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {series.map(item => (
                <article key={item.title} className="border border-black/15">
                  <div className="aspect-[4/3] bg-neutral-50 border-b border-black/15 grid place-items-center">
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
        </section>

        {/* SONGS GRID */}
        <section id="songs" className="border-b border-black/10">
          <div className="mx-auto max-w-6xl px-4 py-10">
            <h3 className="text-xl md:text-2xl font-bold mb-6">Songs</h3>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {other.map(item => (
                <article key={item.title} className="border border-black/15">
                  <div className="aspect-square bg-neutral-50 border-b border-black/15 grid place-items-center">
                    <div className="text-[11px] uppercase tracking-wide opacity-60">
                      Art placeholder
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
        </section>

        {/* JOIN CTA */}
        <section id="join" className="border-b border-black/10">
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
                className="w-full sm:w-auto flex-1 border border-black px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
              />
              <button
                type="button"
                className="border border-black px-4 py-2 text-sm font-medium hover:-translate-y-0.5 transition-transform"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="border-b border-black/10">
          <div className="mx-auto max-w-6xl px-4 py-12 grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="text-xl md:text-2xl font-bold">About</h3>
            </div>
            <div className="md:col-span-2 text-sm md:text-base leading-relaxed opacity-90 space-y-6">
              <p>
                Groovulator is a studio for short, haunting musicals and related oddities. We make
                songs, mini-series, and artifacts that stitch together a weird little universe—equal
                parts spooky and playful. Think radio-show folklore, VHS-era horror, and alt-rock
                energy.
              </p>
              <div>
                <h4 className="font-semibold mb-2">On the roster:</h4>
                <ul className="space-y-1">
                  {roster.map(band => (
                    <li key={band.name}>
                      <a href={band.href} className="underline">
                        {band.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="py-10">
        <div className="mx-auto max-w-6xl px-4 grid gap-6 md:grid-cols-2 items-end">
          <div className="text-sm opacity-70">
            © {new Date().getFullYear()} Groovulator. All rights reserved.
          </div>
          <div className="flex gap-6 justify-start md:justify-end text-sm">
            <a href="#" className="underline">
              Contact
            </a>
            <a href="#" className="underline">
              Privacy
            </a>
            <a href="#" className="underline">
              Terms
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
