import { elements } from "../elements.js";
import { state } from "../state.js";
import { renderLibrary } from "./renderLibrary.js";

export async function libraryLoad(){
    const response = await fetch(state.libraryPath);
    const library = await response.json();
    renderLibrary(library)
    elements.playerScreen.classList.add('hidden')
}