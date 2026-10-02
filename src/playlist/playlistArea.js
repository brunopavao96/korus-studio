import { elements } from "../elements.js";

export function playlistArea(){
    elements.libraryScreen.classList.add("hidden");
    elements.playerScreen.classList.add("hidden");
    elements.playlistScreen.classList.remove("hidden")
}