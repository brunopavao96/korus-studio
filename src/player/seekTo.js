import { state } from "../state.js";
import { updateLyrics } from "../lyrics/updateLyrics.js";
import { formatTime } from "../utils.js";

export function seekTo(time) {

    if (!state.audioTracks.length) return;


    state.audioTracks.forEach(track => {

        if (track.audio) {
            track.audio.currentTime = time;
        }

    });


    const audio = state.audioTracks[0].audio;


    if (audio.duration) {

        const percent = (audio.currentTime / audio.duration) * 100;

        state.progressTrack.value = percent;

    }


    state.currentTrack.textContent = formatTime(audio.currentTime);


    updateLyrics(time);

}