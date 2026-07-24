import { connectTracks } from "../audio/connectTracks.js"
import { bindTrackEvents } from "./bindTrackEvents.js";
import { clearPlayer } from "./clearPlayer.js";
import { renderHeader } from "./renderHeader.js";
import { renderTracks } from "./renderTracks.js";
import { saveTracks } from "./saveTracks.js";
import { updateDuration } from "./updateDuration.js";

export async function prepareTracks(song, folder){

    const tracks = await connectTracks(song, folder);
    
    const trackElements = renderTracks(tracks);

    bindTrackEvents(trackElements);

    renderHeader(song);

    saveTracks(tracks);

    updateDuration(tracks);
}