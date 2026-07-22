import { elements } from "../elements.js";
import { bindTrackEvents } from "./bindTrackEvents.js";
import { createElementTrack } from "./createElementTrack.js";

export function renderTracks(tracks){
    
    elements.trackContainer.innerHTML = '';

    const trackElements = [];

    for (const track of tracks){

        const trackUI = createElementTrack(track);

        elements.trackContainer.append(trackUI.element);

        trackElements.push(trackUI);
    }

    return trackElements;
}
