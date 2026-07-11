const songPath = "songs/somebody-told-me/song.json";

async function loadSong() {
    const response = await fetch(songPath);
    const song = await response.json();
    console.log(song);
}
loadSong();