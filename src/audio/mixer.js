import { state } from "../state.js";

export function handleTrackSolo(track, trackAudio, trackSlider) {

    console.log('solo funcionando')
    if (!state.tracksInSolo) state.tracksInSolo = [];
    if (!state.volumesAntesDoSolo) state.volumesAntesDoSolo = {};

    if (state.tracksInSolo.length === 0) {
        state.audioTracks.forEach(t => {
            state.volumesAntesDoSolo[t.type] = t.audio.volume;
        });
    }

    const indice = state.tracksInSolo.indexOf(track.type);

    if (indice > -1) {
        state.tracksInSolo.splice(indice, 1);
    } else {
        state.tracksInSolo.push(track.type);
    }

    const modoSoloAtivo = state.tracksInSolo.length > 0;

    state.audioTracks.forEach(item => {
        const nomeElement = item.nameElement;

        if (modoSoloAtivo) {
            const estaNoSolo = state.tracksInSolo.includes(item.type);

            item.audio.muted = !estaNoSolo;

            if (nomeElement) {
                nomeElement.classList.toggle('solo-muted', !estaNoSolo);
            }
        } else {
            item.audio.muted = false;
            
            if (nomeElement) {
                nomeElement.classList.remove('solo-muted');
            }
        }
    });
}
