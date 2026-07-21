import { libraryElement } from "./libraryElement.js";
import { elements } from "../elements.js";

export function createLibrary(element){
        libraryElement.containerMusic = document.createElement('div');
        libraryElement.containerMusic.classList.add('music');
        libraryElement.musicTitle = document.createElement('h3');
        libraryElement.musicArtist = document.createElement('span');
        libraryElement.musicTitle.textContent = element.title;                //Criamos um h3 que vai receber o title de cada elemento
        libraryElement.musicArtist.textContent = element.artist;              //Criamos um span que vai receber o artist de cada elemento        
        elements.libraryContainer.appendChild(libraryElement.containerMusic);
        libraryElement.containerMusic.appendChild(libraryElement.musicTitle);
        libraryElement.containerMusic.appendChild(libraryElement.musicArtist);
}