import { state } from "../state.js";

export function getLyricState(currentTime, index) {

    const lyric = state.lyrics[index];

    const nextLyric = state.lyrics[index + 1];

    const previewTime = state.lyricsPreviewTime;

    if (currentTime < lyric.time - previewTime) {
        return "hidden";
    }

    if (currentTime < lyric.time) {
        return "incoming";
    }


    if (
        nextLyric &&
        currentTime >= nextLyric.time
    ) {
        return "past";
    }

    return "active";

}