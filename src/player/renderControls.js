import { playTracks, pauseTracks, stopTracks } from "./actions.js";
import { elements } from "../elements.js";
import { acima, abaixo } from "../audio/pitchSong.js";

export function renderControls (){
    elements.play.addEventListener('click', playTracks);
    elements.pause.addEventListener('click', pauseTracks);
    elements.stop.addEventListener('click', stopTracks);
    elements.tomAcima.addEventListener('click', acima);
    elements.tomAbaixo.addEventListener('click', abaixo);
}