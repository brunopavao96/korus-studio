import { state } from "../state.js";
import { updateProgress } from "./updateProgress.js";
import { formatTime } from "../utils.js";

export function playTracks(){
    if(state.audioTracks.length === 0){
        console.warn("Nenhuma track carregada");
        return
    }
    state.audioTracks.forEach(track => {
    track.audio.play();
    });

    updateProgress();
}

export function pauseTracks(){
    state.audioTracks.forEach( track => {
        track.audio.pause();
    })
}

export function stopTracks(){
    state.audioTracks.forEach( track => {
        track.audio.pause();
        track.audio.currentTime = 0;
    });

    if(state.audioTracks){
        state.progressTrack.value = 0;
    }

    if (state.durationTrack) {
    const audio = state.audioTracks[0]?.audio;
    state.durationTrack.textContent = audio ? formatTime(audio.duration || 0) : "00:00";
    }
    console.log('Música Parada')
}