"use client";

import React from "react";

const textItems = [
  "WARNING",
  "COLLECTOR SERIES",
  "AGES 4+",
  "POSEABLE ACTION",
  "LIMITED EDITION",
  "OFFICIAL MERCHANDISE",
  "BATTLE READY",
  "SUPER ARTICULATED",
];

export default function TextSection() {
  return (
    <section className="py-4 px-4 md:px-6 lg:px-8">
      <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
        {textItems.map((item, index) => (
          <div key={index} className="bg-purple-700 px-4 py-2 rounded-md shadow-md">
            <span className="text-white font-bold text-sm md:text-base">{item}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
