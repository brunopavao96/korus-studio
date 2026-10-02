import { elements } from "../elements.js";
import { state } from "../state.js";
import { songLoad } from "../library/songLoad.js";
import { playTracks } from "./actions.js";

export function setupSongNavigation() {

    elements.previousSong.addEventListener("click", async () => {

        if (elements.playerScreen.classList.contains("hidden")) {
            console.log("PLAYER ESTÁ OCULTO");
            return;
        }

        const currentIndex =
            state.library.findIndex(
                song => song.id === state.currentSong
            );


        if (currentIndex <= 0) {
            console.log("NÃO EXISTE MÚSICA ANTERIOR");
            return;
        }

        const previousSong =
            state.library[currentIndex - 1];

        console.log("MÚSICA ANTERIOR:", previousSong);

        await songLoad(previousSong);
        playTracks()
    });

    elements.nextSong.addEventListener("click", async () => {

        if (elements.playerScreen.classList.contains("hidden")) {
            console.log("PLAYER ESTÁ OCULTO");
            return;
        }

        const currentIndex =
            state.library.findIndex(
                song => song.id === state.currentSong
            );


        if (
            currentIndex === -1 ||
            currentIndex >= state.library.length - 1
        ) {
            console.log("NÃO EXISTE PRÓXIMA MÚSICA");
            return;
        }

        const nextSong =
            state.library[currentIndex + 1];


        await songLoad(nextSong);
        playTracks()
    });
}