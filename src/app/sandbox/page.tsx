"use client";

import Link from "next/link";
import DarkModeToggle from "../../components/DarkModeToggle";
import { usePasswordProtect } from "../../components/PasswordProtect";
import { SANDBOX_STORAGE_KEY } from "./SandboxProtection";
import { characters } from "../taxidermia/characters-data";

export default function SandboxIndexPage() {
  const { logout } = usePasswordProtect(SANDBOX_STORAGE_KEY);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-black dark:text-white antialiased transition-colors">
      {/* HEADER */}
      <header className="border-b border-black/10 dark:border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-6 flex items-center justify-between">
          <Link
            href="/sandbox"
            className="font-black font-fugaz tracking-tight lowercase text-2xl hover:text-pink-500 active:text-pink-700 dark:hover:text-yellow-300 dark:active:text-yellow-300/80 transition-colors"
          >
            🧪 sandbox
          </Link>
          <div className="flex gap-2">
            <button
              onClick={logout}
              className="text-sm opacity-70 hover:opacity-100 transition-opacity underline"
              aria-label="Logout"
            >
              Logout
            </button>
            <DarkModeToggle />
          </div>
        </div>
      </header>

      {/* TAGLINE */}
      <section className="border-b border-black/10 dark:border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight">
            Experimental playground for{" "}
            <span className="text-pink-500 dark:text-yellow-300">weird ideas</span> and{" "}
            <span className="text-pink-500 dark:text-yellow-300">prototypes</span>
          </h1>
        </div>
      </section>

      <main>
        {/* ABOUT */}
        <section className="border-b border-black/10 dark:border-white/10">
          <div className="mx-auto max-w-6xl px-4 py-12 grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="text-xl md:text-2xl font-bold">About</h3>
            </div>
            <div className="md:col-span-2 text-sm md:text-base leading-relaxed opacity-90 space-y-4">
              <p>
                This is a protected area for experiments, prototypes, and weird little projects that
                don&apos;t fit anywhere else. Some things work, some things don&apos;t, and
                that&apos;s the point. If you&apos;re here, you know the password or know your way
                around feeble security (there&apos;s nothing here explicitly worth your time, I
                assure you). Welcome to the sandbox.
              </p>
            </div>
          </div>
        </section>

        {/* INTERACTIVE DEMOS */}
        <section className="border-b border-black/10 dark:border-white/10">
          <div className="mx-auto max-w-6xl px-4 py-10">
            <h3 className="text-xl md:text-2xl font-bold mb-6">Interactive Demos</h3>
            <div className="grid gap-4">
              <Link
                href="/sandbox/toy-card"
                className="block border border-black/15 dark:border-white/15 p-6 hover:-translate-y-0.5 transition-transform"
              >
                <h4 className="font-semibold text-lg mb-2">🎴 Toy Card</h4>
                <p className="text-sm opacity-70">
                  Interactive character cards with animations and carousels
                </p>
              </Link>
            </div>
          </div>
        </section>

        {/* CHARACTER PAGES */}
        <section className="border-b border-black/10 dark:border-white/10">
          <div className="mx-auto max-w-6xl px-4 py-10">
            <h3 className="text-xl md:text-2xl font-bold mb-6">Character Pages</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {characters.map(character => (
                <Link
                  key={character.id}
                  href={`/sandbox/${character.id}`}
                  className="block border border-black/15 dark:border-white/15 p-6 hover:-translate-y-0.5 transition-transform"
                >
                  <h4 className="font-semibold text-lg mb-2">{character.title}</h4>
                  <p className="text-sm opacity-70 mb-4">{character.description}</p>
                  <div className="flex gap-3 text-xs opacity-60">
                    <span>⚡ Power: {character.stats.power}</span>
                    <span>🏃 Speed: {character.stats.speed}</span>
                    <span>🛡️ Defense: {character.stats.defense}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="py-10">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-sm opacity-70 text-center">
            <Link href="/" className="underline hover:opacity-80 transition-opacity">
              ← Back to Groovulator
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
