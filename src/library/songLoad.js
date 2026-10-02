import { elements } from "../elements.js";
import { state } from "../state.js";
import { renderSong } from "../player/renderSong.js";
import { playTracks } from "../player/actions.js";

export async function songLoad(songData) {

    elements.playerScreen.classList.remove("hidden");
    elements.libraryScreen.classList.add("hidden");

    state.audioTracks.forEach(track => {

        if (track.audio) {
            track.audio.pause();
            track.audio.currentTime = 0;
        }

    });

    function setupAutoNext() {

        if (state.audioTracks.length === 0) {
            return;
        }

        const audioPrincipal =
            state.audioTracks[0].audio;

        audioPrincipal.onended = async () => {

            const currentIndex =
                state.library.findIndex(song => {

                    if (songData.folder) {
                        return song.folder === songData.folder;
                    }

                    return song.id === state.currentSong;
                });

            if (
                currentIndex === -1 ||
                currentIndex >= state.library.length - 1
            ) {
                return;
            }

            const nextSong =
                state.library[currentIndex + 1];

            await songLoad(nextSong);

            playTracks();
        };
    }

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

            setupAutoNext();

            return;
        }

        state.currentSong =
            songData.id;

        await renderSong(
            songData,
            null
        );

        setupAutoNext();

    } catch (error) {

        console.error(error);

    }
}