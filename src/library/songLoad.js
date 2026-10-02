import { elements } from "../elements.js";
import { state } from "../state.js";
import { renderSong } from "../player/renderSong.js";

export async function songLoad(songData) {

    elements.playerScreen.classList.remove("hidden");
console.log(
    "PLAYER INLINE:",
    elements.playerScreen.getBoundingClientRect()
);

    console.log(
        "PLAYER SCREEN:",
        elements.playerScreen.classList.contains("hidden")
    );

    elements.libraryScreen.classList.add("hidden");

    const appRect =
    document.querySelector("#app").getBoundingClientRect();

    const playerRect =
    elements.playerScreen.getBoundingClientRect();

    console.log("APP:", appRect.width, appRect.height);
    console.log("PLAYER:", playerRect.width, playerRect.height);
    console.log(
    "APP DISPLAY:",
    getComputedStyle(document.querySelector("#app")).display
    );
    console.log(
    "APP FLEX:",
    getComputedStyle(document.querySelector("#app")).flex
    );

    console.log(
    "PARENT:",
    elements.playerScreen.parentElement
);

console.log(
    "PARENT RECT:",
    elements.playerScreen.parentElement.getBoundingClientRect()
);

console.log(
    "OFFSET PARENT:",
    elements.playerScreen.offsetParent
);

console.log(
    "OFFSET:",
    elements.playerScreen.offsetWidth,
    elements.playerScreen.offsetHeight
);


    try {

        if (songData.folder) {

            state.currentSong =
                `songs/${songData.folder}`;

            const songPath =
                `songs/${songData.folder}/song.json`;

            const response =
                await fetch(songPath);

            if (!response.ok) {

                throw new Error(
                    "song.json não encontrado"
                );

            }

            const song =
                await response.json();

            await renderSong(
                song,
                songData.folder
            );

            return;
        }

        console.log(
            "Música do usuário:",
            songData
        );

        state.currentSong =
            songData.id;

        await renderSong(
            songData,
            null
        );

    } catch (error) {

        console.error(error);

    }
}