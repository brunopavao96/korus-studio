import { libraryElement } from "./libraryElement.js";
import { elements } from "../elements.js";

export function createLibrary(element){
        const containerMusic = document.createElement('div');
        containerMusic.classList.add('music');

        const musicTitle = document.createElement('h3');
        const musicArtist = document.createElement('span');
        musicTitle.textContent = element.title;                //Criamos um h3 que vai receber o title de cada elemento
        musicArtist.textContent = element.artist;              //Criamos um span que vai receber o artist de cada elemento        
        
        elements.libraryContainer.appendChild(containerMusic);
        containerMusic.appendChild(musicTitle);
        containerMusic.appendChild(musicArtist);

        return containerMusic;
}