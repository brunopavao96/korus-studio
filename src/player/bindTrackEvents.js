import { mutedTrack, unmutedTrack } from "../audio/mutedTrack.js";
import { handleTrackSolo } from "../audio/handleTrackSolo.js";

export function bindTrackEvents(tracksElements) {

    tracksElements.forEach(item => {

        item.slider.addEventListener("input", () => {

            const volume = item.slider.value / 100;

            item.track.audio.volume = volume;

            item.track.volumeAntesMute = null;

        });


        item.nomeInstrumento.addEventListener("click", () => {

            if (item.track.volumeAntesMute === null) {
                mutedTrack(item.track, item.slider);
            } else {
                unmutedTrack(item.track, item.slider);
            }

        });


        item.solo.addEventListener("click", () => {

            handleTrackSolo(item.track);

        });

    });

}