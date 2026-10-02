import { libraryElement } from "./libraryElement.js";
import { elements } from "../elements.js";

export function createLibrary(element) {

    const containerMusic =
        document.createElement("div");

    containerMusic.classList.add("music");


    const musicTitle =
        document.createElement("h3");

    const musicArtist =
        document.createElement("span");


    musicTitle.textContent =
        element.title;

    musicArtist.textContent =
        element.artist;


    containerMusic.appendChild(musicTitle);
    containerMusic.appendChild(musicArtist);


    if (!element.folder) {

        const deleteButton =
            document.createElement("button");

        deleteButton.textContent = "Excluir";

        deleteButton.classList.add(
            "delete-music"
        );

        deleteButton.dataset.musicId =
            element.id;


        containerMusic.appendChild(
            deleteButton
        );

    }


    return containerMusic;
}