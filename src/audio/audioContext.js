let audioContext;

export function getAudioContext() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioContext;
}

export async function initSoundTouch() {
    console.log("Motor de áudio inicializado.");
}
