import { state } from "../state.js";
import { elements } from "../elements.js";

export function acima(){
    if(state.pitch < 6){
        state.pitch++}
    elements.tonalidadeAtual.textContent = state.pitch;
}

export function abaixo(){
    if(state.pitch > -6){
        state.pitch--}
    elements.tonalidadeAtual.textContent = state.pitch;

}