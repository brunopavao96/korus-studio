import { elements } from "../elements.js";
import { state } from "../state.js";

export function clearPlayer(){
    elements.trackContainer.innerHTML = '';
    elements.playerControls.innerHTML = '';
    elements.sliderProgress.innerHTML = '';
    elements.containerLyrics.innerHTML = '';

    state.audioTracks.length = 0;
}