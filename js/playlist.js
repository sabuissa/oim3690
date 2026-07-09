const songs = [
  "Blinding Lights",
  "One Dance",
  "Levels - Remix",
  "Sunflower",
  "Midnight City - Remix"
];

const playlist = document.getElementById("playlist");
const songInput = document.getElementById("song-input");
const addSongButton = document.getElementById("add-song");

function renderPlaylist() {
  playlist.innerHTML = "";

  for (const song of songs) {
    const li = document.createElement("li");
    li.textContent = song;

    if (song.includes("Remix")) {
      li.textContent = song + " 🔥";
    }

    playlist.appendChild(li);
  }
}

addSongButton.addEventListener("click", () => {
  const newSong = songInput.value.trim();
  if (!newSong) return;

  songs.push(newSong);
  songInput.value = "";
  renderPlaylist();
});

renderPlaylist();