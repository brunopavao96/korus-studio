import { elements } from "../elements.js";
import { state } from "../state.js";

export function renderProgress(){
    elements.sliderProgress.innerHTML = "";

    state.currentTrack = document.createElement('span');
    state.progressTrack = document.createElement('input'); 
    state.durationTrack = document.createElement('span');
    
    state.currentTrack.className = 'time-display';
    state.progressTrack.className = 'main-progress-bar';
    state.durationTrack.className = 'time-display';

    state.progressTrack.type = "range";
    state.progressTrack.max = 100;
    state.progressTrack.min = 0;
    state.progressTrack.value = 0;
    state.currentTrack.textContent = "00:00";
    state.durationTrack.textContent = "00:00";

    state.progressTrack.addEventListener('input', () => {
        state.audioTracks.forEach(track => {
            if (track.audio && track.audio.duration) {
                track.audio.currentTime = (state.progressTrack.value / 100) * track.audio.duration;
            }
        });
    });

    elements.sliderProgress.appendChild(state.currentTrack);
    elements.sliderProgress.appendChild(state.progressTrack);
    elements.sliderProgress.appendChild(state.durationTrack);
}
