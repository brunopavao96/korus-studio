import { state } from "../state.js";
import { formatTime } from "../utils.js";

let animationFrame = null;

export function updateProgress() {
    if (!state.audioTracks.length) return;

    const audio = state.audioTracks[0].audio;

    function update() {
        if (!audio.duration) {
            animationFrame = requestAnimationFrame(update);
            return;
        }

        const percent = (audio.currentTime / audio.duration) * 100;

        state.progressTrack.value = percent;
        state.currentTrack.textContent = formatTime(audio.currentTime);
        state.durationTrack.textContent = formatTime(audio.duration);

        if (!audio.paused) {
            animationFrame = requestAnimationFrame(update);
        }
    }

    cancelAnimationFrame(animationFrame);
    update();
}