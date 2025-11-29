import React from "react";
import Header from "../../components/taxidermia/Header";
import StorySection from "../../components/taxidermia/StorySection";
import CharacterSection from "../../components/taxidermia/CharacterSection";
import TextSection from "../../components/taxidermia/TextSection";
import CharacterCardSection from "../../components/taxidermia/CharacterCardSection";

export default function TaxidermiaPage() {
  return (
    <div className="min-h-screen p-4 md:p-8 lg:p-8">
      {/* Blue card container with max width and centered */}
      <div
        className="max-w-[1280px] bg-cyan-500 rounded-lg overflow-visible"
        style={{ margin: "0 auto" }}
      >
        <Header />
        <div>
          <StorySection />
          <CharacterSection initialSlug="the-rabbit" />
          <TextSection />
          <CharacterCardSection characterSlug="the-rabbit" />
        </div>
      </div>
    </div>
  );
}
