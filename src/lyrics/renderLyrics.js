import { state } from "../state.js";

import { elements } from "../elements.js";

import { parseLrc } from "./parseLrc.js";

import { parseTxt } from "./parseTxt.js";

import { createLyricElement } from "./createLyricElement.js";

import { getLyrics } from "../library/musicStorage.js";


export async function renderLyrics(song) {

    elements.containerLyrics.innerHTML = "";

    state.lyrics = [];

    state.lyricElements = [];

    state.activeLyric = -1;

    let content;

    let lyricsFileName;


    if (
        state.currentSong &&
        typeof state.currentSong === "string"
    ) {

        if (!song.lyrics) {

            console.log(
                "Música original sem letra."
            );

            return;
        }

        const response = await fetch(
            `${state.currentSong}/${song.lyrics}`
        );

        if (!response.ok) {

            console.error(
                "Não foi possível carregar o arquivo de letras."
            );

            return;
        }

        content = await response.text();

        lyricsFileName = song.lyrics;

    }



    else {

        const user = JSON.parse(
           localStorage.getItem("korusUser")
        );

        if (!user) {

            console.error(
                "Nenhum usuário está logado."
            );

            return;
        }

        const result = await getLyrics(
            user.id,
            song.id
        );

        if (!result) {

            console.log(
                "Nenhuma letra encontrada para esta música."
            );

            return;
        }

        content =
            await result.file.text();

        lyricsFileName =
            result.name;

 
    }

    if (
        lyricsFileName
            .toLowerCase()
            .endsWith(".lrc")
    ) {

        state.lyrics =
            parseLrc(content);


    } else if (
        lyricsFileName
            .toLowerCase()
            .endsWith(".txt")
    ) {

        state.lyrics =
            parseTxt(content);

    } else {

        console.error(
            "Formato de letra não suportado."
        );

        return;
    }


    state.lyrics.forEach(
        (line, index) => {

            const lyric =
                createLyricElement(
                    line,
                    index
                );

            elements.containerLyrics
                .appendChild(lyric);
        }
    );


    state.lyricElements =
        Array.from(
            elements.containerLyrics.children
        );
}