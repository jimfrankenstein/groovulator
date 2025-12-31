"use client";

import React from "react";

export default function Header() {
  return (
    <header className="h-32 flex overflow-visible relative">
      {/* Pink area with logo - allow overflow */}
      <div className="w-1/2 bg-pink-500 flex items-center justify-center relative overflow-visible rounded-tl-lg">
        <div className="w-48 h-48 bg-white/20 rounded-full flex items-center justify-center absolute">
          <span className="text-white text-2xl font-bold">LOGO</span>
        </div>
      </div>

      {/* Blue area with tag */}
      <div className="w-1/2 bg-blue-600 relative flex items-center justify-center rounded-tr-lg">
        {/* Tag aligned to top, no rotation */}
        <div className="absolute top-0 right-8 bg-orange-500 px-6 py-2 rounded-b-lg">
          <span className="text-white font-bold text-sm">GROOVULATOR</span>
        </div>
      </div>
    </header>
  );
}
