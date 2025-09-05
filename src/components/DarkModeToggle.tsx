"use client";

import { useState, useEffect } from 'react';
import { Moon, Sun } from '@phosphor-icons/react';

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Handle hydration and theme initialization
  useEffect(() => {
    setMounted(true);
    
    // Initialize theme based on saved preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && systemDark);
    
    setIsDark(shouldBeDark);
    
    // Apply the theme
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const html = document.documentElement;
    
    if (html.classList.contains('dark')) {
      // Currently dark, switch to light
      html.classList.remove('dark');
      setIsDark(false);
      localStorage.setItem('theme', 'light');
    } else {
      // Currently light, switch to dark
      html.classList.add('dark');
      setIsDark(true);
      localStorage.setItem('theme', 'dark');
    }
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="w-8 h-8 rounded-full border border-black/20 dark:border-white/20 flex items-center justify-center">
        <div className="w-4 h-4 animate-pulse bg-gray-400 rounded"></div>
      </div>
    );
  }

  return (
    <button
      onClick={toggleDarkMode}
      className="w-8 h-8 rounded-full border border-black/20 dark:border-white/20 flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
      aria-label="Toggle dark mode"
    >
      {isDark ? (
        <Sun size={16} className="text-black dark:text-white" />
      ) : (
        <Moon size={16} className="text-black dark:text-white" />
      )}
    </button>
  );
}