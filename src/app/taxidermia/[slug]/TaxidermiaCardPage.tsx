"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import DarkModeToggle from "../../../components/DarkModeToggle";
import SocialLinks from "../../../components/SocialLinks";
import CardCarousel from "../../../components/CardCarousel";
import { cards } from "../card-data";

interface TaxidermiaCardPageProps {
  initialCardNumber: number;
}

export default function TaxidermiaCardPage({ initialCardNumber }: TaxidermiaCardPageProps) {
  const [timeTravel] = useState(() => {
    try {
      return new URLSearchParams(window.location.search).get("timetravel") === "true";
    } catch {
      return false;
    }
  });
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
    <div className="min-h-screen bg-white dark:bg-gray-950 text-black dark:text-white antialiased transition-colors font-astounder [&_h1,&_h2,&_h3,&_h4,&_h5,&_h6]:font-mudstone [&_h1,&_h2,&_h3,&_h4,&_h5,&_h6]:font-black">
      <main className="relative mx-auto max-w-full px-0 pt-4 overflow-hidden bg-taxidermia-blue">
        <div className="relative z-10">
          <CardCarousel
            cards={cards}
            initialCardNumber={initialCardNumber}
            onCardChange={setCurrentCardNumber}
            revealAll={timeTravel}
          />
        </div>
        <div
          className="absolute top-0 left-0 h-full w-full bg-cover bg-center pointer-events-none z-0"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.4)), url('/images/taxidermia/taxidermia-grit.webp')",
          }}
          aria-hidden="true"
        />
      </main>

      {/* ABOUT */}
      <section id="about" className="border-t border-b border-black/10 dark:border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-12 grid gap-6 md:grid-cols-2 items-center">
          <div>
            <Image
              src="/images/groovulator/taxidermia/logo.png"
              alt="Undead Justice Warriors of Taxidermia vs Evil Corporations: FIGHT FOR YOUR LIFE!"
              width={1000}
              height={500}
              className="w-full h-auto"
            />
          </div>
          <div className="text-[22px] leading-[33px] space-y-4">
            <h1 className="text-[30px] text-taxidermia-pink">
              Undead Justice Warriors of Taxidermia vs Evil Corporations: FIGHT FOR YOUR LIFE!
            </h1>
            <p>
              Starring delightfully disgusting taxidermied monsters, this illustrated rock opera is
              a loving tribute to ‘90s music and absurd cartoons (and a hate letter to late-stage
              capitalism).
            </p>

            <p>
              A mini-musical featuring performances from 12 musicians across 8 alt-rock and hip-hop
              pastiches, <em>Undead Justice Warriors of Taxidermia!</em> stitches together the story
              of a magically maniacal taxidermist and his critter creations. Reclaiming a stolen
              childhood dream, he (literally) assembles a cartoon cast that will save the minds and
              futures of kids everywhere.
            </p>

            <p>
              With his cartoon on the TV and the radio playing his song, the system can get stuffed!
            </p>
            <SocialLinks
              entity="groovulator"
              links={["instagram", "tiktok", "youtube", "email"]}
              large
            />
          </div>
        </div>
      </section>

      {/* Klaviyo Signup Form */}
      <section className="border-b border-black/10 dark:border-white/10 [&_form]:!float-none [&_form]:!p-0">
        <div className="mx-auto max-w-6xl px-4 py-12 grid gap-6 md:grid-cols-2 items-center">
          <div>
            <Image
              src="/images/groovulator/taxidermia/eg-logo.png"
              alt="Created by Ectophonic Groovulator"
              width={1000}
              height={500}
              className="w-full h-auto"
            />
          </div>
          <div className="text-[22px] leading-[33px] space-y-4">
            <div className="klaviyo-form-SdYxhD"></div>
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
              <SocialLinks
                entity="groovulator"
                links={["instagram", "tiktok", "youtube", "email"]}
              />
              <DarkModeToggle />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
