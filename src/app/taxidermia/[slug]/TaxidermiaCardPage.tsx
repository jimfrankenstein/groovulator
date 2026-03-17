"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { InstagramLogo, SpotifyLogo, YoutubeLogo, EnvelopeSimple } from "@phosphor-icons/react";
import CardCarousel from "../../../components/CardCarousel";
import { cards } from "../card-data";
import { SOCIAL_LINKS } from "../../constants/consts";

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
  return (
    <div className="dark min-h-screen bg-white dark:bg-gray-950 text-black dark:text-white antialiased transition-colors font-astounder [&_h1,&_h2,&_h3,&_h4,&_h5,&_h6]:font-mudstone [&_h1,&_h2,&_h3,&_h4,&_h5,&_h6]:font-black">
      <main className="relative mx-auto max-w-full px-0 pt-2 overflow-hidden bg-taxidermia-blue">
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
      <section id="about" className="border-t border-black/10 dark:border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-12 grid gap-6 md:grid-cols-2 items-start">
          <div className="space-y-6">
            <Image
              src="/images/taxidermia/logo_tight.png"
              alt="Undead Justice Warriors of Taxidermia vs Evil Corporations: FIGHT FOR YOUR LIFE!"
              width={934}
              height={677}
              className="w-full h-auto"
              style={{ maxWidth: "100%" }}
            />
          </div>
          <div className="text-[22px] leading-[33px] space-y-4 position-relative z-2 max-md:px-4">
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
          </div>
        </div>
      </section>

      {/* Follow */}
      <section className="overflow-x-clip">
        <div className="mx-auto max-w-6xl px-4 pt-12 pb-[96px] flex items-center justify-center">
          <div className="relative flex items-center justify-center overflow-visible">
            <img
              src="/images/taxidermia/SVG/Yellow Splash Tall.svg"
              alt=""
              aria-hidden="true"
              draggable={false}
              className="absolute pointer-events-none max-w-none"
              style={{
                left: "50%",
                top: "50%",
                width: "508px",
                height: "auto",
                transform: "translate(-50%, -40%)",
              }}
            />
            <span
              className="relative italic text-black select-none mr-[19px] font-astounder"
              style={{ fontSize: "33px", lineHeight: "33px" }}
            >
              Follow
            </span>
            <div className="relative flex gap-[14px]">
              {[
                {
                  href: SOCIAL_LINKS.groovulator.instagram.href,
                  label: "Instagram",
                  icon: <InstagramLogo size={24} weight="fill" />,
                },
                {
                  href: SOCIAL_LINKS.groovulator.spotify.href,
                  label: "Spotify",
                  icon: <SpotifyLogo size={24} weight="fill" />,
                },
                {
                  href: SOCIAL_LINKS.groovulator.youtube.href,
                  label: "YouTube",
                  icon: <YoutubeLogo size={24} weight="fill" />,
                },
                {
                  href: SOCIAL_LINKS.groovulator.email.href,
                  label: "Email",
                  icon: <EnvelopeSimple size={24} weight="fill" />,
                },
              ].map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="group w-12 h-12 rounded-full bg-black flex items-center justify-center cursor-pointer text-white hover:text-black transition-colors hover:bg-taxidermia-blue active:opacity-80"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Klaviyo Signup Form */}
      <section className="[&_form]:!float-none [&_form]:!p-0">
        <div className="mx-auto max-w-[600px] px-4 py-12">
          <div className="text-[22px] leading-[33px] space-y-4">
            <div className="klaviyo-form-SdYxhD"></div>
          </div>
        </div>
      </section>

      {/* Ectophonic Groovulator */}
      <section>
        <div className="mx-auto max-w-[600px] px-4 py-12 space-y-2">
          <Image
            src="/images/taxidermia/eg-logo.png"
            alt="Created by Ectophonic Groovulator"
            width={1000}
            height={500}
            className="w-full h-auto"
          />
          <p className="text-[22px] leading-[33px] max-md:px-4">
            This project was created by{" "}
            <Link href="/" className="underline hover:text-taxidermia-pink transition-colors">
              Ectophonic Groovulator
            </Link>
            , an independent studio from Minneapolis, making short, haunted musicals and other
            oddities. We write songs about goblins, cults, dolphin suicides, and whatever else
            crawls out of the woods. Our projects,{" "}
            <Link
              href="/theverybaddays"
              className="underline hover:text-taxidermia-pink transition-colors"
            >
              The Very Bad Days
            </Link>{" "}
            and{" "}
            <Link
              href="/jimfrankenstein"
              className="underline hover:text-taxidermia-pink transition-colors"
            >
              Jim Frankenstein
            </Link>
            , mix dark humor with 90s alt-rock fuzz and basement-punk energy. If you like your
            laughter with a chill and your horror with a wink, welcome to the Groovulator.
          </p>
        </div>
      </section>

      <footer className="overflow-x-clip">
        <div className="mx-auto max-w-6xl px-4 pt-12 pb-[148px] flex items-center justify-center">
          <div className="relative flex items-center justify-center overflow-visible">
            <img
              src="/images/taxidermia/SVG/Green Splash Tall.svg"
              alt=""
              aria-hidden="true"
              draggable={false}
              className="absolute pointer-events-none max-w-none"
              style={{
                left: "50%",
                top: "50%",
                width: "508px",
                height: "auto",
                transform: "translate(-50%, -40%)",
              }}
            />
            <span
              className="relative italic text-black select-none mr-[19px] font-astounder"
              style={{ fontSize: "33px", lineHeight: "33px" }}
            >
              Follow
            </span>
            <div className="relative flex gap-[14px]">
              {[
                {
                  href: SOCIAL_LINKS.groovulator.instagram.href,
                  label: "Instagram",
                  icon: <InstagramLogo size={24} weight="fill" />,
                },
                {
                  href: SOCIAL_LINKS.groovulator.spotify.href,
                  label: "Spotify",
                  icon: <SpotifyLogo size={24} weight="fill" />,
                },
                {
                  href: SOCIAL_LINKS.groovulator.youtube.href,
                  label: "YouTube",
                  icon: <YoutubeLogo size={24} weight="fill" />,
                },
                {
                  href: SOCIAL_LINKS.groovulator.email.href,
                  label: "Email",
                  icon: <EnvelopeSimple size={24} weight="fill" />,
                },
              ].map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="group w-12 h-12 rounded-full bg-black flex items-center justify-center cursor-pointer text-white hover:text-black transition-colors hover:bg-taxidermia-blue active:opacity-80"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
