import { elements } from "../elements.js";
import { createElementTrack } from "./createElementTrack.js";

export function renderTracks(tracks){

    elements.trackContainer.innerHTML = '';

    const trackElements = [];

    for (const track of tracks){

        const trackUI = createElementTrack(track);

        track.slider = trackUI.slider;
        track.nomeInstrumento = trackUI.nomeInstrumento;
        track.solo = trackUI.solo;

        elements.trackContainer.append(trackUI.element);

        trackElements.push(trackUI);
    }

    return trackElements;
}