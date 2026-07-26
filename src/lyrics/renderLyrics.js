import { state } from "../state.js";
import { elements } from "../elements.js";
import { parseLrc } from "./parseLrc.js";
import { parseTxt } from "./parseTxt.js";
import { createLyricElement } from "./createLyricElement.js";

export async function renderLyrics(song) {

    elements.containerLyrics.innerHTML = "";
    state.lyrics = [];
    state.lyricElements = [];
    state.activeLyric = -1;

    const response = await fetch(`${state.currentSong}/${song.lyrics}`);

    if (!response.ok) {
        console.error("Não foi possível carregar o arquivo de letras.");
        return;
    }

    const content = await response.text();

    if (song.lyrics.toLowerCase().endsWith(".lrc")) {
        state.lyrics = parseLrc(content);
    } else if (song.lyrics.toLowerCase().endsWith(".txt")) {
        state.lyrics = parseTxt(content);
    } else {
        console.error("Formato de letra não suportado.");
        return;
    }

    state.lyrics.forEach((line, index) => {

    const lyric = createLyricElement(line, index);

    elements.containerLyrics.appendChild(lyric);

    });

    state.lyricElements = Array.from(elements.containerLyrics.children);
}