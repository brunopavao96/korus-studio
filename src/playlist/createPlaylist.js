import { generatePlaylistName } from "./generatePlaylistName.js";
import { state } from "../state.js";
import { renderPlaylists } from "./renderPlaylists.js";

export function createPlaylist(){
    const name = generatePlaylistName();
    const playlist  = {
        name,
        songs: [],
    }
    state.playlists.push(playlist);
    renderPlaylists();
}
