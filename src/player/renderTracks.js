import { elements } from "../elements.js";
import { createElementTrack } from "./createElementTrack.js";

export function renderTracks(song){
    
    elements.trackContainer.innerHTML = '';

    for ( const track of song.tracks ){

        const trackElement = createElementTrack(track);

        elements.trackContainer.append(trackElement);
    }
}
