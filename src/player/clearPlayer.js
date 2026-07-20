import { elements } from "../elements.js";
import { state } from "../state.js";

export function clearPlayer(){
    elements.trackContainer.innerHTML = '';
    elements.sliderProgress.innerHTML = '';
    elements.containerLyrics.innerHTML = '';
    elements.songArtist.innerHTML = '';
    elements.songTitle.innerHTML = '';

    state.audioTracks.length = 0;

    elements.playerScreen.classList.add("hidden");
    elements.libraryScreen.classList.remove("hidden");
}