import { connectTracks } from "../audio/connectTracks.js"
import { bindTrackEvents } from "./bindTrackEvents.js";
import { clearPlayer } from "./clearPlayer.js";
import { renderTracks } from "./renderTracks.js";
import { saveTracks } from "./saveTracks.js";
import { updateDuration } from "./updateDuration.js";

export async function prepareTrack(song){
    clearPlayer();

    const tracks = await connectTracks(song);
    
    renderTracks(tracks);

    bindTrackEvents(tracks);

    saveTracks(tracks);

    updateDuration(tracks);
}