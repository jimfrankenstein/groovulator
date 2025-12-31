"use client";

import React from "react";
import { characters } from "../../app/sandbox/characters-data";

interface CharacterCardSectionProps {
  characterSlug?: string;
}

export default function CharacterCardSection({ characterSlug }: CharacterCardSectionProps) {
  const character = characters.find(char => char.id === characterSlug) || characters[0];

  return (
    <section className="pt-4 pb-8 px-4 md:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content - 2 columns on desktop */}
        <div className="lg:col-span-2 bg-yellow-300 p-8 rounded-lg">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">{character.title}</h2>
          <p className="text-gray-800 text-lg mb-6">{character.description}</p>

          <div className="mb-6">
            <h3 className="text-2xl font-bold mb-3 text-gray-900">Special Abilities</h3>
            <ul className="list-disc list-inside space-y-2">
              {character.abilities.map((ability, index) => (
                <li key={index} className="text-gray-800 text-lg">
                  {ability}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900">Stats</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-800 font-semibold">Power</span>
                  <span className="text-gray-800 font-bold">{character.stats.power}/10</span>
                </div>
                <div className="w-full bg-yellow-500 rounded-full h-3">
                  <div
                    className="bg-orange-600 h-3 rounded-full"
                    style={{ width: `${character.stats.power * 10}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-800 font-semibold">Speed</span>
                  <span className="text-gray-800 font-bold">{character.stats.speed}/10</span>
                </div>
                <div className="w-full bg-yellow-500 rounded-full h-3">
                  <div
                    className="bg-blue-600 h-3 rounded-full"
                    style={{ width: `${character.stats.speed * 10}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-800 font-semibold">Defense</span>
                  <span className="text-gray-800 font-bold">{character.stats.defense}/10</span>
                </div>
                <div className="w-full bg-yellow-500 rounded-full h-3">
                  <div
                    className="bg-green-600 h-3 rounded-full"
                    style={{ width: `${character.stats.defense * 10}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary content - 1 column on desktop */}
        <div className="p-6 rounded-lg">
          <div className="space-y-4">
            <div className="bg-yellow-400 p-4 rounded-lg">
              <h4 className="font-bold text-gray-900 mb-2">Origin</h4>
              <p className="text-gray-800">Unknown Territory</p>
            </div>
            <div className="bg-yellow-400 p-4 rounded-lg">
              <h4 className="font-bold text-gray-900 mb-2">Rarity</h4>
              <p className="text-gray-800">Ultra Rare</p>
            </div>
            <div className="bg-yellow-400 p-4 rounded-lg">
              <h4 className="font-bold text-gray-900 mb-2">Collection</h4>
              <p className="text-gray-800">Series 1</p>
            </div>
            <div className="bg-yellow-400 p-4 rounded-lg">
              <h4 className="font-bold text-gray-900 mb-2">Release Year</h4>
              <p className="text-gray-800">2025</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
