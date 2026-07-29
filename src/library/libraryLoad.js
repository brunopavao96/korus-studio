import { elements } from "../elements.js";
import { state } from "../state.js";
import { renderLibrary } from "./renderLibrary.js"; 

export async function libraryLoad(){                    
    elements.playerScreen.classList.add('hidden')
    try {
        const response = await fetch(state.libraryPath);    
        if(!response.ok){
            throw new Error("Erro ao carregar library.json");
        }
        const library = await response.json();
        library.sort((a, b) => a.title.localeCompare(b.title)); //Ordena o objeto por ordem alfabética
        
        renderLibrary(library);               
           
    } catch (error){
        console.error(error);
    }
}