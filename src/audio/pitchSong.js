import { state } from "../state.js";
import { elements } from "../elements.js";

function aplicarPitch() {

    const rate = Math.pow(2, state.pitch / 12);

    state.audioTracks.forEach(track => {

        track.audio.preservesPitch = false;
        track.audio.mozPreservesPitch = false;
        track.audio.webkitPreservesPitch = false;

        track.audio.playbackRate = rate;

    });

    if (state.pitch > 0) {
        elements.tonalidadeAtual.textContent = `+${state.pitch.toFixed(1)}`;
    } else {
        elements.tonalidadeAtual.textContent = state.pitch.toFixed(1);
    }
}


export function acima() {

    if (state.pitch >= 0.5) return;

    state.pitch += 0.5;
    aplicarPitch();

}


export function abaixo() {

    if (state.pitch <= -0.5) return;

    state.pitch -= 0.5;
    aplicarPitch();

}