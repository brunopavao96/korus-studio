import { elements } from "../elements.js";
import { state } from "../state.js";

export function renderProgress(){
    state.atualTrack = document.createElement('span');
    state.progressTrack = document.createElement('input'); 
    state.durationTrack = document.createElement('span');
    state.progressTrack.type = "range";
    state.progressTrack.max = 100;
    state.progressTrack.min = 0;
    state.progressTrack.value = 0;
    state.atualTrack.textContent = "00:00";
    state.durationTrack.textContent = "00:00";
    state.progressTrack.addEventListener('input', () => {
        state.audioTracks.forEach(audio => {
            audio.currentTime = (progressTrack.value / 100) * audio.duration
        })
    })
    elements.sliderProgress.appendChild(state.atualTrack);
    elements.sliderProgress.appendChild(state.progressTrack);
    elements.sliderProgress.appendChild(state.durationTrack);
}