"use client";

import { useState } from "react";
import Link from "next/link";
import DarkModeToggle from "../../../components/DarkModeToggle";
import { usePasswordProtect } from "../../../components/PasswordProtect";
import { TAXIDERMIA_STORAGE_KEY } from "../TaxidermiaProtection";
import CardCarousel from "../../../components/CardCarousel";
import { cards } from "../card-data";

interface TaxidermiaCardPageProps {
  initialCardNumber: number;
}

export default function TaxidermiaCardPage({ initialCardNumber }: TaxidermiaCardPageProps) {
  const { logout } = usePasswordProtect(TAXIDERMIA_STORAGE_KEY);
  const [currentCardNumber, setCurrentCardNumber] = useState(initialCardNumber);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleShare = async () => {
    const currentCard = cards[currentCardNumber - 1];
    const shareUrl = `${window.location.origin}/taxidermia/${currentCard?.id ?? currentCardNumber}`;

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Failed to copy URL:", err);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-black dark:text-white antialiased transition-colors">
      <main className="mx-auto max-w-full px-0 pt-4 overflow-hidden">
        <CardCarousel
          cards={cards}
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
              Starring delightfully disgusting taxidermied monsters, this illustrated rock opera is
              a loving tribute to ‘90s music and absurd cartoons, and a hate letter to late-stage
              capitalism. Get stuffed!
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
                onClick={handleShare}
                className="text-sm opacity-70 hover:opacity-100 transition-opacity underline"
                aria-label="Share current card"
              >
                {copySuccess ? "Copied!" : "Share"}
              </button>
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
