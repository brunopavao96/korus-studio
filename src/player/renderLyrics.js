import { state } from "../state.js";
import { elements } from "../elements.js";

export async function renderLyrics(song){
    const response = await fetch(`${state.currentSong}/${song.lyrics}`);
    const lyrics = await response.text();
    elements.containerLyrics.textContent = lyrics;
}