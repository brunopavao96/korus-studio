let audioContext = null;

export function getAudioContext(){
    if(!audioContext){
        audioContext = new AudioContext();
    }
    return audioContext;
}