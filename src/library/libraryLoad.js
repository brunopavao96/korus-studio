import { elements } from "../elements.js";
import { state } from "../state.js";
import { renderLibrary } from "./renderLibrary.js"; 

export async function libraryLoad(){                    //Função assíncrona pra trabalhar com arquivo .json
    const response = await fetch(state.libraryPath);    //Encontramos o caminho do arquivo .json
    const library = await response.json();              //Convertemos o arquivo em um objeto {}
    renderLibrary(library);                             //Criamos uma função pra manipular esse objeto              
    elements.playerScreen.classList.add('hidden')       //O player já começa escondido
}