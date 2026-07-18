import { playTracks, pauseTracks, stopTracks } from "./actions.js";
import { elements } from "../elements.js";

export function renderControls (){
    const playButton = document.createElement('button');
    const pauseButton = document.createElement('button');
    const stopButton = document.createElement('button');
    playButton.textContent = 'Play';
    pauseButton.textContent = 'Pause';
    stopButton.textContent = 'Stop';
    playButton.addEventListener('click', playTracks);
    pauseButton.addEventListener('click', pauseTracks);
    stopButton.addEventListener('click', stopTracks);
    elements.playerControls.appendChild(playButton);
    elements.playerControls.appendChild(pauseButton);
    elements.playerControls.appendChild(stopButton);
}1