"use client";

import { Moon, Sun } from '@phosphor-icons/react';
import { useDarkMode } from './DarkModeContext';

export default function DarkModeToggle() {
  const { isDark, toggleDarkMode } = useDarkMode();

  return (
    <button
      onClick={toggleDarkMode}
      className="w-8 h-8 rounded-full border border-black/20 dark:border-white/20 flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
      aria-label="Toggle dark mode"
    >
      {isDark ? (
        <Sun size={20} />
      ) : (
        <Moon size={20} />
      )}
    </button>
  );
}