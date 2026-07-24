import { elements } from "../elements.js";
import { state } from "../state.js";
import { clearList } from "./clearList.js";
import { renderSong } from "../player/renderSong.js";

export async function songLoad(folder){                //Função assincrona que recebe folder de renderLibray.js
    elements.playerScreen.classList.remove('hidden');
    elements.libraryScreen.classList.add('hidden');
    try {

        state.currentSong = `songs/${folder}`;             //Acesso a o nome da pasta do container clicado
        const songPath = `songs/${folder}/song.json`       //Acesso as informações song.json
        const response = await fetch(songPath);            //Aguarde encontrar as informações
        if(!response.ok){
            throw new Error("song.json não encontrado");
        }
        const song = await response.json();                //Aguarde a conversão do song.json para objeto

        await renderSong(song, folder);                            //Após tudo carregar execute esta função com o parametro do objeto song.json
    } catch (error){
        console.error(error);
    }
};
