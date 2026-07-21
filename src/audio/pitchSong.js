import { state } from "../state.js";
import { elements } from "../elements.js";

// FUNÇÃO INTERNA: Aplica a alteração nas trilhas (Bateria protegida)
function aplicarDetuneNativo() {
    // 1. Atualiza o indicador visual na tela do player
    if (elements.tonalidadeAtual) {
        elements.tonalidadeAtual.textContent = state.pitch === 0 
            ? "Tom Original" 
            : `Tom: ${state.pitch > 0 ? '+' : ''}${state.pitch}`;
    }

    // 2. Converte o número de cliques em centésimos de tom (Cents)
    const centsCalculados = state.pitch * 100;

    // 3. Varre todas as faixas aplicando o tom diretamente no hardware de som
    state.audioTracks.forEach(track => {
        if (track.source && track.source.detune) {
            
            // O PULO DO GATO: Se o tipo do instrumento for bateria, bloqueia!
            // Ela recebe '0' cents, continuando sempre na afinação original de fábrica.
            if (track.type === 'drums' || track.type === 'bateria') {
                track.source.detune.value = 0; 
                return; // Pula imediatamente para o próximo instrumento da lista
            }

            // Para os outros instrumentos (voz, guitarra, baixo, teclado), aplica a transposição
            track.source.detune.value = centsCalculados;
        }
    });

    console.log(`[Detune Protegido] ${centsCalculados} cents aplicados. Bateria protegida.`);
}

// FUNÇÃO: Executada quando clica no botão de MAIS (+)
export function acima() {
    // Permite subir em até 6 semitons acumulativos (meio em meio tom)
    if (state.pitch < 6) {
        state.pitch++;
        aplicarDetuneNativo(); // Dispara o motor protegido acima
    }
}

// FUNÇÃO: Executada quando clica no botão de MENOS (-)
export function abaixo() {
    // Permite baixar em até -6 semitons acumulativos (meio em meio tom)
    if (state.pitch > -6) {
        state.pitch--;
        aplicarDetuneNativo(); // Dispara o motor protegido acima
    }
}
