import { elements } from "../elements.js";
import { state } from "../state.js";
import { clearList } from "./clearList.js";
import { renderSong } from "../player/renderSong.js";

export async function songLoad(folder){
    
    elements.playerScreen.classList.remove("hidden");
    elements.libraryScreen.classList.add("hidden");

    state.currentSong = `songs/${folder}`;

    clearList();

    const songPath = `songs/${folder}/song.json`
    const response = await fetch(songPath);
    const song = await response.json();

    await renderSong(song);
};
