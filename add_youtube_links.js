const fs = require('fs');

// Read the current file
const filePath = 'src/app/jimfrankenstein/songs/songs.ts';
let content = fs.readFileSync(filePath, 'utf8');

// YouTube link mappings (cleaned URLs without query params)
const youtubeLinks = {
  'mr-gray': 'https://youtu.be/0b-Mxa19rwE',
  'no-escape-from-the-love': 'https://youtu.be/31rNqRtwAz8',
  'ripple-in-the-tide': 'https://youtu.be/zxaXX5KQCag',
  'weird': 'https://youtu.be/EQ2qyN3On3E',
  'cold-wind-in-the-garden': 'https://youtu.be/EGF7PXS9qGw',
  'europa': 'https://youtu.be/0PLGz_MCZmA',
  'biotechnic-frankenstein': 'https://youtu.be/MAuVpXVeRPk',
  'azazel': 'https://youtu.be/Cdx3mAhrrFo',
  'calamari-sunshine': 'https://youtu.be/6lxKZz0Xruk',
  'souls-and-ghosts': 'https://youtu.be/tWluWmOGg8Y'
};

// For each song, add the YouTube link after the appleMusicLink line
Object.keys(youtubeLinks).forEach(songId => {
  const youtubeLink = youtubeLinks[songId];
  
  // Find the song block and add youtubeLink after appleMusicLink
  const songPattern = new RegExp(`(id: "${songId}",[\\s\\S]*?appleMusicLink: "[^"]*",)`, 'g');
  
  content = content.replace(songPattern, (match) => {
    // Check if youtubeLink already exists
    if (match.includes('youtubeLink:')) {
      return match;
    }
    return match + `\n    youtubeLink: "${youtubeLink}",`;
  });
});

// Write the updated content back
fs.writeFileSync(filePath, content);

console.log('Successfully added YouTube links to all Souls and Ghosts tracks!');

// Show which songs were updated
Object.keys(youtubeLinks).forEach(songId => {
  console.log(`- ${songId}: ${youtubeLinks[songId]}`);
});