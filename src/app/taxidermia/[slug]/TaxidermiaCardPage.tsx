"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import DarkModeToggle from "../../../components/DarkModeToggle";
import { usePasswordProtect } from "../../../components/PasswordProtect";
import { TAXIDERMIA_STORAGE_KEY } from "../TaxidermiaProtection";
import CardCarousel from "../../../components/CardCarousel";
import { characters } from "../characters-data";

interface TaxidermiaCardPageProps {
  initialCardNumber: number;
}

export default function TaxidermiaCardPage({ initialCardNumber }: TaxidermiaCardPageProps) {
  const router = useRouter();
  const { logout } = usePasswordProtect(TAXIDERMIA_STORAGE_KEY);
  const [currentCardNumber, setCurrentCardNumber] = useState(initialCardNumber);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Debounced URL update - only fires 500ms after user stops swiping
  useEffect(() => {
    // Clear existing timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Set new timer
    debounceTimerRef.current = setTimeout(() => {
      const newUrl = `/taxidermia/${currentCardNumber}`;
      router.replace(newUrl, { scroll: false });
    }, 500);

    // Cleanup
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [currentCardNumber, router]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-black dark:text-white antialiased transition-colors">
      <main className="mx-auto max-w-full px-0 pt-4 overflow-hidden">
        <CardCarousel
          cards={characters}
          initialCardNumber={initialCardNumber}
          onCardChange={setCurrentCardNumber}
        />
      </main>

      {/* ABOUT */}
      <section id="about" className="border-t border-b border-black/10 dark:border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-12 grid gap-6 md:grid-cols-3">
          <div>
            <h3 className="text-xl md:text-2xl font-bold">About</h3>
          </div>
          <div className="md:col-span-2 text-sm md:text-base leading-relaxed opacity-90 space-y-4">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>
      </section>

      <footer className="py-6">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="text-sm opacity-70 hover:opacity-100 transition-opacity underline"
            >
              ← Back to Groovulator
            </Link>
            <div className="flex gap-3 items-center">
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
        </div>
      </footer>
    </div>
  );
}
