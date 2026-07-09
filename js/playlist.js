const songs = [
  "Blinding Lights",
  "One Dance",
  "Levels - Remix",
  "Sunflower",
  "Midnight City - Remix"
];

const playlist = document.getElementById("playlist");

for (const song of songs) {
  const li = document.createElement("li");
  li.textContent = song;

  if (song.includes("Remix")) {
    li.textContent = song + " 🔥";
  }

  playlist.appendChild(li);
}