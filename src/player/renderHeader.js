import { elements } from "../elements.js";

export function renderHeader(song){
    elements.songTitle.textContent = song.title;
    elements.songArtist.textContent = song.artist;

}