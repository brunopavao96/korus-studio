import { state } from "../state.js";

export function changeTime(time) {

    state.audioTracks.forEach(track => {

        if (track.audio && track.audio.duration) {
            track.audio.currentTime = time;
        }

    });

}