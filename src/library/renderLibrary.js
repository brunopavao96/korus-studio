import { songLoad } from "./songLoad.js";
import { showPreview } from "./showPreview.js"
import { createLibrary } from "./createLibrary.js";

export function renderLibrary(library){                                     //Função pra trabalhar com parametro (objeto .json)
    library.forEach( element => {                                           //Loop para percorrer todo o objeto e para cada elemento
                                                                            //fazer alguma coisa
        const card = createLibrary(element)

        card.addEventListener('click', () => {     //Evento de click para rodar uma função utilizando
            songLoad(element.folder);                                       //objeto.folder (onde determinamos o nome das pastas)
        })
        card.addEventListener('mouseenter', () => {
            showPreview(element);
        })
    })
}
