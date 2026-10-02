import { elements } from "../elements.js";
import { state } from "../state.js";

export function renderPlaylistSongs() {

    elements.areaplaylist.innerHTML = "";

    if (!state.currentPlaylist) {
        return;
    }

    if (state.currentPlaylist.songs.length === 0) {

        const emptyMessage = document.createElement("p");

        emptyMessage.textContent = "Playlist vazia";

        elements.areaplaylist.appendChild(emptyMessage);

        return;
    }

    for (const songFolder of state.currentPlaylist.songs) {

        const song = state.library.find(
            element => element.folder === songFolder
        );

        if (!song) {
            continue;
        }

        const songElement = document.createElement("div");

        songElement.textContent = `${song.title} - ${song.artist}`;

        elements.areaplaylist.appendChild(songElement);
    }
}