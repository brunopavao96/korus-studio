import { state } from "../state.js";

export function backFiveSeconds(){

    state.audioTracks.forEach(track => {

        track.audio.currentTime -= 5;

    });

}


export function forwardFiveSeconds(){

    state.audioTracks.forEach(track => {

        track.audio.currentTime += 5;

    });

}