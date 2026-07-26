import { state } from "../state.js";

export function seekControl() {

    document.addEventListener("keydown", (event) => {

        if (!state.audioTracks.length) return;

        const audio = state.audioTracks[0].audio;


        if (event.code === "ArrowLeft") {

            audio.currentTime -= 5;

        }


        if (event.code === "ArrowRight") {

            audio.currentTime += 5;

        }

    });

}