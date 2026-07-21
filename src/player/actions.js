import { state } from "../state.js";
import { getAudioContext } from "../audio/audioContext.js"; 

state.nodesStarted = false;

export function playTracks(){
    const context = getAudioContext();

    if (context && context.state === 'suspended') {
        context.resume();
    }

    if (state.audioTracks.length === 0) {
        console.warn("Aguardando os instrumentos carregarem na memória...");
        return; 
    }

    if (!nodesJaIniciado) {
        state.audioTracks.forEach(track => {
            if (track.source && track.source.buffer) {
                track.source.start(0);
            }
        });
        nodesJaIniciado = true;
        console.log("🔊 Banda tocando direto da memória RAM com sucesso!");
    }
}

export function pauseTracks(){
    const context = getAudioContext();
    
    if (context && context.state === 'running') {
        context.suspend();
    }
}

export function stopTracks(){
    const context = getAudioContext();
    if (context) {
        context.suspend();
    }

    if (state.progressTrack) state.progressTrack.value = 0;
    if (state.atualTrack) state.atualTrack.textContent = "00:00";
    
    console.log("Música pausada no início.");
}
