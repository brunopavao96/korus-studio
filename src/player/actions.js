import { state } from "../state.js";

export function playTracks(){
    if(state.audioTracks.length === 0){
        console.warn("Nenhuma track carregada");
        return
    }
    state.audioTracks.forEach( track => {
        track.audio.play();
    });
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

    if(state.currentTrack){
        state.currentTrack.textContent = "00:00";
    }
    console.log('Música Parada')
}