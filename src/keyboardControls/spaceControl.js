import { state } from "../state.js";
import { elements } from "../elements.js";
import { playTracks, pauseTracks } from "../player/actions.js";

export function spaceControl() {

    if (!state.audioTracks.length) {
        return;
    }

    const isPlaying = state.audioTracks.some(
        track => !track.audio.paused
    );

    if (isPlaying) {
        pauseTracks();
    } else {
        playTracks();
    }
}

export function setupSpaceControl() {

    document.addEventListener("keydown", (event) => {

        if (event.code !== "Space") {
            return;
        }

        if (elements.playerScreen.classList.contains("hidden")) {
            return;
        }

        event.preventDefault();

        spaceControl();
    });
}