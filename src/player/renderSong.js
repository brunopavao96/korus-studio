import { renderHeader } from "./renderHeader.js";
import { renderControls } from "./renderControls.js";
import { renderProgress } from "./renderProgress.js";
import { renderTracks } from "./renderTracks.js";
import { renderLyrics } from "./renderLyrics.js"

export async function renderSong (song){
    renderHeader(song);
    renderControls();
    renderProgress();
    renderTracks(song);    
    await renderLyrics(song);
}
