import { state } from "../state.js";

export function playTracks(){
    state.audioTracks.forEach( audio => {
        
        audio.play();
    })
};

export function pauseTracks(){
    state.audioTracks.forEach( audio => {
        audio.pause();
    })
};

export function stopTracks(){
    state.audioTracks.forEach( audio => {
        audio.pause();
        audio.currentTime = 0;
    })
};