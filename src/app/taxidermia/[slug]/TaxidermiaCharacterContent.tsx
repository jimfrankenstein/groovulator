"use client";

import Link from "next/link";
import DarkModeToggle from "../../../components/DarkModeToggle";
import { usePasswordProtect } from "../../../components/PasswordProtect";
import { TAXIDERMIA_STORAGE_KEY } from "../TaxidermiaProtection";
import type { Character } from "../characters-data";

interface TaxidermiaCharacterContentProps {
  character: Character;
}

export default function TaxidermiaCharacterContent({ character }: TaxidermiaCharacterContentProps) {
  const { logout } = usePasswordProtect(TAXIDERMIA_STORAGE_KEY);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-black dark:text-white antialiased transition-colors">
      <header className="border-b border-black/10 dark:border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-6 flex items-center justify-between">
          <Link
            href="/taxidermia"
            className="font-black font-fugaz tracking-tight lowercase text-2xl hover:text-pink-500 active:text-pink-700 dark:hover:text-yellow-300 dark:active:text-yellow-300/80 transition-colors"
          >
            🎭 taxidermia
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

      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="text-center py-20">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{character.title}</h1>
          <p className="text-lg opacity-70 mb-8">{character.description}</p>
          <div className="inline-block border border-black/10 dark:border-white/10 p-6 rounded">
            <p className="text-sm opacity-50">Character page under construction</p>
          </div>
        </div>
      </main>

      <footer className="py-10 border-t border-black/10 dark:border-white/10">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-sm opacity-70 text-center">
            <Link href="/taxidermia" className="underline hover:opacity-80 transition-opacity">
              ← Back to Taxidermia
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
