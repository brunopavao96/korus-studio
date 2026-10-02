import { playTracks, pauseTracks, stopTracks } from "./actions.js";
import { elements } from "../elements.js";
import { acima, abaixo } from "../audio/pitchSong.js";
import { backLibrary } from "../library/backLibrary.js";
import { backFiveSeconds, forwardFiveSeconds } from "../player/seek.js";

export function controlsAction(){
    elements.play.addEventListener('click', playTracks);
    elements.pause.addEventListener('click', pauseTracks);
    elements.stop.addEventListener('click', stopTracks);
    elements.tomAcima.addEventListener('click', acima);
    elements.tomAbaixo.addEventListener('click', abaixo);
    elements.backButton.addEventListener('click', backLibrary);
    elements.backward.addEventListener("click", backFiveSeconds);
    elements.forward.addEventListener("click", forwardFiveSeconds);
}