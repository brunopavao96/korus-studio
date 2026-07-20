import { state } from "../state.js";
import { connectTrack } from "../audio/connectTrack.js";

export function playTracks(){
    state.audioTracks.forEach( track => {
        track.audio.play();
    })
};

export function pauseTracks(){
    state.audioTracks.forEach( track => {
        track.audio.pause();
    })
};

export function stopTracks(){
    state.audioTracks.forEach( track => {
        track.audio.pause();
        track.audio.currentTime = 0;
    })
};