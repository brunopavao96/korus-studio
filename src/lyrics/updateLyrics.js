import { state } from "../state.js";

export function updateLyrics(currentTime) {

    let activeIndex = -1;

    for (let i = 0; i < state.lyrics.length; i++) {

        if (currentTime >= state.lyrics[i].time) {
            activeIndex = i;
        } else {
            break;
        }

    }


    const nextIndex = activeIndex + 1;


    state.lyricElements.forEach(element => {

        element.classList.remove(
            "active",
            "incoming",
            "past"
        );

    });


    for (let i = 0; i < activeIndex; i++) {

        state.lyricElements[i]
            .classList.add("past");

    }


   if (activeIndex >= 0) {

    const activeElement = state.lyricElements[activeIndex];

    activeElement.classList.add("active");

    activeElement.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

}


    if (
        state.lyrics[nextIndex] &&
        currentTime >= state.lyrics[nextIndex].time - state.lyricsPreviewTime
    ) {

        state.lyricElements[nextIndex]
            .classList.add("incoming");

    }


    state.activeLyric = activeIndex;

}