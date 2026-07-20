import { libraryElement } from "./libraryElement.js";
import { elements } from "../elements.js";
import { songLoad } from "./songLoad.js";
import { showPreview } from "./showPreview.js"

export function renderLibrary(library){
    library.forEach( element => {
        libraryElement.containerMusic = document.createElement('div');
        libraryElement.containerMusic.classList.add('music');
        libraryElement.musicTitle = document.createElement('h3');
        libraryElement.musicArtist = document.createElement('span');
        libraryElement.musicTitle.textContent = element.title;
        libraryElement.musicArtist.textContent = element.artist;
        elements.libraryContainer.appendChild(libraryElement.containerMusic);
        libraryElement.containerMusic.appendChild(libraryElement.musicTitle);
        libraryElement.containerMusic.appendChild(libraryElement.musicArtist);
        
        libraryElement.containerMusic.addEventListener('click', () => {
            songLoad(element.folder);
        })
        libraryElement.containerMusic.addEventListener('mouseenter', () => {
            showPreview(element);
        })
    })
}
