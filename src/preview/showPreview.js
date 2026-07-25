import { elements } from "../elements.js";

const previewPlayer = new Audio();

let hoverTimer = null;
let stopTimer = null;

export async function showPreview(song){
    const response = await fetch(`songs/${song.folder}/song.json`);
    const songData = await response.json();

    elements.coverCard.src = `songs/${song.folder}/${songData.cover}`;
    elements.titleCard.textContent = songData.title;
    elements.artistCard.textContent = songData.artist;
    elements.durationCard.textContent = "Duration: " + songData.duration;
}