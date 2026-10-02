import { elements } from "../elements.js";
import { state } from "../state.js";
import { selectPlaylist } from "./selectPlaylist.js";

export function renderPlaylists(){

    elements.areaplaylist.innerHTML = '';

    for (const playlist of state.playlists){

        const playlistElement = document.createElement("div");

        playlistElement.textContent = playlist.name;

        playlistElement.addEventListener("click", () => {
            selectPlaylist(playlist);
        })

        elements.areaplaylist.appendChild(playlistElement);
    }
}