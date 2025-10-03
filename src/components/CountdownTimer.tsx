"use client";

import { useState, useEffect } from "react";

interface CountdownTimerProps {
  releaseDate: string; // Format: "YYYY-MM-DD"
}

export default function CountdownTimer({ releaseDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Parse the date string to ensure it's treated as local date
    const [year, month, day] = releaseDate.split("-").map(Number);
    const targetDate = new Date(year, month - 1, day).getTime(); // month is 0-indexed

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    // Update immediately
    updateCountdown();

    // Update every second
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [releaseDate]);

  const formatDate = (dateString: string) => {
    // Parse the date string and add timezone offset to ensure it's treated as local date
    const [year, month, day] = dateString.split("-").map(Number);
    const date = new Date(year, month - 1, day); // month is 0-indexed
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div>
      <div>
        {/* Black & White Vintage Poster Style Countdown */}
        <div className="relative bg-white dark:bg-black border-4 border-black dark:border-white p-6 shadow-2xl">
          {/* Decorative corner flourishes */}
          <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-black dark:border-white"></div>
          <div className="absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 border-black dark:border-white"></div>
          <div className="absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 border-black dark:border-white"></div>
          <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-black dark:border-white"></div>

          {/* Vintage header */}
          <div className="text-center mb-6">
            <div
              className="text-2xl md:text-3xl font-bold text-black dark:text-white mb-2"
              style={{ fontFamily: "var(--font-monoton)" }}
            >
              Releasing {formatDate(releaseDate)}
            </div>
            <div className="text-lg md:text-xl text-black dark:text-white tracking-wide">
              LIMITED EDITION
            </div>
            <div className="text-sm text-black dark:text-white mt-1 opacity-70">
              COMING TO ALL MAJOR STREAMING PLATFORMS
            </div>
          </div>

          {/* Countdown grid with vintage styling */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center bg-gray-100 dark:bg-gray-800 rounded-lg p-3 border-2 border-black dark:border-white shadow-inner">
              <div
                className="text-3xl md:text-4xl font-bold text-black dark:text-white"
                style={{ fontFamily: "var(--font-monoton)" }}
              >
                {timeLeft.days}
              </div>
              <div className="text-xs font-semibold text-black dark:text-white tracking-wider uppercase">
                Days
              </div>
            </div>
            <div className="text-center bg-gray-100 dark:bg-gray-800 rounded-lg p-3 border-2 border-black dark:border-white shadow-inner">
              <div
                className="text-3xl md:text-4xl font-bold text-black dark:text-white"
                style={{ fontFamily: "var(--font-monoton)" }}
              >
                {timeLeft.hours}
              </div>
              <div className="text-xs font-semibold text-black dark:text-white tracking-wider uppercase">
                Hours
              </div>
            </div>
            <div className="text-center bg-gray-100 dark:bg-gray-800 rounded-lg p-3 border-2 border-black dark:border-white shadow-inner">
              <div
                className="text-3xl md:text-4xl font-bold text-black dark:text-white"
                style={{ fontFamily: "var(--font-monoton)" }}
              >
                {timeLeft.minutes}
              </div>
              <div className="text-xs font-semibold text-black dark:text-white tracking-wider uppercase">
                Minutes
              </div>
            </div>
            <div className="text-center bg-gray-100 dark:bg-gray-800 rounded-lg p-3 border-2 border-black dark:border-white shadow-inner">
              <div
                className="text-3xl md:text-4xl font-bold text-black dark:text-white"
                style={{ fontFamily: "var(--font-monoton)" }}
              >
                {timeLeft.seconds}
              </div>
              <div className="text-xs font-semibold text-black dark:text-white tracking-wider uppercase">
                Seconds
              </div>
            </div>
          </div>

          {/* Vintage footer */}
          <div className="text-center mt-4">
            <div className="text-xs text-black dark:text-white tracking-widest opacity-70">
              ORIGINAL • QUALITY • 1955
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
