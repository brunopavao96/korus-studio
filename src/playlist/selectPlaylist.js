import { state } from "../state.js";
import { renderPlaylistSongs } from "./renderPlaylistSongs.js";

export function selectPlaylist(playlist) {

    state.currentPlaylist = playlist;

    renderPlaylistSongs();
}