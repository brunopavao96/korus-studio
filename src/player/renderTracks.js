import { elements } from "../elements.js";
import { backLibrary } from "../library/backLibrary.js";
import { state } from "../state.js";
import { formatTime } from "../utils.js";

export function renderTracks(song){
    elements.backButton.addEventListener('click', backLibrary)
    song.tracks.forEach(track => {
        const trackElement = document.createElement('div');
        const trackName = document.createElement('span');
        const trackSlider = document.createElement('input');
        const trackAudio = document.createElement('audio');
        trackAudio.src = `${state.currentSong}/tracks/${track.file}`;
        trackAudio.preload = "auto";
        if (state.audioTracks.length === 0) {

        trackAudio.addEventListener("loadedmetadata", () => {
            state.durationTrack.textContent = formatTime(trackAudio.duration);
        });
        trackAudio.addEventListener("timeupdate", () => {
            state.atualTrack.textContent = formatTime(trackAudio.currentTime);
            state.progressTrack.value = 
            (trackAudio.currentTime / trackAudio.duration) * 100;
        });
    }
        state.audioTracks.push(trackAudio);
        trackSlider.type = "range";
        trackSlider.min = 0;
        trackSlider.max = 100;
        trackSlider.value = 100;
        trackSlider.addEventListener('input', () => {
            trackAudio.volume = trackSlider.value / 100;
        });
        trackName.textContent = track.name;
        trackElement.appendChild(trackName);
        trackElement.appendChild(trackSlider);
        elements.trackContainer.appendChild(trackElement);
    });
}