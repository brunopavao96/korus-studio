import { getAudioContext } from "./audioContext.js";

export function connectTrack(track){
    const context = getAudioContext();
    const source = context.createMediaElementSource(track);
    const gain = context.createGain()
    source.connect(gain);
    source.connect(context.destination);
    gain.connect(context.destination);
    return {source, gain};
}