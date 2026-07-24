import { elements } from "../elements.js";
import { state } from "../state.js";
import { renderLibrary } from "./renderLibrary.js"; 

export async function libraryLoad(){                    //Função assíncrona pra trabalhar com arquivo .json
    elements.playerScreen.classList.add('hidden')
    try {
        const response = await fetch(state.libraryPath);    //Encontramos o caminho do arquivo .json
        if(!response.ok){
            throw new Error("Erro ao carregar library.json");
        }
        const library = await response.json();              //Convertemos o arquivo em um objeto {}
        state.library = library;
        renderLibrary(library);                             //Criamos uma função pra manipular esse objeto              
               //O player já começa escondido
    } catch (error){
        console.error(error);
    }
}