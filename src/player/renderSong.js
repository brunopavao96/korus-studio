import { renderHeader } from "./renderHeader.js";
import { controlsAction } from "./controlsAction.js";
import { renderProgress } from "./renderProgress.js";
import { renderTracks } from "./renderTracks.js";
import { renderLyrics } from "./renderLyrics.js"

export async function renderSong (song){    //Criamos uma função assíncrona com o parametro do objeto song.json
    renderHeader(song);                     //Criamos uma função pro header com as informções do song.json
    controlsAction();                       //Criamos uma função para adicionar cliques em pause, play e stop
    renderProgress();                       //Criamos uma função para mostrar o progresso e poder avançar no tempo
    renderTracks(song);                     //Criamos uma função com o parametro song.json para cada track
    await renderLyrics(song);               //Criamos uma função para renderizar lyrics.txt com o parametro de song.js 
}
