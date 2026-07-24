import { state } from "../state.js";

export function handleTrackSolo(track) {

    if (state.tracksInSolo.length === 0) {

        state.audioTracks.forEach(item => {
            item.volumeAntesSolo = item.audio.volume;
        });

    }

    const indice = state.tracksInSolo.indexOf(track.id);

    if (indice > -1) {
        state.tracksInSolo.splice(indice, 1);
    } else {
        state.tracksInSolo.push(track.id);
    }


    if (state.tracksInSolo.length === 0) {

        state.audioTracks.forEach(item => {

            item.audio.volume = item.volumeAntesSolo;
            item.slider.value = item.volumeAntesSolo * 100;

            item.volumeAntesSolo = null;
            item.solo.classList.remove("active");

        });

        return;
    }


    state.audioTracks.forEach(item => {

        const estaEmSolo = state.tracksInSolo.includes(item.id);

        if (estaEmSolo) {

            item.audio.volume = item.volumeAntesSolo;
            item.slider.value = item.volumeAntesSolo * 100;
            item.solo.classList.add("active");

        } else {

            item.audio.volume = 0;
            item.slider.value = 0;
            item.solo.classList.remove("active");

        }

    });

}