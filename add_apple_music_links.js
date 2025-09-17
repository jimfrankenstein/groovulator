const fs = require("fs");

// Read the current file
const filePath = "src/app/jimfrankenstein/songs/songs.ts";
let content = fs.readFileSync(filePath, "utf8");

// Apple Music ID mappings
const appleMusicIds = {
  "souls-and-ghosts": "1173364081",
  "calamari-sunshine": "1173364080",
  azazel: "1173364079",
  "biotechnic-frankenstein": "1173364078",
  europa: "1173364077",
  "cold-wind-in-the-garden": "1173364076",
  weird: "1173364075",
  "ripple-in-the-tide": "1173364074",
  "no-escape-from-the-love": "1173364073",
  "mr-gray": "1173364069",
};

// For each song, add the Apple Music link after the releaseDate line
Object.keys(appleMusicIds).forEach(songId => {
  const appleId = appleMusicIds[songId];
  const appleMusicLink = `https://music.apple.com/us/song/${songId}/${appleId}`;

  // Find the song block and add appleMusicLink after releaseDate
  const songPattern = new RegExp(`(id: "${songId}",[\\s\\S]*?releaseDate: "2016-10-31",)`, "g");

  content = content.replace(songPattern, match => {
    // Check if appleMusicLink already exists
    if (match.includes("appleMusicLink:")) {
      return match;
    }
    return match + `\n    appleMusicLink: "${appleMusicLink}",`;
  });
});

// Write the updated content back
fs.writeFileSync(filePath, content);

console.log("Successfully added Apple Music links to all Souls and Ghosts tracks!");
