import { elements } from "../elements.js";
import { state } from "../state.js";
import { renderLibrary } from "./renderLibrary.js";

export async function libraryLoad(){
    elements.playerScreen.classList.add("hidden");
    const response = await fetch(state.libraryPath);
    const library = await response.json();
    renderLibrary(library)
}